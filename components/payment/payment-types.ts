export type PaymentType = "공사" | "용역" | "물품"

export type PaymentRecord = {
  id: number
  type: PaymentType
  office: string
  contractName: string
  contractor: string
  contractAmount: number
  isPaid: boolean
  totalPayment: number
  advancePayment: number
  progressPayment: number
  completionPayment: number
  laborPayment: number
  paymentDate: string
  contractDate: string
}

export type PaymentFilters = {
  office: string
  contractName: string
  minAmount: string
  maxAmount: string
  startDate: string
  endDate: string
}
