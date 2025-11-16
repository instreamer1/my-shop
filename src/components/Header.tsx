"use client";

import { useState } from "react";
import Link from "next/link";
import Menu from "./Menu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Розпродаж", href: "/sale" },
    { label: "Трусики", href: "/category/trusiki" },
    { label: "Топи та бюстгальтери", href: "/category/tops" },
    { label: "Базові комплекти", href: "/category/basic" },
    { label: "Комплекти з сіточки", href: "/category/mesh" },
    { label: "Лосини, колготи, шкарпетки", href: "/category/leggings" },
    { label: "Піжами та халати", href: "/category/pijamas" },
    { label: "Купальники та парео", href: "/category/swim" },
    { label: "Боді", href: "/category/body" },
    { label: "Гартери та панчохи", href: "/category/garters" },
    { label: "Чоловікам", href: "/category/men" },
    { label: "Інше", href: "/category/other" },
  ];

  return (
    <header className="w-full border-b bg-white sticky top-0 z-50 shadow-sm">
      {/* Верхняя панель */}
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center py-4">
        {/* Логотип */}
        <Link href="/" className="text-3xl font-bold">
          DABI
        </Link>

        {/* Меню десктоп */}
        <nav className="hidden lg:flex gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium hover:text-green-800 transition"
            >
              {item.label}
            </Link>
          ))}
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
      <Menu isMenuOpen= {isMenuOpen} setIsMenuOpen= {setIsMenuOpen} />
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
