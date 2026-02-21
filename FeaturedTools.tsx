import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Star, ExternalLink, ArrowRight } from 'lucide-react'

interface FeaturedToolsProps {
  selectedCategory: string | null
  setSelectedCategory: (category: string | null) => void
}

const tools = [
  {
    id: 1,
    name: 'ChatGPT',
    description: 'The most advanced conversational AI for writing, coding, and research.',
    rating: 4.9,
    reviews: 2847,
    pricing: 'Free / $20/mo',
    category: 'AI Chatbots',
    affiliateLink: 'https://chat.openai.com', // REPLACE with your affiliate link
    affiliateRate: 'N/A',
  },
  {
    id: 2,
    name: 'Midjourney',
    description: 'Create stunning AI-generated images with unmatched artistic quality.',
    rating: 4.8,
    reviews: 1923,
    pricing: '$10/mo',
    category: 'Image Generators',
    affiliateLink: 'https://midjourney.com', // REPLACE with your affiliate link
    affiliateRate: '20% recurring',
  },
  {
    id: 3,
    name: 'Claude',
    description: 'Anthropic\'s AI assistant with exceptional reasoning and safety.',
    rating: 4.8,
    reviews: 1567,
    pricing: 'Free / $20/mo',
    category: 'AI Chatbots',
    affiliateLink: 'https://claude.ai', // REPLACE with your affiliate link
    affiliateRate: 'N/A',
  },
  {
    id: 4,
    name: 'Runway',
    description: 'Professional AI video editing and generation for creators.',
    rating: 4.7,
    reviews: 892,
    pricing: '$15/mo',
    category: 'Video & Animation',
    affiliateLink: 'https://runwayml.com', // REPLACE with your affiliate link
    affiliateRate: '25% recurring',
  },
  {
    id: 5,
    name: 'ElevenLabs',
    description: 'The most realistic AI voice synthesis and text-to-speech.',
    rating: 4.9,
    reviews: 1234,
    pricing: 'Free / $5/mo',
    category: 'Audio & Voice',
    affiliateLink: 'https://elevenlabs.io', // REPLACE with your affiliate link
    affiliateRate: '22% recurring',
  },
]

export default function FeaturedTools({ setSelectedCategory }: FeaturedToolsProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const textBlockRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(2)

  useEffect(() => {
    const section = sectionRef.current
    const carousel = carouselRef.current
    const textBlock = textBlockRef.current

    if (!section || !carousel || !textBlock) return

    const ctx = gsap.context(() => {
      const cards = carousel.querySelectorAll('.tool-card-3d')
      
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.7,
        }
      })

      // ENTRANCE (0%-30%)
      scrollTl.fromTo(section.querySelector('.bg-image'),
        { scale: 1.08, opacity: 0.7 },
        { scale: 1, opacity: 1, duration: 0.3 },
        0
      )
      .fromTo(textBlock,
        { x: '-18vw', opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3 },
        0
      )
      .fromTo(carousel,
        { y: '18vh', opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3 },
        0
      )
      
      // Cards 3D entrance with stagger
      cards.forEach((card, i) => {
        scrollTl.fromTo(card,
          { z: -400, rotateY: 35, opacity: 0 },
          { z: 0, rotateY: 0, opacity: 1, duration: 0.25, ease: 'power2.out' },
          0.05 + i * 0.04
        )
      })

      // EXIT (70%-100%)
      scrollTl.fromTo(textBlock,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.7
      )
      .fromTo(carousel,
        { x: 0, opacity: 1 },
        { x: '-22vw', opacity: 0, ease: 'power2.in' },
        0.7
      )
      .fromTo(section.querySelector('.bg-image'),
        { opacity: 1 },
        { opacity: 0.65 },
        0.7
      )
    }, section)

    return () => ctx.revert()
  }, [])

  // Ambient float animation
  useEffect(() => {
    const cards = document.querySelectorAll('.tool-card-3d')
    cards.forEach((card, i) => {
      gsap.to(card, {
        y: '+=6',
        duration: 3.2 + i * 0.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })
    })
  }, [])

  const getCardStyle = (index: number) => {
    const diff = index - activeIndex
    const absDistance = Math.abs(diff)
    
    if (absDistance > 2) return { display: 'none' }
    
    const translateX = diff * 280
    const translateZ = -absDistance * 120
    const rotateY = diff * -15
    const scale = 1 - absDistance * 0.15
    const opacity = 1 - absDistance * 0.3
    const zIndex = 10 - absDistance

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
      opacity,
      zIndex,
    }
  }

  return (
    <section 
      ref={sectionRef}
      id="featured"
      className="relative w-full h-screen flex items-center overflow-hidden"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-image"
        style={{
          backgroundImage: 'url(/images/carousel-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-dark/70" />

      {/* Content Container */}
      <div className="relative z-10 w-full px-6 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-8">
        
        {/* Left Text Block */}
        <div 
          ref={textBlockRef}
          className="lg:w-[22vw] lg:max-w-[320px] text-center lg:text-left"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-gray-light mb-4">
            Featured <span className="text-gradient">Tools</span>
          </h2>
          <p className="text-gray-text mb-6 leading-relaxed">
            Hand-picked AI tools that actually save time—tested across design, code, and automation.
          </p>
          <button 
            onClick={() => setSelectedCategory(null)}
            className="inline-flex items-center gap-2 text-cyan hover:text-cyan-light transition-colors font-medium"
          >
            View all <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3D Carousel */}
        <div 
          ref={carouselRef}
          className="relative flex-1 flex items-center justify-center perspective-1000"
          style={{ minHeight: '450px' }}
        >
          <div className="relative preserve-3d" style={{ width: '300px', height: '400px' }}>
            {tools.map((tool, index) => (
              <div
                key={tool.id}
                className={`tool-card-3d absolute inset-0 tool-card cursor-pointer transition-all duration-500 ${
                  index === activeIndex ? 'glow-cyan' : ''
                }`}
                style={getCardStyle(index)}
                onClick={() => setActiveIndex(index)}
              >
                {/* Card Content */}
                <div className="h-full flex flex-col p-6">
                  {/* Tool Icon/Logo Placeholder */}
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan/20 to-cyan/5 flex items-center justify-center mb-4 border border-cyan/20">
                    <span className="text-xl font-bold text-cyan">{tool.name[0]}</span>
                  </div>

                  {/* Tool Name */}
                  <h3 className="text-xl font-heading font-bold text-gray-light mb-2">
                    {tool.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-text mb-4 flex-1">
                    {tool.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(tool.rating) ? 'star-filled fill-cyan' : 'star-empty'}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-text">{tool.rating}</span>
                    <span className="text-xs text-gray-text/60">({tool.reviews})</span>
                  </div>

                  {/* Pricing */}
                  <div className="text-sm font-mono text-cyan mb-4">
                    {tool.pricing}
                  </div>

                  {/* Affiliate CTA Button */}
                  <a
                    href={tool.affiliateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-affiliate w-full text-center text-sm"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink className="w-4 h-4 inline mr-2" />
                    Try Now
                  </a>

                  {/* Affiliate Rate Badge (for transparency) */}
                  {index === activeIndex && tool.affiliateRate !== 'N/A' && (
                    <div className="absolute -top-2 -right-2 px-2 py-1 bg-cyan/20 rounded-full text-xs text-cyan border border-cyan/30">
                      {tool.affiliateRate}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {tools.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeIndex ? 'bg-cyan w-6' : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* AdSense Placeholder - Below Carousel */}
      {/* 
        GOOGLE ADSENSE PLACEHOLDER
        To activate: 
        1. Sign up at https://www.google.com/adsense
        2. Replace the div below with your AdSense code
        3. Recommended format: Responsive display ad
      */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[728px] max-w-[90vw] adsense-placeholder">
        <span className="text-xs text-gray-text/40">AdSense Banner - 728x90</span>
      </div>
    </section>
  )
}
