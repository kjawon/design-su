/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AI_CONTRACT_DOCTOR_ENABLED?: "on" | "off" | "true" | "false" | "1" | "0"
  readonly VITE_OWN_PROCUREMENT_PLAN_ENABLED?: "on" | "off" | "true" | "false" | "1" | "0"
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
