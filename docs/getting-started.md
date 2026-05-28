# Neargrab Getting Started Guide

Welcome to the Neargrab Frontend engineering team! This onboarding manual gets your local development environment fully configured and guides you through standard coding commands and deployment tasks.

---

## 📋 System Prerequisites

Ensure you have the following environment modules configured on your workstation:

*   **Node.js**: `v18.x` or higher (recommended: `v20.x` LTS or higher).
*   **NPM**: `v9.x` or higher (ships automatically with modern Node versions).

To verify your system setup, run these terminal commands:
```bash
node --version
npm --version
```

---

## 🚀 Setting Up Your Local Environment

Follow this step-by-step checklist to clone, configure, and boot the frontend interface locally:

### 1. Install Project Dependencies
Run npm install in the root folder to download the React 19, Vite 8, and Tailwind v4 nodes:
```bash
npm install
```

### 2. Launch the Hot-Reloading Development Server
Start the local bundler by running:
```bash
npm run dev
```
Upon successful boot, the terminal outputs the local loopback URL (usually `http://localhost:5173/`).

---

## 🛠️ Essential NPM Commands Reference

Our project scripts are defined inside `package.json` to handle compilation, quality assurance, and environment previews:

| Command | Action | Key Architectural Focus |
|---|---|---|
| `npm run dev` | Spins up the Vite development server. | Employs Hot Module Replacement (HMR) for near-instant rendering changes. |
| `npm run build` | Compiles a production-ready bundle. | Transpiles JSX into optimized raw JS, aggregates stylesheets, and outputs to the `/dist` folder. |
| `npm run preview` | Spins up a local web server displaying the `/dist` folder. | Used to perform final visual QA on the optimized production build before deployment. |
| `npm run lint` | Runs automated ESLint checks. | Verifies modern JS standard styles, React 19 safety features, and JSX hooks rules. |

---

## 🧑‍💻 Code Quality & Style Standard (Linting)

Neargrab enforces modern visual design patterns and standard code quality criteria using **ESLint v10.x**. 

Before raising a merge request, execute the linter to verify that there are no style bottlenecks or hooks violations:
```bash
npm run lint
```

---

## 🔍 Common Troubleshooting Procedures

### 1. Resetting Node Modules
If you experience dependency synchronization issues or import errors:
```bash
# Delete node modules and the locks
rm -rf node_modules package-lock.json

# Perform a clean re-installation
npm install
```

### 2. Clearing Vite Compilation Cache
If visual modifications to styles or images do not seem to register or Hot Module Replacement lags:
1.  Stop the dev server with `Ctrl + C`.
2.  Clear the `.vite` cache inside `node_modules`:
    ```bash
    rm -rf node_modules/.vite
    ```
3.  Restart the dev server:
    ```bash
    npm run dev
    ```

### 3. Tailwind v4 Build Reset
If brand colors or HSL variables declared in `index.css` do not render:
- Ensure that the classes are spelled exactly as they are defined inside the `@theme` directive of `src/index.css`.
- Ensure you have not introduced syntax issues inside the `@theme {}` brackets.
- Re-run `npm run build` to force compile all global stylesheets.
