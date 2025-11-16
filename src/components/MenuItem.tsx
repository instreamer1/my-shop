"use client";

import { useCallback, useMemo, memo } from "react";
import { ArrowRightIcon } from "./MenuIcon";
import Link from "next/link";

const MenuItem = memo(function MenuItem({ 
  href, 
  label, 
  onClick,
  hasSubmenu = false,
  onSubmenuClick,
  icon
}: { 
  href?: string;
  label: string;
  onClick?: () => void;
  hasSubmenu?: boolean;
  onSubmenuClick?: () => void;
  icon?: React.ReactNode;
}) {
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick();
    }
  }, [onClick]);

  const handleSubmenu = useCallback(() => {
    if (onSubmenuClick) {
      onSubmenuClick();
    }
  }, [onSubmenuClick]);

  const content = (
    <>
      {icon && <div className="mr-3">{icon}</div>}
      <span>{label}</span>
      {hasSubmenu && <ArrowRightIcon />}
    </>
  );

  // Для элементов с подменю используем button
  if (hasSubmenu) {
    return (
      <button 
        onClick={handleSubmenu}
        className="flex items-center justify-between w-full px-4 py-3 text-left hover:bg-gray-50 text-gray-700"
      >
        {content}
      </button>
    );
  }

  // Для обычных ссылок используем Link
  return (
    <Link 
      href={href || '#'}
      onClick={handleClick}
      className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
    >
      {content}
    </Link>
  );
});
MenuItem.displayName = 'MenuItem';

export default MenuItem;
