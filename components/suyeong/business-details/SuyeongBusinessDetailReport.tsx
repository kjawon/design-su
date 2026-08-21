import { ArrowLeft, Building2, CalendarRange, CircleDollarSign, Printer } from "lucide-react"
import { useEffect, useRef } from "react"
import { formatCurrency, formatKoreanCurrency } from "@/components/suyeong/utils/currency"
import type { BusinessDetailRecord } from "./business-details.types"
import "./SuyeongBusinessDetailReport.css"

interface SuyeongBusinessDetailReportProps {
  record: BusinessDetailRecord
  onBack: () => void
}

function formatDate(value: string) {
  return value.replaceAll("-", ".")
}

export function SuyeongBusinessDetailReport({
  record,
  onBack,
}: SuyeongBusinessDetailReportProps) {
  const reportRef = useRef<HTMLElement>(null)

  useEffect(() => {
    reportRef.current?.focus()
  }, [])

  return (
    <div className="sy-business-report-shell">
      <div className="sy-business-report-toolbar">
        <button className="sy-business-report-toolbar__back" type="button" onClick={onBack}>
          <ArrowLeft aria-hidden="true" />
          목록으로
        </button>
        <button
          className="sy-business-report-toolbar__print"
          type="button"
          onClick={() => window.print()}
        >
          <Printer aria-hidden="true" />
          인쇄·PDF 저장
        </button>
      </div>

      <article
        ref={reportRef}
        className="sy-business-report"
        aria-labelledby="business-report-title"
        tabIndex={-1}
      >
        <header className="sy-business-report__header">
          <div className="sy-business-report__title-group">
            <p className="sy-business-report__eyebrow">사업 상세정보</p>
            <h2 id="business-report-title">{record.businessName}</h2>
            <p className="sy-business-report__lead">{record.purpose}</p>
          </div>
          <dl className="sy-business-report__document-meta">
            <div>
              <dt>회계연도</dt>
              <dd>{record.fiscalYear}년</dd>
            </div>
            <div>
              <dt>목록번호</dt>
              <dd>{record.number}</dd>
            </div>
          </dl>
        </header>

        <section className="sy-business-report__summary" aria-label="사업 핵심 요약">
          <div className="sy-business-report__summary-item sy-business-report__summary-item--budget">
            <span className="sy-business-report__summary-icon" aria-hidden="true">
              <CircleDollarSign />
            </span>
            <div>
              <span>총사업비</span>
              <strong>{formatKoreanCurrency(record.totalBudget)}</strong>
              <small>{formatCurrency(record.totalBudget)}</small>
            </div>
          </div>
          <div className="sy-business-report__summary-item">
            <span className="sy-business-report__summary-icon" aria-hidden="true">
              <Building2 />
            </span>
            <div>
              <span>담당부서</span>
              <strong>{record.department}</strong>
              <small>{record.fieldLabel}</small>
            </div>
          </div>
          <div className="sy-business-report__summary-item">
            <span className="sy-business-report__summary-icon" aria-hidden="true">
              <CalendarRange />
            </span>
            <div>
              <span>사업기간</span>
              <strong>{formatDate(record.startDate)}</strong>
              <small>{formatDate(record.endDate)}까지</small>
            </div>
          </div>
        </section>

        <section className="sy-business-report__section" aria-labelledby="business-overview-title">
          <div className="sy-business-report__section-heading">
            <span aria-hidden="true">01</span>
            <div>
              <h3 id="business-overview-title">사업 개요</h3>
              <p>사업의 기본 행정정보를 한눈에 확인할 수 있습니다.</p>
            </div>
          </div>
          <dl className="sy-business-report__info-grid">
            <div>
              <dt>회계연도</dt>
              <dd>{record.fiscalYear}년</dd>
            </div>
            <div>
              <dt>회계구분</dt>
              <dd>{record.accountingType}</dd>
            </div>
            <div>
              <dt>담당부서</dt>
              <dd>{record.department}</dd>
            </div>
            <div>
              <dt>분야</dt>
              <dd>{record.fieldLabel}</dd>
            </div>
            <div>
              <dt>사업시작일</dt>
              <dd>{formatDate(record.startDate)}</dd>
            </div>
            <div>
              <dt>사업종료일</dt>
              <dd>{formatDate(record.endDate)}</dd>
            </div>
          </dl>
        </section>

        <section className="sy-business-report__section" aria-labelledby="business-purpose-title">
          <div className="sy-business-report__section-heading">
            <span aria-hidden="true">02</span>
            <div>
              <h3 id="business-purpose-title">사업 목적 및 추진기간</h3>
              <p>추진 목적과 전체 사업기간을 구분해 정리했습니다.</p>
            </div>
          </div>
          <div className="sy-business-report__purpose">
            <span>사업 목적</span>
            <p>{record.purpose}</p>
          </div>
          <div className="sy-business-report__period" aria-label="사업 추진기간">
            <div>
              <span>사업 시작</span>
              <strong>{formatDate(record.startDate)}</strong>
            </div>
            <span className="sy-business-report__period-line" aria-hidden="true" />
            <div>
              <span>사업 종료</span>
              <strong>{formatDate(record.endDate)}</strong>
            </div>
          </div>
        </section>

        <section className="sy-business-report__section" aria-labelledby="business-budget-title">
          <div className="sy-business-report__section-heading">
            <span aria-hidden="true">03</span>
            <div>
              <h3 id="business-budget-title">예산 현황</h3>
              <p>등록된 사업비를 회계정보와 함께 제공합니다.</p>
            </div>
          </div>
          <div className="sy-business-report__table-wrap">
            <table className="sy-business-report__budget-table">
              <caption className="sy-visually-hidden">사업 예산 현황</caption>
              <thead>
                <tr>
                  <th scope="col">구분</th>
                  <th scope="col">회계연도</th>
                  <th scope="col">회계구분</th>
                  <th scope="col">예산액</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">총사업비</th>
                  <td>{record.fiscalYear}년</td>
                  <td>{record.accountingType}</td>
                  <td>{formatCurrency(record.totalBudget)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="sy-business-report__note">
            ※ 본 자료는 사업별 세부설명 조회 데이터에 등록된 금액을 기준으로 작성되었습니다.
          </p>
        </section>

        <footer className="sy-business-report__footer">
          <span>사업별 세부설명</span>
          <strong>쏠텍주식회사</strong>
        </footer>
      </article>
    </div>
  )
}
