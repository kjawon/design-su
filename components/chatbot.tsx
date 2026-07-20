"use client"

import { FormEvent, useEffect, useRef, useState } from "react"
import { Bot, Mic, RefreshCw, Send, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const suggestions = ["최근 3개월 성남시 최대 계약은?", "IT·정보화 사업 입찰 현황 알려줘", "2026년 정보화 분야 최대 규모 계약", "분당구 도시재생 관련 진행중인 사업"]
type Message = { role: "user" | "assistant"; content: string }

export function Chatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const openAssistant = () => setOpen(true)
    window.addEventListener("open-contract-assistant", openAssistant)
    return () => window.removeEventListener("open-contract-assistant", openAssistant)
  }, [])

  const send = (text: string) => {
    if (!text.trim()) return
    setMessages((current) => [...current, { role: "user", content: text }, { role: "assistant", content: `“${text}”에 대한 계약정보를 확인했어요. 현재 MVP에서는 예시 응답을 제공하며, 정식 서비스에서 공고·부서·금액 조건을 종합해 상세 결과를 안내해 드립니다.` }])
    setInput("")
  }
  const submit = (event: FormEvent) => { event.preventDefault(); send(input) }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button size="icon-lg" aria-label="AI 계약 도우미 열기" className="fixed bottom-6 right-6 size-14 rounded-full shadow-lg" />}><Bot /></SheetTrigger>
      <SheetContent side="right" className="w-full gap-0 sm:max-w-md" showCloseButton>
        <SheetHeader className="border-b px-5 py-4">
          <div className="flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground"><Bot className="size-5" /></span><div><SheetTitle className="font-bold">AI 계약 도우미</SheetTitle><SheetDescription className="mt-0.5 flex items-center gap-1.5 text-xs"><span className="size-1.5 rounded-full bg-accent-foreground" />Powered by Seongnam AI · 온라인</SheetDescription></div><Button variant="ghost" size="icon-sm" aria-label="대화 새로고침" className="ml-auto mr-8" onClick={() => setMessages([])}><RefreshCw /></Button></div>
        </SheetHeader>
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto p-5" aria-live="polite">
          {messages.length === 0 ? <div className="my-auto flex flex-col items-center gap-5 py-8 text-center"><span className="flex size-16 items-center justify-center rounded-2xl bg-accent text-primary"><Sparkles className="size-7" /></span><div><h2 className="text-2xl font-bold">무엇을 찾아드릴까요?</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">찾고 있는 계약정보를 자연어로 질문하세요.<br />공고, 낙찰, 부서, 금액 등 모든 조건이 가능합니다.</p></div><div className="flex w-full flex-col gap-2">{suggestions.map((question) => <button key={question} onClick={() => { send(question); inputRef.current?.focus() }} className="rounded-xl border bg-card px-4 py-3 text-left text-sm transition-colors hover:bg-muted">{question}</button>)}</div></div> : <div className="flex flex-col gap-4">{messages.map((message, index) => <div key={`${message.role}-${index}`} className={message.role === "user" ? "ml-10 self-end rounded-2xl rounded-br-md bg-primary px-4 py-3 text-sm leading-relaxed text-primary-foreground" : "mr-10 self-start rounded-2xl rounded-bl-md bg-muted px-4 py-3 text-sm leading-relaxed"}>{message.content}</div>)}</div>}
        </div>
        <form onSubmit={submit} className="border-t bg-background p-4"><div className="flex items-center gap-2 rounded-xl border bg-background p-1.5 focus-within:ring-2 focus-within:ring-ring"><Input ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey && (event.nativeEvent.isComposing || event.keyCode === 229)) event.preventDefault() }} placeholder="메시지를 입력하세요..." aria-label="AI 도우미 메시지" className="border-0 shadow-none focus-visible:ring-0" /><Button type="button" variant="ghost" size="icon" aria-label="음성 입력"><Mic /></Button><Button type="submit" size="icon" aria-label="메시지 전송"><Send /></Button></div><p className="mt-2 text-center text-[11px] text-muted-foreground">AI 답변은 실제 계약 데이터와 다를 수 있습니다.</p></form>
      </SheetContent>
    </Sheet>
  )
}
