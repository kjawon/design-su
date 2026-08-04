"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"
import { RefreshCw, Send, Sparkles, X } from "lucide-react"
import contractDoctorImage from "@/계약박사 리뉴얼.png"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const suggestions = ["최근 3개월 최대 금액 계약은?", "올해 1억원 이상 수의계약 알려줘", "작년 최대 공사 계약은?"]
type Message = { role: "user" | "assistant"; content: string }

export function Chatbot({ windowMode = false }: { windowMode?: boolean }) {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const messageListRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const messageList = messageListRef.current
    if (!messageList || messages.length === 0) return

    const animationFrame = window.requestAnimationFrame(() => {
      messageList.scrollTo({
        top: messageList.scrollHeight,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "auto"
          : "smooth",
      })
    })

    return () => window.cancelAnimationFrame(animationFrame)
  }, [messages])

  useEffect(() => {
    if (windowMode) {
      document.title = "AI 계약박사"
      return
    }

    const openAssistant = () => {
      const width = Math.min(480, window.screen.availWidth - 24)
      const height = Math.min(760, window.screen.availHeight - 48)
      const currentScreen = window.screen as Screen & { availLeft?: number; availTop?: number }
      const left = (currentScreen.availLeft ?? 0) + (currentScreen.availWidth - width) / 2
      const top = (currentScreen.availTop ?? 0) + (currentScreen.availHeight - height) / 2
      const url = new URL(window.location.href)
      url.searchParams.set("chatbot", "popup")
      url.hash = ""

      const popup = window.open(
        url.toString(),
        "ai-contract-doctor",
        `popup=yes,width=${Math.round(width)},height=${Math.round(height)},left=${Math.round(left)},top=${Math.round(top)},resizable=yes,scrollbars=yes`,
      )
      popup?.focus()
    }

    window.addEventListener("open-contract-assistant", openAssistant)
    return () => window.removeEventListener("open-contract-assistant", openAssistant)
  }, [windowMode])

  const send = (text: string) => {
    if (!text.trim()) return
    setMessages((current) => [
      ...current,
      { role: "user", content: text },
      { role: "assistant", content: `“${text}”에 대한 계약정보를 확인했어요. 현재 MVP에서는 예시 응답을 제공하며, 정식 서비스에서 공고·부서·금액 조건을 종합해 상세 결과를 안내해 드립니다.` },
    ])
    setInput("")
  }

  const submit = (event: FormEvent) => {
    event.preventDefault()
    send(input)
  }

  if (!windowMode) return null

  return (
    <main className="flex h-dvh w-full flex-col overflow-hidden bg-section text-text-primary">
      <header className="brand-chatbot-header border-b border-ai-primary px-[16px] py-[12px] text-primary-foreground sm:px-5 sm:py-4">
        <div className="flex items-center gap-[10px]">
          <span className="flex size-[48px] shrink-0 items-center justify-center overflow-hidden rounded-xl border border-primary-foreground/30 bg-card">
            <img src={contractDoctorImage} alt="AI 계약박사 로고" className="size-full object-contain" />
          </span>
          <div className="min-w-0">
            <h1 className="whitespace-nowrap text-[18px] font-bold leading-tight text-primary-foreground">AI 계약박사</h1>
            <p className="mt-1 flex items-center gap-1.5 whitespace-nowrap text-[11px] leading-tight text-primary-foreground/75">
              <span className="size-1.5 rounded-full bg-success" />AI 계약정보 상담 · 온라인
            </p>
          </div>
          <Button variant="ghost" size="icon-sm" aria-label="대화 새로고침" className="ml-auto size-[32px] text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" onClick={() => setMessages([])}>
            <RefreshCw />
          </Button>
          <Button variant="ghost" size="icon-sm" aria-label="AI 계약박사 창 닫기" className="size-[32px] text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground" onClick={() => window.close()}>
            <X />
          </Button>
        </div>
      </header>

      <div
        ref={messageListRef}
        className="flex min-h-0 flex-1 flex-col overflow-y-auto p-[16px] sm:p-5"
        aria-live="polite"
      >
        {messages.length === 0 ? (
          <div className="my-auto flex flex-col items-center gap-[18px] py-[24px] text-center sm:gap-5 sm:py-8">
            <span className="flex size-[64px] items-center justify-center rounded-2xl bg-ai-light text-ai-primary">
              <Sparkles className="size-[28px]" />
            </span>
            <div>
              <h2 className="whitespace-nowrap text-[26px] font-bold leading-tight text-text-primary sm:text-2xl">무엇을 찾아드릴까요?</h2>
              <p className="mt-[12px] text-[14px] leading-relaxed text-text-secondary sm:text-sm">
                찾고 있는 계약정보를 자연스럽게 질문하세요.<br />
                계약명, 계약업체, 계약금액 등 모든 조건이 가능합니다.
              </p>
            </div>
            <div className="flex w-full flex-col gap-[8px]">
              {suggestions.map((question) => (
                <button key={question} onClick={() => send(question)} className="rounded-xl border border-border bg-card px-[14px] py-[10px] text-left text-[14px] text-text-primary transition-colors hover:border-ai-secondary hover:bg-ai-light sm:px-4 sm:py-3 sm:text-sm">
                  {question}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={message.role === "user" ? "ml-10 self-end rounded-2xl rounded-br-md bg-ai-primary px-4 py-3 text-[14px] leading-relaxed text-primary-foreground sm:text-sm" : "mr-10 self-start rounded-2xl rounded-bl-md border border-border bg-card px-4 py-3 text-[14px] leading-relaxed text-text-primary sm:text-sm"}>
                {message.content}
              </div>
            ))}
          </div>
        )}
      </div>

      <form autoComplete="off" onSubmit={submit} className="border-t border-border bg-card px-[12px] py-[10px] sm:p-4">
        <div aria-hidden="true" className="pointer-events-none absolute size-px overflow-hidden opacity-0">
          <input type="text" name="contract-chat-fake-username" autoComplete="username" tabIndex={-1} />
          <input type="password" name="contract-chat-fake-password" autoComplete="new-password" tabIndex={-1} />
        </div>
        <div className="flex items-center gap-[10px] rounded-xl border border-border bg-card p-[5px] transition-all focus-within:border-purple-primary focus-within:ring-2 focus-within:ring-purple-primary/30">
          <Input
            ref={inputRef}
            id="ai-contract-doctor-message-input"
            name="contract-chat-message-no-history"
            type="text"
            value={input}
            autoComplete="new-password"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey && (event.nativeEvent.isComposing || event.keyCode === 229)) event.preventDefault() }}
            placeholder="메시지를 입력하세요..."
            aria-label="AI 도우미 메시지"
            className="h-[40px] border-0 px-[8px] text-[15px] shadow-none focus-visible:ring-0 sm:text-sm"
          />
          <Button type="submit" size="icon" aria-label="메시지 전송" className="ai-action size-[40px]"><Send /></Button>
        </div>
        <p className="mt-[6px] text-center text-[10px] text-text-muted sm:text-[11px]">AI 답변은 실제 계약 데이터와 다를 수 있습니다.</p>
      </form>
    </main>
  )
}
