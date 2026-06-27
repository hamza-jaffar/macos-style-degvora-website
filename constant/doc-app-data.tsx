export interface MarkdownFile {
    id: string;
    name: string;
    icon: string;
    category: string;
    rawText: string;
}

export const initialFiles: MarkdownFile[] = [
    {
        id: "system-status",
        name: "system-status.md",
        icon: "📟",
        category: "Diagnostics",
        rawText: `# System Operational Status

All primary microservices, asset bundles, and client-facing interfaces are fully operational.

## Core Telemetry Metric Units

* **Runtime Matrix Engine** — Status: ACTIVE (Next.js 15 Environment)
* **Design Frame Blueprint** — Status: STABLE (Tailwind CSS Module)
* **Application Sandboxing** — Status: SECURE (Isolated Runtime Layers)

---

## Workspace Quick Navigation

Select any document link from the left-hand workspace panel directory tree to investigate project source sheets, enterprise portfolios, or structural development roadmaps.`
    },
    {
        id: "overview",
        name: "degvora-readme.md",
        icon: "📝",
        category: "System Logs",
        rawText: `# Degvora Portfolio OS

Welcome to the interactive next-gen macOS-style workspace. This engine is custom engineered to showcase full-stack projects, real-time telemetry metrics, and software design architectures.

## Core Capabilities

* **Adaptive Layouts** — Fully fluid responsive breakpoints mimicking a native operating system viewport.
* **Component Sandboxing** — Embedded application micro-frontends executing in secure runtimes.
* **Pragmatic Design** — Balancing hyper-clean dark-mode aesthetics with modular typography scaling.

---

## Technical Architecture

* **Engine:** Next.js 15 App Router
* **Compiler:** TypeScript + React 19 State Layers
* **Style Manifest:** Tailwind CSS Architecture

---

## Contact Matrix
* **Lead Engineer:** Hamza Jaffar
* **Corporate Entity:** Degvora Software House
* **Secure Signal:** contact@degvora.com`
    },
    {
        id: "stack",
        name: "engineering-stack.md",
        icon: "⚡",
        category: "Manifests",
        rawText: `# Engineering & Service Matrix

Strategic overview of enterprise solutions, cross-platform systems, and high-performance applications engineered by Degvora.

## Service Capability Layers

### 💼 Enterprise Solutions
* **CRM Development** — Custom Customer Relationship Management platforms tailored for optimized business workflows and client pipelines.
* **Custom Software Development** — Robust backend structures, native utilities, and modular software architectures.

### 🛍️ E-Commerce Platforms
* **Shopify Core Architecture** — Tailor-made Shopify App Development, advanced custom fields, and secure logic integrations.
* **Theme Engineering** — Fluid, high-conversion custom liquid themes matching pixel-perfect user design metrics.

---

## Technical Framework Stack

### 🖥️ Client Layer (Frontend & Web Engine)
* **Next.js / React** — Next-gen Server Components, optimized layout routing, and responsive state synchronization.

### 📱 Mobility Layer (Cross-Platform & Native)
* **Flutter & React Native** — Unified codebases compiling into high-performance native iOS and Android mobile solutions.
* **Java System Core** — Resilient native mobile architecture and custom local software layers.

### ⚙️ Pipeline Layer (Backend Systems & APIs)
* **Node.js Environment** — Modular, asynchronous runtime servers powered by NestJS and Express frameworks.
* **PHP Ecosystem** — Rapid enterprise development utilizing the robust Laravel framework model.
* **Python Engine** — High-velocity data layers and secure API endpoints engineered in FastAPI and Django.
* **Java Enterprise** — High-security, distributed data microservices built on Spring Boot.

---

## Internal Innovation Pipelines

Beyond client infrastructure assets, we design, deploy, and scale high-quality internal tools, software products, and engaging digital mechanics designed for direct-to-market distribution.`
    }
];