"use client";

import { useRouter } from "next/navigation";
import { useState, useCallback, useMemo, memo } from "react";
import {
  MENU_ITEMS,
  CATALOG_ITEMS,
  CONTACTS,
  SOCIAL_LINKS,
} from "../constants/menu-data";
import MenuList from "./MenuList";
import { CatalogIcon, ContactIcon, ProfileIcon, SocialIcon } from "./MenuIcon";
import MenuHeader from "./MenuHeader";

// ... остальные мемоизированные компоненты (BackIcon, CloseIcon и т.д.)

interface MenuProps {
  setIsMenuOpen: (isOpen: boolean) => void;
  isMenuOpen: boolean;
}

const Menu: React.FC<MenuProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const router = useRouter();

  const [activePanel, setActivePanel] = useState<"start" | "catalog">("start");
  const [catalogSubmenu, setCatalogSubmenu] = useState<string | null>(null);

  // Мемоизированные обработчики
  const handleCloseMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, [setIsMenuOpen]);

  const handleBack = useCallback(() => {
    if (catalogSubmenu) {
      setCatalogSubmenu(null);
    } else if (activePanel === "catalog") {
      setActivePanel("start");
    }
  }, [catalogSubmenu, activePanel]);

  const handleCatalogClick = useCallback(() => {
    setActivePanel("catalog");
  }, []);

  const handleSubmenuClick = useCallback((itemLabel: string) => {
    setCatalogSubmenu(itemLabel);
  }, []);

  const handleCategoryClick = useCallback(
    (href: string) => {
      router.push(href);
      setIsMenuOpen(false);
    },
    [router, setIsMenuOpen]
  );

  const handleSubcategoryClick = useCallback(
    (href: string) => {
      router.push(href);
      setIsMenuOpen(false);
    },
    [router, setIsMenuOpen]
  );

  // Мемоизированные вычисления
  const currentSubmenuItems = useMemo(() => {
    if (!catalogSubmenu) return [];
    const item = CATALOG_ITEMS.find((item) => item.label === catalogSubmenu);
    return item?.submenuItems || [];
  }, [catalogSubmenu]);

  const menuHeaderTitle = useMemo(() => {
    if (catalogSubmenu) return catalogSubmenu;
    if (activePanel === "catalog") return "Каталог";
    return "BABI";
  }, [catalogSubmenu, activePanel]);

  const showBackButton = useMemo(
    () => activePanel === "catalog" || catalogSubmenu !== null,
    [activePanel, catalogSubmenu]
  );

  // Ранний возврат для оптимизации
  if (!isMenuOpen) return null;

  return (
    <>
      {/* Mobile Menu Overlay */}
      <div
        className="fixed inset-0 bg-(--backdrop) bg-opacity-50 z-40 lg:hidden"
        onClick={handleCloseMenu}
      />

      {/* Mobile Menu */}
      <div
        className={`
        fixed top-0 left-0 h-full w-80 max-w-full bg-white shadow-xl z-50
        transform transition-transform duration-400 ease-in-out lg:hidden
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <MenuHeader
          onBack={showBackButton ? handleBack : undefined}
          onClose={handleCloseMenu}
          title={menuHeaderTitle}
          showBackButton={showBackButton}
        />

        {/* Main Menu Panel */}
        {activePanel === "start" && !catalogSubmenu && (
          <div className="h-full overflow-y-auto">
            {/* Catalog Section */}
            <div className="border-b border-gray-200">
              <MenuList
                items={[
                  {
                    label: "Каталог",
                    hasSubmenu: true,
                    icon: <CatalogIcon />,
                  },
                ]}
                onSubmenuClick={handleCatalogClick}
              />
            </div>

            {/* Main Menu Items */}
            <div className="border-b border-gray-200">
              <MenuList items={MENU_ITEMS} onItemClick={handleCloseMenu} />
            </div>

            {/* Client Login */}
            <div className="border-b border-gray-200">
              <MenuList
                items={[
                  {
                    href: "#login",
                    label: "Вхід для клієнтів",
                    icon: <ProfileIcon />,
                  },
                ]}
              />
            </div>

            {/* Contacts */}
            <div className="border-b border-gray-200">
              <div className="py-2">
                <li className="px-4 py-2 text-sm text-gray-500">Контакти</li>
                {CONTACTS.map((contact, index) => (
                  <li
                    key={index}
                    className="border-b border-gray-100 last:border-b-0"
                  >
                    <a
                      href={contact.href}
                      className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    >
                      <ContactIcon type={contact.type} />
                      {contact.label}
                    </a>
                  </li>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="p-4">
              <div className="text-sm font-medium text-gray-700 mb-3">
                МИ В СОЦМЕРЕЖАХ
              </div>
              <div className="flex space-x-4">
                {SOCIAL_LINKS.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="nofollow"
                    className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                    title={social.title}
                  >
                    <SocialIcon icon={social.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Catalog Panel */}
        <MenuList
          items={CATALOG_ITEMS.map((item) => ({
            ...item,
            // Для элементов с подменю - обработчик подменю
            // Для обычных элементов - href для Link
            onSubmenuClick: item.hasSubmenu
              ? undefined
              // () => handleSubmenuClick(item.label)
              : () => handleCategoryClick(item.href),
          }))}
        />
        {/* {activePanel === "catalog" && !catalogSubmenu && (
          <div className="h-full overflow-y-auto">
            <MenuList
              items={CATALOG_ITEMS.map((item) => ({
                ...item,
                onClick: item.hasSubmenu
                  ? () => handleSubmenuClick(item.label)
                  : () => handleCategoryClick(item.href),
              }))}
            />
          </div>
        )} */}

        {/* Submenu Panel */}
        <MenuList
          items={currentSubmenuItems.map((item) => ({
            ...item,
               onSubmenuClick: item.hasSubmenu
              ?  handleSubmenuClick(item.label)
              : undefined,
          }))}
        />
        {/* {catalogSubmenu && (
          <div className="h-full overflow-y-auto">
            <MenuList
              items={currentSubmenuItems.map((item) => ({
                ...item,
                onClick: () => handleSubcategoryClick(item.href),
              }))}
            />
          </div>
        )} */}
      </div>
    </>
  );
};

export default memo(Menu);

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
