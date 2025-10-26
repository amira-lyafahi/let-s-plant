import React from 'react';
import { GameStage } from '../types';

interface TreeStageProps {
  stage: GameStage;
}

const Apple = ({ top, left }: { top: string, left: string }) => (
    <div className={`absolute w-8 h-8 ${top} ${left} bg-red-600 rounded-full shadow-inner flex justify-center items-start`}>
        {/* Stem */}
        <div className="w-1 h-2 bg-yellow-800 rounded-b-full mt-0.5"></div>
        {/* Shine */}
        <div className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full opacity-70"></div>
    </div>
);


const TreeStage: React.FC<TreeStageProps> = ({ stage }) => {
  const stageMap = {
    [GameStage.Start]: null,
    [GameStage.SeedPlanted]: (
      <div className="w-4 h-5 bg-yellow-900 animate-pulse mb-2" style={{ borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }}/>
    ),
    [GameStage.Watered]: (
      <div className="flex flex-col items-center">
        <div className="relative w-1.5 h-16 animate-grow-up">
            <div className="w-full h-full bg-green-600 rounded-t-full" />
            <div className="absolute top-0 left-1/2 w-6 h-6 bg-green-500 rounded-full -translate-x-[80%] -rotate-45" style={{ borderRadius: '60% 40% 30% 70% / 70% 30% 70% 30%' }} />
            <div className="absolute top-0 left-1/2 w-6 h-6 bg-green-500 rounded-full translate-x-[-20%] rotate-45" style={{ borderRadius: '40% 60% 70% 30% / 30% 70% 30% 70%' }}/>
        </div>
      </div>
    ),
    [GameStage.Sunned]: (
      <div className="flex flex-col items-center animate-tree-grow">
        <div className="animate-wind-sway flex flex-col items-center">
          <div className="relative w-28 h-24 mb-[-1rem] animate-leaves-rustle">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-20 bg-green-500 rounded-full opacity-90"></div>
              <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-16 h-16 bg-green-600 rounded-full"></div>
              <div className="absolute top-1/4 right-1/4 translate-x-1/2 w-16 h-16 bg-green-600 rounded-full"></div>
          </div>
          <div className="w-8 h-32 bg-gradient-to-r from-yellow-800 to-yellow-900 rounded-t-lg" />
        </div>
      </div>
    ),
    [GameStage.Harvested]: (
       <div className="flex flex-col items-center animate-tree-grow">
        <div className="animate-wind-sway flex flex-col items-center relative">
          <div className="relative w-56 h-48 mb-[-1.5rem] animate-leaves-rustle">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-green-500/90 rounded-full shadow-xl"></div>
            <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-32 h-32 bg-green-600/95 rounded-full"></div>
            <div className="absolute top-1/4 right-1/4 translate-x-1/2 w-32 h-32 bg-green-600/95 rounded-full"></div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-36 h-36 bg-green-500 rounded-full"></div>
            {/* Apples */}
            <Apple top="top-1/4" left="left-1/4" />
            <Apple top="top-1/2" left="left-[15%]" />
            <Apple top="top-1/3" left="right-1/4" />
            <Apple top="top-3/5" left="right-[30%]" />
            <Apple top="bottom-1/4" left="left-1/2" />
          </div>
          <div className="w-14 h-48 bg-gradient-to-r from-yellow-800 to-yellow-900 rounded-t-xl shadow-lg" />
        </div>
      </div>
    ),
  };

  return (
    <div className="h-full w-full flex items-end justify-center">
      {stageMap[stage]}
    </div>
  );
};

export default TreeStage;
