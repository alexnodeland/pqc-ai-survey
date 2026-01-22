import React from 'react';
import { Shield } from 'lucide-react';
import { Tooltip } from './ui';
import { AlgorithmBadge } from './AlgorithmBadge';

export const Header = () => {
  return (
    <header className="border-b border-slate-800/50 bg-gradient-to-b from-[#0f1629] to-[#0a0f1a]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-5">
            <div className="p-4 bg-gradient-to-br from-emerald-600/20 to-emerald-900/20 rounded-2xl border border-emerald-500/20">
              <Shield className="w-10 h-10 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                Post-Quantum Security for AI
              </h1>
              <p className="text-slate-400 max-w-xl">
                Practical implementation guide for securing LLMs, training pipelines, and probabilistic programs against quantum threats.
              </p>
            </div>
          </div>

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
