import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { 
  MessageSquare, 
  Image, 
  Video, 
  PenTool, 
  Zap, 
  Code, 
  Mic, 
  Workflow 
} from 'lucide-react'

interface CategoryGridProps {
  setSelectedCategory: (category: string | null) => void
}

const categories = [
  {
    name: 'AI Chatbots',
    description: 'Conversational AI assistants',
    icon: MessageSquare,
    toolCount: 24,
    topTool: 'ChatGPT',
  },
  {
    name: 'Image Generators',
    description: 'Create stunning visuals with AI',
    icon: Image,
    toolCount: 18,
    topTool: 'Midjourney',
  },
  {
    name: 'Video & Animation',
    description: 'AI-powered video creation',
    icon: Video,
    toolCount: 15,
    topTool: 'Runway',
  },
  {
    name: 'Writing Assistants',
    description: 'AI copywriting and content',
    icon: PenTool,
    toolCount: 22,
    topTool: 'Jasper',
  },
  {
    name: 'Productivity',
    description: 'Boost your workflow efficiency',
    icon: Zap,
    toolCount: 19,
    topTool: 'Notion AI',
  },
  {
    name: 'Code Assistants',
    description: 'AI-powered development tools',
    icon: Code,
    toolCount: 16,
    topTool: 'GitHub Copilot',
  },
  {
    name: 'Audio & Voice',
    description: 'Voice synthesis and audio AI',
    icon: Mic,
    toolCount: 12,
    topTool: 'ElevenLabs',
  },
  {
    name: 'Automation',
    description: 'Streamline repetitive tasks',
    icon: Workflow,
    toolCount: 14,
    topTool: 'Zapier AI',
  },
]

export default function CategoryGrid({ setSelectedCategory }: CategoryGridProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const header = headerRef.current
    const grid = gridRef.current

    if (!section || !header || !grid) return

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(header,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: header,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.5,
          }
        }
      )

      // Cards stagger animation
      const cards = grid.querySelectorAll('.category-card')
      cards.forEach((card) => {
        gsap.fromTo(card,
          { y: '10vh', scale: 0.96, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.5,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 55%',
              scrub: 0.5,
            }
          }
        )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section 
      ref={sectionRef}
      id="categories"
      className="relative w-full py-24 overflow-hidden"
    >
      {/* Background */}
      <div 
        className="absolute inset-0 opacity-20"
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
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-light mb-4">
            Browse by <span className="text-gradient">Category</span>
          </h2>
          <p className="text-gray-text max-w-2xl mx-auto">
            Explore AI tools organized by use case. Find exactly what you need for your workflow.
          </p>
        </div>

        {/* Grid */}
        <div 
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
        >
          {categories.map((category) => (
            <div
              key={category.name}
              className="category-card group"
              onClick={() => setSelectedCategory(category.name)}
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-cyan/10 flex items-center justify-center mb-4 group-hover:bg-cyan/20 transition-colors">
                <category.icon className="w-6 h-6 text-cyan" />
              </div>

              {/* Content */}
              <h3 className="text-lg font-heading font-semibold text-gray-light mb-1 group-hover:text-cyan transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-gray-text mb-4">
                {category.description}
              </p>

              {/* Stats */}
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-text/60">
                  {category.toolCount} tools
                </span>
                <span className="text-cyan font-mono">
                  Top: {category.topTool}
                </span>
              </div>

              {/* Hover Arrow */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-cyan/20 flex items-center justify-center">
                  <span className="text-cyan text-lg">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AdSense Placeholder - Between Grid and Bottom */}
        {/* 
          GOOGLE ADSENSE PLACEHOLDER
          Recommended format: Responsive display ad or 336x280
        */}
        <div className="mt-16 flex justify-center">
          <div className="w-[336px] h-[280px] adsense-placeholder">
            <span className="text-xs text-gray-text/40">AdSense - 336x280</span>
          </div>
        </div>
      </div>
    </section>
  )
}
