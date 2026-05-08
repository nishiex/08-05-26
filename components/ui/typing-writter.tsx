'use client'

import { useEffect, useState } from 'react'

interface TypeWritterProps {
  text: string
  charDelay?: number
  onComplete?: () => void
  className?: string
}

export function TypeWritter({ text, charDelay = 55, onComplete, className }: TypeWritterProps) {
  const [displayed, setDisplayed] = useState('')

  useEffect(() => {
    let i = 0
    setDisplayed('')
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(interval)
        onComplete?.()
      }
    }, charDelay)
    return () => clearInterval(interval)
  }, [text, charDelay, onComplete])

  return (
    <span className={className}>
      {displayed}
      {displayed.length < text.length && (
        <span className="inline-block w-[2px] h-[1em] bg-current align-middle ml-0.5 animate-[blink_0.7s_step-end_infinite]" />
      )}
    </span>
  )
}
