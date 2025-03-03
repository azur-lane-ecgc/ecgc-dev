import "@components/_common/ItemCell/styles.css"
import { Skeleton } from "./Skeleton"

interface itemSkeletonProps {
  id?: string
}

export const ItemCellSkeleton: React.FC<itemSkeletonProps> = ({ id }) => {
  return (
    <div
      {...(id && { id })}
      className={`${"modifiedShipRowCell border text-center"} border-gray-400`}
    >
      <div className="relative">
        {/* IMG Skeleton HERE */}
        <Skeleton className="mx-auto my-1.5 mb-2 h-[60px] w-[60px] overflow-hidden p-0.5 shadow-[0_10px_25px_0_rgb(0,0,0)]" />
        {/* TEXT SKELETON HERE */}
        <div className="flex flex-col items-center justify-center">
          <Skeleton className="mb-1 h-2 w-[69%]" />
          <Skeleton className="h-2 w-[42%]" />
        </div>
      </div>
    </div>
  )
}
