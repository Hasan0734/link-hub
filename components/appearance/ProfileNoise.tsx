import React from 'react'

export const ProfileNoise: React.FC = () => {
  return (
    <svg
      style={{
        position: 'absolute',
        width: 0,
        height: 0,
        pointerEvents: 'none'
      }}
      aria-hidden="true"
      focusable="false"
    >
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.75" />
        <feColorMatrix type="saturate" values="0" />
        <feBlend mode="multiply" in="SourceGraphic" />
      </filter>
    </svg>
  )
}