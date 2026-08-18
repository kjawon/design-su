/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DATABASE_TIME_SOURCE?: "mock" | "api"
  readonly VITE_DATABASE_TIME_ENDPOINT?: string
  readonly VITE_MOCK_DATABASE_DATE?: string
  readonly VITE_MOCK_DATABASE_DATE_TIME?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
