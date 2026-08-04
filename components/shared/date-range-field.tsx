import { CalendarDays } from "lucide-react"
import type { MouseEvent } from "react"

type DateRangeFieldProps = {
  label: string
  startLabel: string
  endLabel: string
  startDate: string
  endDate: string
  errorMessage?: string
  onStartDateChange: (value: string) => void
  onEndDateChange: (value: string) => void
}

function openDatePicker(event: MouseEvent<HTMLInputElement>) {
  try {
    event.currentTarget.showPicker?.()
  } catch {
    // 지원하지 않는 브라우저에서는 기본 날짜 입력 동작을 사용합니다.
  }
}

function DateInput({
  label,
  value,
  errorId,
  isInvalid,
  onChange,
}: {
  label: string
  value: string
  errorId?: string
  isInvalid?: boolean
  onChange: (value: string) => void
}) {
  return (
    <div className="contract-date-input">
      <input
        type="date"
        aria-label={label}
        aria-invalid={isInvalid}
        aria-describedby={errorId}
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
  errorMessage,
  onStartDateChange,
  onEndDateChange,
}: DateRangeFieldProps) {
  const errorId = errorMessage ? "date-range-error" : undefined

  return (
    <fieldset className="contract-field">
      <legend>{label}</legend>
      <div className="contract-range contract-date-range">
        <DateInput
          label={startLabel}
          value={startDate}
          errorId={errorId}
          isInvalid={Boolean(errorMessage)}
          onChange={onStartDateChange}
        />
        <span aria-hidden="true">~</span>
        <DateInput
          label={endLabel}
          value={endDate}
          errorId={errorId}
          isInvalid={Boolean(errorMessage)}
          onChange={onEndDateChange}
        />
      </div>
      {errorMessage && (
        <p id={errorId} className="contract-field-error" role="alert">
          {errorMessage}
        </p>
      )}
    </fieldset>
  )
}
