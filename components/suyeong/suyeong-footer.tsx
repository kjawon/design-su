import "@/components/suyeong/suyeong-footer.css"

export function SuyeongFooter() {
  return (
    <footer className="sy-footer" aria-label="사이트 정보">
      <div className="sy-container sy-footer__inner">
        <div className="sy-footer__brand">
          <span className="sy-footer__municipality">
            <strong>수영구</strong>
          </span>
          <span className="sy-footer__divider" aria-hidden="true" />
          <span className="sy-footer__service">
            <span>세입·세출예산</span>
            <strong>운영정보공개</strong>
          </span>
        </div>
        <div className="sy-footer__information">
          <div className="sy-footer__contact">
            <address>(48305) 부산광역시 수영구 남천동로 100(남천동)</address>
            <span aria-hidden="true">|</span>
            <a href="tel:051-622-4251">대표전화 051-622-4251</a>
          </div>
          <p className="sy-footer__copyright">
            COPYRIGHT © SUYEONG-GU. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  )
}
