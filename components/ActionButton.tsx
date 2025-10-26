import React from 'react';

interface ActionButtonProps {
  label: string;
  emoji: string;
  onClick: () => void;
  disabled: boolean;
  isActive: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, emoji, onClick, disabled, isActive }) => {
  const baseClasses = "w-full h-24 md:h-32 rounded-2xl flex flex-col items-center justify-center text-gray-800 font-bold text-xl md:text-2xl shadow-lg transition-all duration-200 transform focus:outline-none focus:ring-4 focus:ring-yellow-300";
  const activeClasses = "bg-yellow-500 hover:bg-yellow-400 scale-105 ring-4 ring-yellow-300 ring-offset-2 ring-offset-green-600";
  const disabledClasses = "bg-gray-400 opacity-50 cursor-not-allowed";
  const enabledClasses = "bg-blue-500 hover:bg-blue-400 hover:scale-105";

  const getButtonClasses = () => {
    if (disabled && !isActive) {
      return `${baseClasses} ${disabledClasses}`;
    }
    if (isActive) {
      return `${baseClasses} ${activeClasses}`;
    }
    return `${baseClasses} ${enabledClasses}`;
  };

  return (
    <button
      onClick={onClick}
      className={getButtonClasses()}
      disabled={disabled && !isActive}
    >
      <span className="text-4xl md:text-5xl mb-1">{emoji}</span>
      <span>{label}</span>
    </button>
  );
};

export default ActionButton;