export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100">

      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow-sm">
        <h1 className="font-bold text-xl">EduPlatform</h1>
        <button className="text-blue-500 font-medium">Войти</button>
      </header>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-6">

        <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
          Онлайн обучение нового поколения
        </h2>

        <p className="text-gray-600 max-w-xl mb-6">
          Изучайте курсы, получайте сертификаты и развивайте навыки с помощью
          нашей интеллектуальной платформы.
        </p>

        <button className="bg-blue-500 hover:bg-blue-600 transition text-white px-6 py-3 rounded-xl shadow">
          Начать обучение
        </button>

        {/* Chatbot promo */}
        <div className="mt-10 bg-white p-6 rounded-2xl shadow max-w-md">
          <h3 className="font-semibold text-lg mb-2">
            💬 Умный чат-бот поддержки
          </h3>

          <p className="text-gray-600 text-sm">
            Задайте любой вопрос — бот поможет вам 24/7:
          </p>

          <ul className="text-sm text-gray-700 mt-3 space-y-1">
            <li>• Как зарегистрироваться?</li>
            <li>• Как оплатить курс?</li>
            <li>• Как получить сертификат?</li>
          </ul>
        </div>
      </section>

      <footer className="text-center text-sm text-gray-500 py-4">
        © 2026 EduPlatform
      </footer>
    </div>
  )
}