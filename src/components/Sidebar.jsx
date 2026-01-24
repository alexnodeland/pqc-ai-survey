import React from 'react';
import { Check, AlertTriangle, ChevronDown, X, Terminal } from 'lucide-react';
import { urgencyCategories, useCases } from '../data';

export const Sidebar = ({
  selectedUseCase,
  setSelectedUseCase,
  expandedCategories,
  toggleCategory,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}) => {
  // Close menu when a use case is selected on mobile
  const handleUseCaseSelect = (id) => {
    setSelectedUseCase(id);
    if (setIsMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-dark-900/80 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        lg:col-span-4 xl:col-span-3
        fixed lg:relative inset-y-0 left-0 lg:inset-auto
        w-80 max-w-[85vw] lg:w-auto lg:max-w-none bg-dark-900 lg:bg-transparent
        border-r border-neon-cyan/10 lg:border-0
        transform transition-transform duration-300 ease-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        z-50 lg:z-0 overflow-y-auto lg:overflow-visible
      `}>
        <div className="sticky top-0 lg:top-6 space-y-4 p-4 lg:p-0">
          {/* Mobile close button */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden absolute top-4 right-4 p-2 text-slate-400 hover:text-neon-cyan transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Section Header */}
          <div className="pt-8 lg:pt-0">
            <div className="flex items-center gap-2 mb-2">
              <Terminal className="w-4 h-4 text-neon-cyan" />
              <h2 className="text-xs font-display font-semibold text-neon-cyan uppercase tracking-widest">
                USE_CASES
              </h2>
            </div>
            <p className="text-[11px] text-slate-500 font-mono">
              // Prioritized by threat urgency
            </p>
          </div>

        {/* Risk-Based Categories */}
        {urgencyCategories.map(category => {
          const CategoryIcon = category.icon;
          const categoryUseCases = category.useCaseIds.map(id => useCases[id]).filter(Boolean);
          const isExpanded = expandedCategories[category.id];

          const getCategoryColors = () => {
            switch (category.id) {
              case 'critical':
                return {
                  bg: 'bg-neon-red/5',
                  border: 'border-neon-red/20',
                  hoverBorder: 'hover:border-neon-red/40',
                  text: 'text-neon-red',
                  glow: 'text-glow-red',
                  shadow: 'hover:shadow-neon-red',
                };
              case 'high':
                return {
                  bg: 'bg-neon-amber/5',
                  border: 'border-neon-amber/20',
                  hoverBorder: 'hover:border-neon-amber/40',
                  text: 'text-neon-amber',
                  glow: 'text-glow-amber',
                  shadow: 'hover:shadow-neon-amber',
                };
              default:
                return {
                  bg: 'bg-neon-cyan/5',
                  border: 'border-neon-cyan/20',
                  hoverBorder: 'hover:border-neon-cyan/40',
                  text: 'text-neon-cyan',
                  glow: 'text-glow-cyan',
                  shadow: 'hover:shadow-neon-cyan',
                };
            }
          };

          const colors = getCategoryColors();

          return (
            <div key={category.id} className={`rounded-lg border transition-all duration-300 ${colors.bg} ${colors.border} ${colors.hoverBorder}`}>
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full p-3 flex items-center gap-3 text-left group"
              >
                <CategoryIcon className={`w-4 h-4 ${colors.text}`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] font-display font-bold uppercase tracking-widest ${colors.text} ${colors.glow}`}>
                      {category.label}
                    </span>
                    <span className={`px-1.5 py-0.5 text-[10px] font-mono font-medium rounded bg-dark-800 ${colors.text}`}>
                      {categoryUseCases.length}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 font-mono mt-0.5">{category.description}</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
              </button>

              {/* Category Use Cases */}
              {isExpanded && (
                <div className="px-3 pb-3 space-y-1">
                  {categoryUseCases.map(uc => {
                    const Icon = uc.icon;
                    const isSelected = selectedUseCase === uc.id;
                    const isProduction = uc.status === 'production';

                    return (
                      <button
                        key={uc.id}
                        onClick={() => handleUseCaseSelect(uc.id)}
                        className={`
                          w-full text-left p-2.5 rounded-md transition-all duration-200 group font-mono
                          ${isSelected
                            ? 'bg-neon-cyan/10 border border-neon-cyan/30 shadow-neon-cyan'
                            : 'bg-dark-800/50 border border-transparent hover:bg-dark-700/50 hover:border-neon-cyan/20'
                          }
                        `}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`p-1.5 rounded transition-colors ${isSelected ? 'bg-neon-cyan/20 text-neon-cyan' : 'bg-dark-700 text-slate-400 group-hover:text-slate-300'}`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className={`text-xs tracking-wide ${isSelected ? 'text-neon-cyan font-semibold' : 'text-slate-300'}`}>
                                {uc.title}
                              </span>
                              {isProduction ? (
                                <Check className="w-3 h-3 text-neon-green" />
                              ) : (
                                <AlertTriangle className="w-3 h-3 text-neon-amber" />
                              )}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Quick Stats */}
        <div className="card-retro rounded-lg p-4">
          <h3 className="text-[10px] font-display font-semibold text-neon-cyan uppercase tracking-widest mb-3 flex items-center gap-2">
            <span className="text-slate-500">//</span> QUICK_REF
          </h3>
          <div className="space-y-2.5 text-xs font-mono">
            <div className="flex justify-between items-center">
              <span className="text-slate-500">production_ready</span>
              <span className="text-neon-green font-semibold">8/10</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">typical_overhead</span>
              <span className="text-slate-300 font-semibold">2-5%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500">cnsa_deadline</span>
              <span className="text-neon-amber font-semibold">2030</span>
            </div>
          </div>
        </div>
        </div>
      </aside>
    </>
  );
};
