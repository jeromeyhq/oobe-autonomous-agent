/**
 * x402 Payment & Escrow Module
 *
 * Implements real x402 payment workflows for both bounty categories:
 * - Category 1: General Payment Volume (SAP Escrow)
 * - Category 2: Ace Data Cloud Usage (x402 Facilitator)
 */
import { Keypair } from '@solana/web3.js';
import { SapClient } from '@oobe-protocol-labs/synapse-sap-sdk';
export interface PaymentRecord {
    category: 'escrow' | 'x402';
    service: string;
    amount: number;
    timestamp: string;
    signature?: string;
    success: boolean;
}
export declare class X402PaymentHandler {
    private keypair;
    private client;
    private payments;
    constructor(keypair: Keypair, client: SapClient | null);
    generatePaymentHeaders(params: {
        network: string;
        amount: number;
        recipient: string;
        service: string;
    }): Promise<Record<string, string>>;
    callWithPayment(url: string, body: any, service: string): Promise<any>;
    openEscrow(client: SapClient, params: {
        depositLamports: number;
        maxCalls: number;
        pricePerCallLamports: number;
    }): Promise<{
        signature?: string;
        escrowPda: string;
        escrowNonce: number;
    }>;
    settleCalls(client: SapClient, params: {
        escrowNonce: number;
        callsToSettle: number;
        serviceHash: number[];
    }): Promise<{
        signature?: string;
    }>;
    getPaymentReport(): PaymentRecord[];
    getTotalVolume(): number;
    getPaymentCount(): number;
}
//# sourceMappingURL=x402-payments.d.ts.map