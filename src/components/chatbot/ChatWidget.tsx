import { useState, useEffect } from "react"
import ChatWindow from "./ChatWindow"
import ChatInput from "./ChatInput"
import { sendMessage } from "../../services/api"

type Message = {
  id: number
  text: string
  sender: "user" | "bot"
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)

  // ✅ восстановление истории
  useEffect(() => {
    const saved = localStorage.getItem("chat_messages")

    if (saved) {
      setMessages(JSON.parse(saved))
    } else {
      // 👇 onboarding сообщение
      setMessages([
        {
          id: Date.now(),
          sender: "bot",
          text: "Привет 👋\nЯ чат-бот поддержки.\nЗадайте любой вопрос — я помогу вам 24/7.",
        },
      ])
    }
  }, [])

  // ✅ сохранение
  useEffect(() => {
    localStorage.setItem("chat_messages", JSON.stringify(messages))
  }, [messages])

  const handleSend = async (text: string) => {
    const userMsg: Message = {
      id: Date.now(),
      text,
      sender: "user",
    }

    setMessages((prev) => [...prev, userMsg])
    setLoading(true)

    try {
      const res = await sendMessage(text)

      const botMsg: Message = {
        id: Date.now() + 1,
        text: res.response,
        sender: "bot",
      }

      setMessages((prev) => [...prev, botMsg])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: "Ошибка соединения. Попробуйте позже.",
          sender: "bot",
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className="
          fixed bottom-6 right-6
          w-14 h-14
          rounded-full
          bg-gradient-to-r from-blue-500 to-blue-600
          text-white text-xl
          shadow-xl
          hover:scale-105 active:scale-95
          transition-all
        "
      >
        💬
      </button>

      {/* Chat Window */}
      {open && (
        <div
          className="
            fixed bottom-24 right-6
            w-[360px] h-[520px]
            bg-white
            rounded-2xl
            shadow-2xl
            flex flex-col
            overflow-hidden
            animate-[fadeIn_.2s_ease]
          "
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 flex justify-between items-center">
            <div>
              <div className="font-semibold">Онлайн поддержка</div>
              <div className="text-xs opacity-80">Ответим за секунды ⚡</div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="hover:opacity-80"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <ChatWindow messages={messages} loading={loading} />

          {/* Suggestions (только если 1 сообщение — onboarding) */}
          {messages.length <= 1 && (
            <div className="px-3 pb-2 flex flex-wrap gap-2">
              {[
                "Как зарегистрироваться?",
                "Как оплатить курс?",
                "Как получить сертификат?",
              ].map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="
                    text-xs
                    bg-gray-100
                    hover:bg-gray-200
                    px-3 py-1
                    rounded-full
                    transition
                  "
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <ChatInput onSend={handleSend} disabled={loading} />
        </div>
      )}
    </>
  )
}