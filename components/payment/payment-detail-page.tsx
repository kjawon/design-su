import { ArrowLeft, ChevronRight, House, Printer } from "lucide-react"
import { Header } from "@/components/navigation/portal-header"
import { PortalFooter } from "@/components/navigation/portal-footer"
import { PaymentDetailContent } from "@/components/payment/payment-detail-content"
import { PAYMENT_RECORDS } from "@/components/payment/payment-mock-data"
import type { PaymentPageConfig } from "@/components/payment/payment-page-config"
import { PaymentSidebar } from "@/components/payment/payment-sidebar"
import "@/components/contract/styles/contract.css"
import "@/components/contract/styles/contract-detail.css"
import "@/components/payment/styles/payment.css"

type PaymentDetailPageProps = {
  config: PaymentPageConfig
  paymentId: number
}

function findDisplayRecord(config: PaymentPageConfig, paymentId: number) {
  if (config.pageKind !== "status") return undefined

  const exactRecord = PAYMENT_RECORDS.find((record) => record.id === paymentId)
  if (exactRecord) return exactRecord

  const sourceIndex = config.totalCount - paymentId
  if (sourceIndex < 0) return undefined

  const template = PAYMENT_RECORDS[sourceIndex % PAYMENT_RECORDS.length]
  return template ? { ...template, id: paymentId } : undefined
}

export function PaymentDetailPage({
  config,
  paymentId,
}: PaymentDetailPageProps) {
  const record = findDisplayRecord(config, paymentId)

  return (
    <div className="contract-status-page contract-detail-shell payment-detail-shell">
      <Header />
      <main id="main-content" tabIndex={-1}>
        <nav className="contract-breadcrumb" aria-label="현재 위치">
          <div>
            <a href="/" aria-label="홈">
              <House size={20} aria-hidden="true" />
              <span>홈</span>
            </a>
            <ChevronRight size={18} aria-hidden="true" />
            <span>대금지급</span>
            <ChevronRight size={18} aria-hidden="true" />
            <span>{config.accountLabel}</span>
            <ChevronRight size={18} aria-hidden="true" />
            <a href={config.path}>{config.menuLabel}</a>
            <ChevronRight size={18} aria-hidden="true" />
            <strong aria-current="page">지급 상세</strong>
          </div>
        </nav>

        <div className="contract-layout">
          <PaymentSidebar accountType={config.accountType} activeMenu={config.menuKey} />
          <article className="contract-content contract-detail-page">
            <header className="contract-detail-page-header">
              <div className="contract-detail-page-actions">
                <a
                  href={config.path}
                  className="contract-button contract-button--outline contract-detail-action"
                >
                  <ArrowLeft size={18} aria-hidden="true" />
                  목록
                </a>
                {record && (
                  <button
                    type="button"
                    className="contract-button contract-button--outline contract-detail-action"
                    aria-label="대금지급 상세 내용 인쇄"
                    onClick={() => window.print()}
                  >
                    <Printer size={18} aria-hidden="true" />
                    인쇄
                  </button>
                )}
              </div>
            </header>

            {record ? (
              <PaymentDetailContent config={config} record={record} />
            ) : (
              <section className="contract-detail-section payment-detail-empty" role="status">
                <h2>대금지급 정보를 찾을 수 없습니다.</h2>
                <p>목록으로 돌아가 다른 항목을 선택해 주세요.</p>
              </section>
            )}
          </article>
        </div>
      </main>
      <PortalFooter />
    </div>
  )
}
