import { useState } from 'react'
import { Link } from 'react-router'
import { FaArrowRight, FaCarSide, FaCogs, FaRegClock } from 'react-icons/fa'
import type { Vehicle } from '../types/vehicle'
import { formatNumber, formatPrice } from '../utils/format'

const getCompactEngineLabel = (engine: string) => {
  const value = engine.trim()
  if (!value || /^(gasoline|diesel)$/i.test(value)) return ''
  if (/electric/i.test(value)) return 'Electric'

  const displacement = value.match(/\b\d+(?:\.\d+)?\s?L\b/i)?.[0]?.replace(/\s+/g, '')
  const cylinderMatch = value.match(/\b(V\s?\d+|I\s?-\s?\d+|\d+\s?-?\s?cyl(?:inder)?s?)\b/i)?.[0]
  if (!displacement) return value
  if (!cylinderMatch) return displacement

  const cylinders = cylinderMatch.replace(/\s+/g, '').toUpperCase()
  const normalizedCylinders = /^I-?\d+$/.test(cylinders)
    ? `${cylinders.match(/\d+/)?.[0]}-Cyl`
    : /^\d+-?CYL(?:INDER)?S?$/.test(cylinders)
      ? `${cylinders.match(/\d+/)?.[0]}-Cyl`
      : cylinders

  return `${displacement} ${normalizedCylinders}`
}

export const InventoryVehicleCard = ({ vehicle }: { vehicle: Vehicle }) => {
  const title = `${vehicle.year} ${vehicle.make} ${vehicle.model}`
  const [photoAspectRatio, setPhotoAspectRatio] = useState(1.5)
  const activePhotoUrl = vehicle.images[0] || '/images/vehicle-photo-coming-soon-card.webp'
  const photoObjectPosition = photoAspectRatio < 0.9 ? 'center 55%' : photoAspectRatio < 1.1 ? 'center 40%' : 'center 72%'
  const drivetrain = vehicle.drivetrain.match(/\(([^)]+)\)/)?.[1] || vehicle.drivetrain
  const engineLabel = getCompactEngineLabel(vehicle.engine)

  return <article className="inventory-vehicle-card">
    <div className="inventory-vehicle-card__photo">
      <Link to={`/inventory/${vehicle.slug}`} className="inventory-vehicle-card__photo-link" aria-label={`View ${title}`}>
        <img className="inventory-vehicle-card__photo-main" src={activePhotoUrl} alt={title} loading="lazy" style={{ objectPosition: photoObjectPosition }} onLoad={(event) => {
          const { naturalWidth, naturalHeight } = event.currentTarget
          if (naturalWidth && naturalHeight) setPhotoAspectRatio(naturalWidth / naturalHeight)
        }} />
      </Link>
      {vehicle.stockNumber ? <span className="inventory-vehicle-card__stock">Stock #{vehicle.stockNumber}</span> : null}
      <span className="inventory-vehicle-card__photo-price">{formatPrice(vehicle.price)}</span>
    </div>
    <div className="inventory-vehicle-card__body">
      <h3><Link to={`/inventory/${vehicle.slug}`}>{title}</Link></h3>
      <p className="inventory-vehicle-card__specs">
        <span className="inventory-vehicle-card__spec--mileage"><FaRegClock aria-hidden="true" />{vehicle.mileage > 0 ? `${formatNumber(vehicle.mileage)} miles` : 'Mileage not listed'}</span>
        {engineLabel ? <span className="inventory-vehicle-card__spec--engine"><FaCogs aria-hidden="true" />{engineLabel}</span> : null}
        {drivetrain.trim() ? <span className="inventory-vehicle-card__spec--drivetrain" title={vehicle.drivetrain}><FaCarSide aria-hidden="true" />{drivetrain}</span> : null}
      </p>
      <Link className="inventory-vehicle-card__details" to={`/inventory/${vehicle.slug}`}><span>View Details</span><FaArrowRight aria-hidden="true" /></Link>
    </div>
  </article>
}
