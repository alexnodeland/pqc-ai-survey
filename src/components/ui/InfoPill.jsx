import React, { useState } from 'react';

export const InfoPill = ({ label, value, detail, color = 'slate' }) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowDetail(true)}
      onMouseLeave={() => setShowDetail(false)}
    >
      <div className={`px-3 py-1.5 rounded-lg bg-${color}-950/50 border border-${color}-800/30 cursor-help transition-all ${showDetail ? 'ring-1 ring-' + color + '-500/50' : ''}`}>
        <div className="text-xs text-slate-500">{label}</div>
        <div className={`text-sm font-mono text-${color}-300`}>{value}</div>
      </div>
      {showDetail && detail && (
        <div className="absolute top-full left-0 mt-2 p-3 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-20 min-w-[200px] max-w-[300px]">
          <p className="text-xs text-slate-400 leading-relaxed">{detail}</p>
        </div>
      )}
    </div>
  );
};
