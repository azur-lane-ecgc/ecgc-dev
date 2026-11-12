interface ComboBoxOptionsProps {
  readonly options: readonly string[]
  readonly selected: ReadonlySet<string>
  readonly mobile?: boolean
  readonly onSelect: (option: string) => void
}

/** Render searchable combo box options as keyboard-accessible selection buttons. */
export const ComboBoxOptions = ({
  options,
  selected,
  mobile = false,
  onSelect,
}: ComboBoxOptionsProps) => {
  if (options.length === 0) {
    return (
      <div
        className={`mx-auto my-auto flex ${mobile ? "h-12.5" : "h-8"} cursor-default items-center justify-center rounded-md p-1 text-sm text-gray-300 italic`}
      >
        Nothing found.
      </div>
    )
  }

  return options.map((item) => (
    <button
      type="button"
      key={item}
      aria-pressed={selected.has(item)}
      onClick={() => onSelect(item)}
      className={`${selected.has(item) ? "text-orange-400" : "text-gray-300"} ${mobile ? "h-10 p-3" : "h-fit p-1"} flex w-full cursor-pointer items-center justify-between rounded-md text-left font-semibold hover:bg-[#444d55]`}
    >
      {item}
      {selected.has(item) && <span className="text-cyan-400">{"\u2713"}</span>}
    </button>
  ))
}
