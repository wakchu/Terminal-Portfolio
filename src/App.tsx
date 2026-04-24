/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  Code2, 
  User, 
  Mail, 
  Minus, 
  Square, 
  X, 
  ChevronRight, 
  Cpu, 
  Database, 
  Layers, 
  Activity 
} from 'lucide-react';

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [load, setLoad] = useState(74);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const loadTimer = setInterval(() => {
      setLoad(prev => Math.min(95, Math.max(70, prev + (Math.random() * 4 - 2))));
    }, 3000);
    return () => {
      clearInterval(timer);
      clearInterval(loadTimer);
    };
  }, []);

  const timeString = currentTime.toLocaleTimeString('en-GB', { hour12: false });

  return (
    <div className="min-h-screen flex flex-col font-mono text-tokyo-text overflow-hidden selection:bg-tokyo-primary/30">
      {/* Top Header Bar */}
      <header className="h-10 border-b border-tokyo-border bg-tokyo-surface flex items-center justify-between px-4 shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-6">
          <span className="text-tokyo-primary font-bold text-sm tracking-tight">TERMINAL_V1.0.4</span>
          <nav className="hidden md:flex gap-4">
            <NavItem label="/home" active />
            <NavItem label="/projects" />
            <NavItem label="/about" />
            <NavItem label="/contact" />
          </nav>
        </div>
        <div className="flex items-center gap-2 text-tokyo-muted h-full">
          <button className="hover:text-tokyo-primary p-1 transition-colors"><Minus size={16} /></button>
          <button className="hover:text-tokyo-primary p-1 transition-colors"><Square size={14} /></button>
          <button className="hover:text-tokyo-error p-1 transition-colors"><X size={16} /></button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-grow p-4 md:p-8 flex items-center justify-center bg-tokyo-bg overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-5xl border border-tokyo-border bg-tokyo-bg flex flex-col h-[716px] max-h-[85vh] shadow-2xl relative"
        >
          {/* Terminal Window Header */}
          <div className="bg-tokyo-surface px-4 py-1.5 border-b border-tokyo-border flex justify-between items-center shrink-0">
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-tokyo-secondary" />
              <span className="text-tokyo-secondary text-xs font-medium">wakchu@main: ~</span>
            </div>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 bg-tokyo-error"></div>
              <div className="w-2.5 h-2.5 bg-tokyo-warning"></div>
              <div className="w-2.5 h-2.5 bg-tokyo-tertiary"></div>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-grow p-6 md:p-8 overflow-y-auto custom-scrollbar bg-[radial-gradient(circle_at_50%_50%,_rgba(65,72,104,0.05)_0%,_transparent_100%)]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
              
              {/* Left Column: Bio & Info */}
              <div className="md:col-span-8 flex flex-col gap-8">
                <header className="flex flex-col gap-2">
                  <motion.h1 
                    className="text-tokyo-primary text-6xl md:text-8xl font-black tracking-tighter leading-none"
                    initial={{ letterSpacing: '0.1em' }}
                    animate={{ letterSpacing: '-0.05em' }}
                  >
                    WAKCHU
                  </motion.h1>
                  <div className="text-[10px] text-tokyo-muted tracking-widest font-bold flex gap-4 uppercase px-1">
                    <span>[ SYSTEM_ACTIVE: TRUE ]</span>
                    <span>[ VERSION: 1.0.4 ]</span>
                  </div>
                </header>

                <section className="border-l-2 border-tokyo-primary pl-6 py-2 bg-tokyo-surface/20 relative group">
                  <div className="absolute -left-[2px] top-0 w-[2px] h-0 bg-tokyo-secondary group-hover:h-full transition-all duration-500" />
                  <h2 className="text-tokyo-secondary font-bold uppercase text-[11px] tracking-widest mb-2 flex items-center gap-2">
                    <Code2 size={12} /> Definition: Programmer
                  </h2>
                  <p className="text-tokyo-text font-medium italic text-lg leading-relaxed">
                    "A person who writes computer software; an organism that turns caffeine into code."
                  </p>
                </section>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-2">
                  <InfoBox 
                    title="01_CORE_STACK" 
                    items={['Typescript', 'Rust', 'React / Next.js', 'PostgreSQL']} 
                    accent="tertiary"
                    icon={<Database size={14} />}
                  />
                  <InfoBox 
                    title="02_RECENT_TASKS" 
                    items={['[Done] UI Component Revamp', '[Process] Auth Middleware', '[Queue] Performance Audit']} 
                    accent="secondary"
                    icon={<Layers size={14} />}
                  />
                </div>
              </div>

              {/* Right Column: Portrait & Monitor */}
              <div className="md:col-span-4 flex flex-col gap-6">
                <div className="border border-tokyo-border p-1 bg-tokyo-surface relative group">
                  <div className="absolute inset-0 bg-tokyo-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <img 
                    alt="Developer Portrait" 
                    className="w-full aspect-square grayscale contrast-125 brightness-75 mix-blend-screen opacity-80 border border-tokyo-border object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuATvcVyerYg7ni_hyeGQ04i03dU1kFuZgwPiK3EvXElYYwU2MejI37gCO7L6JbriEdjKFcmlGHt_BRAcfSvvD7WOif1UyFOOteZCd-SFk_vNudtNOd-T1REjLy1W9mpZxnDDjVUo8yY9nSYFq52ItputsiGe64JCi-HcSUxIvTiAqe_9q1bKbPu8uK-W34bNIEmyEfwgxav91y1M8PQG6_xGDEdnoZyJtOscefjqr9jnBbzoNiXGkELAAGZeDqOx36RxcFZ23wGcrE"
                  />
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-end text-[10px] text-tokyo-muted font-bold tracking-wider px-1">
                    <span className="flex items-center gap-1"><Activity size={10} /> SYSTEM_LOAD</span>
                    <span className="text-tokyo-tertiary">{Math.round(load)}%</span>
                  </div>
                  <div className="h-5 border border-tokyo-border flex bg-tokyo-bg/50 overflow-hidden p-[2px]">
                    <motion.div 
                      className="h-full bg-tokyo-tertiary"
                      animate={{ width: `${load}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="grid grid-cols-4 gap-1">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className={`h-1 ${i < 3 ? 'bg-tokyo-border' : 'bg-tokyo-primary'}`} />
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Prompt Area */}
          <div className="mt-auto border-t border-tokyo-border bg-tokyo-bg p-5 font-mono">
            <div className="flex items-center gap-3">
              <span className="text-tokyo-primary font-bold"><ChevronRight size={18} /></span>
              <span className="text-tokyo-text text-sm">/home</span>
              <motion.span 
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 1, ease: "steps(2, start)" }}
                className="w-2.5 h-5 bg-tokyo-primary"
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-5 text-[10px] text-tokyo-muted font-bold uppercase tracking-widest">
              <span className="text-white/20">HINTS:</span>
              <HintNavItem label="/projects" />
              <HintNavItem label="/aboutme" />
              <HintNavItem label="/contact" />
              <HintNavItem label="/help" />
            </div>
          </div>
        </motion.div>
      </main>

      {/* Mobile Sticky Navigation */}
      <nav className="md:hidden sticky bottom-0 left-0 w-full z-50 flex border-t border-tokyo-border bg-tokyo-bg h-14">
        <MobileNavItem icon={<Terminal size={20} />} active />
        <MobileNavItem icon={<Code2 size={20} />} />
        <MobileNavItem icon={<User size={20} />} />
        <MobileNavItem icon={<Mail size={20} />} />
      </nav>

      {/* Main Footer Info */}
      <footer className="hidden md:flex justify-between px-6 py-2 border-t border-tokyo-border text-[10px] text-tokyo-muted font-bold tracking-widest bg-tokyo-bg uppercase">
        <div className="flex gap-6">
          <span>UTF-8 | 24:12 | 14ms</span>
          <span className="flex items-center gap-1"><Cpu size={10} /> CONNECTED via SSH_TRANSIT</span>
        </div>
        <div>{timeString} | WAKCHU_OS v1.0.4</div>
      </footer>
    </div>
  );
}

function NavItem({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <a 
      href="#" 
      className={`
        text-xs font-bold px-2 py-1 transition-all duration-200 uppercase tracking-tighter
        ${active 
          ? 'text-tokyo-primary border-b-2 border-tokyo-primary' 
          : 'text-tokyo-muted hover:bg-tokyo-primary hover:text-tokyo-bg'}
      `}
    >
      {label}
    </a>
  );
}

function HintNavItem({ label }: { label: string }) {
  return (
    <a href="#" className="text-tokyo-secondary cursor-pointer hover:text-tokyo-primary transition-colors hover:underline decoration-tokyo-primary underline-offset-4 decoration-2">
      {label}
    </a>
  );
}

function InfoBox({ title, items, accent, icon }: { title: string; items: string[]; accent: 'secondary' | 'tertiary'; icon: React.ReactNode }) {
  const accentColor = accent === 'secondary' ? 'text-tokyo-secondary' : 'text-tokyo-tertiary';
  
  return (
    <div className="border border-tokyo-border p-4 bg-tokyo-surface/40 hover:bg-tokyo-surface/60 transition-colors group">
      <div className="flex items-center justify-between mb-3">
        <span className={`${accentColor} block text-[11px] font-black tracking-widest uppercase`}>
          {title}
        </span>
        <div className="text-tokyo-border group-hover:text-tokyo-muted transition-colors">
          {icon}
        </div>
      </div>
      <ul className="text-tokyo-text font-mono text-[11px] space-y-2 font-medium">
        {items.map((item, idx) => (
          <li key={idx} className="flex gap-2">
            <span className="text-tokyo-muted">{'>'}</span>
            <span className="tracking-tight">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileNavItem({ icon, active = false }: { icon: React.ReactNode; active?: boolean }) {
  return (
    <button className={`
      flex-grow flex items-center justify-center transition-all duration-300
      ${active ? 'bg-tokyo-primary text-tokyo-bg' : 'text-tokyo-muted hover:bg-tokyo-surface'}
    `}>
      {icon}
    </button>
  );
}
