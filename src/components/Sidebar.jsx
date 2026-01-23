import React from 'react';
import { Check, AlertTriangle, ChevronDown, X } from 'lucide-react';
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
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        lg:col-span-4 xl:col-span-3
        fixed lg:relative inset-y-0 left-0
        w-80 max-w-[85vw] lg:w-auto lg:max-w-none bg-[#0a0f1a] lg:bg-transparent
        border-r border-slate-800/50 lg:border-0
        transform transition-transform duration-300 ease-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        z-50 lg:z-0 overflow-y-auto
      `}>
        <div className="sticky top-0 lg:top-6 space-y-4 p-4 lg:p-0">
          {/* Mobile close button */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden absolute top-4 right-4 p-2 text-slate-400 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Section Header */}
          <div className="pt-8 lg:pt-0">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">AI Security Use Cases</h2>
            <p className="text-xs text-slate-500">Prioritized by threat urgency and compliance deadlines.</p>
          </div>

        {/* Risk-Based Categories */}
        {urgencyCategories.map(category => {
          const CategoryIcon = category.icon;
          const categoryUseCases = category.useCaseIds.map(id => useCases[id]).filter(Boolean);
          const isExpanded = expandedCategories[category.id];

          return (
            <div key={category.id} className={`rounded-xl border transition-all ${
              category.id === 'critical' ? 'bg-red-950/20 border-red-900/30' :
              category.id === 'high' ? 'bg-amber-950/20 border-amber-900/30' :
              'bg-sky-950/20 border-sky-900/30'
            }`}>
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full p-3 flex items-center gap-3 text-left"
              >
                <CategoryIcon className={`w-4 h-4 ${
                  category.id === 'critical' ? 'text-red-400' :
                  category.id === 'high' ? 'text-amber-400' :
                  'text-sky-400'
                }`} />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold uppercase tracking-wider ${
                      category.id === 'critical' ? 'text-red-400' :
                      category.id === 'high' ? 'text-amber-400' :
                      'text-sky-400'
                    }`}>{category.label}</span>
                    <span className={`px-1.5 py-0.5 text-[10px] font-medium rounded-full ${
                      category.id === 'critical' ? 'bg-red-500/20 text-red-300' :
                      category.id === 'high' ? 'bg-amber-500/20 text-amber-300' :
                      'bg-sky-500/20 text-sky-300'
                    }`}>{categoryUseCases.length}</span>
                  </div>
                  <p className="text-[10px] text-slate-500">{category.description}</p>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              </button>

              {/* Category Use Cases */}
              {isExpanded && (
                <div className="px-3 pb-3 space-y-1.5">
                  {categoryUseCases.map(uc => {
                    const Icon = uc.icon;
                    const isSelected = selectedUseCase === uc.id;
                    const isProduction = uc.status === 'production';

                    return (
                      <button
                        key={uc.id}
                        onClick={() => handleUseCaseSelect(uc.id)}
                        className={`
                          w-full text-left p-2.5 rounded-lg transition-all duration-200 group
                          ${isSelected
                            ? `bg-${uc.color}-500/20 border border-${uc.color}-500/30`
                            : 'bg-slate-900/50 border border-transparent hover:bg-slate-800/50 hover:border-slate-700/50'
                          }
                        `}
                      >
                        <div className="flex items-center gap-2.5">
                          <div className={`p-1.5 rounded-md transition-colors ${isSelected ? `bg-${uc.color}-500/20 text-${uc.color}-400` : 'bg-slate-800 text-slate-400 group-hover:text-slate-300'}`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className={`font-medium text-xs ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                                {uc.title}
                              </span>
                              {isProduction ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <AlertTriangle className="w-3 h-3 text-amber-400" />
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
        <div className="bg-slate-900/30 rounded-xl p-4 border border-slate-800/50">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Quick Reference</h3>
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Production Ready</span>
              <span className="text-emerald-400 font-medium">8 of 10</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Typical Overhead</span>
              <span className="text-slate-300 font-medium">2-5%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">CNSA 2.0 Deadline</span>
              <span className="text-amber-400 font-medium">2030</span>
            </div>
          </div>
        </div>
        </div>
      </aside>
    </>
  );
};
