/**
 * Centralized reference database for all external links
 * This file contains URLs for standards, adopters, research papers, and other references
 */

export const references = {
  // NIST Standards
  standards: {
    'nist-fips-203': {
      label: 'NIST FIPS 203',
      fullLabel: 'NIST FIPS 203 (ML-KEM)',
      url: 'https://csrc.nist.gov/pubs/fips/203/final',
      description: 'Module-Lattice-Based Key-Encapsulation Mechanism Standard (Kyber)'
    },
    'nist-fips-204': {
      label: 'NIST FIPS 204',
      fullLabel: 'NIST FIPS 204 (ML-DSA)',
      url: 'https://csrc.nist.gov/pubs/fips/204/final',
      description: 'Module-Lattice-Based Digital Signature Standard (Dilithium)'
    },
    'nist-fips-205': {
      label: 'NIST FIPS 205',
      fullLabel: 'NIST FIPS 205 (SLH-DSA)',
      url: 'https://csrc.nist.gov/pubs/fips/205/final',
      description: 'Stateless Hash-Based Digital Signature Standard (SPHINCS+)'
    },
    'nist-sp-800-56c': {
      label: 'NIST SP 800-56C Rev 2',
      url: 'https://csrc.nist.gov/pubs/sp/800/56/c/r2/final',
      description: 'Recommendation for Key-Derivation Methods in Key-Establishment Schemes'
    },
    'nist-sp-800-63': {
      label: 'NIST SP 800-63',
      fullLabel: 'NIST Digital Identity Guidelines',
      url: 'https://pages.nist.gov/800-63-3/',
      description: 'Digital Identity Guidelines for federal agencies'
    },
    'nist-pqc': {
      label: 'NIST PQC',
      fullLabel: 'NIST Post-Quantum Cryptography',
      url: 'https://www.nist.gov/pqcrypto',
      description: 'NIST Post-Quantum Cryptography Standardization Project'
    },
    'ietf-tls-hybrid': {
      label: 'IETF draft-ietf-tls-hybrid-design',
      url: 'https://datatracker.ietf.org/doc/draft-ietf-tls-hybrid-design/',
      description: 'Hybrid key exchange in TLS 1.3'
    },
    'slsa': {
      label: 'SLSA Framework',
      url: 'https://slsa.dev/',
      description: 'Supply-chain Levels for Software Artifacts'
    },
    'sigstore': {
      label: 'Sigstore/cosign',
      url: 'https://github.com/sigstore/cosign',
      description: 'Code signing and transparency for containers and binaries'
    },
    'eu-ai-act': {
      label: 'EU AI Act',
      url: 'https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng',
      description: 'EU Regulation 2024/1689 on Artificial Intelligence'
    },
    'oauth-dpop': {
      label: 'OAuth 2.0 DPoP',
      url: 'https://datatracker.ietf.org/doc/html/rfc9449',
      description: 'RFC 9449 - Demonstrating Proof of Possession'
    },
    'fido2-webauthn': {
      label: 'FIDO2/WebAuthn',
      url: 'https://www.w3.org/TR/webauthn-2/',
      description: 'W3C Web Authentication Level 2 Specification'
    },
    'gdpr-article-30': {
      label: 'GDPR Article 30',
      url: 'https://gdpr-info.eu/art-30-gdpr/',
      description: 'Records of processing activities'
    },
    'hipaa': {
      label: 'HIPAA',
      url: 'https://www.hhs.gov/hipaa/index.html',
      description: 'Health Insurance Portability and Accountability Act'
    },
    'soc2': {
      label: 'SOC 2 Type II',
      url: 'https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2',
      description: 'AICPA Service Organization Control 2'
    },
    'secure-aggregation': {
      label: 'Secure Aggregation protocols',
      url: 'https://research.google/pubs/practical-secure-aggregation-for-privacy-preserving-machine-learning/',
      description: 'Google Research on Practical Secure Aggregation'
    },
    'differential-privacy': {
      label: 'Differential Privacy',
      url: 'https://www.apple.com/privacy/docs/Differential_Privacy_Overview.pdf',
      description: 'Apple Differential Privacy Overview'
    },
    'ipsec-hardware': {
      label: 'IPsec with hardware offload',
      url: 'https://docs.nvidia.com/networking/display/mlnxofedv24010331/ipsec+full+offload',
      description: 'NVIDIA IPsec Full Offload Documentation'
    }
  },

  // Organizations/Adopters
  adopters: {
    'cloudflare-pqc': {
      label: 'Cloudflare (2023)',
      url: 'https://blog.cloudflare.com/post-quantum-to-origins/',
      description: 'Cloudflare post-quantum cryptography deployment'
    },
    'cloudflare-blog': {
      label: 'Cloudflare Blog',
      url: 'https://blog.cloudflare.com/tag/post-quantum/',
      description: 'Cloudflare Post-Quantum blog posts'
    },
    'chrome-pqc': {
      label: 'Google Chrome (experimental)',
      url: 'https://chromestatus.com/feature/5257822742249472',
      description: 'Chrome X25519Kyber768 key encapsulation for TLS'
    },
    'aws-kms': {
      label: 'AWS KMS',
      url: 'https://docs.aws.amazon.com/kms/latest/developerguide/pqtls.html',
      description: 'AWS KMS hybrid post-quantum TLS'
    },
    'google-fl': {
      label: 'Google (Gboard FL)',
      url: 'https://research.google/blog/federated-learning-collaborative-machine-learning-without-centralized-training-data/',
      description: 'Google Federated Learning blog'
    },
    'apple-dp': {
      label: 'Apple (on-device learning)',
      url: 'https://machinelearning.apple.com/research/learning-with-privacy-at-scale',
      description: 'Apple Learning with Privacy at Scale'
    },
    'nvidia-ngc': {
      label: 'NVIDIA NGC',
      url: 'https://catalog.ngc.nvidia.com/',
      description: 'NVIDIA GPU Cloud container registry'
    },
    'huggingface': {
      label: 'Hugging Face (evaluating)',
      url: 'https://huggingface.co/docs/hub/en/security',
      description: 'Hugging Face Security documentation'
    },
    'mlflow': {
      label: 'MLflow (roadmap)',
      url: 'https://mlflow.org/docs/latest/model-registry.html',
      description: 'MLflow Model Registry'
    },
    'ironcore': {
      label: 'IronCore Labs (Cloaked AI)',
      url: 'https://ironcorelabs.com/products/cloaked-ai/',
      description: 'IronCore Labs Cloaked AI for encrypted embeddings'
    },
    'intel-tdx': {
      label: 'Intel TDX',
      url: 'https://www.intel.com/content/www/us/en/developer/tools/trust-domain-extensions/overview.html',
      description: 'Intel Trust Domain Extensions'
    },
    'amd-sev': {
      label: 'AMD SEV',
      url: 'https://www.amd.com/en/developer/sev.html',
      description: 'AMD Secure Encrypted Virtualization'
    },
    'azure-cc': {
      label: 'Azure Confidential Computing',
      url: 'https://azure.microsoft.com/en-us/solutions/confidential-compute',
      description: 'Azure Confidential Computing'
    },
    'aws-nitro': {
      label: 'AWS Nitro Enclaves',
      url: 'https://aws.amazon.com/ec2/nitro/nitro-enclaves/',
      description: 'AWS Nitro Enclaves for isolated compute'
    },
    'nvidia-magnum': {
      label: 'NVIDIA Magnum IO',
      url: 'https://developer.nvidia.com/magnum-io',
      description: 'NVIDIA Magnum IO for accelerated data center IO'
    },
    'pq-crystals': {
      label: 'pq-crystals.org',
      url: 'https://pq-crystals.org/',
      description: 'CRYSTALS Kyber and Dilithium project'
    }
  },

  // Research papers
  papers: {
    'vec2text': {
      label: 'Vec2Text Paper',
      url: 'https://arxiv.org/abs/2310.06816',
      description: 'Text Embeddings Reveal (Almost) As Much As Text'
    },
    'federated-dp': {
      label: 'Federated Learning with Differential Privacy',
      url: 'https://research.google/blog/federated-learning-with-formal-differential-privacy-guarantees/',
      description: 'Google Research on FL with DP'
    },
    'model-signing': {
      label: 'Model Signing v1.0',
      url: 'https://openssf.org/blog/2025/04/04/launch-of-model-signing-v1-0-openssf-ai-ml-working-group-secures-the-machine-learning-supply-chain/',
      description: 'OpenSSF Model Signing for ML Supply Chain'
    }
  },

  // Quote sources with URLs
  quotes: {
    'cloudflare-blog-2023': {
      label: 'Cloudflare Blog, 2023',
      url: 'https://blog.cloudflare.com/post-quantum-to-origins/',
      description: 'Cloudflare PQC announcement blog post'
    },
    'eu-ai-act-guidance': {
      label: 'EU AI Act compliance guidance',
      url: 'https://artificialintelligenceact.eu/',
      description: 'EU AI Act comprehensive resource'
    },
    'google-ai-blog-fl': {
      label: 'Google AI Blog on Federated Learning',
      url: 'https://research.google/blog/federated-learning-collaborative-machine-learning-without-centralized-training-data/',
      description: 'Original Google Federated Learning blog'
    },
    'nist-digital-identity': {
      label: 'NIST Digital Identity Guidelines',
      url: 'https://pages.nist.gov/800-63-3/',
      description: 'NIST SP 800-63 Digital Identity Guidelines'
    },
    'ironcore-research': {
      label: 'IronCore Labs Security Research',
      url: 'https://ironcorelabs.com/products/cloaked-ai/',
      description: 'IronCore Labs research on encrypted embeddings'
    }
  },

  // Code reference URLs (from comments in code examples)
  codeRefs: {
    'chromestatus-kyber': {
      label: 'Chrome Status: X25519Kyber768',
      url: 'https://chromestatus.com/feature/5257822742249472',
      description: 'Chrome PQC feature status'
    },
    'arxiv-vec2text': {
      label: 'Vec2Text inversion attacks',
      url: 'https://arxiv.org/abs/2310.06816',
      description: 'Research on embedding inversion'
    },
    'ironcore-cloaked': {
      label: 'IronCore Cloaked AI',
      url: 'https://ironcorelabs.com/products/cloaked-ai/',
      description: 'Encrypted vector embeddings product'
    }
  }
};

/**
 * Helper function to get a reference by key from any category
 */
export const getReference = (key) => {
  for (const category of Object.values(references)) {
    if (category[key]) {
      return category[key];
    }
  }
  return null;
};

/**
 * Helper function to get all references as a flat array
 */
export const getAllReferences = () => {
  const allRefs = [];
  for (const [category, refs] of Object.entries(references)) {
    for (const [key, ref] of Object.entries(refs)) {
      allRefs.push({ ...ref, key, category });
    }
  }
  return allRefs;
};

export default references;
