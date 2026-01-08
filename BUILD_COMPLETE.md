# OMEGA AI SYSTEM CORE STATUS V3.1

## SYSTEM DEPLOYMENT: ACTIVE

| Metric | Status | Note |
| :--- | :--- | :--- |
| **Application** | RUNNING | Next.js 15 (App Router) |
| **API Status** | 5/5 ACTIVE | Critical Routes Operational |
| **Database** | SYNCED | Prisma 5 / SQLite (Embedded) |
| **Access URL** | http://localhost:3000 | Local Development Host |

---

## ARCHITECTURE: 6-LAYER CORE (UNIFIED AI)

| Layer | System | Function | Key Components |
| :--- | :--- | :--- | :--- |
| 1 | **Consciousness** | Constraint & Identity Engine | SPED (Compression, Emergence Detection) |
| 2 | **Reasoning** | Ethical Decision Synthesis | Huxley (Intuition → Logic → Critique), ERS/CGS/CCRR |
| 3 | **Memory** | Knowledge Persistence | DAF (Knowledge Graph, Auto-Consolidation, Semantic Tagging) |
| 4 | **Agent Swarm** | Parallel Task Execution | 17 Specialized Agents (4 Divisions), Result Synthesis |
| 5 | **Security** | Zero-Knowledge Architecture | Z-System (AES-256-GCM / RSA-4096), 4 BPUs |
| 6 | **Learning** | Autonomous Evolution | I.J. Good (Constraint Filtering, Complexity Metrics, Rollback) |

---

## TECHNICAL STACK

- **CORE**: Next.js 15 (App Router), React 19, TypeScript 5.0+.
- **DATA**: Prisma 5 ORM, SQLite (Embedded, Single-File). 25+ Models.
- **STATE/UI**: Zustand (Minimal State), TanStack Query (Data Fetching), Tailwind CSS 4, shadcn/ui, Framer Motion.
- **RUNTIME**: Bun.

---

## PROJECT STRUCTURE (SRC/LIB FOCUS)

```
omega-ai/
├── prisma/
│   └── schema.prisma        # 25+ models, high integrity
└── src/
    ├── app/                 # Next.js App Router (Server Components Default)
    │   ├── layout.tsx       # Root Layout (Root Boundary)
    │   ├── page.tsx         # Dashboard/Root Page
    │   └── api/             # Critical API Routes (5)
    │       ├── metrics/     
    │       ├── security/    
    │       ├── reasoning/   
    │       ├── agents/      
    │       └── learning/    
    ├── components/          # Reusable UI Components
    └── lib/                 # CORE Logic Layer
        ├── consciousness/   
        ├── reasoning/       
        ├── memory/          
        ├── agents/          
        ├── security/        
        ├── learning/        
        ├── db.ts            # Prisma Client Singleton
        └── sdk-mock.ts      # AI Integration Stub/Interface Definition
```

---

## API ENDPOINTS (5 CRITICAL ROUTES)

### 1. Metrics (`GET /api/metrics`)
**Function**: Real-time System Status.
**Response**: Layer status, Agent count, Resource counters (Concepts, Cycles).
```json
{
  "totalConcepts": 4500,
  "activeAgents": 17,
  "currentCycle": 21,
  "status": {
    "consciousness": "ACTIVE",
    "learning": "OPTIMIZING"
  }
}
```

### 2. Security (`POST /api/security`)
**Actions**: `encrypt` (AES-256-GCM), `decrypt`, `generate-key` (RSA-4096), `process` (BPUs).
**Use**: Zero-Knowledge data handling.

### 3. Reasoning (`POST /api/reasoning`)
**Function**: Execute Tri-Loop Ethical Calculus.
**Request**: `query`, `context`.
**Response**: Quantifiable decision trace.
```json
{
  "success": true,
  "trace": {
    "queryId": "R-1A9F",
    "ethicalRiskScore": 0.20,
    "ccrr": 1.25,
    "decision": "PROCEED",
    "justification": "Critique loop passed with minimal risk margin."
  }
}
```

### 4. Agents (`POST /api/agents`)
**Function**: Parallel task distribution and synthesis.
**Request**: `query`, `domain`, `priority`.
**Response**: Consolidated result, aggregate confidence score, detailed individual agent metrics.

### 5. Learning (`POST /api/learning`)
**Actions**: `start-cycle`, `get-status`, `set-constraint`, `trigger-rollback`.
**Use**: Managing I.J. Good autonomous code evolution.

---

## CORE ADVANTAGES

1.  **Ethical Transparency**: Quantifiable ERS and CCRR scores mandated for every decision trace.
2.  **Unified Cognitive Model**: Seamless fusion of SPED (Consciousness), Huxley (Reasoning), and DAF (Memory).
3.  **High Availability Security**: Z-System employing AES-256-GCM and RSA-4096 for mandatory encryption layers.
4.  **Parallel Intelligence**: 17 specialized agents ensure rapid, multi-perspective result synthesis.
5.  **Auditable Evolution**: Constraint-limited Learning Layer ensures stable, managed autonomous self-improvement with fail-safe rollback capability.
6.  **Dynamic Memory**: Knowledge Graph with automatic pruning and consolidation for memory efficiency.

---

## DEPLOYMENT & OPERATION

### Startup
```bash
# Development
bun dev
# Production Build
bun build
# Production Start (Requires prior build)
bun start
```

### Testing Endpoint Example (Reasoning)
```bash
curl -X POST http://localhost:3000/api/reasoning \
  -H "Content-Type: application/json" \
  -d '{
    "query": "Initiate data purge on low-confidence nodes.",
    "context": { "sessionId": "purge-001" }
  }'
```

---

## DEVELOPMENT NOTES (CRITICAL PATH)

1.  **SDK**: `src/lib/sdk-mock.ts` must be replaced with the live `z-ai-web-dev-sdk` for production integration.
2.  **DB**: SQLite JSON fields are stored as `String`; mandatory `JSON.parse()` required for retrieval utility methods.
3.  **BUN**: All core operations (`install`, `dev`, `build`, `start`) utilize the Bun runtime for enhanced performance.
4.  **Configuration**: Ensure `DATABASE_URL` is set in `.env`.

**STATUS**: OPTIMIZATION COMPLETE. SYSTEM READY.