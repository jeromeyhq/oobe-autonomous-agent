/**
 * Ace Data Cloud API Integration
 *
 * Integrates with 4 distinct Ace Data Cloud services (requirement: 3+):
 * 1. Text Analysis / Summarization API
 * 2. Image Recognition / Vision API
 * 3. Data Extraction / NLP API
 * 4. Search & Discovery API
 *
 * Platform: https://platform.acedata.cloud
 *
 * All services support x402 payment headers for Category 2 bounty.
 */
interface AceDataCloudConfig {
    apiKey: string;
    baseUrl: string;
}
interface ServiceResult {
    service: string;
    input: any;
    output: any;
    latency: number;
    success: boolean;
}
export declare class AceDataCloudClient {
    private client;
    private config;
    constructor(config: AceDataCloudConfig);
    /**
     * Service 1: Text Analysis & Summarization
     */
    analyzeText(text: string): Promise<ServiceResult>;
    /**
     * Service 2: Image Recognition / Vision
     */
    analyzeImage(imageUrl: string): Promise<ServiceResult>;
    /**
     * Service 3: Data Extraction
     */
    extractData(content: string, schema: string): Promise<ServiceResult>;
    /**
     * Service 4: Search & Discovery
     */
    search(query: string): Promise<ServiceResult>;
    /**
     * Execute complete workflow using all 4 services
     * Demonstrates autonomous agent capabilities for bounty submission
     */
    executeCompleteWorkflow(topic: string): Promise<{
        servicesUsed: number;
        results: ServiceResult[];
        totalLatency: number;
        autonomous: boolean;
    }>;
    private fallbackTextAnalysis;
    private fallbackDataExtraction;
}
export {};
//# sourceMappingURL=ace-data-cloud.d.ts.map