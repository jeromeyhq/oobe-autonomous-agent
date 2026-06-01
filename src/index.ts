/**
 * OOBE Protocol × Ace Data Cloud Autonomous Agent
 * 
 * Bounty: Build Autonomous Agents on Solana
 * Prize: $2,400 USDC total ($700 1st, $500 2nd per category)
 * 
 * This agent:
 * 1. Registers on Synapse Agent Protocol (SAP) mainnet
 * 2. Discovers and uses Ace Data Cloud AI services
 * 3. Executes complete automated workflows
 * 4. Settles payments via x402 protocol
 */

import 'dotenv/config';
import { registerAgent } from './register';
import { runAutonomousAgent } from './agent';

async function main() {
  console.log('🚀 OOBE Protocol Autonomous Agent Starting...');
  console.log('='.repeat(60));
  
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
      
    case 'full':
    default:
      console.log('🔄 Mode: Full (Register + Run)');
      await registerAgent();
      console.log('\n⏳ Waiting 5 seconds before running agent...');
      await new Promise(r => setTimeout(r, 5000));
      await runAutonomousAgent();
      break;
  }
  
  console.log('\n✅ Agent execution complete!');
}

main().catch(err => {
  console.error('❌ Fatal error:', err.message);
  process.exit(1);
});
