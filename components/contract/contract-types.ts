export type ContractType = "공사" | "용역" | "물품"

export type ContractRecord = {
  id: number
  type: ContractType
  office: string
  title: string
  amount: number
  date: string
  contractor: string
}

export type ContractFilters = {
  office: string
  department: string
  category: string
  contractor: string
  contractMethod: string
  contractName: string
  title: string
  minAmount: string
  maxAmount: string
  startDate: string
  endDate: string
}

export type EvaluationRecord = {
  id: number
  office: string
  department: string
  projectTitle: string
  evaluationDate: string
}

export type CompletionRecord = {
  id: number
  title: string
  office: string
  amount: number
  contractDate: string
  startDate: string
  deadlineDate: string
  completionDate: string
  inspectionDate: string
}
