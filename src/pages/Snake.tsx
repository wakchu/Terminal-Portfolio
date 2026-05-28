import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, RotateCcw, Volume2, VolumeX, Gamepad2, Trophy, Zap } from 'lucide-react';

interface Point {
  x: number;
  y: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
}

const GRID_SIZE = 20;
const CELL_COUNT_X = 40; // 40 columns
const CELL_COUNT_Y = 20; // 20 rows (increased height by 33% for larger play area)

export function Snake() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Game states
  const [snake, setSnake] = useState<Point[]>([
    { x: 20, y: 9 },
    { x: 20, y: 10 },
    { x: 20, y: 11 },
  ]);
  const [direction, setDirection] = useState<Point>({ x: 0, y: -1 }); // Moving up
  const [nextDirection, setNextDirection] = useState<Point>({ x: 0, y: -1 });
  const [food, setFood] = useState<Point>({ x: 5, y: 5 });
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(() => {
    const saved = localStorage.getItem('wakchu_snake_highscore');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(130); // Game tick in ms

  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  // Retro sound generator
  const playSound = useCallback((type: 'eat' | 'gameover' | 'click') => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      if (type === 'eat') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(350, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);
        
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.12);
      } else if (type === 'gameover') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(55, ctx.currentTime + 0.5);
        
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      } else if (type === 'click') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      }
    } catch (e) {
      // Audio context blocked by browser autoplay policy or not supported
    }
  }, [soundEnabled]);

  // Generate random food position not on snake
  const generateFood = useCallback((currentSnake: Point[]): Point => {
    let newFood: Point;
    let onSnake = true;
    while (onSnake) {
      newFood = {
        x: Math.floor(Math.random() * CELL_COUNT_X),
        y: Math.floor(Math.random() * CELL_COUNT_Y),
      };
      onSnake = currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
    }
    return newFood!;
  }, []);

  // Spawn visual particles
  const spawnParticles = useCallback((x: number, y: number, color: string) => {
    const px = x * GRID_SIZE + GRID_SIZE / 2;
    const py = y * GRID_SIZE + GRID_SIZE / 2;
    const count = 12;
    
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 1.5 + Math.random() * 2.5;
      particlesRef.current.push({
        x: px,
        y: py,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: 1.5 + Math.random() * 2,
        color,
        alpha: 1.0,
        decay: 0.03 + Math.random() * 0.04,
      });
    }
  }, []);

  // Initialize/Reset game
  const resetGame = () => {
    setSnake([
      { x: 20, y: 9 },
      { x: 20, y: 10 },
      { x: 20, y: 11 },
    ]);
    const initDir = { x: 0, y: -1 };
    setDirection(initDir);
    setNextDirection(initDir);
    const initialSnake = [
      { x: 20, y: 9 },
      { x: 20, y: 10 },
      { x: 20, y: 11 },
    ];
    setFood(generateFood(initialSnake));
    setScore(0);
    setSpeed(130);
    setGameOver(false);
    setIsPaused(false);
    setIsStarted(true);
    particlesRef.current = [];
    playSound('click');
  };

  // Input direction handlers
  const changeDirection = useCallback((newDir: Point) => {
    if (!isStarted || isPaused || gameOver) return;
    
    // Prevent 180 degree instant turns
    const isOpposite = (newDir.x !== 0 && direction.x === -newDir.x) || 
                       (newDir.y !== 0 && direction.y === -newDir.y);
    
    if (!isOpposite) {
      setNextDirection(newDir);
    }
  }, [direction, isStarted, isPaused, gameOver]);

  // Handle keyboard inputs
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault(); // Prevent scrolling
      }

      if (gameOver) {
        if (e.key === 'Enter' || e.key === ' ') {
          resetGame();
        }
        return;
      }

      if (!isStarted) {
        if (e.key === 'Enter' || e.key === ' ') {
          resetGame();
        }
        return;
      }

      switch (e.key.toLowerCase()) {
        case 'arrowup':
        case 'w':
          changeDirection({ x: 0, y: -1 });
          break;
        case 'arrowdown':
        case 's':
          changeDirection({ x: 0, y: 1 });
          break;
        case 'arrowleft':
        case 'a':
          changeDirection({ x: -1, y: 0 });
          break;
        case 'arrowright':
        case 'd':
          changeDirection({ x: 1, y: 0 });
          break;
        case 'p':
        case 'escape':
          setIsPaused(prev => {
            playSound('click');
            return !prev;
          });
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [changeDirection, gameOver, isStarted, playSound]);

  // Primary Game Tick Loop
  useEffect(() => {
    if (!isStarted || isPaused || gameOver) return;

    const gameTick = () => {
      setSnake(prevSnake => {
        // Use the locked nextDirection to update current direction
        setDirection(nextDirection);
        
        const head = prevSnake[0];
        const newHead = {
          x: head.x + nextDirection.x,
          y: head.y + nextDirection.y,
        };

        // Collision Check: Walls
        if (
          newHead.x < 0 ||
          newHead.x >= CELL_COUNT_X ||
          newHead.y < 0 ||
          newHead.y >= CELL_COUNT_Y
        ) {
          setGameOver(true);
          playSound('gameover');
          return prevSnake;
        }

        // Collision Check: Self (excluding the tail block, which moves out of the way)
        const hitSelf = prevSnake.slice(0, -1).some(
          segment => segment.x === newHead.x && segment.y === newHead.y
        );
        if (hitSelf) {
          setGameOver(true);
          playSound('gameover');
          return prevSnake;
        }

        // Eating Check
        const ateFood = newHead.x === food.x && newHead.y === food.y;
        const newSnake = [newHead, ...prevSnake];

        if (ateFood) {
          playSound('eat');
          spawnParticles(food.x, food.y, '#f7768e');
          
          setScore(prevScore => {
            const nextScore = prevScore + 10;
            if (nextScore > highScore) {
              setHighScore(nextScore);
              localStorage.setItem('wakchu_snake_highscore', nextScore.toString());
            }
            return nextScore;
          });

          // Scale speed based on score (faster as score increases)
          setSpeed(prevSpeed => Math.max(65, 130 - Math.floor((score + 10) / 30) * 4));
          setFood(generateFood(newSnake));
        } else {
          newSnake.pop(); // Remove tail
        }

        return newSnake;
      });
    };

    const intervalId = setInterval(gameTick, speed);
    return () => clearInterval(intervalId);
  }, [isStarted, isPaused, gameOver, nextDirection, food, speed, playSound, generateFood, spawnParticles, score, highScore]);

  // Animation Frame Loop for Canvas rendering and particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let localFrameId: number;

    const render = () => {
      // Clear Canvas with terminal background color
      ctx.fillStyle = '#1a1b26'; // Matches terminal window bg
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw subtle grid lines
      ctx.strokeStyle = '#414868';
      ctx.lineWidth = 0.2;
      // Vertical lines
      for (let i = 0; i <= CELL_COUNT_X; i++) {
        ctx.beginPath();
        ctx.moveTo(i * GRID_SIZE, 0);
        ctx.lineTo(i * GRID_SIZE, canvas.height);
        ctx.stroke();
      }
      // Horizontal lines
      for (let i = 0; i <= CELL_COUNT_Y; i++) {
        ctx.beginPath();
        ctx.moveTo(0, i * GRID_SIZE);
        ctx.lineTo(canvas.width, i * GRID_SIZE);
        ctx.stroke();
      }

      // Draw Food
      const foodX = food.x * GRID_SIZE + GRID_SIZE / 2;
      const foodY = food.y * GRID_SIZE + GRID_SIZE / 2;
      const pulseRadius = (GRID_SIZE / 2 - 2) + Math.sin(Date.now() / 100) * 1.5;
      
      ctx.shadowBlur = 12;
      ctx.shadowColor = '#f7768e';
      ctx.fillStyle = '#f7768e'; // Tokyo Error cherry color
      ctx.beginPath();
      ctx.arc(foodX, foodY, pulseRadius, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0; // Reset shadow

      // Draw Snake
      snake.forEach((segment, index) => {
        const isHead = index === 0;
        const x = segment.x * GRID_SIZE;
        const y = segment.y * GRID_SIZE;
        
        ctx.shadowBlur = isHead ? 10 : 0;
        ctx.shadowColor = '#bb9af7';

        // Draw body with beautiful color gradient (lavender to cyan-blue)
        const red = Math.max(122, 187 - index * 8);
        const green = Math.max(100, 154 - index * 6);
        const blue = Math.max(220, 247 - index * 2);
        ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;

        if (isHead) {
          // Rounded square head
          ctx.beginPath();
          ctx.roundRect(x + 1, y + 1, GRID_SIZE - 2, GRID_SIZE - 2, 4);
          ctx.fill();
          
          // Draw pixel eye looking in current direction
          ctx.fillStyle = '#ffffff';
          let eyeX = x + GRID_SIZE / 2;
          let eyeY = y + GRID_SIZE / 2;
          if (direction.x > 0) { eyeX += 4; eyeY -= 3; }
          else if (direction.x < 0) { eyeX -= 4; eyeY -= 3; }
          else if (direction.y > 0) { eyeX -= 3; eyeY += 4; }
          else if (direction.y < 0) { eyeX -= 3; eyeY -= 4; }

          ctx.fillRect(eyeX - 1, eyeY - 1, 3, 3);
          ctx.fillStyle = '#000000';
          ctx.fillRect(eyeX, eyeY, 1, 1);
        } else {
          // Rounded body segments
          ctx.beginPath();
          ctx.roundRect(x + 2, y + 2, GRID_SIZE - 4, GRID_SIZE - 4, 3);
          ctx.fill();
        }
      });
      ctx.shadowBlur = 0; // Reset shadow

      // Draw & Update Particles
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      localFrameId = requestAnimationFrame(render);
    };

    localFrameId = requestAnimationFrame(render);
    animationFrameRef.current = localFrameId;

    return () => {
      if (localFrameId) cancelAnimationFrame(localFrameId);
    };
  }, [snake, food, direction]);

  return (
    <div className="flex flex-col items-center gap-3 select-none max-w-full">
      {/* Header & Stats Dashboard Container */}
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl gap-3 border-b border-tokyo-border/30 pb-2.5">
        {/* Page Header */}
        <div className="text-center md:text-left flex flex-col gap-1">
          <h1 className="press-start-2p-regular text-tokyo-primary text-xl sm:text-2xl flex items-center justify-center md:justify-start gap-2.5">
            <Gamepad2 className="text-tokyo-primary animate-pulse" size={24} />
            SNAKE_OS
          </h1>
          <p className="text-tokyo-muted text-xs font-bold uppercase tracking-widest mt-0.5">
            [ PURE_CANVAS_ARCADE v1.2.0 ]
          </p>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-tokyo-surface/40 border border-tokyo-border py-1.5 px-4 rounded-none font-mono text-xs max-w-xl">
          <div className="flex flex-col items-center px-2">
            <span className="text-[9px] text-tokyo-muted font-bold tracking-widest uppercase">SCORE</span>
            <span className="text-base font-black text-tokyo-text">{score}</span>
          </div>
          <div className="flex flex-col items-center border-l border-tokyo-border/50 px-3">
            <span className="text-[9px] text-tokyo-muted font-bold tracking-widest uppercase flex items-center gap-1">
              <Trophy size={9} className="text-tokyo-warning" /> HI_SCORE
            </span>
            <span className="text-base font-black text-tokyo-warning">{highScore}</span>
          </div>
          <div className="flex flex-col items-center border-l border-tokyo-border/50 px-3">
            <span className="text-[9px] text-tokyo-muted font-bold tracking-widest uppercase flex items-center gap-1">
              <Zap size={9} className="text-tokyo-tertiary" /> SPEED
            </span>
            <span className="text-base font-black text-tokyo-tertiary">
              {Math.round(1000 / speed)}/s
            </span>
          </div>
          <div className="flex flex-col items-center border-l border-tokyo-border/50 px-3">
            <span className="text-[9px] text-tokyo-muted font-bold tracking-widest uppercase">AUDIO</span>
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                playSound('click');
              }}
              className="text-tokyo-primary hover:text-tokyo-text mt-0.5 p-0.5 transition-colors focus:outline-none cursor-pointer"
              title="Toggle Audio"
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Screen Wrapper with Retro CRT Scanline Overlay */}
      <div className="relative border border-tokyo-border bg-tokyo-bg shadow-2xl p-1 w-full max-w-4xl overflow-hidden">
        {/* Shadow Overlay */}
        <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.6)] pointer-events-none z-10" />
        
        {/* CRT Scanline Filter effect */}
        <div className="absolute inset-0 pointer-events-none z-20 opacity-25 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />
        
        <canvas
          ref={canvasRef}
          width={800}
          height={400}
          className="block w-full h-[230px] sm:h-[285px] md:h-[340px]"
        />

        {/* Start Game & Game Over Overlays */}
        {(!isStarted || gameOver) && (
          <div className="absolute inset-0 bg-tokyo-bg/95 flex flex-col items-center justify-center p-6 text-center z-30 font-mono">
            <h3 className="press-start-2p-regular text-tokyo-error text-lg mb-4 leading-relaxed animate-bounce">
              {gameOver ? 'GAME_OVER' : 'READY_PLAYER_ONE'}
            </h3>
            {gameOver && (
              <p className="text-tokyo-text text-sm mb-6 uppercase tracking-wider">
                FINAL SCORE: <span className="text-tokyo-primary font-black">{score}</span>
              </p>
            )}
            <button
              onClick={resetGame}
              className="px-6 py-2.5 border-2 border-tokyo-primary text-tokyo-primary hover:bg-tokyo-primary hover:text-tokyo-bg font-bold tracking-widest uppercase transition-all duration-300 shadow-[0_0_15px_rgba(187,154,247,0.3)] hover:shadow-[0_0_25px_rgba(187,154,247,0.6)] cursor-pointer"
            >
              {gameOver ? 'REPLAY_SYSTEM' : 'START_SYSTEM'}
            </button>
            <p className="text-[10px] text-tokyo-muted mt-6 uppercase tracking-widest font-semibold">
              Press SPACE or ENTER to launch
            </p>
          </div>
        )}

        {/* Pause Overlay */}
        {isStarted && isPaused && !gameOver && (
          <div className="absolute inset-0 bg-tokyo-bg/90 flex flex-col items-center justify-center p-6 text-center z-30 font-mono">
            <h3 className="press-start-2p-regular text-tokyo-secondary text-lg mb-6 leading-relaxed animate-pulse">
              PAUSED
            </h3>
            <button
              onClick={() => {
                setIsPaused(false);
                playSound('click');
              }}
              className="px-6 py-2.5 border-2 border-tokyo-secondary text-tokyo-secondary hover:bg-tokyo-secondary hover:text-tokyo-bg font-bold tracking-widest uppercase transition-all duration-300 cursor-pointer"
            >
              RESUME
            </button>
          </div>
        )}
      </div>

      {/* Footer / Instructions HUD */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-4xl border-t border-tokyo-border/30 pt-3.5 mt-1">
        {/* Left Side: Keyboard instructions */}
        <div className="text-[10px] text-tokyo-muted text-center sm:text-left uppercase tracking-widest font-semibold font-mono leading-relaxed">
          Controls: WASD / ARROWS to steer | P to pause | SPACE / ENTER to start
        </div>
        
        {/* Right Side: Reset button */}
        {isStarted && (
          <button
            onClick={resetGame}
            className="flex items-center gap-1.5 text-[10px] font-bold text-tokyo-muted hover:text-tokyo-error hover:border-tokyo-error border border-dashed border-tokyo-border px-3 py-1.5 transition-all cursor-pointer uppercase font-mono"
          >
            <RotateCcw size={12} /> RESET_SYSTEM
          </button>
        )}
      </div>
    </div>
  );
}
