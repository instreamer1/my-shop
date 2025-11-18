"use client";

import { memo, useCallback } from "react";
import { ArrowRightIcon } from "./MenuIcon";

const MenuItem = memo(function MenuItem({
  href,
  label,
  onClick,
  hasSubmenu = false,
  onSubmenuClick,
  icon,
}: {
  href?: string;
  label: string;
  onClick?: (href?: string) => void; // receives href
  hasSubmenu?: boolean;
  onSubmenuClick?: () => void;
  icon?: React.ReactNode;
}) {
  const handleClick = useCallback(() => {
    onClick?.(href);
  }, [onClick, href]);

  const handleSubmenu = useCallback(() => {
    onSubmenuClick?.();
  }, [onSubmenuClick]);

  const content = (
    <>
      {icon && <div className="mr-3">{icon}</div>}
      <span className="flex-1 text-left">{label}</span>
      {hasSubmenu && <ArrowRightIcon />}
    </>
  );

  // submenu -> button
  if (hasSubmenu) {
    return (
      <button
        onClick={handleSubmenu}
        className="flex items-center justify-between w-full px-4 py-3 text-left hover:bg-gray-50 text-gray-700"
        type="button"
      >
        {content}
      </button>
    );
  }

  // regular item -> button that triggers centralized handler (handleItem)
  return (
    <button
      onClick={handleClick}
      className="flex items-center w-full px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
      type="button"
    >
      {content}
    </button>
  );
});

MenuItem.displayName = "MenuItem";
export default MenuItem;



// "use client";

// import { useCallback, memo } from "react";
// import { ArrowRightIcon } from "./MenuIcon";
// import Link from "next/link";

// const MenuItem = memo(function MenuItem({
//   href,
//   label,
//   onClick,
//   hasSubmenu = false,
//   onSubmenuClick,
//   icon,
// }: {
//   href?: string;
//   label: string;
//   onClick?: (href?: string) => void;
//   hasSubmenu?: boolean;
//   onSubmenuClick?: () => void;
//   icon?: React.ReactNode;
// }) {
//   const handleClick = useCallback(() => {
//     onClick?.(href);       
//   }, [onClick, href]);

//   const handleSubmenu = useCallback(() => {
//     onSubmenuClick?.();
//   }, [onSubmenuClick]);

//   const content = (
//     <>
//       {icon && <div className="mr-3">{icon}</div>}
//       <span>{label}</span>
//       {hasSubmenu && <ArrowRightIcon />}
//     </>
//   );

//   // SUBMENU BUTTON
//   if (hasSubmenu) {
//     return (
//       <button
//         onClick={handleSubmenu}
//         className="flex items-center justify-between w-full px-4 py-3 text-left hover:bg-gray-50 text-gray-700"
//       >
//         {content}
//       </button>
//     );
//   }

//   // NORMAL LINK
//   return (
//     <Link
//       href={href || "#"}
//       onClick={handleClick}
//       className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-gray-900"
//     >
//       {content}
//     </Link>
//   );
// });

// MenuItem.displayName = "MenuItem";

// export default MenuItem;

