import seongnamLogo from "@/성남시 로고.svg"
import { Search } from "@/components/search"

export function IntroSection() {
  return (
    <section className="portal-hero bg-card">
      <div className="portal-hero-content relative z-10 mx-auto w-full max-w-[1400px] px-5 text-center lg:px-8">
        <div className="shrink-0">
          <div className="portal-hero-heading flex items-center justify-center gap-3 sm:gap-4">
            <span className="seongnam-symbol" aria-hidden="true"><img src={seongnamLogo} alt="" /></span>
            <h1 className="break-keep text-[1.75rem] font-extrabold leading-tight tracking-tight text-text-primary sm:text-3xl md:text-[2.5rem]">성남시 계약정보를 한눈에 확인하세요</h1>
          </div>
          <p className="mx-auto mt-3 max-w-[42rem] break-keep text-sm leading-relaxed text-text-secondary sm:text-base md:text-lg">발주부터 계약, 대금지급까지 필요한 정보를 빠르게 확인할 수 있습니다.</p>
        </div>
        <Search />
      </div>
    </section>
  )
}
