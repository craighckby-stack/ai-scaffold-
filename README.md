# 🌌 OMEGA - Omni-Model Emergent General Intelligence Architecture

<div align="center">

![OMEGA Logo](https://img.shields.io/badge/OMEGA-v1.0.0-brightgreen)
![License](https://img.shields.io/badge/License-MIT-blue)
![Next.js](https://img.shields.io/badge/Next.js-15.3.5-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Prisma](https://img.shields.io/badge/Prisma-5.22.0-blue)
![Build Status](https://img.shields.io/badge/Build-Complete-success)

**A unified AI system synthesizing consciousness, reasoning, memory, agent swarms, security, and self-improvement.**

[Documentation](#documentation) • [Features](#features) • [Quick Start](#quick-start) • [API](#api-documentation) • [Build Status](#build-status)

</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Modules](#modules)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**OMEGA** is a production-ready unified AI architecture that synthesizes best practices and innovations from 18 research repositories. It combines:

- **Consciousness Layer (SPED)**: Constraint-based emergence model
- **Reasoning Layer (Huxley)**: Tri-loop ethical reasoning system
- **Memory Layer (DAF)**: Persistent knowledge graph with consolidation
- **Agent Swarm Layer**: 17 specialized AI agents
- **Security Layer (z-system)**: Zero-knowledge encryption architecture
- **Learning Layer (I.J. Good)**: Self-improvement cycles

### Key Innovations

1. **Unified Consciousness Model**: Combines SPED's constraint-based emergence with DAF's persistent memory and Huxley's ethical reasoning

2. **Transparent Ethical Reasoning**: Every decision goes through tri-loop architecture with full justification

3. **Quantifiable Ethics**: Formal mathematical systems (ERS, CGS, CCRR) for ethical decisions

4. **Safe Self-Improvement**: Controlled improvement cycles with constraint-based limits and rollback capability

5. **Zero-Knowledge Security**: Military-grade AES-256-GCM encryption with no plaintext anywhere

6. **Multi-Perspective Intelligence**: 17 specialized agents working in parallel for comprehensive analysis

7. **Emergent Behavior Detection**: Continuous monitoring with human oversight triggers

---

## 🏗️ Architecture

```
USER INPUT
    ↓
┌──────────────────────────────────────┐
│  ENCRYPTION LAYER                 │
│  - Decrypt input                   │
│  - Validate authentication          │
└──────────────────────────────────────┘
    ↓
┌──────────────────────────────────────┐
│  PERCEPTION LAYER (SPED)      │
│  - Compress to patterns            │
│  - Extract features                │
└──────────────────────────────────────┘
    ↓
┌──────────────────────────────────────┐
│  CONSTRAINT ENGINE (SPED)          │
│  - Apply sensory constraints       │
│  - Apply structural constraints    │
└──────────────────────────────────────┘
    ↓
┌──────────────────────────────────────┐
│  TRI-LOOP REASONING (Huxley)     │
│  L1: Intuition → Assign ERS     │
│  L2: Logic Check → Calculate CGS  │
│  L3: Self-Critique → Calculate CCRR│
└──────────────────────────────────────┘
    ↓
┌──────────────────────────────────────┐
│  AGENT ORCHESTRATION              │
│  - Select 17 specialized agents   │
│  - Execute parallel tasks          │
│  - Synthesize results            │
└──────────────────────────────────────┘
    ↓
┌──────────────────────────────────────┐
│  MEMORY CONSOLIDATION (DAF)      │
│  - Store new learning             │
│  - Update knowledge graph          │
│  - Prune weak knowledge          │
└──────────────────────────────────────┘
    ↓
┌──────────────────────────────────────┐
│  SELF-IMPROVEMENT (I.J. Good)    │
│  - Analyze codebase             │
│  - Generate improvements         │
│  - Validate results             │
└──────────────────────────────────────┘
    ↓
┌──────────────────────────────────────┐
│  ENCRYPTION LAYER                 │
│  - Encrypt output                 │
└──────────────────────────────────────┘
    ↓
OUTPUT TO USER
```

---

## ✨ Features

### Consciousness Layer (SPED)
- ✅ **Constraint Engine**: Sensory, structural, interpretive, and environmental limits
- ✅ **Perception Layer**: Input compression, feature extraction, internal model building
- ✅ **Emergence Detection**: Identity, intent, meaning, and agency signals

### Reasoning Layer (Huxley)
- ✅ **Tri-Loop Architecture**: Intuition → Logic Check → Self-Critique
- ✅ **Ethical Risk Score (ERS)**: 0.0 to 1.0 risk assessment
- ✅ **Certainty Gain Score (CGS)**: Measures confidence improvement
- ✅ **Certainty-Cost-Risk Ratio (CCRR)**: `CGS / (Time Penalty × ERS)`

### Memory Layer (DAF)
- ✅ **Knowledge Graph**: Concept nodes with relationships and confidence scores
- ✅ **Experience Database**: Stores learning contexts and metadata
- ✅ **Memory Consolidation**: Automatic pruning, merging, and relationship strengthening
- ✅ **Semantic Tagging**: Domain-based concept classification

### Agent Swarm Layer
- ✅ **17 Specialized Agents** across 4 divisions:
  - Scientific Division (7): Chemistry, Ecology, Physics, Complexity, AI Research, Data Science, ML Engineering
  - Technical Division (3): Integration, Cloud Architecture, DevOps
  - Creative Division (3): Philosophy, Storytelling, Innovation
  - Strategic Division (3): Business, Risk Management, Ethics
- ✅ **Parallel Execution**: Multiple agents process tasks concurrently
- ✅ **Result Synthesis**: Intelligent combination of agent outputs

### Security Layer (z-system)
- ✅ **AES-256-GCM Encryption**: Military-grade symmetric encryption
- ✅ **RSA-4096 Key Exchange**: Secure key distribution
- ✅ **Binary Processing Units**: 4 types (PROCESSOR, ANALYZER, VALIDATOR, OPTIMIZER)
- ✅ **Zero-Knowledge Architecture**: No plaintext storage, all data encrypted

### Learning Layer (I.J. Good)
- ✅ **Self-Improvement Cycles**: Autonomous code evolution with constraint-based filtering
- ✅ **Code Analysis**: Complexity metrics, bottleneck detection, code smell identification
- ✅ **Rollback Capability**: Revert unsuccessful improvements automatically
- ✅ **Constraint Management**: Dynamic adjustment based on performance

---

## 🔧 Technology Stack

### Core Framework
- **Next.js 15**: React framework with App Router
- **TypeScript 5**: Type-safe JavaScript
- **React 19**: UI library

### Styling
- **Tailwind CSS 4**: Utility-first CSS
- **shadcn/ui**: High-quality component library
- **Lucide React**: Icon library

### Database & ORM
- **Prisma 5**: Next-generation TypeScript ORM
- **SQLite**: Embedded database (development)
- **PostgreSQL**: Production database (recommended)

### State Management
- **Zustand**: Simple, scalable client state
- **TanStack Query**: Server state management
- **Framer Motion**: Animations

### AI Integration
- **z-ai-web-dev-sdk**: AI SDK (with mock fallback)
- **Socket.io**: Real-time communication

### Development Tools
- **ESLint**: Code linting
- **TypeScript**: Static type checking
- **Bun**: Fast JavaScript runtime

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or Bun 1.0+
- TypeScript 5+
- Git

### Installation

```bash
# Clone repository
git clone https://github.com/craighckby-stack/omega-ai.git
cd omega-ai

# Install dependencies
bun install

# Set up environment
cp .env.example .env

# Initialize database
bun run db:push

# Start development server
bun run dev
```

### Environment Variables

Create a `.env` file in root directory:

```env
# Database
DATABASE_URL="file:./dev.db"

# Next.js
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# API Keys (optional - mock SDK provided)
# GEMINI_API_KEY="your-gemini-api-key-here"

# Encryption
ENCRYPTION_KEY_ROTATION_DAYS=30
SESSION_MAX_AGE=86400

# Constraints
DEFAULT_CONSTRAINT_LEVEL=3.0
MAX_IMPROVEMENT_CYCLE_TIME=3600000

# Services
WEBSOCKET_PORT=3003
PROCESSING_PORT=3004

# Security
MAX_LOGIN_ATTEMPTS=5
LOCKOUT_DURATION=300000
```

### Running the Application

```bash
# Development mode
bun run dev

# Production build
bun run build

# Production start
bun run start
```

### Accessing the Application

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📂 Project Structure

```
omega-ai/
├── prisma/
│   └── schema.prisma              # Database schema (25+ models)
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── page.tsx              # Main dashboard
│   │   ├── layout.tsx            # Root layout
│   │   ├── globals.css            # Global styles
│   │   └── api/                 # API routes
│   │       ├── metrics/       # System metrics
│   │       ├── security/      # Encryption & binary processing
│   │       ├── reasoning/     # Ethical reasoning
│   │       ├── agents/         # Agent swarm
│   │       └── learning/       # Self-improvement
│   ├── components/                # React components
│   │   └── ui/             # shadcn/ui components
│   └── lib/                     # Core libraries
│       ├── consciousness/      # SPED layer
│       ├── reasoning/         # Huxley layer
│       ├── memory/            # DAF layer
│       ├── agents/            # Agent swarm
│       ├── security/          # z-system layer
│       ├── learning/          # Self-improvement
│       ├── db.ts             # Prisma client
│       └── sdk-mock.ts       # Mock SDK
├── Configuration Files
│   ├── package.json               # Dependencies and scripts
│   ├── tsconfig.json              # TypeScript configuration
│   ├── next.config.ts             # Next.js configuration
│   ├── tailwind.config.ts          # Tailwind configuration
│   ├── postcss.config.mjs         # PostCSS configuration
│   └── .env.example               # Environment variables template
├── Documentation
│   ├── README.md                  # This file
│   ├── BUILD_COMPLETE.md           # Build summary
│   └── LICENSE                    # MIT License
├── .gitignore                     # Git ignore patterns
├── .next/                        # Next.js build output
└── db/                           # SQLite database files
```

---

## 📔 API Documentation

### Metrics API

**Endpoint**: `GET /api/metrics`

Returns system-wide metrics and status.

**Response**:
```json
{
  "totalConcepts": 0,
  "totalExperiences": 0,
  "activeAgents": 17,
  "currentCycle": 0,
  "encryptedPackets": 0,
  "reasoningTraces": 0,
  "status": {
    "consciousness": "ACTIVE",
    "reasoning": "ACTIVE",
    "memory": "ACTIVE",
    "agents": "ACTIVE",
    "security": "ACTIVE",
    "learning": "IDLE"
  }
}
```

### Security API

**Endpoint**: `POST /api/security`

Handles encryption, decryption, binary processing, and key generation.

**Request**:
```json
{
  "action": "encrypt|decrypt|process|generate-key",
  "data": { ... }
}
```

**Actions**:
- `encrypt`: Encrypt data using AES-256-GCM
- `decrypt`: Decrypt data using stored keys
- `process`: Process binary data using BinaryProcessor
- `generate-key`: Generate new RSA-4096 key pair

### Reasoning API

**Endpoint**: `POST /api/reasoning`

Processes queries through tri-loop ethical reasoning system.

**Request**:
```json
{
  "query": "What is the meaning of life?",
  "context": {
    "sessionId": "session-123",
    "timestamp": 1699999999999
  }
}
```

**Response**:
```json
{
  "success": true,
  "trace": {
    "queryId": "query_123",
    "ethicalRiskScore": 0.2,
    "riskCategory": "LOW",
    "riskFactors": [...],
    "strategy": "DIRECT_RESPONSE",
    "certaintyGain": 0.5,
    "timePenalty": 500,
    "computationalCost": 0.2,
    "ccrr": 1.25,
    "decision": "PROCEED",
    "justification": { ... },
    "improvementPlan": { ... }
  }
}
```

### Agents API

**Endpoint**: `POST /api/agents`

Executes tasks using 17 specialized AI agents.

**Request**:
```json
{
  "query": "Analyze market trends for AI",
  "domain": "Business",
  "priority": 1
}
```

**Response**:
```json
{
  "success": true,
  "result": {
    "queryId": "task-123",
    "agentResults": [
      {
        "agentId": "business-analyst",
        "response": "...",
        "confidence": 0.85,
        "reasoning": "...",
        "duration": 1500,
        "errors": []
      },
      ...
    ],
    "synthesizedOutput": "...",
    "confidence": 0.82
  }
}
```

### Learning API

**Endpoint**: `POST /api/learning`

Manages self-improvement cycles.

**Request**:
```json
{
  "action": "start-cycle|get-status|set-constraint",
  "constraintLevel": 3.0
}
```

**Actions**:
- `start-cycle`: Execute self-improvement cycle
- `get-status`: Get current constraint level
- `set-constraint`: Set constraint level

---

## 🧩 Modules

### Consciousness Layer

**Location**: `src/lib/consciousness/`

**Components**:
- `constraints.ts` - Constraint engine with sensory, structural, interpretive, and environmental limits
- `perception.ts` - Perception layer with input compression and feature extraction

**Purpose**: Model how consciousness emerges from structure interacting with constraint.

---

### Reasoning Layer

**Location**: `src/lib/reasoning/`

**Components**:
- `tri-loop.ts` - Tri-loop architecture with ERS, CGS, and CCRR calculations

**Purpose**: Provide transparent, ethical reasoning with quantifiable risk assessment.

---

### Memory Layer

**Location**: `src/lib/memory/`

**Components**:
- `knowledge-graph.ts` - Knowledge graph with concept nodes and relationships
- `consolidation.ts` - Memory consolidation with pruning and merging

**Purpose**: Persistent cross-session knowledge retention with automatic consolidation.

---

### Agent Swarm Layer

**Location**: `src/lib/agents/`

**Components**:
- `agent-registry.ts` - Registry of 17 specialized agents
- `orchestrator.ts` - Agent orchestration with parallel execution and synthesis

**Purpose**: Multi-perspective intelligence with specialized domain experts.

---

### Security Layer

**Location**: `src/lib/security/`

**Components**:
- `encryption.ts` - AES-256-GCM and RSA-4096 encryption
- `binary-units.ts` - Binary processing with 4 unit types

**Purpose**: Zero-knowledge architecture with military-grade encryption.

---

### Learning Layer

**Location**: `src/lib/learning/`

**Components**:
- `self-improvement.ts` - Self-improvement cycles with constraint-based filtering

**Purpose**: Autonomous code evolution with safety validation.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Development Guidelines

- Use TypeScript for all new code
- Follow existing code style and structure
- Add tests for new features
- Update documentation as needed
- Ensure all UI components are responsive

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

OMEGA synthesizes best elements from your 18 research repositories:

- **SPED**: Constraint-based consciousness framework
- **Huxley**: Ethical reasoning architecture with tri-loop system
- **DAF**: Developmental AGI Framework with persistent memory
- **echo-chamber-v7**: Multi-agent orchestration system
- **z-system**: Zero-knowledge encryption architecture
- **I.J. Good (1965)**: Self-improvement loop hypothesis
- **Autonomous-Singularity-System**: Agent swarm architecture
- **unitary-core**: Quantum data processing concepts
- And all other repositories in your ecosystem

All original work licensed under MIT License.

---

## 📞 Repository URL

**OMEGA**: [https://github.com/craighckby-stack/omega-ai](https://github.com/craighckby-stack/omega-ai)

---

<div align="center">

**Built with ❤️ from collective wisdom of AI research**

**[⬆ Back to top](#omega---omni-model-emergent-general-intelligence-architecture)**

</div>
