import { Chatbot } from "@/components/chatbot"
import { Header } from "@/components/portal-header"
import {
  Footer,
  HeroSection,
  InformationSections,
} from "@/components/portal-sections"

export function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <InformationSections />
      </main>
      <Footer />
      <Chatbot />
    </>
  )
}
