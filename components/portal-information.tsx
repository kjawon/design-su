import { QuickLinks } from "@/components/quick-links"
import { StructuredContractList } from "@/components/structured-contract-list"

export function PortalInformation() {
  return (
    <section id="information" aria-label="최근 정보와 자주 찾는 정보" className="border-t border-border bg-card pt-8 pb-12 md:pt-2 md:pb-14">
      <div className="mx-auto grid max-w-[1400px] items-stretch gap-8 px-5 lg:grid-cols-4 lg:gap-6 lg:px-8">
        <StructuredContractList />
        <QuickLinks />
      </div>
    </section>
  )
}
