import { Chatbot } from "@/components/chatbot"
import { Header } from "@/components/portal-header"
import {
  Footer,
  HeroSection,
  InformationSections,
  RecentContractsSection,
  ServiceCards,
} from "@/components/portal-sections"

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ServiceCards />
        <RecentContractsSection />
        <InformationSections />
      </main>
      <Footer />
      <Chatbot />
    </>
  )
}
