export const modalTriggerStyle =
  "border modifiedShipRowCell text-center cursor-pointer shipCellHover"

export const modalOverlayStyle =
  "h-[100%] w-[100%] fixed inset-0 bg-black bg-opacity-40 z-[99] overflow-y-auto"
export const modalStyle =
  "bg-ecgc-secondary rounded-lg shadow-lg w-full md:min-w-[750px] md:w-7/12 p-7 relative my-[1.75rem] mx-auto min-w-[300px] overflow-auto z-[100]"

export const closeButtonStyle =
  "absolute top-2 right-2 text-gray-500 hover:text-gray-300 text-xl sm:text-2xl"

export const tagContainerStyle =
  "absolute top-0 left-1/2 sm:left-0 transform -translate-x-1/2 sm:translate-x-0"

export const shipLinkStyle =
  "text-white bg-transparent no-underline visited:text-white visited:bg-transparent hover:text-[hsla(0,0%,100%,0.75)] hover:bg-transparent hover:underline active:text-red-500 active:bg-transparent active:underline"

export const shipIconContainerStyle =
  "flex flex-col sm:flex-row justify-center items-center gap-4 mt-5"
export const shipIconStyle =
  "overflow-hidden my-1.5 min-w-fit w-fit p-0.5 shadow-[0_10px_25px_0_rgba(0,0,0,1)] h-auto border-radius-0"

// rank color helper functions
export const letterRankColor = (rank: string | null | undefined): string => {
  const getLetterRankColor: { [key: string]: string } = {
    SS: "bg-red-500",
    S: "bg-red-400",
    A: "bg-orange-400",
    B: "bg-orange-300",
    C: "bg-orange-200",
    D: "bg-gray-400",
    "": "",
  }

  return (rank && getLetterRankColor[rank]) || ""
}

export const numberRankColor = (
  rank: number | string | null | undefined,
): string => {
  const getNumberRankColor: { [key: string]: string } = {
    "-5": "bg-yellow-500",
    "-4": "bg-yellow-400",
    "-3": "bg-yellow-300",
    "-2": "bg-yellow-200",
    "-1": "bg-yellow-100",
    "": "",
    "1": "bg-red-100",
    "2": "bg-red-200",
    "3": "bg-red-300",
    "4": "bg-red-400",
    "5": "bg-red-500",
    "6": "bg-red-600",
  }

  return (rank && getNumberRankColor[rank]) || ""
}
