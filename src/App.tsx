/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
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
import { Home } from './pages/Home';
import { AboutMe } from './pages/AboutMe';
import { Projects } from './pages/Projects';
import { Contact } from './pages/Contact';
import { Wakchu } from './pages/Wakchu';

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [load, setLoad] = useState(74);
  const [input, setInput] = useState('');
  const [currentPage, setCurrentPage] = useState('/home');
  const inputRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    const handleClick = () => {
      if (window.getSelection()?.toString() === '') {
        inputRef.current?.focus();
      }
    };
    document.addEventListener('click', handleClick);
    inputRef.current?.focus();
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const timeString = currentTime.toLocaleTimeString('en-GB', { hour12: false });

  return (
    <div className="min-h-screen flex flex-col font-mono text-tokyo-text overflow-hidden selection:bg-tokyo-primary/30">
      {/* Top Header Bar */}
      <header className="h-10 border-b border-tokyo-border bg-tokyo-surface flex items-center justify-between px-4 shrink-0 shadow-sm z-10">
        <div className="flex items-center gap-6">
          <span className="text-tokyo-primary font-bold text-sm tracking-tight">TERMINAL_V1.0.4</span>
          <nav className="hidden md:flex gap-4">
            <NavItem label="/home" active={currentPage === '/home'} onClick={() => setCurrentPage('/home')} />
            <NavItem label="/wakchu" active={currentPage === '/wakchu'} onClick={() => setCurrentPage('/wakchu')} />
            <NavItem label="/projects" active={currentPage === '/projects'} onClick={() => setCurrentPage('/projects')} />
            <NavItem label="/aboutme" active={currentPage === '/aboutme'} onClick={() => setCurrentPage('/aboutme')} />
            <NavItem label="/contact" active={currentPage === '/contact'} onClick={() => setCurrentPage('/contact')} />
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
            {currentPage === '/home' && <Home load={load} onContactClick={() => setCurrentPage('/contact')} />}
            {currentPage === '/wakchu' && <Wakchu />}
            {currentPage === '/aboutme' && <AboutMe />}
            {currentPage === '/projects' && <Projects />}
            {currentPage === '/contact' && <Contact />}
          </div>

          {/* Prompt Area */}
          <div className="mt-auto border-t border-tokyo-border bg-tokyo-bg p-5 font-mono relative cursor-text">
            <input 
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  const cmd = input.trim().toLowerCase();
                  const pages = ['/home', '/wakchu', '/aboutme', '/projects', '/contact'];
                  if (pages.includes(cmd)) {
                    setCurrentPage(cmd);
                  } else if (cmd === '/about') {
                    setCurrentPage('/aboutme');
                  }
                  setInput('');
                }
              }}
              className="absolute opacity-0 top-0 left-0 w-full h-full z-10 cursor-text"
              autoFocus
              spellCheck={false}
              autoComplete="off"
            />
            <div className="flex items-center gap-3">
              <span className="text-tokyo-primary font-bold shrink-0"><ChevronRight size={18} /></span>
              <div className="flex-grow flex items-center flex-wrap break-all">
                <span className="text-tokyo-text text-sm whitespace-pre-wrap">{input}</span>
                <motion.span 
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 1, ease: "steps(2, start)" }}
                  className="w-2.5 h-5 bg-tokyo-primary inline-block ml-1"
                />
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-5 text-[10px] text-tokyo-muted font-bold uppercase tracking-widest relative z-20">
              <span className="text-white/20">HINTS:</span>
              <HintNavItem label="/projects" onClick={() => setInput('/projects')} />
              <HintNavItem label="/wakchu" onClick={() => setInput('/wakchu')} />
              <HintNavItem label="/aboutme" onClick={() => setInput('/aboutme')} />
              <HintNavItem label="/contact" onClick={() => setInput('/contact')} />
            </div>
          </div>
        </motion.div>
      </main>

      {/* Mobile Sticky Navigation */}
      <nav className="md:hidden sticky bottom-0 left-0 w-full z-50 flex border-t border-tokyo-border bg-tokyo-bg h-14">
        <MobileNavItem icon={<Terminal size={20} />} active={currentPage === '/home'} onClick={() => setCurrentPage('/home')} />
        <MobileNavItem icon={<Layers size={20} />} active={currentPage === '/wakchu'} onClick={() => setCurrentPage('/wakchu')} />
        <MobileNavItem icon={<Code2 size={20} />} active={currentPage === '/projects'} onClick={() => setCurrentPage('/projects')} />
        <MobileNavItem icon={<User size={20} />} active={currentPage === '/aboutme'} onClick={() => setCurrentPage('/aboutme')} />
        <MobileNavItem icon={<Mail size={20} />} active={currentPage === '/contact'} onClick={() => setCurrentPage('/contact')} />
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

function NavItem({ label, active = false, onClick }: { label: string; active?: boolean; onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`
        text-xs font-bold px-2 py-1 transition-all duration-200 uppercase tracking-tighter
        ${active 
          ? 'text-tokyo-primary border-b-2 border-tokyo-primary' 
          : 'text-tokyo-muted hover:bg-tokyo-primary hover:text-tokyo-bg'}
      `}
    >
      {label}
    </button>
  );
}

function HintNavItem({ label, onClick }: { label: string, onClick?: () => void }) {
  return (
    <span onClick={onClick} className="text-tokyo-secondary cursor-pointer hover:text-tokyo-primary transition-colors hover:underline decoration-tokyo-primary underline-offset-4 decoration-2">
      {label}
    </span>
  );
}

function MobileNavItem({ icon, active = false, onClick }: { icon: React.ReactNode; active?: boolean; onClick?: () => void }) {
  return (
    <button onClick={onClick} className={`
      flex-grow flex items-center justify-center transition-all duration-300
      ${active ? 'bg-tokyo-primary text-tokyo-bg' : 'text-tokyo-muted hover:bg-tokyo-surface'}
    `}>
      {icon}
    </button>
  );
}
