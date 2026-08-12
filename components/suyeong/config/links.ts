export const suyeongLinks = {
  home: "/",
  funds: "/funds",
  income: "/income",
  budgetExecution: "/budget-execution",
  businessBudget: "/business-budget",
  expenditure: "/expenditure",
  businessDetails: "/business-details",
  notices: "/notices",
  budgetDisclosure:
    "https://www.suyeong.go.kr/finance/index.suyeong?menuCd=DOM_000000901004001000",
  settlementDisclosure:
    "https://www.suyeong.go.kr/finance/index.suyeong?menuCd=DOM_000000901004002000",
} as const

export const primaryNavigationItems = [
  { label: "자금운용현황", href: suyeongLinks.funds },
  { label: "세입정보", href: suyeongLinks.income },
  {
    label: "세출정보",
    href: suyeongLinks.budgetExecution,
    children: [
      { label: "예산집행현황", href: suyeongLinks.budgetExecution },
      { label: "사업및예산정보", href: suyeongLinks.businessBudget },
      { label: "세출현황", href: suyeongLinks.expenditure },
      { label: "사업별세부설명", href: suyeongLinks.businessDetails },
    ],
  },
  { label: "공지사항", href: suyeongLinks.notices },
] as const
