interface ItemContainerProps {
  children: React.ReactNode
}

export const ItemContainer: React.FC<ItemContainerProps> = ({ children }) => {
  return (
    <div className="flex flex-wrap text-center mx-[10px] my-[20px]">
      {children}
    </div>
  )
}
