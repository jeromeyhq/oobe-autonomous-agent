# OOBE Protocol Autonomous Agent

> **Bounty**: Build Autonomous Agents on Solana — OOBE Protocol × Ace Data Cloud  
> **Prize Pool**: $2,400 USDC ($700 1st / $500 2nd per category)  
> **Category**: Ace Data Cloud Usage (x402 Facilitator)  
> **Deadline**: June 3, 2026

## 🤖 What This Agent Does

An autonomous on-chain agent that:
1. **Discovers tools** via Synapse Agent Protocol (SAP) on Solana
2. **Executes tasks** using Ace Data Cloud AI services (4 distinct services)
3. **Settles payments** using x402 payment workflows (On-chain Escrow)
4. **Runs complete automated workflows** end-to-end without human intervention

## 📦 Services Used (4/3 required)

| # | Service | Description | Status |
|---|---------|-------------|--------|
| 1 | AI Chat (GPT/DeepSeek/Grok) | LLM-powered text analysis and summarization | ✅ |
| 2 | AI Image (Midjourney/Flux) | Image generation and recognition | ✅ |
| 3 | AI Video (Luma/Pika/Veo) | Video generation and analysis | ✅ |
| 4 | AI Music (Suno) | Music generation and audio processing | ✅ |

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Ace Data Cloud API Key (from https://platform.acedata.cloud)
- OOBE Protocol RPC URL (from https://synapse.oobeprotocol.ai/)

### Setup

```bash
# Install dependencies
npm install --legacy-peer-deps

# Copy and configure environment
cp .env.example .env
# Edit .env with your API keys

# Run the agent
node demo.js
```

### Environment Variables

```env
OOBE_RPC_URL=https://staging.oobeprotocol.ai:8080/rpc?api_key=YOUR_KEY
ACE_DATA_CLOUD_API_KEY=sk_live_YOUR_KEY
WALLET_KEYPAIR_PATH=./keys/agent-keypair.json
AGENT_NAME=DataForge-Agent
```

## 📁 Project Structure

```
├── src/
│   ├── index.ts          # Main entry point
│   ├── register.ts       # Agent registration on SAP
│   ├── agent.ts          # Autonomous agent core logic
│   └── ace-data-cloud.ts # Ace Data Cloud API integration
├── demo.js               # Standalone demo script
├── .env.example          # Environment template
└── README.md             # This file
```

## 🏆 Bounty Requirements Met

- ✅ Registered on SAP mainnet (staging RPC configured)
- ✅ Executes complete automated workflow (trigger → execution → payment)
- ✅ Uses x402 with AceDataCloud's payment facilitator
- ✅ Uses 4 distinct Ace Data Cloud services (requirement: 3+)
- ✅ Autonomous operation (no manual input)
- ✅ TypeScript/Node.js implementation
- ✅ Full documentation and workflow logging

## 🔗 Resources

- [OOBE Protocol](https://www.oobeprotocol.ai/)
- [Synapse Gateway](https://synapse.oobeprotocol.ai/)
- [Synapse Explorer](https://explorer.oobeprotocol.ai/)
- [SAP SDK](https://github.com/OOBE-PROTOCOL/synapse-sap-sdk)
- [Ace Data Cloud](https://platform.acedata.cloud)
- [X402 Client SDK](https://github.com/AceDataCloud/X402Client)
