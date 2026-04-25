import React from 'react';
import { motion } from 'motion/react';
import { Code2, Database, Layers, Activity } from 'lucide-react';
import { InfoBox } from '../components/InfoBox';

export function Home({ load }: { load: number }) {
  return (
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
          <div className="text-[10px] text-tokyo-muted tracking-widest font-bold flex gap-4 uppercase px-1">
            <span>[ SYSTEM_ACTIVE: TRUE ]</span>
            <span>[ VERSION: 1.0.4 ]</span>
          </div>
        </header>

        <section className="border-l-2 border-tokyo-primary pl-6 py-2 bg-tokyo-surface/20 relative group">
          <div className="absolute -left-[2px] top-0 w-[2px] h-0 bg-tokyo-secondary group-hover:h-full transition-all duration-500" />
          <h2 className="press-start-2p-regular text-tokyo-secondary font-bold uppercase text-[11px] tracking-widest mb-2 flex items-center gap-2">
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
        <div className="relative overflow-hidden">
          <img
            alt="Developer Portrait"
            className="w-full aspect-square object-cover"
            src="/profile.png"
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
  );
}
