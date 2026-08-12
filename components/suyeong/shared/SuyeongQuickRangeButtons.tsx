import { CalendarDays } from "lucide-react"

interface QuickRangeOption<Value extends string | number> {
  label: string
  value: Value
}

interface SuyeongQuickRangeButtonsProps<Value extends string | number> {
  options: readonly QuickRangeOption<Value>[]
  onSelect: (value: Value) => void
}

export function SuyeongQuickRangeButtons<Value extends string | number>({
  options,
  onSelect,
}: SuyeongQuickRangeButtonsProps<Value>) {
  return (
    <div className="sy-quick-range" data-count={options.length} aria-label="간편 기간 선택">
      {options.map((option) => (
        <button key={option.value} type="button" onClick={() => onSelect(option.value)}>
          <CalendarDays aria-hidden="true" />
          {option.label}
        </button>
      ))}
    </div>
  )
}
