"use client";

import { useState } from "react";
import Link from "next/link";
import { CATALOG_ITEMS } from "../constants/menu-data";
import MenuMobile from "./MenuMobile";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Розпродаж", href: "/sale" },
    { label: "Трусики", href: "/trusiki" },
    { label: "Топи та бюстгальтери", href: "/tops" },
    { label: "Базові комплекти", href: "/basic" },
    { label: "Комплекти з сіточки", href: "/category/mesh" },
    { label: "Лосини, колготи, шкарпетки", href: "/leggings" },
    { label: "Піжами та халати", href: "/pijamas" },
    { label: "Купальники та парео", href: "/swim" },
    { label: "Боді", href: "/body" },
    { label: "Гартери та панчохи", href: "/garters" },
    { label: "Чоловікам", href: "/men" },
    { label: "Інше", href: "/other" },
  ];

  return (
    <header className="w-full border-b bg-white sticky top-0 z-50 shadow-sm">
      {/* Верхняя панель */}
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center py-4">
        {/* Логотип */}
        <Link href="/" className="text-3xl font-bold">
          BABI
        </Link>

        {/* Меню десктоп */}
        <nav className="hidden lg:flex gap-6">
    {CATALOG_ITEMS.map((item) =>
            item.hasSubmenu ? (
              <div key={item.slug} className="group relative">
                <button className="px-3 py-2 font-medium text-gray-700 hover:text-blue-600">
                  {item.label}
                </button>
                {item.submenuItems && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto">
                    {item.submenuItems.map((sub) => (
                      <Link
                        key={sub.slug}
                        href={sub.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.slug}
                href={item.href}
                className="px-3 py-2 font-medium text-gray-700 hover:text-blue-600"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        {/* Иконки */}
        <div className="flex items-center gap-5">
          <button className="text-xl hover:text-green-800">🔍</button>
          <Link href="/login" className="text-xl hover:text-green-800">
            👤
          </Link>
          <Link href="/cart" className="text-xl hover:text-green-800">
            🛒
          </Link>

          {/* Бургер для мобилок */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden text-2xl"
          >
            ☰
          </button>
        </div>
      </div>
            {/* Мобильное меню */}
      {isMenuOpen && (
        <div className="lg:hidden">
          <MenuMobile isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
        </div>
      )}
      {/* Мобильное меню */}
      {/* {isMenuOpen && (
        <nav className="lg:hidden w-[calc(100% - (48px - 8px))] bg-white border-t shadow-md flex flex-col p-4">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="py-3 border-b text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )} */}
    </header>
  );
}
