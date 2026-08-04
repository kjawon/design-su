import { Chatbot } from "@/components/chatbot"
import { ContractDetailPage } from "@/components/contract/contract-detail-page"
import { ContractPage } from "@/components/contract/contract-page"
import { getContractPageConfig } from "@/components/contract/contract-page-config"
import { IntroSection } from "@/components/intro-section"
import { Footer } from "@/components/portal-footer"
import { Header } from "@/components/navigation/portal-header"
import { PaymentDetailPage } from "@/components/payment/payment-detail-page"
import { PaymentPage } from "@/components/payment/payment-page"
import { getPaymentPageConfig } from "@/components/payment/payment-page-config"
import { PortalInformation } from "@/components/portal-information"
import { ServiceBoard } from "@/components/service-board"

export function App() {
  const isChatbotWindow = new URLSearchParams(window.location.search).get("chatbot") === "popup"
  const currentPath = window.location.pathname.replace(/\/+$/, "") || "/"
  const contractPageConfig = getContractPageConfig(currentPath)
  const paymentPageConfig = getPaymentPageConfig(currentPath)
  const contractDetailMatch = currentPath.match(/^(.*)\/(\d+)$/)
  const contractDetailConfig = contractDetailMatch
    ? getContractPageConfig(contractDetailMatch[1])
    : undefined
  const paymentDetailConfig = contractDetailMatch
    ? getPaymentPageConfig(contractDetailMatch[1])
    : undefined
  const contractDetailId = contractDetailMatch ? Number(contractDetailMatch[2]) : null

  if (isChatbotWindow) return <Chatbot windowMode />
  if (
    contractDetailConfig?.pageKind === "contract" &&
    contractDetailId !== null
  ) {
    return (
      <ContractDetailPage
        config={contractDetailConfig}
        contractId={contractDetailId}
      />
    )
  }
  if (
    paymentDetailConfig?.pageKind === "status" &&
    contractDetailId !== null
  ) {
    return (
      <PaymentDetailPage
        config={paymentDetailConfig}
        paymentId={contractDetailId}
      />
    )
  }
  if (contractPageConfig) return <ContractPage config={contractPageConfig} />
  if (paymentPageConfig) return <PaymentPage config={paymentPageConfig} />

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <IntroSection />
        <ServiceBoard />
        <PortalInformation />
      </main>
      <Footer />
      <Chatbot />
    </>
  )
}
