interface SkeletonProps {
  className?: string
  animate?: boolean
}

export const Skeleton = ({ className = "", animate = true }: SkeletonProps) => {
  return (
    <div className={`relative ${className}`}>
      <div
        className={`
          bg-gray-400 
          rounded 
          ${animate ? "animate-pulse" : ""} 
          w-full h-full
        `}
      />
    </div>
  )
}
