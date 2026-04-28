import React from 'react';
import { motion } from 'motion/react';

export function LoadProgressBar({ load }: { load: number }) {
  return (
    <div className="h-4 border border-tokyo-border flex bg-tokyo-bg/50 overflow-hidden p-[1px]">
      <motion.div
        className="h-full bg-tokyo-tertiary"
        animate={{ width: `${load}%` }}
        transition={{ duration: 0.5 }}
      />
    </div>
  );
}
