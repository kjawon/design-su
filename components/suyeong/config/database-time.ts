export interface DatabaseTime {
  currentDate: string
  currentDateTime: string
  source: "database"
}

const DATABASE_DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/
const DATABASE_DATE_TIME_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/

const databaseTimeSource = import.meta.env.VITE_DATABASE_TIME_SOURCE ?? "mock"
const databaseTimeEndpoint = import.meta.env.VITE_DATABASE_TIME_ENDPOINT ?? "/api/system/database-time"

const mockDatabaseTime: DatabaseTime = {
  currentDate: import.meta.env.VITE_MOCK_DATABASE_DATE ?? "2026-08-11",
  currentDateTime:
    import.meta.env.VITE_MOCK_DATABASE_DATE_TIME ?? "2026-08-11T00:00:00+09:00",
  source: "database",
}

function validateDatabaseTime(value: unknown): DatabaseTime {
  if (!value || typeof value !== "object") {
    throw new Error("DB 서버 시간 응답 형식이 올바르지 않습니다.")
  }

  const response = value as Partial<DatabaseTime>
  if (
    typeof response.currentDate !== "string" ||
    !DATABASE_DATE_PATTERN.test(response.currentDate) ||
    typeof response.currentDateTime !== "string" ||
    !DATABASE_DATE_TIME_PATTERN.test(response.currentDateTime)
  ) {
    throw new Error("DB 서버 시간 응답에 유효한 날짜가 없습니다.")
  }

  return {
    currentDate: response.currentDate,
    currentDateTime: response.currentDateTime,
    source: "database",
  }
}

export async function fetchDatabaseTime(signal?: AbortSignal): Promise<DatabaseTime> {
  if (databaseTimeSource === "mock") {
    return validateDatabaseTime(mockDatabaseTime)
  }

  if (databaseTimeSource !== "api") {
    throw new Error(`지원하지 않는 DB 시간 공급 방식입니다: ${databaseTimeSource}`)
  }

  const response = await fetch(databaseTimeEndpoint, {
    headers: { Accept: "application/json" },
    signal,
  })

  if (!response.ok) {
    throw new Error(`DB 서버 시간을 불러오지 못했습니다. (${response.status})`)
  }

  return validateDatabaseTime(await response.json())
}
