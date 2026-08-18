import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import {
  fetchDatabaseTime,
  type DatabaseTime,
} from "@/components/suyeong/config/database-time"

const DatabaseTimeContext = createContext<DatabaseTime | null>(null)

interface DatabaseTimeProviderProps {
  children: ReactNode
}

export function DatabaseTimeProvider({ children }: DatabaseTimeProviderProps) {
  const [databaseTime, setDatabaseTime] = useState<DatabaseTime | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    fetchDatabaseTime(controller.signal)
      .then(setDatabaseTime)
      .catch((reason: unknown) => {
        if (controller.signal.aborted) return
        setError(reason instanceof Error ? reason.message : "DB 서버 시간을 불러오지 못했습니다.")
      })

    return () => controller.abort()
  }, [])

  if (error) {
    return <div className="sy-route-loading" role="alert">{error}</div>
  }

  if (!databaseTime) {
    return <div className="sy-route-loading" role="status">기준일을 불러오는 중입니다.</div>
  }

  return (
    <DatabaseTimeContext.Provider value={databaseTime}>
      {children}
    </DatabaseTimeContext.Provider>
  )
}

export function useDatabaseTime() {
  const databaseTime = useContext(DatabaseTimeContext)
  if (!databaseTime) {
    throw new Error("useDatabaseTime은 DatabaseTimeProvider 안에서 사용해야 합니다.")
  }

  return databaseTime
}
