import React, { useState, useEffect, useRef } from 'react';
import { Clock, AlertTriangle, ExternalLink } from 'lucide-react';

const milestones = [
  {
    year: 2024,
    label: 'TODAY',
    sublabel: 'Harvest Active',
    description: 'Adversaries are capturing encrypted traffic now, planning to decrypt it when quantum computers mature.',
    color: 'red',
    isCurrent: true,
    link: null
  },
  {
    year: 2027,
    label: 'HQC Final',
    sublabel: '4th KEM Standard',
    description: 'NIST will finalize HQC as a backup key encapsulation mechanism, providing algorithm diversity.',
    color: 'sky',
    isCurrent: false,
    link: 'https://csrc.nist.gov/projects/post-quantum-cryptography'
  },
  {
    year: 2030,
    label: 'CNSA 2.0',
    sublabel: 'Soft Deadline',
    description: 'NSA requires all National Security Systems to begin PQC migration. Commercial adoption expected.',
    color: 'amber',
    isCurrent: false,
    link: 'https://media.defense.gov/2022/Sep/07/2003071834/-1/-1/0/CSA_CNSA_2.0_ALGORITHMS_.PDF'
  },
  {
    year: 2035,
    label: 'Full PQC',
    sublabel: 'Hard Deadline',
    description: 'NSA mandates complete PQC adoption. Classical-only cryptography will be non-compliant.',
    color: 'emerald',
    isCurrent: false,
    link: 'https://media.defense.gov/2022/Sep/07/2003071834/-1/-1/0/CSA_CNSA_2.0_ALGORITHMS_.PDF'
  }
];

export const QuantumTimeline = () => {
  const [activeMilestone, setActiveMilestone] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const markerRefs = useRef([]);

  const handleMilestoneClick = (idx) => {
    if (activeMilestone === idx) {
      setActiveMilestone(null);
    } else {
      // Calculate position for fixed tooltip
      const marker = markerRefs.current[idx];
      if (marker) {
        const rect = marker.getBoundingClientRect();
        setTooltipPosition({
          top: rect.bottom + 8,
          left: Math.max(8, Math.min(rect.left + rect.width / 2 - 112, window.innerWidth - 232))
        });
      }
      setActiveMilestone(idx);
    }
  };

  const handleMouseEnter = (idx) => {
    const marker = markerRefs.current[idx];
    if (marker) {
      const rect = marker.getBoundingClientRect();
      setTooltipPosition({
        top: rect.bottom + 8,
        left: Math.max(8, Math.min(rect.left + rect.width / 2 - 112, window.innerWidth - 232))
      });
    }
    setActiveMilestone(idx);
  };

  const handleMouseLeave = () => {
    setActiveMilestone(null);
  };

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
    <div className="bg-gradient-to-b from-slate-900/80 to-transparent border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-5 h-5 text-amber-400 flex-shrink-0" />
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">The Quantum Timeline</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-slate-700 to-transparent hidden sm:block" />
        </div>

        {/* Timeline - horizontal scroll on mobile */}
        <div className="relative overflow-x-auto pb-2">
          <div className="min-w-[380px] sm:min-w-0">
            {/* Timeline line */}
            <div className="absolute top-5 sm:top-6 left-0 right-0 h-1 bg-slate-800 rounded-full">
              <div className="absolute inset-y-0 left-0 w-[10%] bg-gradient-to-r from-red-500/50 to-red-500/20 rounded-full" />
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
                  {/* Marker - smaller on mobile */}
                  <div className={`
                    relative z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center cursor-pointer
                    transition-all duration-300 border-2
                    ${milestone.isCurrent
                      ? `bg-red-500/20 border-red-500 shadow-lg shadow-red-500/20`
                      : `bg-slate-900 border-slate-700 hover:border-${milestone.color}-500/50`
                    }
                    ${activeMilestone === idx ? 'scale-110' : ''}
                  `}>
                    {milestone.isCurrent ? (
                      <div className="relative">
                        <div className="absolute inset-0 animate-ping bg-red-500 rounded-full opacity-30" />
                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full" />
                      </div>
                    ) : (
                      <span className={`text-xs sm:text-sm font-bold text-${milestone.color}-400`}>{milestone.year.toString().slice(2)}</span>
                    )}
                  </div>

                  {/* Label */}
                  <div className="mt-2 sm:mt-3 text-center">
                    <div className={`text-[10px] sm:text-xs font-semibold ${milestone.isCurrent ? 'text-red-400' : `text-${milestone.color}-400`}`}>
                      {milestone.label}
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-slate-500">{milestone.sublabel}</div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll hint on mobile */}
        <div className="sm:hidden text-center mt-1">
          <span className="text-[10px] text-slate-600">Swipe to see full timeline</span>
        </div>

        {/* Warning banner - responsive */}
        <div className="mt-4 sm:mt-6 p-2 sm:p-3 bg-red-950/30 border border-red-900/30 rounded-lg flex items-start sm:items-center gap-2 sm:gap-3">
          <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-[11px] sm:text-xs text-red-200/80">
            <span className="font-semibold text-red-300">Harvest Now, Decrypt Later:</span>{' '}
            <span className="hidden sm:inline">Traffic encrypted with classical algorithms today can be stored and decrypted once quantum computers mature.</span>
            <span className="sm:hidden">Traffic captured today can be decrypted by future quantum computers.</span>
          </p>
        </div>
      </div>

      {/* Tooltip - fixed positioning to float over everything */}
      {activeMilestone !== null && activeData && (
        <div
          className="fixed z-[100] w-56"
          style={{ top: tooltipPosition.top, left: tooltipPosition.left }}
        >
          <div className="p-3 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-base font-bold text-${activeData.color}-400`}>{activeData.year}</span>
              {activeData.isCurrent && (
                <span className="px-2 py-0.5 text-[10px] font-semibold bg-red-500/20 text-red-400 rounded-full">NOW</span>
              )}
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-3">{activeData.description}</p>
            {activeData.link && (
              <a
                href={activeData.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] text-sky-400 hover:text-sky-300"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-3 h-3" />
                View source
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
