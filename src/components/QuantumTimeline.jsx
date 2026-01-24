import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Clock, AlertTriangle, ExternalLink } from 'lucide-react';

const milestones = [
  {
    year: 2026,
    label: 'NOW',
    sublabel: 'Harvest Active',
    description: 'Adversaries continue capturing encrypted traffic for future quantum decryption. Migration is underway.',
    color: 'red',
    isCurrent: true,
    link: null
  },
  {
    year: 2027,
    label: 'HQC Final',
    sublabel: '4th KEM Standard',
    description: 'NIST finalizes HQC as a backup key encapsulation mechanism, providing algorithm diversity.',
    color: 'sky',
    isCurrent: false,
    link: 'https://csrc.nist.gov/projects/post-quantum-cryptography'
  },
  {
    year: 2030,
    label: 'CNSA 2.0',
    sublabel: 'Soft Deadline',
    description: 'NSA requires National Security Systems to begin PQC migration. Commercial adoption accelerates.',
    color: 'amber',
    isCurrent: false,
    link: 'https://media.defense.gov/2022/Sep/07/2003071834/-1/-1/0/CSA_CNSA_2.0_ALGORITHMS_.PDF'
  },
  {
    year: 2035,
    label: 'Full PQC',
    sublabel: 'Hard Deadline',
    description: 'NSA mandates complete PQC adoption. Classical-only cryptography becomes non-compliant.',
    color: 'emerald',
    isCurrent: false,
    link: 'https://media.defense.gov/2022/Sep/07/2003071834/-1/-1/0/CSA_CNSA_2.0_ALGORITHMS_.PDF'
  }
];

export const QuantumTimeline = () => {
  const [activeMilestone, setActiveMilestone] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [isHoveringTooltip, setIsHoveringTooltip] = useState(false);
  const markerRefs = useRef([]);
  const containerRef = useRef(null);
  const hideTimeoutRef = useRef(null);

  const handleMilestoneClick = (idx) => {
    if (activeMilestone === idx) {
      setActiveMilestone(null);
    } else {
      updateTooltipPosition(idx);
      setActiveMilestone(idx);
    }
  };

  const updateTooltipPosition = (idx) => {
    const marker = markerRefs.current[idx];
    const container = containerRef.current;
    if (marker && container) {
      const markerRect = marker.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // Calculate tooltip width (224px = 14rem)
      const tooltipWidth = 224;
      const padding = 16;

      // Calculate left position, keeping tooltip within container bounds
      let left = markerRect.left + markerRect.width / 2 - tooltipWidth / 2;

      // Constrain to viewport
      const minLeft = padding;
      const maxLeft = window.innerWidth - tooltipWidth - padding;
      left = Math.max(minLeft, Math.min(left, maxLeft));

      setTooltipPosition({
        top: markerRect.bottom + 12,
        left: left
      });
    }
  };

  const handleMouseEnter = (idx) => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    updateTooltipPosition(idx);
    setActiveMilestone(idx);
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => {
      if (!isHoveringTooltip) {
        setActiveMilestone(null);
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
    setActiveMilestone(null);
  };

  // Update position on resize
  useEffect(() => {
    if (activeMilestone === null) return;

    const handleResize = () => updateTooltipPosition(activeMilestone);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [activeMilestone]);

  // Close tooltip when clicking outside
  useEffect(() => {
    if (activeMilestone === null) return;

    const handleClickOutside = (e) => {
      const marker = markerRefs.current[activeMilestone];
      if (marker && !marker.contains(e.target)) {
        setActiveMilestone(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeMilestone]);

  const activeData = activeMilestone !== null ? milestones[activeMilestone] : null;

  return (
    <div ref={containerRef} className="bg-gradient-to-b from-dark-800/80 to-transparent border-b border-neon-cyan/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex items-center gap-3 mb-6">
          <Clock className="w-5 h-5 text-neon-amber" />
          <h2 className="text-xs font-display font-bold text-neon-amber uppercase tracking-widest">
            QUANTUM_TIMELINE
          </h2>
          <div className="flex-1 h-px bg-gradient-to-r from-neon-amber/30 to-transparent hidden sm:block" />
        </div>

        {/* Timeline - horizontal scroll on mobile, padding for glow effects */}
        <div className="relative overflow-x-auto pb-4 pt-2 -mx-2 px-2">
          <div className="min-w-[400px] sm:min-w-0 py-2">
            {/* Timeline line - adjusted for py-2 padding */}
            <div className="absolute top-9 sm:top-10 left-0 right-0 h-0.5 bg-slate-800 rounded-full">
              <div className="absolute inset-y-0 left-0 w-[10%] bg-gradient-to-r from-neon-red/60 to-neon-red/20 rounded-full shadow-neon-red" />
            </div>

            {/* Milestones */}
            <div className="relative flex justify-between">
              {milestones.map((milestone, idx) => (
                <div
                  key={milestone.year}
                  ref={el => markerRefs.current[idx] = el}
                  className="relative flex flex-col items-center"
                  onMouseEnter={() => handleMouseEnter(idx)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleMilestoneClick(idx)}
                >
                  {/* Marker */}
                  <div className={`
                    relative z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center cursor-pointer
                    transition-all duration-300 border-2
                    ${milestone.isCurrent
                      ? `bg-neon-red/20 border-neon-red shadow-neon-red`
                      : `bg-dark-800 border-slate-700 hover:border-neon-cyan hover:shadow-neon-cyan`
                    }
                    ${activeMilestone === idx ? 'scale-110' : ''}
                  `}>
                    {milestone.isCurrent ? (
                      <div className="relative">
                        <div className="absolute inset-0 animate-ping bg-neon-red rounded-full opacity-30" />
                        <div className="w-3 h-3 sm:w-3.5 sm:h-3.5 bg-neon-red rounded-full shadow-neon-red-lg" />
                      </div>
                    ) : (
                      <span className={`text-sm sm:text-base font-display font-bold text-${milestone.color}-400`}>
                        {milestone.year.toString().slice(2)}
                      </span>
                    )}
                  </div>

                  {/* Label */}
                  <div className="mt-3 sm:mt-4 text-center">
                    <div className={`text-[11px] sm:text-xs font-display font-bold tracking-widest ${
                      milestone.isCurrent ? 'text-neon-red text-glow-red' : `text-${milestone.color}-400`
                    }`}>
                      {milestone.label}
                    </div>
                    <div className="text-[10px] sm:text-[11px] text-slate-500 font-mono mt-0.5">{milestone.sublabel}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint on mobile */}
        <div className="sm:hidden text-center mt-1">
          <span className="text-[10px] text-slate-600 font-mono">// swipe for full timeline</span>
        </div>

        {/* Warning banner */}
        <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-neon-red/5 border border-neon-red/20 rounded-lg flex items-start sm:items-center gap-3">
          <AlertTriangle className="w-4 h-4 text-neon-red flex-shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-[11px] sm:text-xs text-slate-300 font-mono">
            <span className="font-bold text-neon-red">HARVEST_NOW_DECRYPT_LATER:</span>{' '}
            <span className="text-slate-400">Traffic encrypted with classical algorithms today can be stored and decrypted once quantum computers mature.</span>
          </p>
        </div>
      </div>

      {/* Tooltip - rendered via portal for proper layering */}
      {activeMilestone !== null && activeData && createPortal(
        <div
          className="fixed z-[9999] w-56"
          style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
          onMouseEnter={handleTooltipMouseEnter}
          onMouseLeave={handleTooltipMouseLeave}
        >
          <div className="p-4 bg-[#0a0f1a] border border-neon-cyan/30 rounded-lg shadow-neon-cyan">
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-lg font-display font-bold text-${activeData.color}-400`}>{activeData.year}</span>
              {activeData.isCurrent && (
                <span className="px-2 py-0.5 text-[10px] font-display font-bold bg-neon-red/20 text-neon-red rounded tracking-widest">NOW</span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-3 font-mono">{activeData.description}</p>
            {activeData.link && (
              <a
                href={activeData.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[11px] text-neon-cyan hover:text-glow-cyan font-mono"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-3 h-3" />
                view_source
              </a>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
