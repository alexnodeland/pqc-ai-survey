import React from 'react';
import { Shield, ArrowRight, Lock, Cpu, Database, ChevronRight, ChevronDown, Zap } from 'lucide-react';
import { QuantumTimeline } from './QuantumTimeline';

export const LandingPage = ({ onEnterDashboard }) => {
  return (
    <div className="min-h-screen bg-dark-900 bg-circuit text-white font-mono">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-magenta/5" />
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-neon-cyan/10 rounded-full blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-neon-magenta/10 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          {/* Logo and Title */}
          <div className="text-center mb-12 sm:mb-20">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="relative p-4 sm:p-5 rounded-2xl border border-neon-cyan/50 bg-dark-800/80 shadow-neon-cyan animate-neon-border">
                <Shield className="w-12 h-12 sm:w-16 sm:h-16 text-neon-cyan" />
                <div className="absolute inset-0 rounded-2xl bg-neon-cyan/5" />
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 tracking-tight">
              <span className="text-neon-cyan text-glow-cyan">POST-QUANTUM</span>
              <br />
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                SECURITY FOR AI
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed tracking-wide">
              <span className="text-neon-cyan">&gt;</span> Protecting AI systems against quantum threats with NIST-standardized cryptography
            </p>

            {/* Hero CTA - immediately visible */}
            <div className="mt-8 sm:mt-10">
              <button
                onClick={onEnterDashboard}
                className="btn-neon group inline-flex items-center gap-3 px-8 py-4 font-display font-semibold uppercase tracking-widest text-sm border-2 border-neon-cyan text-neon-cyan bg-neon-cyan/5 hover:bg-neon-cyan/15 hover:shadow-neon-cyan-lg rounded-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <span>Enter Dashboard</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
              </button>
              <p className="mt-4 text-xs text-slate-600 tracking-wide">
                or scroll to learn more
              </p>
            </div>
          </div>

          {/* What is this section */}
          <div className="max-w-4xl mx-auto mb-16 sm:mb-20">
            <div className="card-retro rounded-xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px flex-1 bg-gradient-to-r from-neon-cyan/50 to-transparent" />
                <h2 className="text-lg sm:text-xl font-display font-semibold text-neon-cyan uppercase tracking-widest">
                  // ABOUT
                </h2>
                <div className="h-px flex-1 bg-gradient-to-l from-neon-cyan/50 to-transparent" />
              </div>

              <p className="text-slate-300 leading-relaxed mb-8 text-sm sm:text-base">
                An interactive guide to{' '}
                <span className="text-neon-cyan font-semibold">post-quantum cryptography</span> for{' '}
                <span className="text-neon-magenta font-semibold">AI systems</span>—covering threats,
                solutions, and implementation paths for the quantum transition.
              </p>

              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { icon: Lock, color: 'green', title: '10 Security Use Cases', desc: 'From inference APIs to training data' },
                  { icon: Cpu, color: 'amber', title: 'PQC Algorithm Guidance', desc: 'ML-KEM, ML-DSA, SLH-DSA specs' },
                  { icon: Database, color: 'cyan', title: 'Implementation Details', desc: 'Code examples & metrics' },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="group flex items-start gap-3 p-4 bg-dark-800/50 rounded-lg border border-slate-800 hover:border-neon-cyan/30 transition-all duration-300"
                  >
                    <div className={`p-2 rounded-lg bg-neon-${item.color}/10 border border-neon-${item.color}/30`}>
                      <item.icon className={`w-4 h-4 text-neon-${item.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-sm mb-1 font-display tracking-wide">{item.title}</h3>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Why it matters section */}
          <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-5 h-5 text-neon-amber" />
              <h2 className="text-lg sm:text-xl font-display font-semibold text-white uppercase tracking-widest">
                Why Now?
              </h2>
            </div>
            <p className="text-slate-400 max-w-2xl text-sm sm:text-base leading-relaxed">
              <span className="text-neon-red font-semibold">Cryptographically relevant quantum computers are approaching.</span>{' '}
              Data captured today under classical encryption may be decrypted within years, not decades.
            </p>
          </div>

          {/* Scroll indicator */}
          <div className="flex flex-col items-center pt-8 pb-4">
            <span className="text-xs text-slate-600 mb-2 tracking-wide">Explore the timeline</span>
            <ChevronDown className="w-5 h-5 text-neon-cyan/60 animate-bounce" />
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <QuantumTimeline />

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        <div className="text-center">
          <button
            onClick={onEnterDashboard}
            className="btn-neon group inline-flex items-center gap-4 px-10 py-5 font-display font-semibold uppercase tracking-widest text-sm border-2 border-neon-cyan text-neon-cyan bg-neon-cyan/5 hover:bg-neon-cyan/15 hover:shadow-neon-cyan-lg rounded-lg transition-all duration-300 hover:scale-[1.02]"
          >
            <span>Enter Dashboard</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
          </button>
          <p className="mt-6 text-sm text-slate-500 tracking-wide">
            &gt; threat_analysis.exe // solutions // implementation_guide
          </p>
        </div>

        {/* Quick links */}
        <div className="mt-16 sm:mt-20 grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          {[
            { label: 'CRITICAL', sublabel: 'LLM Inference APIs', color: 'red' },
            { label: 'HIGH', sublabel: 'Model Artifact Signing', color: 'amber' },
            { label: 'PLAN', sublabel: 'Training Data Protection', color: 'cyan' },
          ].map((item, i) => (
            <button
              key={i}
              onClick={onEnterDashboard}
              className={`group flex items-center justify-between p-4 bg-dark-800/50 border border-slate-800 hover:border-neon-${item.color}/50 hover:shadow-neon-${item.color} rounded-lg transition-all duration-300`}
            >
              <div className="text-left">
                <span className={`text-[10px] font-display font-semibold uppercase tracking-widest text-neon-${item.color}`}>
                  {item.label}
                </span>
                <p className="text-sm text-slate-300 mt-1">{item.sublabel}</p>
              </div>
              <ChevronRight className={`w-4 h-4 text-slate-600 group-hover:text-neon-${item.color} transition-all group-hover:translate-x-1`} />
            </button>
          ))}
        </div>
      </div>

      {/* Footer note */}
      <div className="border-t border-slate-800/50 py-8">
        <p className="text-center text-xs text-slate-600 font-mono tracking-wider">
          // Based on NIST PQC standards • FIPS 203/204/205
        </p>
      </div>
    </div>
  );
};
