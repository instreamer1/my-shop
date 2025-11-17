"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { use, useState } from "react";

// Данные будут приходить из API/БД
const productData = {
  id: "1",
  slug: "bazovi-trusyky",
  name: "Базові трусики",
  price: 150,
  originalPrice: null,
  images: [
    "/images/product-1-1.jpg",
    "/images/product-1-2.jpg",
    "/images/product-1-3.jpg",
    "/images/product-1-1.jpg",
    "/images/product-1-2.jpg",
    "/images/product-1-3.jpg",
    "/images/product-1-4.jpg",
  ],
  description: "Комфортні базові трусики для щоденного носіння",
  fullDescription:
    "Ці базові трусики виготовлені з високоякісної бавовни, що забезпечує максимальний комфорт та дихання шкіри. Ідеально підходять для щоденного носіння під будь-який одяг. Еластичний пояс не залишає відбитків на шкірі, а мʼяка тканина забезпечує приємні відчуття протягом усього дня.",
  features: [
    "100% якісна бавовна",
    "Мʼяка та дихаюча тканина",
    "Еластичний пояс",
    "Комфортна посадка",
    "Гіпоалергенний матеріал",
  ],
  sizes: [
    { size: "S", inStock: true },
    { size: "M", inStock: true },
    { size: "L", inStock: false },
    { size: "XL", inStock: true },
  ],
  colors: [
    { name: "Чорний", value: "#000000", inStock: true },
    { name: "Білий", value: "#FFFFFF", inStock: true },
    { name: "Тілесний", value: "#F5E1C8", inStock: true },
    { name: "Бордовий", value: "#800020", inStock: false },
  ],
  category: "trusyky",
  inStock: true,
  sku: "TRU-BAS-001",
  tags: ["базові", "бавовна", "щоденні", "комфорт"],
  reviews: {
    average: 4.5,
    count: 24,
  },
};

export default function ProductPage({
  params,
}: {
  params: { category: string; product: string };
}) {
  const { category, product } = use(params);

  // В реальном приложении здесь будет запрос к API
  if (product !== productData.slug || category !== productData.category) {
    notFound();
  }

  const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
  const [selectedSize, setSelectedSize] = useState(productData.sizes[0]);
  const [selectedImage, setSelectedImage] = useState(0);

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
            <Link href="/shop" className="text-gray-500 hover:text-gray-700">
              Магазин
            </Link>
            <span className="text-gray-400">/</span>
            <Link
              href={`/${category}`}
              className="text-gray-500 hover:text-gray-700"
            >
              {productData.category === "trusyky" ? "Трусики" : "Категорія"}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">
              {productData.name}
            </span>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Галерея изображений */}
          <div className="space-y-4">
            {/* Главное изображение */}
            <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
              <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                <span className="text-gray-500">Головне зображення товару</span>
              </div>
            </div>

            {/* Миниатюры */}
            <div className="grid grid-cols-4 gap-3">
              {productData.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-100 rounded-xl overflow-hidden border-2 ${
                    selectedImage === index
                      ? "border-black"
                      : "border-transparent"
                  }`}
                >
                  <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                    <span className="text-xs text-gray-600">{index + 1}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Информация о товаре */}
          <div className="space-y-6">
            {/* Заголовок и цена */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {productData.name}
              </h1>

              {/* Рейтинг и отзывы */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(productData.reviews.average)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {productData.reviews.average} ({productData.reviews.count}{" "}
                  відгуків)
                </span>
              </div>

              {/* Цена */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-3xl font-bold text-gray-900">
                  {productData.price} грн
                </span>
                {productData.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    {productData.originalPrice} грн
                  </span>
                )}
              </div>

              {/* Артикул и статус */}
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Артикул: {productData.sku}</span>
                <span
                  className={`flex items-center ${
                    productData.inStock ? "text-green-600" : "text-red-600"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-current mr-2"></span>
                  {productData.inStock ? "В наявності" : "Немає в наявності"}
                </span>
              </div>
            </div>

            {/* Описание */}
            <div>
              <p className="text-gray-700 leading-relaxed">
                {productData.description}
              </p>
            </div>

            {/* Выбор цвета */}
            <div>
              <h3 className="text-lg font-semibold mb-3">Колір</h3>
              <div className="flex flex-wrap gap-3">
                {productData.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    disabled={!color.inStock}
                    className={`flex items-center gap-2 px-4 py-2 border-2 rounded-lg transition-all ${
                      selectedColor.name === color.name
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-gray-400"
                    } ${!color.inStock ? "opacity-50 cursor-not-allowed" : ""}`}
                  >
                    <div
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: color.value }}
                    />
                    <span className="font-medium">{color.name}</span>
                    {!color.inStock && (
                      <span className="text-xs text-gray-500">(Немає)</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Выбор размера */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">Розмір</h3>
                <button className="text-sm text-gray-600 hover:text-gray-900">
                  Таблиця розмірів
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {productData.sizes.map((size) => (
                  <button
                    key={size.size}
                    onClick={() => setSelectedSize(size)}
                    disabled={!size.inStock}
                    className={`w-14 h-14 border-2 rounded-lg font-medium transition-all ${
                      selectedSize.size === size.size
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-gray-400"
                    } ${
                      !size.inStock
                        ? "opacity-50 cursor-not-allowed line-through"
                        : ""
                    }`}
                  >
                    {size.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Кнопки действий */}
            <div className="flex gap-4 pt-4">
              <button
                className="flex-1 bg-black text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                disabled={!productData.inStock}
              >
                {productData.inStock ? "Додати в кошик" : "Немає в наявності"}
              </button>
              <button className="px-6 py-4 border-2 border-gray-300 rounded-lg hover:border-black transition-colors">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>

            {/* Особенности */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold mb-4">Особливості</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {productData.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Дополнительная информация */}
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-2">🚚</div>
                  <div className="font-semibold">Безкоштовна доставка</div>
                  <div className="text-gray-600">від 1000 грн</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-2">↩️</div>
                  <div className="font-semibold">Легкий повернення</div>
                  <div className="text-gray-600">14 днів</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl mb-2">💳</div>
                  <div className="font-semibold">Оплата</div>
                  <div className="text-gray-600">Готівка, картка</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Детальное описание и отзывы */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {["Опис", "Характеристики", "Відгуки"].map((tab) => (
                <button
                  key={tab}
                  className="py-4 px-1 border-b-2 border-transparent hover:border-gray-300 text-gray-500 hover:text-gray-700"
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            <p className="text-gray-700 leading-relaxed">
              {productData.fullDescription}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
