import { Lock, Fingerprint, Shield } from 'lucide-react';

export const algorithms = {
  kyber: {
    name: 'ML-KEM-768',
    aka: 'Kyber',
    purpose: 'Key Encapsulation',
    color: 'emerald',
    neonColor: 'green',
    icon: Lock,
    sizes: { publicKey: '1,184 B', ciphertext: '1,088 B' },
    speed: '~0.7 ms',
    description: 'Establishes quantum-resistant shared secrets for encrypting communications',
    standard: 'NIST FIPS 203',
    url: 'https://csrc.nist.gov/pubs/fips/203/final'
  },
  dilithium: {
    name: 'ML-DSA-65',
    aka: 'Dilithium',
    purpose: 'Digital Signatures',
    color: 'violet',
    neonColor: 'magenta',
    icon: Fingerprint,
    sizes: { publicKey: '1,952 B', signature: '3,293 B' },
    speed: '~1.2 ms',
    description: 'Creates unforgeable signatures proving authenticity and integrity',
    standard: 'NIST FIPS 204',
    url: 'https://csrc.nist.gov/pubs/fips/204/final'
  },
  sphincs: {
    name: 'SLH-DSA-256f',
    aka: 'SPHINCS+',
    purpose: 'Hash Signatures',
    color: 'amber',
    neonColor: 'amber',
    icon: Shield,
    sizes: { publicKey: '64 B', signature: '17 KB' },
    speed: '~45 ms',
    description: 'Conservative backup using only hash functions, different math foundation',
    standard: 'NIST FIPS 205',
    url: 'https://csrc.nist.gov/pubs/fips/205/final'
  }
};
