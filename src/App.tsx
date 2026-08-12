import { lazy, Suspense } from "react"

const pageRoutes = {
  "/funds": lazy(() => import("@/components/suyeong/funds")),
  "/income": lazy(() => import("@/components/suyeong/income")),
  "/budget-execution": lazy(() => import("@/components/suyeong/budget-execution")),
  "/business-budget": lazy(() => import("@/components/suyeong/business-budget")),
  "/expenditure": lazy(() => import("@/components/suyeong/expenditure")),
  "/business-details": lazy(() => import("@/components/suyeong/business-details")),
  "/notices": lazy(() => import("@/components/suyeong/notices")),
  "/": lazy(() => import("@/components/suyeong/home")),
} as const

export function App() {
  const pathname = window.location.pathname.replace(/\/+$/, "") || "/"
  const Page = pageRoutes[pathname as keyof typeof pageRoutes] ?? pageRoutes["/"]

  return (
    <Suspense fallback={<div className="sy-route-loading" role="status">페이지를 불러오는 중입니다.</div>}>
      <Page />
    </Suspense>
  )
}
