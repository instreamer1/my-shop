"use client";

import { useRouter } from "next/navigation";
import {
  useState,
  useCallback,
  useMemo,
  memo,
  useRef,
  useEffect,
} from "react";
import {
  MENU_ITEMS,
  CATALOG_ITEMS,
  CONTACTS,
  SOCIAL_LINKS,
} from "../constants/menu-data";

import MenuHeader from "./MenuHeader";
import MenuList from "./MenuList";
import { CatalogIcon, ContactIcon, ProfileIcon, SocialIcon } from "./MenuIcon";

interface MenuMobileProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
}

/**
 * Mobile drawer menu:
 * - panels: start -> catalog -> submenu
 * - swipe open/close
 * - close on item click (even if href is absent)
 * - body scroll lock while open
 */
const MenuMobile: React.FC<MenuMobileProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const router = useRouter();

  // panels
  const [activePanel, setActivePanel] = useState<"start" | "catalog">("start");
  const [catalogSubmenu, setCatalogSubmenu] = useState<string | null>(null);

  // swipe
  const startX = useRef(0);
  const dragging = useRef(false);
  const [dragX, setDragX] = useState(0);
  const DRAWER_WIDTH = 320; // px (approx w-80)

  // lock body scroll when open
  useEffect(() => {
    if (isMenuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isMenuOpen]);

  // close and reset
  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
    setActivePanel("start");
    setCatalogSubmenu(null);
    setDragX(0);
  }, [setIsMenuOpen]);

  const handleBack = useCallback(() => {
    if (catalogSubmenu) {
      setCatalogSubmenu(null);
      return;
    }
    if (activePanel === "catalog") {
      setActivePanel("start");
    }
  }, [catalogSubmenu, activePanel]);

  const openCatalog = useCallback(() => setActivePanel("catalog"), []);
  const openSubmenu = useCallback((label: string) => setCatalogSubmenu(label), []);

  // unified item handler: navigate if href, always close
  const handleItem = useCallback(
    (href?: string) => {
      if (href) {
        // router.push is client navigation
        router.push(href);
      }
      closeMenu();
    },
    [router, closeMenu]
  );

  // swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    dragging.current = true;
    startX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!dragging.current) return;
    const currentX = e.touches[0].clientX;
    const delta = currentX - startX.current;

    // when open -> user swipes left (negative) to close
    if (isMenuOpen) {
      if (delta < 0) setDragX(Math.max(delta, -DRAWER_WIDTH));
    } else {
      // when closed -> user swipes right (positive) to open
      if (delta > 0 && delta < DRAWER_WIDTH) {
        setDragX(-DRAWER_WIDTH + delta);
      }
    }
  };

  const handleTouchEnd = () => {
    dragging.current = false;

    if (isMenuOpen) {
      // if dragged left enough -> close
      if (dragX < -80) closeMenu();
    } else {
      // if dragged right enough -> open
      if (dragX > -DRAWER_WIDTH + 120) setIsMenuOpen(true);
    }

    setDragX(0);
  };

  // derived submenu items
const currentSubmenuItems = useMemo(() => {
  if (!catalogSubmenu) return [];

  const parent = CATALOG_ITEMS.find(
    (i) => i.label === catalogSubmenu || i.slug === catalogSubmenu
  );

  if (!parent || !parent.hasSubmenu) return [];

  return parent.submenuItems; // теперь TypeScript понимает, что это CatalogItemWithSubmenu
}, [catalogSubmenu]);


  const title = useMemo(() => {
    if (catalogSubmenu) return catalogSubmenu;
    if (activePanel === "catalog") return "Каталог";
    return "BABI";
  }, [activePanel, catalogSubmenu]);

  const showBack = activePanel !== "start" || catalogSubmenu !== null;

  // do not render when closed and no dragging
  if (!isMenuOpen && dragX === 0) return null;

  return (
    <>
      {/* overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeMenu}
        />
      )}

      {/* drawer */}
      <div
        className="fixed top-0 left-0 h-full w-80 max-w-full bg-white shadow-xl z-50 lg:hidden transform transition-transform duration-300"
        style={{
          // when open -> translateX(dragX)
          // when closed -> offscreen (-100%) + dragX (negative -> still offscreen)
          transform: isMenuOpen
            ? `translateX(${dragX}px)`
            : `translateX(calc(-100% + ${dragX}px))`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <MenuHeader
          title={title}
          onBack={showBack ? handleBack : undefined}
          onClose={closeMenu}
          showBackButton={showBack}
        />

        {/* START */}
        {activePanel === "start" && !catalogSubmenu && (
          <div className="h-full overflow-y-auto">
            <MenuList
              items={[{ label: "Каталог", hasSubmenu: true, slug: "catalog" }]}
              onSubmenuClick={() => openCatalog()}
            />

            <MenuList items={MENU_ITEMS} onItemClick={handleItem} />

            <MenuList
              items={[
                { href: "#login", label: "Вхід для клієнтів", icon: <ProfileIcon /> },
              ]}
              onItemClick={handleItem}
            />

            <div className="border-t border-gray-200 py-2">
              <li className="px-4 py-2 text-xs text-gray-500">Контакти</li>
              {CONTACTS.map((c, i) => (
                <li key={c.href ?? i}>
                  <a
                    href={c.href}
                    className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50"
                    onClick={() => closeMenu()}
                  >
                    <ContactIcon type={c.type} />
                    <span className="ml-2">{c.label}</span>
                  </a>
                </li>
              ))}
            </div>

            <div className="p-4">
              <div className="text-sm font-semibold mb-3 text-gray-600">МИ В СОЦМЕРЕЖАХ</div>
              <div className="flex gap-3">
                {SOCIAL_LINKS.map((s, i) => (
                  <a
                    key={s.href ?? i}
                    href={s.href}
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition"
                    onClick={() => closeMenu()}
                  >
                    <SocialIcon icon={s.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* CATALOG */}
        {activePanel === "catalog" && !catalogSubmenu && (
          <div className="h-full overflow-y-auto">
            <MenuList
              items={CATALOG_ITEMS}
              onSubmenuClick={(labelOrSlug) => openSubmenu(labelOrSlug)}
              onItemClick={handleItem}
            />
          </div>
        )}

        {/* SUBMENU */}
        {catalogSubmenu && (
          <div className="h-full overflow-y-auto">
            <MenuList items={currentSubmenuItems} onItemClick={handleItem} />
          </div>
        )}
      </div>
    </>
  );
};

export default memo(MenuMobile);



// "use client";

// import { useRouter } from "next/navigation";
// import { useState, useCallback, useMemo, memo, useRef } from "react";
// import {
//   MENU_ITEMS,
//   CATALOG_ITEMS,
//   CONTACTS,
//   SOCIAL_LINKS,
// } from "../constants/menu-data";
// import MenuList from "./MenuList";
// import { CatalogIcon, ContactIcon, ProfileIcon, SocialIcon } from "./MenuIcon";
// import MenuHeader from "./MenuHeader";

// // ... остальные мемоизированные компоненты (BackIcon, CloseIcon и т.д.)

// interface MenuMobileProps {
//   setIsMenuOpen: (isOpen: boolean) => void;
//   isMenuOpen: boolean;
// }

// const MenuMobile: React.FC<MenuMobileProps> = ({
//   isMenuOpen,
//   setIsMenuOpen,
// }) => {
//    const router = useRouter();

//   // Панель
//   const [activePanel, setActivePanel] = useState<"start" | "catalog">("start");
//   const [catalogSubmenu, setCatalogSubmenu] = useState<string | null>(null);

//   // SWIPE
//   const startX = useRef(0);
//   const dragging = useRef(false);
//   const [dragX, setDragX] = useState(0);

//   // =========================================
//   // BASIC HANDLERS
//   // =========================================

//   const closeMenu = useCallback(() => {
//     setIsMenuOpen(false);
//     setActivePanel("start");
//     setCatalogSubmenu(null);
//     setDragX(0);
//   }, [setIsMenuOpen]);

//   const handleBack = useCallback(() => {
//     if (catalogSubmenu) return setCatalogSubmenu(null);
//     if (activePanel === "catalog") return setActivePanel("start");
//   }, [catalogSubmenu, activePanel]);

//   const openCatalog = useCallback(() => {
//     setActivePanel("catalog");
//   }, []);

//   const openSubmenu = useCallback((label: string) => {
//     setCatalogSubmenu(label);
//   }, []);

//   const goTo = useCallback(
//     (href: string) => {
//       router.push(href);
//       closeMenu();
//     },
//     [router, closeMenu]
//   );

//   // =========================================
//   // SWIPE HANDLERS
//   // =========================================

//   const handleTouchStart = (e: React.TouchEvent) => {
//     dragging.current = true;
//     startX.current = e.touches[0].clientX;
//   };

//   const handleTouchMove = (e: React.TouchEvent) => {
//     if (!dragging.current) return;

//     const currentX = e.touches[0].clientX;
//     const delta = currentX - startX.current;

//     // MENU IS OPEN ⇒ swipe left to close
//     if (isMenuOpen) {
//       if (delta < 0) {
//         setDragX(delta); // negative
//       }
//     }

//     // MENU IS CLOSED ⇒ swipe right to open
//     if (!isMenuOpen) {
//       if (delta > 0 && delta < 280) {
//         setDragX(-280 + delta); // panel follows finger
//       }
//     }
//   };

//   const handleTouchEnd = () => {
//     dragging.current = false;

//     // Closing gesture
//     if (isMenuOpen) {
//       if (dragX < -70) {
//         closeMenu();
//       }
//     } else {
//       // Opening gesture
//       if (dragX > -200) {
//         setIsMenuOpen(true);
//       }
//     }

//     // reset animation
//     setDragX(0);
//   };

//   // =========================================
//   // DERIVED MEMO VALUES
//   // =========================================

//   const currentSubmenuItems = useMemo(() => {
//     if (!catalogSubmenu) return [];
//     const parent = CATALOG_ITEMS.find((i) => i.label === catalogSubmenu);
//     return parent?.submenuItems || [];
//   }, [catalogSubmenu]);

//   const title = useMemo(() => {
//     if (catalogSubmenu) return catalogSubmenu;
//     if (activePanel === "catalog") return "Каталог";
//     return "BABI";
//   }, [activePanel, catalogSubmenu]);

//   const showBack =
//     activePanel === "catalog" || catalogSubmenu !== null;

  

//   if (!isMenuOpen && dragX === 0) return null;

//   // =========================================
//   // RENDER
//   // =========================================

//   return (
//     <>
//       {/* Overlay */}
//       {isMenuOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-40 lg:hidden"
//           onClick={closeMenu}
//         />
//       )}

//       {/* MENU DRAWER */}
//       <div
//         className={`
//           fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 lg:hidden
//           transform transition-transform duration-300
//         `}
//         style={{
//           transform: isMenuOpen
//             ? `translateX(${dragX}px)`
//             : `translateX(calc(-100% + ${dragX}px))`,
//         }}
//         onTouchStart={handleTouchStart}
//         onTouchMove={handleTouchMove}
//         onTouchEnd={handleTouchEnd}
//       >
//         <MenuHeader
//           title={title}
//           onClose={closeMenu}
//           onBack={showBack ? handleBack : undefined}
//           showBackButton={showBack}
//         />

//         {/* START PANEL */}
//         {activePanel === "start" && !catalogSubmenu && (
//           <div className="overflow-y-auto h-full">
//             <MenuList
//               items={[
//                 { label: "Каталог", hasSubmenu: true, icon: <CatalogIcon /> },
//               ]}
//               onSubmenuClick={openCatalog}
//             />

//             <MenuList
//               items={MENU_ITEMS}
//               onItemClick={() => closeMenu()}
//             />

//             <MenuList
//               items={[
//                 {
//                   href: "#login",
//                   label: "Вхід для клієнтів",
//                   icon: <ProfileIcon />,
//                 },
//               ]}
//               onItemClick={() => closeMenu()}
//             />

//             {/* Contacts */}
//             <div className="border-t border-gray-200 py-2">
//               <li className="px-4 py-2 text-xs text-gray-500">Контакти</li>
//               {CONTACTS.map((c, i) => (
//                 <li key={i}>
//                   <a
//                     href={c.href}
//                     className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50"
//                   >
//                     <ContactIcon type={c.type} />
//                     {c.label}
//                   </a>
//                 </li>
//               ))}
//             </div>

//             {/* Social */}
//             <div className="p-4">
//               <div className="text-sm font-semibold mb-3 text-gray-600">
//                 МИ В СОЦМЕРЕЖАХ
//               </div>

//               <div className="flex gap-3">
//                 {SOCIAL_LINKS.map((s, i) => (
//                   <a
//                     key={i}
//                     href={s.href}
//                     target="_blank"
//                     rel="nofollow"
//                     className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition"
//                   >
//                     <SocialIcon icon={s.icon} />
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* CATALOG PANEL */}
//         {activePanel === "catalog" && !catalogSubmenu && (
//           <MenuList
//             items={CATALOG_ITEMS}
//             onSubmenuClick={openSubmenu}
//             onItemClick={(href?: string) => href && goTo(href)}
//           />
//         )}

//         {/* SUBMENU PANEL */}
//         {catalogSubmenu && (
//           <MenuList
//             items={currentSubmenuItems}
//             onItemClick={(href?: string) => href && goTo(href)}
//           />
//         )}
//       </div>
//     </>
//   );
// };
// export default memo(MenuMobile);

// 'use client';

// import { useState } from 'react';

// interface MenuProps {
//   setIsMenuOpen: (isOpen: boolean) => void;
//   isMenuOpen: boolean;
// }

// const Menu: React.FC<MenuProps> = ({ isMenuOpen, setIsMenuOpen }) => {
//   const [activePanel, setActivePanel] = useState('start');
//   const [catalogSubmenu, setCatalogSubmenu] = useState<string | null>(null);

//   const menuItems = [
//     { href: '/oplata-i-dostavka/', label: 'Оплата і доставка' },
//     { href: '/obmin-ta-povernennia/', label: 'Обмін та повернення' },
//     { href: '/dropshypinh/', label: 'Дропшипінг' },
//     { href: '/dohliad-za-bilyznoiu/', label: 'Догляд за білизною' },
//     { href: '/vidhuky-pro-mahazyn/', label: 'Відгуки про магазин' },
//   ];

//   const catalogItems = [
//     { href: '/rozprodazh/', label: 'РОЗПРОДАЖ' },
//     { href: '/trusvkv/', label: 'Трусики' },
//     {
//       href: '/topy-ta-biusthaltery/',
//       label: 'Топи та бюстгальтери',
//       hasSubmenu: true,
//       submenuItems: [
//         { href: '/topy/', label: 'Топи' },
//         { href: '/biusthaltery/', label: 'Бюстгальтери' },
//         { href: '/komplekty/', label: 'Комплекти' }
//       ]
//     },
//     { href: '/bazovi-komplekty/', label: 'Базові комплекти' },
//     { href: '/komplektv-iz-sitochky-ta-merezhvva/', label: 'Комплекти із сіточки та мережива' },
//     { href: '/losyny-kolhoty-shkarpetky/', label: 'Лосини, колготи, шкарпетки' },
//     { href: '/pizhamy-ta-khalatv/', label: 'Піжами та халати' },
//     { href: '/kupalnyky-ta-pareo/', label: 'Купальники та парео' },
//     { href: '/bodi/', label: 'Боді' },
//     { href: '/hart-ery-1-a-pane-hokhy/', label: 'Гартери та панчохи' },
//     { href: '/cholovikam/', label: 'Чоловікам' },
//     { href: '/inshe/', label: 'Інше' },
//   ];

//   const contacts = [
//     {
//       type: 'viber',
//       href: 'viber://chat?number=%2B380632529870',
//       label: '+38 063 25 29 870'
//     },
//     {
//       type: 'telegram',
//       href: 'tg://resolve?domain=%40dabi_ua',
//       label: '@dabi_ua'
//     },
//   ];

//   const socialLinks = [
//     {
//       href: 'https://www.instagram.com/dabiua/',
//       title: 'Instagram',
//       icon: 'instagram'
//     },
//     {
//       href: 'https://www.tiktok.com/',
//       title: 'TikTok',
//       icon: 'tiktok'
//     },
//     {
//       href: 'https://t.me/dabi_ua',
//       title: 'Telegram',
//       icon: 'telegram'
//     },
//   ];

//   const handleBack = () => {
//     if (catalogSubmenu) {
//       setCatalogSubmenu(null);
//     } else if (activePanel === 'catalog') {
//       setActivePanel('start');
//     }
//   };

//   const handleCatalogClick = () => {
//     setActivePanel('catalog');
//   };

//   const handleSubmenuClick = (itemLabel: string) => {
//     setCatalogSubmenu(itemLabel);
//   };

//   const getCurrentSubmenuItems = () => {
//     const item = catalogItems.find(item => item.label === catalogSubmenu);
//     return item?.submenuItems || [];
//   };

//   const getBackButtonText = () => {
//     if (catalogSubmenu) {
//       return catalogSubmenu;
//     }
//     return 'Меню';
//   };

//   return (
//     <>
//       {/* Mobile Menu Overlay */}
//       {isMenuOpen && (
//         <div
//           className="fixed inset-0 bg-(--backdrop) bg-opacity-50 z-40 lg:hidden"
//           onClick={() => setIsMenuOpen(false)}
//         />
//       )}

//       {/* Mobile Menu */}
//       <div className={`
//         fixed top-0 left-0 h-full w-80 max-w-full bg-white shadow-xl z-50
//         transform transition-transform duration-400 ease-in-out lg:hidden
//         ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}
//       `}>

//         {/* Header with Back Button and Logo */}
//         <div className="flex items-center justify-between p-4 border-b border-gray-200">
//           {/* <button
//             onClick={handleBack}
//             className="flex items-center justify-center w-8 h-8 text-gray-600 hover:text-gray-800"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//           </button> */}

//           <div className="flex-1 text-center">
//             <div className="text-lg font-semibold">DABI</div>
//           </div>

//           <button
//             onClick={() => setIsMenuOpen(false)}
//             className="flex items-center justify-center w-8 h-8 text-gray-600 hover:text-gray-800"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//             </svg>
//           </button>
//         </div>

//         {/* Main Menu Panel */}
//         {activePanel === 'start' && !catalogSubmenu && (
//           <div className="h-full overflow-y-auto">

//             {/* Catalog Section */}
//             <div className="border-b border-gray-200">
//               <ul className="py-2">
//                 <li className="border-b border-gray-100">
//                   <button
//                     onClick={handleCatalogClick}
//                     className="flex items-center justify-between w-full px-4 py-3 text-left hover:bg-gray-50"
//                   >
//                     <div className="flex items-center">
//                       <svg className="w-5 h-5 mr-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                       </svg>
//                       <span className="font-medium">Каталог</span>
//                     </div>
//                     <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                     </svg>
//                   </button>
//                 </li>
//               </ul>
//             </div>

//             {/* Main Menu Items */}
//             <div className="border-b border-gray-200">
//               <ul className="py-2">
//                 {menuItems.map((item, index) => (
//                   <li key={index} className="border-b border-gray-100 last:border-b-0">
//                     <a
//                       href={item.href}
//                       className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       {item.label}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Client Login */}
//             <div className="border-b border-gray-200">
//               <ul className="py-2">
//                 <li className="border-b border-gray-100">
//                   <a
//                     href="#login"
//                     className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
//                   >
//                     <svg className="w-5 h-5 mr-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                     </svg>
//                     <span>Вхід для клієнтів</span>
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             {/* Contacts */}
//             <div className="border-b border-gray-200">
//               <ul className="py-2">
//                 <li className="px-4 py-2 text-sm text-gray-500">
//                   Контакти
//                 </li>
//                 {contacts.map((contact, index) => (
//                   <li key={index} className="border-b border-gray-100 last:border-b-0">
//                     <a
//                       href={contact.href}
//                       className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
//                     >
//                       <div className="w-5 h-5 mr-3 flex items-center justify-center">
//                         {contact.type === 'viber' && (
//                           <span className="text-purple-600 font-semibold text-sm">V</span>
//                         )}
//                         {contact.type === 'telegram' && (
//                           <span className="text-blue-500 font-semibold text-sm">T</span>
//                         )}
//                       </div>
//                       {contact.label}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>

//             {/* Social Media */}
//             <div className="p-4">
//               <div className="text-sm font-medium text-gray-700 mb-3">МИ В СОЦМЕРЕЖАХ</div>
//               <div className="flex space-x-4">
//                 {socialLinks.map((social, index) => (
//                   <a
//                     key={index}
//                     href={social.href}
//                     target="_blank"
//                     rel="nofollow"
//                     className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
//                     title={social.title}
//                   >
//                     <span className="text-gray-600 font-semibold text-sm">
//                       {social.icon === 'instagram' && 'I'}
//                       {social.icon === 'tiktok' && 'T'}
//                       {social.icon === 'telegram' && 'T'}
//                     </span>
//                   </a>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Catalog Panel */}
//         {activePanel === 'catalog' && !catalogSubmenu && (
//           <div className="h-full overflow-y-auto">
//             {/* Submenu Header */}
//             <div className="flex items-center p-4 border-b border-gray-200">
//               <button
//                 onClick={() => setActivePanel('start')}
//                 className="flex items-center justify-center w-8 h-8 text-gray-600 hover:text-gray-800 mr-2"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//               </button>
//               <div className="text-lg font-semibold">Каталог</div>
//             </div>

//             {/* Catalog Items */}
//             <div className="overflow-y-auto h-full pb-20">
//               <ul className="py-2">
//                 {catalogItems.map((item, index) => (
//                   <li key={index} className="border-b border-gray-100 last:border-b-0">
//                     {item.hasSubmenu ? (
//                       <button
//                         onClick={() => handleSubmenuClick(item.label)}
//                         className="flex items-center justify-between w-full px-4 py-3 text-left hover:bg-gray-50"
//                       >
//                         <span>{item.label}</span>
//                         <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//                         </svg>
//                       </button>
//                     ) : (
//                       <a
//                         href={item.href}
//                         className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
//                         onClick={() => setIsMenuOpen(false)}
//                       >
//                         {item.label}
//                       </a>
//                     )}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         )}

//         {/* Submenu Panel */}
//         {catalogSubmenu && (
//           <div className="h-full overflow-y-auto">
//             {/* Submenu Header */}
//             <div className="flex items-center p-4 border-b border-gray-200">
//               <button
//                 onClick={() => setCatalogSubmenu(null)}
//                 className="flex items-center justify-center w-8 h-8 text-gray-600 hover:text-gray-800 mr-2"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                 </svg>
//               </button>
//               <div className="text-lg font-semibold">{catalogSubmenu}</div>
//             </div>

//             {/* Submenu Items */}
//             <div className="overflow-y-auto h-full pb-20">
//               <ul className="py-2">
//                 {getCurrentSubmenuItems().map((item, index) => (
//                   <li key={index} className="border-b border-gray-100 last:border-b-0">
//                     <a
//                       href={item.href}
//                       className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
//                       onClick={() => setIsMenuOpen(false)}
//                     >
//                       {item.label}
//                     </a>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// };

// export default Menu;
