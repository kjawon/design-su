const SYSTEM_BASE_URL = "http://contract.suyeong.go.kr/revtes"

export const suyeongLinks = {
  home: "/",
  funds: `${SYSTEM_BASE_URL}/basis/fundsMngList.do`,
  income: `${SYSTEM_BASE_URL}/basis/revenueList.do`,
  budgetExecution: `${SYSTEM_BASE_URL}/basis/budgetExecutionList.do`,
  businessBudget: `${SYSTEM_BASE_URL}/basis/bizbudgetList.do`,
  expenditure: `${SYSTEM_BASE_URL}/basis/expenditureList.do`,
  businessDetails: `${SYSTEM_BASE_URL}/basis/allBizList.do`,
  notices: `${SYSTEM_BASE_URL}/notice/noticeInfoListMenu.do`,
  budgetDisclosure:
    "https://www.suyeong.go.kr/finance/index.suyeong?menuCd=DOM_000000901004001000",
  settlementDisclosure:
    "https://www.suyeong.go.kr/finance/index.suyeong?menuCd=DOM_000000901004002000",
} as const

export const primaryNavigationItems = [
  { label: "자금운용현황", href: suyeongLinks.funds },
  { label: "세입정보", href: suyeongLinks.income },
  { label: "세출정보", href: suyeongLinks.budgetExecution },
  { label: "공지사항", href: suyeongLinks.notices },
] as const
