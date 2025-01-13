import { Skeleton } from "./Skeleton"
import "@components/_common/ItemCell/styles.css"

export const ItemCellSkeleton = () => {
  return (
    <div
      className={`${"border modifiedShipRowCell text-center"} border-gray-400`}
    >
      <div className="relative">
        {/* IMG Skeleton HEre */}
        <Skeleton className="overflow-hidden my-1.5 mx-auto w-[60px] p-0.5 shadow-[0_10px_25px_0_rgb(0,0,0)] h-[60px] mb-2" />
        {/* TEXT SKELETON HERE */}
        <div className="flex flex-col items-center justify-center">
          <Skeleton className="w-[69%] h-2 mb-1" />
          <Skeleton className="w-[42%] h-2" />
        </div>
      </div>
    </div>
  )
}
