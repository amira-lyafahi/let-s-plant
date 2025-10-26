import React, { useState, useEffect, useCallback } from 'react';
import { GameStage, Tool } from './types';
import ActionButton from './components/ActionButton';
import TreeStage from './components/TreeStage';
import ProgressBar from './components/ProgressBar';

let audioCtx: AudioContext | null = null;
const playSound = (sound: string) => {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    const ctx = audioCtx;
    if (!ctx) return;
    
    const now = ctx.currentTime;
    const gainNode = ctx.createGain();
    gainNode.connect(ctx.destination);

    if (sound === 'click') {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        gainNode.gain.setValueAtTime(0.1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.connect(gainNode);
        osc.start(now);
        osc.stop(now + 0.1);
    } else if (sound === 'success') {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.linearRampToValueAtTime(659.25, now + 0.1);
        gainNode.gain.setValueAtTime(0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.connect(gainNode);
        osc.start(now);
        osc.stop(now + 0.2);
    } else if (sound === 'error') {
        const osc = ctx.createOscillator();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, now);
        gainNode.gain.setValueAtTime(0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.connect(gainNode);
        osc.start(now);
        osc.stop(now + 0.3);
    } else if (sound === 'water') {
        const bufferSize = ctx.sampleRate * 0.5;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) { output[i] = Math.random() * 2 - 1; }
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, now);
        filter.frequency.linearRampToValueAtTime(400, now + 0.4);
        gainNode.gain.setValueAtTime(0.15, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.4);
        noise.connect(filter).connect(gainNode);
        noise.start(now);
        noise.stop(now + 0.5);
    } else if (sound === 'chime') {
        const osc = ctx.createOscillator();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(987.77, now);
        gainNode.gain.setValueAtTime(0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.connect(gainNode);
        osc.start(now);
        osc.stop(now + 0.5);
    } else if (sound === 'harvest') {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(gainNode);
        osc.start(now);
        osc.stop(now + 0.15);
    } else if (sound === 'celebrate') {
        const notes = [523, 659, 783, 1046];
        notes.forEach((freq, i) => {
            const osc = ctx.createOscillator();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + i * 0.15);
            gainNode.gain.setValueAtTime(0.15, now + i * 0.15);
            gainNode.gain.exponentialRampToValueAtTime(0.001, now + i * 0.15 + 0.1);
            osc.connect(gainNode);
            osc.start(now + i * 0.15);
            osc.stop(now + i * 0.15 + 0.1);
        });
    } else if (sound === 'clapping') {
        const claps = 5;
        const clapDuration = 0.2;
        const clapInterval = 0.1;
        for (let i = 0; i < claps; i++) {
            const startTime = now + i * clapInterval;
            const bufferSize = ctx.sampleRate * clapDuration;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const output = buffer.getChannelData(0);
            for (let j = 0; j < bufferSize; j++) {
                output[j] = Math.random() * 2 - 1;
            }
            const noise = ctx.createBufferSource();
            noise.buffer = buffer;
            const filter = ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.value = 1500;
            filter.Q.value = 1.5;
            const clapGain = ctx.createGain();
            clapGain.connect(ctx.destination);
            clapGain.gain.setValueAtTime(0.3, startTime);
            clapGain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.1);
            clapGain.gain.linearRampToValueAtTime(0, startTime + clapDuration);
            noise.connect(filter).connect(clapGain);
            noise.start(startTime);
            noise.stop(startTime + clapDuration);
        }
    }
  } catch (e) {
    console.error(`Could not play sound: ${sound}`, e);
  }
};

const backgroundImage = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA4MDAgNjAwIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9InNreS1ncmFkaWVudCIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiM4N0NFRUI7c3RvcC1vcGFjaXR5OjEiIC8+PHN0b3Agb2Zmc2V0PSIxMDAlIiBzdHlsZT0ic3RvcC1jb2xvcjojQjBEMEU2O3N0b3Atb3BhY2l0eToxIiAvPjwvbGluZWFyR3JhZGllbnQ+PHJhZGlhbEdyYWRpZW50IGlkPSJzdW4tZ3JhZGllbnQiIGN4PSI1MCUiIGN5PSI1MCUiIHI9IjUwJSIgZng9IjUwJSIgZnk9IjUwJSI+PHN0b3Agb2Zmc2V0PSIwJSIgc3R5bGU9InN0b3AtY29sb3I6I0ZGRDcwMDtzdG9wLW9wYWNpdHk6MSIgLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0eWxlPSJzdG9wLWNvbG9yOiNGRkE1MDA7c3RvcC1vcGFjaXR5OjAiIC8+PC9yYWRpYWxHcmFkaWVudD48L2RlZnM+PHJlY3Qgd2lkdGg9IjgwMCIgaGVpZ2h0PSI2MDAiIGZpbGw9InVybCgjc2t5LWdyYWRpZW50KSIgLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjYwIiBmaWxsPSIjRkZENzAwIiAvPjxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgcj0iODAiIGZpbGw9InVybCgjc3VuLWdyYWRpZW50KSIgLz48cGF0aCBkPSJNIDY1MCwxNTAgYSA0MCw0MCAwIDAsMCA2MCwwIGEgMzAsMzAgMCAwLDAgNTAsMjAgYSA0MCw0MCAwIDAsMCA0MCwtMjAgdiAtNTAgaCAtMTUwIHoiIGZpbGw9IiNGRkZGRkYiIG9wYWNpdHk9IjAuOSIgLz48cGF0aCBkPSJNIDI1MCwyMDAgYSAzMCwzMCAwIDAsMCA1MCwwIGEgMjUsMjUgMCAwLDAgNDAsMTUgYSAzMCwzMCAwIDAsMCAzMCwtMTUgdiAtNDAgaCAtMTIwIHoiIGZpbGw9IiNGRkZGRkYiIG9wYWNpdHk9IjAuOCIgLz48cGF0aCBkPSJNIC01MCw2MDAgQyAxNTAsNDUwIDM1MDAsNDUwIDUwMCw2MDAgSCAtNTAgWiIgZmlsbD0iIzkwRUU5MCIgLz48cGF0aCBkPSJNIDMwMCw2MDAgQyA1MDAsNDAwIDcwMCw0MDAgOTAwLDYwMCBIIDMwMCBaIiBmaWxsPSIjM0NCMzcxIiAvPjxwYXRoIGQ9Ik0gLTEwMCw2MDAgQyAyMDAsMzUwIDQwMCwzNTAgNjAwLDYwMCBIIC0xMDAgWiIgZmlsbD0iIzJFOEI1NyIgLz48L3N2Zz4=';


const App: React.FC = () => {
  const [stage, setStage] = useState<GameStage>(GameStage.Start);
  const [message, setMessage] = useState<string>("هيا نزرع شجرتنا!");
  const [isWrong, setIsWrong] = useState<boolean>(false);
  const [showCompletionOverlay, setShowCompletionOverlay] = useState<boolean>(false);
  
  const correctSequence: Tool[] = [Tool.Seed, Tool.Water, Tool.Sun, Tool.Harvest];
  const toolData = [
    { tool: Tool.Seed, label: "بذرة", emoji: "🌰" },
    { tool: Tool.Water, label: "ماء", emoji: "💧" },
    { tool: Tool.Sun, label: "شمس", emoji: "☀️" },
    { tool: Tool.Harvest, label: "قطف", emoji: "🍎" },
  ];

  const clearMessage = useCallback(() => {
    if (stage === GameStage.Start) {
      setMessage("هيا نزرع شجرتنا!");
    } else if (stage < GameStage.Harvested) {
      setMessage("");
    }
  }, [stage]);

  useEffect(() => {
    if (isWrong) {
      const timer = setTimeout(() => setIsWrong(false), 500);
      return () => clearTimeout(timer);
    }
  }, [isWrong]);
  
  useEffect(() => {
    if (message && message !== "هيا نزرع شجرتنا!") {
       const timer = setTimeout(() => {
        clearMessage();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [message, clearMessage]);

  const handleToolClick = (tool: Tool) => {
    playSound('click');
    if (stage === GameStage.Harvested && !showCompletionOverlay) return;

    const expectedTool = correctSequence[stage];

    if (tool === expectedTool) {
      const nextStage = stage + 1;
      setStage(nextStage);
      
      switch(nextStage) {
        case GameStage.SeedPlanted:
          setMessage("أحسنت! لقد زرعت البذرة.");
          playSound('success');
          break;
        case GameStage.Watered:
          setMessage("رائع! أنت تسقي النبتة.");
          playSound('water');
          break;
        case GameStage.Sunned:
          setMessage("ممتاز! الشمس تساعدها على النمو!");
          playSound('chime');
          break;
        case GameStage.Harvested:
          setMessage("🎉 مبروك! لقد زرعت شجرتك وقطفت ثمارها!");
          playSound('clapping');
          setTimeout(() => {
            setShowCompletionOverlay(true);
            playSound('celebrate');
          }, 1500);
          break;
      }
    } else {
      setMessage("🌼 جرب مرة أخرى بالترتيب الصحيح!");
      setIsWrong(true);
      playSound('error');
    }
  };
  
  const resetGame = () => {
    setStage(GameStage.Start);
    setMessage("هيا نزرع شجرتنا!");
    setShowCompletionOverlay(false);
  }
  
  const progressPercentage = (stage / GameStage.Harvested) * 100;

  return (
    <div 
        className="relative w-screen h-screen overflow-hidden flex flex-col items-center justify-between select-none"
        style={{
            backgroundImage: `url('${backgroundImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
        }}
    >
      
      {/* Main Message Area */}
      <div className="h-24 pt-8 flex items-center justify-center transition-opacity duration-500">
          <p className={`text-center text-2xl md:text-4xl font-bold transition-transform duration-300 ${isWrong ? 'animate-shake text-red-500' : 'text-gray-800'}`}>
              {message}
          </p>
      </div>
      
      {/* Progress Bar Area */}
      <div className="w-full px-4 md:px-8 z-10 my-2">
        <ProgressBar progress={progressPercentage} />
      </div>

      {/* Tree display area */}
      <div className="flex-grow flex items-end justify-center w-full z-10 pb-4 h-full">
        <TreeStage stage={stage} />
      </div>

      {/* Controls */}
      <div className="w-full bg-green-600/50 backdrop-blur-sm p-4 z-20">
        <div className="max-w-2xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {toolData.map(({ tool, label, emoji }) => (
                <ActionButton
                    key={tool}
                    label={label}
                    emoji={emoji}
                    onClick={() => handleToolClick(tool)}
                    disabled={(stage === GameStage.Harvested && !showCompletionOverlay) || (stage !== tool && !showCompletionOverlay)}
                    isActive={stage === tool && !showCompletionOverlay}
                />
            ))}
        </div>
      </div>
      
      {/* Completion Overlay */}
      {showCompletionOverlay && (
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center z-30 animate-fade-in">
          <div className="text-9xl animate-bounce">🏅</div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mt-4" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.6)'}}>
            صديق البيئة الصغير
          </h2>
          <button 
            onClick={resetGame}
            className="mt-8 px-8 py-4 bg-yellow-400 text-gray-800 text-2xl font-bold rounded-full shadow-lg hover:bg-yellow-300 transform hover:scale-105 transition-all"
          >
            ازرع مرة أخرى!
          </button>
        </div>
      )}
      
      <a
        href="https://sites.google.com/view/nuha-pf/%D8%A7%D9%84%D8%B1%D8%A6%D9%8A%D8%B3%D9%8A%D8%A9"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-2 inset-x-0 text-center text-xs text-green-900 font-semibold opacity-75 hover:opacity-100 transition-opacity z-40"
      >
        تم تطوير التطبيق من قبل منصة النهى الرقمية
      </a>

      <style>{`
        @keyframes fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 0.5s ease-in-out; }

        @keyframes shake {
            10%, 90% { transform: translate3d(-1px, 0, 0); }
            20%, 80% { transform: translate3d(2px, 0, 0); }
            30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
            40%, 60% { transform: translate3d(4px, 0, 0); }
        }
        .animate-shake { animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both; }

        @keyframes wind-sway {
          from { transform: rotate(-1.5deg); }
          to { transform: rotate(1.5deg); }
        }
        .animate-wind-sway {
          animation: wind-sway 6s ease-in-out infinite alternate;
          transform-origin: bottom center;
        }

        @keyframes grow-up {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
        .animate-grow-up {
          animation: grow-up 0.7s ease-out;
          transform-origin: bottom;
        }

        @keyframes leaves-rustle {
          0%, 100% { transform: rotate(-1deg) scale(1); }
          50% { transform: rotate(1deg) scale(1.02); }
        }
        .animate-leaves-rustle {
          animation: leaves-rustle 8s ease-in-out infinite alternate;
        }

        @keyframes tree-grow {
            from { transform: scale(0.8); opacity: 0.5; }
            to { transform: scale(1); opacity: 1; }
        }
        .animate-tree-grow {
            animation: tree-grow 1s ease-out;
        }

        @keyframes cloud-drift {
            from { transform: translateX(-20px); }
            to { transform: translateX(20px); }
        }
        .animate-cloud-drift {
            animation: cloud-drift 20s ease-in-out infinite alternate;
        }
        @keyframes cloud-drift-slow {
            from { transform: translateX(-10px); }
            to { transform: translateX(10px); }
        }
        .animate-cloud-drift-slow {
            animation: cloud-drift-slow 30s ease-in-out infinite alternate;
        }

      `}</style>
    </div>
  );
};

export default App;