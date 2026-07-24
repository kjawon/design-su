import { CalendarDays } from "lucide-react"
import type { MouseEvent } from "react"

type DateRangeFieldProps = {
  label: string
  startLabel: string
  endLabel: string
  startDate: string
  endDate: string
  onStartDateChange: (value: string) => void
  onEndDateChange: (value: string) => void
}

function openDatePicker(event: MouseEvent<HTMLInputElement>) {
  try {
    event.currentTarget.showPicker?.()
  } catch {
    // showPicker를 지원하지 않는 브라우저는 기본 날짜 입력 동작을 사용합니다.
  }
}

function DateInput({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="contract-date-input">
      <input
        type="date"
        aria-label={label}
        value={value}
        onClick={openDatePicker}
        onChange={(event) => onChange(event.target.value)}
      />
      <span
        aria-hidden="true"
        className={value ? "contract-date-input__value" : "contract-date-input__value is-placeholder"}
      >
        {value || "연도-월-일"}
      </span>
      <CalendarDays className="contract-date-input__icon" size={18} aria-hidden="true" />
    </div>
  )
}

export function DateRangeField({
  label,
  startLabel,
  endLabel,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}: DateRangeFieldProps) {
  return (
    <fieldset className="contract-field">
      <legend>{label}</legend>
      <div className="contract-range contract-date-range">
        <DateInput label={startLabel} value={startDate} onChange={onStartDateChange} />
        <span aria-hidden="true">~</span>
        <DateInput label={endLabel} value={endDate} onChange={onEndDateChange} />
      </div>
    </fieldset>
  )
}
