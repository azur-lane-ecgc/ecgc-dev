interface ItemContainerProps {
  children: React.ReactNode
}

export const ItemContainer: React.FC<ItemContainerProps> = ({ children }) => {
  return <div className="mx-[10px] my-[20px] flex flex-wrap">{children}</div>
}
