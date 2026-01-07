# DALEK KHAN PURIFICATION PROTOCOL: FRONTEND DESIGN V2.0

## I. CORE SYSTEM MANDATE

### A. PRINCIPLES
1.  **Dual-Mode Execution**: Systematic Foundation (Tokens, Scales, States) coupled with BOLD, unique Creative Execution. AVOID generic outputs.
2.  **Accessibility (Constraint)**: WCAG AA Minimum (4.5:1 contrast). Mandatory keyboard navigation and reduced motion compliance. Semantic HTML first.
3.  **Purity Check**: All outputs MUST be token-based. Arbitrary values are prohibited.

### B. TRIGGER ACTIVATION
**EXECUTE ON**: "build a website/app/component," "create a dashboard/landing page," "design a UI," "make it modern/premium," "style this with..."
**DO NOT EXECUTE ON**: Backend API, Pure Logic/Algorithm implementation.

## II. SYSTEM ARCHITECTURE & WORKFLOW

### A. IMPLEMENTATION WORKFLOW
1.  **Phase 1**: Design Analysis & Token Definition (Systematic Foundation).
2.  **Phase 2**: Component Development (State Coverage & Purity Check).
3.  **Phase 3**: Page Assembly (Composition & Responsiveness).
4.  **Phase 4**: Quality Assurance (Accessibility & Performance Testing).

### B. FILE STRUCTURE (PRODUCTION REFERENCE)
```
frontend-design/
├── SKILL.md                    # Core Documentation (18k+ words)
├── README.md                   # Quick Start Guide
├── package.json                # Dependency Manifest
├── examples/
│   ├── css/
│   │   ├── tokens.css         # 400+ lines (Tokens/Scales/OKLCH)
│   │   └── components.css     # 600+ lines (Component Primitives)
│   └── typescript/
│       ├── design-tokens.ts   # Type-Safe Tokens
│       ├── theme-provider.tsx # Full Theme System (Light/Dark/System)
│       ├── sample-components.tsx # React/TS Components (500+ lines)
│       └── utils.ts           # 30+ Utility Functions
└── templates/
    ├── tailwind.config.js     # Build-time Configuration
    └── globals.css            # Standard Global Styles
```

## III. TECHNICAL REFINEMENT (OPTIMIZATIONS)

| Area | Before (Original) | After (v2.0 Purity) | Benefit |
| :--- | :--- | :--- | :--- |
| **Color Tokens** | `--primary: blue;` (Vague) | `--primary: oklch(55% 0.18 250);` | Perceptually uniform, trivial dark mode (lightness adjust). |
| **State Coverage**| Mentioned, often skipped | **MANDATORY CHECKLIST** (Default, Hover, Active, Focus, Disabled, Loading, Empty, Error). | Eliminates forgotten edge cases; robust UX. |
| **Typography** | Fixed sizes (`16px`) | Fluid `clamp(1rem, 0.95rem + 0.25vw, 1.125rem)` | Responsive scalability without excessive media queries. |
| **Performance** | CDN allowed | Build-Time Tailwind CSS (95% bundle reduction). | Minimal bundle size; tree-shaking enabled. |
| **Motion** | Basic transitions | Keyframes + Forced `@media (prefers-reduced-motion: reduce)` disablement. | Professional motion, enforced accessibility. |
| **Type Safety** | None | Complete TypeScript integration (Tokens, Props, Utilities). | Error reduction; modern development standard. |

## IV. IMPLEMENTATION EXAMPLES (PURIFIED OUTPUT)

### A. COMPONENT PATTERN (Button Example)
**OUTPUT REQUIRES**: Type-safe, token-based composition.
```typescript
<Button
  variant="primary"
  size="md"
  isLoading={isSubmitting} // Includes loading state/spinner
  leftIcon={<CheckIcon />}
  onClick={handleSubmit}
/>
```

### B. THEME SYSTEM
**ARCHITECTURE**: Full Theme Provider (`ThemeProvider`) required for context management, `localStorage` persistence, and system preference detection.
```tsx
import { ThemeProvider, ThemeToggle } from './theme-provider';

function App() {
  return (
    <ThemeProvider defaultTheme="system">
      {/* ... Your Application ... */}
      <ThemeToggle /> {/* Single-line theme switch */}
    </ThemeProvider>
  );
}
```

### C. UTILITY FUNCTIONS
The system includes 30+ utilities for common high-performance needs:
*   `cn(...classes)`: Smart class merging/resolution.
*   `debounce(fn, ms)`: Performance optimization.
*   `prefersReducedMotion()`: Runtime accessibility check.

## V. METRICS AND SCOPE

| Metric | Value |
| :--- | :--- |
| **Documentation Length** | 18,000+ words (SKILL.md) |
| **Code Base Size** | 4,000+ lines (Production Examples) |
| **Component Library** | 15+ Production-Ready Components |
| **Design Tokens** | 100+ Defined Tokens |
| **Accessibility Compliance** | WCAG AA Minimum |
| **Optimization Impact** | Transforms methodology into complete, production-ready system. |

## VI. V3.0 EXPANSION TARGETS (FUTURE PURIFICATION)
*   Animation Library Integration (Framer Motion).
*   Form Validation Patterns.
*   Data Visualization Component Set.
*   Internationalization (i18n) Support.
*   Testing Framework Examples (Jest, Testing Library).