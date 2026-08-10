import {
  ArrowRight,
  ArrowUpRight,
  Bell,
  Building2,
  ChartNoAxesColumnIncreasing,
  ChevronRight,
  CircleDollarSign,
  ExternalLink,
  FileChartColumnIncreasing,
  Landmark,
  LayoutGrid,
  Link2,
  MapPin,
  PiggyBank,
  ReceiptText,
  ShieldCheck,
  WalletCards,
  type LucideIcon,
} from "lucide-react"
import { useEffect, useState } from "react"
import { SuyeongHeader } from "@/components/suyeong/suyeong-header"
import suyeongIcon from "@/수영구 아이콘.svg"
import "@/components/suyeong/suyeong-home.css"

const SYSTEM_BASE_URL = "http://contract.suyeong.go.kr/revtes"

type FinanceMode = "income" | "expense"

interface DailyFinanceRecord {
  date: string
  income: number
  expense: number
}

interface MainFinanceApiResponse {
  cmiosRtnCode: string
  dataFundsList?: Array<{
    ymd: string
    nowAccumAmt: number
    nowExpdAmt: number
  }>
}

interface FundsManagementApiResponse {
  cmiosRtnCode: string
  dataList?: Array<{
    ymd: string
    bgtCurrAmt: number | null
    nowAccumAmt: number | null
    nowExpdAmt: number | null
  }>
}

interface CumulativeFinanceSummary {
  referenceDate: string
  budget: number
  income: number
  expense: number
  balance: number
}

const dailyFinanceRecords: DailyFinanceRecord[] = [
  { date: "2026.08.09", income: 0, expense: 0 },
  { date: "2026.08.08", income: 0, expense: 0 },
  { date: "2026.08.07", income: 990_011_950, expense: 1_604_533_200 },
  { date: "2026.08.06", income: 1_515_263_780, expense: 435_924_720 },
  { date: "2026.08.05", income: 1_916_222_640, expense: 1_168_066_070 },
]

const cumulativeFinanceSnapshot: CumulativeFinanceSummary = {
  referenceDate: "2026.08.09",
  budget: 699_960_898_560,
  income: 420_183_759_670,
  expense: 367_707_320_700,
  balance: 52_476_438_970,
}

const mainServices = [
  { label: "자금운용현황", href: `${SYSTEM_BASE_URL}/basis/fundsMngList.do` },
  { label: "세입정보", href: `${SYSTEM_BASE_URL}/basis/revenueList.do` },
  { label: "예산집행현황", href: `${SYSTEM_BASE_URL}/basis/budgetExecutionList.do` },
  { label: "사업및예산정보", href: `${SYSTEM_BASE_URL}/basis/bizbudgetList.do` },
  { label: "지출현황", href: `${SYSTEM_BASE_URL}/basis/expenditureList.do` },
  { label: "사업별세부설명", href: `${SYSTEM_BASE_URL}/basis/allBizList.do` },
]

const relatedSites = [
  { label: "행정안전부", href: "https://www.mois.go.kr/index.jsp" },
  { label: "지방재정365", href: "http://lofin.mois.go.kr/portal/main.do" },
  { label: "기획재정부", href: "http://www.moef.go.kr/" },
  { label: "법제처", href: "http://www.moleg.go.kr/" },
  { label: "중소기업제품 공공구매", href: "http://www.smpp.go.kr/smpp/index.do" },
  { label: "대한건설협회", href: "http://www.cak.or.kr/" },
  { label: "대한전문건설협회", href: "http://www.kosca.or.kr/" },
  { label: "엔지니어링공제조합", href: "https://www.egic.co.kr/e/hp/EHP.do" },
  { label: "정보통신산업진흥원", href: "https://www.nipa.kr/" },
  { label: "한국폐기물협회", href: "http://www.kwaste.or.kr/" },
  { label: "서울보증보험", href: "https://www.sgic.co.kr/" },
  { label: "건설산업지식정보시스템", href: "http://www.kiscon.net/" },
]

const quickLinks = [
  {
    label: "수영구청 홈페이지",
    href: "https://www.suyeong.go.kr/index.suyeong",
    icon: Building2,
  },
  {
    label: "업무안내",
    href: "https://www.suyeong.go.kr/index.suyeong?menuCd=DOM_000000104003001002",
    icon: FileChartColumnIncreasing,
  },
  {
    label: "찾아오시는 길",
    href: "https://www.suyeong.go.kr/index.suyeong?menuCd=DOM_000000104003005000",
    icon: MapPin,
  },
  {
    label: "사이트맵",
    href: `${SYSTEM_BASE_URL}/info/siteMapList.do`,
    icon: LayoutGrid,
  },
]

function formatCurrency(value: number) {
  return `${value.toLocaleString("ko-KR")}원`
}

function formatKoreanCurrency(value: number) {
  const absoluteValue = Math.abs(value)
  const eok = Math.floor(absoluteValue / 100_000_000)
  const man = Math.floor((absoluteValue % 100_000_000) / 10_000)
  const prefix = value < 0 ? "-" : ""

  if (eok > 0 && man > 0) {
    return `${prefix}${eok.toLocaleString("ko-KR")}억 ${man.toLocaleString("ko-KR")}만원`
  }
  if (eok > 0) return `${prefix}${eok.toLocaleString("ko-KR")}억원`
  if (man > 0) return `${prefix}${man.toLocaleString("ko-KR")}만원`
  return formatCurrency(value)
}

function formatApiDate(value: string) {
  if (!/^\d{8}$/.test(value)) return value
  return `${value.slice(0, 4)}.${value.slice(4, 6)}.${value.slice(6, 8)}`
}

interface DisclosureCardProps {
  title: string
  description: string
  href: string
  icon: LucideIcon
  tone: "budget" | "settlement"
}

function DisclosureCard({ title, description, href, icon: Icon, tone }: DisclosureCardProps) {
  return (
    <article className="sy-service-card sy-disclosure-card" data-tone={tone}>
      <div className="sy-disclosure-card__graphic" aria-hidden="true">
        <span className="sy-disclosure-card__icon">
          <Icon />
        </span>
        <span className="sy-disclosure-card__line sy-disclosure-card__line--one" />
        <span className="sy-disclosure-card__line sy-disclosure-card__line--two" />
        <span className="sy-disclosure-card__line sy-disclosure-card__line--three" />
      </div>
      <div className="sy-disclosure-card__content">
        <span className="sy-card-eyebrow">재정공시</span>
        <h3>{title}</h3>
        <p>{description}</p>
        <a className="sy-text-link" href={href}>
          상세보기 <ArrowRight aria-hidden="true" />
        </a>
      </div>
    </article>
  )
}

function CumulativeFinanceOverview() {
  const [summary, setSummary] = useState(cumulativeFinanceSnapshot)

  useEffect(() => {
    if (window.location.hostname !== "contract.suyeong.go.kr") return

    const controller = new AbortController()
    const referenceDate = new Date()
    referenceDate.setDate(referenceDate.getDate() - 1)
    const fiscalYear = referenceDate.getFullYear().toString()
    const month = (referenceDate.getMonth() + 1).toString().padStart(2, "0")
    const day = referenceDate.getDate().toString().padStart(2, "0")
    const ymdTo = `${fiscalYear}${month}${day}`

    fetch("/revtes/basis/ajaxFundsMngList.do", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({
        page: 1,
        rowNum: 500,
        fisYear: fiscalYear,
        ymdFr: `${fiscalYear}0101`,
        ymdTo,
      }),
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error("누적 재정정보를 불러오지 못했습니다.")
        return response.json() as Promise<FundsManagementApiResponse>
      })
      .then((data) => {
        if (data.cmiosRtnCode !== "SUCC" || !data.dataList?.length) return

        const income = data.dataList.reduce(
          (total, item) => total + Number(item.nowAccumAmt ?? 0),
          0,
        )
        const expense = data.dataList.reduce(
          (total, item) => total + Number(item.nowExpdAmt ?? 0),
          0,
        )
        const budget = Number(
          data.dataList.find((item) => item.bgtCurrAmt !== null)?.bgtCurrAmt ?? 0,
        )

        setSummary({
          referenceDate: formatApiDate(data.dataList[0]?.ymd ?? ymdTo),
          budget,
          income,
          expense,
          balance: income - expense,
        })
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return
      })

    return () => controller.abort()
  }, [])

  const fiscalYear = summary.referenceDate.slice(0, 4)

  return (
    <section className="sy-cumulative-overview" aria-labelledby="cumulative-finance-title">
      <header className="sy-cumulative-overview__header">
        <div>
          <span>올해의 재정 흐름</span>
          <h3 id="cumulative-finance-title">누적 세입·세출 현황</h3>
        </div>
        <time dateTime={summary.referenceDate.replaceAll(".", "-")}>
          {summary.referenceDate} 기준
        </time>
      </header>

      <div className="sy-cumulative-overview__grid">
        <article className="sy-cumulative-card" data-tone="income">
          <div className="sy-cumulative-card__heading">
            <span className="sy-cumulative-card__icon" aria-hidden="true">
              <PiggyBank />
            </span>
            <div>
              <span>현재 수영구의 세입</span>
              <strong title={formatCurrency(summary.income)}>
                {formatKoreanCurrency(summary.income)}
              </strong>
            </div>
          </div>
          <div className="sy-cumulative-card__detail">
            <span>{fiscalYear}년 예산현액</span>
            <strong title={formatCurrency(summary.budget)}>
              {formatKoreanCurrency(summary.budget)}
            </strong>
          </div>
          <a href={`${SYSTEM_BASE_URL}/basis/fundsMngList.do`}>
            세입 상세보기 <ArrowRight aria-hidden="true" />
          </a>
        </article>

        <article className="sy-cumulative-card" data-tone="expense">
          <div className="sy-cumulative-card__heading">
            <span className="sy-cumulative-card__icon" aria-hidden="true">
              <ReceiptText />
            </span>
            <div>
              <span>현재 수영구의 세출</span>
              <strong title={formatCurrency(summary.expense)}>
                {formatKoreanCurrency(summary.expense)}
              </strong>
            </div>
          </div>
          <div className="sy-cumulative-card__detail">
            <span>{fiscalYear}년 자금잔액</span>
            <strong title={formatCurrency(summary.balance)}>
              {formatKoreanCurrency(summary.balance)}
            </strong>
          </div>
          <a href={`${SYSTEM_BASE_URL}/basis/fundsMngList.do`}>
            세출 상세보기 <ArrowRight aria-hidden="true" />
          </a>
        </article>
      </div>
    </section>
  )
}

function FinanceDashboard() {
  const [mode, setMode] = useState<FinanceMode>("expense")
  const [records, setRecords] = useState(dailyFinanceRecords)
  const displayedValue = (record: DailyFinanceRecord) =>
    mode === "income" ? record.income : record.expense

  useEffect(() => {
    if (window.location.hostname !== "contract.suyeong.go.kr") return

    const controller = new AbortController()

    fetch("/revtes/main/ajaxMainInfo.do", {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify({ fisYear: new Date().getFullYear() }),
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) throw new Error("일별 재정정보를 불러오지 못했습니다.")
        return response.json() as Promise<MainFinanceApiResponse>
      })
      .then((data) => {
        if (data.cmiosRtnCode !== "SUCC" || !data.dataFundsList?.length) return
        setRecords(
          data.dataFundsList.map((item) => ({
            date: formatApiDate(item.ymd),
            income: item.nowAccumAmt,
            expense: item.nowExpdAmt,
          })),
        )
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return
      })

    return () => controller.abort()
  }, [])

  const referenceDate = records[0]?.date ?? "2026.08.09"

  return (
    <article className="sy-finance-card">
      <div className="sy-finance-card__decoration" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <header className="sy-finance-card__header">
        <div>
          <span className="sy-finance-card__eyebrow">
            <CircleDollarSign aria-hidden="true" />
            매일 업데이트되는 재정정보
          </span>
          <h3>세입·세출 현황</h3>
        </div>
        <span className="sy-finance-card__date">{referenceDate} 기준</span>
      </header>

      <div className="sy-finance-tabs" role="tablist" aria-label="일별 세입·세출 구분">
        <button
          type="button"
          role="tab"
          aria-selected={mode === "income"}
          className={mode === "income" ? "is-active" : ""}
          onClick={() => setMode("income")}
        >
          일별 세입액
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === "expense"}
          className={mode === "expense" ? "is-active" : ""}
          onClick={() => setMode("expense")}
        >
          일별 세출액
        </button>
      </div>

      <div className="sy-finance-table" role="tabpanel">
        <div className="sy-finance-table__labels" aria-hidden="true">
          <span>기준일</span>
          <span>금액</span>
        </div>
        <ul aria-live="polite">
          {records.map((record) => (
            <li key={record.date}>
              <time dateTime={record.date.replaceAll(".", "-")}>{record.date.slice(5)}</time>
              <strong>{formatCurrency(displayedValue(record))}</strong>
            </li>
          ))}
        </ul>
      </div>

      <a className="sy-finance-card__more" href={`${SYSTEM_BASE_URL}/basis/fundsMngList.do`}>
        전체 현황 더보기 <ArrowUpRight aria-hidden="true" />
      </a>
    </article>
  )
}

function MainServicesCard() {
  return (
    <article className="sy-service-card sy-main-services-card">
      <div className="sy-main-services-card__heading">
        <span className="sy-main-services-card__icon" aria-hidden="true">
          <LayoutGrid />
        </span>
        <div>
          <span className="sy-card-eyebrow">바로가기</span>
          <h3>주요 서비스</h3>
        </div>
      </div>
      <p className="sy-main-services-card__description">
        필요한 재정정보를 빠르게 확인하세요.
      </p>
      <nav aria-label="주요 재정 서비스">
        <ul className="sy-main-services-list">
          {mainServices.map((service) => (
            <li key={service.label}>
              <a href={service.href}>
                <span>{service.label}</span>
                <ChevronRight aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </article>
  )
}

function SecondaryInformation() {
  const featuredSites = relatedSites.slice(0, 4)
  const additionalSites = relatedSites.slice(4)

  return (
    <section className="sy-secondary" aria-labelledby="secondary-title">
      <div className="sy-container">
        <div className="sy-secondary__heading">
          <div>
            <span>함께 이용하면 좋은 정보</span>
            <h2 id="secondary-title">이용안내</h2>
          </div>
          <p>공지와 관련 기관 정보를 한곳에서 확인하세요.</p>
        </div>

        <div className="sy-secondary-grid">
          <article className="sy-info-card sy-notice-card">
            <header className="sy-info-card__header">
              <div>
                <span className="sy-info-card__icon" aria-hidden="true">
                  <Bell />
                </span>
                <h3>공지사항</h3>
              </div>
              <a href={`${SYSTEM_BASE_URL}/notice/noticeInfoListMenu.do`} aria-label="공지사항 전체보기">
                <ArrowUpRight aria-hidden="true" />
              </a>
            </header>
            <div className="sy-notice-card__empty">
              <span aria-hidden="true"><ReceiptText /></span>
              <strong>등록된 자료가 없습니다.</strong>
              <p>새로운 공지사항이 등록되면 이곳에 표시됩니다.</p>
            </div>
          </article>

          <article className="sy-info-card sy-related-card">
            <header className="sy-info-card__header">
              <div>
                <span className="sy-info-card__icon" aria-hidden="true">
                  <Link2 />
                </span>
                <h3>관련사이트</h3>
              </div>
            </header>
            <ul className="sy-related-card__featured">
              {featuredSites.map((site) => (
                <li key={site.label}>
                  <a href={site.href} target="_blank" rel="noreferrer">
                    {site.label}<ExternalLink aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
            <details className="sy-related-card__more">
              <summary>관련사이트 전체보기</summary>
              <ul>
                {additionalSites.map((site) => (
                  <li key={site.label}>
                    <a href={site.href} target="_blank" rel="noreferrer">
                      {site.label}<ExternalLink aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          </article>

          <article className="sy-info-card sy-quick-card">
            <header className="sy-info-card__header">
              <div>
                <span className="sy-info-card__icon" aria-hidden="true">
                  <Landmark />
                </span>
                <h3>바로가기</h3>
              </div>
            </header>
            <ul className="sy-quick-card__list">
              {quickLinks.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a href={href}>
                    <span className="sy-quick-card__link-icon" aria-hidden="true"><Icon /></span>
                    <span>{label}</span>
                    <ChevronRight aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  )
}

function SuyeongFooter() {
  return (
    <footer className="sy-footer">
      <div className="sy-container sy-footer__inner">
        <div className="sy-footer__brand">
          <span className="sy-footer__municipality">
            <img src={suyeongIcon} alt="" aria-hidden="true" />
            <strong>수영구</strong>
          </span>
          <span>세입·세출예산 운영정보공개</span>
        </div>
        <div className="sy-footer__information">
          <p>(48305) 부산광역시 수영구 남천동로 100(남천동)</p>
          <p>Tel. 051-622-4251</p>
          <p className="sy-footer__copyright">
            COPYRIGHT © SUYEONG-GU. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  )
}

export function SuyeongHome() {
  return (
    <div className="sy-page">
      <SuyeongHeader />
      <main id="main-content" tabIndex={-1}>
        <section className="sy-hero" aria-labelledby="hero-title">
          <div className="sy-hero__shape sy-hero__shape--one" aria-hidden="true" />
          <div className="sy-hero__shape sy-hero__shape--two" aria-hidden="true" />
          <div className="sy-container sy-hero__inner">
            <span className="sy-hero__badge">
              <ShieldCheck aria-hidden="true" />
              수영구 운영정보공개
            </span>
            <h1 id="hero-title">
              <span>수영구 재정정보를</span>
              <strong>쉽고 빠르게 확인하세요</strong>
            </h1>
            <p>
              세입·세출부터 예산·결산 및 주요 재정정보를
              <br />
              한눈에 확인할 수 있습니다.
            </p>
          </div>
        </section>

        <section className="sy-services" aria-labelledby="services-title">
          <div className="sy-container">
            <div className="sy-section-heading">
              <div>
                <span className="sy-section-heading__label">
                  <WalletCards aria-hidden="true" />
                  한눈에 보는 재정정보
                </span>
                <h2 id="services-title">주요 재정 서비스</h2>
              </div>
              <p>수영구의 투명한 재정 운영 현황을 확인해 보세요.</p>
            </div>

            <div className="sy-finance-overview-layout">
              <CumulativeFinanceOverview />
              <FinanceDashboard />
            </div>

            <div className="sy-secondary-services-layout">
              <DisclosureCard
                title="예산공시"
                description="예산공시 정보를 확인하세요."
                href="https://www.suyeong.go.kr/finance/index.suyeong?menuCd=DOM_000000901004001000"
                icon={PiggyBank}
                tone="budget"
              />
              <DisclosureCard
                title="결산공시"
                description="재정공시 정보를 확인하세요."
                href="https://www.suyeong.go.kr/finance/index.suyeong?menuCd=DOM_000000901004002000"
                icon={ChartNoAxesColumnIncreasing}
                tone="settlement"
              />
              <MainServicesCard />
            </div>
          </div>
        </section>

        <SecondaryInformation />
      </main>
      <SuyeongFooter />
    </div>
  )
}
