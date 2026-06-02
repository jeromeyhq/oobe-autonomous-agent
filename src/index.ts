/**
 * OOBE Protocol × Ace Data Cloud Autonomous Agent
 * 
 * Bounty: Build Autonomous Agents on Solana — $2,400 USDC
 * 
 * This agent:
 * 1. Registers on Synapse Agent Protocol (SAP) mainnet
 * 2. Discovers and uses Ace Data Cloud AI services (4 services)
 * 3. Executes complete automated workflows end-to-end
 * 4. Settles payments via x402 + SAP Escrow
 * 5. Uses Synapse Sentinel for monitoring (bounty requirement)
 * 
 * Usage:
 *   npm run register   — Register agent on SAP
 *   npm run run-agent  — Run autonomous agent
 *   npm run full       — Register + Run (default)
 *   npm run sentinel   — Run Sentinel integration only
 */

import 'dotenv/config';
import { Keypair } from '@solana/web3.js';
import { registerAgent } from './register';
import { runAutonomousAgent } from './agent';

async function main() {
  console.log('🚀 OOBE Protocol Autonomous Agent Starting...');
  console.log('═'.repeat(60));

  const mode = process.argv[2] || 'full';

  switch (mode) {
    case 'register':
      console.log('📝 Mode: Register Agent on SAP');
      await registerAgent();
      break;

    case 'run':
      console.log('🤖 Mode: Run Autonomous Agent');
      await runAutonomousAgent();
      break;

    case 'sentinel':
      console.log('🛡️  Mode: Run Sentinel Integration');
      const { SentinelClient } = await import('./sentinel');
      const nodeFs = await import('fs');
      const keypairPath2 = process.env.WALLET_KEYPAIR_PATH || './keys/agent-keypair.json';
      let keypair2: Keypair;
      if (nodeFs.existsSync(keypairPath2)) {
        keypair2 = Keypair.fromSecretKey(new Uint8Array(JSON.parse(nodeFs.readFileSync(keypairPath2, 'utf-8'))));
      } else {
        keypair2 = Keypair.generate();
      }
      const sentinel = new SentinelClient(null, process.env.OOBE_RPC_URL || '');
      await sentinel.runFullIntegration(keypair2.publicKey);
      break;

    case 'full':
    default:
      console.log('🔄 Mode: Full (Register + Run)');
      const regResult = await registerAgent();
      console.log('\n⏳ Waiting 3 seconds before running agent...');
      await new Promise(r => setTimeout(r, 3000));
      await runAutonomousAgent();
      break;
  }

  console.log('\n✅ Agent execution complete!');
}

main().catch(err => {
  console.error('❌ Fatal error:', err.message);
  process.exit(1);
});
