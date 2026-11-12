import { ComboBoxOptions } from "./ComboBoxOptions"
import type { useComboBoxMenu } from "./useComboBoxMenu"

interface ComboBoxMenuProps {
  readonly menu: ReturnType<typeof useComboBoxMenu>
  readonly title: string
  readonly input: string
  readonly options: readonly string[]
  readonly selected: ReadonlySet<string>
  readonly onInput: (value: string) => void
  readonly onSelect: (value: string) => void
}

/** Render the desktop and animated mobile combo box menus. */
export const ComboBoxMenu = ({
  menu,
  title,
  input,
  options,
  selected,
  onInput,
  onSelect,
}: ComboBoxMenuProps) => {
  const { showOptions, shouldRenderMobile, isVisible, closeOptions } = menu
  return (
    <>
      {/* combobox menu (desktop) */}
      {showOptions && (
        <div className="absolute z-10 mt-1 hidden w-48 max-w-48 rounded-xl border-gray-500 bg-[#212529] shadow-md sm:block">
          <input
            aria-label={`Search ${title.toLowerCase()}`}
            id={`${title}ComboBoxDesktop`}
            type="text"
            placeholder={`Search ${title.toLowerCase()}...`}
            value={input}
            onChange={(e) => onInput(e.target.value)}
            className="w-full rounded-t-xl border-transparent bg-[#444d55] py-1 pl-2 text-gray-200 focus:outline-hidden"
          />
          <div className="my-1 max-h-64 overflow-auto px-1">
            <ComboBoxOptions
              options={options}
              selected={selected}
              onSelect={onSelect}
            />
          </div>
        </div>
      )}

      {/* Combobox menu (mobile) */}
      {shouldRenderMobile && (
        <div className="fixed inset-0 z-80 block sm:hidden">
          {/* Overlay with fade animation */}
          <button
            type="button"
            aria-label={`Close ${title.toLowerCase()} options`}
            className={`fixed inset-0 bg-black transition-all duration-300 ease-in-out ${
              isVisible ? "opacity-50" : "opacity-0"
            }`}
            onClick={closeOptions}
          />

          {/* Close message */}
          <span
            className={`pointer-events-none fixed top-1.75 left-1/2 z-30 w-full -translate-x-1/2 transform bg-transparent py-2 text-center font-bold text-fuchsia-400 transition-all duration-300 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            Click Outside to Exit
          </span>

          {/* Bottom menu with slide animation */}
          <div
            className={`absolute bottom-0 left-0 w-full transform rounded-t-xl bg-[#212529] transition-all duration-300 ease-in-out ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            }`}
          >
            <input
              aria-label={`Search ${title.toLowerCase()}`}
              id={`${title}ComboBoxMobile`}
              type="text"
              placeholder={`Search ${title.toLowerCase()}...`}
              value={input}
              onChange={(e) => onInput(e.target.value)}
              className="w-full rounded-t-xl border-transparent bg-[#444d55] py-3 pl-2 text-gray-200 focus:outline-hidden"
            />
            <div className="h-72 max-h-72 overflow-auto px-1 py-2">
              <ComboBoxOptions
                options={options}
                selected={selected}
                onSelect={onSelect}
                mobile
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
