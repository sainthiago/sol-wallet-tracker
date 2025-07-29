interface BubbleIconProps {
    size?: number
    className?: string
  }
  
  export function BubbleIcon({ size = 32, className = "" }: BubbleIconProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        <defs>
          <radialGradient id="bubbleGradient" cx="0.3" cy="0.3" r="0.8">
            <stop offset="0%" stopColor="#93c5fd" />
            <stop offset="50%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </radialGradient>
          <radialGradient id="highlight" cx="0.4" cy="0.3" r="0.3">
            <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>
  
        {/* Main bubble */}
        <circle cx="16" cy="16" r="14" fill="url(#bubbleGradient)" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
  
        {/* Main highlight */}
        <ellipse cx="12" cy="10" rx="4" ry="3" fill="url(#highlight)" />
  
        {/* Small highlight */}
        <circle cx="20" cy="8" r="2" fill="rgba(255,255,255,0.6)" />
      </svg>
    )
  }
  