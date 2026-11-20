const addressQuery = encodeURIComponent("Mark's Pre-Owned Cars, 9301 E US Hwy 40, Independence, MO 64055")
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${addressQuery}`

export const business = {
  name: "Mark's Pre-Owned Cars",
  legalNote: 'Used car sales',
  phone: '+1 816-358-0100',
  phoneDisplay: '(816) 358-0100',
  phoneHref: 'tel:+18163580100',
  address: '9301 E US Hwy 40',
  cityState: 'Independence, MO',
  postalCode: '64055',
  shortLocation: 'Independence, MO',
  mapsUrl,
  reviewsUrl: mapsUrl,
  mapEmbedUrl: `https://maps.google.com/maps?q=${addressQuery}&z=16&output=embed`,
  hours: 'Monday, 9:00 AM to 5:00 PM; Tuesday to Thursday, 1:00 PM to 5:00 PM; Friday, 9:00 AM to 5:00 PM; Saturday, 9:00 AM to 3:00 PM; Sunday closed',
  hoursShort: 'Monday, 9:00 AM to 5:00 PM',
  hoursList: [
    ['Monday', '9:00 AM to 5:00 PM'],
    ['Tuesday', '1:00 PM to 5:00 PM'],
    ['Wednesday', '1:00 PM to 5:00 PM'],
    ['Thursday', '1:00 PM to 5:00 PM'],
    ['Friday', '9:00 AM to 5:00 PM'],
    ['Saturday', '9:00 AM to 3:00 PM'],
    ['Sunday', 'Closed'],
  ],
  serviceArea: 'Independence, Missouri',
  website: '',
  email: '',
  contactHref: mapsUrl,
}
