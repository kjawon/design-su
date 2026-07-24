import { Printer } from "lucide-react"
import type { ContractPageConfig } from "@/components/contract/contract-page-config"

type ContractPageHeaderProps = {
  config: ContractPageConfig
  onPrint: () => void
}

export function ContractPageHeader({ config, onPrint }: ContractPageHeaderProps) {
  return (
    <header className="contract-page-header">
      <div>
        {!config.standalone && (
          <span className="contract-page-account" data-account={config.accountType}>
            {config.accountLabel}
          </span>
        )}
        <h1 id="contract-page-title">{config.title}</h1>
        <p>{config.description}</p>
      </div>
      <button
        type="button"
        className="contract-button contract-button--outline contract-print-button"
        onClick={onPrint}
      >
        <Printer size={18} aria-hidden="true" />
        인쇄
      </button>
    </header>
  )
}
