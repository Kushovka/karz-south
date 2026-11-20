const placeId = 'ChIJQTQmtqvtyYkRWz_KQ-aPAXY'
const mapsUrl = `https://www.google.com/maps/place/?q=place_id:${placeId}`
const mapEmbedUrl = `https://maps.google.com/maps?output=embed&q=place_id:${placeId}`

export const business = {
  name: 'Karz South',
  legalNote: 'Used car sales',
  phone: '+1 240-201-2988',
  phoneDisplay: '(240) 201-2988',
  phoneHref: 'tel:+12402012988',
  address: '302 S Edgewood Dr',
  cityState: 'Funkstown, MD',
  postalCode: '21734',
  shortLocation: 'Funkstown, MD',
  mapsUrl,
  reviewsUrl: mapsUrl,
  mapEmbedUrl,
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
  serviceArea: 'Funkstown, Maryland',
  website: '',
  email: '',
  contactHref: mapsUrl,
}
