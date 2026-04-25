import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Briefcase, GraduationCap } from 'lucide-react';
import { InfoBox } from '../components/InfoBox';

export function AboutMe() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl">
      <header className="flex flex-col gap-2">
        <motion.h1 
          className="press-start-2p-regular text-tokyo-secondary text-4xl md:text-5xl font-black tracking-tighter leading-none"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          ABOUT_ME
        </motion.h1>
        <div className="text-[10px] text-tokyo-muted tracking-widest font-bold flex gap-4 uppercase px-1">
          <span>[ ACCESS_LEVEL: PUBLIC ]</span>
        </div>
      </header>

      <section className="border-l-2 border-tokyo-secondary pl-6 py-2 bg-tokyo-surface/20 relative group">
        <div className="absolute -left-[2px] top-0 w-[2px] h-0 bg-tokyo-primary group-hover:h-full transition-all duration-500" />
        <h2 className="press-start-2p-regular text-tokyo-primary font-bold uppercase text-[11px] tracking-widest mb-2 flex items-center gap-2">
          <BookOpen size={12} /> Biography
        </h2>
        <p className="text-tokyo-text font-medium text-sm leading-relaxed">
          // TODO: Add brief text about yourself here.
          <br /><br />
          I am a passionate software developer... (placeholder text). I enjoy building interactive web applications and learning new technologies. My journey in tech started when...
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoBox 
          title="EDUCATION" 
          items={[
            '[2020-2024] B.S. Computer Science - University Name', 
            '[2018-2020] Associate Degree - College Name'
          ]} 
          accent="tertiary"
          icon={<GraduationCap size={14} />}
        />
        <InfoBox 
          title="WORK_HISTORY" 
          items={[
            '[2024-Present] Software Engineer @ TechCorp', 
            '[2022-2024] Junior Developer @ StartupInc'
          ]} 
          accent="secondary"
          icon={<Briefcase size={14} />}
        />
      </div>
    </div>
  );
}
