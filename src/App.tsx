import { Chatbot } from "@/components/chatbot"
import { Footer } from "@/components/portal-footer"
import { Header } from "@/components/portal-header"
import { ServiceBoard } from "@/components/service-board"

export function App() {
  return (
    <>
      <Header />
      <main>
        <ServiceBoard />
      </main>
      <Footer />
      <Chatbot />
    </>
  )
}
