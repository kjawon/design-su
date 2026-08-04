import type { PaymentRecord } from "@/components/payment/payment-types"

const amountFormatter = new Intl.NumberFormat("ko-KR")

function PaymentAmount({ value }: { value: number }) {
  return (
    <td className="contract-table__amount payment-table__amount">
      {amountFormatter.format(value)}
    </td>
  )
}

export function PaymentTable({
  records,
  isLoading = false,
}: {
  records: PaymentRecord[]
  isLoading?: boolean
}) {
  return (
    <div className="contract-table-card payment-table-card">
      <div className="contract-table-scroll">
        <table className="payment-data-table" aria-busy={isLoading}>
          <caption className="sr-only">대금지급현황 검색 결과</caption>
          <colgroup>
            <col className="payment-table__col-number" />
            <col className="payment-table__col-office" />
            <col className="payment-table__col-title" />
            <col className="payment-table__col-amount" />
            <col className="payment-table__col-amount" />
            <col className="payment-table__col-amount" />
            <col className="payment-table__col-amount" />
            <col className="payment-table__col-amount" />
            <col className="payment-table__col-date" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col">번호</th>
              <th scope="col">관서명</th>
              <th scope="col">계약명</th>
              <th scope="col">지급액총계</th>
              <th scope="col">선금지급</th>
              <th scope="col">기성금지급</th>
              <th scope="col">준공금지급</th>
              <th scope="col">노무비지급</th>
              <th scope="col">지급일</th>
            </tr>
          </thead>
          <tbody>
            {records.length > 0 ? (
              records.map((record) => (
                <tr key={record.id}>
                  <td className="contract-table__number">{record.id}</td>
                  <td className="contract-table__office" title={record.office}>
                    {record.office}
                  </td>
                  <td className="contract-table__title" title={record.contractName}>
                    <span>{record.contractName}</span>
                  </td>
                  <PaymentAmount value={record.totalPayment} />
                  <PaymentAmount value={record.advancePayment} />
                  <PaymentAmount value={record.progressPayment} />
                  <PaymentAmount value={record.completionPayment} />
                  <PaymentAmount value={record.laborPayment} />
                  <td className="contract-table__date">
                    {record.paymentDate.replaceAll("-", ".")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="contract-table__empty">
                  {isLoading ? "조회 중입니다." : "조회된 자료가 없습니다."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
