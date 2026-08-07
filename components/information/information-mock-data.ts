import type {
  InformationFilters,
  InformationRecord,
} from "@/components/information/information-types"

export const EMPTY_INFORMATION_FILTERS: InformationFilters = {
  title: "",
  author: "",
  content: "",
  startDate: "",
  endDate: "",
}

export const LAW_RECORDS: InformationRecord[] = [
  {
    id: 1,
    title: "가평군 계약이행 특수조건",
    author: "회계과",
    content: "가평군 계약이행에 적용하는 특수조건입니다.",
    createdDate: "2024-11-18",
    attachment: "계약이행특수조건.pdf",
  },
  {
    id: 2,
    title: "[행정안전부 예규] 지방자치단체 입찰시 낙찰자 결정기준(2024. 7. 1.)",
    author: "회계과",
    content: "지방자치단체 입찰시 낙찰자 결정기준 개정 전문입니다.",
    createdDate: "2024-11-18",
    attachment: "[개정전문]지방자치단체 입찰시 낙찰자 결정기준.pdf",
    statuteLabel: "행정안전부 예규",
  },
  {
    id: 3,
    title: "[행정안전부 예규] 지방자치단체 입찰 및 계약집행기준(2024. 4. 1.)",
    author: "회계과",
    content: "지방자치단체 입찰 및 계약집행기준 개정 전문입니다.",
    createdDate: "2024-11-18",
    attachment: "[개정전문]지방자치단체 입찰 및 계약집행기준.pdf",
    statuteLabel: "행정안전부 예규",
  },
]

export const FORM_RECORDS: InformationRecord[] = [
  {
    id: 1,
    title: "'문서24' 서비스 이용 안내(계약상대자용)",
    author: "회계과",
    content: "계약상대자를 위한 문서24 서비스 이용 안내입니다.",
    createdDate: "2024-11-18",
    attachment: "[문서24] 서비스 이용자 가이드(민간)(용량줄임).pdf",
  },
  {
    id: 2,
    title: "가평군 '종이 없는 계약' 안내(계약상대자용)",
    author: "회계과",
    content: "가평군 종이 없는 계약업무 이용 안내입니다.",
    createdDate: "2024-11-18",
    attachment: "가평군 종이 없는 계약업무 안내(계약상대자용).pdf",
  },
  {
    id: 3,
    title: "채권입금 서식",
    author: "",
    content: "채권입금 관련 서식입니다.",
    createdDate: "2014-01-21",
    attachment: "채권입금관련조례.hwp",
  },
  {
    id: 4,
    title: "노무비구분관리제 서식",
    author: "",
    content: "노무비 구분관리 및 지급확인제 관련 서식입니다.",
    createdDate: "2014-01-21",
    attachment: "노무비구분관리및지급확인제(관련서식)[1].hwp",
  },
]
