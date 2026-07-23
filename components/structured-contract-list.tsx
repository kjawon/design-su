import { useEffect, useRef, useState } from "react"
import { ArrowRight } from "lucide-react"
import {
  recentInformation,
  type RecentContentType,
  type RecentListItemData,
} from "@/components/portal-data"
import { Badge } from "@/components/ui/badge"

interface ContentOption {
  value: RecentContentType
  label: string
  href: string
  moreLabel: string
  listLabel: string
  itemLabel: string
}

const contentOptions: ContentOption[] = [
  {
    value: "contract",
    label: "계약정보",
    href: "#contracts",
    moreLabel: "계약정보 전체 목록",
    listLabel: "최근 계약정보 목록",
    itemLabel: "계약 상세보기",
  },
  {
    value: "payment",
    label: "대금지급",
    href: "#payments",
    moreLabel: "대금지급 전체 목록",
    listLabel: "최근 대금지급 목록",
    itemLabel: "대금지급 상세보기",
  },
  {
    value: "notice",
    label: "공지사항",
    href: "#notices",
    moreLabel: "공지사항 전체 목록",
    listLabel: "최근 공지사항 목록",
    itemLabel: "공지사항 상세보기",
  },
]

interface RecentListItemProps {
  item: RecentListItemData
  itemLabel: string
  contentType: RecentContentType
}

function RecentListItem({ item, itemLabel, contentType }: RecentListItemProps) {
  const badge = item.badge || "-"
  const title = item.title || "-"
  const value = item.value || "-"
  const date = item.date || "-"
  const isPayment = contentType === "payment"
  const isNotice = contentType === "notice"

  return (
    <li className="min-h-16 border-b border-gray-300 last:border-0 lg:min-h-0 lg:flex-1">
      <div className={`contract-list-row grid h-full grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2 rounded-md px-2 py-2 lg:py-0 ${
        isNotice
          ? "sm:grid-cols-[4rem_minmax(0,1fr)_6rem]"
          : "sm:grid-cols-[4rem_minmax(0,1fr)_8.5rem_6rem]"
      }`}>
        {isNotice ? (
          <Badge
            data-notice-type={badge}
            className="notice-tag aspect-square size-12 max-h-full max-w-full shrink-0 justify-self-center rounded-full px-0 py-0 text-sm font-bold leading-none lg:h-4/5 lg:w-auto"
          >
            {badge}
          </Badge>
        ) : (
          <Badge
            data-contract-type={contentType === "contract" ? badge : undefined}
            data-payment-type={isPayment ? badge : undefined}
            className={`${isPayment ? "payment-tag" : "contract-tag"} aspect-square size-12 max-h-full max-w-full shrink-0 justify-self-center rounded-full px-0 py-0 text-sm font-bold leading-none lg:h-4/5 lg:w-auto`}
          >
            {badge}
          </Badge>
        )}
        <a href="#" className="krds-contract-link min-w-0 text-[18px] font-medium text-text-primary sm:truncate" aria-label={`${title} ${itemLabel}`}>
          {title}
        </a>
        {!isNotice && (
          <strong className={`w-full text-right max-sm:col-start-2 ${
            isPayment ? "text-[19px] font-bold text-primary-600" : "text-sm text-primary-700"
          }`}>
            {value}
          </strong>
        )}
        <time className="text-xs text-text-muted max-sm:col-start-2 sm:text-right">{date}</time>
      </div>
    </li>
  )
}

function RecentListSkeleton() {
  return Array.from({ length: 5 }, (_, index) => (
    <li key={index} aria-hidden="true" className="min-h-16 border-b border-gray-300 last:border-0 lg:min-h-0 lg:flex-1">
      <div className="grid h-full animate-pulse grid-cols-[auto_1fr] items-center gap-x-3 gap-y-2 px-2 py-2 sm:grid-cols-[4rem_minmax(0,1fr)_8.5rem_6rem] lg:py-0">
        <span className="size-12 justify-self-center rounded-full bg-gray-100 lg:h-4/5 lg:w-auto lg:aspect-square" />
        <span className="h-4 w-4/5 rounded bg-gray-100" />
        <span className="h-4 w-4/5 justify-self-end rounded bg-gray-100 max-sm:col-start-2" />
        <span className="h-3 w-3/4 justify-self-end rounded bg-gray-100 max-sm:col-start-2" />
      </div>
    </li>
  ))
}

export function StructuredContractList() {
  const [selectedType, setSelectedType] = useState<RecentContentType>("contract")
  const [displayedType, setDisplayedType] = useState<RecentContentType>("contract")
  const [isLoading, setIsLoading] = useState(false)
  const transitionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const selectedOption = contentOptions.find(({ value }) => value === selectedType)!
  const displayedOption = contentOptions.find(({ value }) => value === displayedType)!

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current)
    }
  }, [])

  const selectContent = (nextType: RecentContentType) => {
    if (nextType === selectedType) return
    if (transitionTimerRef.current) clearTimeout(transitionTimerRef.current)

    setSelectedType(nextType)
    setIsLoading(true)
    transitionTimerRef.current = setTimeout(() => {
      setDisplayedType(nextType)
      setIsLoading(false)
      transitionTimerRef.current = null
    }, 150)
  }

  return (
    <section aria-labelledby="recent-information-title" className="min-w-0 lg:col-span-3 lg:border-r lg:border-border lg:pr-6">
      <div className="grid min-h-14 grid-cols-[minmax(0,1fr)_auto] items-start gap-x-3 gap-y-2 border-b border-border py-2 sm:h-14 sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:gap-x-6">
        <h2 id="recent-information-title" className="col-start-1 row-start-1 shrink-0 text-xl font-extrabold text-text-primary sm:translate-y-[12px]">최근 정보</h2>
        <div
          role="group"
          aria-label="최근 정보 종류"
          className="col-span-2 row-start-2 flex min-w-0 gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:col-span-1 sm:col-start-2 sm:row-start-1 sm:translate-y-[8px] sm:pb-0 sm:pt-[7px]"
        >
          {contentOptions.map((option) => {
            const isSelected = option.value === selectedType
            return (
              <button
                key={option.value}
                type="button"
                aria-pressed={isSelected}
                onClick={() => selectContent(option.value)}
                className={`inline-flex h-[40px] min-w-[84px] shrink-0 items-center justify-center rounded-full border px-[14px] text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#1769C2] focus-visible:ring-offset-1 ${
                  isSelected
                    ? "border-[#1769C2] bg-[#EAF3FF] text-[#155FAE]"
                    : "border-gray-300 bg-[#F3F9FF] text-gray-700 hover:border-[#8CB8E8] hover:bg-[#F3F7FF] hover:text-[#155FAE]"
                }`}
              >
                {option.label}
              </button>
            )
          })}
        </div>
        <a
          href={selectedOption.href}
          aria-label={selectedOption.moreLabel}
          className="col-start-2 row-start-1 mt-[7px] inline-flex min-h-10 shrink-0 items-center gap-1 rounded-lg bg-white px-3 text-sm font-bold text-primary-700 transition-colors hover:bg-primary-50 sm:col-start-3"
        >
          더보기<ArrowRight className="size-4" aria-hidden="true" />
        </a>
      </div>
      <ul
        key={isLoading ? "loading" : displayedType}
        aria-label={displayedOption.listLabel}
        aria-busy={isLoading}
        className={`min-h-[320px] lg:flex lg:h-[calc(348px+2.5rem)] lg:flex-col ${isLoading ? "" : "recent-list-enter"}`}
      >
        {isLoading
          ? <RecentListSkeleton />
          : recentInformation[displayedType].slice(0, 5).map((item) => (
              <RecentListItem
                key={`${item.title}-${item.date}`}
                item={item}
                itemLabel={displayedOption.itemLabel}
                contentType={displayedType}
              />
            ))}
      </ul>
    </section>
  )
}
