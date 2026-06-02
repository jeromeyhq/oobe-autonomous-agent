/**
 * Autonomous Agent Core Logic
 *
 * Implements the complete autonomous workflow:
 * 1. Discover tools via Synapse Agent Protocol (SAP)
 * 2. Execute tasks using Ace Data Cloud AI services
 * 3. Settle payments using x402 + SAP Escrow
 * 4. Use Synapse Sentinel for monitoring
 *
 * Runs end-to-end without human intervention:
 * trigger → discovery → execution → payment → sentinel validation
 */
import 'dotenv/config';
import { Keypair } from '@solana/web3.js';
import { SapClient } from '@oobe-protocol-labs/synapse-sap-sdk';
interface WorkflowConfig {
    topics: string[];
    maxIterations: number;
    useEscrow: boolean;
    useX402: boolean;
    useSentinel: boolean;
}
export declare class AutonomousAgent {
    private aceClient;
    private paymentHandler;
    private sentinelClient;
    private sapClient;
    private keypair;
    private workflowLog;
    constructor(keypair: Keypair, apiKey: string, sapClient: SapClient | null, rpcUrl: string);
    /**
     * Discover available tools via SAP network
     */
    discoverTools(): Promise<any[]>;
    /**
     * Execute the complete autonomous workflow
     */
    executeWorkflow(config?: WorkflowConfig): Promise<{
        results: any[];
        report: string;
        workflowLog: any[];
    }>;
    /**
     * Generate summary report
     */
    private generateReport;
    /**
     * Save workflow log
     */
    private saveWorkflowLog;
    /**
     * Cached tools for fallback
     */
    private getCachedTools;
}
export declare function runAutonomousAgent(): Promise<{
    results: any[];
    report: string;
    workflowLog: any[];
}>;
export {};
//# sourceMappingURL=agent.d.ts.map