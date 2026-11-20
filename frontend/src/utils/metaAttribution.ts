const UTM_KEYS = ['source', 'medium', 'campaign', 'content', 'term'] as const
const UTM_COOKIE = '__utm'
const TEST_EVENT_COOKIE = 'test_event_code'
const FB_CLICK_COOKIE = '_fbc'
const THIRTY_DAYS = 30 * 24 * 60 * 60
const NINETY_DAYS = 90 * 24 * 60 * 60
const ONE_HOUR = 60 * 60

export type UTMAttribution = Partial<Record<(typeof UTM_KEYS)[number], string>>

const readCookie = (name: string) => {
  const prefix = `${name}=`
  const match = document.cookie.split(/;\s*/).find((item) => item.startsWith(prefix))
  if (!match) return null
  try {
    return decodeURIComponent(match.slice(prefix.length))
  } catch {
    return match.slice(prefix.length)
  }
}

const writeCookie = (name: string, value: string, maxAge: number) => {
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${name}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; SameSite=Lax${secure}`
}

const readUtmCookie = (): UTMAttribution | null => {
  const cookie = readCookie(UTM_COOKIE)
  if (!cookie) return null
  try {
    const value = JSON.parse(cookie) as Record<string, unknown>
    return Object.fromEntries(
      UTM_KEYS.flatMap((key) => typeof value[key] === 'string' && value[key] ? [[key, value[key] as string]] : []),
    ) as UTMAttribution
  } catch {
    return null
  }
}

export const initializeMetaAttribution = () => {
  const params = new URLSearchParams(window.location.search)
  const storedUtm = readUtmCookie()
  if (!storedUtm) {
    const incomingUtm = Object.fromEntries(
      UTM_KEYS.flatMap((key) => {
        const value = params.get(`utm_${key}`)?.trim().slice(0, 256)
        return value ? [[key, value]] : []
      }),
    ) as UTMAttribution
    if (Object.keys(incomingUtm).length) {
      writeCookie(UTM_COOKIE, JSON.stringify(incomingUtm), THIRTY_DAYS)
    }
  }

  const fbclid = params.get('fbclid')?.trim()
  if (fbclid && !readCookie(FB_CLICK_COOKIE) && /^[A-Za-z0-9_-]{1,2000}$/.test(fbclid)) {
    writeCookie(FB_CLICK_COOKIE, `fb.1.${Date.now()}.${fbclid}`, NINETY_DAYS)
  }

  const testEventCode = params.get('test_event_code')?.trim()
  if (testEventCode && /^[A-Za-z0-9_-]{1,64}$/.test(testEventCode)) {
    writeCookie(TEST_EVENT_COOKIE, testEventCode, ONE_HOUR)
  }
}

export const getMetaAttribution = () => {
  initializeMetaAttribution()
  return {
    utm: readUtmCookie() ?? { source: 'direct', medium: 'none' },
    fbp: readCookie('_fbp'),
    fbc: readCookie(FB_CLICK_COOKIE),
    testEventCode: readCookie(TEST_EVENT_COOKIE),
  }
}
