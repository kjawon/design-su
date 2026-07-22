import { CircleDollarSign, FileCheck2, Files, Gavel } from "lucide-react"
import { ServiceCard, type ServiceItem } from "@/components/service-card"

const services: ServiceItem[] = [
  {
    title: "발주·입찰정보",
    description: "예정된 발주계획부터 입찰공고와 개찰결과까지 한눈에 확인하세요.",
    links: ["발주계획", "입찰공고", "개찰결과"],
    icon: Gavel,
    tone: "coral",
  },
  {
    title: "계약현황",
    description: "성남시가 체결한 공사·용역·물품·수의계약 내역을 유형별로 확인하세요.",
    links: ["공사", "용역", "물품", "수의계약"],
    icon: FileCheck2,
    tone: "blue",
  },
  {
    title: "대금지급",
    description: "계약별 지급현황과 업체별 대금 지급 내역을 빠르게 확인하세요.",
    links: ["지급현황", "업체별 지급조회"],
    icon: CircleDollarSign,
    tone: "purple",
  },
  {
    title: "계약자료",
    description: "계약업무에 필요한 법규·서식과 관련 기관 정보를 확인하세요.",
    links: ["계약법규", "계약서식"],
    icon: Files,
    tone: "teal",
  },
]

export function ServiceBoard() {
  return (
    <section id="services" aria-labelledby="services-title" className="bg-section pb-12 pt-6 md:pb-14 md:pt-7">
      <div className="mx-auto max-w-[1400px] px-5 lg:px-8">
        <div className="mb-7">
          <p className="text-xs font-bold tracking-[0.14em] text-blue-dark">MAIN SERVICES</p>
          <h2 id="services-title" className="mt-1 text-2xl font-extrabold tracking-tight text-text-primary md:text-3xl">주요 서비스</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {services.map((service) => <ServiceCard key={service.title} service={service} />)}
        </div>
      </div>
    </section>
  )
}
