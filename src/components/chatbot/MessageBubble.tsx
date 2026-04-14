export default function MessageBubble({
  message,
  isGrouped,
}: {
  message: any
  isGrouped?: boolean
}) {
  const isUser = message.sender === "user"

  return (
    <div className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}>

      {/* Avatar */}
      {!isUser && !isGrouped && (
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white text-sm shadow">
          🤖
        </div>
      )}

      <div
        className={`
          px-4 py-2
          rounded-2xl
          text-sm
          max-w-[75%]
          whitespace-pre-line
          transition-all
          ${
            isUser
              ? "bg-blue-600 text-white rounded-br-md shadow-md"
              : "bg-white text-gray-800 border shadow-sm"
          }
          ${isGrouped ? "ml-10" : ""}
        `}
      >
        {message.text}
      </div>

      {/* User Avatar */}
      {isUser && !isGrouped && (
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-300 text-gray-700 text-sm">
          👤
        </div>
      )}
    </div>
  )
}