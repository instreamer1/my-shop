"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import ProductsGrid from "@/src/components/ProductsGrid";
import CategoryControls from "@/src/components/CategoryControls";
import CategoryFilters from "@/src/components/CategoryFilters";
import NotFound from "../not-found";

// Определяем, какие категории существуют
const validCategories = ["trusyky", "topy", "rozprodazh"];

// Данные товаров (в реальности из API или базы данных)

const categoryData = {
  name: "Трусики",
  description:
    "Широкий вибір трусиків для щоденного носіння та особливих моментів",
  products: [
    {
      id: "1",
      slug: "bazovi-trusyky",
      name: "Базові трусики",
      price: 150,
      originalPrice: null,
      image: "/images/basic-panties.jpg",
      description: "Комфортні базові трусики з якісної бавовни",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Чорний", "Білий", "Тілесний"],
      inStock: true,
    },
    {
      id: "2",
      slug: "trusyky-z-merezhva",
      name: "Трусики з мережива",
      price: 220,
      originalPrice: 280,
      image: "/images/lace-panties.jpg",
      description: "Елегантні трусики з ніжним мереживом",
      sizes: ["S", "M", "L"],
      colors: ["Чорний", "Бордовий", "Білий"],
      inStock: true,
    },
    // ... другие товары
  ],
  filters: {
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Чорний", "Білий", "Тілесний", "Рожевий", "Червоний"],
    priceRange: { min: 100, max: 500 },
  },
};

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

// const filtersData = {
//   sizes: ['XS', 'S', 'M', 'L', 'XL'],
//   colors: ['Чорний', 'Білий', 'Тілесний', 'Рожевий', 'Червоний'],
//   priceRange: { min: 100, max: 500 }
// };

export default function CategoryPage({ params }: CategoryPageProps) {
  const { category } = use(params);
  
  console.log(category);
  // В реальном приложении здесь будет запрос к API
  const products = categoryData.products;
  const filter = categoryData.filters;

  
  const [filters, setFilters] = useState({
    sizes: [] as string[],
    colors: [] as string[],
    price: filter.priceRange.max,
  });

  const [sortBy, setSortBy] = useState("popular");

  const categoryNames: Record<string, string> = {
    trusyky: "Трусики",
    rozprodazh: "РОЗПРОДАЖ",
    "topy-ta-biusthaltery": "Топи та бюстгальтери",
  };

  const categoryName = categoryNames[category];

  if (!categoryName) {
    NotFound();
  }



  // Фильтрация товаров
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Фильтр по размеру
    if (filters.sizes.length > 0) {
      filtered = filtered.filter(product => 
        product.sizes?.some(size => filters.sizes.includes(size))
      );
    }

    // Фильтр по цвету
    if (filters.colors.length > 0) {
      filtered = filtered.filter(product => 
        filters.colors.includes(product.colors)
      );
    }

    // Фильтр по цене
    filtered = filtered.filter(product => 
      product.price <= filters.price
    );

    // Сортировка
    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        // Здесь можно добавить логику для новинок
        break;
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // popular - оставляем как есть
        break;
    }

    return filtered;
  }, [products, filters, sortBy]);

  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleSortChange = (newSortBy: string) => {
    setSortBy(newSortBy);
  };

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
            <Link href="/catalog" className="text-gray-500 hover:text-gray-700">
             Каталог товарів
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{categoryName}</span>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {/* Заголовок категории */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {categoryName}
          </h1>
          <p className="text-gray-600">
            Широкий вибір якісної білизни для кожного дня
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Боковая панель с фильтрами */}
          <aside className="lg:w-1/4">
            <CategoryFilters
              sizes={filters.sizes}
              colors={filters.colors}
              priceRange={filter.priceRange}
              onFiltersChange={handleFiltersChange}
            />
          </aside>

          {/* Основной контент */}
          <div className="lg:w-3/4">
            {/* Панель управления */}
            <CategoryControls
              productsCount={products.length}
              onSortChange={handleSortChange}
            />

            {/* Сетка товаров */}
            <div className="mt-6">
              <ProductsGrid products={products} category={category} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
// export default function CategoryPage({
//   params,
// }: {
//   params: { category: string };
// }) {
// const { category } = params;

// console.log(params);

// Если категория невалидна, показываем 404
// if (!validCategories.includes(category)) {
//   notFound()
// }

//   const categoryProducts = categoryData.products || [];

//   return (
//     <div>
//       <h1>Категория: {categoryData.name}</h1>
//       <div className="products-grid">
//         {categoryProducts.map((product) => (
//           <div key={product.id} className="product-card">
//             <h3>{product.name}</h3>
//             <p>{product.price} грн</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// // Для статической генерации: предопределяем параметры
// export async function generateStaticParams() {
//   return validCategories.map((category) => ({
//     category,
//   }));
// }
