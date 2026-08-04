import { LoaderCircle, RotateCcw, Search } from "lucide-react"

type SearchActionsProps = {
  isLoading: boolean
  onReset: () => void
}

export function SearchActions({ isLoading, onReset }: SearchActionsProps) {
  return (
    <div className="contract-search-actions">
      <button
        type="button"
        className="contract-button contract-button--outline contract-reset-button"
        onClick={onReset}
      >
        <RotateCcw size={17} aria-hidden="true" />
        초기화
      </button>
      <button
        type="submit"
        className="contract-button contract-button--primary contract-submit-button"
        disabled={isLoading}
      >
        {isLoading ? (
          <LoaderCircle className="contract-loading-spinner" size={18} aria-hidden="true" />
        ) : (
          <Search size={18} aria-hidden="true" />
        )}
        검색
      </button>
    </div>
  )
}
