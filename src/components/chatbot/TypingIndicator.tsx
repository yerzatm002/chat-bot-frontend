export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 text-gray-400 text-sm px-2">
      <div className="w-8 h-8 flex items-center justify-center rounded-full bg-blue-500 text-white">
        🤖
      </div>

      <div className="flex gap-1">
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
      </div>
    </div>
  )
}