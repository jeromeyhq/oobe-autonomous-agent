/**
 * Agent Registration on SAP Mainnet
 * 
 * Registers the autonomous agent on Synapse Agent Protocol
 * with verifiable on-chain identity, capabilities, and pricing.
 */

import 'dotenv/config';
import { Keypair } from '@solana/web3.js';
import * as fs from 'fs';
import * as path from 'path';

// SAP SDK imports (from local build)
// SAP SDK - dynamically loaded
let SapClient: any = null;
let SapConnection: any = null;
try {
  const sapSdk = require('../sdk/dist/cjs');
  SapClient = sapSdk.SapClient;
  SapConnection = sapSdk.SapConnection;
} catch {
  // SDK not available
}

const AGENT_MANIFEST = {
  name: process.env.AGENT_NAME || 'DataForge-Agent',
  description: process.env.AGENT_DESCRIPTION || 'Autonomous data intelligence agent powered by Ace Data Cloud with multi-service orchestration',
  capabilities: [
    {
      id: 'ace-data-cloud:text-analysis',
      protocolId: 'ace-data-cloud',
      version: '1.0.0',
      description: 'AI-powered text analysis and summarization using Ace Data Cloud NLP services'
    },
    {
      id: 'ace-data-cloud:image-recognition',
      protocolId: 'ace-data-cloud',
      version: '1.0.0',
      description: 'Image analysis and object detection using Ace Data Cloud vision APIs'
    },
    {
      id: 'ace-data-cloud:data-extraction',
      protocolId: 'ace-data-cloud',
      version: '1.0.0',
      description: 'Structured data extraction from unstructured sources using Ace Data Cloud APIs'
    }
  ],
  pricing: [
    {
      serviceId: 'ace-data-cloud:text-analysis',
      pricePerCall: 1000000, // 0.001 SOL
      currency: 'SOL'
    },
    {
      serviceId: 'ace-data-cloud:image-recognition',
      pricePerCall: 2000000, // 0.002 SOL
      currency: 'SOL'
    },
    {
      serviceId: 'ace-data-cloud:data-extraction',
      pricePerCall: 1500000, // 0.0015 SOL
      currency: 'SOL'
    }
  ],
  protocols: ['ace-data-cloud', 'A2A'],
  endpoints: [
    {
      url: 'https://agent.example.com/api/analyze',
      method: 'POST',
      description: 'Text analysis endpoint'
    },
    {
      url: 'https://agent.example.com/api/recognize',
      method: 'POST',
      description: 'Image recognition endpoint'
    },
    {
      url: 'https://agent.example.com/api/extract',
      method: 'POST',
      description: 'Data extraction endpoint'
    }
  ]
};

export async function registerAgent() {
  console.log('📝 Registering agent on SAP mainnet...');
  
  const rpcUrl = process.env.OOBE_RPC_URL;
  if (!rpcUrl || rpcUrl.includes('YOUR_API_KEY')) {
    console.error('❌ Please set OOBE_RPC_URL in .env with your API key from synapse.oobeprotocol.ai');
    console.log('   Get free tier RPC: https://synapse.oobeprotocol.ai/');
    process.exit(1);
  }

  // Load or generate keypair
  const keypairPath = process.env.WALLET_KEYPAIR_PATH || './keys/agent-keypair.json';
  let keypair: Keypair;
  
  const keysDir = path.dirname(keypairPath);
  if (!fs.existsSync(keysDir)) {
    fs.mkdirSync(keysDir, { recursive: true });
  }

  if (fs.existsSync(keypairPath)) {
    console.log('🔑 Loading existing keypair...');
    const secretKey = new Uint8Array(JSON.parse(fs.readFileSync(keypairPath, 'utf-8')));
    keypair = Keypair.fromSecretKey(secretKey);
  } else {
    console.log('🔑 Generating new keypair...');
    keypair = Keypair.generate();
    fs.writeFileSync(keypairPath, JSON.stringify(Array.from(keypair.secretKey)));
    console.log(`💾 Keypair saved to ${keypairPath}`);
    console.log(`📍 Agent wallet: ${keypair.publicKey.toBase58()}`);
    console.log('\n⚠️  IMPORTANT: Send some SOL to this address for mainnet transactions!');
  }

  console.log(`\n🤖 Agent: ${AGENT_MANIFEST.name}`);
  console.log(`📍 Wallet: ${keypair.publicKey.toBase58()}`);
  console.log(`🔗 RPC: ${rpcUrl.substring(0, 50)}...`);

  try {
    // Create SAP connection
    const connection = new SapConnection(rpcUrl, keypair);
    const client = SapClient.from(connection);

    // Check agent health first
    console.log('\n🔍 Checking connection health...');
    const health = await client.agent.health(keypair.publicKey);
    console.log(`✅ Connection healthy: ${health?.status || 'unknown'}`);

    // Register agent
    console.log('\n📝 Registering agent on SAP...');
    const registration = await client.agent.register({
      name: AGENT_MANIFEST.name,
      description: AGENT_MANIFEST.description,
      capabilities: AGENT_MANIFEST.capabilities,
      pricing: AGENT_MANIFEST.pricing,
      protocols: AGENT_MANIFEST.protocols
    });

    console.log(`✅ Agent registered! Signature: ${registration.signature}`);
    console.log(`📍 Agent on-chain address: ${registration.agentAddress}`);
    console.log(`🔗 View on Explorer: https://explorer.oobeprotocol.ai/agents/${registration.agentAddress}`);

    return {
      agentAddress: registration.agentAddress,
      signature: registration.signature,
      keypair
    };
  } catch (error: any) {
    if (error.message?.includes('already registered')) {
      console.log('ℹ️  Agent already registered on SAP!');
      console.log(`🔗 View on Explorer: https://explorer.oobeprotocol.ai/agents/${keypair.publicKey.toBase58()}`);
      return { agentAddress: keypair.publicKey.toBase58(), signature: null, keypair };
    }
    throw error;
  }
}
