import { CATALOG_ITEMS } from '@/src/constants/menu-data';
import Link from 'next/link'

const categories = [
  {
    slug: 'rozprodazh',
    name: 'РОЗПРОДАЖ',
    description: 'Товари зі знижкою до -70%',
    image: '/images/sale.jpg',
    count: 23,
    href: "rozprodazh",
  },
  {
    slug: 'trusyky',
    name: 'Трусики',
    description: 'Базові та дизайнерські моделі',
    image: '/images/panties.jpg',
    count: 45,
    href: "trusyky",
  },
  {
    slug: 'topy-ta-biusthaltery',
    name: 'Топи та бюстгальтери',
    description: 'Для щодня та особливих моментів',
    image: '/images/tops.jpg',
    count: 67,
     href: "topy-ta-biusthaltery",

  },
  // ... другие категории
];

export default function Catalog() {
  return (
    <div className="min-h-screen bg-white">
      {/* Хлебные крошки */}
      <nav className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Головна
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">Каталог товарів</span>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {/* Заголовок и описание */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Каталог товарів</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Великий вибір якісної білизни для кожного дня та особливих моментів
          </p>
        </div>

        {/* Поиск и фильтры */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <div className="flex-1 max-w-md">
              <input
                type="text"
                placeholder="Пошук товарів..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent"
              />
            </div>
            <div className="flex gap-4">
              <select className="border border-gray-300 rounded px-3 py-2 text-sm">
                <option>Сортувати за</option>
                <option>Ціна: від низької</option>
                <option>Ціна: від високої</option>
                <option>Новинки</option>
              </select>
            </div>
          </div>
        </div>

        {/* Сетка категорий */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/${category.href}`}
              className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              {/* Изображение категории */}
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                <div className="w-full h-full flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <span className="text-gray-400">Зображення {category.label}</span>
                </div>
                
                {/* Бейдж количества */}
                <div className="absolute top-4 right-4 bg-white bg-opacity-90 px-3 py-1 rounded-full text-sm font-medium">
                  {category.slug} товарів
                </div>
              </div>

              {/* Информация о категории */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {category.description}
                </p>
                <div className="flex items-center text-pink-600 font-medium">
                  <span>Переглянути</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}