import React from 'react';

export function InfoBox({ title, items, accent, icon }: { title: string; items: string[]; accent: 'secondary' | 'tertiary'; icon: React.ReactNode }) {
  const accentColor = accent === 'secondary' ? 'text-tokyo-secondary' : 'text-tokyo-tertiary';
  
  return (
    <div className="border border-tokyo-border p-4 bg-tokyo-surface/40 hover:bg-tokyo-surface/60 transition-colors group">
      <div className="flex items-center justify-between mb-3">
        <span className={`press-start-2p-regular ${accentColor} block text-[11px] font-black tracking-widest uppercase`}>
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
