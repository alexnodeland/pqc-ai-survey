import {
  MessageSquare, Fingerprint, Network, Database, GitBranch,
  Cpu, Activity, BarChart3, Key
} from 'lucide-react';

export const useCases = {
  inference: {
    id: 'inference',
    title: 'LLM Inference APIs',
    subtitle: 'Securing prompt/response traffic',
    icon: MessageSquare,
    category: 'in-flight',
    status: 'production',
    color: 'emerald',

    threat: {
      title: 'API Traffic Interception',
      summary: 'Adversaries capture encrypted API traffic today, planning to decrypt it when quantum computers mature.',
      details: [
        'Prompts contain sensitive business logic, PII, and proprietary reasoning chains',
        'Responses may include confidential analysis, code, or recommendations',
        '"Harvest now, decrypt later" makes all current traffic vulnerable',
        'API logs archived for compliance become future attack targets'
      ],
      impact: 'High',
      timeline: 'Active threat (data being collected now)'
    },

    solution: {
      title: 'Hybrid PQC-TLS Key Exchange',
      summary: 'Replace or augment TLS key exchange with Kyber768, establishing quantum-resistant session keys.',
      approach: [
        'Deploy hybrid X25519 + Kyber768 key exchange at API gateway',
        'Session keys protect all traffic for the connection lifetime',
        'Backward compatible—classical-only clients still work',
        'Per-session forward secrecy prevents bulk decryption'
      ],
      algorithms: ['kyber']
    },

    performance: {
      overhead: {
        bandwidth: { value: '4.4 KB', detail: 'One-time handshake overhead (Kyber ciphertext + key material). Amortized across entire session.' },
        latency: { value: '+0.6 ms', detail: 'Additional connection setup time. Negligible vs 50-200ms first-token latency.' },
        relative: { value: '< 3%', detail: 'For typical 10-100 KB request/response payloads. Even less for longer contexts.' }
      },
      benchmarks: [
        { scenario: 'Short prompt (1K tokens)', payload: '~4 KB', overhead: '~50%', verdict: 'Acceptable' },
        { scenario: 'Long context (32K tokens)', payload: '~130 KB', overhead: '~3%', verdict: 'Excellent' },
        { scenario: 'Streaming response', payload: 'Session-based', overhead: 'Near zero', verdict: 'Excellent' }
      ]
    },

    implementation: {
      difficulty: 'Low',
      timeEstimate: '1-2 days',
      prerequisites: ['OpenSSL 3.x or BoringSSL with PQC support', 'API gateway that supports custom TLS config'],
      code: `// nginx.conf - Enable hybrid PQC key exchange
// Note: Final ML-KEM uses TLS codepoint 0x11EC (draft used 0x6399)
// Ref: https://chromestatus.com/feature/5257822742249472
ssl_protocols TLSv1.3;
ssl_ecdh_curve X25519MLKEM768:X25519:prime256v1;  // Updated from X25519Kyber768Draft00

// For Node.js with custom TLS
const https = require('https');
const options = {
  // Use system OpenSSL with PQC support
  secureOptions: crypto.constants.SSL_OP_NO_SSLv3,
  ciphers: 'TLS_AES_256_GCM_SHA384',
  ecdhCurve: 'X25519Kyber768Draft00'
};

// Client verification (optional)
app.use((req, res, next) => {
  const cipher = req.socket.getCipher();
  // Log PQC usage for compliance
  logger.info('TLS cipher:', cipher.name);
  next();
});`
    },

    realWorld: {
      adopters: [
        { label: 'Cloudflare (2023)', url: 'https://blog.cloudflare.com/post-quantum-to-origins/' },
        { label: 'Google Chrome (experimental)', url: 'https://chromestatus.com/feature/5257822742249472' },
        { label: 'AWS KMS', url: 'https://docs.aws.amazon.com/kms/latest/developerguide/pqtls.html' }
      ],
      standards: [
        { label: 'IETF draft-ietf-tls-hybrid-design', url: 'https://datatracker.ietf.org/doc/draft-ietf-tls-hybrid-design/' },
        { label: 'NIST SP 800-56C Rev 2', url: 'https://csrc.nist.gov/pubs/sp/800/56/c/r2/final' }
      ],
      quote: 'We\'ve enabled post-quantum key exchange for all traffic to our edge network.',
      quoteSource: { label: 'Cloudflare Blog, 2023', url: 'https://blog.cloudflare.com/post-quantum-to-origins/' }
    }
  },

  modelRegistry: {
    id: 'modelRegistry',
    title: 'Model Artifact Signing',
    subtitle: 'Supply chain integrity verification',
    icon: Fingerprint,
    category: 'at-rest',
    status: 'production',
    color: 'violet',

    threat: {
      title: 'Model Supply Chain Attacks',
      summary: 'Attackers inject backdoors into model weights during distribution, enabling data exfiltration or output manipulation.',
      details: [
        'Compromised models can subtly manipulate outputs in targeted scenarios',
        'Backdoors may remain dormant until triggered by specific inputs',
        'Without signatures, consumers cannot verify model authenticity',
        'Model theft enables competitors to fine-tune stolen architectures'
      ],
      impact: 'Critical',
      timeline: 'Active threat (documented incidents)'
    },

    solution: {
      title: 'Dilithium Digital Signatures',
      summary: 'Sign model manifests and weight files with quantum-resistant signatures. Verify before loading.',
      approach: [
        'Generate Dilithium keypair for your model registry',
        'Sign manifest containing model hash, version, training metadata',
        'Distribute signature alongside model artifacts',
        'Consumers verify signature before loading into production'
      ],
      algorithms: ['dilithium', 'sphincs']
    },

    performance: {
      overhead: {
        bandwidth: { value: '3.3 KB', detail: 'Dilithium signature size. Trivial compared to model sizes (GB-TB).' },
        latency: { value: '+1.7 ms', detail: 'Sign: 1.2ms, Verify: 0.5ms. One-time cost per model load.' },
        relative: { value: '< 0.001%', detail: 'For a 70B model at ~140GB, signature overhead is negligible.' }
      },
      benchmarks: [
        { scenario: 'Sign 7B model manifest', payload: '~14 GB', overhead: '1.2 ms', verdict: 'Instant' },
        { scenario: 'Verify before load', payload: 'Any size', overhead: '0.5 ms', verdict: 'Instant' },
        { scenario: 'Batch verify 100 models', payload: 'Registry scan', overhead: '50 ms', verdict: 'Excellent' }
      ]
    },

    implementation: {
      difficulty: 'Low',
      timeEstimate: '2-3 days',
      prerequisites: ['Dilithium library (liboqs, pqcrypto)', 'Secure key storage (HSM recommended)'],
      code: `import { Dilithium } from '@pqcrypto/dilithium';
import { createHash } from 'crypto';

class ModelRegistry {
  private signingKey: Uint8Array;
  private publicKey: Uint8Array;

  async signModel(modelPath: string, metadata: ModelMetadata) {
    // Compute model hash (streaming for large files)
    const hash = await this.hashFile(modelPath);

    // Create manifest with provenance
    const manifest = {
      modelHash: hash,
      version: metadata.version,
      architecture: metadata.architecture,
      trainedOn: metadata.datasetVersion,
      trainedAt: metadata.timestamp,
      hyperparameters: metadata.config,
      // Chain of custody
      previousVersion: metadata.baseModel,
      trainingLogs: metadata.logsHash
    };

    // Sign with Dilithium
    const manifestBytes = Buffer.from(JSON.stringify(manifest));
    const signature = await Dilithium.sign(manifestBytes, this.signingKey);

    return { manifest, signature };
  }

  async verifyModel(modelPath: string, manifest: Manifest, signature: Uint8Array) {
    // Verify signature first (fast)
    const manifestBytes = Buffer.from(JSON.stringify(manifest));
    const isValidSig = await Dilithium.verify(manifestBytes, signature, this.publicKey);

    if (!isValidSig) {
      throw new SecurityError('Invalid model signature - possible tampering');
    }

    // Then verify hash matches (slower, but signature already confirmed)
    const actualHash = await this.hashFile(modelPath);
    if (actualHash !== manifest.modelHash) {
      throw new SecurityError('Model hash mismatch - file corrupted or tampered');
    }

    return { verified: true, manifest };
  }
}`
    },

    realWorld: {
      adopters: [
        { label: 'Hugging Face (evaluating)', url: 'https://huggingface.co/docs/hub/en/security' },
        { label: 'MLflow (roadmap)', url: 'https://mlflow.org/docs/latest/model-registry.html' },
        { label: 'NVIDIA NGC', url: 'https://catalog.ngc.nvidia.com/' }
      ],
      standards: [
        { label: 'SLSA Framework', url: 'https://slsa.dev/' },
        { label: 'Sigstore/cosign patterns', url: 'https://github.com/sigstore/cosign' }
      ],
      quote: 'Model provenance and signing will be required for regulated AI deployments.',
      quoteSource: { label: 'EU AI Act compliance guidance', url: 'https://artificialintelligenceact.eu/' }
    }
  },

  federatedLearning: {
    id: 'federatedLearning',
    title: 'Federated Learning',
    subtitle: 'Secure distributed training coordination',
    icon: Network,
    category: 'in-flight',
    status: 'production',
    color: 'sky',

    threat: {
      title: 'Gradient Poisoning & Eavesdropping',
      summary: 'Malicious participants submit poisoned updates; adversaries intercept gradients to infer training data.',
      details: [
        'Poisoned gradients can embed backdoors in the global model',
        'Without authentication, aggregator cannot identify malicious participants',
        'Gradient interception enables membership inference attacks',
        'Reconstructed training data violates privacy guarantees'
      ],
      impact: 'High',
      timeline: 'Active threat in production FL systems'
    },

    solution: {
      title: 'Signed & Encrypted Gradient Exchange',
      summary: 'Participants sign updates with Dilithium; encrypt with Kyber-derived session keys.',
      approach: [
        'Each participant has a registered Dilithium keypair',
        'Establish Kyber session keys with aggregator for encryption',
        'Sign gradient updates before encryption',
        'Aggregator verifies signatures, rejects unverified updates',
        'Audit trail enables detection and accountability'
      ],
      algorithms: ['kyber', 'dilithium']
    },

    performance: {
      overhead: {
        bandwidth: { value: '~5 KB/update', detail: 'Kyber ciphertext (1KB) + Dilithium signature (3.3KB) + metadata.' },
        latency: { value: '+2 ms/participant', detail: 'Signature verification per update. Parallelizable.' },
        relative: { value: '2-5%', detail: 'Per training round. Acceptable for security-critical FL.' }
      },
      benchmarks: [
        { scenario: '100 participants, 10MB gradients', payload: '1 GB/round', overhead: '500 KB sigs', verdict: '< 0.1%' },
        { scenario: 'Verification throughput', payload: '100 sigs', overhead: '50 ms parallel', verdict: 'Excellent' },
        { scenario: 'Key establishment', payload: '100 sessions', overhead: '70 ms total', verdict: 'One-time' }
      ]
    },

    implementation: {
      difficulty: 'Medium',
      timeEstimate: '1-2 weeks',
      prerequisites: ['Existing FL framework (Flower, PySyft, TFF)', 'Participant identity management'],
      code: `from pqcrypto.sign import dilithium
from pqcrypto.kem import kyber

class SecureFederatedClient:
    def __init__(self, client_id: str, aggregator_pubkey: bytes):
        # Generate client signing keypair (registered with aggregator)
        self.sign_pk, self.sign_sk = dilithium.generate_keypair()

        # Establish encrypted channel with aggregator
        self.session_key, ciphertext = kyber.encapsulate(aggregator_pubkey)
        self.send_to_aggregator({'type': 'key_exchange', 'ciphertext': ciphertext})

    def submit_update(self, gradients: np.ndarray, round_num: int):
        # Compress gradients (often 10-100x reduction)
        compressed = self.compress(gradients)

        # Create signed payload
        payload = {
            'client_id': self.client_id,
            'round': round_num,
            'gradients': compressed.tobytes(),
            'local_samples': self.num_samples,
            'timestamp': time.time()
        }
        payload_bytes = msgpack.packb(payload)

        # Sign with Dilithium
        signature = dilithium.sign(payload_bytes, self.sign_sk)

        # Encrypt with session key
        encrypted = aes_gcm_encrypt(self.session_key, payload_bytes)

        return {'encrypted_payload': encrypted, 'signature': signature}


class SecureAggregator:
    def aggregate_round(self, updates: List[ClientUpdate]):
        verified_gradients = []

        for update in updates:
            # Verify signature BEFORE decryption (reject early)
            client_pk = self.get_client_pubkey(update.client_id)

            if not dilithium.verify(update.encrypted_payload, update.signature, client_pk):
                self.log_security_event('Invalid signature', update.client_id)
                self.quarantine_client(update.client_id)
                continue

            # Decrypt only verified updates
            decrypted = aes_gcm_decrypt(
                self.session_keys[update.client_id],
                update.encrypted_payload
            )
            payload = msgpack.unpackb(decrypted)
            verified_gradients.append(payload['gradients'])

        # Secure aggregation with verified updates only
        return self.fedavg(verified_gradients)`
    },

    realWorld: {
      adopters: [
        { label: 'Google (Gboard FL)', url: 'https://research.google/blog/federated-learning-collaborative-machine-learning-without-centralized-training-data/' },
        { label: 'Apple (on-device learning)', url: 'https://machinelearning.apple.com/research/learning-with-privacy-at-scale' },
        { label: 'Healthcare consortiums' }
      ],
      standards: [
        { label: 'Secure Aggregation protocols', url: 'https://research.google/pubs/practical-secure-aggregation-for-privacy-preserving-machine-learning/' },
        { label: 'Differential Privacy composition', url: 'https://www.apple.com/privacy/docs/Differential_Privacy_Overview.pdf' }
      ],
      quote: 'Cryptographic authentication is essential for production federated learning.',
      quoteSource: { label: 'Google AI Blog on Federated Learning', url: 'https://research.google/blog/federated-learning-collaborative-machine-learning-without-centralized-training-data/' }
    }
  },

  trainingData: {
    id: 'trainingData',
    title: 'Training Data Protection',
    subtitle: 'Corpus encryption with chain of custody',
    icon: Database,
    category: 'at-rest',
    status: 'production',
    color: 'rose',

    threat: {
      title: 'Training Data Exposure',
      summary: 'Corpus contains licensed content, PII, and proprietary data. Exposure enables lawsuits, privacy violations, and competitive intelligence.',
      details: [
        'Copyright litigation (NYT v. OpenAI) focuses on training data provenance',
        'Membership inference can determine if specific data was used in training',
        'PII in training data creates GDPR/CCPA liability',
        'Competitors can analyze your data sources to replicate your approach'
      ],
      impact: 'Critical',
      timeline: 'Active litigation and regulatory scrutiny'
    },

    solution: {
      title: 'Encrypted Corpus with Signed Provenance',
      summary: 'Encrypt shards at rest with Kyber-wrapped keys. Sign manifests to create cryptographic chain of custody.',
      approach: [
        'Encrypt each corpus shard with unique DEK',
        'Wrap DEKs with Kyber for storage (key hierarchy)',
        'Sign manifest linking shards to sources, timestamps, processing',
        'Audit trail proves what data was used and when'
      ],
      algorithms: ['kyber', 'dilithium']
    },

    performance: {
      overhead: {
        bandwidth: { value: '~10 KB/shard', detail: 'Wrapped DEK + signed manifest metadata per shard.' },
        latency: { value: 'Transparent', detail: 'Decrypt on read. AES-GCM at memory bandwidth speeds.' },
        relative: { value: '< 0.1%', detail: 'Storage overhead for multi-TB corpora is negligible.' }
      },
      benchmarks: [
        { scenario: 'Encrypt 1TB corpus', payload: '1 TB', overhead: '~100 MB metadata', verdict: '< 0.01%' },
        { scenario: 'Read throughput', payload: 'Streaming', overhead: 'AES-NI saturates IO', verdict: 'No impact' },
        { scenario: 'Manifest verification', payload: '10K shards', overhead: '5 sec batch', verdict: 'Excellent' }
      ]
    },

    implementation: {
      difficulty: 'Medium',
      timeEstimate: '1 week',
      prerequisites: ['Data pipeline integration points', 'Key management infrastructure'],
      code: `class SecureCorpusManager:
    """
    Manages encrypted training corpus with cryptographic provenance.
    Each shard is independently encrypted with a unique DEK.
    """

    def __init__(self, master_key: KyberPublicKey, signing_key: DilithiumSecretKey):
        self.master_key = master_key
        self.signing_key = signing_key

    async def ingest_document(self, content: bytes, source: SourceMetadata) -> EncryptedShard:
        # Generate unique DEK for this shard
        dek = os.urandom(32)

        # Encrypt content with DEK
        nonce = os.urandom(12)
        encrypted_content = aes_gcm_encrypt(dek, content, nonce)

        # Wrap DEK with Kyber master key
        wrapped_dek, kyber_ct = kyber_encapsulate_and_wrap(self.master_key, dek)

        # Create provenance record
        provenance = {
            'shard_id': uuid4(),
            'content_hash': sha256(content),
            'source_url': source.url,
            'crawl_timestamp': source.timestamp,
            'content_type': source.mime_type,
            'byte_count': len(content),
            'processing_version': '1.0',
            # Legal/compliance metadata
            'license': source.license,
            'robots_txt_compliant': source.robots_allowed,
            'retention_policy': source.retention
        }

        # Sign provenance for integrity
        provenance_bytes = canonical_json(provenance)
        signature = dilithium_sign(provenance_bytes, self.signing_key)

        return EncryptedShard(
            encrypted_content=encrypted_content,
            wrapped_dek=wrapped_dek,
            kyber_ciphertext=kyber_ct,
            nonce=nonce,
            provenance=provenance,
            signature=signature
        )

    async def verify_corpus_integrity(self, shards: List[EncryptedShard]) -> AuditReport:
        """Verify all shards for compliance audit."""
        results = []
        for shard in shards:
            # Verify signature (doesn't require decryption)
            is_valid = dilithium_verify(
                canonical_json(shard.provenance),
                shard.signature,
                self.signing_pubkey
            )
            results.append({
                'shard_id': shard.provenance['shard_id'],
                'source': shard.provenance['source_url'],
                'timestamp': shard.provenance['crawl_timestamp'],
                'signature_valid': is_valid,
                'license': shard.provenance['license']
            })

        return AuditReport(results)`
    },

    realWorld: {
      adopters: [
        { label: 'Major labs implementing for litigation defense' },
        { label: 'Healthcare AI (HIPAA)', url: 'https://www.hhs.gov/hipaa/index.html' }
      ],
      standards: [
        { label: 'Data provenance frameworks', url: 'https://slsa.dev/' },
        { label: 'GDPR Article 30 records', url: 'https://gdpr-info.eu/art-30-gdpr/' }
      ],
      quote: 'Cryptographic chain of custody will become standard practice for training data.',
      quoteSource: { label: 'AI legal compliance recommendations' }
    }
  },

  checkpoints: {
    id: 'checkpoints',
    title: 'Checkpoint Encryption',
    subtitle: 'Protecting training investment',
    icon: GitBranch,
    category: 'at-rest',
    status: 'production',
    color: 'orange',

    threat: {
      title: 'Model Weight Theft',
      summary: 'Checkpoints represent massive compute investment. Theft enables competitors to fine-tune stolen models or extract training data.',
      details: [
        'A frontier model checkpoint represents $100M+ in compute',
        'Weight theft bypasses your entire training investment',
        'Model inversion can extract training data from weights',
        'Leaked checkpoints enable unauthorized fine-tuning'
      ],
      impact: 'Critical',
      timeline: 'Active threat (Llama weights leaked within days)'
    },

    solution: {
      title: 'Key Hierarchy with Encrypted Checkpoints',
      summary: 'Multi-layer key hierarchy: Kyber wraps KEK, KEK wraps per-checkpoint DEKs. Sign manifests for integrity.',
      approach: [
        'Master KEK protected by Kyber (rotatable)',
        'Per-checkpoint DEK for independent access control',
        'Stream encryption for large checkpoint files',
        'Signed manifest links checkpoint to training state'
      ],
      algorithms: ['kyber', 'dilithium']
    },

    performance: {
      overhead: {
        bandwidth: { value: '~15 KB', detail: 'Metadata per checkpoint: wrapped DEK, signature, provenance.' },
        latency: { value: '+50-200 ms', detail: 'For 70B model (~140GB). Parallelized stream encryption.' },
        relative: { value: '< 0.01%', detail: 'Of checkpoint size. Encryption at memory bandwidth.' }
      },
      benchmarks: [
        { scenario: 'Save 7B checkpoint', payload: '~14 GB', overhead: '~50 ms', verdict: 'Excellent' },
        { scenario: 'Save 70B checkpoint', payload: '~140 GB', overhead: '~200 ms', verdict: 'Excellent' },
        { scenario: 'Load (decrypt)', payload: 'Any size', overhead: 'IO-bound', verdict: 'No overhead' }
      ]
    },

    implementation: {
      difficulty: 'Medium',
      timeEstimate: '3-5 days',
      prerequisites: ['Training framework hooks (PyTorch, JAX)', 'Secure key storage'],
      code: `class SecureCheckpointManager:
    """
    Encrypts checkpoints with a key hierarchy for fine-grained access control.

    Key Hierarchy:
    - Master Key (Kyber-protected, in HSM)
      └── KEK (Key Encryption Key, rotatable)
          └── DEK (Data Encryption Key, per-checkpoint)
    """

    def __init__(self, kek: bytes, signing_key: DilithiumSecretKey):
        self.kek = kek  # Already unwrapped from Kyber
        self.signing_key = signing_key

    def save_checkpoint(
        self,
        model_state: Dict[str, torch.Tensor],
        optimizer_state: Dict,
        training_state: TrainingState,
        path: str
    ):
        # Generate unique DEK for this checkpoint
        dek = os.urandom(32)

        # Encrypt model weights (largest component, stream to avoid memory spike)
        encrypted_weights = self._stream_encrypt_tensors(model_state, dek)

        # Encrypt optimizer state (smaller, in-memory OK)
        optimizer_bytes = pickle.dumps(optimizer_state)
        encrypted_optimizer = aes_gcm_encrypt(dek, optimizer_bytes)

        # Wrap DEK with KEK
        wrapped_dek = aes_gcm_encrypt(self.kek, dek)

        # Create provenance manifest
        manifest = {
            'checkpoint_id': str(uuid4()),
            'model_hash': self._hash_state_dict(model_state),
            'global_step': training_state.step,
            'epoch': training_state.epoch,
            'loss': float(training_state.loss),
            'learning_rate': float(training_state.lr),
            'dataset_version': training_state.data_version,
            'config_hash': sha256(json.dumps(training_state.config)),
            'created_at': datetime.utcnow().isoformat(),
            'framework': f'pytorch-{torch.__version__}'
        }

        # Sign manifest
        signature = dilithium_sign(canonical_json(manifest), self.signing_key)

        # Write encrypted checkpoint
        torch.save({
            'encrypted_weights': encrypted_weights,
            'encrypted_optimizer': encrypted_optimizer,
            'wrapped_dek': wrapped_dek,
            'manifest': manifest,
            'signature': signature
        }, path)

        return manifest['checkpoint_id']

    def load_checkpoint(self, path: str) -> Tuple[Dict, Dict, Manifest]:
        data = torch.load(path)

        # Verify signature first
        if not dilithium_verify(
            canonical_json(data['manifest']),
            data['signature'],
            self.signing_pubkey
        ):
            raise SecurityError('Checkpoint signature invalid')

        # Unwrap DEK
        dek = aes_gcm_decrypt(self.kek, data['wrapped_dek'])

        # Decrypt weights and optimizer
        weights = self._stream_decrypt_tensors(data['encrypted_weights'], dek)
        optimizer = pickle.loads(aes_gcm_decrypt(dek, data['encrypted_optimizer']))

        return weights, optimizer, data['manifest']`
    },

    realWorld: {
      adopters: [
        { label: 'Internal practices at major labs' },
        { label: 'Enterprise ML platforms' }
      ],
      standards: [
        { label: 'Defense-in-depth security' },
        { label: 'Key rotation best practices', url: 'https://csrc.nist.gov/pubs/sp/800/57/pt1/r5/final' }
      ],
      quote: 'After the Llama leak, everyone is taking checkpoint security more seriously.',
      quoteSource: { label: 'ML infrastructure engineer' }
    }
  },

  kvCache: {
    id: 'kvCache',
    title: 'KV Cache Protection',
    subtitle: 'Multi-tenant inference isolation',
    icon: Cpu,
    category: 'at-rest',
    status: 'hardware-needed',
    color: 'amber',

    threat: {
      title: 'Cross-Tenant Context Leakage',
      summary: 'Multi-tenant inference shares GPU memory. KV caches contain full conversation context, vulnerable to side-channel extraction.',
      details: [
        'Llama-70B with 32K context uses ~288 GB KV cache across batch',
        'GPU memory is shared between concurrent requests',
        'Side-channel attacks can extract neighboring memory contents',
        'Swapped-out KV cache on host/disk is typically unencrypted'
      ],
      impact: 'High',
      timeline: 'Emerging threat as multi-tenant inference scales'
    },

    solution: {
      title: 'Encrypted KV Cache with Per-Request Keys',
      summary: 'Encrypt KV cache when swapped to host memory. Per-request keys prevent cross-tenant leakage. GPU-resident encryption needs hardware.',
      approach: [
        'Derive per-request encryption key from session key',
        'Encrypt KV tensors on swap-out to host memory',
        'Decrypt on swap-in back to GPU',
        'Full GPU-resident encryption awaits hardware support'
      ],
      algorithms: ['kyber']
    },

    performance: {
      overhead: {
        bandwidth: { value: 'N/A', detail: 'Memory-resident data, not network transfer.' },
        latency: { value: '5-10% throughput', detail: 'For swap encryption. GPU-resident impractical without hardware.' },
        relative: { value: 'Hardware-dependent', detail: 'CXL memory encryption or TEEs needed for full coverage.' }
      },
      benchmarks: [
        { scenario: 'Swap-out encryption', payload: '~1 GB/request', overhead: '~10 ms', verdict: 'Acceptable' },
        { scenario: 'GPU-resident', payload: 'Real-time', overhead: 'Not feasible', verdict: 'Hardware needed' },
        { scenario: 'With CXL encryption', payload: 'Transparent', overhead: '~5%', verdict: 'Future solution' }
      ]
    },

    implementation: {
      difficulty: 'High',
      timeEstimate: '2-4 weeks',
      prerequisites: ['vLLM or TensorRT-LLM fork', 'Understanding of KV cache management'],
      code: `class SecureKVCacheManager:
    """
    Encrypts KV cache on swap to host memory.

    Limitations:
    - Only protects swapped-out data
    - GPU-resident cache remains unencrypted
    - Full protection requires hardware (CXL encryption, TEE)
    """

    def __init__(self, master_key: bytes):
        self.master_key = master_key

    def _derive_request_key(self, request_id: str) -> bytes:
        """Derive unique key for each request's KV cache."""
        return hkdf(
            self.master_key,
            info=f'kv-cache-{request_id}'.encode(),
            length=32
        )

    def swap_out(
        self,
        kv_tensors: List[torch.Tensor],
        request_id: str
    ) -> List[EncryptedBlock]:
        """Encrypt KV cache before moving to host memory."""
        key = self._derive_request_key(request_id)
        encrypted_blocks = []

        for i, tensor in enumerate(kv_tensors):
            # Move to CPU (already happening in swap)
            cpu_data = tensor.cpu().numpy().tobytes()

            # Encrypt with request-specific key
            nonce = os.urandom(12)
            encrypted = aes_gcm_encrypt(key, cpu_data, nonce)

            encrypted_blocks.append(EncryptedBlock(
                data=encrypted,
                nonce=nonce,
                shape=tensor.shape,
                dtype=tensor.dtype,
                layer_idx=i
            ))

        # Securely clear CPU tensor memory
        secure_zero(cpu_data)

        return encrypted_blocks

    def swap_in(
        self,
        encrypted_blocks: List[EncryptedBlock],
        request_id: str,
        device: torch.device
    ) -> List[torch.Tensor]:
        """Decrypt KV cache when returning to GPU."""
        key = self._derive_request_key(request_id)
        tensors = []

        for block in encrypted_blocks:
            # Decrypt
            decrypted = aes_gcm_decrypt(key, block.data, block.nonce)

            # Reconstruct tensor
            array = np.frombuffer(decrypted, dtype=block.dtype).reshape(block.shape)
            tensor = torch.from_numpy(array).to(device)
            tensors.append(tensor)

            # Clear plaintext from CPU memory
            secure_zero(decrypted)

        return tensors

# Integration with vLLM (conceptual)
class SecureBlockManager(BlockManager):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.crypto = SecureKVCacheManager(os.environ['KV_ENCRYPTION_KEY'])

    def swap_out(self, blocks: List[Block], request_id: str):
        kv_tensors = [b.tensor for b in blocks]
        encrypted = self.crypto.swap_out(kv_tensors, request_id)
        # Store encrypted blocks in host memory
        self.host_cache[request_id] = encrypted`
    },

    realWorld: {
      adopters: [
        { label: 'Research prototypes' },
        { label: 'High-security inference deployments' }
      ],
      standards: [
        { label: 'Confidential computing frameworks', url: 'https://confidentialcomputing.io/' },
        { label: 'Intel TDX', url: 'https://www.intel.com/content/www/us/en/developer/tools/trust-domain-extensions/overview.html' },
        { label: 'AMD SEV', url: 'https://www.amd.com/en/developer/sev.html' }
      ],
      quote: 'KV cache isolation is the next frontier in multi-tenant inference security.',
      quoteSource: { label: 'MLsys security research' }
    }
  },

  gradientSync: {
    id: 'gradientSync',
    title: 'Distributed Training Sync',
    subtitle: 'Gradient encryption at scale',
    icon: Activity,
    category: 'in-flight',
    status: 'hardware-needed',
    color: 'red',

    threat: {
      title: 'Training Traffic Interception',
      summary: 'Gradient synchronization exposes model architecture and training dynamics. Cross-datacenter traffic is especially vulnerable.',
      details: [
        '8×A100 generates 140+ GB/s of gradient traffic per GPU',
        'AllReduce traffic reveals model weights and training progress',
        'Cross-datacenter training traverses public networks',
        'Nation-state adversaries can intercept backbone traffic'
      ],
      impact: 'High',
      timeline: 'Relevant for cross-datacenter and cloud training'
    },

    solution: {
      title: 'Hardware-Accelerated Gradient Encryption',
      summary: 'Software encryption cannot keep up with GPU bandwidth. Requires SmartNICs, NVLink encryption, or gradient compression.',
      approach: [
        'Option A: SmartNIC with AES offload (NVIDIA BlueField)',
        'Option B: Gradient compression first, then encrypt (1-bit SGD)',
        'Option C: Network isolation (private backbone)',
        'Option D: Accept overhead for high-security workloads'
      ],
      algorithms: ['kyber']
    },

    performance: {
      overhead: {
        bandwidth: { value: '140+ GB/s', detail: 'Per GPU. Far exceeds software AES-GCM throughput.' },
        latency: { value: 'Impractical', detail: 'Without hardware acceleration, >50% throughput loss.' },
        relative: { value: 'Bottleneck', detail: 'Software encryption is the limiting factor, not network.' }
      },
      benchmarks: [
        { scenario: 'Software AES-GCM', payload: '140 GB/s', overhead: '>50% loss', verdict: 'Not viable' },
        { scenario: 'With 1-bit SGD compression', payload: '~1.4 GB/s', overhead: '~5%', verdict: 'Viable' },
        { scenario: 'SmartNIC offload', payload: '140 GB/s', overhead: '~3%', verdict: 'Production ready' }
      ]
    },

    implementation: {
      difficulty: 'Very High',
      timeEstimate: '1-3 months',
      prerequisites: ['SmartNIC infrastructure or custom network stack', 'Deep distributed training expertise'],
      code: `# This is the hard problem. Options:

# Option 1: Gradient compression makes encryption feasible
class CompressedSecureAllReduce:
    """
    Compress gradients first (10-100x), then encrypt.
    Trade-off: some accuracy loss for security.
    """

    def all_reduce(self, gradients: torch.Tensor) -> torch.Tensor:
        # 1-bit SGD: 32x compression
        compressed = self.one_bit_compress(gradients)  # 140 GB/s -> 4.4 GB/s

        # Now encryption is feasible
        encrypted = aes_gcm_encrypt(self.session_key, compressed)

        # AllReduce on encrypted data
        result = dist.all_reduce(encrypted)

        # Decrypt and decompress
        decrypted = aes_gcm_decrypt(self.session_key, result)
        return self.one_bit_decompress(decrypted)


# Option 2: SmartNIC handles encryption (NVIDIA BlueField)
# This is configuration, not code - encryption is transparent

# /etc/mlnx_snap/mlnx_snap.conf
# enable_ipsec: true
# ipsec_mode: transport
# algorithms: aes-gcm-256

# Training code is unchanged - encryption happens in hardware


# Option 3: Network isolation (no encryption, rely on physical security)
class IsolatedTrainingCluster:
    """
    Private network with no external connectivity.
    Security through physical isolation, not cryptography.
    """

    def __init__(self):
        # Verify we're on isolated network
        assert self.verify_network_isolation()
        # Standard AllReduce, no encryption
        self.backend = 'nccl'


# Option 4: Accept the overhead for highest security
class SecureSlowAllReduce:
    """
    Full encryption with significant performance impact.
    Use only when security absolutely requires it.
    """

    def all_reduce(self, gradients: torch.Tensor) -> torch.Tensor:
        # This will be slow, but cryptographically secure
        encrypted = self.encrypt_tensor(gradients)  # ~50% throughput
        result = dist.all_reduce(encrypted)
        return self.decrypt_tensor(result)

    # Expected: 2x training time
    # Use for: classified workloads, extremely sensitive IP`
    },

    realWorld: {
      adopters: [
        { label: 'NVIDIA Magnum IO', url: 'https://developer.nvidia.com/magnum-io' },
        { label: 'AWS Nitro Enclaves', url: 'https://aws.amazon.com/ec2/nitro/nitro-enclaves/' },
        { label: 'Azure Confidential Computing', url: 'https://azure.microsoft.com/en-us/solutions/confidential-compute' }
      ],
      standards: [
        { label: 'IPsec with hardware offload', url: 'https://docs.nvidia.com/networking/display/mlnxofedv24010331/ipsec+full+offload' },
        { label: 'RDMA security extensions' }
      ],
      quote: 'Most production training relies on network isolation rather than encryption.',
      quoteSource: { label: 'Distributed training infrastructure team' }
    }
  },

  posteriorTraces: {
    id: 'posteriorTraces',
    title: 'Probabilistic Outputs',
    subtitle: 'Protecting Bayesian inference results',
    icon: BarChart3,
    category: 'at-rest',
    status: 'production',
    color: 'purple',

    threat: {
      title: 'Posterior Sample Leakage',
      summary: 'MCMC samples encode training data information. Membership inference on traces achieves 70-90% accuracy. Raw traces are far more sensitive than point estimates.',
      details: [
        'Posterior samples can be inverted to recover training examples',
        'Full traces reveal model uncertainty and data distribution',
        'Membership inference: "was this datapoint in training?"',
        'Regulatory exposure for healthcare/financial Bayesian models'
      ],
      impact: 'High',
      timeline: 'Critical for regulated industries using probabilistic models'
    },

    solution: {
      title: 'Tiered Access with Encrypted Traces',
      summary: 'Encrypt raw traces with Kyber-wrapped keys. Sign summary statistics for public release. Implement access tiers.',
      approach: [
        'Raw traces: encrypted, restricted access only',
        'Summary statistics: signed, can be public',
        'Access tiers: analysts see summaries, auditors can request traces',
        'Audit trail for all trace access'
      ],
      algorithms: ['kyber', 'dilithium']
    },

    performance: {
      overhead: {
        bandwidth: { value: '~10 KB', detail: 'Metadata per trace file (wrapped DEK, signature).' },
        latency: { value: 'Transparent', detail: 'Decrypt on analysis. AES-GCM at streaming speeds.' },
        relative: { value: '1-5%', detail: 'Storage overhead for large trace archives.' }
      },
      benchmarks: [
        { scenario: 'Encrypt 1M samples', payload: '~100 MB', overhead: '~10 ms', verdict: 'Instant' },
        { scenario: 'Sign summary stats', payload: '~1 KB', overhead: '~1 ms', verdict: 'Instant' },
        { scenario: 'Stream decrypt for analysis', payload: 'Any size', overhead: 'IO-bound', verdict: 'No overhead' }
      ]
    },

    implementation: {
      difficulty: 'Medium',
      timeEstimate: '1 week',
      prerequisites: ['Bayesian framework (Stan, PyMC, NumPyro)', 'Access control infrastructure'],
      code: `import arviz as az
from pqcrypto import kyber, dilithium

class SecurePosteriorManager:
    """
    Manages Bayesian inference outputs with tiered access control.

    Access Tiers:
    - Public: Signed summary statistics (means, CIs)
    - Analyst: Decrypted summaries, encrypted traces
    - Auditor: Full trace access with audit log
    """

    def __init__(self, master_key: bytes, signing_key: bytes):
        self.master_key = master_key
        self.signing_key = signing_key

    def save_inference_result(
        self,
        trace: az.InferenceData,
        model_id: str,
        access_tier: str = 'analyst'
    ) -> SecureInferenceResult:

        # Compute summary statistics (less sensitive)
        summary = az.summary(trace)
        summary_json = summary.to_json()

        # Sign summary for integrity (can be public)
        summary_signature = dilithium.sign(
            summary_json.encode(),
            self.signing_key
        )

        # Encrypt raw trace (highly sensitive)
        trace_bytes = trace.to_netcdf()  # Serialize
        dek = os.urandom(32)
        encrypted_trace = aes_gcm_encrypt(dek, trace_bytes)

        # Wrap DEK with Kyber
        wrapped_dek, kyber_ct = kyber.encapsulate_and_wrap(
            self.master_key, dek
        )

        # Create access policy metadata
        metadata = {
            'model_id': model_id,
            'inference_timestamp': datetime.utcnow().isoformat(),
            'n_samples': trace.posterior.dims['draw'],
            'n_chains': trace.posterior.dims['chain'],
            'variables': list(trace.posterior.data_vars),
            'access_tier': access_tier,
            'trace_encrypted': True,
            'summary_signed': True
        }

        return SecureInferenceResult(
            # Public tier
            summary=summary_json,
            summary_signature=summary_signature,
            metadata=metadata,

            # Restricted tier
            encrypted_trace=encrypted_trace,
            wrapped_dek=wrapped_dek,
            kyber_ciphertext=kyber_ct
        )

    def get_summary(self, result: SecureInferenceResult) -> pd.DataFrame:
        """Public access: verify and return summary stats."""
        # Verify signature
        if not dilithium.verify(
            result.summary.encode(),
            result.summary_signature,
            self.signing_pubkey
        ):
            raise SecurityError('Summary signature invalid')

        return pd.read_json(result.summary)

    def get_trace(
        self,
        result: SecureInferenceResult,
        requester: str,
        justification: str
    ) -> az.InferenceData:
        """Restricted access: decrypt trace with audit logging."""

        # Log access request
        self.audit_log.record({
            'action': 'trace_access',
            'requester': requester,
            'justification': justification,
            'model_id': result.metadata['model_id'],
            'timestamp': datetime.utcnow().isoformat()
        })

        # Unwrap DEK
        dek = kyber.decapsulate_and_unwrap(
            self.master_secret_key,
            result.kyber_ciphertext,
            result.wrapped_dek
        )

        # Decrypt trace
        trace_bytes = aes_gcm_decrypt(dek, result.encrypted_trace)

        return az.from_netcdf(io.BytesIO(trace_bytes))`
    },

    realWorld: {
      adopters: [
        { label: 'Pharmaceutical companies (clinical trial models)' },
        { label: 'Financial risk modeling' }
      ],
      standards: [
        { label: 'Differential privacy for Bayesian release', url: 'https://www.apple.com/privacy/docs/Differential_Privacy_Overview.pdf' },
        { label: 'HIPAA audit requirements', url: 'https://www.hhs.gov/hipaa/index.html' }
      ],
      quote: 'Posterior samples require stricter protection than point predictions.',
      quoteSource: { label: 'Bayesian privacy research' }
    }
  },

  ragSecurity: {
    id: 'ragSecurity',
    title: 'RAG & Vector Database',
    subtitle: 'Protecting embeddings and retrieval',
    icon: Database,
    category: 'at-rest',
    status: 'production',
    color: 'cyan',

    threat: {
      title: 'Embedding Inversion Attacks',
      summary: 'Vector embeddings can be reversed to reconstruct original text with 70-90% accuracy. RAG systems expose sensitive documents through overshared retrieval.',
      details: [
        'Vec2Text and similar attacks reconstruct text from embeddings',
        'Membership inference determines if specific documents are in the index',
        'RAG retrieval may return overly broad context containing sensitive data',
        'Vector databases are typically unencrypted—an underprotected gold mine'
      ],
      impact: 'Critical',
      timeline: 'Active threat (documented attacks on production systems)'
    },

    solution: {
      title: 'Encrypted Vector Storage with Kyber',
      summary: 'Encrypt embeddings at rest with Kyber-wrapped DEKs. Use property-preserving encryption to enable similarity search on encrypted vectors.',
      approach: [
        'Encrypt vector embeddings before storage in Pinecone/Weaviate/Qdrant',
        'Wrap per-index DEKs with Kyber for quantum-resistant key protection',
        'Use approximate nearest neighbor on encrypted representations',
        'Implement access control at document and chunk level'
      ],
      algorithms: ['kyber', 'dilithium']
    },

    performance: {
      overhead: {
        bandwidth: { value: '~2 KB/doc', detail: 'Wrapped DEK + encrypted metadata per document chunk.' },
        latency: { value: '+5-15 ms', detail: 'Decryption overhead per query. Parallelizable across results.' },
        relative: { value: '10-20%', detail: 'Query latency increase. Acceptable for security-critical RAG.' }
      },
      benchmarks: [
        { scenario: 'Encrypt 1M vectors', payload: '~1.5 GB', overhead: '~30 sec batch', verdict: 'One-time' },
        { scenario: 'Query latency (top-10)', payload: '~10 vectors', overhead: '+10 ms', verdict: 'Acceptable' },
        { scenario: 'Bulk retrieval (100 docs)', payload: '~100 vectors', overhead: '+50 ms', verdict: 'Acceptable' }
      ]
    },

    implementation: {
      difficulty: 'Medium',
      timeEstimate: '1-2 weeks',
      prerequisites: ['Vector database with custom storage layer', 'Key management infrastructure'],
      code: `import { Kyber } from '@pqcrypto/kyber';

class SecureVectorStore {
  /**
   * Encrypts embeddings before storage in vector database.
   * Ref: https://arxiv.org/abs/2310.06816 (Vec2Text inversion attacks)
   * Ref: https://ironcorelabs.com/products/cloaked-ai/
   */

  private masterKey: KyberPublicKey;
  private indexKeys: Map<string, { dek: Uint8Array; wrappedDek: Uint8Array }>;

  async storeDocument(
    docId: string,
    embedding: Float32Array,
    metadata: DocumentMetadata
  ): Promise<void> {
    // Get or create index-level DEK
    const indexKey = await this.getOrCreateIndexKey(metadata.indexId);

    // Encrypt embedding (preserves approximate distances for search)
    const encryptedEmbedding = await this.encryptVector(embedding, indexKey.dek);

    // Encrypt sensitive metadata
    const encryptedMetadata = await this.encryptMetadata(metadata, indexKey.dek);

    // Store in vector DB
    await this.vectorDb.upsert({
      id: docId,
      values: encryptedEmbedding,
      metadata: {
        ...encryptedMetadata,
        _encrypted: true,
        _keyVersion: indexKey.version
      }
    });
  }

  async query(
    queryEmbedding: Float32Array,
    indexId: string,
    topK: number = 10
  ): Promise<DecryptedResult[]> {
    const indexKey = this.indexKeys.get(indexId);
    if (!indexKey) throw new Error('Index key not found');

    // Transform query for encrypted search
    const transformedQuery = await this.transformQueryVector(queryEmbedding, indexKey.dek);

    // Search encrypted vectors
    const results = await this.vectorDb.query({
      vector: transformedQuery,
      topK,
      filter: { indexId }
    });

    // Decrypt results
    return Promise.all(results.matches.map(async (match) => ({
      id: match.id,
      score: match.score,
      metadata: await this.decryptMetadata(match.metadata, indexKey.dek),
      // Original text requires separate secure retrieval
    })));
  }

  private async getOrCreateIndexKey(indexId: string) {
    if (!this.indexKeys.has(indexId)) {
      const dek = crypto.getRandomValues(new Uint8Array(32));
      const { ciphertext, sharedSecret } = await Kyber.encapsulate(this.masterKey);
      const wrappedDek = await this.wrapKey(dek, sharedSecret);

      this.indexKeys.set(indexId, { dek, wrappedDek, version: 1 });
      await this.persistWrappedKey(indexId, wrappedDek, ciphertext);
    }
    return this.indexKeys.get(indexId)!;
  }
}`
    },

    realWorld: {
      adopters: [
        { label: 'IronCore Labs (Cloaked AI)', url: 'https://ironcorelabs.com/products/cloaked-ai/' },
        { label: 'Healthcare RAG systems' },
        { label: 'Legal document retrieval' }
      ],
      standards: [
        { label: 'HIPAA for PHI in embeddings', url: 'https://www.hhs.gov/hipaa/index.html' },
        { label: 'SOC 2 Type II', url: 'https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2' }
      ],
      quote: 'Vector embeddings are an underprotected gold mine for attackers.',
      quoteSource: { label: 'IronCore Labs Security Research', url: 'https://ironcorelabs.com/products/cloaked-ai/' }
    }
  },

  apiKeySecurity: {
    id: 'apiKeySecurity',
    title: 'API Key & Token Security',
    subtitle: 'Quantum-resistant authentication',
    icon: Key,
    category: 'in-flight',
    status: 'production',
    color: 'pink',

    threat: {
      title: 'Long-Lived Credential Harvesting',
      summary: 'API keys for LLM services often have lifetimes of months or years. "Harvest now, decrypt later" makes captured keys vulnerable to future quantum decryption.',
      details: [
        'OpenAI/Anthropic/cloud API keys typically valid for months',
        'Keys often embedded in applications, making rotation difficult',
        'Captured TLS traffic with API keys becomes decryptable post-quantum',
        'Single compromised key grants access to entire conversation history'
      ],
      impact: 'High',
      timeline: 'Active threat (credential harvesting is ongoing)'
    },

    solution: {
      title: 'Hybrid PQC Authentication',
      summary: 'Combine ML-DSA signatures with short-lived tokens. Establish Kyber session keys for API communication with 15-minute token rotation.',
      approach: [
        'Generate ML-DSA keypair for API client identity',
        'Sign authentication challenges with ML-DSA (proves identity)',
        'Establish Kyber session keys for each API session',
        'Issue short-lived tokens (15 min) instead of long-lived API keys',
        'Hardware-bind keys using TPM/Secure Enclave where possible'
      ],
      algorithms: ['kyber', 'dilithium']
    },

    performance: {
      overhead: {
        bandwidth: { value: '~6 KB', detail: 'ML-DSA signature (3.3KB) + Kyber ciphertext (1.5KB) + metadata.' },
        latency: { value: '+3-5 ms', detail: 'Initial auth handshake. Amortized over 15-min session.' },
        relative: { value: '< 1%', detail: 'Per-request overhead after session establishment.' }
      },
      benchmarks: [
        { scenario: 'Initial authentication', payload: 'Challenge-response', overhead: '~5 ms', verdict: 'One-time' },
        { scenario: 'Token refresh (15 min)', payload: 'New session key', overhead: '~3 ms', verdict: 'Excellent' },
        { scenario: 'Per-request overhead', payload: 'After auth', overhead: '< 0.1 ms', verdict: 'Negligible' }
      ]
    },

    implementation: {
      difficulty: 'Medium',
      timeEstimate: '1 week',
      prerequisites: ['Client-side ML-DSA support', 'Server-side key verification'],
      code: `import { Dilithium } from '@pqcrypto/dilithium';
import { Kyber } from '@pqcrypto/kyber';

class PQCAPIClient {
  /**
   * Quantum-resistant API authentication.
   * Replaces long-lived API keys with short-lived sessions.
   */

  private mldsaPrivateKey: Uint8Array;
  private mldsaPublicKey: Uint8Array;
  private sessionKey: Uint8Array | null = null;
  private sessionExpiry: number = 0;

  constructor(private apiEndpoint: string) {
    // Generate or load ML-DSA keypair (registered with API provider)
    const { publicKey, privateKey } = Dilithium.generateKeyPair();
    this.mldsaPublicKey = publicKey;
    this.mldsaPrivateKey = privateKey;
  }

  async ensureSession(): Promise<void> {
    if (this.sessionKey && Date.now() < this.sessionExpiry - 60000) {
      return; // Session still valid (with 1 min buffer)
    }
    await this.establishSession();
  }

  private async establishSession(): Promise<void> {
    // Step 1: Request challenge from server
    const { challenge, serverKyberPubkey } = await fetch(
      \`\${this.apiEndpoint}/auth/challenge\`,
      { method: 'POST', body: JSON.stringify({ clientPubkey: this.mldsaPublicKey }) }
    ).then(r => r.json());

    // Step 2: Sign challenge with ML-DSA
    const signature = await Dilithium.sign(
      new TextEncoder().encode(challenge),
      this.mldsaPrivateKey
    );

    // Step 3: Encapsulate session key with Kyber
    const { ciphertext, sharedSecret } = await Kyber.encapsulate(serverKyberPubkey);

    // Step 4: Send signed challenge + Kyber ciphertext
    const { sessionToken, expiresIn } = await fetch(
      \`\${this.apiEndpoint}/auth/verify\`,
      {
        method: 'POST',
        body: JSON.stringify({
          challenge,
          signature: Array.from(signature),
          kyberCiphertext: Array.from(ciphertext)
        })
      }
    ).then(r => r.json());

    // Step 5: Derive session key from Kyber shared secret
    this.sessionKey = await this.deriveSessionKey(sharedSecret, sessionToken);
    this.sessionExpiry = Date.now() + (expiresIn * 1000); // typically 15 min
  }

  async request(endpoint: string, data: any): Promise<any> {
    await this.ensureSession();

    // Encrypt request body with session key
    const encrypted = await this.encrypt(JSON.stringify(data), this.sessionKey!);

    const response = await fetch(\`\${this.apiEndpoint}\${endpoint}\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/octet-stream',
        'X-Session-Id': this.sessionId
      },
      body: encrypted
    });

    // Decrypt response
    const encryptedResponse = await response.arrayBuffer();
    return JSON.parse(await this.decrypt(encryptedResponse, this.sessionKey!));
  }

  private async deriveSessionKey(sharedSecret: Uint8Array, token: string): Promise<Uint8Array> {
    // HKDF derivation from Kyber shared secret
    const keyMaterial = await crypto.subtle.importKey(
      'raw', sharedSecret, 'HKDF', false, ['deriveBits']
    );
    const derived = await crypto.subtle.deriveBits(
      { name: 'HKDF', hash: 'SHA-256', salt: new TextEncoder().encode(token), info: new Uint8Array() },
      keyMaterial, 256
    );
    return new Uint8Array(derived);
  }
}`
    },

    realWorld: {
      adopters: [
        { label: 'Enterprise API gateways' },
        { label: 'Financial services' },
        { label: 'Healthcare platforms' }
      ],
      standards: [
        { label: 'OAuth 2.0 DPoP extension patterns', url: 'https://datatracker.ietf.org/doc/html/rfc9449' },
        { label: 'FIDO2/WebAuthn principles', url: 'https://www.w3.org/TR/webauthn-2/' }
      ],
      quote: 'Short-lived credentials with cryptographic binding are the future of API security.',
      quoteSource: { label: 'NIST Digital Identity Guidelines', url: 'https://pages.nist.gov/800-63-3/' }
    }
  }
};
