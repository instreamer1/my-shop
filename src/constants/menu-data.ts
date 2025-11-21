"use client";

import { CatalogItem, MenuItems } from "../types/menu";

export const MENU_ITEMS: MenuItems[] = [
  { href: "/oplata-i-dostavka/", label: "Оплата і доставка" },
  { href: "/obmin-ta-povernennia/", label: "Обмін та повернення" },
  { href: "/dropshypinh/", label: "Дропшипінг" },
  { href: "/dohliad-za-bilyznoiu/", label: "Догляд за білизною" },
  { href: "/vidhuky-pro-mahazyn/", label: "Відгуки про магазин" },
] as const;

export const CATALOG_ITEMS: CatalogItem[] = [
  {
    slug: "rozprodazh",
    label: "РОЗПРОДАЖ",
    href: "/rozprodazh",
    hasSubmenu: false,
  },
  {
    slug: "trusyky",
    label: "Трусики",
    href: "/trusyky",
    hasSubmenu: false,
  },
  {
    slug: "topy-ta-biusthaltery",
    label: "Топи та бюстгальтери",
    href: "/topy-ta-biusthaltery",
    hasSubmenu: true,
    submenuItems: [
      { slug: "topy", href: "/topy", label: "Топи" },
      {
        slug: "biusthaltery",
        href: "/biusthaltery",
        label: "Бюстгальтери",
      },
      { slug: "komplekty", href: "/komplekty", label: "Комплекти" },
    ],
  },
  {
    slug: "bazovi-komplekty",
    label: "Базові комплекти",
    href: "/bazovi-komplekty",
    hasSubmenu: false,
  },
  {
    slug: "komplekty-iz-sitochky-ta-merezhvy",
    label: "Комплекти із сіточки та мережива",
    href: "/komplekty-iz-sitochky-ta-merezhvy",
    hasSubmenu: false,
  },
  {
    slug: "losyny-kolhoty-shkarpetky",
    label: "Лосини, колготи, шкарпетки",
    href: "/losyny-kolhoty-shkarpetky",
    hasSubmenu: false,
  },
  {
    slug: "pizhamy-ta-khalaty",
    label: "Піжами та халати",
    href: "/pizhamy-ta-khalaty",
    hasSubmenu: false,
  },
  {
    slug: "kupalnyky-ta-pareo",
    label: "Купальники та парео",
    href: "/kupalnyky-ta-pareo",
    hasSubmenu: false,
  },
  {
    slug: "bodi",
    label: "Боді",
    href: "/bodi",
    hasSubmenu: false,
  },
  {
    slug: "harterny-ta-panchokhy",
    label: "Гартери та панчохи",
    href: "/harterny-ta-panchokhy",
    hasSubmenu: false,
  },
  {
    slug: "cholovikam",
    label: "Чоловікам",
    href: "/cholovikam",
    hasSubmenu: false,
  },
  {
    slug: "inshe",
    label: "Інше",
    href: "/inshe",
    hasSubmenu: false,
  },
] as const;

export const CONTACTS = [
  {
    type: "viber" as const,
    href: "viber://chat?number=%2B380632529870",
    label: "+38 063 25 29 870",
  },
  {
    type: "telegram" as const,
    href: "tg://resolve?domain=%40dabi_ua",
    label: "@babi_ua",
  },
] as const;

export const SOCIAL_LINKS = [
  {
    href: "https://www.instagram.com/babiua/",
    title: "Instagram",
    icon: "instagram" as const,
  },
  {
    href: "https://www.tiktok.com/",
    title: "TikTok",
    icon: "tiktok" as const,
  },
  {
    href: "https://t.me/babi_ua",
    title: "Telegram",
    icon: "telegram" as const,
  },
] as const;
