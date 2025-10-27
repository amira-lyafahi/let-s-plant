import React from 'react';

const HandPointer: React.FC = () => {
  return (
    <div 
      className="absolute -top-16 left-1/2 -translate-x-1/2 text-5xl z-30 pointer-events-none animate-tap"
      aria-hidden="true"
    >
      <span role="img" aria-label="إصبع يشير للأسفل">👇</span>
    </div>
  );
};

export default HandPointer;
