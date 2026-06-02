/**
 * Synapse Sentinel Integration
 *
 * Bounty requirement: "Use Synapse Sentinel agent services at least once"
 *
 * Sentinel agent: Ccr2yK3hLALU4p8oNRqrh4dGuvPJTth5KCLMio8cE1ph
 * Explorer: https://explorer.oobeprotocol.ai/agents/Ccr2yK3hLALU4p8oNRqrh4dGuvPJTth5KCLMio8cE1ph?tab=tools
 *
 * Sentinel provides agent monitoring, health checking, and tool validation
 * services on the SAP network.
 */
import { PublicKey } from '@solana/web3.js';
import { SapClient } from '@oobe-protocol-labs/synapse-sap-sdk';
export interface SentinelResult {
    service: string;
    success: boolean;
    data: any;
    latency: number;
}
/**
 * Interact with Synapse Sentinel agent services
 */
export declare class SentinelClient {
    private sapClient;
    private rpcUrl;
    constructor(sapClient: SapClient | null, rpcUrl: string);
    /**
     * Check health of our own agent via Sentinel monitoring
     */
    checkAgentHealth(agentWallet: PublicKey): Promise<SentinelResult>;
    /**
     * Validate agent tools via Sentinel
     * Checks that our agent's published tools are valid and accessible
     */
    validateTools(agentWallet: PublicKey): Promise<SentinelResult>;
    /**
     * Call Sentinel monitor service — satisfies bounty requirement
     * "Use Synapse Sentinel agent services at least once"
     */
    callSentinelMonitor(): Promise<SentinelResult>;
    /**
     * Full Sentinel integration — runs all Sentinel services
     * This is the primary method called from the agent workflow
     */
    runFullIntegration(agentWallet: PublicKey): Promise<SentinelResult[]>;
}
//# sourceMappingURL=sentinel.d.ts.map