import React from 'react';
import { motion } from 'motion/react';
import { Mail, Linkedin, Github, Twitter, MapPin } from 'lucide-react';

export function Contact() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-2xl mx-auto items-center text-center mt-10">
      <header className="flex flex-col gap-2 items-center">
        <motion.h1 
          className="press-start-2p-regular text-tokyo-primary text-4xl md:text-5xl font-black tracking-tighter leading-none"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          CONTACT_ME
        </motion.h1>
        <div className="text-[10px] text-tokyo-muted tracking-widest font-bold flex gap-4 uppercase px-1">
          <span>[ STATUS: AVAILABLE FOR HIRE ]</span>
        </div>
      </header>

      <p className="text-tokyo-text font-medium text-sm leading-relaxed max-w-md">
        I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
      </p>

      <div className="flex flex-col w-full gap-3 mt-4">
        <ContactLink 
          href="mailto:placeholder@email.com" 
          icon={<Mail size={18} />} 
          label="Email: placeholder@email.com" 
        />
        <ContactLink 
          href="https://linkedin.com/in/placeholder" 
          icon={<Linkedin size={18} />} 
          label="LinkedIn: /in/placeholder" 
        />
        <ContactLink 
          href="https://github.com/wakchu" 
          icon={<Github size={18} />} 
          label="GitHub: wakchu" 
        />
        <ContactLink 
          href="https://twitter.com/placeholder" 
          icon={<Twitter size={18} />} 
          label="Twitter: @placeholder" 
        />
      </div>

      <div className="mt-8 flex items-center gap-2 text-tokyo-muted text-xs font-mono font-bold uppercase tracking-widest">
        <MapPin size={12} />
        <span>Location: Earth</span>
      </div>
    </div>
  );
}

function ContactLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <motion.a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="flex items-center gap-4 p-4 border border-tokyo-border bg-tokyo-surface/40 hover:bg-tokyo-surface hover:border-tokyo-primary transition-all text-tokyo-text hover:text-tokyo-primary font-mono text-sm"
    >
      <div className="text-tokyo-primary">
        {icon}
      </div>
      <span>{label}</span>
    </motion.a>
  );
}
