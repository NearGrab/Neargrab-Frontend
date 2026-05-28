# Neargrab Design System

The Neargrab design system ensures visual consistency, accessibility, and high aesthetic quality across all user interfaces. It is crafted with a **Clean, Organic, and Trustworthy** style focused on local commerce, fresh services, and neighborhood platforms.

---

## 🎨 Color Tokens & Palette

Neargrab's layout leverages **CSS Custom Properties** defined in `:root` and compiled dynamically by **Tailwind CSS v4's new CSS-first `@theme` compiler**. This bridges vanilla CSS flexibility with Tailwind utility classes.

### Color Tokens Map

| Role | CSS Custom Property | Tailwind Utility Class | Hex Code | Purpose & Visual Meaning |
|---|---|---|---|---|
| **Primary Brand (Deep Forest)** | `--color-brand-900` | `bg-brand-900` / `text-brand-900` | `#0B3B2C` | Base header colors, hero backdrops, primary text contrast. |
| **Brand Hover** | `--color-brand-800` | `bg-brand-800` | `#0E4F3B` | Solid button background hover states. |
| **Brand Medium** | `--color-brand-700` | `text-brand-700` | `#12634B` | Secondary branding highlights, category title headings. |
| **Brand Accent Green** | `--color-brand-600` | `text-brand-600` | `#15795C` | Inline links and highlighted interactive subtexts. |
| **Brand Emerald (Light Accent)** | `--color-brand-500` | `bg-brand-500` / `text-brand-500` | `#10B981` | Positive action badges, checkmarks, availability indicators. |
| **Brand Soft Backdrop** | `--color-brand-100` | `bg-brand-100` | `#E6F4EA` | High-light containers, soft card borders, avatar frames. |
| **Brand Tinted Green** | `--color-brand-50` | `bg-brand-50` | `#F0FDF4` | Subtle section backgrounds, active filter highlights. |
| **Accent Orange** | `--color-accent-500` | `bg-accent-500` / `text-accent-500` | `#F59E0B` | Primary attention badges, shopkeeper CTAs, review stars. |
| **Accent Amber (Hover)** | `--color-accent-400` | `bg-accent-400` | `#FBBF24` | Shopkeeper button hover backgrounds. |
| **Accent Amber (Soft)** | `--color-accent-100` | `bg-accent-100` | `#FEF3C7` | Shopkeeper card borders and alert backdrops. |
| **Neutral Canvas (Light)** | `--color-neutral-50` | `bg-neutral-50` | `#F9FAFB` | Global background body layer. |
| **Neutral Block** | `--color-neutral-100` | `bg-neutral-100` | `#F3F4F6` | Card background grids, standard input outlines. |
| **Neutral Border** | `--color-neutral-200` | `border-neutral-200` | `#E5E7EB` | Subtle divider lines and inactive borders. |
| **Text Primary (Slate)** | `--color-text-primary` | `text-text-primary` | `#111827` | Headings, heavy text blocks, bold labels. |
| **Text Secondary (Slate)** | `--color-text-secondary` | `text-text-secondary` | `#4B5563` | Paragraphs, informative descriptions, helper prompts. |
| **Text Muted (Gray)** | `--color-text-muted` | `text-text-muted` | `#9CA3AF` | Inactive footers, placeholders, metadata dates. |

---

## ✍️ Typography & Google Fonts

The typography hierarchy is designed for dual readability: geometric and structured headings paired with clean, legibly tracked body texts.

### Typography Hierarchy

*   **Headings**: **Poppins** (Geometric, friendly, modern, trustworthy)
*   **Body Copy**: **Inter** (Highly legible at small sizes, sleek and modern)

### Font Loading configuration
Loaded directly in `src/index.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&display=swap');
```

### Typographic Classes Usage

*   **Hero H1 / Heading H2**: `font-poppins font-bold tracking-tight text-brand-900`
*   **Section Headers**: `font-poppins font-semibold text-text-primary`
*   **Body Paragraphs**: `font-inter text-text-secondary leading-relaxed`
*   **Button labels**: `font-inter font-medium text-sm tracking-wide`

---

## ⚡ UI Effects, Shadows & Animations

To generate a premium, state-of-the-art visual atmosphere, we utilize smooth micro-animations and soft shadows to elevate interactive surfaces.

### 🔳 Borders & Radii
*   **Action Buttons**: Pill shape (`rounded-full`) is the primary design language for standard calls-to-action (CTA).
*   **Feature Cards & Panels**: Moderate rounding (`rounded-2xl` or `rounded-3xl`) with smooth borders (`border border-neutral-100` or `border-brand-100/50`).

### 🌫️ Shadows System
*   **Soft Brand Shadow**: `shadow-lg shadow-black/5` - Gives cards an organic lift, preventing rigid harsh borders.
*   **Deep CTA / Active Elevates**: `shadow-xl shadow-brand-900/10` - Standard active elevation when cards or buttons are hovered.

### ✨ Transitions & Hover Micro-Animations
*   All interactive elements must feature a fluid, noticeable state change:
    *   **Class**: `transition-all duration-300 ease-out`
    *   **Hover Lift Effect**: Combining background shifts with a vertical offset `hover:-translate-y-1 hover:shadow-lg` to create a delightful, premium response.
    *   **Cursor**: Ensure `cursor-pointer` is applied to all cards, interactive badges, FAQs, and buttons.

---

## 🧩 Iconography Rules

To maintain high visual quality:
1.  **Strictly NO Emojis**: Never use generic unicode emojis (like 🚀, 🏪, 🎨) for UI decorations or card markers.
2.  **Centralized Icon Library**: We use `lucide-react` vectors.
3.  **Consistency**:
    *   Set standard widths/heights (e.g. `w-5 h-5` or `w-6 h-6` for headings, `w-10 h-10` for feature badge backgrounds).
    *   Stroke weights must remain uniform, preferably `strokeWidth={2}` or `strokeWidth={1.75}`.

---

## 🔍 Pre-Delivery QA Checklist

Before proposing or shipping UI modifications, verify that your work complies with this core standard:

- [x] **No Emoji Icons**: All icons leverage SVG nodes from `lucide-react`.
- [x] **Cursor Behavior**: Every clickable card, filter option, or trigger has the `cursor-pointer` class.
- [x] **State Transitions**: Color, layout size, or translate animations feature `duration-300` or `duration-200` ease classes (no sudden, abrupt shifts).
- [x] **Color Consistency**: Color classes use Tailwind variable names mapped in `@theme` (e.g., `text-brand-900`, `bg-brand-50`) rather than hardcoded hex codes.
- [x] **Contrast Compliance**: Body elements map to `--color-text-secondary` (`#4B5563` slate-600) or higher, assuring a contrast ratio above 4.5:1 against light canvas backdrops.
- [x] **Responsive Layouts**: Layout columns wrap smoothly on mobile sizes (under 768px) and stretch beautifully across larger viewing grids (max-w-7xl).
