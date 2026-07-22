import { QuickLinks } from "@/components/quick-links"
import { StructuredContractList } from "@/components/structured-contract-list"

export function PortalInformation() {
  return (
    <section id="information" aria-label="계약정보와 자주 찾는 정보" className="border-t border-border bg-card py-12 md:py-14">
      <div className="mx-auto grid max-w-[1400px] items-stretch gap-8 px-5 lg:grid-cols-[1.65fr_0.9fr] lg:px-8">
        <StructuredContractList />
        <QuickLinks />
      </div>
    </section>
  )
}
