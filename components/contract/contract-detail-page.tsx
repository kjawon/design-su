import { ArrowLeft, Printer } from "lucide-react"
import { ContractDetailContent } from "@/components/contract/contract-detail-content"
import { CONTRACT_RECORDS } from "@/components/contract/contract-mock-data"
import type { ContractPageConfig } from "@/components/contract/contract-page-config"
import { ContractSidebar } from "@/components/contract/contract-sidebar"
import { Header } from "@/components/navigation/portal-header"
import { PortalFooter } from "@/components/navigation/portal-footer"
import { PageBreadcrumb, type BreadcrumbItem } from "@/components/shared/page-breadcrumb"
import "@/components/contract/styles/contract.css"
import "@/components/contract/styles/contract-detail.css"

type ContractDetailPageProps = {
  config: ContractPageConfig
  contractId: number
}

function findDisplayRecord(config: ContractPageConfig, contractId: number) {
  const exactRecord = CONTRACT_RECORDS.find((record) => record.id === contractId)
  if (exactRecord) return exactRecord

  const sourceIndex = config.totalCount - contractId
  return sourceIndex >= 0
    ? CONTRACT_RECORDS[sourceIndex % CONTRACT_RECORDS.length]
    : undefined
}

function DetailPageHeader({
  listPath,
  hasRecord,
}: {
  listPath: string
  hasRecord: boolean
}) {
  return (
    <header className="contract-detail-page-header">
      <div className="contract-detail-page-actions">
        <a
          href={listPath}
          className="contract-button contract-button--outline contract-detail-action"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          목록
        </a>
        {hasRecord && (
          <button
            type="button"
            className="contract-button contract-button--outline contract-detail-action"
            aria-label="계약 상세 내용 인쇄"
            onClick={() => window.print()}
          >
            <Printer size={18} aria-hidden="true" />
            인쇄
          </button>
        )}
      </div>
    </header>
  )
}

export function ContractDetailPage({
  config,
  contractId,
}: ContractDetailPageProps) {
  const record = findDisplayRecord(config, contractId)
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "계약정보" },
    ...(!config.standalone ? [{ label: config.accountLabel }] : []),
    { label: config.menuLabel, href: config.path },
    { label: "계약 상세" },
  ]

  return (
    <div className="contract-status-page contract-detail-shell">
      <Header />
      <main id="main-content" tabIndex={-1}>
        <PageBreadcrumb items={breadcrumbItems} />
        <div className="contract-layout">
          <ContractSidebar
            accountType={config.accountType}
            activeMenu={config.menuKey}
          />
          <article className="contract-content contract-detail-page">
            <DetailPageHeader listPath={config.path} hasRecord={Boolean(record)} />
            {record && <ContractDetailContent record={record} />}
          </article>
        </div>
      </main>
      <PortalFooter />
    </div>
  )
}
