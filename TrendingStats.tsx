import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { TrendingUp, Users, Star, BarChart3 } from 'lucide-react'

const stats = [
  {
    value: '+34%',
    label: 'Teams adopting AI video tools',
    icon: TrendingUp,
    sparkline: [30, 35, 32, 40, 45, 42, 50, 55, 60, 65, 70, 75],
    color: '#00F0FF',
  },
  {
    value: '12.4M',
    label: 'Monthly AI tool comparisons on AIToolsHub',
    icon: Users,
    sparkline: [40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95],
    color: '#00F0FF',
  },
  {
    value: '8.2/10',
    label: 'Average rating for top 20 tools',
    icon: Star,
    sparkline: [70, 72, 71, 73, 75, 76, 78, 79, 80, 81, 82, 82],
    color: '#00F0FF',
  },
]

export default function TrendingStats() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    const cards = cardsRef.current

    if (!section || !title || !cards) return

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(title,
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.5,
          }
        }
      )

      // Cards stagger animation
      const cardElements = cards.querySelectorAll('.stat-card')
      cardElements.forEach((card, i) => {
        gsap.fromTo(card,
          { y: '8vh', scale: 0.97, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.5,
            delay: i * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 55%',
              scrub: 0.5,
            }
          }
        )
      })

      // Sparkline draw animation
      const sparklines = cards.querySelectorAll('.sparkline-path')
      sparklines.forEach((path) => {
        const pathElement = path as SVGPathElement
        const length = pathElement.getTotalLength()
        
        gsap.set(pathElement, {
          strokeDasharray: length,
          strokeDashoffset: length,
        })

        gsap.to(pathElement, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: pathElement,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          }
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const generateSparklinePath = (data: number[]) => {
    const width = 120
    const height = 40
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1
    
    const points = data.map((value, i) => {
      const x = (i / (data.length - 1)) * width
      const y = height - ((value - min) / range) * height
      return `${x},${y}`
    })
    
    return `M ${points.join(' L ')}`
  }

  return (
    <section 
      ref={sectionRef}
      className="relative w-full py-24 overflow-hidden"
    >
      {/* Background */}
      <div 
        className="absolute inset-0 opacity-15"
        style={{
          backgroundImage: 'url(/images/bokeh-texture.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-dark/90" />

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-16">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-cyan" />
            <span className="text-sm font-mono uppercase tracking-wider text-cyan">
              Live Data
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-light mb-4">
            What's <span className="text-gradient">Trending</span> This Month
          </h2>
          <p className="text-gray-text max-w-2xl mx-auto">
            Real-time insights from our community of AI tool users and reviewers.
          </p>
        </div>

        {/* Stats Cards */}
        <div 
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="stat-card card-dark p-6 group hover:border-cyan/30 transition-all"
            >
              {/* Icon */}
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan/10 flex items-center justify-center">
                  <stat.icon className="w-5 h-5 text-cyan" />
                </div>
                <span className="text-xs font-mono text-gray-text/50 uppercase tracking-wider">
                  2026
                </span>
              </div>

              {/* Value */}
              <div className="text-4xl md:text-5xl font-heading font-bold text-gradient mb-2">
                {stat.value}
              </div>

              {/* Label */}
              <p className="text-sm text-gray-text mb-4">
                {stat.label}
              </p>

              {/* Sparkline */}
              <div className="h-10 w-full">
                <svg 
                  viewBox="0 0 120 40" 
                  className="w-full h-full"
                  preserveAspectRatio="none"
                >
                  <path
                    className="sparkline-path"
                    d={generateSparklinePath(stat.sparkline)}
                    fill="none"
                    stroke={stat.color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* AdSense Placeholder */}
        {/* 
          GOOGLE ADSENSE PLACEHOLDER
          Recommended format: Responsive display ad
        */}
        <div className="mt-16 flex justify-center">
          <div className="w-full max-w-[728px] h-[90px] adsense-placeholder">
            <span className="text-xs text-gray-text/40">AdSense - 728x90 Banner</span>
          </div>
        </div>
      </div>
    </section>
  )
}
