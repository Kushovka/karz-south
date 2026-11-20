import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { FaChevronRight } from 'react-icons/fa'
import { listVehicles } from '../api/vehicles'
import type { Vehicle } from '../types/vehicle'

type MakeGroup = {
  name: string
  count: number
  vehicle: Vehicle
}

const groupVehiclesByMake = (vehicles: Vehicle[]): MakeGroup[] => {
  const groups = new Map<string, MakeGroup>()

  for (const vehicle of vehicles) {
    const name = vehicle.make.trim()
    if (!name) continue

    const existing = groups.get(name.toLocaleLowerCase())
    if (existing) {
      existing.count += 1
    } else {
      groups.set(name.toLocaleLowerCase(), { name, count: 1, vehicle })
    }
  }

  return [...groups.values()].sort((left, right) => right.count - left.count || left.name.localeCompare(right.name))
}

const MakeCard = ({ group }: { group: MakeGroup }) => (
  <Link to={`/inventory?make=${encodeURIComponent(group.name)}`} className="browse-make-card">
    <img src={group.vehicle.images[0] || '/images/vehicle-photo-coming-soon-card.webp'} alt={`${group.name} in the Mark’s Pre-Owned Cars inventory`} loading="lazy" />
    <span className="browse-make-card__label">
      <span>
        <strong>{group.name}</strong>
        <small>{group.count} {group.count === 1 ? 'Vehicle' : 'Vehicles'}</small>
      </span>
      <FaChevronRight aria-hidden="true" />
    </span>
  </Link>
)

const MakeCardSkeleton = () => <div className="browse-make-card browse-make-card--skeleton" aria-hidden="true"><span /></div>

export const BrowseByMakeSection = () => {
  const [makes, setMakes] = useState<MakeGroup[]>([])
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    listVehicles({ page: 1, pageSize: 50, sort: 'year_desc' })
      .then((response) => { if (!cancelled) setMakes(groupVehiclesByMake(response.items)) })
      .catch(() => { if (!cancelled) setFailed(true) })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [])

  return (
    <section className="browse-makes" aria-labelledby="browse-makes-title">
      <div className="browse-makes__inner">
        <div className="browse-makes__layout">
          <div className="browse-makes__intro">
            <p className="browse-makes__eyebrow">Browse by Make</p>
            <h2 id="browse-makes-title">Looking for a specific make?</h2>
            <p className="browse-makes__description">Browse our current inventory by make to quickly find the vehicles you’re interested in.</p>
            <Link to="/inventory" className="browse-makes__button">View All Makes <FaChevronRight aria-hidden="true" /></Link>
          </div>

          <div className="browse-makes__grid" aria-live="polite">
            {loading ? Array.from({ length: 8 }, (_, index) => <MakeCardSkeleton key={index} />)
              : failed ? <p className="browse-makes__message">Makes are temporarily unavailable. Browse all current inventory instead.</p>
                : makes.length ? makes.map((group) => <MakeCard key={group.name} group={group} />)
                  : <p className="browse-makes__message">We’re updating the inventory. Please check back soon.</p>}
          </div>
        </div>
        <div className="browse-makes__footer">
          <Link to="/inventory">View All Makes <FaChevronRight aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  )
}
