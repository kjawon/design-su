export const businessFieldOptions = [
  { value: "publicAdministration", label: "공공행정" },
  { value: "publicSafety", label: "공공안전" },
  { value: "education", label: "교육" },
  { value: "cultureTourism", label: "문화·관광" },
  { value: "environment", label: "환경보호" },
  { value: "socialWelfare", label: "사회복지" },
  { value: "health", label: "보건" },
  { value: "agricultureFisheries", label: "농림·수산" },
  { value: "industry", label: "산업·중소기업" },
  { value: "transportation", label: "교통" },
  { value: "regionalDevelopment", label: "국토·지역개발" },
  { value: "reserveFund", label: "예비비" },
  { value: "other", label: "기타" },
] as const

export type BusinessField = (typeof businessFieldOptions)[number]["value"]

export const businessAccountingTypeOptions = [
  { value: "all", label: "전체" },
  { value: "general", label: "일반회계" },
  { value: "special", label: "특별회계" },
  { value: "fund", label: "기금회계" },
] as const

export type BusinessAccountingType =
  (typeof businessAccountingTypeOptions)[number]["value"]

export interface BusinessDetailsSearchCriteria {
  fiscalYear: string
  accountingType: BusinessAccountingType
  businessName: string
  startDate: string
  endDate: string
  selectedField: BusinessField | "all"
}

export interface BusinessDetailRecord {
  number: number
  fiscalYear: string
  accountingType: string
  department: string
  businessName: string
  purpose: string
  totalBudget: number
  startDate: string
  endDate: string
  field: BusinessField
  fieldLabel: string
}
