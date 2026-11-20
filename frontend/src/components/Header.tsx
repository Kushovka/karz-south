import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router'
import { FaArrowRight, FaBars, FaChevronDown, FaMapMarkerAlt, FaPhoneAlt, FaSearch, FaTimes } from 'react-icons/fa'
import { listVehicles } from '../api/vehicles'
import { business } from '../data/business'
import type { Vehicle } from '../types/vehicle'
import { trackContactCta } from '../utils/ctaTracking'
import { formatPrice } from '../utils/format'
import { HeaderMessageDialog } from './HeaderMessageDialog'

export const HeaderSearch = ({ variant = 'header' }: { variant?: 'header' | 'hero' }) => {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [matches, setMatches] = useState<Vehicle[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const term = query.trim()
    if (term.length < 2) {
      setMatches([])
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)
    listVehicles({ q: term, pageSize: 3 })
      .then((response) => { if (!cancelled) setMatches(response.items) })
      .catch(() => { if (!cancelled) setMatches([]) })
      .finally(() => { if (!cancelled) setLoading(false) })

    return () => { cancelled = true }
  }, [query])

  const viewSearch = () => {
    const term = query.trim()
    if (term) navigate(`/inventory?q=${encodeURIComponent(term)}`)
  }

  return <div id={variant === 'hero' ? 'hero-search' : undefined} className={`relative w-full ${variant === 'hero' ? 'max-w-none scroll-mt-6' : '2xl:max-w-[560px]'}`}>
    <div className={`header-search-control flex items-center gap-0 overflow-hidden transition-colors ${variant === 'hero' ? 'h-[50px] rounded-[7px] border border-[#d4d4d4] bg-white shadow-sm focus-within:border-[#777]' : 'h-[49px] rounded-[8px] border border-[#d2cfcd] bg-[#fbfaf8] focus-within:border-[#a9a3a0]'}`}>
    <label className="relative flex h-full min-w-0 flex-1 items-center gap-3 pl-3 2xl:gap-4 2xl:pl-4">
      <span className="sr-only">Search inventory</span>
      <FaSearch aria-hidden="true" className={`shrink-0 text-[16px] ${variant === 'hero' ? 'text-[#999]' : 'text-[var(--color-button)] 2xl:text-[19px]'}`} />
      <input
        className={`h-9 min-w-0 w-full bg-transparent py-0 pr-1 text-[#1C2B3E] outline-none placeholder:text-[#77716e] ${variant === 'hero' ? 'text-[15px]' : 'text-[13px] 2xl:text-[14px]'}`}
        type="text"
        inputMode="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => { if (event.key === 'Enter') { event.preventDefault(); viewSearch() } if (event.key === 'Escape') setQuery('') }}
        placeholder={variant === 'hero' ? 'Search by make, model, or body style' : 'Search make, model, or keyword...'}
      />
      {query ? <button type="button" aria-label="Clear inventory search" onClick={() => setQuery('')} className="grid h-9 w-9 shrink-0 place-items-center text-base text-[#77716e] trans"><FaTimes aria-hidden="true" /></button> : null}
    </label>
    {variant === 'header' ? <button type="button" onClick={viewSearch} className="header-search-submit inline-flex h-full shrink-0 items-center justify-center gap-2 whitespace-nowrap bg-[var(--color-button)] px-4 text-[12px] font-bold text-white transsm:px-5 2xl:px-6 2xl:text-[13px]">Search <FaArrowRight aria-hidden="true" className="text-[12px]" /></button> : null}
    </div>
    {query.trim().length >= 2 ? <div role="region" aria-label="Vehicle search results" className="absolute left-0 right-0 top-[calc(100%+0.6rem)] z-50 max-h-[min(360px,calc(100dvh-7rem))] w-full overflow-y-auto rounded-xl border border-[#dedede] bg-white text-[#242424] shadow-[0_18px_44px_rgba(0,0,0,0.24)]">
      <div className="flex min-h-11 items-center justify-between border-b border-[#e8e8e8] bg-[#f7f7f7] px-4 sm:px-5"><span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#5c5c5c]">{loading ? 'Searching inventory' : `${matches.length} ${matches.length === 1 ? 'matching vehicle' : 'matching vehicles'}`}</span><span className="h-2 w-2 rounded-full bg-[#A54438]" aria-hidden="true" /></div>
      {loading ? <p className="px-5 py-6 text-sm text-[#666]">Looking through current inventory…</p> : matches.length ? <><div className="divide-y divide-[#e8e8e8]">{matches.map((vehicle) => {
        const photo = vehicle.images[0]
        const hasPhoto = Boolean(photo && !photo.includes('vehicle-photo-coming-soon'))
        return <Link key={vehicle.id} to={`/inventory/${vehicle.slug}`} onClick={() => setQuery('')} className="group grid min-h-[88px] grid-cols-[72px_minmax(0,1fr)] items-center gap-3 px-3 py-2.5 transition-colorss-visible:outline focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#A54438] sm:grid-cols-[104px_minmax(0,1fr)_auto] sm:gap-4 sm:px-5 sm:py-3">
          <img src={hasPhoto ? photo : '/images/vehicle-photo-coming-soon-card.webp'} alt="" className="h-[54px] w-[72px] rounded-md border border-[#e4e4e4] bg-[#f5f5f5] object-cover sm:h-[68px] sm:w-[104px]" />
          <span className="min-w-0 text-left"><strong className="line-clamp-2 text-[14px] font-bold leading-tight text-[#242424] sm:line-clamp-1 sm:text-[16px]">{vehicle.year} {vehicle.make} {vehicle.model}</strong><span className="mt-1 block truncate text-[12px] text-[#666] sm:text-[13px]">{vehicle.trim || vehicle.bodyType || 'Available now'}</span><span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.06em] text-[#85372F] sm:hidden">{formatPrice(vehicle.price)}</span></span>
          <span className="hidden items-center gap-3 pl-2 text-right sm:flex"><span className="whitespace-nowrap text-[16px] font-bold tabular-nums text-[#A54438]">{formatPrice(vehicle.price)}</span><FaArrowRight aria-hidden="true" className="text-[12px] text-[#A54438] transition-transslate-x-1" /></span>
        </Link>
      })}</div><button type="button" onClick={viewSearch} className="header-search-browse-all flex min-h-11 w-full items-center justify-between border-t border-[#e8e8e8] px-4 text-[11px] font-bold uppercase tracking-[0.08em] text-[#A54438] transition-colorssm:px-5"><span>Browse all matching vehicles</span><FaArrowRight aria-hidden="true" /></button></> : <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-5"><div className="min-w-0 text-left"><strong className="block text-[14px] font-bold text-[#242424] sm:text-[15px]">No vehicles found for “{query.trim()}”</strong><span className="mt-1 block text-[12px] leading-5 text-[#666] sm:text-[13px]">Try another search or browse the full inventory.</span></div><Link to="/inventory" onClick={() => setQuery('')} className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-md bg-[#A54438] px-4 text-[11px] font-bold uppercase tracking-[0.06em] text-white transition-colorss-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A54438]"><span>View all inventory</span><FaArrowRight aria-hidden="true" /></Link></div>}
    </div> : null}
  </div>
}

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [aboutOpen, setAboutOpen] = useState(false)
  const [messageOpen, setMessageOpen] = useState(false)
  const [homeScrolled, setHomeScrolled] = useState(false)
  const { pathname } = useLocation()
  const phoneHref = business.phoneHref || business.contactHref
  const displayPhone = business.phoneDisplay
  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Inventory', href: '/inventory' },
    { label: 'Delivery', href: '/delivery' },
    { label: 'Warranty', href: '/warranty' },
    { label: 'Guarantee', href: '/guarantee' },
  ]

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  useEffect(() => {
    setAboutOpen(false)
  }, [pathname])

  useEffect(() => {
    const updateHomeScroll = () => setHomeScrolled(pathname === '/' && window.scrollY > 420)
    updateHomeScroll()
    window.addEventListener('scroll', updateHomeScroll, { passive: true })
    return () => window.removeEventListener('scroll', updateHomeScroll)
  }, [pathname])

  const closeMenu = () => setMenuOpen(false)
  const mobileNavClass = (isActive: boolean) => `relative border-b border-white/25 border-l-[3px] px-4 py-4 text-2xl font-bold uppercase text-white transition-colors ${isActive ? 'border-l-[#c84d42] bg-white/10' : 'border-l-transparent'}`
  const brandClass = `mark-site-brand ${pathname === '/' ? (homeScrolled ? 'mark-site-brand--scrolled' : '') : 'mark-site-brand--interior'}`

  return <>
    <header id="site-header" className="mark-site-header">
      <Link to="/" className={brandClass} aria-label="Mark's Pre-Owned Cars home" onClick={closeMenu}>
        <img className="mark-site-brand__image" src="/images/marks-preowned-logo.png" alt="Mark's Pre-Owned Cars" />
      </Link>
      <div className="mark-site-header__content">
        <nav className="mark-site-nav" aria-label="Main navigation">
          {navItems.filter((item) => item.href !== '/').map((item) => <NavLink key={item.href} to={item.href} className={({ isActive }) => `mark-site-nav__item ${isActive ? 'is-active' : ''}`}>{item.label}</NavLink>)}
          <div className="mark-site-nav-group" onMouseEnter={() => setAboutOpen(true)} onMouseLeave={() => setAboutOpen(false)} onFocusCapture={() => setAboutOpen(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setAboutOpen(false) }}>
            <div className="mark-site-nav-group__head">
              <NavLink to="/about" className={({ isActive }) => `mark-site-nav__item ${isActive || pathname === '/contact' || pathname === '/team' ? 'is-active' : ''}`}>About</NavLink>
              <button type="button" className="mark-site-nav__toggle" aria-label="About menu" aria-expanded={aboutOpen} onClick={() => setAboutOpen(true)}><FaChevronDown aria-hidden="true" /></button>
            </div>
            <div className={`mark-site-dropdown ${aboutOpen ? 'is-open' : ''}`}>
              <NavLink to="/about" className={({ isActive }) => isActive ? 'is-active' : ''} onClick={() => setAboutOpen(false)}>About</NavLink>
              <NavLink to="/contact" className={({ isActive }) => isActive ? 'is-active' : ''} onClick={() => setAboutOpen(false)}>Contact</NavLink>
              <NavLink to="/team" className={({ isActive }) => isActive ? 'is-active' : ''} onClick={() => setAboutOpen(false)}>Team</NavLink>
            </div>
          </div>
        </nav>
        <div className="mark-site-contact">
          <a href={phoneHref} className="mark-site-contact__phone" onClick={() => trackContactCta('phone_click', 'Site Header Phone')}><FaPhoneAlt aria-hidden="true" />{displayPhone}</a>
          <a href={business.mapsUrl} target="_blank" rel="noreferrer" className="mark-site-contact__address" onClick={() => trackContactCta('directions_click', 'Site Header Directions')}><FaMapMarkerAlt aria-hidden="true" />{business.address}, {business.cityState} {business.postalCode}</a>
        </div>
        <div className="mark-site-mobile-controls">
          <a href={phoneHref} aria-label={displayPhone} onClick={() => trackContactCta('phone_click', 'Mobile Header Phone')}><FaPhoneAlt aria-hidden="true" /><span>{displayPhone}</span></a>
          <button type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>{menuOpen ? <FaTimes /> : <FaBars />}</button>
        </div>
      </div>
    </header>
    <AnimatePresence>
      {menuOpen ? <motion.div className="fixed inset-0 z-[100]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
        <motion.button type="button" aria-label="Close menu" onClick={closeMenu} className="absolute inset-0 z-0 cursor-default bg-black/45" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
        <motion.div role="dialog" aria-modal="true" aria-label="Mobile navigation" className="absolute inset-y-0 left-0 z-10 w-[min(68vw,440px)] overflow-y-auto bg-[#243B53] p-6 text-white shadow-2xl" initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>
          <button type="button" aria-label="Close menu" onClick={closeMenu} className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center border-0 bg-transparent text-3xl text-white transition-opacity hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"><FaTimes aria-hidden="true" /></button>
          <div className="mx-auto flex min-h-full max-w-xl flex-col items-center gap-8 py-5">
            <img className="mark-site-brand__image--menu" src="/images/marks-preowned-logo.png" alt="Mark's Pre-Owned Cars" />
            <nav className="flex w-full flex-col" aria-label="Mobile navigation">
              {navItems.map((item) => <NavLink key={item.href} to={item.href} end={item.href === '/'} onClick={closeMenu} className={({ isActive }) => mobileNavClass(isActive)}>{item.label}</NavLink>)}
              <NavLink to="/about" onClick={closeMenu} className={() => mobileNavClass(pathname === '/about' || pathname.startsWith('/about/') || pathname === '/team')}>About Us</NavLink>
              <NavLink to="/contact" onClick={closeMenu} className={({ isActive }) => mobileNavClass(isActive)}>Contact</NavLink>
            </nav>
            <a href={phoneHref} onClick={() => trackContactCta('phone_click', 'Mobile Menu Phone')} className="mt-auto flex items-center gap-3 text-xl font-bold"><FaPhoneAlt aria-hidden="true" />{displayPhone}</a>
          </div>
        </motion.div>
      </motion.div> : null}
    </AnimatePresence>
    <HeaderMessageDialog open={messageOpen} onClose={() => setMessageOpen(false)} />
  </>
}
