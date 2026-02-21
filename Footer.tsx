import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Sparkles, Twitter, Github, Youtube, Linkedin } from 'lucide-react'

const footerLinks = [
  { name: 'About', href: '#' },
  { name: 'Compare', href: '#compare' },
  { name: 'Reviews', href: '#review' },
  { name: 'Submit', href: '#' },
  { name: 'Privacy', href: '#' },
]

const socialLinks = [
  { name: 'Twitter', icon: Twitter, href: '#' },
  { name: 'GitHub', icon: Github, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
]

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const footer = footerRef.current
    if (!footer) return

    const ctx = gsap.context(() => {
      gsap.fromTo(footer.querySelector('.footer-content'),
        { y: 12, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            end: 'top 70%',
            scrub: 0.5,
          }
        }
      )
    }, footer)

    return () => ctx.revert()
  }, [])

  const scrollToSection = (href: string) => {
    if (href === '#') return
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer 
      ref={footerRef}
      className="relative w-full py-16 bg-dark"
    >
      {/* Top Border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/30 to-transparent" />

      {/* Content */}
      <div className="footer-content w-full px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="flex flex-col items-center text-center mb-10">
            {/* Logo */}
            <a 
              href="#"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="flex items-center gap-2 mb-4 group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan to-cyan-dark flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-dark" />
              </div>
              <span className="font-heading font-bold text-xl text-gray-light group-hover:text-cyan transition-colors">
                AIToolsHub
              </span>
            </a>

            {/* Tagline */}
            <p className="text-gray-text max-w-md mb-6">
              Helping teams find the right AI tools—faster. Independent reviews, 
              honest comparisons, and exclusive deals.
            </p>

            {/* Navigation Links */}
            <nav className="flex flex-wrap items-center justify-center gap-6 mb-8">
              {footerLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm text-gray-text hover:text-cyan transition-colors"
                >
                  {link.name}
                </button>
              ))}
            </nav>

            {/* Social Links */}
            <div className="flex items-center gap-4 mb-8">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-cyan/10 hover:border-cyan/30 border border-transparent transition-all group"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5 text-gray-text group-hover:text-cyan transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Affiliate Disclosure */}
          <div className="border-t border-white/5 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Disclosure */}
              <p className="text-xs text-gray-text/50 text-center md:text-left max-w-xl">
                <span className="text-cyan/70">Affiliate Disclosure:</span>{' '}
                AIToolsHub earns affiliate commissions on some links (at no extra cost to you). 
                Our reviews are independent and based on hands-on testing. 
                {/* 
                  LEGAL COMPLIANCE NOTE:
                  This disclosure satisfies FTC guidelines for affiliate marketing.
                  Keep this visible and clear on all pages with affiliate links.
                */}
              </p>

              {/* Copyright */}
              <p className="text-xs text-gray-text/40">
                © 2026 AIToolsHub. All rights reserved.
              </p>
            </div>
          </div>

          {/* Additional Monetization Note */}
          <div className="mt-6 p-4 rounded-xl bg-cyan/5 border border-cyan/10">
            <p className="text-xs text-gray-text/60 text-center">
              <span className="text-cyan">💡 For Advertisers:</span>{' '}
              Interested in sponsoring a review or featuring your AI tool?{' '}
              <a href="#" className="text-cyan hover:underline">
                Contact us for partnership opportunities
              </a>.
              {/* 
                MONETIZATION OPPORTUNITY:
                - Sponsored reviews: $500-$2000 per review
                - Featured placement: $300-$1000/month
                - Newsletter sponsorship: $200-$500 per issue
              */}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
