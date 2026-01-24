import React from 'react';
import { Check, AlertTriangle } from 'lucide-react';

export const MetricCard = ({ label, value, subtext, trend, icon: Icon, color = 'cyan' }) => {
  const getNeonColor = () => {
    switch (color) {
      case 'emerald':
      case 'green': return 'neon-green';
      case 'violet':
      case 'magenta': return 'neon-magenta';
      case 'amber': return 'neon-amber';
      case 'red': return 'neon-red';
      default: return 'neon-cyan';
    }
  };

  const neonColor = getNeonColor();

  return (
    <div className={`card-retro rounded-lg p-4 transition-all duration-300 group hover:border-${neonColor}/40 hover:shadow-${neonColor}`}>
      <div className="flex items-start justify-between mb-2">
        <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">{label}</span>
        {Icon && <Icon className={`w-4 h-4 text-${neonColor} opacity-50 group-hover:opacity-100 transition-opacity`} />}
      </div>
      <div className={`text-2xl font-display font-bold text-${neonColor} mb-1`}>{value}</div>
      {subtext && <div className="text-xs text-slate-500 font-mono">{subtext}</div>}
      {trend && (
        <div className={`text-xs mt-2 flex items-center gap-1.5 font-mono ${trend === 'good' ? 'text-neon-green' : trend === 'warning' ? 'text-neon-amber' : 'text-slate-400'}`}>
          {trend === 'good' && <Check className="w-3 h-3" />}
          {trend === 'warning' && <AlertTriangle className="w-3 h-3" />}
          {trend === 'good' ? 'production_ready' : trend === 'warning' ? 'needs_optimization' : ''}
        </div>
      )}
    </div>
  );
};
