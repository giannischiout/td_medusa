import React from "react"

interface HalfCircleProps {
  size?: number
  className?: string
}

export const HalfCircle: React.FC<HalfCircleProps> = ({
  size = 16,
  className,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer border circle */}
      <circle
        cx="12"
        cy="12"
        r="10.5"
        fill="none"
        stroke="#1d4ed8"
        strokeWidth="1.5"
      />
      {/* Half circle */}
      <path
        d="M12 3C7.03 3 3 7.03 3 12s4.03 9 9 9V3z"
        fill="#3b82f6"
        stroke="#1d4ed8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
