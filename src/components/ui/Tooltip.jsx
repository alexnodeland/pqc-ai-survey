import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

export const Tooltip = ({ children, content, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);

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

      let top, left;

      switch (position) {
        case 'top':
          top = rect.top + scrollY - 8; // 8px gap
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
          top = rect.top + scrollY - 8;
          left = rect.left + scrollX + rect.width / 2;
      }

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

  const getTransformClasses = () => {
    switch (position) {
      case 'top':
        return '-translate-x-1/2 -translate-y-full';
      case 'bottom':
        return '-translate-x-1/2';
      case 'left':
        return '-translate-x-full -translate-y-1/2';
      case 'right':
        return '-translate-y-1/2';
      default:
        return '-translate-x-1/2 -translate-y-full';
    }
  };

  const getArrowClasses = () => {
    switch (position) {
      case 'top':
        return 'top-full -mt-1 left-1/2 -translate-x-1/2 border-r border-b';
      case 'bottom':
        return 'bottom-full -mb-1 left-1/2 -translate-x-1/2 border-l border-t';
      case 'left':
        return 'left-full -ml-1 top-1/2 -translate-y-1/2 border-t border-r';
      case 'right':
        return 'right-full -mr-1 top-1/2 -translate-y-1/2 border-b border-l';
      default:
        return 'top-full -mt-1 left-1/2 -translate-x-1/2 border-r border-b';
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
      className={`${getTransformClasses()} z-[9999] px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg shadow-xl max-w-xs whitespace-normal text-slate-300 pointer-events-none`}
    >
      {content}
      <span className={`absolute w-2 h-2 bg-slate-800 border-slate-700 transform rotate-45 ${getArrowClasses()}`} />
    </span>,
    document.body
  );

  return (
    <span
      className="relative inline-flex"
      ref={triggerRef}
      onMouseEnter={() => !isTouchDevice && setIsVisible(true)}
      onMouseLeave={() => !isTouchDevice && setIsVisible(false)}
      onClick={handleClick}
    >
      {children}
      {tooltipElement}
    </span>
  );
};
