export interface BusinessBudgetSearchCriteria {
  fiscalYear: string
  accountingType: string
  department: string
  businessName: string
}

export interface BusinessBudgetRecord {
  number: number
  fiscalYear: string
  accountingType: string
  accountingLabel: string
  department: string
  businessName: string
  businessType: string
  budgetSubtotal: number
  nationalFunding: number
  provincialFunding: number
  municipalFunding: number
  formedBudget: number
  carriedBudget: number
  changedBudget: number
  replacementRevenue: number
  expense: number
  remainingBudget: number
  field: string
}
