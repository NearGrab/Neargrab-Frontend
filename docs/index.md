# Neargrab Frontend Documentation Hub

Welcome to the **Neargrab** frontend developer documentation center. This repository contains the complete user interface code, state management, layouts, pages, styles, and asset assets that form the high-fidelity web presence of Neargrab.

Neargrab is a local commerce platform built with a dual-audience focus, serving both **neighborhood customers** looking to discover local products and **local shopkeepers** wanting to build their digital presence and grow their business.

> [!NOTE]
> This frontend is designed with a premium, organic aesthetic using a decoupled, data-driven architecture. All main text, options, lists, FAQs, and founder profiles are driven directly by a centralized configuration file, eliminating manual HTML/JSX text edits and making expansion incredibly fast.

---

## 📚 Documentation Directory

Explore the developer documentation to understand how Neargrab is engineered and how to contribute:

| Document | Description | Key Focus Areas |
|---|---|---|
| 📁 [Folder Structure Guide](folderstructure.md) | Map of the repository's feature slice layout. | Feature directories, routing files, and main entry points. |
| 🎨 [Design System Guide](design-system.md) | Style guides, brand values, and token values. | CSS Custom Properties, Tailwind `@theme` overrides, Typography, and QA checklist. |
| 🏗️ [Architecture Guide](architecture.md) | Technical stack overview and logical data flow. | React 19, Vite 8, Tailwind v4, and React Router v7. |
| ⚙️ [Getting Started](getting-started.md) | Local development setup and script commands. | Initial installation, running dev servers, production building, and ESLint. |
| 📊 [Data Management Manual](data-management.md) | Guide to data-driven components and schemas. | Centralized content structure, updating text, image assets, and FAQs. |

---

## 🛠️ Technology Stack

Neargrab's frontend uses a state-of-the-art, modern tech stack designed for speed, fluid animations, and absolute modularity:

*   **Vite 8.x**: Ultra-fast next-generation frontend bundler using native ES modules.
*   **React 19.x**: Leveraging modern hooks, optimized component rendering, and strict lifecycle safety.
*   **React Router DOM v7**: Feature-rich, client-side routing allowing seamless navigation between landing pages, FAQs, policies, and the about-us sections.
*   **Tailwind CSS v4.0 (CSS-first engine)**: Compiled directly via the `@tailwindcss/vite` plugin.
*   **Lucide React**: Clean, lightweight, vector-based iconography with uniform styles.

---

## 🌟 Core Philosophies

1.  **Aesthetic Excellence First**: We aim to deliver a premium, luxury-tier feel with fluid transitions, subtle hover elevations, and custom HSL organic color schemes that feel responsive and alive.
2.  **Strict Modularity**: Presentational components are isolated inside feature directories, keeping components extremely lean and reusable.
3.  **Data-Driven Layouts**: All semantic textual content is externalized into `content.json`. If a team member needs to fix a typo or add a section, they edit a single JSON file without altering React components.
