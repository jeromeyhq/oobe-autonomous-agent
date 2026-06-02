/**
 * Agent Registration on SAP Mainnet
 *
 * Uses @oobe-protocol-labs/synapse-sap-sdk to register
 * the autonomous agent on Synapse Agent Protocol (SAP v2).
 */
import 'dotenv/config';
import { Keypair } from '@solana/web3.js';
import { SapClient } from '@oobe-protocol-labs/synapse-sap-sdk';
export declare function registerAgent(): Promise<{
    agentAddress: string;
    signature: string | null;
    keypair: Keypair;
    client: SapClient | null;
}>;
//# sourceMappingURL=register.d.ts.map