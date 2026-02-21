import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ArrowRight, Star, Clock, Users } from 'lucide-react'

export default function EditorialReview() {
  const sectionRef = useRef<HTMLElement>(null)
  const imageCardRef = useRef<HTMLDivElement>(null)
  const textCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const imageCard = imageCardRef.current
    const textCard = textCardRef.current

    if (!section || !imageCard || !textCard) return

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.7,
        }
      })

      // ENTRANCE (0%-30%)
      scrollTl.fromTo(section.querySelector('.bg-image'),
        { scale: 1.06, opacity: 0.7 },
        { scale: 1, opacity: 1, duration: 0.3 },
        0
      )
      .fromTo(imageCard,
        { x: '-60vw', rotateZ: -2, opacity: 0 },
        { x: 0, rotateZ: 0, opacity: 1, duration: 0.3 },
        0
      )
      .fromTo(textCard,
        { x: '60vw', rotateZ: 2, opacity: 0 },
        { x: 0, rotateZ: 0, opacity: 1, duration: 0.3 },
        0
      )

      // SETTLE (30%-70%) - subtle parallax
      scrollTl.fromTo(section.querySelector('.bg-image'),
        { y: 0 },
        { y: -10, duration: 0.4 },
        0.3
      )

      // EXIT (70%-100%)
      scrollTl.fromTo(imageCard,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.7
      )
      .fromTo(textCard,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      )
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      id="review"
      className="relative w-full h-screen flex items-center overflow-hidden"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-image"
        style={{
          backgroundImage: 'url(/images/review-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-dark/65" />

      {/* Content Container */}
      <div className="relative z-10 w-full px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
        
        {/* Image Card */}
        <div 
          ref={imageCardRef}
          className="w-full lg:w-[44vw] lg:max-w-[640px] h-[40vh] lg:h-[62vh] rounded-2xl overflow-hidden card-dark"
        >
          <img 
            src="/images/review-image.jpg" 
            alt="Midjourney V7 Interface"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Card */}
        <div 
          ref={textCardRef}
          className="w-full lg:w-[40vw] lg:max-w-[520px] min-h-[40vh] lg:h-[62vh] card-dark p-6 lg:p-10 flex flex-col justify-center"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-2 mb-4">
            <span className="px-3 py-1 text-xs font-mono uppercase tracking-wider rounded-full bg-cyan/10 text-cyan border border-cyan/20">
              Editor's Choice
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-cyan fill-cyan" />
              <span className="text-sm text-gray-light font-semibold">4.9</span>
            </div>
          </div>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-gray-light mb-4 leading-tight">
            Why <span className="text-gradient">Midjourney V7</span> Still Leads for Visual Storytelling
          </h2>

          {/* Content */}
          <div className="space-y-4 mb-6">
            <p className="text-gray-text leading-relaxed">
              Midjourney V7 delivers sharper prompt adherence, better typography handling, 
              and a more consistent cinematic look than ever before.
            </p>
            <p className="text-gray-text leading-relaxed">
              We tested it against five competitors across 120 real-world prompts—here's 
              where it wins (and where it doesn't).
            </p>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-6 mb-6 text-sm">
            <div className="flex items-center gap-2 text-gray-text">
              <Clock className="w-4 h-4 text-cyan" />
              <span>15 min read</span>
            </div>
            <div className="flex items-center gap-2 text-gray-text">
              <Users className="w-4 h-4 text-cyan" />
              <span>2.4K readers</span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="https://midjourney.com" // REPLACE with affiliate link
              target="_blank"
              rel="noopener noreferrer"
              className="btn-affiliate"
            >
              Read the full review
              <ArrowRight className="w-4 h-4 ml-2 inline" />
            </a>
            <span className="text-xs text-gray-text/50">
              * Affiliate link in full review
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
