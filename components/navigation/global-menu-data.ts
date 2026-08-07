import { contractMenuGroups } from "@/components/contract/contract-page-config"
import { paymentMenuGroups } from "@/components/payment/payment-page-config"

export type MenuItem = {
  label: string
  path: string
}

export type MenuGroup = {
  title?: string
  items: MenuItem[]
}

export type GlobalMenu = {
  label: string
  path?: string
  columns: number
  groups: MenuGroup[]
}

const [generalContractMenu, specialContractMenu] = contractMenuGroups
const [generalPaymentMenu, specialPaymentMenu] = paymentMenuGroups

export const globalMenus: GlobalMenu[] = [
  {
    label: "발주·입찰정보",
    path: "/procurement/plan",
    columns: 3,
    groups: [
      {
        title: "발주계획",
        items: [
          // TODO: 상세 화면 라우트가 추가되면 기존 홈 섹션 경로를 교체합니다.
          { label: "조달청 발주계획", path: "https://www.g2b.go.kr/" },
          { label: "자체 발주계획", path: "/procurement/plan" },
        ],
      },
      {
        title: "조달청 입찰공고",
        items: [
          // TODO: 상세 화면 라우트가 추가되면 기존 홈 섹션 경로를 교체합니다.
          { label: "공사입찰", path: "https://www.g2b.go.kr/" },
          { label: "용역입찰", path: "https://www.g2b.go.kr/" },
          { label: "물품입찰", path: "https://www.g2b.go.kr/" },
        ],
      },
      {
        title: "조달청 개찰결과",
        items: [
          { label: "공사개찰", path: "https://www.g2b.go.kr/" },
          { label: "용역개찰", path: "https://www.g2b.go.kr/" },
          { label: "물품개찰", path: "https://www.g2b.go.kr/" },
        ],
      },
    ],
  },
  {
    label: "계약정보",
    path: "/contract/status",
    columns: 3,
    groups: [
      {
        title: "일반회계",
        items: generalContractMenu.items.map(({ label, path }) => ({ label, path })),
      },
      {
        title: "특별회계",
        items: specialContractMenu.items.map(({ label, path }) => ({ label, path })),
      },
      {
        items: [
          // TODO: 상세 화면 라우트가 추가되면 경로를 연결합니다.
          { label: "협상계약평가결과", path: "/contract/negotiation-evaluation" },
        ],
      },
    ],
  },
  {
    label: "대금지급",
    path: "/payment/status",
    columns: 2,
    groups: [
      {
        title: "일반회계",
        items: generalPaymentMenu.items.map(({ label, path }) => ({ label, path })),
      },
      {
        title: "특별회계",
        items: specialPaymentMenu.items.map(({ label, path }) => ({ label, path })),
      },
    ],
  },
  {
    label: "관련정보",
    path: "/information/laws",
    columns: 1,
    groups: [
      {
        items: [
          { label: "계약법규", path: "/information/laws" },
          { label: "계약서식", path: "/information/forms" },
          { label: "관련사이트", path: "/information/sites" },
        ],
      },
    ],
  },
  {
    label: "공지사항",
    path: "/notice/list",
    columns: 1,
    groups: [
      {
        items: [
          { label: "알림글", path: "/notice/list" },
          { label: "업무안내", path: "/notice/guide" },
          { label: "오시는길", path: "/notice/directions" },
        ],
      },
    ],
  },
]
