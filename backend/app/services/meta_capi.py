import hashlib
import json
import logging
from datetime import datetime, timezone
from urllib import request
from urllib.error import HTTPError, URLError

from app.core.config import settings
from app.models.lead import Lead
from app.models.vehicle import Vehicle
from app.schemas.event import ContactActionCreate

logger = logging.getLogger("uvicorn.error")


def _normalize(value: str | None) -> str | None:
    if not value:
        return None
    return value.strip().lower() or None


def _hash(value: str | None, *, digits_only: bool = False) -> str | None:
    normalized = _normalize(value)
    if not normalized:
        return None
    if digits_only:
        normalized = "".join(character for character in normalized if character.isdigit())
    return hashlib.sha256(normalized.encode("utf-8")).hexdigest() if normalized else None


def _split_name(name: str) -> tuple[str | None, str | None]:
    parts = name.split()
    if not parts:
        return None, None
    return parts[0], parts[-1] if len(parts) > 1 else None


def _post_to_meta(events: list[dict], test_event_code: str | None = None) -> tuple[bytes, int, str]:
    if not settings.META_PIXEL_ID or not settings.META_ACCESS_TOKEN:
        body = json.dumps({"error": "Meta CAPI is not configured"}).encode("utf-8")
        return body, 503, "application/json"

    payload: dict = {
        "data": events,
        "access_token": settings.META_ACCESS_TOKEN,
    }
    if test_event_code:
        payload["test_event_code"] = test_event_code

    api_request = request.Request(
        f"https://graph.facebook.com/{settings.META_GRAPH_API_VERSION}/{settings.META_PIXEL_ID}/events",
        data=json.dumps(payload).encode("utf-8"),
        headers={"Content-Type": "application/json", "Accept": "application/json"},
        method="POST",
    )

    try:
        with request.urlopen(api_request, timeout=8) as response:
            return response.read(), response.status, response.headers.get_content_type()
    except HTTPError as error:
        return error.read(), error.code, error.headers.get_content_type() if error.headers else "application/json"
    except (URLError, TimeoutError, OSError):
        logger.exception("Meta CAPI request failed before a response was received")
        body = json.dumps({"error": "Could not reach Meta Conversions API"}).encode("utf-8")
        return body, 502, "application/json"


def send_lead_event(
    lead: Lead,
    vehicle: Vehicle | None,
    *,
    event_id: str,
    event_source_url: str,
    fbp: str | None,
    fbc: str | None,
    client_ip_address: str | None,
    client_user_agent: str | None,
    test_event_code: str | None,
) -> tuple[bytes, int, str]:
    first_name, last_name = _split_name(lead.customer_name)
    user_data = {
        "em": _hash(lead.email),
        "ph": _hash(lead.phone, digits_only=True),
        "fn": _hash(first_name),
        "ln": _hash(last_name),
        "fbp": fbp,
        "fbc": fbc,
        "client_ip_address": client_ip_address,
        "client_user_agent": client_user_agent,
    }
    user_data = {key: value for key, value in user_data.items() if value not in (None, "", [])}

    if vehicle:
        content_ids = [vehicle.stock_number or vehicle.id]
        content_type = "product"
        value = vehicle.price
    else:
        content_ids = [f"karz-south-{lead.lead_type}"]
        content_type = "service"
        value = 0

    event = {
        "event_name": "Lead",
        "event_time": int(datetime.now(timezone.utc).timestamp()),
        "event_id": event_id,
        "action_source": "website",
        "event_source_url": event_source_url,
        "user_data": user_data,
        "custom_data": {
            "content_ids": content_ids,
            "content_type": content_type,
            "value": value,
            "currency": "USD",
        },
    }
    return _post_to_meta([event], test_event_code)


def send_contact_action_event(payload: ContactActionCreate) -> tuple[bytes, int, str]:
    user_data = {
        "fbp": payload.fbp,
        "fbc": payload.fbc,
        "client_user_agent": payload.user_agent,
        "client_ip_address": payload.client_ip_address,
    }
    user_data = {key: value for key, value in user_data.items() if value not in (None, "", [])}

    event = {
        "event_name": "Call" if payload.action_type == "phone_click" else "Contact",
        "event_time": int(datetime.now(timezone.utc).timestamp()),
        "event_id": payload.meta_event_id,
        "action_source": "website",
        "event_source_url": payload.event_source_url,
        "user_data": user_data,
        "custom_data": {
            "content_ids": [payload.content_id] if payload.content_id else [payload.content_name or payload.action_type],
            "content_type": payload.content_type or "service",
            "action_type": payload.action_type,
        "value": payload.value,
        "currency": payload.currency,
            "content_name": payload.content_name,
        },
    }
    event = {key: value for key, value in event.items() if value not in (None, "", [])}
    return _post_to_meta([event])
