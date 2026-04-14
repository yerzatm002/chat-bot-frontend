import { useState, useRef, useEffect } from "react"

export default function ChatInput({
  onSend,
  disabled,
}: {
  onSend: (text: string) => void
  disabled?: boolean
}) {
  const [text, setText] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // авто-рост textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"
    }
  }, [text])

  const handleSend = () => {
    if (!text.trim() || disabled) return
    onSend(text.trim())
    setText("")
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="p-3 bg-white border-t">
      <div className="flex items-end gap-2 bg-gray-100 rounded-2xl px-3 py-2 shadow-sm">

        {/* textarea */}
        <textarea
          ref={textareaRef}
          rows={1}
          disabled={disabled}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Напишите вопрос..."
          className="flex-1 resize-none bg-transparent outline-none text-sm max-h-32 disabled:opacity-50"
        />

        {/* send button */}
        <button
          onClick={handleSend}
          disabled={disabled || !text.trim()}
          className={`
            w-10 h-10 flex items-center justify-center rounded-full
            transition-all
            ${
              disabled || !text.trim()
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 text-white shadow"
            }
          `}
        >
          ➤
        </button>
      </div>

      {/* hint */}
      <div className="text-xs text-gray-400 mt-1 px-1">
        Enter — отправить, Shift+Enter — новая строка
      </div>
    </div>
  )
}