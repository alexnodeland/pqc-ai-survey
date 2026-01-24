import React, { useState } from 'react';
import { ChevronUp, ChevronDown, Terminal } from 'lucide-react';
import { Highlight } from 'prism-react-renderer';
import neonTheme from './neonPrismTheme';

// Map language names to prism language identifiers
const languageMap = {
  typescript: 'tsx',
  javascript: 'jsx',
  python: 'python',
  rust: 'rust',
  go: 'go',
  cpp: 'cpp',
  c: 'c',
};

export const CodeBlock = ({ code, language = 'typescript', title }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const lines = code.trim().split('\n');
  const previewLines = lines.slice(0, 8);
  const hasMore = lines.length > 8;

  const prismLanguage = languageMap[language] || language;
  const displayCode = isExpanded ? code.trim() : previewLines.join('\n');

  return (
    <div className="bg-dark-900 rounded-lg border border-neon-green/20 overflow-hidden shadow-inner-glow">
      {title && (
        <div className="px-4 py-2.5 bg-dark-800/80 border-b border-neon-green/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-neon-green" />
            <span className="text-xs text-neon-green font-display font-semibold tracking-wide">{title}</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">{language}</span>
        </div>
      )}
      <div className="p-4 overflow-x-auto">
        <Highlight theme={neonTheme} code={displayCode} language={prismLanguage}>
          {({ tokens, getLineProps, getTokenProps }) => (
            <pre className="text-sm font-mono leading-relaxed min-w-0 tracking-wide">
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              ))}
              {!isExpanded && hasMore && (
                <span className="text-slate-600">...</span>
              )}
            </pre>
          )}
        </Highlight>
      </div>
      {hasMore && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-4 py-2.5 text-xs font-mono text-slate-400 hover:text-neon-cyan bg-dark-800/50 border-t border-slate-800 flex items-center justify-center gap-1.5 transition-all duration-300 hover:bg-dark-700/50 tracking-wide"
        >
          {isExpanded ? (
            <>
              <span className="text-slate-500">//</span> collapse
              <ChevronUp className="w-3.5 h-3.5" />
            </>
          ) : (
            <>
              <span className="text-slate-500">//</span> expand ({lines.length - 8} more lines)
              <ChevronDown className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      )}
    </div>
  );
};
