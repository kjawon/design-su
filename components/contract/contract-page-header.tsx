import { Printer } from "lucide-react"

type ContractPageHeaderProps = {
  onPrint: () => void
}

export function ContractPageHeader({ onPrint }: ContractPageHeaderProps) {
  return (
    <div className="contract-page-header">
      <button
        type="button"
        className="contract-button contract-button--outline contract-print-button"
        onClick={onPrint}
      >
        <Printer size={18} aria-hidden="true" />
        인쇄
      </button>
    </div>
  )
}
