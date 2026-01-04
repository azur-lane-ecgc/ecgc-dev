interface SkeletonProps {
  className?: string
  animate?: boolean
}

export const Skeleton = ({ className = "", animate = true }: SkeletonProps) => {
  return (
    <div className={`relative ${className}`}>
      <div
        className={`rounded bg-gray-400 ${animate ? "animate-pulse" : ""} h-full w-full`}
      />
    </div>
  )
}
