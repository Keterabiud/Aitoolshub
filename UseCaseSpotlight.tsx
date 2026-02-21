import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowRight, Wand2, Image, Video, Mic } from 'lucide-react'

export default function UseCaseSpotlight() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const headline = headlineRef.current
    const cta = ctaRef.current

    if (!section || !headline || !cta) return

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        }
      })

      // ENTRANCE (0%-30%)
      scrollTl.fromTo(section.querySelector('.bg-image'),
        { scale: 1.08, opacity: 0.7 },
        { scale: 1, opacity: 1, duration: 0.3 },
        0
      )
      .fromTo(headline,
        { y: '-18vh', opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3 },
        0
      )
      .fromTo(cta,
        { y: '10vh', scale: 0.92, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.3 },
        0.1
      )

      // SETTLE (30%-70%) - subtle drift
      scrollTl.fromTo(section.querySelector('.bg-image'),
        { x: 0 },
        { x: -8, duration: 0.4 },
        0.3
      )

      // EXIT (70%-100%)
      scrollTl.fromTo(headline,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.7
      )
      .fromTo(cta,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.7
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-image"
        style={{
          backgroundImage: 'url(/images/spotlight-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-dark/70" />
      
      {/* Text Shadow Overlay for readability */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(10,10,15,0.3) 0%, transparent 70%)'
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full px-6 text-center">
        {/* Headline */}
        <h2 
          ref={headlineRef}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-heading font-bold text-gray-light max-w-4xl mx-auto leading-tight mb-8"
          style={{
            textShadow: '0 4px 30px rgba(0,0,0,0.5)'
          }}
        >
          Turn a single prompt into a{' '}
          <span className="text-gradient">complete marketing campaign</span>
          —copy, visuals, and voiceover.
        </h2>

        {/* Feature Icons */}
        <div className="flex items-center justify-center gap-8 mb-10">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center border border-cyan/20">
              <Wand2 className="w-6 h-6 text-cyan" />
            </div>
            <span className="text-xs text-gray-text">Copy</span>
          </div>
          <div className="text-cyan/40">→</div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center border border-cyan/20">
              <Image className="w-6 h-6 text-cyan" />
            </div>
            <span className="text-xs text-gray-text">Images</span>
          </div>
          <div className="text-cyan/40">→</div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center border border-cyan/20">
              <Video className="w-6 h-6 text-cyan" />
            </div>
            <span className="text-xs text-gray-text">Video</span>
          </div>
          <div className="text-cyan/40">→</div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center border border-cyan/20">
              <Mic className="w-6 h-6 text-cyan" />
            </div>
            <span className="text-xs text-gray-text">Voice</span>
          </div>
        </div>

        {/* CTA */}
        <div ref={ctaRef}>
          <a
            href="#featured"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#featured')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="btn-affiliate text-base px-8 py-4"
          >
            Explore AI Workflows
            <ArrowRight className="w-5 h-5 ml-2 inline" />
          </a>
        </div>
      </div>
    </section>
  )
}
