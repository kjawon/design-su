export function PortalFooter() {
  return (
    <footer className="bg-text-primary text-primary-foreground">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-3 px-5 pb-7 pt-5 text-center lg:px-8">
        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-footer-text">
          <a href="#" className="hover:text-ai-secondary">개인정보처리방침</a>
          <a href="#" className="hover:text-ai-secondary">이용약관</a>
          <a href="#" className="hover:text-ai-secondary">이메일무단수집거부</a>
          <a href="#" className="hover:text-ai-secondary">찾아오시는 길</a>
        </nav>
        <p className="text-xs leading-relaxed text-footer-text">(12417) 경기도 가평군 가평읍 석봉로 181 가평군청<br />대표전화: 031-580-2114 · 평일 09:00 ~ 18:00</p>
        <p className="text-xs text-footer-text">Copyright © Gapyeong County. All Rights Reserved.</p>
      </div>
    </footer>
  )
}
