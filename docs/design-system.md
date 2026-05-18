# Neargrab Design System

## Pattern
- **Name:** Neargrab-Landing-Page
- **Conversion Focus:** Clear CTAs for dual audiences (Customers & Shopkeepers).
- **Color Strategy:** Nature-inspired palette, high contrast, clean white/off-white backgrounds with deep forest green accents.
- **Sections:** Hero, Features, Shopkeeper CTA, Stats, How it works, Footer.

## Style
- **Name:** Clean, Organic, Trustworthy
- **Keywords:** Green, organic, local, fresh, trustworthy, minimal, clean.
- **Best For:** Local commerce, food delivery, community platforms.

## Colors
| Role | Hex | Tailwind |
|------|-----|----------|
| Primary Dark (Brand) | `#0B3B2C` | `bg-brand-900` |
| Primary Green | `#10B981` | `bg-emerald-500` |
| Accent Orange | `#F59E0B` | `bg-amber-500` |
| Light Background | `#F9FAFB` | `bg-gray-50` |
| Text Primary | `#111827` | `text-gray-900` |
| Text Secondary | `#4B5563` | `text-gray-600` |

## Typography
- **Heading:** Poppins (Trustworthy, geometric, modern)
- **Body:** Inter (Highly readable, clean)
- **Google Fonts:**
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@500;600;700&display=swap');
```

## Key Guidelines
- Buttons have pill shape (`rounded-full`).
- Cards have soft, diffuse shadows (`shadow-lg shadow-black/5`).
- Icons should be consistent, using `lucide-react`.
- Smooth transitions for hover states (`transition-all duration-300`).
- Ample padding between sections (`py-20` to `py-24`).

## Pre-Delivery Checklist
- [x] No emojis as icons (use SVG: Lucide)
- [x] `cursor-pointer` on all clickable elements
- [x] Hover states with smooth transitions
- [x] Accessible text contrast
- [x] Responsive layout (mobile-first)
