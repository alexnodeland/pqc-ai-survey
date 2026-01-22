import React, { useState } from 'react';
import { algorithms } from '../data';

export const AlgorithmBadge = ({ algorithm, showDetail = true }) => {
  const [isHovered, setIsHovered] = useState(false);

  const alg = algorithms[algorithm];
  if (!alg) return null;

  const Icon = alg.icon;

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-${alg.color}-950/50 border border-${alg.color}-800/30 text-${alg.color}-300 text-sm cursor-help transition-all ${isHovered ? 'ring-1 ring-' + alg.color + '-500/50 bg-' + alg.color + '-950/70' : ''}`}>
        <Icon className="w-3.5 h-3.5" />
        {alg.aka}
      </span>

      {isHovered && showDetail && (
        <div className={`absolute bottom-full left-0 mb-2 p-4 bg-slate-800 border border-${alg.color}-800/50 rounded-xl shadow-2xl z-30 min-w-[280px]`}>
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-${alg.color}-400 font-semibold`}>{alg.name}</span>
            <span className="text-xs text-slate-500">({alg.aka})</span>
          </div>
          <p className="text-xs text-slate-400 mb-3">{alg.description}</p>
          <div className="grid grid-cols-3 gap-2 text-xs">
            {Object.entries(alg.sizes).map(([key, val]) => (
              <div key={key} className="bg-slate-900/50 rounded p-1.5">
                <div className="text-slate-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                <div className="text-white font-mono">{val}</div>
              </div>
            ))}
            <div className="bg-slate-900/50 rounded p-1.5">
              <div className="text-slate-500">Speed</div>
              <div className={`text-${alg.color}-400 font-mono`}>{alg.speed}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
