'use client'

import { useEffect, useState } from 'react'
import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function Studio() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#0B0B0C] flex items-center justify-center text-white font-sans">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#C27AFF] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-sm font-medium text-purple-200">Loading Sanity Studio...</p>
        </div>
      </div>
    )
  }

  return <NextStudio config={config} />
}
