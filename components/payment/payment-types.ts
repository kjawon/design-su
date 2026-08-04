export type PaymentRecord = {
  id: number
  office: string
  contractName: string
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
