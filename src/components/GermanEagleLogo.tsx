interface GermanEagleLogoProps {
  className?: string
  size?: number
}

export default function GermanEagleLogo({ className = "", size = 24 }: GermanEagleLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="currentColor"
      className={className}
    >
      {/* German Eagle SVG Path */}
      <path d="M50 15c-2 0-4 1-5 3l-8 12c-1 2-3 3-5 3h-10c-3 0-5 2-5 5v5c0 2 1 4 3 5l15 8c1 1 2 2 2 4v8c0 3-2 5-5 5h-8c-2 0-4 1-5 3l-3 6c-1 2 0 4 2 5l20 10c2 1 4 1 6 0l20-10c2-1 3-3 2-5l-3-6c-1-2-3-3-5-3h-8c-3 0-5-2-5-5v-8c0-2 1-3 2-4l15-8c2-1 3-3 3-5v-5c0-3-2-5-5-5h-10c-2 0-4-1-5-3l-8-12c-1-2-3-3-5-3z"/>
      
      {/* Eagle head and beak */}
      <path d="M50 20c1 0 2 0 3 1l3 3c1 1 1 2 0 3l-2 2c-1 1-2 1-3 1s-2 0-3-1l-2-2c-1-1-1-2 0-3l3-3c1-1 2-1 3-1z"/>
      
      {/* Wings spread */}
      <path d="M25 35c-2 0-4 1-5 3l-5 8c-1 2 0 4 2 5l12 6c2 1 4 0 5-2l3-6c1-2 0-4-2-5l-8-4c-1-1-2-2-2-4v-1z"/>
      <path d="M75 35v1c0 2-1 3-2 4l-8 4c-2 1-3 3-2 5l3 6c1 2 3 3 5 2l12-6c2-1 3-3 2-5l-5-8c-1-2-3-3-5-3z"/>
      
      {/* Tail feathers */}
      <path d="M40 75l-8 8c-1 1-1 3 0 4l4 4c1 1 3 1 4 0l8-8c1-1 1-3 0-4l-4-4c-1-1-3-1-4 0z"/>
      <path d="M60 75l8 8c1 1 1 3 0 4l-4 4c-1 1-3 1-4 0l-8-8c-1-1-1-3 0-4l4-4c1-1 3-1 4 0z"/>
      
      {/* Center body with "1" */}
      <circle cx="50" cy="50" r="8" fill="white"/>
      <text x="50" y="55" textAnchor="middle" fontSize="12" fontWeight="bold" fill="currentColor">1</text>
    </svg>
  )
}
