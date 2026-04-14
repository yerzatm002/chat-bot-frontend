import { useEffect, useRef } from "react"
import MessageList from "./MessageList"
import TypingIndicator from "./TypingIndicator"
import type { Message } from "../../types/chat"

type Props = {
  messages: Message[]
  loading: boolean
}

export default function ChatWindow({ messages, loading }: Props) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, loading])

  return (
    <div className="flex-1 overflow-y-auto px-3 py-4 bg-gradient-to-b from-gray-50 to-gray-100 space-y-3">
      {messages.length === 0 && (
        <div className="flex flex-col items-center justify-center mt-12 text-center text-gray-400 text-sm">
          <div className="text-3xl mb-2">💬</div>
          <p className="max-w-xs">
            Задайте любой вопрос — я помогу вам разобраться 👋
          </p>
        </div>
      )}

      <MessageList messages={messages} />
      {loading && <TypingIndicator />}
      <div ref={ref} />
    </div>
  )
}