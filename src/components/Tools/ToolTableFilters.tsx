import { useState } from "react"

import { ComboBox } from "@components/_common/ComboBox"

import { ToolTable } from "./ToolTable"

const categoryDisplayMapping: { [key: string]: string } = {
  Informational: "info",
  Fun: "fun",
  Data: "data",
}

const displayCategories = Object.keys(categoryDisplayMapping) as string[]

export const ToolTableFilters = () => {
  const [category, setCategory] = useState<string | null>(null)

  const handleSelect = (selected: string | null) => {
    const mappedCategory = selected ? categoryDisplayMapping[selected] : null
    setCategory(mappedCategory)
  }

  return (
    <div className="flex flex-col gap-4">
      <ComboBox
        title="Category"
        options={displayCategories}
        onSelect={handleSelect}
      />
      <ToolTable category={category} />
    </div>
  )
}
