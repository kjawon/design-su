import "@/components/suyeong/shared/SuyeongFooter.css"

export function SuyeongFooter() {
  return (
    <footer className="sy-footer" aria-label="사이트 정보">
      <div className="sy-container sy-footer__inner">
        <div className="sy-footer__brand">
          <span className="sy-footer__company">
            <span className="sy-footer__company-highlight">쏠텍</span>주식회사
          </span>
          <span className="sy-footer__divider" aria-hidden="true" />
          <span className="sy-footer__service">
            <span>세입·세출예산</span>
            <strong>운영정보공개</strong>
          </span>
        </div>
        <div className="sy-footer__information">
          <div className="sy-footer__contact">
            <address>(00000) 00광역시 00구 00로 00</address>
            <span aria-hidden="true">|</span>
            <span>대표전화 000-0000-0000</span>
          </div>
          <p className="sy-footer__copyright">
            COPYRIGHT © 쏠텍주식회사. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  )
}
