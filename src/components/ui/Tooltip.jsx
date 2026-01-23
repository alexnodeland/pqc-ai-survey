import React, { useState, useRef, useEffect } from 'react';

export const Tooltip = ({ children, content, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const triggerRef = useRef(null);
  const tooltipRef = useRef(null);

  // Detect touch device
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

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

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  };

  const handleClick = (e) => {
    if (isTouchDevice) {
      e.preventDefault();
      setIsVisible(prev => !prev);
    }
  };

  return (
    <span
      className="relative inline-flex"
      ref={triggerRef}
      onMouseEnter={() => !isTouchDevice && setIsVisible(true)}
      onMouseLeave={() => !isTouchDevice && setIsVisible(false)}
      onClick={handleClick}
    >
      {children}
      {isVisible && (
        <span
          ref={tooltipRef}
          className={`absolute ${positionClasses[position]} z-50 px-3 py-2 text-sm bg-slate-800 border border-slate-700 rounded-lg shadow-xl max-w-xs whitespace-normal text-slate-300`}
        >
          {content}
          <span className={`absolute w-2 h-2 bg-slate-800 border-slate-700 transform rotate-45 ${
            position === 'top' ? 'top-full -mt-1 left-1/2 -translate-x-1/2 border-r border-b' :
            position === 'bottom' ? 'bottom-full -mb-1 left-1/2 -translate-x-1/2 border-l border-t' :
            position === 'left' ? 'left-full -ml-1 top-1/2 -translate-y-1/2 border-t border-r' :
            'right-full -mr-1 top-1/2 -translate-y-1/2 border-b border-l'
          }`} />
        </span>
      )}
    </span>
  );
};
