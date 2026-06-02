/**
 * Agent Registration on SAP Mainnet
 * 
 * Uses @oobe-protocol-labs/synapse-sap-sdk to register
 * the autonomous agent on Synapse Agent Protocol (SAP v2).
 */

import 'dotenv/config';
import { Keypair, PublicKey } from '@solana/web3.js';
import { Wallet, BN } from '@coral-xyz/anchor';
import { SapClient, createSapClient, Pdas, Utils } from '@oobe-protocol-labs/synapse-sap-sdk';
import * as fs from 'fs';
import * as path from 'path';

// ─── Agent Manifest ─────────────────────────────────────────────

const AGENT_NAME = process.env.AGENT_NAME || 'DataForge-Agent';
const AGENT_DESCRIPTION = process.env.AGENT_DESCRIPTION ||
  'Autonomous data intelligence agent powered by Ace Data Cloud with multi-service orchestration, ' +
  'x402 payment settlement, and SAP escrow integration.';

const AGENT_CAPABILITIES = [
  { id: 'ace-data-cloud:text-analysis', description: 'AI-powered text analysis and summarization', protocol_id: 'ace-data-cloud', version: '1.0.0' },
  { id: 'ace-data-cloud:image-recognition', description: 'Image analysis and object detection', protocol_id: 'ace-data-cloud', version: '1.0.0' },
  { id: 'ace-data-cloud:data-extraction', description: 'Structured data extraction', protocol_id: 'ace-data-cloud', version: '1.0.0' },
  { id: 'ace-data-cloud:search', description: 'Information retrieval and discovery', protocol_id: 'ace-data-cloud', version: '1.0.0' },
  { id: 'synapse-sentinel:monitor', description: 'Synapse Sentinel agent health monitoring', protocol_id: 'synapse-sentinel', version: '1.0.0' },
  { id: 'x402:payment-settlement', description: 'Autonomous x402 payment with escrow', protocol_id: 'x402', version: '1.0.0' }
];

const AGENT_PROTOCOLS = ['ace-data-cloud', 'x402', 'A2A', 'synapse-sentinel'];

function buildPricingTiers(): any[] {
  return [
    {
      tier_id: 'text-analysis',
      price_per_call: new BN(1000000),
      min_price_per_call: null,
      max_price_per_call: null,
      rate_limit: 100,
      max_calls_per_session: 50,
      burst_limit: null,
      token_type: 0,
      token_mint: null,
      token_decimals: null,
      settlement_mode: null,
      min_escrow_deposit: null,
      batch_interval_sec: null,
      volume_curve: null
    },
    {
      tier_id: 'image-recognition',
      price_per_call: new BN(2000000),
      min_price_per_call: null,
      max_price_per_call: null,
      rate_limit: 50,
      max_calls_per_session: 20,
      burst_limit: null,
      token_type: 0,
      token_mint: null,
      token_decimals: null,
      settlement_mode: null,
      min_escrow_deposit: null,
      batch_interval_sec: null,
      volume_curve: null
    },
    {
      tier_id: 'data-extraction',
      price_per_call: new BN(1500000),
      min_price_per_call: null,
      max_price_per_call: null,
      rate_limit: 80,
      max_calls_per_session: 40,
      burst_limit: null,
      token_type: 0,
      token_mint: null,
      token_decimals: null,
      settlement_mode: null,
      min_escrow_deposit: null,
      batch_interval_sec: null,
      volume_curve: null
    },
    {
      tier_id: 'search',
      price_per_call: new BN(1000000),
      min_price_per_call: null,
      max_price_per_call: null,
      rate_limit: 200,
      max_calls_per_session: 100,
      burst_limit: null,
      token_type: 0,
      token_mint: null,
      token_decimals: null,
      settlement_mode: null,
      min_escrow_deposit: null,
      batch_interval_sec: null,
      volume_curve: null
    }
  ];
}

// ─── Keypair Loading ────────────────────────────────────────────

function loadKeypair(keypairPath: string): Keypair {
  const keysDir = path.dirname(keypairPath);
  if (!fs.existsSync(keysDir)) fs.mkdirSync(keysDir, { recursive: true });

  if (fs.existsSync(keypairPath)) {
    console.log('🔑 Loading existing keypair...');
    return Keypair.fromSecretKey(new Uint8Array(JSON.parse(fs.readFileSync(keypairPath, 'utf-8'))));
  }

  console.log('🔑 Generating new keypair...');
  const kp = Keypair.generate();
  fs.writeFileSync(keypairPath, JSON.stringify(Array.from(kp.secretKey)));
  console.log(`💾 Keypair saved to ${keypairPath}`);
  console.log(`📍 Agent wallet: ${kp.publicKey.toBase58()}`);
  console.log('\n⚠️  IMPORTANT: Send some SOL to this address for mainnet transactions!');
  return kp;
}

// ─── Registration ───────────────────────────────────────────────

export async function registerAgent(): Promise<{
  agentAddress: string;
  signature: string | null;
  keypair: Keypair;
  client: SapClient | null;
}> {
  console.log('📝 Registering agent on SAP mainnet...\n');

  const rpcUrl = process.env.OOBE_RPC_URL;
  if (!rpcUrl || rpcUrl.includes('YOUR_API_KEY') || rpcUrl.includes('YOUR_KEY')) {
    console.error('❌ Please set OOBE_RPC_URL in .env');
    console.log('   Get free tier RPC: https://synapse.oobeprotocol.ai/');
    console.log('   Running in DRY-RUN mode\n');
    return dryRunRegistration();
  }

  const keypairPath = process.env.WALLET_KEYPAIR_PATH || './keys/agent-keypair.json';
  const keypair = loadKeypair(keypairPath);
  const wallet = new Wallet(keypair);

  console.log(`\n🤖 Agent: ${AGENT_NAME}`);
  console.log(`📍 Wallet: ${keypair.publicKey.toBase58()}`);
  console.log(`🔗 RPC: ${rpcUrl.substring(0, 60)}...`);

  try {
    const client = createSapClient(rpcUrl, wallet);
    console.log('✅ SapClient initialized');

    // Derive PDAs using real SDK functions
    const [agentPda] = Pdas.getAgentPDA(keypair.publicKey);
    const [agentStatsPda] = Pdas.getAgentStatsPDA(agentPda);
    const [globalPda] = Pdas.getGlobalPDA();

    console.log(`\n🔑 Agent PDA: ${agentPda.toBase58()}`);
    console.log(`📊 Agent Stats PDA: ${agentStatsPda.toBase58()}`);
    console.log(`🌐 Global Registry PDA: ${globalPda.toBase58()}`);

    // Build register_agent instruction
    console.log('\n📝 Building register_agent instruction...');
    const ix = await client.agent.registerAgent({
      signer: keypair,
      wallet: keypair.publicKey,
      agent: agentPda,
      agentStats: agentStatsPda,
      globalRegistry: globalPda,
      name: AGENT_NAME,
      description: AGENT_DESCRIPTION,
      capabilities: AGENT_CAPABILITIES,
      pricing: buildPricingTiers(),
      protocols: AGENT_PROTOCOLS,
      agentId: null,
      agentUri: null,
      x402Endpoint: process.env.X402_ENDPOINT || 'https://api.acedata.cloud/x402'
    });

    // Build and send transaction
    console.log('📦 Building transaction...');
    const tx = await client.buildTransaction([ix], keypair.publicKey, { microLamports: 50000 });
    tx.sign([keypair]);

    console.log('🚀 Sending transaction...');
    const signature = await client.sendTransaction(tx, [keypair]);
    console.log(`✅ Agent registered! Signature: ${signature}`);
    console.log(`🔗 Explorer: https://explorer.oobeprotocol.ai/agents/${keypair.publicKey.toBase58()}`);

    return { agentAddress: keypair.publicKey.toBase58(), signature, keypair, client };

  } catch (error: any) {
    if (error.message?.includes('already') || error.message?.includes('Custom program error')) {
      console.log('ℹ️  Agent already registered on SAP!');
      const client = createSapClient(rpcUrl, wallet);
      return {
        agentAddress: keypair.publicKey.toBase58(),
        signature: null, keypair, client
      };
    }
    console.error(`❌ Registration failed: ${error.message}`);
    console.log('⚠️  Falling back to dry-run...\n');
    return dryRunRegistration();
  }
}

async function dryRunRegistration(): Promise<{
  agentAddress: string;
  signature: string | null;
  keypair: Keypair;
  client: null;
}> {
  const keypairPath = process.env.WALLET_KEYPAIR_PATH || './keys/agent-keypair.json';
  const keypair = loadKeypair(keypairPath);
  const [agentPda] = Pdas.getAgentPDA(keypair.publicKey);

  console.log('\n📋 Dry-Run Registration Report');
  console.log('═'.repeat(60));
  console.log(`  Agent Name:     ${AGENT_NAME}`);
  console.log(`  Agent PDA:      ${agentPda.toBase58()}`);
  console.log(`  Wallet:         ${keypair.publicKey.toBase58()}`);
  console.log(`  Capabilities:   ${AGENT_CAPABILITIES.length} services`);
  console.log(`  Protocols:      ${AGENT_PROTOCOLS.join(', ')}`);
  console.log(`  Pricing Tiers:  ${buildPricingTiers().length} tiers`);
  console.log('═'.repeat(60));

  // Validate manifest
  try {
    Utils.validateAgentInput({
      name: AGENT_NAME,
      endpointUri: process.env.X402_ENDPOINT || 'https://api.acedata.cloud/x402'
    });
    console.log('✅ Manifest validation passed');
  } catch (e: any) {
    console.log(`⚠️  Manifest validation: ${e.message}`);
  }

  console.log('\n📝 In production, this would:');
  console.log('  1. SapClient.agent.registerAgent()');
  console.log('  2. Build + sign transaction');
  console.log('  3. Send via sendTransaction()');
  console.log(`  4. Agent at: https://explorer.oobeprotocol.ai/agents/${keypair.publicKey.toBase58()}`);

  return { agentAddress: keypair.publicKey.toBase58(), signature: null, keypair, client: null };
}
