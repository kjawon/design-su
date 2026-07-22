import { FormEvent, useEffect, useRef, useState } from "react"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function HeaderSearchToggle({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <Button type="button" variant="ghost" size="icon" aria-label={open ? "검색 닫기" : "검색 열기"} aria-expanded={open} aria-controls="header-search-panel" onClick={onToggle} className="size-10 rounded-full text-text-secondary hover:bg-blue-light hover:text-blue-primary">
      {open ? <X className="size-5" /> : <Search className="size-5" />}
    </Button>
  )
}

export function CollapsibleSearchPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose()
    }
    window.addEventListener("keydown", closeOnEscape)
    return () => window.removeEventListener("keydown", closeOnEscape)
  }, [onClose, open])

  const submit = (event: FormEvent) => {
    event.preventDefault()
    if (!query.trim()) return
    window.dispatchEvent(new CustomEvent("contract-search", { detail: { query: query.trim() } }))
  }

  return (
    <div id="header-search-panel" aria-hidden={!open} className={open ? "grid grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out" : "grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 ease-out"}>
      <div className="overflow-hidden">
        <div className="border-y border-border bg-card px-5 py-4">
          <form onSubmit={submit} className="mx-auto flex max-w-[720px] flex-col gap-2 sm:flex-row">
            <Input ref={inputRef} value={query} onChange={(event) => setQuery(event.target.value)} tabIndex={open ? 0 : -1} aria-label="계약 검색어" placeholder="계약명 또는 업체명을 입력하세요." className="h-12 rounded-xl bg-primary-50 px-4" />
            <Button type="submit" tabIndex={open ? 0 : -1} className="h-12 rounded-xl px-6"><Search className="size-4" />검색</Button>
            <Button type="button" tabIndex={open ? 0 : -1} variant="ghost" size="icon" aria-label="검색 패널 닫기" onClick={onClose} className="hidden size-12 sm:inline-flex"><X /></Button>
          </form>
        </div>
      </div>
    </div>
  )
}
