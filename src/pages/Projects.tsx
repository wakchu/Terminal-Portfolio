import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FolderGit2, Star, GitFork, ExternalLink } from 'lucide-react';

interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
}

export function Projects() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://api.github.com/users/wakchu/repos?sort=updated&per_page=6')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch projects');
        return res.json();
      })
      .then(data => {
        setRepos(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col gap-8 w-full">
      <header className="flex flex-col gap-2">
        <motion.h1 
          className="press-start-2p-regular text-tokyo-tertiary text-4xl md:text-5xl font-black tracking-tighter leading-none"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          PROJECTS
        </motion.h1>
        <div className="text-[10px] text-tokyo-muted tracking-widest font-bold flex gap-4 uppercase px-1">
          <span>[ GITHUB_SYNC: ACTIVE ]</span>
          <span>[ USER: WAKCHU ]</span>
        </div>
      </header>

      {loading && (
        <div className="text-tokyo-primary font-mono text-sm animate-pulse">
          Fetching data from GitHub API...
        </div>
      )}

      {error && (
        <div className="text-tokyo-error font-mono text-sm border border-tokyo-error/50 p-4 bg-tokyo-error/10">
          [ERROR]: {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {repos.map((repo, i) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="border border-tokyo-border p-4 bg-tokyo-surface/40 hover:bg-tokyo-surface/80 hover:border-tokyo-tertiary transition-all group flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="press-start-2p-regular text-tokyo-tertiary font-bold text-sm flex items-center gap-2">
                  <FolderGit2 size={14} />
                  {repo.name}
                </h3>
                <ExternalLink size={12} className="text-tokyo-muted group-hover:text-tokyo-tertiary" />
              </div>
              <p className="text-tokyo-text text-xs leading-relaxed flex-grow mb-4 opacity-80">
                {repo.description || 'No description provided.'}
              </p>
              <div className="flex items-center gap-4 text-[10px] text-tokyo-muted font-bold font-mono">
                {repo.language && (
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-tokyo-primary inline-block"></span>
                    {repo.language}
                  </span>
                )}
                <span className="flex items-center gap-1"><Star size={10} /> {repo.stargazers_count}</span>
                <span className="flex items-center gap-1"><GitFork size={10} /> {repo.forks_count}</span>
              </div>
            </motion.a>
          ))}
        </div>
      )}
    </div>
  );
}
