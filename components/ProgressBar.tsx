import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200/50 rounded-full h-6 md:h-8 shadow-inner overflow-hidden border-2 border-white/30">
      <div
        className="bg-green-400 h-full rounded-full transition-all duration-500 ease-out flex items-center justify-end"
        style={{ width: `${progress}%` }}
      >
        <span className="text-sm md:text-base font-bold text-green-900 pr-2">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;