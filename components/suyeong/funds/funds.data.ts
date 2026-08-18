import type { FinancialSearchCriteria } from "@/components/suyeong/shared"
import { getFiscalYear, shiftDate } from "@/components/suyeong/utils/date"
import type { FundsOperationRecord } from "./funds.types"

export function createInitialFundsSearchCriteria(referenceDate: string): FinancialSearchCriteria {
  return {
    fiscalYear: getFiscalYear(referenceDate),
    accountingType: "all",
    startDate: shiftDate(referenceDate, -7),
    endDate: referenceDate,
  }
}

export const fundsOperationRecords: readonly FundsOperationRecord[] = [
  {
    date: "2026-08-11",
    budget: 699_960_898_560,
    incomeForPeriod: 0,
    cumulativeIncome: 420_183_759_670,
    expenseForPeriod: 657_531_010,
    cumulativeExpense: 369_212_489_750,
    balance: 50_971_269_920,
  },
  {
    date: "2026-08-10",
    budget: 699_960_898_560,
    incomeForPeriod: 0,
    cumulativeIncome: 420_183_759_670,
    expenseForPeriod: 861_104_350,
    cumulativeExpense: 368_554_958_740,
    balance: 51_628_800_930,
  },
  {
    date: "2026-08-09",
    budget: 699_960_898_560,
    incomeForPeriod: 0,
    cumulativeIncome: 420_183_759_670,
    expenseForPeriod: 0,
    cumulativeExpense: 367_693_854_390,
    balance: 52_489_905_280,
  },
  {
    date: "2026-08-08",
    budget: 699_960_898_560,
    incomeForPeriod: 0,
    cumulativeIncome: 420_183_759_670,
    expenseForPeriod: 0,
    cumulativeExpense: 367_693_854_390,
    balance: 52_489_905_280,
  },
  {
    date: "2026-08-07",
    budget: 699_960_898_560,
    incomeForPeriod: 990_011_950,
    cumulativeIncome: 420_183_759_670,
    expenseForPeriod: 1_591_462_670,
    cumulativeExpense: 367_693_854_390,
    balance: 52_489_905_280,
  },
  {
    date: "2026-08-06",
    budget: 699_960_898_560,
    incomeForPeriod: 1_515_263_780,
    cumulativeIncome: 419_193_747_720,
    expenseForPeriod: 435_828_140,
    cumulativeExpense: 366_102_391_720,
    balance: 53_091_356_000,
  },
  {
    date: "2026-08-05",
    budget: 699_960_898_560,
    incomeForPeriod: 1_916_222_640,
    cumulativeIncome: 417_678_483_940,
    expenseForPeriod: 1_167_766_870,
    cumulativeExpense: 365_666_563_580,
    balance: 52_011_920_360,
  },
  {
    date: "2026-08-04",
    budget: 699_960_898_560,
    incomeForPeriod: 1_187_795_660,
    cumulativeIncome: 415_762_261_300,
    expenseForPeriod: 443_820_620,
    cumulativeExpense: 364_498_796_710,
    balance: 51_263_464_590,
  },
]

export const latestFundsOperationRecord = fundsOperationRecords.reduce(
  (latestRecord, record) => record.date > latestRecord.date ? record : latestRecord,
)
