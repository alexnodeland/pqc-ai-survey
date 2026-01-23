import React, { useState } from 'react';
import { ChevronUp, ChevronDown } from 'lucide-react';

export const CodeBlock = ({ code, language = 'typescript', title }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const lines = code.trim().split('\n');
  const previewLines = lines.slice(0, 8);
  const hasMore = lines.length > 8;

  return (
    <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
      {title && (
        <div className="px-4 py-2 bg-slate-900/50 border-b border-slate-800 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-medium">{title}</span>
          <span className="text-xs text-slate-600">{language}</span>
        </div>
      )}
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono text-slate-300 leading-relaxed min-w-0">
          {isExpanded ? code.trim() : previewLines.join('\n')}
          {!isExpanded && hasMore && (
            <span className="text-slate-600">...</span>
          )}
        </pre>
      </div>
      {hasMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-4 py-2 text-xs text-slate-400 hover:text-white bg-slate-900/30 border-t border-slate-800 flex items-center justify-center gap-1 transition-colors"
        >
          {isExpanded ? (
            <>Show less <ChevronUp className="w-3 h-3" /></>
          ) : (
            <>Show {lines.length - 8} more lines <ChevronDown className="w-3 h-3" /></>
          )}
        </button>
      )}
    </div>
  );
};
