import { memo } from "react";
import { BackIcon, CloseIcon } from "./MenuIcon";

const MenuHeader = memo(function MenuHeader({ 
  onBack, 
  onClose, 
  title = 'BABI',
  showBackButton = false 
}: { 
  onBack?: () => void;
  onClose: () => void;
  title?: string;
  showBackButton?: boolean;
}) {
    return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      {showBackButton ? (
        <button
          onClick={onBack}
          className="flex items-center justify-center w-8 h-8 text-gray-600 hover:text-gray-800"
        >
          <BackIcon />
        </button>
      ) : (
        <div className="w-8" /> /* Spacer for alignment */
      )}

      <div className="flex-1 text-center">
        <div className="text-lg font-semibold">{title}</div>
      </div>

      <button
        onClick={onClose}
        className="flex items-center justify-center w-8 h-8 text-gray-600 hover:text-gray-800"
      >
        <CloseIcon />
      </button>
    </div>
 );
});
MenuHeader.displayName = 'MenuHeader';

export default MenuHeader;
