interface ModalContentProps {
  ship: string
}

export const ModalContent: React.FC<ModalContentProps> = ({ ship }) => {
  return (
    <div className="container mx-auto text-center">
      <p>{ship} is really good trust me bro</p>
    </div>
  )
}
