'use client';

import { useState } from 'react';

interface FilterProps {
  sizes: string[];
  colors: string[];
  priceRange: { min: number; max: number };
  onFiltersChange: (filters: any) => void;
}

export default function CategoryFilters({ 
  sizes, 
  colors, 
  priceRange, 
  onFiltersChange 
}: FilterProps) {
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [price, setPrice] = useState(priceRange.max);

  const handleSizeChange = (size: string) => {
    const newSizes = selectedSizes.includes(size)
      ? selectedSizes.filter(s => s !== size)
      : [...selectedSizes, size];
    
    setSelectedSizes(newSizes);
    onFiltersChange({ sizes: newSizes, colors: selectedColors, price });
  };

  const handleColorChange = (color: string) => {
    const newColors = selectedColors.includes(color)
      ? selectedColors.filter(c => c !== color)
      : [...selectedColors, color];
    
    setSelectedColors(newColors);
    onFiltersChange({ sizes: selectedSizes, colors: newColors, price });
  };

  const handlePriceChange = (newPrice: number) => {
    setPrice(newPrice);
    onFiltersChange({ sizes: selectedSizes, colors: selectedColors, price: newPrice });
  };

  const clearFilters = () => {
    setSelectedSizes([]);
    setSelectedColors([]);
    setPrice(priceRange.max);
    onFiltersChange({ sizes: [], colors: [], price: priceRange.max });
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-lg">Фільтри</h3>
        <button 
          onClick={clearFilters}
          className="text-sm text-gray-600 hover:text-gray-900"
        >
          Очистити
        </button>
      </div>
      
      {/* Фильтр по размеру */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Розмір</h4>
        <div className="space-y-2">
          {sizes.map(size => (
            <label key={size} className="flex items-center">
              <input 
                type="checkbox" 
                checked={selectedSizes.includes(size)}
                onChange={() => handleSizeChange(size)}
                className="rounded border-gray-300 text-black focus:ring-black" 
              />
              <span className="ml-2 text-sm">{size}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Фильтр по цвету */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Колір</h4>
        <div className="space-y-2">
          {colors.map(color => (
            <label key={color} className="flex items-center">
              <input 
                type="checkbox" 
                checked={selectedColors.includes(color)}
                onChange={() => handleColorChange(color)}
                className="rounded border-gray-300 text-black focus:ring-black" 
              />
              <span className="ml-2 text-sm">{color}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Фильтр по цене */}
      <div className="mb-6">
        <h4 className="font-medium mb-3">Ціна, грн</h4>
        <div className="space-y-3">
          <input 
            type="range" 
            min={priceRange.min}
            max={priceRange.max}
            value={price}
            onChange={(e) => handlePriceChange(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{priceRange.min} грн</span>
            <span className="font-semibold">до {price} грн</span>
            <span>{priceRange.max} грн</span>
          </div>
        </div>
      </div>

      <button 
        onClick={() => onFiltersChange({ sizes: selectedSizes, colors: selectedColors, price })}
        className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
      >
        Застосувати фільтри
      </button>
    </div>
  );
}