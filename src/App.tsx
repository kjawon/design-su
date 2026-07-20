import { Chatbot } from "@/components/chatbot"
import { Header } from "@/components/portal-header"
import {
  Footer,
  HeroSection,
  InformationSections,
  RecentContractsSection,
} from "@/components/portal-sections"

export function App() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <RecentContractsSection />
        <InformationSections />
      </main>
      <Footer />
      <Chatbot />
    </>
  )
}
