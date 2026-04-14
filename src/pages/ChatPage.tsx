import { useState } from "react"
import ChatWindow from "../components/chatbot/ChatWindow"
import ChatInput from "../components/chatbot/ChatInput"
import { sendMessage } from "../services/api"
import type { Message } from "../types/chat"

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSend = async (text: string) => {
    const userMessage: Message = {
      id: Date.now(),
      text,
      sender: "user",
    }

    setMessages((prev) => [...prev, userMessage])
    setLoading(true)
    setError(null)

    try {
      const res = await sendMessage(text)

      const botMessage: Message = {
        id: Date.now() + 1,
        text: res.response,
        sender: "bot",
      }

      setMessages((prev) => [...prev, botMessage])
    } catch (err) {
      setError("Ошибка соединения с сервером")

      const errorMessage: Message = {
        id: Date.now() + 2,
        text: "Произошла ошибка. Попробуйте позже.",
        sender: "bot",
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <ChatWindow messages={messages} loading={loading} />
      
      {error && (
        <div className="text-red-500 text-center text-sm py-2">
          {error}
        </div>
      )}

      <ChatInput onSend={handleSend} disabled={loading} />
    </div>
  )
}