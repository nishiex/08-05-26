'use client'

import { ShaderGradientCanvas, ShaderGradient } from '@shader-gradient/react'

const canvasProps = {
  pixelDensity: 1.5,
}

const gradientProps = {
  preset: 'interstella',
  colors: ['#73bfc4', '#ffffff', '#dff7f9'],
  chromaticAberration: true,
  chromaticAberrationStrength: 0.016,
}

export function ShaderGradientHero() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}
    >
      <ShaderGradientCanvas
        style={{ width: '100%', height: '100%' }}
        {...canvasProps}
      >
        <ShaderGradient {...gradientProps} />
      </ShaderGradientCanvas>
    </div>
  )
}
