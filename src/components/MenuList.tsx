
import { memo } from "react";
import MenuItem from "./MenuItem";



const MenuList = memo(function MenuList({ 
  items,
  onItemClick,
  onSubmenuClick
}: {
  items: Array<{
    href?: string;
    label: string;
    hasSubmenu?: boolean;
    submenuItems?: Array<{ href: string; label: string }>;
    icon?: React.ReactNode;
  }>;
  onItemClick?: () => void;
  onSubmenuClick?: (label: string) => void;
}) {
  return (
    <ul className="py-2">
      {items.map((item, index) => (
        <li key={`${item.label}-${index}`} className="border-b border-gray-100 last:border-b-0">
          <MenuItem
            href={item.href}
            label={item.label}
            onClick={onItemClick}
            hasSubmenu={item.hasSubmenu}
            onSubmenuClick={item.hasSubmenu ? () => onSubmenuClick?.(item.label) : undefined}
            icon={item.icon}
          />
        </li>
      ))}
    </ul>
  );
});
MenuList.displayName = 'MenuList';
export default MenuList;
