import { Building2, MapPin } from "lucide-react"
import type { NoticePageKind } from "@/components/notice/notice-types"

export function NoticeInformationPanel({ pageKind }: { pageKind: NoticePageKind }) {
  if (pageKind === "directions") {
    return (
      <article className="notice-info-panel" aria-labelledby="directions-card-title">
        <span className="notice-info-panel__icon" aria-hidden="true">
          <MapPin size={30} strokeWidth={1.8} />
        </span>
        <div>
          <p className="notice-info-panel__eyebrow">가평군청 오시는길</p>
          <h2 id="directions-card-title">가평군청 위치 안내</h2>
          <p>
            가평군청 계약정보공개시스템을 방문하실 때 아래 주소를 참고해 주세요.
            지도 및 길찾기 서비스는 추후 연결될 예정입니다.
          </p>
          <dl className="notice-info-list">
            <div>
              <dt>주소</dt>
              <dd>(12417) 경기도 가평군 가평읍 석봉로 181</dd>
            </div>
            <div>
              <dt>문의</dt>
              <dd>계약정보 관련 문의는 가평군청 회계과로 연락해 주세요.</dd>
            </div>
          </dl>
        </div>
      </article>
    )
  }

  return (
    <article className="notice-info-panel" aria-labelledby="guide-card-title">
      <span className="notice-info-panel__icon" aria-hidden="true">
        <Building2 size={30} strokeWidth={1.8} />
      </span>
      <div>
        <p className="notice-info-panel__eyebrow">계약업무 안내</p>
        <h2 id="guide-card-title">가평군 계약업무 안내</h2>
        <p>
          가평군 계약정보공개시스템을 방문해 주셔서 감사합니다. 계약과 관련한 주요
          정보와 공개 자료를 각 메뉴에서 확인하실 수 있습니다.
        </p>
        <dl className="notice-info-list">
          <div>
            <dt>안내 내용</dt>
            <dd>발주계획, 입찰정보, 계약현황, 대금지급 등 계약 관련 정보</dd>
          </div>
          <div>
            <dt>문의</dt>
            <dd>자세한 업무 안내는 가평군청 회계과로 문의해 주세요.</dd>
          </div>
        </dl>
      </div>
    </article>
  )
}
