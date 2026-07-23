import { Chatbot } from "@/components/chatbot"
import { IntroSection } from "@/components/intro-section"
import { Footer } from "@/components/portal-footer"
import { Header } from "@/components/portal-header"
import { PortalInformation } from "@/components/portal-information"
import { ServiceBoard } from "@/components/service-board"

export function App() {
  const isChatbotWindow = new URLSearchParams(window.location.search).get("chatbot") === "popup"

  if (isChatbotWindow) return <Chatbot windowMode />

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
