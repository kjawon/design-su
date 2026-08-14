import type { IncomeAccountingType } from "./income.types"
import type { IncomeDailyTrendRecord } from "./income.trends.types"

interface MonthlyIncomeFixture {
  month: string
  endDay: number
  amounts: Record<IncomeAccountingType, number>
  finalDayAmounts?: Partial<Record<IncomeAccountingType, number>>
}

const accountingTypes: readonly IncomeAccountingType[] = ["general", "special"]

const monthlyIncomeFixtures: readonly MonthlyIncomeFixture[] = [
  { month: "2026-01", endDay: 31, amounts: { general: 48_230_000_000, special: 120_000_000 } },
  { month: "2026-02", endDay: 28, amounts: { general: 39_860_000_000, special: 104_000_000 } },
  { month: "2026-03", endDay: 31, amounts: { general: 51_740_000_000, special: 133_000_000 } },
  { month: "2026-04", endDay: 30, amounts: { general: 57_930_000_000, special: 128_000_000 } },
  { month: "2026-05", endDay: 31, amounts: { general: 62_480_000_000, special: 147_000_000 } },
  { month: "2026-06", endDay: 30, amounts: { general: 67_350_000_000, special: 139_000_000 } },
  { month: "2026-07", endDay: 31, amounts: { general: 59_180_000_000, special: 142_000_000 } },
  {
    month: "2026-08",
    endDay: 11,
    amounts: { general: 32_395_658_060, special: 105_101_610 },
    finalDayAmounts: { general: 1_780_000_000, special: 4_320_000 },
  },
]

const allocationWeights = [7, 11, 5, 13, 8, 15, 6, 10, 9, 12, 4]

function getCollectionDays(endDay: number) {
  const days: number[] = []
  for (let day = 2; day <= endDay; day += 3) days.push(day)
  if (!days.includes(endDay)) days.push(endDay)
  return days
}

function allocateMonthlyAmount(total: number, endDay: number, finalDayAmount?: number) {
  const collectionDays = getCollectionDays(endDay)
  const distributedDays = finalDayAmount === undefined
    ? collectionDays
    : collectionDays.filter((day) => day !== endDay)
  const distributableAmount = total - (finalDayAmount ?? 0)
  const weightTotal = distributedDays.reduce(
    (sum, _day, index) => sum + allocationWeights[index % allocationWeights.length],
    0,
  )
  const allocations = new Map<number, number>()
  let allocatedAmount = 0

  distributedDays.forEach((day, index) => {
    const isLastDistributedDay = index === distributedDays.length - 1
    const amount = isLastDistributedDay
      ? distributableAmount - allocatedAmount
      : Math.floor(
          distributableAmount * allocationWeights[index % allocationWeights.length] / weightTotal,
        )
    allocations.set(day, amount)
    allocatedAmount += amount
  })

  if (finalDayAmount !== undefined) allocations.set(endDay, finalDayAmount)
  return allocations
}

function createDailyTrendRecords() {
  const cumulativeAmounts: Record<IncomeAccountingType, number> = {
    general: 0,
    special: 0,
  }
  const records: IncomeDailyTrendRecord[] = []

  monthlyIncomeFixtures.forEach((fixture) => {
    const allocations = Object.fromEntries(
      accountingTypes.map((accountingType) => [
        accountingType,
        allocateMonthlyAmount(
          fixture.amounts[accountingType],
          fixture.endDay,
          fixture.finalDayAmounts?.[accountingType],
        ),
      ]),
    ) as Record<IncomeAccountingType, Map<number, number>>

    for (let day = 1; day <= fixture.endDay; day += 1) {
      const date = `${fixture.month}-${String(day).padStart(2, "0")}`

      accountingTypes.forEach((accountingType) => {
        const amount = allocations[accountingType].get(day) ?? 0
        cumulativeAmounts[accountingType] += amount
        records.push({
          fiscalYear: fixture.month.slice(0, 4),
          accountingType,
          date,
          amount,
          cumulativeAmount: cumulativeAmounts[accountingType],
        })
      })
    }
  })

  return records
}

// TODO: 세입 추이 API가 준비되면 일자·회계구분별 응답으로 교체합니다.
// 세입이 없는 날짜도 amount 0으로 유지해 계단형 누계 흐름이 왜곡되지 않게 합니다.
export const incomeDailyTrendRecords: readonly IncomeDailyTrendRecord[] =
  createDailyTrendRecords()
