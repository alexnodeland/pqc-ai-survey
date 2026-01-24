import React from 'react';
import { ExternalLink } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-neon-cyan/10 bg-dark-900 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xs text-slate-600 font-mono tracking-wide">
            <span className="text-slate-500">//</span> NIST FIPS 203/204/205 • Smith & Samuel (2024) • Cryptic Technologies
          </div>
          <div className="flex items-center gap-6 text-xs font-mono">
            <a
              href="https://pq-crystals.org/"
              className="text-slate-500 hover:text-neon-cyan transition-all duration-300 flex items-center gap-1.5 group"
            >
              <span className="group-hover:text-glow-cyan">pq-crystals.org</span>
              <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
            </a>
            <a
              href="https://www.nist.gov/pqcrypto"
              className="text-slate-500 hover:text-neon-cyan transition-all duration-300 flex items-center gap-1.5 group"
            >
              <span className="group-hover:text-glow-cyan">NIST PQC</span>
              <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
            </a>
            <a
              href="https://cryptic-documentation.gitbook.io/cryptic-documentation/"
              className="text-slate-500 hover:text-neon-magenta transition-all duration-300 flex items-center gap-1.5 group"
            >
              <span className="group-hover:text-glow-magenta">Cryptic Docs</span>
              <ExternalLink className="w-3 h-3 opacity-50 group-hover:opacity-100" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
