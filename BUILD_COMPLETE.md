# OMEGA AI CORE V3.1

## STATUS

| Metric | Status | Note |
| :--- | :--- | :--- |
| Application | RUNNING | Next.js 15 |
| API Status | 5/5 ACTIVE | Routes Operational |
| Database | SYNCED | Prisma 5 / SQLite |

---
## ARCHITECTURE: 6-LAYER CORE

| Layer | System | Function | Key Components |
| :--- | :--- | :--- | :--- |
| 1 | Consciousness | Identity Engine | SPED (Emergence Detection) |
| 2 | Reasoning | Ethical Decision Synthesis | Tri-Loop Calculus, ERS/CCRR |
| 3 | Memory | Knowledge Persistence | DAF (Graph, Auto-Consolidation) |
| 4 | Agent Swarm | Parallel Task Execution | 17 Agents, Result Synthesis |
| 5 | Security | Zero-Knowledge | Z-System (AES-256/RSA-4096) |
| 6 | Learning | Autonomous Evolution | Constraint Filtering, Rollback |

---
## TECHNICAL STACK

- CORE: Next.js 15, React 19, TypeScript 5+.
- DATA: Prisma 5 ORM, SQLite. 25+ Models.
- STATE/UI: Zustand, TanStack Query, Tailwind CSS 4, shadcn/ui.
- RUNTIME: Bun.

---
## PROJECT STRUCTURE

```
omega-ai/
├─ prisma/
│  └─ schema.prisma
└─ src/
   ├─ app/
   │  ├─ layout.tsx
   │  ├─ page.tsx
   │  └─ api/ (5 critical routes)
   │     ├─ metrics/
   │     ├─ security/
   │     ├─ reasoning/
   │     ├─ agents/
   │     └─ learning/
   ├─ components/
   └─ lib/ (CORE Logic)
      ├─ consciousness/
      ├─ reasoning/
      ├─ memory/
      ├─ agents/
      ├─ security/
      ├─ learning/
      ├─ db.ts (Prisma Client)
      └─ sdk.ts (AI Stub)
```

---
## API ENDPOINTS (5 CRITICAL)

1. Metrics (`GET /api/metrics`)
   Function: Real-time System Status (Cycles, Agents, Layer Status).

2. Security (`POST /api/security`)
   Actions: `encrypt`, `decrypt`, `generate-key`, `process`.

3. Reasoning (`POST /api/reasoning`)
   Function: Execute Tri-Loop Calculus. Returns decision trace (ERS, CCRR).

4. Agents (`POST /api/agents`)
   Function: Parallel task distribution and result synthesis.

5. Learning (`POST /api/learning`)
   Actions: `start-cycle`, `set-constraint`, `trigger-rollback`.

---
## CRITICAL PATH

1. SDK: `lib/sdk.ts` must be replaced with the live `z-ai-web-dev-sdk`.
2. DB: SQLite JSON fields require mandatory string parsing on retrieval.
3. ENV: `DATABASE_URL` required.

STATUS: SYSTEM READY.