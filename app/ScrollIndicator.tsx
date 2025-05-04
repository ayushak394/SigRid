'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function ScrollToTop() {
  const [scrollRatio, setScrollRatio] = useState(0)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      const totalHeight = document.body.scrollHeight - window.innerHeight
      const ratio = totalHeight > 0 ? currentScrollY / totalHeight : 0

      setScrollY(currentScrollY)
      setScrollRatio(ratio)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <motion.div
            className="bg-teal-500 h-full w-full"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: scrollRatio }}
            style={{ transformOrigin: 'bottom' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
        </div>

        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          className="h-12 w-12 rounded-full bg-white shadow-lg flex items-center justify-center relative z-10 overflow-hidden"
          title="Back to top"
        >
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="46" fill="none" stroke="#e2e8f0" strokeWidth="8" />
            <motion.circle
              cx="50"
              cy="50"
              r="46"
              fill="none"
              stroke="#0d9488"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="289.27"
              initial={{ strokeDashoffset: 289.27 }}
              animate={{
                strokeDashoffset: 289.27 - 289.27 * scrollRatio,
              }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{ transformOrigin: 'center', rotate: '-90deg', transform: 'rotate(-90deg)' }}
            />
          </svg>

          <motion.div
            className="relative z-10 text-teal-600"
            animate={{ y: [0, -5, 0] }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 1.5,
              ease: 'easeInOut',
            }}
          >
            <ArrowRight className="h-6 w-6 rotate-[-90deg]" />
          </motion.div>

          <motion.div
            className="absolute bottom-[-24px] left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded-md shadow-sm text-xs font-medium text-teal-600"
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: scrollY > 100 ? 1 : 0,
              y: scrollY > 100 ? 0 : 10,
            }}
          >
            {Math.round(scrollRatio * 100)}%
          </motion.div>
        </button>
      </div>
    </div>
  )
}
