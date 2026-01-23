import React, { useState } from 'react';
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
  const [hoveredMilestone, setHoveredMilestone] = useState(null);

  return (
    <div className="bg-gradient-to-b from-slate-900/80 to-transparent border-b border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center gap-3 mb-4">
          <Clock className="w-5 h-5 text-amber-400" />
          <h2 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">The Quantum Timeline</h2>
          <div className="flex-1 h-px bg-gradient-to-r from-slate-700 to-transparent" />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-6 left-0 right-0 h-1 bg-slate-800 rounded-full">
            <div className="absolute inset-y-0 left-0 w-[10%] bg-gradient-to-r from-red-500/50 to-red-500/20 rounded-full" />
          </div>

          {/* Milestones */}
          <div className="relative flex justify-between">
            {milestones.map((milestone, idx) => (
              <div
                key={milestone.year}
                className="relative flex flex-col items-center"
                onMouseEnter={() => setHoveredMilestone(idx)}
                onMouseLeave={() => setHoveredMilestone(null)}
              >
                {/* Marker */}
                <div className={`
                  relative z-10 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer
                  transition-all duration-300 border-2
                  ${milestone.isCurrent
                    ? `bg-red-500/20 border-red-500 shadow-lg shadow-red-500/20`
                    : `bg-slate-900 border-slate-700 hover:border-${milestone.color}-500/50`
                  }
                  ${hoveredMilestone === idx ? 'scale-110' : ''}
                `}>
                  {milestone.isCurrent ? (
                    <div className="relative">
                      <div className="absolute inset-0 animate-ping bg-red-500 rounded-full opacity-30" />
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                    </div>
                  ) : (
                    <span className={`text-sm font-bold text-${milestone.color}-400`}>{milestone.year.toString().slice(2)}</span>
                  )}
                </div>

                {/* Label */}
                <div className="mt-3 text-center">
                  <div className={`text-xs font-semibold ${milestone.isCurrent ? 'text-red-400' : `text-${milestone.color}-400`}`}>
                    {milestone.label}
                  </div>
                  <div className="text-[10px] text-slate-500">{milestone.sublabel}</div>
                </div>

                {/* Hover tooltip - pt-6 creates visual gap while maintaining hover area */}
                {hoveredMilestone === idx && (
                  <div className="absolute top-full z-20 w-64 pt-6">
                    <div className="p-4 bg-slate-800 border border-slate-700 rounded-xl shadow-2xl">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-lg font-bold text-${milestone.color}-400`}>{milestone.year}</span>
                        {milestone.isCurrent && (
                          <span className="px-2 py-0.5 text-[10px] font-semibold bg-red-500/20 text-red-400 rounded-full">NOW</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed mb-3">{milestone.description}</p>
                      {milestone.link && (
                        <a
                          href={milestone.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300"
                        >
                          <ExternalLink className="w-3 h-3" />
                          View source
                        </a>
                      )}
                      {/* Arrow */}
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-800 border-l border-t border-slate-700 rotate-45" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Warning banner */}
        <div className="mt-6 p-3 bg-red-950/30 border border-red-900/30 rounded-lg flex items-center gap-3">
          <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0" />
          <p className="text-xs text-red-200/80">
            <span className="font-semibold text-red-300">Harvest Now, Decrypt Later:</span> Traffic encrypted with classical algorithms today can be stored and decrypted once quantum computers mature.
          </p>
        </div>
      </div>
    </div>
  );
};
