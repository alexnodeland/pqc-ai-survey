import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ExternalLink } from 'lucide-react';
import { algorithms } from '../data';

export const AlgorithmBadge = ({ algorithm, showDetail = true }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHoveringTooltip, setIsHoveringTooltip] = useState(false);
  const containerRef = useRef(null);
  const hideTimeoutRef = useRef(null);

  // Detect touch device
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const tooltipRef = useRef(null);

  // Calculate tooltip position
  useEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const updatePosition = () => {
      const rect = containerRef.current.getBoundingClientRect();
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      const tooltipWidth = 280;
      const padding = 16;

      let top = rect.bottom + scrollY + 8;
      let left = rect.left + scrollX;

      // Constrain horizontal position
      const maxLeft = window.innerWidth - tooltipWidth - padding + scrollX;
      left = Math.max(padding, Math.min(left, maxLeft));

      setTooltipPosition({ top, left });
    };

    updatePosition();
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isOpen]);

  // Close on outside tap for touch devices
  useEffect(() => {
    if (!isOpen || !isTouchDevice) return;

    const handleOutside = (e) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target) &&
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('touchstart', handleOutside);
    document.addEventListener('click', handleOutside);

    return () => {
      document.removeEventListener('touchstart', handleOutside);
      document.removeEventListener('click', handleOutside);
    };
  }, [isOpen, isTouchDevice]);

  const alg = algorithms[algorithm];
  if (!alg) return null;

  const Icon = alg.icon;

  const handleClick = (e) => {
    if (isTouchDevice) {
      e.preventDefault();
      e.stopPropagation();
      setIsOpen(prev => !prev);
    }
  };

  const handleMouseEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      if (!isHoveringTooltip) {
        setIsOpen(false);
      }
    }, 150);
  };

  const handleTooltipMouseEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setIsHoveringTooltip(true);
  };

  const handleTooltipMouseLeave = () => {
    setIsHoveringTooltip(false);
    setIsOpen(false);
  };

  const getNeonColor = () => {
    switch (alg.neonColor) {
      case 'green': return 'neon-green';
      case 'magenta': return 'neon-magenta';
      case 'amber': return 'neon-amber';
      default: return 'neon-cyan';
    }
  };

  const neonColor = getNeonColor();

  return (
    <div
      ref={containerRef}
      className="relative inline-block"
      onMouseEnter={() => !isTouchDevice && handleMouseEnter()}
      onMouseLeave={() => !isTouchDevice && handleMouseLeave()}
      onClick={handleClick}
    >
      <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md font-mono text-xs tracking-wide cursor-help transition-all duration-300 border bg-dark-800/80 border-${neonColor}/30 text-${neonColor} hover:border-${neonColor}/60 hover:shadow-${neonColor} ${isOpen ? `border-${neonColor}/60 shadow-${neonColor}` : ''}`}>
        <Icon className="w-3.5 h-3.5" />
        <span className="font-semibold">{alg.aka}</span>
      </span>

      {isOpen && showDetail && createPortal(
        <div
          ref={tooltipRef}
          className="fixed z-[9999] min-w-[280px] max-w-[calc(100vw-2rem)]"
          style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
          onMouseEnter={handleTooltipMouseEnter}
          onMouseLeave={handleTooltipMouseLeave}
        >
          <div className={`p-4 rounded-lg border border-${neonColor}/30 shadow-${neonColor} bg-[#0a0f1a]`}>
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-${neonColor} font-display font-bold tracking-wide`}>{alg.name}</span>
              <span className="text-xs text-slate-500 font-mono">({alg.aka})</span>
            </div>
            <p className="text-xs text-slate-400 mb-4 font-mono leading-relaxed">{alg.description}</p>
            <div className="grid grid-cols-3 gap-2 text-xs mb-4">
              {Object.entries(alg.sizes).map(([key, val]) => (
                <div key={key} className="bg-dark-800 rounded p-2 border border-slate-800">
                  <div className="text-slate-500 capitalize font-mono text-[10px] mb-0.5">{key.replace(/([A-Z])/g, ' $1')}</div>
                  <div className={`text-${neonColor} font-mono font-semibold`}>{val}</div>
                </div>
              ))}
              <div className="bg-dark-800 rounded p-2 border border-slate-800">
                <div className="text-slate-500 font-mono text-[10px] mb-0.5">Speed</div>
                <div className={`text-${neonColor} font-mono font-semibold`}>{alg.speed}</div>
              </div>
            </div>
            {alg.url && (
              <a
                href={alg.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-neon-cyan hover:text-glow-cyan transition-all font-mono"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-3 h-3" />
                {alg.standard}
              </a>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
