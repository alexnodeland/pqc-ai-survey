import React from 'react';
import { ExternalLink } from 'lucide-react';

/**
 * A reusable component for rendering reference links
 * Renders as a clickable link if URL is provided, otherwise as plain text
 */
export const ReferenceLink = ({
  reference,
  className = '',
  showIcon = true,
  variant = 'pill' // 'pill' | 'inline' | 'card'
}) => {
  // Handle both object format { label, url } and string format
  const label = typeof reference === 'string' ? reference : reference?.label;
  const url = typeof reference === 'string' ? null : reference?.url;
  const description = typeof reference === 'string' ? null : reference?.description;

  if (!label) return null;

  const baseStyles = {
    pill: 'px-3 py-1.5 bg-dark-800/50 rounded-md text-xs font-mono border border-neon-cyan/20 transition-all duration-300',
    inline: 'text-xs font-mono transition-colors',
    card: 'p-3 bg-dark-800/50 rounded-lg border border-neon-cyan/20 transition-all duration-300 block'
  };

  const linkStyles = {
    pill: 'text-slate-300 hover:bg-dark-700/50 hover:border-neon-cyan/50 hover:text-neon-cyan hover:shadow-neon-cyan cursor-pointer inline-flex items-center gap-1.5',
    inline: 'text-neon-cyan hover:text-glow-cyan cursor-pointer inline-flex items-center gap-1',
    card: 'hover:bg-dark-700/30 hover:border-neon-cyan/40 hover:shadow-neon-cyan'
  };

  const textStyles = {
    pill: 'text-slate-400',
    inline: 'text-slate-400',
    card: 'text-slate-400'
  };

  if (url) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={`${baseStyles[variant]} ${linkStyles[variant]} ${className}`}
        title={description || label}
      >
        {variant === 'card' ? (
          <div>
            <div className="flex items-center gap-2 text-slate-300">
              <span>{label}</span>
              {showIcon && <ExternalLink className="w-3 h-3 text-neon-cyan opacity-50" />}
            </div>
            {description && (
              <p className="text-[11px] text-slate-500 mt-1">{description}</p>
            )}
          </div>
        ) : (
          <>
            <span>{label}</span>
            {showIcon && <ExternalLink className="w-3 h-3 text-neon-cyan opacity-50 flex-shrink-0" />}
          </>
        )}
      </a>
    );
  }

  // No URL - render as plain text
  return (
    <span className={`${baseStyles[variant]} ${textStyles[variant]} ${className}`}>
      {label}
    </span>
  );
};

/**
 * A component for rendering a list of references
 */
export const ReferenceList = ({
  references = [],
  variant = 'pill',
  className = '',
  showIcons = true
}) => {
  if (!references || references.length === 0) return null;

  const containerStyles = {
    pill: 'flex flex-wrap gap-2',
    inline: 'space-x-2',
    card: 'space-y-2'
  };

  return (
    <div className={`${containerStyles[variant]} ${className}`}>
      {references.map((ref, i) => (
        <ReferenceLink
          key={i}
          reference={ref}
          variant={variant}
          showIcon={showIcons}
        />
      ))}
    </div>
  );
};

export default ReferenceLink;
