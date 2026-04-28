import React from 'react';
import { motion } from 'motion/react';

export function Wakchu() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl">
      <header className="flex flex-col gap-2">
        <motion.h1
          className="press-start-2p-regular text-tokyo-primary text-3xl md:text-4xl leading-relaxed"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          WAKCHU
        </motion.h1>
        <div className="text-[10px] text-tokyo-muted tracking-widest font-bold flex gap-4 uppercase px-1">
          <span>[ PROFILE: ACTIVE ]</span>
        </div>
      </header>

      <section className="border-l-2 border-tokyo-primary pl-6 py-2 bg-tokyo-surface/20">
        <p className="text-tokyo-text font-medium text-sm leading-relaxed">
          Welcome to the /wakchu section.
        </p>
      </section>
    </div>
  );
}
