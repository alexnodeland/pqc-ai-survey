import React from 'react';
import { Shield, Menu, X } from 'lucide-react';
import { Tooltip } from './ui';
import { AlgorithmBadge } from './AlgorithmBadge';

export const Header = ({ isMobileMenuOpen, setIsMobileMenuOpen, onLogoClick }) => {
  return (
    <header className="border-b border-slate-800/50 bg-gradient-to-b from-[#0f1629] to-[#0a0f1a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex items-start justify-between">
          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 -ml-2 mr-2 text-slate-400 hover:text-white transition-colors flex-shrink-0"
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
            className="flex items-start gap-3 sm:gap-5 flex-1 min-w-0 text-left hover:opacity-80 transition-opacity"
          >
            <div className="p-3 sm:p-4 bg-gradient-to-br from-emerald-600/20 to-emerald-900/20 rounded-xl sm:rounded-2xl border border-emerald-500/20 flex-shrink-0">
              <Shield className="w-7 h-7 sm:w-10 sm:h-10 text-emerald-400" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                Post-Quantum Security for AI
              </h1>
              <p className="text-sm text-slate-400 max-w-xl hidden sm:block">
                Practical implementation guide for securing LLMs, training pipelines, and probabilistic programs against quantum threats.
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
