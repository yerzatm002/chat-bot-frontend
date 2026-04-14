import MessageBubble from "./MessageBubble"
import type { Message } from "../../types/chat"

type Props = {
  messages: Message[]
}

export default function MessageList({ messages }: Props) {
  return (
    <div className="flex flex-col gap-3">

      {messages.map((msg, index) => {
        const prev = messages[index - 1]

        const isSameSender = prev && prev.sender === msg.sender

        return (
          <div
            key={msg.id}
            className={`
              animate-[fadeIn_.2s_ease]
              ${isSameSender ? "mt-[-6px]" : "mt-2"}
            `}
          >
            <MessageBubble
              message={msg}
              isGrouped={isSameSender}
            />
          </div>
        )
      })}

    </div>
  )
}