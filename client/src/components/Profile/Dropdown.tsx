import React, { useState, useRef, useEffect } from 'react';

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  options: Option[];
  onSelect: (value: string) => void;
  label: string;
  default: string;
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, label, default: defaultValue }) => {
  console.log(defaultValue)
  const [selectedOption, setSelectedOption] = useState<string | null>(defaultValue);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSelect = (value: string) => {
    setSelectedOption(value);
    onSelect(value);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-10 w-64 px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {selectedOption ? (
          <span>{selectedOption}</span>
        ) : (
          <span className="text-gray-400">{label}</span>
        )}
        <svg
          className={`absolute inset-y-0 right-0 w-5 h-5 mt-2 mr-4 ${
            isOpen ? 'text-gray-600' : 'text-gray-400'
          } pointer-events-none transition-transform duration-300 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute z-20 mt-2 w-64 bg-white border border-gray-300 rounded-md shadow-lg">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
