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
        description: 'Applications sending prompts containing sensitive business logic, PII, and proprietary reasoning chains to the LLM API'
      },
      {
        id: 'tls',
        label: 'TLS + Kyber',
        icon: Lock,
        position: 1,
        isEncryption: true,
        description: 'Hybrid X25519 + Kyber768 key exchange establishes quantum-resistant session keys. Per-session forward secrecy prevents bulk "harvest now, decrypt later" attacks'
      },
      {
        id: 'gateway',
        label: 'API Gateway',
        icon: Server,
        position: 2,
        description: 'Entry point where TLS terminates. Classical-only clients remain compatible while quantum-resistant sessions get full protection'
      },
      {
        id: 'llm',
        label: 'LLM',
        icon: Brain,
        position: 3,
        description: 'Model processes prompts and returns responses. All traffic protected by Kyber-derived session keys for the connection lifetime'
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
        description: 'CI/CD pipeline produces model artifacts. Without signatures, consumers cannot verify authenticity or detect backdoors injected during distribution'
      },
      {
        id: 'sign',
        label: 'Dilithium Sign',
        icon: Fingerprint,
        position: 1,
        isEncryption: true,
        description: 'ML-DSA signs manifest containing model hash, version, and training metadata. Signature proves model came from authorized source and was not tampered with'
      },
      {
        id: 'registry',
        label: 'Registry',
        icon: Database,
        position: 2,
        description: 'Centralized storage for versioned models. Signature travels with artifacts, enabling verification at any point in the supply chain'
      },
      {
        id: 'verify',
        label: 'Verify',
        icon: ShieldCheck,
        position: 3,
        isEncryption: true,
        description: 'Signature verification before loading catches compromised models that could subtly manipulate outputs or exfiltrate data when triggered'
      },
      {
        id: 'deploy',
        label: 'Deploy',
        icon: Server,
        position: 4,
        description: 'Only verified models reach production. Chain of custody from build through deployment prevents supply chain attacks'
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
        description: 'User query converted to embeddings. Vec2Text attacks can reconstruct original text from vectors with 70-90% accuracy if exposed'
      },
      {
        id: 'encrypt',
        label: 'Kyber Encrypt',
        icon: Lock,
        position: 1,
        isEncryption: true,
        description: 'Embeddings encrypted with Kyber-wrapped DEKs before storage. Property-preserving encryption enables similarity search on encrypted vectors'
      },
      {
        id: 'vectordb',
        label: 'Vector DB',
        icon: Database,
        position: 2,
        description: 'Pinecone/Weaviate/Qdrant stores encrypted embeddings. Even if database is breached, vectors cannot be inverted to recover documents'
      },
      {
        id: 'decrypt',
        label: 'Decrypt',
        icon: Key,
        position: 3,
        isEncryption: true,
        description: 'Retrieved chunks decrypted only after access control verification. Per-document keys enable fine-grained permissions'
      },
      {
        id: 'response',
        label: 'Response',
        icon: FileText,
        position: 4,
        description: 'LLM receives decrypted context. Sensitive documents never exposed in plaintext outside the secure pipeline'
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
        description: 'API client with ML-DSA keypair registered with provider. Replaces long-lived API keys vulnerable to "harvest now, decrypt later" attacks'
      },
      {
        id: 'challenge',
        label: 'ML-DSA Sign',
        icon: Fingerprint,
        position: 1,
        isEncryption: true,
        description: 'Client signs server challenge with ML-DSA private key, proving identity without transmitting reusable credentials over the network'
      },
      {
        id: 'server',
        label: 'Server',
        icon: Server,
        position: 2,
        description: 'Verifies ML-DSA signature against registered public key. Rejects invalid signatures before establishing session'
      },
      {
        id: 'session',
        label: 'Kyber Session',
        icon: Lock,
        position: 3,
        isEncryption: true,
        description: 'Kyber encapsulation creates shared secret. Server derives 15-minute session token, limiting exposure window if captured'
      },
      {
        id: 'api',
        label: 'API Access',
        icon: Zap,
        position: 4,
        description: 'Short-lived token grants API access. Even if intercepted, token expires quickly and cannot be decrypted by future quantum computers'
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
        description: 'Distributed participants compute gradients on private local data. Without authentication, malicious actors can submit poisoned updates to embed backdoors'
      },
      {
        id: 'sign',
        label: 'Sign Updates',
        icon: Fingerprint,
        position: 1,
        isEncryption: true,
        description: 'Each client signs gradient updates with their registered ML-DSA key. Enables accountability and detection of poisoning attempts'
      },
      {
        id: 'encrypt',
        label: 'Kyber Encrypt',
        icon: Lock,
        position: 2,
        isEncryption: true,
        description: 'Kyber session key encrypts gradients in transit. Prevents eavesdroppers from inferring training data via gradient interception'
      },
      {
        id: 'aggregator',
        label: 'Aggregator',
        icon: Server,
        position: 3,
        description: 'Verifies signatures before decryption. Quarantines clients with invalid signatures. Only authenticated updates enter secure aggregation'
      },
      {
        id: 'model',
        label: 'Global Model',
        icon: Brain,
        position: 4,
        description: 'Updated global model combines only verified gradients. Audit trail enables detection if model behavior later seems compromised'
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
        description: 'Raw training data containing licensed content, PII, and proprietary information. Exposure enables lawsuits (NYT v. OpenAI) and GDPR violations'
      },
      {
        id: 'encrypt',
        label: 'Kyber DEK',
        icon: Lock,
        position: 1,
        isEncryption: true,
        description: 'Each shard gets unique DEK wrapped with Kyber. Key hierarchy enables access revocation without re-encrypting entire corpus'
      },
      {
        id: 'shard',
        label: 'Encrypted Shard',
        icon: Database,
        position: 2,
        description: 'Individually encrypted partitions stored across distributed storage. Breach of one shard cannot decrypt others'
      },
      {
        id: 'sign',
        label: 'Sign Manifest',
        icon: Fingerprint,
        position: 3,
        isEncryption: true,
        description: 'ML-DSA signed manifest links shards to sources, timestamps, and licenses. Creates cryptographic chain of custody for litigation defense'
      },
      {
        id: 'audit',
        label: 'Audit Trail',
        icon: FileText,
        position: 4,
        description: 'Immutable provenance records prove what data was used and when. Signed manifests satisfy GDPR Article 30 record requirements'
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
        description: 'Training run producing checkpoints worth $100M+ in compute. The Llama leak showed checkpoints can escape within days of creation'
      },
      {
        id: 'encrypt',
        label: 'KEK \u2192 DEK',
        icon: Lock,
        position: 1,
        isEncryption: true,
        description: 'Kyber-protected master KEK wraps per-checkpoint DEKs. Key rotation at KEK level invalidates all downstream keys without re-encryption'
      },
      {
        id: 'checkpoint',
        label: 'Encrypted Checkpoint',
        icon: GitBranch,
        position: 2,
        description: 'Stream encryption handles 140GB+ checkpoints efficiently. Model inversion attacks cannot extract training data from encrypted weights'
      },
      {
        id: 'sign',
        label: 'Sign Manifest',
        icon: Fingerprint,
        position: 3,
        isEncryption: true,
        description: 'ML-DSA signature on manifest proves checkpoint integrity. Links to training state, hyperparameters, and dataset version'
      },
      {
        id: 'storage',
        label: 'Secure Storage',
        icon: HardDrive,
        position: 4,
        description: 'Encrypted checkpoints stored with fine-grained access control. Per-checkpoint DEKs enable sharing specific versions without exposing others'
      }
    ],
    description: 'Key hierarchy: Kyber \u2192 KEK \u2192 per-checkpoint DEK. Manifest signed for integrity.'
  },
  kvCache: {
    title: 'KV Cache Isolation',
    nodes: [
      {
        id: 'request',
        label: 'Request',
        icon: MessageSquare,
        position: 0,
        description: 'Inference request in multi-tenant environment. Llama-70B with 32K context uses ~288GB KV cache shared across batch'
      },
      {
        id: 'gpu',
        label: 'GPU Memory',
        icon: Cpu,
        position: 1,
        description: 'GPU HBM holds active KV cache containing full conversation context. Side-channel attacks can extract neighboring memory contents'
      },
      {
        id: 'swap',
        label: 'Swap Encrypt',
        icon: Lock,
        position: 2,
        isEncryption: true,
        description: 'Per-request Kyber-derived key encrypts KV tensors on swap-out. Prevents cross-tenant leakage through host memory exposure'
      },
      {
        id: 'host',
        label: 'Host Memory',
        icon: HardDrive,
        position: 3,
        description: 'System RAM holds encrypted swapped KV pairs. Even if dumped, conversation context cannot be recovered without request key'
      },
      {
        id: 'restore',
        label: 'Decrypt Restore',
        icon: RefreshCw,
        position: 4,
        description: 'KV cache decrypted on swap-in back to GPU. Full GPU-resident encryption awaits CXL or TEE hardware support'
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
        description: '8xA100 generates 140+ GB/s gradient traffic per GPU. Cross-datacenter training exposes model architecture and training dynamics to interception'
      },
      {
        id: 'compress',
        label: 'Compress',
        icon: Layers,
        position: 1,
        description: '1-bit SGD achieves 32x compression (140 GB/s \u2192 4.4 GB/s). Makes software encryption viable at slight accuracy cost'
      },
      {
        id: 'encrypt',
        label: 'SmartNIC Encrypt',
        icon: Lock,
        position: 2,
        isEncryption: true,
        description: 'NVIDIA BlueField SmartNIC offloads AES-GCM at line rate. Kyber key exchange establishes session, hardware handles bulk encryption'
      },
      {
        id: 'network',
        label: 'Network',
        icon: Network,
        position: 3,
        description: 'Cross-datacenter backbone traffic encrypted. Nation-state adversaries cannot intercept training progress or architecture details'
      },
      {
        id: 'sync',
        label: 'AllReduce',
        icon: RefreshCw,
        position: 4,
        description: 'Encrypted AllReduce aggregates gradients. Without hardware offload, software encryption causes >50% throughput loss'
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
        description: 'Bayesian inference generates posterior samples. Raw traces enable membership inference with 70-90% accuracy\u2014far more sensitive than point estimates'
      },
      {
        id: 'encrypt',
        label: 'Encrypt Traces',
        icon: Lock,
        position: 1,
        isEncryption: true,
        description: 'Kyber-wrapped DEKs encrypt raw MCMC traces. Traces can be inverted to recover training examples; encryption is essential for healthcare/financial models'
      },
      {
        id: 'storage',
        label: 'Secure Storage',
        icon: Database,
        position: 2,
        description: 'Encrypted traces with tiered access control. Analysts see only summaries; auditors require justification for trace access'
      },
      {
        id: 'sign',
        label: 'Sign Summary',
        icon: Fingerprint,
        position: 3,
        isEncryption: true,
        description: 'ML-DSA signs summary statistics (means, CIs). Signed summaries can be shared publicly while raw traces remain restricted'
      },
      {
        id: 'access',
        label: 'Tiered Access',
        icon: Users,
        position: 4,
        description: 'Public tier: signed summaries. Analyst tier: decrypted summaries. Auditor tier: full traces with audit logging for HIPAA compliance'
      }
    ],
    description: 'Raw traces encrypted with restricted access. Summary statistics signed for public release.'
  }
};
