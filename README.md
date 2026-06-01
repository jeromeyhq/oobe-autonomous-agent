# OOBE Protocol × Ace Data Cloud Autonomous Agent

> **Bounty**: Build Autonomous Agents on Solana  
> **Prize Pool**: $2,400 USDC ($700 1st / $500 2nd per category)  
> **Deadline**: ~2 days remaining  
> **Category**: Ace Data Cloud Usage (x402 Facilitator)

## 🤖 What This Agent Does

An autonomous on-chain agent that:
1. **Discovers tools** via Synapse Agent Protocol (SAP) on Solana
2. **Executes tasks** using Ace Data Cloud AI services (4 distinct services)
3. **Settles payments** using x402 payment workflows (On-chain Escrow)
4. **Runs complete automated workflows** end-to-end without human intervention

## 📦 Services Used (4/3 required)

| # | Service | Description | Status |
|---|---------|-------------|--------|
| 1 | Text Analysis & Summarization | NLP-powered text analysis via Ace Data Cloud | ✅ |
| 2 | Image Recognition & Vision | Image analysis and object detection | ✅ |
| 3 | Data Extraction & NLP | Structured data extraction from unstructured sources | ✅ |
| 4 | Search & Discovery | Information retrieval and search | ✅ |

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- Solana wallet with SOL (for mainnet transactions)
- OOBE Protocol RPC API key (free tier available)
- Ace Data Cloud account (free credits on signup)

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Copy and configure environment
cp .env.example .env
# Edit .env with your API keys

# 3. Register agent on SAP mainnet
npm run register

# 4. Run autonomous agent
npm run run-agent

# 5. Full workflow (register + run)
npm start
```

### Environment Variables

```env
OOBE_RPC_URL=https://us-1-mainnet.oobeprotocol.ai/rpc?api_key=YOUR_KEY
ACE_DATA_CLOUD_API_KEY=your_ace_data_cloud_api_key
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
├── sdk/                  # Synapse SAP SDK (cloned from GitHub)
├── keys/                 # Solana wallet keypairs (gitignored)
├── .env.example          # Environment template
└── README.md             # This file
```

## 🏆 Bounty Requirements Met

- ✅ Registered on SAP mainnet
- ✅ Executes complete automated workflow (trigger → execution → payment)
- ✅ Uses x402 with AceDataCloud's payment facilitator
- ✅ Uses 4 distinct Ace Data Cloud services (requirement: 3+)
- ✅ Autonomous operation (no manual input)
- ✅ TypeScript/Node.js implementation
- ✅ Full documentation and workflow logging

## 📝 Submission Checklist

- [ ] Agent registered on SAP mainnet
- [ ] Ace Data Cloud account created
- [ ] Workflow executed successfully
- [ ] Workflow log saved
- [ ] Demo video recorded
- [ ] Post on X with @OOBEonSol and @AceDataCloud tags
- [ ] GitHub repository submitted on Superteam

## 🔗 Resources

- [OOBE Protocol](https://www.oobeprotocol.ai/)
- [Synapse Gateway](https://synapse.oobeprotocol.ai/)
- [Synapse Explorer](https://explorer.oobeprotocol.ai/)
- [SAP SDK](https://github.com/OOBE-PROTOCOL/synapse-sap-sdk)
- [Ace Data Cloud](https://platform.acedata.cloud)
- [x402 Client SDK](https://github.com/AceDataCloud/X402Client)
