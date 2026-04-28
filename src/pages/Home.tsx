import React from 'react';
import { motion } from 'motion/react';
import { Code2, Database, Layers, Activity, Mail } from 'lucide-react';
import { InfoBox } from '../components/InfoBox';
import AsciiPotrait from '../components/asciiPotrait.jsx';
import { LoadProgressBar } from '../components/LoadProgressBar';
import { LoadSegmentIndicator } from '../components/LoadSegmentIndicator';

export function Home({ load, onContactClick }: { load: number; onContactClick: () => void }) {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
        {/* Left Column: Bio & Info */}
        <div className="md:col-span-8 flex flex-col gap-8">
          <header className="flex flex-col gap-2">
            <motion.h1
              className="press-start-2p-regular text-tokyo-primary text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-relaxed"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              Wakchu
            </motion.h1>
            <p className="text-tokyo-text font-semibold text-sm sm:text-base md:text-lg px-1">
              Junior Software Developer
            </p>
            <div className="text-[10px] text-tokyo-muted tracking-widest font-bold flex gap-4 uppercase px-1">
              <span>[ SYSTEM_ACTIVE: TRUE ]</span>
              <span>[ VERSION: 1.0.4 ]</span>
            </div>
          </header>

          <section className="border-l-2 border-tokyo-primary pl-6 py-2 bg-tokyo-surface/20 relative group">
            <div className="absolute -left-[2px] top-0 w-[2px] h-0 bg-tokyo-secondary group-hover:h-full transition-all duration-500" />
            <h2 className="press-start-2p-regular text-tokyo-secondary font-bold uppercase text-[11px] tracking-widest mb-2 flex items-center gap-2">
              <Code2 size={12} /> Definition: Wakchu
            </h2>
            <p className="text-tokyo-text font-medium italic text-lg leading-relaxed">
              "From Quechua, often used to indicate something isolated, unique, or standing alone. In some dialects, it describes an animal straying from the herd or a plant growing alone."
            </p>
          </section>
        </div>

        {/* Right Column: Portrait & Monitor */}
        <div className="md:col-span-4 flex flex-col gap-6">
          <div className="w-full aspect-[5/4]">
            <AsciiPotrait style={{}} />
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-end text-[10px] text-tokyo-muted font-bold tracking-wider px-1">
              <span className="flex items-center gap-1"><Activity size={10} /> SYSTEM_LOAD</span>
              <span className="text-tokyo-tertiary">{Math.round(load)}%</span>
            </div>
            <LoadProgressBar load={load} />
            <LoadSegmentIndicator />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 [grid-auto-rows:1fr]">
        <InfoBox
          title="01_CORE_STACK"
          items={['Laravel', 'Typescript', 'React', 'MySql']}
          accent="tertiary"
          icon={<Database size={14} />}
        />
        <InfoBox
          title="02_TLDR"
          text="I'm passionate about technology and software development. I'm a curious and determined person, always ready to learn and challenge myself. I'm building the foundation to become a solid developer through study, practical projects, and continuous experimentation."
          accent="secondary"
          icon={<Layers size={14} />}
        />
        <div
          role="button"
          tabIndex={0}
          onClick={onContactClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onContactClick();
            }
          }}
          className="h-full cursor-pointer"
        >
          <InfoBox
            title="03_CONTACT"
            items={['Email', 'LinkedIn', 'GitHub', 'Twitter']}
            accent="secondary"
            icon={<Mail size={14} />}
          />
        </div>
      </div>
    </div>
  );
}
