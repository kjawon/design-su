import type { NoticeFilters, NoticeRecord } from "@/components/notice/notice-types"

export const EMPTY_NOTICE_FILTERS: NoticeFilters = {
  title: "",
  content: "",
  author: "",
  startDate: "",
  endDate: "",
}

export const NOTICE_RECORDS: NoticeRecord[] = [
  {
    id: 1,
    title: "가평군 계약정보공개시스템 일시중단 알림",
    content: "가평군 계약정보공개시스템 일시중단 안내입니다.",
    author: "회계과",
    createdDate: "2026-08-03",
    attachment: "",
  },
  {
    id: 2,
    title: "가평군 계약정보공개시스템 일시중단 알림",
    content: "가평군 계약정보공개시스템 일시중단 안내입니다.",
    author: "회계과",
    createdDate: "2026-02-08",
    attachment: "",
  },
  {
    id: 3,
    title: "홈페이지 시스템 긴급점검에 따른 계약정보공개시스템 일시 중단 안내",
    content: "홈페이지 시스템 긴급점검에 따른 서비스 중단 안내입니다.",
    author: "회계과",
    createdDate: "2026-01-17",
    attachment: "",
  },
  {
    id: 4,
    title: "테스트",
    content: "테스트 게시글입니다.",
    author: "회계과",
    createdDate: "2025-06-17",
    attachment: "",
  },
  {
    id: 5,
    title: "소프트웨어사업 영향평가 결과서(자라섬 워케이션센터 홈페이지 구축) 공시",
    content: "자라섬 워케이션센터 홈페이지 구축 소프트웨어사업 영향평가 결과를 공시합니다.",
    author: "회계과",
    createdDate: "2025-07-02",
    attachment: "소프트웨어사업 영향평가 결과서(자라섬 워케이션센터 홈페이지 구축).hwp",
  },
  {
    id: 6,
    title: "전산실 방화벽 교체에 따른 계약정보공개시스템 최소화 오류 안내",
    content: "전산실 방화벽 교체 작업에 따른 시스템 오류 안내입니다.",
    author: "회계과",
    createdDate: "2025-06-09",
    attachment: "",
  },
  {
    id: 7,
    title: "자체발주계획 오류 조치 안내",
    content: "자체발주계획 오류 조치 내용을 안내합니다.",
    author: "회계과",
    createdDate: "2025-05-16",
    attachment: "",
  },
  {
    id: 8,
    title: "전산실 방화벽 교체에 따른 계약정보공개시스템 일시 중단 안내",
    content: "전산실 방화벽 교체에 따른 계약정보공개시스템 일시 중단 안내입니다.",
    author: "회계과",
    createdDate: "2025-03-18",
    attachment: "",
  },
  {
    id: 9,
    title: "2014년 재활용품 매각 단가 입찰 공고 안내",
    content: "2014년 재활용품 매각 단가 입찰 공고를 안내합니다.",
    author: "",
    createdDate: "2014-02-26",
    attachment: "재활용품 매각 단가 입찰 공고.hwp",
  },
]
