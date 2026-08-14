import { CalendarDays } from "lucide-react"
import { SuyeongSearchActions } from "@/components/suyeong/shared"
import type { NoticeSearchCriteria } from "./notices.types"
import "./SuyeongNoticeSearch.css"

interface SuyeongNoticeSearchProps {
  criteria: NoticeSearchCriteria
  onChange: (criteria: NoticeSearchCriteria) => void
  onReset: () => void
  onSubmit: () => void
}

export function SuyeongNoticeSearch({
  criteria,
  onChange,
  onReset,
  onSubmit,
}: SuyeongNoticeSearchProps) {
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form className="sy-notice-search sy-search-panel" onSubmit={submit}>
      <div className="sy-notice-search__grid">
        <label className="sy-search-control">
          <span>제목</span>
          <input
            type="search"
            value={criteria.title}
            placeholder="제목을 입력해주세요."
            onChange={(event) => onChange({ ...criteria, title: event.target.value })}
          />
        </label>
        <label className="sy-search-control">
          <span>작성자</span>
          <input
            type="search"
            value={criteria.author}
            placeholder="작성자를 입력해주세요."
            onChange={(event) => onChange({ ...criteria, author: event.target.value })}
          />
        </label>
        <label className="sy-search-control">
          <span>내용</span>
          <input
            type="search"
            value={criteria.content}
            placeholder="내용을 입력해주세요."
            onChange={(event) => onChange({ ...criteria, content: event.target.value })}
          />
        </label>
        <fieldset className="sy-notice-search__period">
          <legend>작성일자</legend>
          <div className="sy-notice-search__dates">
            <label className="sy-search-control">
              <span className="sy-visually-hidden">작성 시작일</span>
              <input
                type="date"
                value={criteria.startDate}
                max={criteria.endDate || undefined}
                onChange={(event) => onChange({ ...criteria, startDate: event.target.value })}
              />
              <CalendarDays aria-hidden="true" />
            </label>
            <span aria-hidden="true">~</span>
            <label className="sy-search-control">
              <span className="sy-visually-hidden">작성 종료일</span>
              <input
                type="date"
                value={criteria.endDate}
                min={criteria.startDate || undefined}
                onChange={(event) => onChange({ ...criteria, endDate: event.target.value })}
              />
              <CalendarDays aria-hidden="true" />
            </label>
          </div>
        </fieldset>
      </div>

      <div className="sy-notice-search__footer sy-search-panel__footer">
        <SuyeongSearchActions onReset={onReset} />
      </div>
    </form>
  )
}
