import React from 'react';
import { ArrowRight, AlertCircle, ExternalLink } from 'lucide-react';
import { AlgorithmBadge } from './AlgorithmBadge';
import { InfoPill, CodeBlock, ReferenceLink, ReferenceList } from './ui';
import { tabs, flowDiagrams } from '../data';

export const DetailPanel = ({ selectedCase, activeTab, setActiveTab }) => {
  if (!selectedCase) return null;

  const diagram = flowDiagrams[selectedCase.id];

  return (
    <main className="lg:col-span-8 xl:col-span-9 min-w-0 w-full overflow-hidden">
      <div className="space-y-4 sm:space-y-6">
        {/* Hero Section */}
        <div className={`bg-gradient-to-br from-${selectedCase.color}-950/30 via-slate-900/50 to-slate-900/30 rounded-xl sm:rounded-2xl border border-${selectedCase.color}-500/20`}>
          <div className="p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-0 mb-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className={`p-2 sm:p-3 rounded-lg sm:rounded-xl bg-${selectedCase.color}-500/10 border border-${selectedCase.color}-500/20 flex-shrink-0`}>
                  <selectedCase.icon className={`w-5 h-5 sm:w-7 sm:h-7 text-${selectedCase.color}-400`} />
                </div>
                <div className="min-w-0">
                  <h1 className="text-lg sm:text-xl font-bold text-white mb-0.5 sm:mb-1">{selectedCase.title}</h1>
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
              <span className="text-[10px] sm:text-xs text-slate-500">Algorithms:</span>
              <div className="flex flex-wrap gap-2">
                {selectedCase.solution.algorithms.map(alg => (
                  <AlgorithmBadge key={alg} algorithm={alg} />
                ))}
              </div>
            </div>
          </div>

          {/* Tab Navigation - scrollable on mobile */}
          <div className="border-t border-slate-800/50 px-1 sm:px-2 overflow-x-auto">
            <div className="flex gap-0.5 sm:gap-1">
              {tabs.map(tab => {
                const TabIcon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium transition-all relative whitespace-nowrap
                      ${isActive
                        ? `text-${tab.color}-400`
                        : 'text-slate-500 hover:text-slate-300'
                      }
                    `}
                  >
                    <TabIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span>{tab.label}</span>
                    {isActive && (
                      <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-${tab.color}-500`} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-slate-900/50 rounded-xl sm:rounded-2xl border border-slate-800/50 overflow-hidden">
          {/* Threat Tab */}
          {activeTab === 'threat' && (
            <div>
              <div className="p-4 sm:p-6 border-b border-slate-800/50 bg-red-950/10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-white">{selectedCase.threat.title}</h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">{selectedCase.threat.summary}</p>
                  </div>
                  <div className="sm:text-right">
                    <div className="text-[10px] sm:text-xs text-slate-500">Impact</div>
                    <div className={`text-base sm:text-lg font-bold ${
                      selectedCase.threat.impact === 'Critical' ? 'text-red-400' :
                      selectedCase.threat.impact === 'High' ? 'text-orange-400' : 'text-yellow-400'
                    }`}>{selectedCase.threat.impact}</div>
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <div className="grid md:grid-cols-2 gap-2 sm:gap-3 mb-4">
                  {selectedCase.threat.details.map((detail, i) => (
                    <div key={i} className="flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 bg-slate-800/30 rounded-lg">
                      <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-xs sm:text-sm text-slate-400">{detail}</span>
                    </div>
                  ))}
                </div>
                <div className="p-2.5 sm:p-3 bg-slate-800/30 rounded-lg border-l-2 border-red-500/50">
                  <div className="text-[10px] sm:text-xs text-slate-500 mb-1">Timeline</div>
                  <div className="text-xs sm:text-sm text-slate-300">{selectedCase.threat.timeline}</div>
                </div>
              </div>
            </div>
          )}

          {/* Solution Tab */}
          {activeTab === 'solution' && (
            <div>
              <div className="p-4 sm:p-6 border-b border-slate-800/50 bg-emerald-950/10">
                <h2 className="text-base sm:text-lg font-semibold text-white">{selectedCase.solution.title}</h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">{selectedCase.solution.summary}</p>
              </div>
              <div className="p-4 sm:p-6">
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
          )}

          {/* Performance Tab */}
          {activeTab === 'performance' && (
            <div>
              <div className="p-4 sm:p-6 border-b border-slate-800/50 bg-sky-950/10">
                <h2 className="text-base sm:text-lg font-semibold text-white">Performance Impact</h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">Real-world overhead measurements</p>
              </div>
              <div className="p-4 sm:p-6 overflow-hidden">
                {/* Key Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
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

                {/* Benchmark Table - scrollable on mobile */}
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
            </div>
          )}

          {/* Code Tab */}
          {activeTab === 'code' && (
            <div>
              <div className="p-4 sm:p-6 border-b border-slate-800/50 bg-violet-950/10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                  <div>
                    <h2 className="text-base sm:text-lg font-semibold text-white">Implementation</h2>
                    <p className="text-xs sm:text-sm text-slate-400 mt-1">Code examples and integration guide</p>
                  </div>
                  <div className="flex items-center gap-4 sm:gap-6">
                    <div className="sm:text-right">
                      <div className="text-[10px] sm:text-xs text-slate-500">Difficulty</div>
                      <div className={`text-xs sm:text-sm font-semibold ${
                        selectedCase.implementation.difficulty === 'Low' ? 'text-emerald-400' :
                        selectedCase.implementation.difficulty === 'Medium' ? 'text-sky-400' :
                        selectedCase.implementation.difficulty === 'High' ? 'text-orange-400' : 'text-red-400'
                      }`}>{selectedCase.implementation.difficulty}</div>
                    </div>
                    <div className="sm:text-right">
                      <div className="text-[10px] sm:text-xs text-slate-500">Est. Time</div>
                      <div className="text-xs sm:text-sm font-semibold text-slate-300">{selectedCase.implementation.timeEstimate}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {/* Prerequisites */}
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-slate-300 mb-2 sm:mb-3">Prerequisites</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCase.implementation.prerequisites.map((prereq, i) => (
                      <span key={i} className="px-2 sm:px-3 py-1 sm:py-1.5 bg-slate-800/50 rounded-lg text-xs sm:text-sm text-slate-400 border border-slate-700/50">
                        {prereq}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Code Example */}
                <CodeBlock
                  code={selectedCase.implementation.code}
                  language={selectedCase.implementation.code.includes('class') && selectedCase.implementation.code.includes('def ') ? 'python' : 'typescript'}
                  title="Implementation Example"
                />
              </div>
            </div>
          )}

          {/* Diagram Tab */}
          {activeTab === 'diagram' && (
            <div>
              <div className="p-4 sm:p-6 border-b border-slate-800/50 bg-cyan-950/10">
                <h2 className="text-base sm:text-lg font-semibold text-white">
                  {diagram?.title || 'Data Flow'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  {diagram?.description || 'How data flows through the system'}
                </p>
              </div>
              <div className="p-4 sm:p-6 overflow-hidden">
                {diagram && (
                  <div className="relative">
                    {/* Scrollable container on mobile */}
                    <div className="overflow-x-auto pb-2">
                      <div className="min-w-[320px] sm:min-w-0">
                        {/* Flow nodes */}
                        <div className="flex items-start justify-between gap-1 sm:gap-2">
                          {diagram.nodes.map((node, idx) => {
                            const NodeIcon = node.icon;
                            const isLast = idx === diagram.nodes.length - 1;
                            return (
                              <React.Fragment key={node.id}>
                                {/* Node - responsive sizing */}
                                <div className="flex flex-col items-center flex-shrink-0">
                                  <div className={`
                                    w-12 h-12 sm:w-16 sm:h-16 rounded-lg sm:rounded-xl flex items-center justify-center
                                    ${node.isEncryption
                                      ? 'bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border-2 border-emerald-500/40'
                                      : 'bg-slate-800/80 border border-slate-700'
                                    }
                                  `}>
                                    <NodeIcon className={`w-5 h-5 sm:w-7 sm:h-7 ${node.isEncryption ? 'text-emerald-400' : 'text-slate-400'}`} />
                                  </div>
                                  <span className={`text-[10px] sm:text-xs mt-1.5 sm:mt-2 font-medium text-center min-h-[28px] sm:min-h-[32px] flex items-start justify-center max-w-[60px] sm:max-w-none ${node.isEncryption ? 'text-emerald-400' : 'text-slate-400'}`}>
                                    {node.label}
                                  </span>
                                </div>

                                {/* Arrow - aligned with icon center */}
                                {!isLast && (
                                  <div className="flex-1 flex items-center justify-center min-w-[24px] sm:min-w-[40px] h-12 sm:h-16">
                                    <div className="flex items-center">
                                      <div className={`h-0.5 flex-1 min-w-[12px] sm:min-w-[20px] ${
                                        diagram.nodes[idx + 1]?.isEncryption || node.isEncryption
                                          ? 'bg-gradient-to-r from-emerald-500/50 to-cyan-500/50'
                                          : 'bg-slate-700'
                                      }`} />
                                      <ArrowRight className={`w-3 h-3 sm:w-4 sm:h-4 -ml-0.5 sm:-ml-1 ${
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

                    {/* Scroll hint on mobile */}
                    <div className="sm:hidden text-center mt-2">
                      <span className="text-[10px] text-slate-600">Swipe to see full diagram</span>
                    </div>

                    {/* Legend - stack on mobile */}
                    <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-800/50 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-slate-800 border border-slate-700" />
                        <span className="text-[10px] sm:text-xs text-slate-500">Standard component</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 border-2 border-emerald-500/40" />
                        <span className="text-[10px] sm:text-xs text-emerald-400">PQC encryption point</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* References Tab */}
          {activeTab === 'references' && (
            <div>
              <div className="p-4 sm:p-6 border-b border-slate-800/50 bg-indigo-950/10">
                <h2 className="text-base sm:text-lg font-semibold text-white">References & Sources</h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">All citations for this use case</p>
              </div>
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {/* Standards */}
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-slate-300 mb-2 sm:mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    Standards & Specifications
                  </h3>
                  <ReferenceList references={selectedCase.realWorld.standards} variant="card" />
                </div>

                {/* Early Adopters */}
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-slate-300 mb-2 sm:mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    Industry Adopters
                  </h3>
                  <ReferenceList references={selectedCase.realWorld.adopters} variant="card" />
                </div>

                {/* Quote Source */}
                {selectedCase.realWorld.quoteSource && (
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-slate-300 mb-2 sm:mb-3 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                      Quote Source
                    </h3>
                    <ReferenceLink
                      reference={selectedCase.realWorld.quoteSource}
                      variant="card"
                    />
                  </div>
                )}

                {/* Algorithm References */}
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-slate-300 mb-2 sm:mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-violet-500"></span>
                    Algorithm Standards
                  </h3>
                  <div className="space-y-2">
                    {selectedCase.solution.algorithms.includes('kyber') && (
                      <ReferenceLink
                        reference={{
                          label: 'NIST FIPS 203 (ML-KEM / Kyber)',
                          url: 'https://csrc.nist.gov/pubs/fips/203/final',
                          description: 'Module-Lattice-Based Key-Encapsulation Mechanism Standard'
                        }}
                        variant="card"
                      />
                    )}
                    {selectedCase.solution.algorithms.includes('dilithium') && (
                      <ReferenceLink
                        reference={{
                          label: 'NIST FIPS 204 (ML-DSA / Dilithium)',
                          url: 'https://csrc.nist.gov/pubs/fips/204/final',
                          description: 'Module-Lattice-Based Digital Signature Standard'
                        }}
                        variant="card"
                      />
                    )}
                    {selectedCase.solution.algorithms.includes('sphincs') && (
                      <ReferenceLink
                        reference={{
                          label: 'NIST FIPS 205 (SLH-DSA / SPHINCS+)',
                          url: 'https://csrc.nist.gov/pubs/fips/205/final',
                          description: 'Stateless Hash-Based Digital Signature Standard'
                        }}
                        variant="card"
                      />
                    )}
                  </div>
                </div>

                {/* General Resources */}
                <div>
                  <h3 className="text-xs sm:text-sm font-semibold text-slate-300 mb-2 sm:mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-slate-500"></span>
                    General Resources
                  </h3>
                  <div className="space-y-2">
                    <ReferenceLink
                      reference={{
                        label: 'NIST Post-Quantum Cryptography',
                        url: 'https://www.nist.gov/pqcrypto',
                        description: 'NIST PQC Standardization Project'
                      }}
                      variant="card"
                    />
                    <ReferenceLink
                      reference={{
                        label: 'CRYSTALS Project (pq-crystals.org)',
                        url: 'https://pq-crystals.org/',
                        description: 'Kyber and Dilithium reference implementations'
                      }}
                      variant="card"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Context Tab */}
          {activeTab === 'context' && (
            <div>
              <div className="p-4 sm:p-6 border-b border-slate-800/50">
                <h2 className="text-base sm:text-lg font-semibold text-white">Real-World Context</h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">Industry adoption and standards</p>
              </div>
              <div className="p-4 sm:p-6">
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
                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-slate-800/30 rounded-xl border-l-2 border-slate-600">
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
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
