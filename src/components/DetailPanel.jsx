import React from 'react';
import { ArrowRight, AlertCircle, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { AlgorithmBadge } from './AlgorithmBadge';
import { InfoPill, CodeBlock, ReferenceLink, ReferenceList, Tooltip } from './ui';
import { tabs, flowDiagrams } from '../data';

export const DetailPanel = ({ selectedCase, activeTab, setActiveTab, currentIndex, totalUseCases, onPrev, onNext }) => {
  if (!selectedCase) return null;

  const diagram = flowDiagrams[selectedCase.id];
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < totalUseCases - 1;

  return (
    <main className="lg:col-span-8 xl:col-span-9 min-w-0 w-full overflow-hidden font-mono">
      <div className="space-y-4 sm:space-y-6">
        {/* Hero Section */}
        <div className={`card-retro rounded-xl sm:rounded-2xl border border-neon-cyan/20`}>
          {/* Navigation bar */}
          <div className="flex items-center justify-between px-4 sm:px-6 py-2 sm:py-3 border-b border-neon-cyan/10 bg-dark-800/30">
            <button
              onClick={onPrev}
              disabled={!hasPrev}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                hasPrev
                  ? 'text-slate-400 hover:text-neon-cyan hover:bg-neon-cyan/10'
                  : 'text-slate-700 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-mono">
                {currentIndex + 1} <span className="text-slate-700">of</span> {totalUseCases}
              </span>
              <div className="hidden sm:flex items-center gap-1">
                {Array.from({ length: totalUseCases }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      i === currentIndex
                        ? 'bg-neon-cyan shadow-neon-cyan'
                        : 'bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={onNext}
              disabled={!hasNext}
              className={`flex items-center gap-1.5 px-2 sm:px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                hasNext
                  ? 'text-slate-400 hover:text-neon-cyan hover:bg-neon-cyan/10'
                  : 'text-slate-700 cursor-not-allowed'
              }`}
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-0 mb-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-neon-cyan/10 border border-neon-cyan/30 flex-shrink-0`}>
                  <selectedCase.icon className={`w-5 h-5 sm:w-7 sm:h-7 text-neon-cyan`} />
                </div>
                <div className="min-w-0">
                  <h1 className="text-lg sm:text-xl font-display font-bold text-white mb-0.5 sm:mb-1 tracking-wide">{selectedCase.title}</h1>
                  <p className="text-xs sm:text-sm text-slate-400">{selectedCase.subtitle}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start">
                <span className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-medium ${
                  selectedCase.category === 'in-flight'
                    ? 'bg-sky-950/50 text-sky-300 border border-sky-800/30'
                    : 'bg-violet-950/50 text-violet-300 border border-violet-800/30'
                }`}>
                  {selectedCase.category === 'in-flight' ? 'In-Flight' : 'At-Rest'}
                </span>
                <span className={`px-2 sm:px-2.5 py-1 rounded-lg text-[10px] sm:text-xs font-medium ${
                  selectedCase.status === 'production'
                    ? 'bg-emerald-950/50 text-emerald-300 border border-emerald-800/30'
                    : 'bg-amber-950/50 text-amber-300 border border-amber-800/30'
                }`}>
                  {selectedCase.status === 'production' ? 'Production Ready' : 'Hardware Needed'}
                </span>
              </div>
            </div>

            {/* Algorithms Used */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <span className="text-[10px] sm:text-xs text-slate-500 font-mono">&gt; algorithms:</span>
              <div className="flex flex-wrap gap-2">
                {selectedCase.solution.algorithms.map(alg => (
                  <AlgorithmBadge key={alg} algorithm={alg} />
                ))}
              </div>
            </div>
          </div>

          {/* Tab Navigation - scrollable on mobile */}
          <div className="border-t border-neon-cyan/10 px-1 sm:px-2 overflow-x-auto bg-dark-800/30">
            <div className="flex gap-0.5 sm:gap-1">
              {tabs.map(tab => {
                const TabIcon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-mono tracking-wide transition-all relative whitespace-nowrap
                      ${isActive
                        ? 'text-neon-cyan'
                        : 'text-slate-500 hover:text-slate-300'
                      }
                    `}
                  >
                    <TabIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>{tab.label}</span>
                    {isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-cyan shadow-neon-cyan" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="card-retro rounded-xl sm:rounded-2xl border border-neon-cyan/10 overflow-hidden">
          {/* Threat Tab */}
          {activeTab === 'threat' && (
            <div>
              <div className="p-4 sm:p-6 border-b border-neon-red/10 bg-neon-red/5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                  <div>
                    <h2 className="text-base sm:text-lg font-display font-semibold text-white tracking-wide">{selectedCase.threat.title}</h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">{selectedCase.threat.summary}</p>
                  </div>
                  <div className="sm:text-right">
                    <div className="text-[10px] sm:text-xs text-slate-500 font-mono">impact_level</div>
                    <div className={`text-base sm:text-lg font-display font-bold ${
                      selectedCase.threat.impact === 'Critical' ? 'text-neon-red text-glow-red' :
                      selectedCase.threat.impact === 'High' ? 'text-neon-amber' : 'text-yellow-400'
                    }`}>{selectedCase.threat.impact}</div>
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <div className="grid md:grid-cols-2 gap-2 sm:gap-3 mb-4">
                  {selectedCase.threat.details.map((detail, i) => (
                    <div key={i} className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 bg-dark-800/50 rounded-lg border border-neon-red/10">
                      <AlertCircle className="w-4 h-4 text-neon-red mt-0.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-slate-400">{detail}</span>
                    </div>
                  ))}
                </div>
                <div className="p-2.5 sm:p-3 bg-dark-800/50 rounded-lg border-l-2 border-neon-red/50">
                  <div className="text-[10px] sm:text-xs text-slate-500 mb-1 font-mono">// timeline</div>
                  <div className="text-xs sm:text-sm text-slate-300">{selectedCase.threat.timeline}</div>
                </div>
              </div>
            </div>
          )}

          {/* Approach Tab - Combined Solution + Flow */}
          {activeTab === 'approach' && (
            <div>
              <div className="p-4 sm:p-6 border-b border-slate-800/50 bg-emerald-950/10">
                <h2 className="text-base sm:text-lg font-semibold text-white">{selectedCase.solution.title}</h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">{selectedCase.solution.summary}</p>
              </div>
              <div className="p-4 sm:p-6 space-y-6">
                {/* Flow Diagram */}
                {diagram && (
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                      <span className="text-emerald-400">▸</span> Data Flow
                    </h3>
                    <div className="relative bg-slate-800/20 rounded-xl p-4 border border-slate-700/30">
                      {/* Scrollable container on mobile */}
                      <div className="overflow-x-auto pb-2 -mx-2 px-2">
                        <div className="min-w-[320px] sm:min-w-0 py-2">
                          {/* Flow nodes */}
                          <div className="flex items-start justify-between gap-1 sm:gap-2">
                            {diagram.nodes.map((node, idx) => {
                              const NodeIcon = node.icon;
                              const isLast = idx === diagram.nodes.length - 1;
                              return (
                                <React.Fragment key={node.id}>
                                  {/* Node */}
                                  <div className="flex flex-col items-center flex-shrink-0">
                                    <Tooltip content={node.description} position="bottom">
                                      <div className={`
                                        w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl flex items-center justify-center cursor-pointer transition-all hover:scale-105
                                        ${node.isEncryption
                                          ? 'bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border-2 border-emerald-500/40 hover:border-emerald-400/60'
                                          : 'bg-slate-800/80 border border-slate-700 hover:border-slate-500'
                                        }
                                      `}>
                                        <NodeIcon className={`w-4 h-4 sm:w-6 sm:h-6 ${node.isEncryption ? 'text-emerald-400' : 'text-slate-400'}`} />
                                      </div>
                                    </Tooltip>
                                    <span className={`text-[9px] sm:text-xs mt-1.5 font-medium text-center max-w-[50px] sm:max-w-none ${node.isEncryption ? 'text-emerald-400' : 'text-slate-500'}`}>
                                      {node.label}
                                    </span>
                                  </div>

                                  {/* Arrow */}
                                  {!isLast && (
                                    <div className="flex items-center min-w-[20px] sm:min-w-[32px] h-10 sm:h-14">
                                      <div className="flex items-center w-full">
                                        <div className={`h-0.5 flex-1 min-w-[10px] sm:min-w-[16px] ${
                                          diagram.nodes[idx + 1]?.isEncryption || node.isEncryption
                                            ? 'bg-gradient-to-r from-emerald-500/50 to-cyan-500/50'
                                            : 'bg-slate-700'
                                        }`} />
                                        <ArrowRight className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 -ml-0.5 ${
                                          diagram.nodes[idx + 1]?.isEncryption || node.isEncryption
                                            ? 'text-emerald-500'
                                            : 'text-slate-600'
                                        }`} />
                                      </div>
                                    </div>
                                  )}
                                </React.Fragment>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Legend */}
                      <div className="mt-4 pt-3 border-t border-slate-800/50 flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded bg-slate-800 border border-slate-700" />
                          <span className="text-[10px] text-slate-500">Standard</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border-2 border-emerald-500/40" />
                          <span className="text-[10px] text-emerald-400">PQC encryption</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Approach Steps */}
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                    <span className="text-emerald-400">▸</span> How It Works
                  </h3>
                  <div className="space-y-2">
                    {selectedCase.solution.approach.map((step, i) => (
                      <div key={i} className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 bg-emerald-950/20 rounded-lg border border-emerald-900/20">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-[10px] sm:text-xs font-semibold text-emerald-400">{i + 1}</span>
                        </div>
                        <span className="text-xs sm:text-sm text-slate-300">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Implementation Tab - Combined Performance + Code */}
          {activeTab === 'implementation' && (
            <div>
              <div className="p-4 sm:p-6 border-b border-slate-800/50 bg-sky-950/10">
                <div>
                  <h2 className="text-base sm:text-lg font-semibold text-white">Implementation Guide</h2>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">Performance impact and code examples</p>
                </div>
              </div>
              <div className="p-4 sm:p-6 space-y-6">
                {/* Performance Overview */}
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                    <span className="text-sky-400">▸</span> Performance Impact
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                    {Object.entries(selectedCase.performance.overhead).map(([key, data]) => (
                      <InfoPill
                        key={key}
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                        value={data.value}
                        detail={data.detail}
                        color="sky"
                      />
                    ))}
                  </div>

                  {/* Benchmark Table */}
                  <div className="bg-slate-800/30 rounded-xl overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[400px] sm:min-w-[500px]">
                        <thead>
                          <tr className="border-b border-slate-700/50">
                            <th className="text-left p-2 sm:p-3 text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">Scenario</th>
                            <th className="text-left p-2 sm:p-3 text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">Payload</th>
                            <th className="text-left p-2 sm:p-3 text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">Overhead</th>
                            <th className="text-left p-2 sm:p-3 text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">Verdict</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/30">
                          {selectedCase.performance.benchmarks.map((bench, i) => (
                            <tr key={i} className="hover:bg-slate-700/20 transition-colors">
                              <td className="p-2 sm:p-3 text-xs sm:text-sm text-slate-300">{bench.scenario}</td>
                              <td className="p-2 sm:p-3 text-xs sm:text-sm text-slate-400 font-mono">{bench.payload}</td>
                              <td className="p-2 sm:p-3 text-xs sm:text-sm text-slate-400 font-mono">{bench.overhead}</td>
                              <td className="p-2 sm:p-3">
                                <span className={`text-[10px] sm:text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap ${
                                  bench.verdict === 'Excellent' ? 'bg-emerald-950/50 text-emerald-300' :
                                  bench.verdict === 'Acceptable' || bench.verdict === 'Viable' || bench.verdict === 'Instant' || bench.verdict === 'One-time' ? 'bg-sky-950/50 text-sky-300' :
                                  bench.verdict === 'No overhead' || bench.verdict === 'No impact' || bench.verdict === 'Negligible' ? 'bg-slate-800 text-slate-300' :
                                  'bg-amber-950/50 text-amber-300'
                                }`}>
                                  {bench.verdict}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Code Section */}
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-slate-300 mb-3 flex items-center gap-2">
                    <span className="text-sky-400">▸</span> Code Example
                  </h3>

                  {/* Prerequisites */}
                  <div className="mb-4">
                    <div className="text-[10px] sm:text-xs text-slate-500 mb-2">Prerequisites</div>
                    <div className="flex flex-wrap gap-2">
                      {selectedCase.implementation.prerequisites.map((prereq, i) => (
                        <span key={i} className="px-2 sm:px-3 py-1 sm:py-1.5 bg-slate-800/50 rounded-lg text-xs sm:text-sm text-slate-400 border border-slate-700/50">
                          {prereq}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Code Block */}
                  <CodeBlock
                    code={selectedCase.implementation.code}
                    language={selectedCase.implementation.code.includes('class') && selectedCase.implementation.code.includes('def ') ? 'python' : 'typescript'}
                    title="Implementation Example"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Context Tab */}
          {activeTab === 'context' && (
            <div>
              <div className="p-4 sm:p-6 border-b border-slate-800/50">
                <h2 className="text-base sm:text-lg font-semibold text-white">Real-World Context</h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">Industry adoption, standards, and references</p>
              </div>
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {/* Adopters and Standards */}
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-300 mb-2 sm:mb-3">Early Adopters</h3>
                    <ReferenceList references={selectedCase.realWorld.adopters} variant="pill" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-300 mb-2 sm:mb-3">Relevant Standards</h3>
                    <ReferenceList references={selectedCase.realWorld.standards} variant="pill" />
                  </div>
                </div>

                {/* Quote */}
                <div className="p-3 sm:p-4 bg-slate-800/30 rounded-xl border-l-2 border-slate-600">
                  <p className="text-xs sm:text-sm text-slate-300 italic mb-2">"{selectedCase.realWorld.quote}"</p>
                  <p className="text-[11px] sm:text-sm text-slate-500 flex items-center gap-1">
                    — {selectedCase.realWorld.quoteSource?.url ? (
                      <a
                        href={selectedCase.realWorld.quoteSource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-sky-400 transition-colors inline-flex items-center gap-1"
                      >
                        {selectedCase.realWorld.quoteSource.label}
                        <ExternalLink className="w-3 h-3 opacity-50" />
                      </a>
                    ) : (
                      <span>{selectedCase.realWorld.quoteSource?.label || selectedCase.realWorld.quoteSource}</span>
                    )}
                  </p>
                </div>

                {/* Algorithm Standards and General Resources */}
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6 pt-2 border-t border-slate-800/50">
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-300 mb-2 sm:mb-3">Algorithm Standards</h3>
                    <ReferenceList
                      references={[
                        ...(selectedCase.solution.algorithms.includes('kyber') ? [{
                          label: 'FIPS 203 (ML-KEM)',
                          url: 'https://csrc.nist.gov/pubs/fips/203/final'
                        }] : []),
                        ...(selectedCase.solution.algorithms.includes('dilithium') ? [{
                          label: 'FIPS 204 (ML-DSA)',
                          url: 'https://csrc.nist.gov/pubs/fips/204/final'
                        }] : []),
                        ...(selectedCase.solution.algorithms.includes('sphincs') ? [{
                          label: 'FIPS 205 (SLH-DSA)',
                          url: 'https://csrc.nist.gov/pubs/fips/205/final'
                        }] : [])
                      ]}
                      variant="pill"
                    />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-300 mb-2 sm:mb-3">General Resources</h3>
                    <ReferenceList
                      references={[
                        { label: 'NIST PQC Project', url: 'https://www.nist.gov/pqcrypto' },
                        { label: 'CRYSTALS Project', url: 'https://pq-crystals.org/' }
                      ]}
                      variant="pill"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
