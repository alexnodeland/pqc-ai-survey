import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export const InfoPill = ({ label, value, detail, color = 'cyan' }) => {
  const [showDetail, setShowDetail] = useState(false);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
  const containerRef = useRef(null);

  const getNeonColor = () => {
    switch (color) {
      case 'emerald':
      case 'green': return 'neon-green';
      case 'violet':
      case 'magenta': return 'neon-magenta';
      case 'amber': return 'neon-amber';
      case 'red': return 'neon-red';
      case 'sky':
      default: return 'neon-cyan';
    }
  };

  const neonColor = getNeonColor();

  useEffect(() => {
    if (!showDetail || !containerRef.current) return;

    const updatePosition = () => {
      const rect = containerRef.current.getBoundingClientRect();
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      const tooltipWidth = 224; // 14rem
      const padding = 16;

      let top = rect.bottom + scrollY + 8;
      let left = rect.left + scrollX;

      // Constrain horizontal position to viewport
      const maxLeft = window.innerWidth - tooltipWidth - padding + scrollX;
      left = Math.max(padding, Math.min(left, maxLeft));

      setTooltipPos({ top, left });
    };

    updatePosition();
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [showDetail]);

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={() => setShowDetail(true)}
      onMouseLeave={() => setShowDetail(false)}
    >
      <div className={`px-3 py-2 rounded-lg bg-dark-800/50 border border-${neonColor}/20 cursor-help transition-all duration-300 hover:border-${neonColor}/40 ${showDetail ? `border-${neonColor}/50 shadow-${neonColor}` : ''}`}>
        <div className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">{label}</div>
        <div className={`text-sm font-mono font-semibold text-${neonColor}`}>{value}</div>
      </div>
      {showDetail && detail && createPortal(
        <div
          className="fixed z-[9999] p-3 bg-[#0a0f1a] border border-neon-cyan/30 rounded-lg shadow-neon-cyan w-56 max-w-[calc(100vw-2rem)]"
          style={{ top: tooltipPos.top, left: tooltipPos.left }}
        >
          <p className="text-xs text-slate-400 leading-relaxed font-mono">{detail}</p>
        </div>,
        document.body
      )}
    </div>
  );
};
