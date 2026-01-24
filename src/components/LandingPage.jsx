import React from 'react';
import { Shield, ArrowRight, Lock, Cpu, Database, ChevronRight } from 'lucide-react';
import { QuantumTimeline } from './QuantumTimeline';

export const LandingPage = ({ onEnterDashboard }) => {
  return (
    <div className="min-h-screen bg-[#0a0f1a] text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background gradient effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-900/20 via-transparent to-violet-900/20" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          {/* Logo and Title */}
          <div className="text-center mb-10 sm:mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="p-3 bg-gradient-to-br from-sky-500/20 to-violet-500/20 rounded-2xl border border-sky-500/30">
                <Shield className="w-10 h-10 sm:w-12 sm:h-12 text-sky-400" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-sky-200 to-violet-200 bg-clip-text text-transparent">
              Post-Quantum Security for AI
            </h1>
            <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
              A comprehensive guide to protecting AI and LLM systems against quantum computing threats
            </p>
          </div>

          {/* What is this section */}
          <div className="max-w-4xl mx-auto mb-12 sm:mb-16">
            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white">What is this?</h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                This interactive dashboard explores the intersection of <span className="text-sky-400 font-medium">post-quantum cryptography (PQC)</span> and
                <span className="text-violet-400 font-medium"> AI security</span>. As quantum computing advances, the cryptographic foundations
                protecting AI systems are at risk. This resource helps security teams, ML engineers, and architects understand where
                quantum-resistant algorithms need to be deployed across the AI stack.
              </p>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="flex items-start gap-3 p-4 bg-slate-800/50 rounded-xl">
                  <Lock className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-white text-sm mb-1">10 Security Use Cases</h3>
                    <p className="text-xs text-slate-500">From inference APIs to training data protection</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-slate-800/50 rounded-xl">
                  <Cpu className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-white text-sm mb-1">PQC Algorithm Guidance</h3>
                    <p className="text-xs text-slate-500">ML-KEM, ML-DSA, SLH-DSA recommendations</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-slate-800/50 rounded-xl">
                  <Database className="w-5 h-5 text-sky-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="font-medium text-white text-sm mb-1">Implementation Details</h3>
                    <p className="text-xs text-slate-500">Code examples, performance metrics, and references</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Why it matters section */}
          <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-center text-white">Why does this matter now?</h2>
            <p className="text-slate-400 text-center max-w-2xl mx-auto mb-8">
              Quantum computers capable of breaking current encryption may arrive within the next decade.
              The "harvest now, decrypt later" threat means data captured today could be exposed tomorrow.
            </p>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <QuantumTimeline />

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center">
          <button
            onClick={onEnterDashboard}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-sky-600 to-violet-600 hover:from-sky-500 hover:to-violet-500 text-white font-semibold rounded-xl shadow-lg shadow-sky-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/30 hover:scale-105"
          >
            Explore the Dashboard
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>
          <p className="mt-4 text-sm text-slate-500">
            Dive into detailed threat analysis, solutions, and implementation guidance
          </p>
        </div>

        {/* Quick links */}
        <div className="mt-12 sm:mt-16 grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <button
            onClick={onEnterDashboard}
            className="group flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 hover:border-red-500/50 rounded-xl transition-all"
          >
            <div className="text-left">
              <span className="text-xs text-red-400 font-medium">Critical Now</span>
              <p className="text-sm text-slate-300">LLM Inference APIs</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-red-400 transition-colors" />
          </button>
          <button
            onClick={onEnterDashboard}
            className="group flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 hover:border-amber-500/50 rounded-xl transition-all"
          >
            <div className="text-left">
              <span className="text-xs text-amber-400 font-medium">High Priority</span>
              <p className="text-sm text-slate-300">Model Artifact Signing</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-amber-400 transition-colors" />
          </button>
          <button
            onClick={onEnterDashboard}
            className="group flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800 hover:border-sky-500/50 rounded-xl transition-all"
          >
            <div className="text-left">
              <span className="text-xs text-sky-400 font-medium">Plan Ahead</span>
              <p className="text-sm text-slate-300">Training Data Protection</p>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-sky-400 transition-colors" />
          </button>
        </div>
      </div>

      {/* Footer note */}
      <div className="border-t border-slate-800/50 py-6">
        <p className="text-center text-xs text-slate-600">
          Based on NIST PQC standards and current AI security best practices
        </p>
      </div>
    </div>
  );
};
