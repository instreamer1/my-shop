import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  description?: string;
  category: string;
}

interface CategoryPageProps {
  params: {
    category: string;
  };
}

const categoryNames: Record<string, string> = {
  'rozprodazh': 'РОЗПРОДАЖ',
  'trusyky': 'Трусики',
  'topy-ta-biusthaltery': 'Топи та бюстгальтери',
  'bazovi-komplekty': 'Базові комплекти',
  'komplekty-iz-sitochky-ta-merezhvy': 'Комплекти із сіточки та мережива',
  'losyny-kolhoty-shkarpetky': 'Лосини, колготи, шкарпетки',
  'pizhamy-ta-khalaty': 'Піжами та халати',
  'kupalnyky-ta-pareo': 'Купальники та парео',
  'bodi': 'Боді',
  'harterny-ta-panchokhy': 'Гартери та панчохи',
  'cholovikam': 'Чоловікам',
  'inshe': 'Інше',
};

const products: Product[] = [
  {
    id: '1',
    slug: 'komplekt-iz-sribnymy-lantsyzhkamy',
    name: 'Комплект із срібними ланцюжками',
    price: 675,
    image: '/images/chain-set.jpg',
    description: 'Елегантний комплект із срібними ланцюжками',
    category: 'rozprodazh'
  },
  {
    id: '2',
    slug: 'komplekt-iz-sitochky-leopard',
    name: 'Комплект із сіточки в леопардовий принт',
    price: 545,
    image: '/images/leopard-set.jpg',
    description: 'Сміливий комплект у леопардовому принті',
    category: 'rozprodazh'
  },
  {
    id: '3',
    slug: 'komplekt-iz-sitochky-regulyatory',
    name: 'Комплект із сіточки з трусиками на регуляторах',
    price: 545,
    image: '/images/adjustable-set.jpg',
    description: 'Зручний комплект з регульованими трусиками',
    category: 'rozprodazh'
  },
  {
    id: '4',
    slug: 'bazovi-trusyky',
    name: 'Базові трусики',
    price: 150,
    image: '/images/basic-panties.jpg',
    category: 'trusyky'
  },
  {
    id: '5',
    slug: 'trusyky-z-merezhva',
    name: 'Трусики з мережива',
    price: 220,
    image: '/images/lace-panties.jpg',
    category: 'trusyky'
  },
];

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = params;
  const categoryName = categoryNames[category];
  
  if (!categoryName) {
    notFound();
  }

  const categoryProducts = products.filter(product => product.category === category);

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
            <span className="text-gray-900 font-medium">{categoryName}</span>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{categoryName}</h1>
          <p className="text-gray-600">
            Знайдено {categoryProducts.length} товарів
          </p>
        </div>

        {/* Панель фильтров */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
          <div className="flex flex-wrap gap-4">
            <select className="border border-gray-300 rounded px-3 py-2 text-sm bg-white">
              <option>Сортувати за</option>
              <option>Ціна: від низької до високої</option>
              <option>Ціна: від високої до низької</option>
              <option>Новинки</option>
            </select>
          </div>
        </div>

        {/* Сетка товаров */}
        {categoryProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categoryProducts.map((product) => (
              <Link
                key={product.id}
                href={`/${category}/${product.slug}`}
                className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
              >
                <div className="aspect-square bg-gray-100 relative overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                    <span className="text-gray-500 text-sm">Зображення товару</span>
                  </div>
                  {category === 'rozprodazh' && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                      РОЗПРОДАЖ
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  {product.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description}
                    </p>
                  )}
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">
                      {product.price} грн
                    </span>
                    <button 
                      onClick={(e) => e.preventDefault()}
                      className="bg-black text-white px-4 py-2 rounded text-sm hover:bg-gray-800 transition-colors"
                    >
                      Купити
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <p className="text-gray-500 text-lg mb-4">Товари в цій категорії скоро з'являться</p>
            <Link 
              href="/"
              className="inline-block bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition-colors"
            >
              Повернутися на головну
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(categoryNames).map((category) => ({
    category,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = params;
  const categoryName = categoryNames[category];
  
  return {
    title: `${categoryName} | DABI`,
    description: `Купити ${categoryName.toLowerCase()} в інтернет-магазині DABI. Висока якість, доступні ціни, швидка доставка.`,
  };
}