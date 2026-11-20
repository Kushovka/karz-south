from fastapi import APIRouter, Depends, HTTPException, Request, status
from fastapi.responses import Response
from sqlalchemy.orm import Session

from app.db.deps import get_db
from app.models.lead import Lead
from app.models.vehicle import Vehicle
from app.schemas.event import ContactActionCreate
from app.schemas.lead import CapiLeadEventCreate
from app.services.capi_ticket import verify_capi_ticket
from app.services.meta_capi import send_contact_action_event
from app.services.meta_capi import send_lead_event


router = APIRouter(prefix="/events", tags=["events"])


def _client_ip(request: Request) -> str | None:
    forwarded_for = request.headers.get("x-forwarded-for")
    if forwarded_for:
        return forwarded_for.split(",")[0].strip()

    if request.client:
        return request.client.host

    return None


@router.post("/contact-action", status_code=status.HTTP_202_ACCEPTED)
def contact_action(payload: ContactActionCreate, request: Request):
    payload.client_ip_address = payload.client_ip_address or _client_ip(request)
    payload.user_agent = payload.user_agent or request.headers.get("user-agent")
    body, status_code, content_type = send_contact_action_event(payload)
    return Response(content=body, status_code=status_code, media_type=content_type)


@router.post("/capi", status_code=status.HTTP_200_OK, include_in_schema=False)
def lead_capi_event(
    payload: CapiLeadEventCreate,
    request: Request,
    db: Session = Depends(get_db),
):
    if not verify_capi_ticket(payload.capi_ticket, payload.lead_id, payload.meta_event_id):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired CAPI ticket")

    lead = db.get(Lead, payload.lead_id)
    if not lead:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lead not found")

    vehicle = db.get(Vehicle, lead.vehicle_id) if lead.vehicle_id else None
    referer = request.headers.get("referer", "")
    event_source_url = referer if referer.startswith("https://") else f"{str(request.base_url).rstrip('/')}/"
    body, status_code, content_type = send_lead_event(
        lead,
        vehicle,
        event_id=payload.meta_event_id,
        event_source_url=event_source_url,
        fbp=payload.fbp,
        fbc=payload.fbc,
        client_ip_address=_client_ip(request),
        client_user_agent=request.headers.get("user-agent"),
        test_event_code=payload.test_event_code,
    )
    return Response(content=body, status_code=status_code, media_type=content_type)
