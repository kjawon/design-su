export interface CumulativeFinanceSummary {
  referenceDate: string
  budget: number
  income: number
  expense: number
  balance: number
}

export const cumulativeFinanceSnapshot: Readonly<CumulativeFinanceSummary> = {
  referenceDate: "2026.08.09",
  budget: 699_960_898_560,
  income: 420_183_759_670,
  expense: 367_707_320_700,
  balance: 52_476_438_970,
}
