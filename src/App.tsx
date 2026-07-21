import { useState } from "react"
import { Chatbot } from "@/components/chatbot"
import { ContractSearchPanel, type ContractSearch } from "@/components/contract-search-panel"
import { ContractWorkspace } from "@/components/contract-workspace"
import { Footer } from "@/components/portal-footer"
import { Header } from "@/components/portal-header"
import { PortalInformation } from "@/components/portal-information"

export function App() {
  const [search, setSearch] = useState<ContractSearch>({ field: "전체", query: "" })

  return (
    <>
      <Header />
      <main>
        <ContractSearchPanel onSearch={setSearch} />
        <ContractWorkspace search={search} />
        <PortalInformation />
      </main>
      <Footer />
      <Chatbot />
    </>
  )
}
