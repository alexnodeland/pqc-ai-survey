import {
  Users, Lock, Server, Brain, Box, Fingerprint, Database, ShieldCheck,
  MessageSquare, Key, FileText, Zap, Network, Globe, Activity, GitBranch,
  HardDrive, Cpu, Layers, RefreshCw
} from 'lucide-react';

export const flowDiagrams = {
  inference: {
    title: 'API Traffic Protection',
    nodes: [
      { id: 'client', label: 'Client', icon: Users, position: 0 },
      { id: 'tls', label: 'TLS + Kyber', icon: Lock, position: 1, isEncryption: true },
      { id: 'gateway', label: 'API Gateway', icon: Server, position: 2 },
      { id: 'llm', label: 'LLM', icon: Brain, position: 3 }
    ],
    description: 'Hybrid key exchange protects all traffic between client and gateway. Internal traffic uses standard TLS.'
  },
  modelRegistry: {
    title: 'Model Supply Chain',
    nodes: [
      { id: 'build', label: 'Build', icon: Box, position: 0 },
      { id: 'sign', label: 'Dilithium Sign', icon: Fingerprint, position: 1, isEncryption: true },
      { id: 'registry', label: 'Registry', icon: Database, position: 2 },
      { id: 'verify', label: 'Verify', icon: ShieldCheck, position: 3, isEncryption: true },
      { id: 'deploy', label: 'Deploy', icon: Server, position: 4 }
    ],
    description: 'Models are signed at build time, stored in registry, and verified before deployment.'
  },
  ragSecurity: {
    title: 'Encrypted Vector Search',
    nodes: [
      { id: 'query', label: 'Query', icon: MessageSquare, position: 0 },
      { id: 'encrypt', label: 'Kyber Encrypt', icon: Lock, position: 1, isEncryption: true },
      { id: 'vectordb', label: 'Vector DB', icon: Database, position: 2 },
      { id: 'decrypt', label: 'Decrypt', icon: Key, position: 3, isEncryption: true },
      { id: 'response', label: 'Response', icon: FileText, position: 4 }
    ],
    description: 'Embeddings encrypted at rest. Query transforms preserve similarity search capability.'
  },
  apiKeySecurity: {
    title: 'Session-Based Auth',
    nodes: [
      { id: 'client', label: 'Client', icon: Users, position: 0 },
      { id: 'challenge', label: 'ML-DSA Sign', icon: Fingerprint, position: 1, isEncryption: true },
      { id: 'server', label: 'Server', icon: Server, position: 2 },
      { id: 'session', label: 'Kyber Session', icon: Lock, position: 3, isEncryption: true },
      { id: 'api', label: 'API Access', icon: Zap, position: 4 }
    ],
    description: 'Challenge-response auth with ML-DSA, then Kyber session keys for 15-minute tokens.'
  },
  federatedLearning: {
    title: 'Secure Gradient Exchange',
    nodes: [
      { id: 'clients', label: 'FL Clients', icon: Users, position: 0 },
      { id: 'sign', label: 'Sign Updates', icon: Fingerprint, position: 1, isEncryption: true },
      { id: 'encrypt', label: 'Kyber Encrypt', icon: Lock, position: 2, isEncryption: true },
      { id: 'aggregator', label: 'Aggregator', icon: Server, position: 3 },
      { id: 'model', label: 'Global Model', icon: Brain, position: 4 }
    ],
    description: 'Each client signs and encrypts gradient updates. Aggregator verifies before combining.'
  },
  trainingData: {
    title: 'Corpus Encryption',
    nodes: [
      { id: 'source', label: 'Data Source', icon: Globe, position: 0 },
      { id: 'encrypt', label: 'Kyber DEK', icon: Lock, position: 1, isEncryption: true },
      { id: 'shard', label: 'Encrypted Shard', icon: Database, position: 2 },
      { id: 'sign', label: 'Sign Manifest', icon: Fingerprint, position: 3, isEncryption: true },
      { id: 'audit', label: 'Audit Trail', icon: FileText, position: 4 }
    ],
    description: 'Each shard encrypted with unique DEK. Manifest signed for provenance tracking.'
  },
  checkpoints: {
    title: 'Checkpoint Protection',
    nodes: [
      { id: 'training', label: 'Training', icon: Activity, position: 0 },
      { id: 'encrypt', label: 'KEK → DEK', icon: Lock, position: 1, isEncryption: true },
      { id: 'checkpoint', label: 'Encrypted Checkpoint', icon: GitBranch, position: 2 },
      { id: 'sign', label: 'Sign Manifest', icon: Fingerprint, position: 3, isEncryption: true },
      { id: 'storage', label: 'Secure Storage', icon: HardDrive, position: 4 }
    ],
    description: 'Key hierarchy: Kyber → KEK → per-checkpoint DEK. Manifest signed for integrity.'
  },
  kvCache: {
    title: 'KV Cache Isolation',
    nodes: [
      { id: 'request', label: 'Request', icon: MessageSquare, position: 0 },
      { id: 'gpu', label: 'GPU Memory', icon: Cpu, position: 1 },
      { id: 'swap', label: 'Swap Encrypt', icon: Lock, position: 2, isEncryption: true },
      { id: 'host', label: 'Host Memory', icon: HardDrive, position: 3 },
      { id: 'restore', label: 'Decrypt Restore', icon: RefreshCw, position: 4 }
    ],
    description: 'Per-request encryption keys. KV cache encrypted when swapped to host memory.'
  },
  gradientSync: {
    title: 'Distributed Training',
    nodes: [
      { id: 'gpu', label: 'GPU Cluster', icon: Cpu, position: 0 },
      { id: 'compress', label: 'Compress', icon: Layers, position: 1 },
      { id: 'encrypt', label: 'SmartNIC Encrypt', icon: Lock, position: 2, isEncryption: true },
      { id: 'network', label: 'Network', icon: Network, position: 3 },
      { id: 'sync', label: 'AllReduce', icon: RefreshCw, position: 4 }
    ],
    description: 'Hardware-accelerated encryption via SmartNIC. Compression makes software encryption viable.'
  },
  posteriorTraces: {
    title: 'Tiered Trace Access',
    nodes: [
      { id: 'mcmc', label: 'MCMC Sampling', icon: Activity, position: 0 },
      { id: 'encrypt', label: 'Encrypt Traces', icon: Lock, position: 1, isEncryption: true },
      { id: 'storage', label: 'Secure Storage', icon: Database, position: 2 },
      { id: 'sign', label: 'Sign Summary', icon: Fingerprint, position: 3, isEncryption: true },
      { id: 'access', label: 'Tiered Access', icon: Users, position: 4 }
    ],
    description: 'Raw traces encrypted with restricted access. Summary statistics signed for public release.'
  }
};
