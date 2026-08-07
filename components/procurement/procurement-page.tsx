import { G2BLinkedServices } from "@/components/procurement/g2b-linked-services"
import { OwnProcurementPlanSection } from "@/components/procurement/own-procurement-plan-section"
import { procurementPageConfig } from "@/components/procurement/procurement-page-config"
import { Header } from "@/components/navigation/portal-header"
import { PortalFooter } from "@/components/navigation/portal-footer"
import { PageBreadcrumb } from "@/components/shared/page-breadcrumb"
import g2bIcon from "@/조달청 아이콘.svg"
import "@/components/contract/styles/contract.css"
import "@/components/procurement/styles/procurement.css"

export function ProcurementPage() {
  return (
    <div className="contract-status-page procurement-page">
      <Header />
      <main id="main-content" tabIndex={-1}>
        <PageBreadcrumb items={[{ label: "발주·입찰정보" }]} />

        <div className="procurement-layout">
          <header className="procurement-page-header">
            <div className="procurement-page-title">
              <h1>발주·입찰정보</h1>
              <img src={g2bIcon} alt="조달청" />
            </div>
          </header>

          <G2BLinkedServices />

          {procurementPageConfig.showOwnProcurementPlan && (
            <OwnProcurementPlanSection />
          )}
        </div>
      </main>
      <PortalFooter />
    </div>
  )
}
