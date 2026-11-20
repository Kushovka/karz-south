import { sendContactAction } from '../api/events'
import { createMetaEventId, getCookieValue, trackCallAction } from './metaPixel'

type VehicleCallTracking = {
  contentId: string
  vehicleName: string
  price: number
}

export const trackContactCta = (actionType: string, contentName?: string | null, vehicle?: VehicleCallTracking) => {
  if (typeof window === 'undefined') {
    return
  }

  const eventId = createMetaEventId(actionType)

  if (actionType === 'phone_click') {
    trackCallAction({
      eventId,
      contentIds: vehicle ? [vehicle.contentId] : undefined,
      contentName: vehicle?.vehicleName ?? contentName ?? 'Phone CTA',
      contentType: vehicle ? 'product' : 'service',
      currency: vehicle && vehicle.price > 0 ? 'USD' : undefined,
      value: vehicle && vehicle.price > 0 ? vehicle.price : undefined,
    })
    if (vehicle) {
      void sendContactAction({
        actionType,
        contentName: vehicle.vehicleName,
        sourcePage: window.location.pathname,
        metaEventId: eventId,
        fbp: getCookieValue('_fbp'),
        fbc: getCookieValue('_fbc'),
        userAgent: window.navigator.userAgent,
        eventSourceUrl: window.location.href,
        contentId: vehicle.contentId,
        contentType: 'product',
        value: vehicle.price > 0 ? vehicle.price : undefined,
        currency: vehicle.price > 0 ? 'USD' : undefined,
      }).catch(() => undefined)
    }
  }
}
export const getContactActionFromHref = (href: string) => {
  if (href.startsWith('tel:')) {
    return {
      actionType: 'phone_click',
      contentName: 'Phone CTA',
    }
  }

  if (href.includes('google.com/maps') || href.includes('place_id:')) {
    return {
      actionType: 'directions_click',
      contentName: 'Directions CTA',
    }
  }

  return null
}
