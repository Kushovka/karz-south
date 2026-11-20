import { business } from '../data/business'

export const autoDealerSchema = {
  '@context': 'https://schema.org',
  '@type': 'AutoDealer',
  name: business.name,
  telephone: business.phone,
  address: {
    '@type': 'PostalAddress',
    streetAddress: business.address,
    addressLocality: 'Independence',
    addressRegion: 'MA',
    postalCode: business.postalCode,
    addressCountry: 'US',
  },
  openingHours: ['Mo 09:00-17:00', 'Tu-Th 13:00-17:00', 'Fr 09:00-17:00', 'Sa 09:00-15:00'],
}
