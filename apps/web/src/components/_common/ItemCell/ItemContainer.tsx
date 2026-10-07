interface ItemContainerProps {
  children: React.ReactNode
}

export const ItemContainer: React.FC<ItemContainerProps> = ({ children }) => {
  return <div className="mx-2.5 my-5 flex flex-wrap">{children}</div>
}
