import type { PaymentPageConfig } from "@/components/payment/payment-page-config"
import type { PaymentRecord } from "@/components/payment/payment-types"

type PaymentDetailContentProps = {
  config: PaymentPageConfig
  record: PaymentRecord
}

function formatCurrency(value: number | null | undefined) {
  return value === null || value === undefined
    ? "-"
    : `${value.toLocaleString("ko-KR")}원`
}

function PaymentDetailTable() {
  return (
    <div className="payment-detail-table-card">
      <table className="payment-detail-table">
        <caption className="sr-only">대금지급 상세 내역</caption>
        <thead>
          <tr>
            <th scope="col">지급종류</th>
            <th scope="col">지급액</th>
            <th scope="col">지급일</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td colSpan={3} className="payment-detail-table__empty">
              조회된 자료가 존재하지 않습니다.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export function PaymentDetailContent({
  config,
  record,
}: PaymentDetailContentProps) {
  const summaryItems = [
    {
      label: "지급액",
      value: formatCurrency(record.totalPayment),
      className: "is-amount",
    },
    { label: "관서명", value: record.office || "-" },
    { label: "계약상대자", value: record.contractor || "-" },
    { label: "지급여부", value: record.isPaid ? "Y" : "N" },
  ]
  const detailItems = [
    { label: "관서명", value: record.office || "-" },
    { label: "계약상대자", value: record.contractor || "-" },
    { label: "계약금액", value: formatCurrency(record.contractAmount) },
    { label: "선금", value: formatCurrency(record.advancePayment) },
    { label: "기성금", value: formatCurrency(record.progressPayment) },
    { label: "준공금", value: formatCurrency(record.completionPayment) },
    { label: "노무비", value: formatCurrency(record.laborPayment) },
    { label: "지급액총계", value: formatCurrency(record.totalPayment) },
    {
      label: "대금잔액",
      value: formatCurrency(Math.max(0, record.contractAmount - record.totalPayment)),
    },
  ]

  return (
    <>
      <section className="contract-summary-card" aria-labelledby="payment-summary-title">
        <div className="contract-summary-badges">
          <span className="contract-type-badge">{record.type}</span>
          <span className="contract-detail-badge">{config.accountLabel}</span>
          <span className="contract-detail-badge">
            {record.isPaid ? "지급완료" : "지급대기"}
          </span>
        </div>
        <h2 id="payment-summary-title">{record.contractName}</h2>
        <dl className="contract-summary-grid">
          {summaryItems.map((item) => (
            <div className={item.className} key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="contract-detail-section" aria-labelledby="payment-overview-title">
        <h2 id="payment-overview-title">상세보기</h2>
        <dl className="contract-info-grid">
          {detailItems.map((item) => (
            <div className="contract-info-item" key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="contract-detail-section" aria-labelledby="payment-history-title">
        <h2 id="payment-history-title">대금지급 상세</h2>
        <PaymentDetailTable />
      </section>
    </>
  )
}
