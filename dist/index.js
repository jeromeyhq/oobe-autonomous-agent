"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const web3_js_1 = require("@solana/web3.js");
const register_1 = require("./register");
const agent_1 = require("./agent");
async function main() {
    console.log('🚀 OOBE Protocol Autonomous Agent Starting...');
    console.log('═'.repeat(60));
    const mode = process.argv[2] || 'full';
    switch (mode) {
        case 'register':
            console.log('📝 Mode: Register Agent on SAP');
            await (0, register_1.registerAgent)();
            break;
        case 'run':
            console.log('🤖 Mode: Run Autonomous Agent');
            await (0, agent_1.runAutonomousAgent)();
            break;
        case 'sentinel':
            console.log('🛡️  Mode: Run Sentinel Integration');
            const { SentinelClient } = await Promise.resolve().then(() => __importStar(require('./sentinel')));
            const nodeFs = await Promise.resolve().then(() => __importStar(require('fs')));
            const keypairPath2 = process.env.WALLET_KEYPAIR_PATH || './keys/agent-keypair.json';
            let keypair2;
            if (nodeFs.existsSync(keypairPath2)) {
                keypair2 = web3_js_1.Keypair.fromSecretKey(new Uint8Array(JSON.parse(nodeFs.readFileSync(keypairPath2, 'utf-8'))));
            }
            else {
                keypair2 = web3_js_1.Keypair.generate();
            }
            const sentinel = new SentinelClient(null, process.env.OOBE_RPC_URL || '');
            await sentinel.runFullIntegration(keypair2.publicKey);
            break;
        case 'full':
        default:
            console.log('🔄 Mode: Full (Register + Run)');
            const regResult = await (0, register_1.registerAgent)();
            console.log('\n⏳ Waiting 3 seconds before running agent...');
            await new Promise(r => setTimeout(r, 3000));
            await (0, agent_1.runAutonomousAgent)();
            break;
    }
    console.log('\n✅ Agent execution complete!');
}
main().catch(err => {
    console.error('❌ Fatal error:', err.message);
    process.exit(1);
});
//# sourceMappingURL=index.js.map