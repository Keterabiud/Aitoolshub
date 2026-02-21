import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { Mail, ArrowRight, Check, Sparkles } from 'lucide-react'

export default function NewsletterCTA() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    const card = cardRef.current

    if (!section || !card) return

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
        { scale: 1.05, opacity: 0.7 },
        { scale: 1, opacity: 1, duration: 0.3 },
        0
      )
      .fromTo(card,
        { y: '18vh', scale: 0.94, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, duration: 0.3 },
        0
      )

      // EXIT (70%-100%)
      scrollTl.fromTo(card,
        { y: 0, opacity: 1 },
        { y: '-12vh', opacity: 0, ease: 'power2.in' },
        0.7
      )
    }, section)

    return () => ctx.revert()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      // Here you would typically send to your email service
      // Example: Mailchimp, ConvertKit, Beehiiv, etc.
      setTimeout(() => {
        setEmail('')
        setIsSubmitted(false)
      }, 3000)
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
          backgroundImage: 'url(/images/newsletter-bg.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-dark/70" />

      {/* Content Card */}
      <div 
        ref={cardRef}
        className="relative z-10 w-[82vw] max-w-[720px] min-h-[320px] card-dark p-8 md:p-12 flex flex-col items-center justify-center text-center"
      >
        {/* Icon */}
        <div className="w-14 h-14 rounded-xl bg-cyan/10 flex items-center justify-center mb-6 border border-cyan/20">
          <Sparkles className="w-7 h-7 text-cyan" />
        </div>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-gray-light mb-4">
          Get the next AI tool drop{' '}
          <span className="text-gradient">before everyone else</span>.
        </h2>

        {/* Subtitle */}
        <p className="text-gray-text mb-8 max-w-md">
          One email per week with hand-picked AI tools, exclusive deals, and insider reviews.
          No spam. Unsubscribe anytime.
        </p>

        {/* Form */}
        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-text/50" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-xl bg-dark border border-white/10 text-gray-light placeholder:text-gray-text/50 focus:outline-none focus:border-cyan transition-colors"
                />
              </div>
              <button
                type="submit"
                className="btn-affiliate whitespace-nowrap"
              >
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2 inline" />
              </button>
            </div>
            
            {/* Privacy Note */}
            <p className="mt-4 text-xs text-gray-text/50">
              We respect your privacy. No sharing, ever.
            </p>
          </form>
        ) : (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="w-16 h-16 rounded-full bg-cyan/10 flex items-center justify-center border border-cyan/20">
              <Check className="w-8 h-8 text-cyan" />
            </div>
            <p className="text-lg text-gray-light font-medium">
              You're on the list!
            </p>
            <p className="text-sm text-gray-text">
              Check your inbox for a welcome email.
            </p>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-8 mt-8 pt-8 border-t border-white/5">
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-cyan">47K+</div>
            <div className="text-xs text-gray-text/60">Subscribers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-cyan">4.9★</div>
            <div className="text-xs text-gray-text/60">Rating</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-heading font-bold text-cyan">Weekly</div>
            <div className="text-xs text-gray-text/60">Updates</div>
          </div>
        </div>
      </div>
    </section>
  )
}
