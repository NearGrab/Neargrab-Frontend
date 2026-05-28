# Neargrab Frontend Folder Structure

Neargrab's frontend uses a scalable, modern **Feature Slice Architecture** that groups code by its logical business domains rather than simple technical roles (like putting all components in a global `components` folder). This ensures that as the codebase grows, features remain decoupled, self-contained, and easy to maintain.

---

## 🌳 Workspace Directory Tree

Here is a visual map of the repository's layout:

```text
Neargrab-Frontend/
├── .agent/                  # Custom agent skills and tool configurations
├── dist/                    # Compiled production build output (Git ignored)
├── docs/                    # Architectural, Design, and Developer guides
│   ├── index.md             # Documentation Hub Entry Point
│   ├── folderstructure.md   # [This File] Directory map and slices layout
│   ├── design-system.md     # Color palettes, typography and UI tokens
│   ├── architecture.md      # Tech stack details and data flows
│   ├── getting-started.md   # Installing dependencies and build scripts
│   └── data-management.md   # Guide to centralized JSON data models
├── node_modules/            # Node package dependencies (Git ignored)
├── public/                  # Static assets served as-is (e.g. favicon, robots.txt)
├── src/                     # Core application codebase
│   ├── assets/              # UI Media files (images, icons) grouped by slice
│   │   ├── Landing/
│   │   │   ├── Hero.png
│   │   │   ├── Shopkeeper.png
│   │   │   ├── shop.png
│   │   │   └── icons/       # Custom SVGs / images for landing widgets
│   │   └── Explore/
│   │       └── explore_hero.png # Generated custom home banner
│   ├── features/            # Feature slices containing isolated domains
│   │   ├── landing/         # Neargrab Main Landing and Support slice
│   │   │   ├── components/  # Isolated modular UI components
│   │   │   │   ├── FAQ/     # Accordion widgets and help center blocks
│   │   │   │   ├── Landing/ # Hero, Stats, ForShopkeepers, Features, How it Works
│   │   │   │   ├── about-us/# Co-founder profiles, values and about items
│   │   │   │   └── CTABanner.jsx # Decoupled promotional CTA block card
│   │   │   │   └── Footer.jsx
│   │   │   ├── data/        # Centralized text configuration source of truth
│   │   │   │   └── content.json
│   │   │   └── pages/       # Route page containers serving as main layouts
│   │   │       ├── AboutPage.jsx
│   │   │       ├── FAQsPage.jsx
│   │   │       ├── LandingPage.jsx
│   │   │       ├── PrivacyPolicyPage.jsx
│   │   │       └── TermsPage.jsx
│   │   ├── explore/         # Neargrab Customer Explore Dashboard slice
│   │   │   ├── components/  # Widgets (Header, Slider, ValueProps, Stores, Picks, Sidebar)
│   │   │   ├── data/        # Mock local database model (temp.json)
│   │   │   ├── services/    # Decoupled mock API queries (exploreService.js)
│   │   │   └── pages/       # Main screen composing grid (ExplorePage.jsx)
│   │   ├── notifications/   # Neargrab Customer Notifications slice
│   │   │   ├── components/  # Item cards, filter tabs, toggle preferences
│   │   │   ├── data/        # tempNotifications.json (Mock alerts storage)
│   │   │   ├── services/    # Async handlers in notificationService.js
│   │   │   └── pages/       # Compose list screen (NotificationsPage.jsx)
│   │   ├── profile/         # Neargrab Customer Profile slice
│   │   │   └── pages/       # Layout grid overview (ProfilePage.jsx)
│   │   └── shared/          # Shared elements across multiple features
│   │       └── pages/       # Global fallback pages
│   │           └── NotFoundPage.jsx
│   ├── shared/              # Reusable core elements (components, custom hooks, utils)
│   │   ├── components/      # Reusable UI widgets across all pages
│   │   │   ├── layout/      # Navbar.jsx with mobile sticky navigation bar
│   │   │   └── Rating.jsx   # Generic star rating component
│   │   └── utils/           # Class name class merging helper (cn.js)
│   ├── App.jsx              # Main React App root component
│   ├── index.css            # Stylesheet with Tailwind imports and CSS custom variables
│   ├── main.jsx             # Main application entry point (binds React to DOM)
│   └── router.jsx           # Declares all page routes and mapping logic
├── .gitignore               # Excludes build output, node modules, and system files
├── eslint.config.js         # JavaScript standards and lint rules
├── index.html               # Main index.html containing the React root mount div
├── package-lock.json        # Strict dependency version locker
├── package.json             # Build script configurations and package versions
└── vite.config.js           # Vite server, plugin, and routing configurations
```

---

## 🧩 Architectural Slices Explained

### 1. The `src/features` Directory

This directory is the heartbeat of the application. Rather than organizing code into standard technical folders (like `components/`, `pages/`, `data/` at the root), we divide by business domains:

*   **`src/features/landing/`**: Encompasses everything related to public customer-facing screens. It includes the landing homepage, the corporate "About Us" profiles, the support FAQ accordion, and public legal resources (Privacy & Terms).
*   **`src/features/notifications/`**: Manages customer notifications. Contains custom items cards, count indicators, chronological alerts sorting, and live preference configuration widgets.
*   **`src/features/profile/`**: Houses the registered user account summaries, transaction history links, settings entries, and localized indicators.
*   **`src/features/shared/`**: Houses components, utilities, state handlers, or layouts that are consumed by *more than one* feature slice. A prime example is the global `NotFoundPage.jsx`, which acts as a fallback for any undefined route.

Within a feature slice, we follow a uniform folder structure:
*   `components/`: Smaller presentational widgets or layout divisions.
*   `data/`: Configuration parameters or content models (e.g. `content.json`).
*   `pages/`: The top-level route components that compile visual widgets into full screens.

---

## 🔑 Key Entrypoint Files

*   **[index.html](file:///home/ariont/Code/StartUps/Frontend/index.html)**: The shell HTML document. Contains the root `div` (`<div id="root"></div>`) that React injects itself into, as well as font configurations and viewport scaling metadata.
*   **[src/main.jsx](file:///home/ariont/Code/StartUps/Frontend/src/main.jsx)**: Binds the React application to the DOM root element in `index.html`. Wraps the app in `<StrictMode>` for warning detection and `<BrowserRouter>` to enable client-side URL parsing.
*   **[src/index.css](file:///home/ariont/Code/StartUps/Frontend/src/index.css)**: Implements Tailwind CSS imports and sets up **CSS Custom Properties** inside `:root`. Maps these properties to Tailwind classes inside the Tailwind v4 `@theme` compiler layer, allowing custom brand colors and font weights.
*   **[src/App.jsx](file:///home/ariont/Code/StartUps/Frontend/src/App.jsx)**: The direct child of `main.jsx`'s DOM render. Immediately serves the core router engine (`AppRouter`).
*   **[src/router.jsx](file:///home/ariont/Code/StartUps/Frontend/src/router.jsx)**: Outlines routing matching. Uses standard path variables mapped directly to feature slice page containers:
    ```javascript
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/faqs" element={<FAQsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/notifications" element={<NotificationsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
    ```

---

## 🎨 Asset Management Guidelines

To keep project assets tidy:
1.  All images and icons supporting a specific feature slice should be stored in a matching folder inside `src/assets/` (e.g. `src/assets/Landing/`).
2.  Do not place large image binary files directly inside the component folders.
3.  Any media path reference is loaded using standard absolute paths from Vite root (e.g., `src/assets/...` or `/src/assets/...`).
