import { useState, useEffect } from 'react'
import { Search, Menu, X, Sparkles, Zap, Star } from 'lucide-react'

interface NavbarProps {
  searchQuery: string
  setSearchQuery: (query: string) => void
}

export default function Navbar({ searchQuery, setSearchQuery }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showSearch, setShowSearch] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Discover', href: '#featured', icon: Sparkles },
    { name: 'Compare', href: '#compare', icon: Zap },
    { name: 'Reviews', href: '#review', icon: Star },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      {/* Affiliate Disclosure Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 affiliate-banner">
        This site contains affiliate links — we may earn a commission at no extra cost to you.
      </div>

      {/* Main Navbar */}
      <nav 
        className={`fixed left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled 
            ? 'top-8 bg-dark/90 backdrop-blur-xl border-b border-white/5' 
            : 'top-8 bg-transparent'
        }`}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a 
              href="#" 
              className="flex items-center gap-2 group"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan to-cyan-dark flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-dark" />
              </div>
              <span className="font-heading font-bold text-lg text-gray-light group-hover:text-cyan transition-colors">
                AIToolsHub
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm text-gray-text hover:text-cyan transition-colors font-medium"
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Search Toggle (Desktop) */}
              <button
                onClick={() => setShowSearch(!showSearch)}
                className="hidden md:flex items-center justify-center w-10 h-10 rounded-xl border border-white/10 hover:border-cyan/50 hover:bg-cyan/5 transition-all"
              >
                <Search className="w-4 h-4 text-gray-text" />
              </button>

              {/* Submit Button */}
              <button className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-cyan text-cyan text-sm font-medium hover:bg-cyan/10 transition-all">
                Submit
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl border border-white/10"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-text" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-text" />
                )}
              </button>
            </div>
          </div>

          {/* Search Bar (Expandable) */}
          <div className={`overflow-hidden transition-all duration-300 ${showSearch ? 'max-h-20 pb-4' : 'max-h-0'}`}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-text" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search AI tools..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-dark-light border border-white/10 text-sm text-gray-light placeholder:text-gray-text/50 focus:outline-none focus:border-cyan"
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? 'max-h-80' : 'max-h-0'}`}>
          <div className="px-4 py-4 bg-dark/95 backdrop-blur-xl border-t border-white/5">
            {/* Mobile Search */}
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-text" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search AI tools..."
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-dark-light border border-white/10 text-sm text-gray-light placeholder:text-gray-text/50 focus:outline-none focus:border-cyan"
              />
            </div>

            {/* Mobile Nav Links */}
            <div className="space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-gray-text hover:text-cyan hover:bg-cyan/5 transition-all"
                >
                  <link.icon className="w-4 h-4" />
                  {link.name}
                </button>
              ))}
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-cyan text-cyan mt-4">
                Submit Tool
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}
