"""Update existing inventory records to the Karz South location.

Revision ID: 20261120_0002
Revises: 20261030_0001
"""
from alembic import op

revision = "20261120_0002"
down_revision = "20261030_0001"
branch_labels = None
depends_on = None

VEHICLE_IDS = (
    "a26af3b3-799d-4164-9081-cb24a2c7422a",
    "d038a9af-7065-4a68-af58-9be05033bef7",
    "5bf76328-6ef4-4045-8985-e570d5422fb6",
    "401b6230-2e61-4bb5-9ecf-460f0a4b7838",
    "5b0c56ff-715f-4210-a8c9-f62329d3f836",
    "f444d3d5-0ddd-46cd-bfe3-2106858bdec7",
    "7d9b62a7-3ea4-4a07-b084-60f3163ec1ca",
    "42459f58-bbc5-4c14-8cc9-66d6d0868b19",
    "214221eb-f742-4a20-99f8-9ab894c1bb6c",
    "239af1f9-9fd9-494b-866d-036a192afa82",
    "fe8014d5-adbe-458e-aff3-88b4fc263d0a",
    "70a0d664-159b-4cea-b237-fe865d32fda3",
    "311c8417-85e3-4875-bdf1-a2aff4f4a031",
    "de27b8bb-039d-441b-9da8-ffd1a2395e51",
    "ba426a65-a6a3-4b62-a531-9f9b26ad86ea",
    "e4584669-2c7f-403c-a78d-22a90723916c",
)
_vehicle_ids = ", ".join(f"'{vehicle_id}'" for vehicle_id in VEHICLE_IDS)


def upgrade() -> None:
    op.execute(
        "UPDATE vehicles "
        "SET location = 'Funkstown, MD' "
        f"WHERE id::text IN ({_vehicle_ids}) "
        "AND location = 'Independence, MO'"
    )


def downgrade() -> None:
    op.execute(
        "UPDATE vehicles "
        "SET location = 'Independence, MO' "
        f"WHERE id::text IN ({_vehicle_ids}) "
        "AND location = 'Funkstown, MD'"
    )
