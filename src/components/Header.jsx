import React from 'react';
import { Shield, Menu, X } from 'lucide-react';
import { Tooltip } from './ui';
import { AlgorithmBadge } from './AlgorithmBadge';

export const Header = ({ isMobileMenuOpen, setIsMobileMenuOpen, onLogoClick }) => {
  return (
    <header className="border-b border-neon-cyan/20 bg-gradient-to-b from-dark-700/90 to-dark-800/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-6">
        <div className="flex items-start justify-between">
          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 -ml-2 mr-2 text-slate-400 hover:text-neon-cyan transition-colors flex-shrink-0"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>

          <button
            onClick={onLogoClick}
            className="flex items-start gap-4 sm:gap-5 flex-1 min-w-0 text-left group"
          >
            <div className="relative p-3 sm:p-4 rounded-xl border border-neon-green/40 bg-dark-800/80 flex-shrink-0 transition-all duration-300 group-hover:shadow-neon-green group-hover:border-neon-green/60">
              <Shield className="w-7 h-7 sm:w-9 sm:h-9 text-neon-green" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold mb-1 sm:mb-2 tracking-tight">
                <span className="text-neon-cyan">PQ</span>
                <span className="text-white">-</span>
                <span className="text-slate-300">AI</span>
                <span className="text-neon-cyan ml-3 text-glow-cyan">SECURITY</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 max-w-xl hidden sm:block font-mono tracking-wide">
                <span className="text-neon-cyan/60">&gt;</span> LLM • Training Pipelines • Probabilistic Programs
              </p>
            </div>
          </button>

          <div className="hidden lg:flex items-center gap-3">
            <Tooltip content="NIST-standardized key encapsulation mechanism" position="bottom">
              <AlgorithmBadge algorithm="kyber" showDetail={false} />
            </Tooltip>
            <Tooltip content="NIST-standardized digital signature algorithm" position="bottom">
              <AlgorithmBadge algorithm="dilithium" showDetail={false} />
            </Tooltip>
            <Tooltip content="Hash-based signature backup standard" position="bottom">
              <AlgorithmBadge algorithm="sphincs" showDetail={false} />
            </Tooltip>
          </div>
        </div>
      </div>
    </header>
  );
};
