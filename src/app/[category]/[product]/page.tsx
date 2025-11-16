import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  fullDescription: string;
  features: string[];
  sizes: string[];
  colors: string[];
  category: string;
  inStock: boolean;
}

interface ProductPageProps {
  params: {
    category: string;
    product: string;
  };
}

const products: Record<string, Product> = {
  'komplekt-iz-sribnymy-lantsyzhkamy': {
    id: '1',
    slug: 'komplekt-iz-sribnymy-lantsyzhkamy',
    name: 'Комплект із срібними ланцюжками',
    price: 675,
    originalPrice: 850,
    images: ['/images/chain-set-1.jpg', '/images/chain-set-2.jpg', '/images/chain-set-3.jpg'],
    description: 'Елегантний комплект білизни із срібними ланцюжками',
    fullDescription: 'Цей елегантний комплект білизни виготовлений з високоякісних матеріалів.',
    features: ['Високоякісний матеріал', 'Срібні ланцюжки', 'Комфортна посадка'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Чорний', 'Бордовий', 'Ніжний рожевий'],
    category: 'rozprodazh',
    inStock: true
  },
  'bazovi-trusyky': {
    id: '4',
    slug: 'bazovi-trusyky',
    name: 'Базові трусики',
    price: 150,
    images: ['/images/basic-panties.jpg'],
    description: 'Зручні базові трусики для щоденного носіння',
    fullDescription: 'Комфортні базові трусики із якісного бавовняного матеріалу.',
    features: ['100% бавовна', 'Комфортна посадка', 'Мягкий матеріал'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Чорний', 'Білий', 'Тілесний'],
    category: 'trusyky',
    inStock: true
  },
};

const categoryNames: Record<string, string> = {
  'rozprodazh': 'РОЗПРОДАЖ',
  'trusyky': 'Трусики',
  'topy-ta-biusthaltery': 'Топи та бюстгальтери',
  // ... другие категории
};

export default function ProductPage({ params }: ProductPageProps) {
  const { category, product } = params;
  const productData = products[product];
  const categoryName = categoryNames[category];

  if (!productData || productData.category !== category) {
    notFound();
  }

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
            <Link href={`/${category}`} className="text-gray-500 hover:text-gray-700">
              {categoryName}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{productData.name}</span>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Галерея изображений */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-gray-500">Головне зображення</span>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-2">
              {productData.images.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square bg-gray-100 rounded cursor-pointer hover:opacity-80 transition-opacity overflow-hidden"
                >
                  <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                    <span className="text-xs text-gray-600">{index + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Информация о товаре */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {productData.name}
              </h1>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-bold text-gray-900">
                  {productData.price} грн
                </span>
                {productData.originalPrice && (
                  <>
                    <span className="text-lg text-gray-500 line-through">
                      {productData.originalPrice} грн
                    </span>
                    <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                      -{Math.round((1 - productData.price / productData.originalPrice) * 100)}%
                    </span>
                  </>
                )}
              </div>
              <p className="text-gray-600 text-lg">
                {productData.description}
              </p>
            </div>

            {/* ... остальной код страницы товара ... */}
          </div>
        </div>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  return Object.entries(products).map(([slug, product]) => ({
    category: product.category,
    product: slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { category, product } = params;
  const productData = products[product];
  const categoryName = categoryNames[category];
  
  if (!productData) {
    return {
      title: 'Товар не знайдено | DABI',
    };
  }

  return {
    title: `${productData.name} | ${categoryName} | DABI`,
    description: productData.description,
  };
}