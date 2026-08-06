const DISABLED_FLAG_VALUES = new Set(["0", "false", "off", "no"])

function isFeatureEnabled(value: string | undefined, defaultValue: boolean) {
  if (value === undefined || value.trim() === "") return defaultValue
  return !DISABLED_FLAG_VALUES.has(value.trim().toLowerCase())
}

export const AI_CONTRACT_DOCTOR_ENABLED = isFeatureEnabled(
  import.meta.env.VITE_AI_CONTRACT_DOCTOR_ENABLED,
  true,
)
