export function Footer() {
  return (
    <footer className="bg-text-primary text-primary-foreground">
      <div className="mx-auto flex max-w-[1530px] flex-col items-center gap-5 px-5 py-10 text-center lg:px-8">
        <strong className="text-lg">성남시청</strong>
        <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-footer-text">
          <a href="#" className="hover:text-ai-secondary">개인정보처리방침</a>
          <a href="#" className="hover:text-ai-secondary">이용약관</a>
          <a href="#" className="hover:text-ai-secondary">이메일무단수집거부</a>
          <a href="#" className="hover:text-ai-secondary">찾아오시는 길</a>
        </nav>
        <p className="text-xs leading-relaxed text-footer-text">(13437) 경기도 성남시 중원구 성남대로 997(여수동 200번지) 성남시청<br />대표전화: 1577-3100 · 평일 09:00 ~ 18:00</p>
        <p className="text-xs text-footer-text">Copyright © Seongnam City. All Rights Reserved.</p>
      </div>
    </footer>
  )
}
