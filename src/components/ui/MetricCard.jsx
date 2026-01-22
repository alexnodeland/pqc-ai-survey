import React from 'react';
import { Check, AlertTriangle } from 'lucide-react';

export const MetricCard = ({ label, value, subtext, trend, icon: Icon, color = 'slate' }) => {
  return (
    <div className={`bg-slate-900/50 rounded-xl p-4 border border-slate-800 hover:border-${color}-800/50 transition-all group`}>
      <div className="flex items-start justify-between mb-2">
        <span className="text-xs text-slate-500 uppercase tracking-wide">{label}</span>
        {Icon && <Icon className={`w-4 h-4 text-${color}-500 opacity-50 group-hover:opacity-100 transition-opacity`} />}
      </div>
      <div className={`text-2xl font-bold text-${color}-400 mb-1`}>{value}</div>
      {subtext && <div className="text-xs text-slate-500">{subtext}</div>}
      {trend && (
        <div className={`text-xs mt-2 flex items-center gap-1 ${trend === 'good' ? 'text-emerald-400' : trend === 'warning' ? 'text-amber-400' : 'text-slate-400'}`}>
          {trend === 'good' && <Check className="w-3 h-3" />}
          {trend === 'warning' && <AlertTriangle className="w-3 h-3" />}
          {trend === 'good' ? 'Production ready' : trend === 'warning' ? 'Needs optimization' : ''}
        </div>
      )}
    </div>
  );
};
