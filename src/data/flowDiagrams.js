import {
  Users, Lock, Server, Brain, Box, Fingerprint, Database, ShieldCheck,
  MessageSquare, Key, FileText, Zap, Network, Globe, Activity, GitBranch,
  HardDrive, Cpu, Layers, RefreshCw
} from 'lucide-react';

export const flowDiagrams = {
  inference: {
    title: 'API Traffic Protection',
    nodes: [
      {
        id: 'client',
        label: 'Client',
        icon: Users,
        position: 0,
        description: 'End users or applications making API requests to the LLM service'
      },
      {
        id: 'tls',
        label: 'TLS + Kyber',
        icon: Lock,
        position: 1,
        isEncryption: true,
        description: 'Hybrid TLS 1.3 with Kyber key encapsulation provides quantum-resistant encryption for data in transit'
      },
      {
        id: 'gateway',
        label: 'API Gateway',
        icon: Server,
        position: 2,
        description: 'Entry point that handles authentication, rate limiting, and request routing to backend services'
      },
      {
        id: 'llm',
        label: 'LLM',
        icon: Brain,
        position: 3,
        description: 'The large language model that processes prompts and generates responses'
      }
    ],
    description: 'Hybrid key exchange protects all traffic between client and gateway. Internal traffic uses standard TLS.'
  },
  modelRegistry: {
    title: 'Model Supply Chain',
    nodes: [
      {
        id: 'build',
        label: 'Build',
        icon: Box,
        position: 0,
        description: 'CI/CD pipeline that produces model artifacts from training runs'
      },
      {
        id: 'sign',
        label: 'Dilithium Sign',
        icon: Fingerprint,
        position: 1,
        isEncryption: true,
        description: 'ML-DSA (Dilithium) digital signature ensures model authenticity and integrity'
      },
      {
        id: 'registry',
        label: 'Registry',
        icon: Database,
        position: 2,
        description: 'Centralized storage for versioned model artifacts with metadata'
      },
      {
        id: 'verify',
        label: 'Verify',
        icon: ShieldCheck,
        position: 3,
        isEncryption: true,
        description: 'Signature verification before deployment prevents tampering and ensures provenance'
      },
      {
        id: 'deploy',
        label: 'Deploy',
        icon: Server,
        position: 4,
        description: 'Production deployment of verified models to inference infrastructure'
      }
    ],
    description: 'Models are signed at build time, stored in registry, and verified before deployment.'
  },
  ragSecurity: {
    title: 'Encrypted Vector Search',
    nodes: [
      {
        id: 'query',
        label: 'Query',
        icon: MessageSquare,
        position: 0,
        description: 'User query to be transformed into vector embeddings for similarity search'
      },
      {
        id: 'encrypt',
        label: 'Kyber Encrypt',
        icon: Lock,
        position: 1,
        isEncryption: true,
        description: 'Kyber-encrypted embeddings using techniques that preserve semantic similarity for search'
      },
      {
        id: 'vectordb',
        label: 'Vector DB',
        icon: Database,
        position: 2,
        description: 'Vector database storing encrypted embeddings for retrieval-augmented generation'
      },
      {
        id: 'decrypt',
        label: 'Decrypt',
        icon: Key,
        position: 3,
        isEncryption: true,
        description: 'Secure decryption of retrieved context before LLM processing'
      },
      {
        id: 'response',
        label: 'Response',
        icon: FileText,
        position: 4,
        description: 'Final response incorporating retrieved context from the knowledge base'
      }
    ],
    description: 'Embeddings encrypted at rest. Query transforms preserve similarity search capability.'
  },
  apiKeySecurity: {
    title: 'Session-Based Auth',
    nodes: [
      {
        id: 'client',
        label: 'Client',
        icon: Users,
        position: 0,
        description: 'Client application requesting authenticated API access'
      },
      {
        id: 'challenge',
        label: 'ML-DSA Sign',
        icon: Fingerprint,
        position: 1,
        isEncryption: true,
        description: 'ML-DSA signature proves client identity via cryptographic challenge-response'
      },
      {
        id: 'server',
        label: 'Server',
        icon: Server,
        position: 2,
        description: 'Authentication server validating client credentials and issuing tokens'
      },
      {
        id: 'session',
        label: 'Kyber Session',
        icon: Lock,
        position: 3,
        isEncryption: true,
        description: 'Kyber-derived session keys enable short-lived tokens with 15-minute TTL'
      },
      {
        id: 'api',
        label: 'API Access',
        icon: Zap,
        position: 4,
        description: 'Protected API endpoint accessible with valid session token'
      }
    ],
    description: 'Challenge-response auth with ML-DSA, then Kyber session keys for 15-minute tokens.'
  },
  federatedLearning: {
    title: 'Secure Gradient Exchange',
    nodes: [
      {
        id: 'clients',
        label: 'FL Clients',
        icon: Users,
        position: 0,
        description: 'Distributed training participants with local private data'
      },
      {
        id: 'sign',
        label: 'Sign Updates',
        icon: Fingerprint,
        position: 1,
        isEncryption: true,
        description: 'ML-DSA signatures authenticate gradient update sources to prevent poisoning'
      },
      {
        id: 'encrypt',
        label: 'Kyber Encrypt',
        icon: Lock,
        position: 2,
        isEncryption: true,
        description: 'Kyber encryption protects gradient updates from eavesdropping in transit'
      },
      {
        id: 'aggregator',
        label: 'Aggregator',
        icon: Server,
        position: 3,
        description: 'Central server combining verified gradient updates using secure aggregation'
      },
      {
        id: 'model',
        label: 'Global Model',
        icon: Brain,
        position: 4,
        description: 'Updated global model after secure federated aggregation'
      }
    ],
    description: 'Each client signs and encrypts gradient updates. Aggregator verifies before combining.'
  },
  trainingData: {
    title: 'Corpus Encryption',
    nodes: [
      {
        id: 'source',
        label: 'Data Source',
        icon: Globe,
        position: 0,
        description: 'Raw training data collected from various sources for model training'
      },
      {
        id: 'encrypt',
        label: 'Kyber DEK',
        icon: Lock,
        position: 1,
        isEncryption: true,
        description: 'Per-shard Data Encryption Keys (DEKs) wrapped with Kyber for quantum resistance'
      },
      {
        id: 'shard',
        label: 'Encrypted Shard',
        icon: Database,
        position: 2,
        description: 'Individually encrypted data partitions stored across distributed storage'
      },
      {
        id: 'sign',
        label: 'Sign Manifest',
        icon: Fingerprint,
        position: 3,
        isEncryption: true,
        description: 'ML-DSA signed manifest enables provenance tracking and tamper detection'
      },
      {
        id: 'audit',
        label: 'Audit Trail',
        icon: FileText,
        position: 4,
        description: 'Immutable audit trail for compliance, debugging, and data lineage'
      }
    ],
    description: 'Each shard encrypted with unique DEK. Manifest signed for provenance tracking.'
  },
  checkpoints: {
    title: 'Checkpoint Protection',
    nodes: [
      {
        id: 'training',
        label: 'Training',
        icon: Activity,
        position: 0,
        description: 'Active model training producing periodic weight snapshots'
      },
      {
        id: 'encrypt',
        label: 'KEK → DEK',
        icon: Lock,
        position: 1,
        isEncryption: true,
        description: 'Key hierarchy with Kyber-protected KEK deriving per-checkpoint DEKs'
      },
      {
        id: 'checkpoint',
        label: 'Encrypted Checkpoint',
        icon: GitBranch,
        position: 2,
        description: 'Encrypted model state captured at training milestones for recovery'
      },
      {
        id: 'sign',
        label: 'Sign Manifest',
        icon: Fingerprint,
        position: 3,
        isEncryption: true,
        description: 'ML-DSA signed manifest for checkpoint integrity verification'
      },
      {
        id: 'storage',
        label: 'Secure Storage',
        icon: HardDrive,
        position: 4,
        description: 'Secure, redundant storage for encrypted checkpoints with access controls'
      }
    ],
    description: 'Key hierarchy: Kyber → KEK → per-checkpoint DEK. Manifest signed for integrity.'
  },
  kvCache: {
    title: 'KV Cache Isolation',
    nodes: [
      {
        id: 'request',
        label: 'Request',
        icon: MessageSquare,
        position: 0,
        description: 'Inference request requiring cached key-value attention pairs'
      },
      {
        id: 'gpu',
        label: 'GPU Memory',
        icon: Cpu,
        position: 1,
        description: 'High-speed GPU memory holding active KV cache for fast attention'
      },
      {
        id: 'swap',
        label: 'Swap Encrypt',
        icon: Lock,
        position: 2,
        isEncryption: true,
        description: 'Per-request Kyber encryption when swapping KV cache to host memory'
      },
      {
        id: 'host',
        label: 'Host Memory',
        icon: HardDrive,
        position: 3,
        description: 'System RAM holding encrypted, swapped KV pairs for memory management'
      },
      {
        id: 'restore',
        label: 'Decrypt Restore',
        icon: RefreshCw,
        position: 4,
        description: 'Secure decryption and restoration of KV cache back to GPU memory'
      }
    ],
    description: 'Per-request encryption keys. KV cache encrypted when swapped to host memory.'
  },
  gradientSync: {
    title: 'Distributed Training',
    nodes: [
      {
        id: 'gpu',
        label: 'GPU Cluster',
        icon: Cpu,
        position: 0,
        description: 'Multi-GPU or multi-node training cluster computing gradients'
      },
      {
        id: 'compress',
        label: 'Compress',
        icon: Layers,
        position: 1,
        description: 'Gradient compression reducing bandwidth and making encryption viable'
      },
      {
        id: 'encrypt',
        label: 'SmartNIC Encrypt',
        icon: Lock,
        position: 2,
        isEncryption: true,
        description: 'Hardware-accelerated Kyber encryption via SmartNIC for line-rate performance'
      },
      {
        id: 'network',
        label: 'Network',
        icon: Network,
        position: 3,
        description: 'Network fabric connecting distributed training nodes securely'
      },
      {
        id: 'sync',
        label: 'AllReduce',
        icon: RefreshCw,
        position: 4,
        description: 'AllReduce synchronization aggregating encrypted gradients across nodes'
      }
    ],
    description: 'Hardware-accelerated encryption via SmartNIC. Compression makes software encryption viable.'
  },
  posteriorTraces: {
    title: 'Tiered Trace Access',
    nodes: [
      {
        id: 'mcmc',
        label: 'MCMC Sampling',
        icon: Activity,
        position: 0,
        description: 'Markov Chain Monte Carlo sampling generating posterior traces'
      },
      {
        id: 'encrypt',
        label: 'Encrypt Traces',
        icon: Lock,
        position: 1,
        isEncryption: true,
        description: 'Kyber encryption of sensitive raw posterior traces for privacy'
      },
      {
        id: 'storage',
        label: 'Secure Storage',
        icon: Database,
        position: 2,
        description: 'Secure storage with granular access controls for trace data'
      },
      {
        id: 'sign',
        label: 'Sign Summary',
        icon: Fingerprint,
        position: 3,
        isEncryption: true,
        description: 'ML-DSA signed summary statistics for verifiable public release'
      },
      {
        id: 'access',
        label: 'Tiered Access',
        icon: Users,
        position: 4,
        description: 'Tiered access control: restricted raw traces, public signed summaries'
      }
    ],
    description: 'Raw traces encrypted with restricted access. Summary statistics signed for public release.'
  }
};
