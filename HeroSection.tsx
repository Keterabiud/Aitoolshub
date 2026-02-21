import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Search, TrendingUp, Star, Zap } from 'lucide-react'

interface HeroSectionProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export default function HeroSection({ searchQuery, setSearchQuery }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const searchRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const card = cardRef.current
    const title = titleRef.current
    const subtitle = subtitleRef.current
    const search = searchRef.current
    const links = linksRef.current

    if (!section || !card || !title || !subtitle || !search || !links) return

    const ctx = gsap.context(() => {
      // Entrance animation (auto-play on load)
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
      
      tl.fromTo(card, 
        { y: 40, scale: 0.98, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.7 }
      )
      .fromTo(title.querySelectorAll('.word'),
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.04 },
        '-=0.4'
      )
      .fromTo(subtitle,
        { y: 12, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.3'
      )
      .fromTo(search,
        { scaleX: 0.92, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.5 },
        '-=0.3'
      )
      .fromTo(links,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4 },
        '-=0.2'
      )

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset to visible when scrolling back to top
            gsap.set([card, title, subtitle, search, links], { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              scaleX: 1 
            })
          }
        }
      })

      // EXIT phase (70%-100%)
      scrollTl.fromTo(card,
        { y: 0, scale: 1, opacity: 1 },
        { y: '-35vh', scale: 0.96, opacity: 0, ease: 'power2.in' },
        0.7
      )
      .fromTo(section.querySelector('.bg-image'),
        { scale: 1, opacity: 1 },
        { scale: 1.06, opacity: 0.6 },
        0.7
      )
    }, section)

    return () => ctx.revert()
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.querySelector(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-image"
        style={{
          backgroundImage: 'url(/images/hero-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-dark/60" />
      
      {/* Vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, transparent 50%, rgba(10,10,15,0.6) 100%)'
        }}
      />

      {/* Main Card */}
      <div 
        ref={cardRef}
        className="relative z-10 w-[86vw] max-w-[980px] min-h-[420px] md:min-h-[480px] card-dark flex flex-col items-center justify-center p-8 md:p-12"
      >
        {/* Title */}
        <h1 
          ref={titleRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-center text-gray-light leading-tight mb-4"
        >
          <span className="word inline-block">Discover</span>{' '}
          <span className="word inline-block">the</span>{' '}
          <span className="word inline-block">Best</span>{' '}
          <span className="word inline-block text-gradient">AI</span>{' '}
          <span className="word inline-block text-gradient">Tools</span>{' '}
          <span className="word inline-block">in</span>{' '}
          <span className="word inline-block">2026</span>
        </h1>

        {/* Subtitle */}
        <p 
          ref={subtitleRef}
          className="text-base md:text-lg text-gray-text text-center max-w-2xl mb-8"
        >
          Compare reviews, pricing, and real-world use cases. 
          Hand-tested tools for productivity, creativity, coding, and more.
        </p>

        {/* Search Bar */}
        <div ref={searchRef} className="w-full max-w-xl mb-6 origin-center">
          <div className="relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-text/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools (e.g., 'video generator', 'code assistant')..."
              className="search-input w-full pl-14 pr-32 py-4"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 btn-affiliate py-2 px-5 text-sm">
              Search
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div ref={linksRef} className="flex flex-wrap items-center justify-center gap-4">
          <button 
            onClick={() => scrollToSection('#featured')}
            className="flex items-center gap-2 text-sm text-gray-text hover:text-cyan transition-colors"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Trending</span>
          </button>
          <span className="text-white/20">|</span>
          <button 
            onClick={() => scrollToSection('#featured')}
            className="flex items-center gap-2 text-sm text-gray-text hover:text-cyan transition-colors"
          >
            <Star className="w-4 h-4" />
            <span>Top Rated</span>
          </button>
          <span className="text-white/20">|</span>
          <button 
            onClick={() => scrollToSection('#categories')}
            className="flex items-center gap-2 text-sm text-gray-text hover:text-cyan transition-colors"
          >
            <Zap className="w-4 h-4" />
            <span>Categories</span>
          </button>
        </div>

        {/* Affiliate Disclosure Badge */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-xs text-gray-text/60">
          <span className="w-2 h-2 rounded-full bg-cyan/60" />
          Affiliate links help support our independent reviews
        </div>
      </div>
    </section>
  )
}
