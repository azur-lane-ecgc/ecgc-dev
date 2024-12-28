import { useState } from "react"
import { ComboBox } from "./ComboBox"

export const ComboBoxWrapper = ({
  title,
  options,
}: {
  title: string
  options: string[]
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const handleSelect = (option: string | null) => {
    console.log("parent selected option:", option)
    setSelectedOption(option)
  }

  return (
    <div>
      <ComboBox title={title} options={options} onSelect={handleSelect} />
      <div>
        <p>Selected Option: {selectedOption || "None"}</p>
      </div>
    </div>
  )
}
