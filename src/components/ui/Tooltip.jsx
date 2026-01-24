import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export const Tooltip = ({ children, content, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const [actualPosition, setActualPosition] = useState(position);
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);
  const hideTimeoutRef = useRef(null);

  // Detect touch device
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  // Calculate tooltip position based on trigger element
  useEffect(() => {
    if (!isVisible || !triggerRef.current) return;

    const updatePosition = () => {
      const rect = triggerRef.current.getBoundingClientRect();
      const scrollX = window.scrollX;
      const scrollY = window.scrollY;
      const tooltipWidth = 280; // max-w-xs
      const tooltipHeight = 100; // estimated
      const padding = 16;

      let top, left;
      let newPosition = position;

      // Check if there's enough space above
      const spaceAbove = rect.top;
      const spaceBelow = window.innerHeight - rect.bottom;

      // If position is top but not enough space, switch to bottom
      if (position === 'top' && spaceAbove < tooltipHeight + padding) {
        newPosition = 'bottom';
      }
      // If position is bottom but not enough space, switch to top
      if (position === 'bottom' && spaceBelow < tooltipHeight + padding) {
        newPosition = 'top';
      }

      switch (newPosition) {
        case 'top':
          top = rect.top + scrollY - 8;
          left = rect.left + scrollX + rect.width / 2;
          break;
        case 'bottom':
          top = rect.bottom + scrollY + 8;
          left = rect.left + scrollX + rect.width / 2;
          break;
        case 'left':
          top = rect.top + scrollY + rect.height / 2;
          left = rect.left + scrollX - 8;
          break;
        case 'right':
          top = rect.top + scrollY + rect.height / 2;
          left = rect.right + scrollX + 8;
          break;
        default:
          top = rect.bottom + scrollY + 8;
          left = rect.left + scrollX + rect.width / 2;
      }

      // Constrain horizontal position to viewport
      const halfTooltipWidth = tooltipWidth / 2;
      const minLeft = padding + halfTooltipWidth;
      const maxLeft = window.innerWidth - padding - halfTooltipWidth + scrollX;
      left = Math.max(minLeft, Math.min(left, maxLeft));

      setActualPosition(newPosition);
      setTooltipPosition({ top, left });
    };

    updatePosition();
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);

    return () => {
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isVisible, position]);

  // Close on outside tap for touch devices
  useEffect(() => {
    if (!isVisible || !isTouchDevice) return;

    const handleOutsideClick = (e) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target) &&
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target)
      ) {
        setIsVisible(false);
      }
    };

    document.addEventListener('touchstart', handleOutsideClick);
    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('touchstart', handleOutsideClick);
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isVisible, isTouchDevice]);

  const handleClick = (e) => {
    if (isTouchDevice) {
      e.preventDefault();
      setIsVisible(prev => !prev);
    }
  };

  const showTooltip = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
    setIsVisible(true);
  };

  const hideTooltip = () => {
    hideTimeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 150); // Small delay to allow moving to tooltip
  };

  const handleTooltipMouseEnter = () => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

  const handleTooltipMouseLeave = () => {
    setIsVisible(false);
  };

  const getTransformClasses = () => {
    switch (actualPosition) {
      case 'top':
        return '-translate-x-1/2 -translate-y-full';
      case 'bottom':
        return '-translate-x-1/2';
      case 'left':
        return '-translate-x-full -translate-y-1/2';
      case 'right':
        return '-translate-y-1/2';
      default:
        return '-translate-x-1/2';
    }
  };

  const getArrowClasses = () => {
    switch (actualPosition) {
      case 'top':
        return 'top-full -mt-1 left-1/2 -translate-x-1/2 border-r border-b';
      case 'bottom':
        return 'bottom-full -mb-1 left-1/2 -translate-x-1/2 border-l border-t';
      case 'left':
        return 'left-full -ml-1 top-1/2 -translate-y-1/2 border-t border-r';
      case 'right':
        return 'right-full -mr-1 top-1/2 -translate-y-1/2 border-b border-l';
      default:
        return 'bottom-full -mb-1 left-1/2 -translate-x-1/2 border-l border-t';
    }
  };

  const tooltipElement = isVisible && createPortal(
    <span
      ref={tooltipRef}
      style={{
        position: 'absolute',
        top: tooltipPosition.top,
        left: tooltipPosition.left,
      }}
      className={`${getTransformClasses()} z-[9999] px-3 py-2 text-xs font-mono bg-[#0a0f1a] border border-neon-cyan/40 rounded-lg shadow-neon-cyan max-w-xs whitespace-normal text-slate-300 tracking-wide`}
      onMouseEnter={handleTooltipMouseEnter}
      onMouseLeave={handleTooltipMouseLeave}
    >
      {content}
      <span className={`absolute w-2 h-2 bg-[#0a0f1a] border-neon-cyan/40 transform rotate-45 ${getArrowClasses()}`} />
    </span>,
    document.body
  );

  return (
    <span
      className="relative inline-flex"
      ref={triggerRef}
      onMouseEnter={() => !isTouchDevice && showTooltip()}
      onMouseLeave={() => !isTouchDevice && hideTooltip()}
      onClick={handleClick}
    >
      {children}
      {tooltipElement}
    </span>
  );
};
