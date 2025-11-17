'use client';

interface ControlsProps {
  productsCount: number;
  onSortChange: (sortBy: string) => void;
  onViewChange?: (view: 'grid' | 'list') => void;
}

export default function CategoryControls({ 
  productsCount, 
  onSortChange,
  onViewChange 
}: ControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 p-4 bg-gray-50 rounded-lg">
      {/* Информация о количестве */}
      <div className="text-sm text-gray-600">
        Знайдено <span className="font-semibold">{productsCount}</span> товарів
      </div>
      
      {/* Управление сортировкой и видом */}
      <div className="flex gap-4 items-center">
        {/* Переключение вида (если нужно) */}
        {onViewChange && (
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button 
              onClick={() => onViewChange('grid')}
              className="p-2 hover:bg-gray-100 transition-colors"
            >
              ▫️
            </button>
            <button 
              onClick={() => onViewChange('list')}
              className="p-2 hover:bg-gray-100 transition-colors"
            >
              ☰
            </button>
          </div>
        )}
        
        {/* Сортировка */}
        <select 
          onChange={(e) => onSortChange(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-black focus:border-transparent"
        >
          <option value="popular">Сортувати за популярністю</option>
          <option value="price-asc">Ціна: від низької до високої</option>
          <option value="price-desc">Ціна: від високої до низької</option>
          <option value="newest">Новинки</option>
          <option value="name">За назвою</option>
        </select>
      </div>
    </div>
  );
}