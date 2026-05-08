'use client'

import React from 'react'

interface ShimmerLoaderProps {
  width?: string
  height?: string
  className?: string
  rounded?: string
}

export function ShimmerLoader({
  width = '100%',
  height = '12px',
  className = '',
  rounded = 'rounded-full',
}: ShimmerLoaderProps) {
  return (
    <div
      className={`relative overflow-hidden bg-[#0d2e35]/10 ${rounded} ${className}`}
      style={{ width, height }}
    >
      <div
        className="absolute inset-0 -translate-x-full animate-[shimmer_1.4s_infinite]"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(26,188,217,0.25) 50%, transparent 100%)',
        }}
      />
    </div>
  )
}
