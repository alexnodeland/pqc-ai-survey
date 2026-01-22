import React from 'react';
import { ExternalLink } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="border-t border-slate-800/50 bg-[#0a0f1a] mt-16">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-slate-500">
            Based on NIST FIPS 203/204/205, Smith & Samuel (2024), and Cryptic Technologies
          </div>
          <div className="flex items-center gap-6 text-sm">
            <a href="https://pq-crystals.org/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1">
              pq-crystals.org <ExternalLink className="w-3 h-3" />
            </a>
            <a href="https://www.nist.gov/pqcrypto" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1">
              NIST PQC <ExternalLink className="w-3 h-3" />
            </a>
            <a href="https://cryptic-documentation.gitbook.io/cryptic-documentation/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-1">
              Cryptic Docs <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
