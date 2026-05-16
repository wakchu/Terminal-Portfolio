import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Briefcase, GraduationCap, Award } from 'lucide-react';

export function AboutMe() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl pb-10">
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
          I'm passionate about technology and software development.
          I'm a curious and determined person, always ready to
          learn and challenge myself. I'm building the foundation to
          become a solid developer through study,
          practical projects, and continuous experimentation.
        </p>
      </section>

      <TimelineSection title="Professional Experience" icon={<Briefcase size={12} />}>
        <TimelineItem
          title="JUNIOR BACKEND DEVELOPER"
          subtitle="FIT s.r.l"
          date="January 2026 - July 2026"
        >
          <p>Internship during which I designed and developed an application for monitoring company applications, handling the entire development cycle.</p>
          <p>The application was built using Laravel 12 and React, and containerized using Docker.</p>
          <p>I developed REST APIs for data management and exposure, implemented real-time communications via WebSocket, and worked with Amazon SQS message queues for asynchronous process management.</p>
        </TimelineItem>
        <TimelineItem
          title="FREELANCE JUNIOR WEB DEVELOPER"
          date="December 2025 - March 2026"
        >
          <p>Development of a digital information platform for an association dedicated to marine protection, allowing members to publish articles and visitors to read them.</p>
          <p>I managed the entire development process, from UX to deployment, building it with React.</p>
          <p>URL: <a href="https://giornalistidelmare.com" target="_blank" rel="noopener noreferrer">giornalistidelmare.com</a></p>
        </TimelineItem>
      </TimelineSection>

      <TimelineSection title="Certifications" icon={<Award size={12} />}>
        <TimelineItem
          title="Oracle OCI AI Foundations Associate"
          date="2025"
        />
        <TimelineItem
          title="Cambridge English Level 1 Certificate in ESOL International"
          date="2023"
        />
      </TimelineSection>

      <TimelineSection title="Education and Training" icon={<GraduationCap size={12} />}>
        <TimelineItem
          title="ITS ANGELO RIZZOLI"
          subtitle="Higher Technical Diploma (EQF level 5)"
          date="October 2024 - July 2026"
        >
          <p>Two-year course focused on the design and development of complex software architectures.</p>
          <p>In-depth study of programming languages, Agile methodologies, cloud computing, and best practices.</p>
        </TimelineItem>
        <TimelineItem
          title="ITSCG Primo Levi"
          subtitle="High School Diploma in Applied Sciences"
          date="September 2019 - July 2024"
        >
          <p>Scientific study path with a strong focus on mathematical, computer science, and experimental disciplines. Development of logical, analytical, and problem-solving skills through laboratories and practical projects.</p>
        </TimelineItem>
      </TimelineSection>
    </div>
  );
}

function TimelineSection({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) {
  return (
    <section className="border-l-2 border-tokyo-secondary pl-6 py-2 bg-tokyo-surface/20 relative group">
      <div className="absolute -left-[2px] top-0 w-[2px] h-0 bg-tokyo-primary group-hover:h-full transition-all duration-500" />
      <h2 className="press-start-2p-regular text-tokyo-primary font-bold uppercase text-[11px] tracking-widest mb-4 flex items-center gap-2">
        {icon} {title}
      </h2>
      <div className="flex flex-col gap-6">
        {children}
      </div>
    </section>
  );
}

function TimelineItem({ title, subtitle, date, children }: { title: string, subtitle?: string, date: string, children?: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-tokyo-text font-bold text-sm">{title}</h3>
      <div className="text-tokyo-muted text-xs font-mono mb-2 flex items-center gap-2">
        <span>{date}</span>
        {subtitle && (
          <>
            <span className="text-tokyo-border">|</span>
            <span className="text-tokyo-secondary">{subtitle}</span>
          </>
        )}
      </div>
      {children && <div className="text-tokyo-text font-medium text-sm leading-relaxed flex flex-col gap-2">{children}</div>}
    </div>
  );
}
