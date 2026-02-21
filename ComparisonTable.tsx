import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Star, Check, X, ExternalLink, ArrowRight } from 'lucide-react'

const comparisonData = [
  {
    tool: 'ChatGPT',
    bestFor: 'General purpose, coding, writing',
    pricing: 'Free / $20/mo',
    features: ['GPT-4o', 'Code interpreter', 'Custom GPTs', 'API access'],
    pros: ['Versatile', 'Large knowledge base', 'Great API'],
    cons: ['Can hallucinate', 'No real-time data (free)'],
    rating: 4.9,
    affiliateLink: 'https://chat.openai.com', // REPLACE with affiliate link
  },
  {
    tool: 'Claude',
    bestFor: 'Long-form content, analysis',
    pricing: 'Free / $20/mo',
    features: ['200K context', 'Claude 3.5 Sonnet', 'Artifacts', 'Projects'],
    pros: ['Excellent reasoning', 'Long context', 'Safer outputs'],
    cons: ['No internet access', 'Smaller ecosystem'],
    rating: 4.8,
    affiliateLink: 'https://claude.ai', // REPLACE with affiliate link
  },
  {
    tool: 'Jasper',
    bestFor: 'Marketing copy, content teams',
    pricing: '$49/mo',
    features: ['50+ templates', 'Brand voice', 'SEO mode', 'Team collaboration'],
    pros: ['Marketing-focused', 'Brand consistency', 'Great support'],
    cons: ['Expensive', 'Less flexible'],
    rating: 4.6,
    affiliateLink: 'https://jasper.ai', // REPLACE with affiliate link - 25-30% recurring
  },
  {
    tool: 'Copy.ai',
    bestFor: 'Social media, ads, emails',
    pricing: 'Free / $36/mo',
    features: ['90+ tools', 'Workflows', 'Chat', 'Brand voice'],
    pros: ['Great free plan', 'Easy to use', 'Fast generation'],
    cons: ['Limited customization', 'Basic integrations'],
    rating: 4.5,
    affiliateLink: 'https://copy.ai', // REPLACE with affiliate link - high commissions
  },
  {
    tool: 'Writesonic',
    bestFor: 'SEO content, articles',
    pricing: 'Free / $16/mo',
    features: ['AI Article Writer', 'Chatsonic', 'Botsonic', 'Photosonic'],
    pros: ['SEO optimized', 'Affordable', 'Good integrations'],
    cons: ['Quality varies', 'Learning curve'],
    rating: 4.4,
    affiliateLink: 'https://writesonic.com', // REPLACE with affiliate link
  },
]

export default function ComparisonTable() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const tableRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const title = titleRef.current
    const table = tableRef.current

    if (!section || !title || !table) return

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

      // Table animation
      gsap.fromTo(table,
        { y: '8vh', opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: table,
            start: 'top 85%',
            end: 'top 55%',
            scrub: 0.5,
          }
        }
      )

      // Rows stagger
      const rows = table.querySelectorAll('tbody tr')
      rows.forEach((row, i) => {
        gsap.fromTo(row,
          { y: 16, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.4,
            delay: i * 0.05,
            scrollTrigger: {
              trigger: row,
              start: 'top 90%',
              end: 'top 70%',
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
      id="compare"
      className="relative w-full py-24 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-dark-light" />
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(135deg, rgba(0,240,255,0.05) 0%, transparent 50%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-12">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-gray-light mb-4">
            Compare Top <span className="text-gradient">AI Tools</span>
          </h2>
          <p className="text-gray-text max-w-2xl mx-auto">
            Side-by-side comparison of the leading AI writing and productivity tools.
          </p>
        </div>

        {/* Table */}
        <div ref={tableRef} className="max-w-7xl mx-auto overflow-x-auto">
          <table className="table-dark min-w-[900px]">
            <thead>
              <tr>
                <th className="w-32">Tool</th>
                <th className="w-48">Best For</th>
                <th className="w-32">Pricing</th>
                <th className="w-64">Key Features</th>
                <th className="w-48">Pros</th>
                <th className="w-48">Cons</th>
                <th className="w-24">Rating</th>
                <th className="w-32">Action</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((item) => (
                <tr key={item.tool} className="group">
                  {/* Tool Name */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-cyan/10 flex items-center justify-center">
                        <span className="font-bold text-cyan">{item.tool[0]}</span>
                      </div>
                      <span className="font-semibold text-gray-light">{item.tool}</span>
                    </div>
                  </td>

                  {/* Best For */}
                  <td>
                    <span className="text-sm text-gray-text">{item.bestFor}</span>
                  </td>

                  {/* Pricing */}
                  <td>
                    <span className="font-mono text-sm text-cyan">{item.pricing}</span>
                  </td>

                  {/* Features */}
                  <td>
                    <div className="flex flex-wrap gap-1">
                      {item.features.map((feature) => (
                        <span 
                          key={feature}
                          className="px-2 py-1 text-xs rounded-full bg-cyan/10 text-cyan border border-cyan/20"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </td>

                  {/* Pros */}
                  <td>
                    <ul className="space-y-1">
                      {item.pros.map((pro) => (
                        <li key={pro} className="flex items-start gap-2 text-sm text-gray-text">
                          <Check className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                          {pro}
                        </li>
                      ))}
                    </ul>
                  </td>

                  {/* Cons */}
                  <td>
                    <ul className="space-y-1">
                      {item.cons.map((con) => (
                        <li key={con} className="flex items-start gap-2 text-sm text-gray-text">
                          <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                          {con}
                        </li>
                      ))}
                    </ul>
                  </td>

                  {/* Rating */}
                  <td>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-cyan fill-cyan" />
                      <span className="font-semibold text-gray-light">{item.rating}</span>
                    </div>
                  </td>

                  {/* Action */}
                  <td>
                    <a
                      href={item.affiliateLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-affiliate text-xs py-2 px-3 whitespace-nowrap"
                    >
                      <ExternalLink className="w-3 h-3 inline mr-1" />
                      Get Deal
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <button className="inline-flex items-center gap-2 text-cyan hover:text-cyan-light transition-colors font-medium">
            See full comparisons <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Affiliate Disclosure */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-text/50">
            * Affiliate links — we may earn a commission when you sign up through our links. 
            This doesn't affect our independent reviews.
          </p>
        </div>
      </div>
    </section>
  )
}
