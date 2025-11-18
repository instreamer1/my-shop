"use client";

import { memo } from "react";
import MenuItem from "./MenuItem";

type SubItem = { slug?: string; href?: string; label: string };
type Item = {
  slug?: string;
  href?: string;
  label: string;
  hasSubmenu?: boolean;
  submenuItems?: SubItem[];
  icon?: React.ReactNode;
};

const MenuList = memo(function MenuList({
  items,
  onItemClick,
  onSubmenuClick,
}: {
  items: Item[];
  onItemClick?: (href?: string) => void;
  onSubmenuClick?: (labelOrSlug: string) => void;
}) {
  return (
    <ul className="py-2">
      {items.map((item, idx) => (
        <li
          key={`${item.slug ?? item.label}-${idx}`}
          className="border-b border-gray-100 last:border-b-0"
        >
          <MenuItem
            href={item.href}
            label={item.label}
            icon={item.icon}
            hasSubmenu={!!item.hasSubmenu}
            onClick={
              item.hasSubmenu ? undefined : () => onItemClick?.(item.href)
            }
            onSubmenuClick={
              item.hasSubmenu
                ? () => onSubmenuClick?.(item.slug ?? item.label)
                : undefined
            }
          />
        </li>
      ))}
    </ul>
  );
});

MenuList.displayName = "MenuList";
export default MenuList;



// import { memo } from "react";
// import MenuItem from "./MenuItem";

// const MenuList = memo(function MenuList({
//   items,
//   onItemClick,
//   onSubmenuClick,
// }: {
//   items: Array<{
//     href?: string;
//     label: string;
//     hasSubmenu?: boolean;
//     submenuItems?: Array<{ href: string; label: string }>;
//     icon?: React.ReactNode;
//   }>;
//   onItemClick?: (href?: string) => void;
//   onSubmenuClick?: (label: string) => void;
// }) {
//   return (
//     <ul className="py-2">
//       {items.map((item, index) => (
//         <li
//           key={`${item.label}-${index}`}
//           className="border-b border-gray-100 last:border-b-0"
//         >
//           <MenuItem
//             href={item.href}
//             label={item.label}
//             icon={item.icon}
//             hasSubmenu={item.hasSubmenu}
//             onClick={
//               item.hasSubmenu
//                 ? undefined
//                 : () => onItemClick?.(item.href)
//             }
//             onSubmenuClick={
//               item.hasSubmenu
//                 ? () => onSubmenuClick?.(item.label)
//                 : undefined
//             }
//           />
//         </li>
//       ))}
//     </ul>
//   );
// });

// MenuList.displayName = "MenuList";
// export default MenuList;

