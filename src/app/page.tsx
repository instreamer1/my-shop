import Benefits from "../components/Benefits";

import PromoBlocks from "../components/PromoBlocks";
import Hero from "../components/Hero";
export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Hero />
        <Benefits />
        <PromoBlocks />
        <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Tailwind CSS v4 работает!</h1>
          <p className="text-blue-100">
            Если вы видите стилизованный блок, значит всё настроено правильно.
          </p>
          <button className="mt-4 bg-white text-blue-600 px-4 py-2 rounded font-semibold hover:bg-gray-100 transition-colors">
            Тестовая кнопка
          </button>
        </div>
      </main>
    </div>
  );
}
