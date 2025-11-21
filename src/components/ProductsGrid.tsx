"use client";

import { useState } from "react";
import Link from "next/link";

interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number | null;
  image: string;
  description: string;
  sizes?: string[];
  colors: string[];
  inStock: boolean;
}
interface ProductsGridProps {
  products: Product[];
  category: string;
}

export default function ProductsGrid({
  products,
  category,
}: ProductsGridProps) {
  const [addingProductId, setAddingProductId] = useState<string | null>(null);

  const handleAddToCart = async (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setAddingProductId(product.id);

    // Симуляция добавления в корзину
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Додано в кошик:", product.name);

    setAddingProductId(null);
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">📦</div>
        <p className="text-gray-500 text-lg mb-4">Товари не знайдено</p>
        <p className="text-gray-400 text-sm">Спробуйте змінити фільтри</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="group bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
        >
          <Link href={`/${category}/${product.slug}`} className="block">
            {/* Изображение товара */}
            <div className="aspect-square bg-gray-100 relative overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                <span className="text-gray-500 text-sm">Зображення товару</span>
              </div>

              {/* Бейдж скидки */}
              {product.originalPrice && (
                <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
                  -
                  {Math.round(
                    (1 - product.price / product.originalPrice) * 100
                  )}
                  %
                </div>
              )}

              {/* Бейдж отсутствия */}
              {!product.inStock && (
                <div className="absolute top-3 left-3 bg-gray-500 text-white px-2 py-1 rounded text-xs font-medium">
                  Немає в наявності
                </div>
              )}
            </div>

            {/* Информация о товаре */}
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-pink-600 transition-colors">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                {product.description}
              </p>

              {/* Цена */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-gray-900">
                  {product.price} грн
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {product.originalPrice} грн
                  </span>
                )}
              </div>

              {/* Размеры */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="flex gap-1 mb-3">
                  {product.sizes.slice(0, 4).map((size) => (
                    <span
                      key={size}
                      className="text-xs bg-gray-100 px-2 py-1 rounded"
                    >
                      {size}
                    </span>
                  ))}
                  {product.sizes.length > 4 && (
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      +{product.sizes.length - 4}
                    </span>
                  )}
                </div>
              )}
            </div>
          </Link>

          {/* Кнопка добавления в корзину */}
          <div className="p-4 pt-0">
            <button
              onClick={(e) => handleAddToCart(product, e)}
              disabled={!product.inStock || addingProductId === product.id}
              className={`w-full py-2 rounded text-sm font-medium transition-colors ${
                product.inStock
                  ? "bg-black text-white hover:bg-gray-800"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              } ${addingProductId === product.id ? "opacity-50" : ""}`}
            >
              {addingProductId === product.id
                ? "Додається..."
                : product.inStock
                ? "Додати в кошик"
                : "Немає в наявності"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
