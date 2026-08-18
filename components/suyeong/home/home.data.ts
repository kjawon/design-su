export type AccountingType = "일반" | "특별" | "기금"

export interface DailyFinanceRecord {
  date: string
  income: number
  expense: number
  accountingType: AccountingType
}

export interface CumulativeFinanceSummary {
  referenceDate: string
  budget: number
  income: number
  expense: number
  balance: number
}

export const dailyFinanceRecords: readonly DailyFinanceRecord[] = [
  { date: "2026.08.09", income: 2_438_510_000, expense: 1_784_320_000, accountingType: "일반" },
  { date: "2026.08.08", income: 884_760_000, expense: 623_450_000, accountingType: "특별" },
  { date: "2026.08.07", income: 990_011_950, expense: 1_604_533_200, accountingType: "기금" },
  { date: "2026.08.06", income: 1_515_263_780, expense: 435_924_720, accountingType: "일반" },
  { date: "2026.08.05", income: 1_916_222_640, expense: 1_168_066_070, accountingType: "특별" },
]

export const cumulativeFinanceSnapshot: Readonly<Omit<CumulativeFinanceSummary, "referenceDate">> = {
  budget: 699_960_898_560,
  income: 420_183_759_670,
  expense: 367_707_320_700,
  balance: 52_476_438_970,
}
