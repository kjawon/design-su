import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react"
import { ChevronDown, SearchIcon } from "lucide-react"
import { AiDoctorFab } from "@/components/ai-doctor-fab"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const searchFieldOptions = [
  { value: "contract", label: "계약명" },
  { value: "company", label: "업체명" },
] as const

export function Search() {
  const [query, setQuery] = useState("")
  const [searchField, setSearchField] = useState("contract")
  const [isFieldMenuOpen, setIsFieldMenuOpen] = useState(false)
  const [activeOptionIndex, setActiveOptionIndex] = useState(0)
  const fieldSelectRef = useRef<HTMLDivElement>(null)
  const fieldButtonRef = useRef<HTMLButtonElement>(null)

  const selectedOptionIndex = searchFieldOptions.findIndex((option) => option.value === searchField)
  const selectedOption = searchFieldOptions[selectedOptionIndex]

  const placeholder = searchField === "contract"
    ? "계약명을 입력하세요."
    : "업체명을 입력하세요."

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const normalizedQuery = query.trim()
    if (!normalizedQuery) return
    window.dispatchEvent(new CustomEvent("contract-search", { detail: { query: normalizedQuery, field: searchField } }))
  }

  useEffect(() => {
    const closeFieldMenu = (event: PointerEvent) => {
      if (!fieldSelectRef.current?.contains(event.target as Node)) {
        setIsFieldMenuOpen(false)
      }
    }

    document.addEventListener("pointerdown", closeFieldMenu)
    return () => document.removeEventListener("pointerdown", closeFieldMenu)
  }, [])

  const openFieldMenu = (optionIndex = selectedOptionIndex) => {
    setActiveOptionIndex(optionIndex)
    setIsFieldMenuOpen(true)
  }

  const selectField = (optionIndex: number) => {
    setSearchField(searchFieldOptions[optionIndex].value)
    setActiveOptionIndex(optionIndex)
    setIsFieldMenuOpen(false)
    fieldButtonRef.current?.focus()
  }

  const handleFieldKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case "ArrowDown":
      case "ArrowUp": {
        event.preventDefault()
        if (!isFieldMenuOpen) {
          openFieldMenu()
          return
        }
        const direction = event.key === "ArrowDown" ? 1 : -1
        setActiveOptionIndex((currentIndex) =>
          (currentIndex + direction + searchFieldOptions.length) % searchFieldOptions.length,
        )
        break
      }
      case "Home":
        if (isFieldMenuOpen) {
          event.preventDefault()
          setActiveOptionIndex(0)
        }
        break
      case "End":
        if (isFieldMenuOpen) {
          event.preventDefault()
          setActiveOptionIndex(searchFieldOptions.length - 1)
        }
        break
      case "Enter":
      case " ":
        event.preventDefault()
        if (isFieldMenuOpen) selectField(activeOptionIndex)
        else openFieldMenu()
        break
      case "Escape":
        if (isFieldMenuOpen) {
          event.preventDefault()
          setIsFieldMenuOpen(false)
        }
        break
      case "Tab":
        setIsFieldMenuOpen(false)
        break
    }
  }

  return (
    <section aria-labelledby="contract-search-title" className="w-full shrink-0 bg-transparent">
      <h2 id="contract-search-title" className="sr-only">계약정보 검색</h2>
      <div className="portal-search-layout mx-auto flex w-full max-w-[940px] flex-col items-center justify-center gap-3 overflow-visible px-5 sm:flex-row">
        <form role="search" autoComplete="off" onSubmit={submit} className="portal-search-form flex w-full max-w-[560px] items-center gap-2 overflow-visible rounded-full border border-gray-300 bg-white p-1 pl-2 transition focus-within:border-primary-600 focus-within:ring-2 focus-within:ring-primary-600/20">
          <div aria-hidden="true" className="pointer-events-none absolute size-px overflow-hidden opacity-0">
            <input type="text" name="contract-search-fake-username" autoComplete="username" tabIndex={-1} />
            <input type="password" name="contract-search-fake-password" autoComplete="new-password" tabIndex={-1} />
          </div>
          <div ref={fieldSelectRef} className="relative h-[30px] w-[116px] shrink-0 overflow-visible border-r border-gray-300 pr-2">
            <span id="contract-search-field-label" className="sr-only">검색 범위</span>
            <button
              ref={fieldButtonRef}
              id="contract-search-field"
              type="button"
              role="combobox"
              aria-labelledby="contract-search-field-label contract-search-field-value"
              aria-haspopup="listbox"
              aria-controls="contract-search-field-options"
              aria-expanded={isFieldMenuOpen}
              aria-activedescendant={isFieldMenuOpen ? `contract-search-field-option-${activeOptionIndex}` : undefined}
              onClick={() => isFieldMenuOpen ? setIsFieldMenuOpen(false) : openFieldMenu()}
              onKeyDown={handleFieldKeyDown}
              className={`flex h-full w-full items-center justify-between gap-3 bg-transparent pl-2 pr-1 text-left text-[17px] font-bold text-gray-700 outline-none transition-colors hover:bg-[#F3F7FF] focus-visible:ring-2 focus-visible:ring-[#155FC2] focus-visible:ring-offset-1 ${
                isFieldMenuOpen ? "rounded-t-md rounded-b-none" : "rounded-md"
              }`}
            >
              <span id="contract-search-field-value">{selectedOption.label}</span>
              <ChevronDown
                className={`size-4 shrink-0 text-gray-500 transition-transform duration-200 ${isFieldMenuOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            {isFieldMenuOpen && (
              <ul
                id="contract-search-field-options"
                role="listbox"
                aria-labelledby="contract-search-field-label"
                className="portal-search-options absolute left-0 top-[calc(100%-1px)] z-30 w-full overflow-hidden rounded-b-xl border-x border-b border-gray-200 bg-white p-1 shadow-[0_8px_24px_rgba(15,23,42,0.12)]"
              >
                {searchFieldOptions.map((option, optionIndex) => {
                  const isSelected = option.value === searchField
                  const isActive = optionIndex === activeOptionIndex

                  return (
                    <li key={option.value} role="presentation">
                      <button
                        id={`contract-search-field-option-${optionIndex}`}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        tabIndex={-1}
                        onClick={() => selectField(optionIndex)}
                        onMouseEnter={() => setActiveOptionIndex(optionIndex)}
                        className={`flex h-[42px] w-full items-center rounded-lg px-3 text-left text-[15px] font-semibold transition-colors ${
                          isSelected
                            ? "bg-[#EAF3FF] text-[#155FC2]"
                            : isActive
                              ? "bg-[#F3F7FF] text-[#155FC2]"
                              : "text-gray-700 hover:bg-[#F3F7FF] hover:text-[#155FC2]"
                        }`}
                      >
                        {option.label}
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </div>
          <label htmlFor="contract-search-input" className="sr-only">{placeholder}</label>
          <Input
            id="contract-search-input"
            name="contract-search-query-no-history"
            type="text"
            value={query}
            autoComplete="new-password"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={placeholder}
            className="h-10 min-w-0 border-0 bg-transparent pr-2 text-sm text-gray-900 shadow-none outline-none placeholder:text-gray-500 focus-visible:border-0 focus-visible:outline-none focus-visible:ring-0"
          />
          <Button type="submit" size="icon" aria-label="계약정보 검색" className="size-11 shrink-0 rounded-full bg-primary-700 text-white hover:bg-primary-600">
            <SearchIcon className="size-5" aria-hidden="true" />
          </Button>
        </form>
        <AiDoctorFab />
      </div>
    </section>
  )
}
