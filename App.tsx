import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'

// Import sections
import Navbar from './sections/Navbar'
import HeroSection from './sections/HeroSection'
import FeaturedTools from './sections/FeaturedTools'
import CategoryGrid from './sections/CategoryGrid'
import ComparisonTable from './sections/ComparisonTable'
import EditorialReview from './sections/EditorialReview'
import UseCaseSpotlight from './sections/UseCaseSpotlight'
import TrendingStats from './sections/TrendingStats'
import NewsletterCTA from './sections/NewsletterCTA'
import Footer from './sections/Footer'

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

function App() {
  const mainRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    // Wait for all sections to mount before setting up global snap
    const timer = setTimeout(() => {
      setupGlobalSnap()
    }, 500)

    return () => {
      clearTimeout(timer)
      ScrollTrigger.getAll().forEach(st => st.kill())
    }
  }, [])

  const setupGlobalSnap = () => {
    const pinned = ScrollTrigger.getAll()
      .filter(st => st.vars.pin)
      .sort((a, b) => a.start - b.start)
    
    const maxScroll = ScrollTrigger.maxScroll(window)
    if (!maxScroll || pinned.length === 0) return

    const pinnedRanges = pinned.map(st => ({
      start: st.start / maxScroll,
      end: (st.end ?? st.start) / maxScroll,
      center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
    }))

    ScrollTrigger.create({
      snap: {
        snapTo: (value: number) => {
          const inPinned = pinnedRanges.some(r => value >= r.start - 0.08 && value <= r.end + 0.08)
          if (!inPinned) return value

          const target = pinnedRanges.reduce((closest, r) =>
            Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
            pinnedRanges[0]?.center ?? 0
          )
          return target
        },
        duration: { min: 0.15, max: 0.35 },
        delay: 0,
        ease: "power2.out"
      }
    })
  }

  return (
    <div ref={mainRef} className="relative bg-dark min-h-screen">
      {/* Noise overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 noise-overlay opacity-50" />
      
      {/* Navigation */}
      <Navbar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      {/* Main Content */}
      <main className="relative">
        {/* Section 1: Hero - pin: true */}
        <HeroSection 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        
        {/* Section 2: Featured Tools - pin: true */}
        <FeaturedTools 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        
        {/* Section 3: Category Grid - pin: false */}
        <CategoryGrid 
          setSelectedCategory={setSelectedCategory}
        />
        
        {/* Section 4: Comparison Table - pin: false */}
        <ComparisonTable />
        
        {/* Section 5: Editorial Review - pin: true */}
        <EditorialReview />
        
        {/* Section 6: Use Case Spotlight - pin: true */}
        <UseCaseSpotlight />
        
        {/* Section 7: Trending Stats - pin: false */}
        <TrendingStats />
        
        {/* Section 8: Newsletter CTA - pin: true */}
        <NewsletterCTA />
        
        {/* Section 9: Footer - pin: false */}
        <Footer />
      </main>
    </div>
  )
}

export default App
