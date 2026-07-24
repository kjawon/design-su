import { Chatbot } from "@/components/chatbot"
import { ContractStatusPage } from "@/components/contract-status/contract-status-page"
import { IntroSection } from "@/components/intro-section"
import { Footer } from "@/components/portal-footer"
import { Header } from "@/components/portal-header"
import { PortalInformation } from "@/components/portal-information"
import { ServiceBoard } from "@/components/service-board"

export function App() {
  const isChatbotWindow = new URLSearchParams(window.location.search).get("chatbot") === "popup"
  const currentPath = window.location.pathname.replace(/\/+$/, "") || "/"

  if (isChatbotWindow) return <Chatbot windowMode />
  if (currentPath === "/contract/status") return <ContractStatusPage />

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
