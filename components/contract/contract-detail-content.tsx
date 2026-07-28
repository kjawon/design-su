import type { ContractRecord } from "@/components/contract/contract-types"

const CONTRACT_CATEGORY = "총액계약"
const CONTRACT_METHOD = "수의계약"
const PAYMENT_LABELS = ["선금", "기성금", "준공금", "노무비"] as const

type ContractDetailContentProps = {
  record: ContractRecord
}

type DetailItem = {
  label: string
  value: string
}

function formatText(value: string | null | undefined) {
  return value || "-"
}

function formatDate(value: string | null | undefined) {
  return value ? value.replaceAll("-", ".") : "-"
}

function formatCurrency(value: number | null | undefined) {
  return value === null || value === undefined
    ? "-"
    : `${value.toLocaleString("ko-KR")}원`
}

function ContractSummaryCard({ record }: ContractDetailContentProps) {
  const summaryItems = [
    { label: "계약금액", value: formatCurrency(record.amount), className: "is-amount" },
    { label: "계약일자", value: formatDate(record.date) },
    { label: "계약상대자", value: formatText(record.contractor) },
    { label: "관서명", value: formatText(record.office) },
  ]

  return (
    <section className="contract-summary-card" aria-labelledby="contract-summary-title">
      <div className="contract-summary-badges">
        <span className="contract-type-badge">{record.type}</span>
        <span className="contract-detail-badge">{CONTRACT_CATEGORY}</span>
        <span className="contract-detail-badge">{CONTRACT_METHOD}</span>
      </div>
      <h2 id="contract-summary-title">{record.title}</h2>
      <dl className="contract-summary-grid">
        {summaryItems.map((item) => (
          <div className={item.className} key={item.label}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

function ContractOverviewSection({ record }: ContractDetailContentProps) {
  const plannedPrice = Math.round(record.amount / 0.9844)
  const overviewItems: DetailItem[] = [
    { label: "예정가격", value: formatCurrency(plannedPrice) },
    { label: "최초계약금액", value: formatCurrency(record.amount) },
    {
      label: "낙찰률",
      value: `${((record.amount / plannedPrice) * 100).toFixed(2)}%`,
    },
    { label: "계약금액", value: formatCurrency(record.amount) },
    { label: "계약일자", value: formatDate(record.date) },
    { label: "착공일자", value: "-" },
    { label: "계약방법", value: CONTRACT_METHOD },
    { label: "계약구분", value: CONTRACT_CATEGORY },
    { label: "계약유형", value: `${record.type}계약` },
    { label: "계약상대자", value: formatText(record.contractor) },
    { label: "준공일자", value: "-" },
    { label: "대표자명", value: "-" },
    { label: "검수일", value: "-" },
  ]

  return (
    <section className="contract-detail-section" aria-labelledby="contract-overview-title">
      <h2 id="contract-overview-title">계약 기본정보</h2>
      <dl className="contract-info-grid">
        {overviewItems.map((item) => (
          <div className="contract-info-item" key={item.label}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

function ContractPaymentSection({ amount }: { amount: number }) {
  const totalPaid = 0
  const balance = Math.max(0, amount - totalPaid)

  return (
    <section className="contract-detail-section" aria-labelledby="contract-payment-title">
      <h2 id="contract-payment-title">대금지급 현황</h2>
      <div className="contract-payment-summary-grid">
        <div>
          <span>지급총액</span>
          <strong>{formatCurrency(totalPaid)}</strong>
        </div>
        <div>
          <span>대금잔액</span>
          <strong>{formatCurrency(balance)}</strong>
        </div>
      </div>
      <dl className="contract-payment-detail-grid">
        {PAYMENT_LABELS.map((label) => (
          <div key={label}>
            <dt>{label}</dt>
            <dd>{formatCurrency(0)}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export function ContractDetailContent({ record }: ContractDetailContentProps) {
  return (
    <>
      <ContractSummaryCard record={record} />
      <ContractOverviewSection record={record} />
      <ContractPaymentSection amount={record.amount} />
    </>
  )
}
