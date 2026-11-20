import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { FaChevronRight } from 'react-icons/fa'
import { listVehicles } from '../api/vehicles'
import { InventoryVehicleCard } from './InventoryVehicleCard'
import type { Vehicle } from '../types/vehicle'

const FeaturedVehicleSkeleton = () => <div className="inventory-vehicle-card inventory-vehicle-card--skeleton" aria-hidden="true">
  <div className="inventory-vehicle-card__photo" />
  <div className="inventory-vehicle-card__body">
    <span className="inventory-skeleton-line inventory-skeleton-line--title" />
    <span className="inventory-skeleton-line inventory-skeleton-line--specs" />
    <span className="inventory-skeleton-line inventory-skeleton-line--bottom" />
  </div>
</div>

export const FeaturedInventorySection = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(true)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    const loadFeaturedVehicles = async () => {
      try {
        const featured = await listVehicles({ page: 1, pageSize: 4, featured: true, sort: 'year_desc' })
        if (cancelled) return

        if (featured.items.length >= 4) {
          setVehicles(featured.items.slice(0, 4))
          return
        }

        const inventory = await listVehicles({ page: 1, pageSize: 4, sort: 'year_desc' })
        if (cancelled) return
        const featuredIds = new Set(featured.items.map((vehicle) => vehicle.id))
        setVehicles([...featured.items, ...inventory.items.filter((vehicle) => !featuredIds.has(vehicle.id))].slice(0, 4))
      } catch {
        if (!cancelled) setFailed(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void loadFeaturedVehicles()

    return () => { cancelled = true }
  }, [])

  return <section className="home-featured" aria-labelledby="home-featured-title">
    <div className="home-featured__inner">
      <div className="home-featured__heading">
        <div>
          <h2 id="home-featured-title">Featured Inventory</h2>
          <p>Browse a few of our available vehicles.</p>
        </div>
        <Link to="/inventory" className="home-featured__all">View All Inventory <FaChevronRight aria-hidden="true" /></Link>
      </div>

      <div className="home-featured__grid">
        {loading ? Array.from({ length: 4 }, (_, index) => <FeaturedVehicleSkeleton key={index} />)
          : failed ? <p className="home-featured__message">Featured vehicles are temporarily unavailable. Please browse all inventory or call us for current availability.</p>
            : vehicles.length ? vehicles.map((vehicle) => <InventoryVehicleCard key={vehicle.id} vehicle={vehicle} />)
              : <p className="home-featured__message">We’re updating our featured vehicles. Please browse all inventory or call us for current availability.</p>}
      </div>
    </div>
  </section>
}
