# The Pizza Kitchen — Design System Specification
## Multi-Experience Visual Language & Component Tokens

**Version:** 1.0.0  
**Target Environments:** Customer Web Storefront, Admin SaaS Hub, POS & Kitchen Operations  
**Framework Integration:** Tailwind CSS v4, Vanilla CSS Custom Properties, React 19  

---

## 1. Brand Colors

The Pizza Kitchen brand palette evokes fresh artisanal baking, oven-baked warmth, and Italian culinary passion with local Pakistani fast-food vibrancy.

```
┌─────────────────┬──────────────────┬──────────────────┬─────────────────┐
│ Primary Brand   │ Primary Dark     │ Secondary Green  │ Golden Amber    │
│ #DC2626         │ #B91C1C          │ #166534          │ #F59E0B         │
│ (Tomato Flame)  │ (Oven Crimson)   │ (Fresh Basil)    │ (Melted Cheese) │
└─────────────────┴──────────────────┴──────────────────┴─────────────────┘
```

| Token | HEX | Tailwind Class | Experience Usage | Role / Meaning |
|---|---|---|---|---|
| `--color-primary` | `#DC2626` | `red-600` | All | Primary Brand Red, primary CTAs, active highlights |
| `--color-primary-hover` | `#B91C1C` | `red-700` | All | Hover and active states for primary buttons |
| `--color-primary-light` | `#FEE2E2` | `red-100` | Customer / Admin | Soft red alert backgrounds, light badge tints |
| `--color-primary-dark` | `#991B1B` | `red-800` | Admin / POS | Dark mode button borders, critical status accents |
| `--color-secondary` | `#166534` | `green-800` | Customer / POS | Halal assurance, fresh herb accents, paid tags |
| `--color-whatsapp` | `#16A34A` | `green-600` | Customer / POS | WhatsApp CTA buttons, delivery completed states |
| `--color-accent` | `#F59E0B` | `amber-500` | All | Popular food items, star ratings, alert badges |
| `--color-accent-dark` | `#D97706` | `amber-600` | Customer / Admin | Gold hover states, Ramzan & Eid deal highlights |

---

## 2. Background Colors

Each of the three application experiences features a specialized background environment tailored to its viewing context and workflow velocity:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                          BACKGROUND HIERARCHY                           │
├──────────────────────────┬───────────────────────┬──────────────────────┤
│ 1. CUSTOMER STOREFRONT   │ 2. ADMIN SAAS HUB     │ 3. POS & OPERATIONS  │
│    #FFF8F0 (Warm Cream)  │    #0F0F11 (Sleek Dark│    #0A0A0C (High-    │
│    #FFFFFF (Card White)  │    #141416 (Dashboard)│            Contrast) │
│    #1C1917 (Footer Dark) │    #1C1917 (Elevated) │    #121215 (Terminal)│
└──────────────────────────┴───────────────────────┴──────────────────────┘
```

| Environment | Token | HEX | Tailwind Class | Semantic Usage |
|---|---|---|---|---|
| **Customer** | `--bg-customer-body` | `#FFF8F0` | `bg-[#FFF8F0]` | Primary customer page background (warm cream) |
| **Customer** | `--bg-customer-card` | `#FFFFFF` | `bg-white` | Menu cards, testimonial boxes, feature containers |
| **Customer** | `--bg-customer-dark` | `#1C1917` | `bg-stone-900` | Storefront footer, top promo notice bar |
| **Admin** | `--bg-admin-base` | `#0F0F11` | `bg-[#0F0F11]` | Sidebar, top header, modal backdrop base |
| **Admin** | `--bg-admin-surface` | `#141416` | `bg-[#141416]` | Main dashboard canvas, scroll container |
| **Admin** | `--bg-admin-card` | `#1C1917` | `bg-stone-900` | Data cards, tables, pipeline stages, modal dialogs |
| **Admin** | `--bg-admin-input` | `#0A0A0C` | `bg-stone-950` | Form inputs, dropdown select boxes, search fields |
| **POS / KDS** | `--bg-pos-canvas` | `#0A0A0C` | `bg-[#0A0A0C]` | High-contrast ambient background to minimize glare |
| **POS / KDS** | `--bg-pos-panel` | `#121215` | `bg-[#121215]` | Touch grid canvas, cart ticket sidebar |
| **POS / KDS** | `--bg-pos-card` | `#18181D` | `bg-[#18181D]` | Food item tap tiles, KDS station ticket cards |

---

## 3. Text Colors

Typography colors provide strict WCAG AAA contrast for daylight storefront browsing and late-night restaurant kitchen terminals:

| Token | HEX | Tailwind Class | Target Experience | Semantic Hierarchy |
|---|---|---|---|---|
| `--text-customer-heading` | `#1C1917` | `text-stone-900` | Customer | Main storefront headlines, dish names |
| `--text-customer-body` | `#44403C` | `text-stone-700` | Customer | Ingredient descriptions, story paragraphs |
| `--text-customer-muted` | `#78716C` | `text-stone-500` | Customer | Price notes, opening hours, copyright text |
| `--text-admin-heading` | `#FFFFFF` | `text-white` | Admin / POS | Metric counters, page titles, order numbers |
| `--text-admin-body` | `#E7E5E4` | `text-stone-200` | Admin / POS | Table cells, customer names, dish quantities |
| `--text-admin-muted` | `#A8A29E` | `text-stone-400` | Admin / POS | Timestamps, table column headers, helper labels |
| `--text-admin-dim` | `#57534E` | `text-stone-600` | Admin / POS | Disabled placeholders, inactive borders |
| `--text-brand-red` | `#DC2626` | `text-red-600` | All | Highlighted price figures, sale badges, alert text |
| `--text-accent-gold` | `#F59E0B` | `text-amber-500` | All | Star ratings, deal savings, table indicators |
| `--text-accent-green` | `#22C55E` | `text-green-500` | All | In-stock badges, delivered status, WhatsApp tags |

---

## 4. Accent & Status Colors

Unified functional status indicators across Order Management, KDS, Fleet Dispatch, and Stock Controls:

| Status Role | Light Tone (Badge BG) | Solid Tone (Border/Text) | Tailwind Mapping | Real-world Meaning |
|---|---|---|---|---|
| **Pending / New** | `rgba(245, 158, 11, 0.15)` | `#F59E0B` | `bg-amber-500/20 text-amber-300 border-amber-500/30` | Order arrived, awaiting kitchen start |
| **Preparing / Oven** | `rgba(220, 38, 38, 0.18)` | `#EF4444` | `bg-red-600/20 text-red-400 border-red-500/30` | Baking in pizza oven, kitchen active |
| **Ready / Hot Pass** | `rgba(34, 197, 94, 0.18)` | `#22C55E` | `bg-green-500/20 text-green-300 border-green-500/30` | Baked, packed & waiting for pickup/rider |
| **Out for Delivery** | `rgba(59, 130, 246, 0.18)` | `#3B82F6` | `bg-blue-500/20 text-blue-300 border-blue-500/30` | Rider dispatched on Susan Rd delivery route |
| **Completed / Paid** | `rgba(87, 83, 78, 0.40)` | `#A8A29E` | `bg-stone-800 text-stone-300 border-stone-700` | Handed over to diner or delivered & settled |
| **Cancelled / Refund**| `rgba(239, 68, 68, 0.20)` | `#F87171` | `bg-red-500/20 text-red-400 border-red-500/30` | Duplicate order or out-of-radius cancellation |

---

## 5. Typography

- **Primary Font Family:** `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`
- **Display Heading Font:** `Outfit, Inter, sans-serif` (or Geist Sans)
- **Monospace / Numerical Font:** `ui-monospace, "SF Mono", "Fira Code", monospace` (Used for Order IDs, Price totals, KDS timers, Phone numbers)

```css
/* Typography Scale Tokens */
--font-sans: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: ui-monospace, "SF Mono", "Courier New", monospace;
```

---

## 6. Heading Sizes & Scales

### Customer Storefront Scale (Appetizing, Bold, Inspiring)
- **Hero Display (`h1`):** `text-4xl sm:text-5xl md:text-6xl xl:text-7xl` | `font-black` | `leading-[1.08]` | `tracking-tight`
- **Section Title (`h2`):** `text-3xl sm:text-4xl md:text-5xl` | `font-extrabold` | `tracking-tight`
- **Category Header (`h3`):** `text-xl sm:text-2xl` | `font-extrabold`
- **Menu Card Title (`h4`):** `text-base sm:text-lg` | `font-bold`

### Admin & POS Scale (Compact, Scannable, High-Density)
- **Page Header (`h1` / `h2`):** `text-xl sm:text-2xl` | `font-black` | `tracking-tight`
- **Section Subheader (`h3`):** `text-sm sm:text-base` | `font-extrabold`
- **Card / Tile Title (`h4`):** `text-xs sm:text-sm` | `font-bold`
- **Micro Header (`h5` / `label`):** `text-[10px] sm:text-xs` | `font-extrabold` | `uppercase` | `tracking-wider`

---

## 7. Body Text Scales

| Token | Font Size | Line Height | Weight | Tailwind Class | Semantic Usage |
|---|---|---|---|---|---|
| `--text-xs` | `12px` (`0.75rem`) | `16px` | `400` / `600` | `text-xs` | Helper text, secondary metadata, price notes |
| `--text-sm` | `14px` (`0.875rem`)| `20px` | `400` / `500` | `text-sm` | Default table content, card descriptions |
| `--text-base` | `16px` (`1.0rem`) | `24px` | `400` / `500` | `text-base` | Storefront body copy, story paragraphs |
| `--text-lg` | `18px` (`1.125rem`)| `28px` | `600` / `700` | `text-lg` | Featured review callouts, subtitle emphasis |
| `--text-mono` | `12px` - `14px` | `18px` | `700` | `font-mono` | `#PK-1045` order numbers, prep timers |

---

## 8. Border Radius Tokens

Consistent organic curves for welcoming food presentation and touch interfaces:

```
┌──────────────┬──────────────┬──────────────┬──────────────┬──────────────┐
│ sm           │ md           │ lg / xl      │ 2xl / 3xl    │ full         │
│ 6px / 8px    │ 12px         │ 16px / 20px  │ 24px / 32px  │ 9999px       │
│ Micro-badges │ Small inputs │ Form cards   │ Main panels  │ Pills & CTAs │
└──────────────┴──────────────┴──────────────┴──────────────┴──────────────┘
```

| Radius Token | Value | Tailwind Class | Recommended Elements |
|---|---|---|---|
| `--radius-sm` | `6px` | `rounded-md` | Quantity adjusters, mini icons, table status pills |
| `--radius-md` | `10px` / `12px` | `rounded-xl` | Form inputs, dropdown selectors, action buttons |
| `--radius-lg` | `16px` | `rounded-2xl` | Menu dish cards, stat cards, subcategory sections |
| `--radius-xl` | `24px` | `rounded-3xl` | Big modal dialogs, POS ticket wrapper, KDS cards |
| `--radius-full`| `9999px` | `rounded-full` | Storefront CTAs, category tab pills, floating buttons |

---

## 9. Shadows & Elevation Tokens

| Elevation | Shadow Definition | Tailwind Class | Semantic Application |
|---|---|---|---|
| **Level 0 (Flat)** | `none` | `shadow-none` | Default table rows, input fields |
| **Level 1 (Subtle)**| `0 1px 3px 0 rgba(0,0,0,0.08)` | `shadow-xs` / `shadow-sm` | Storefront food cards, category tabs |
| **Level 2 (Raised)**| `0 4px 12px -2px rgba(0,0,0,0.12)` | `shadow-md` | Navigation bar on scroll, card hover states |
| **Level 3 (Floating)**| `0 12px 28px -4px rgba(0,0,0,0.25)` | `shadow-xl` | Admin modal dialogs, POS checkout panel |
| **Brand Red Glow**| `0 10px 25px -3px rgba(220,38,38,0.30)`| `shadow-red-600/30`| Primary Order buttons, Special deal badges |
| **WhatsApp Glow** | `0 10px 25px -3px rgba(22,163,74,0.30)` | `shadow-green-900/20`| Direct WhatsApp CTA buttons |

---

## 10. Button Specifications

Buttons are categorized into four distinct functional tiers across the experiences:

### 1. Primary Brand CTA (Storefront & Admin Main Action)
- **Classes:** `px-6 py-3.5 rounded-full (Customer) / rounded-xl (Admin) bg-red-600 hover:bg-red-700 active:scale-95 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-red-600/30 transition-all cursor-pointer`
- **Purpose:** "Explore Full Menu", "Order Online", "Add Product", "Create Order".

### 2. WhatsApp Direct Order Button
- **Classes:** `px-5 py-3 rounded-full bg-green-600 hover:bg-green-700 active:scale-95 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-green-900/20 transition-all inline-flex items-center gap-2`
- **Purpose:** Instant WhatsApp pre-filled ordering.

### 3. POS Rapid Action Buttons (Touch Screen)
- **Classes:** `py-3.5 px-4 rounded-2xl font-black text-xs uppercase tracking-wider active:scale-98 transition-all flex items-center justify-center gap-2 min-h-[48px]`
- **Variants:**
  - Cash Settlement: `bg-green-600 hover:bg-green-700 text-white shadow-md`
  - Kitchen Push: `bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/30`

### 4. Secondary / Ghost Action Button
- **Classes:** `px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 text-xs font-semibold transition-colors`
- **Purpose:** "Reset Mock Data", "Cancel", "View Orders".

---

## 11. Input & Form Control Specifications

Form elements maintain high touch targets and distinct focused rings:

```
┌────────────────────────────────────────────────────────────────────────┐
│  CUSTOMER INPUTS: bg-stone-800, border-stone-700, text-white          │
│  ADMIN / POS INPUTS: bg-stone-950, border-stone-800, focus:border-red │
└────────────────────────────────────────────────────────────────────────┘
```

- **Standard Text Input & Select:**
  - Height / Padding: `py-2.5 px-4 rounded-xl text-xs sm:text-sm`
  - Border: `border border-stone-800 focus:border-red-500 focus:ring-2 focus:ring-red-500/20`
  - Text: `text-white placeholder-stone-500`
- **Search Bar (with leading icon):**
  - Padding: `pl-10 pr-4 py-2.5 rounded-xl bg-stone-900 text-xs text-stone-200`
  - Icon: Absolute left positioned `Search` icon in `text-stone-500`

---

## 12. Card Specifications

### Experience 1: Customer Menu Card
- **Container:** `rounded-2xl bg-white border border-stone-100 p-5 shadow-xs hover:border-red-200 hover:shadow-md transition-all`
- **Badges:** Absolute top right `Popular` (Amber), `Spicy` (Red), or `Out of Stock` (Stone-800).
- **Pricing:** Big bold PKR figure in `text-red-600` with subtle variant size note below.

### Experience 2: Admin Metric / Stat Card
- **Container:** `rounded-2xl bg-stone-900/90 border border-stone-800/90 p-5 text-white hover:border-red-500/40 hover:shadow-xl transition-all flex flex-col justify-between`
- **Accent Emblem:** 40x40px gradient icon container (`bg-gradient-to-br from-red-600 to-amber-600`).
- **Data Counter:** `text-2xl sm:text-3xl font-black text-white tracking-tight`.

### Experience 3: POS Food Selection Tile & KDS Card
- **POS Tile:** `p-4 rounded-2xl bg-stone-900/80 border border-stone-800 hover:border-red-500/50 hover:bg-stone-850 active:scale-98 cursor-pointer`
- **KDS Station Ticket:** `rounded-3xl border p-6 bg-stone-900 border-red-500/40 shadow-2xl` with high-contrast item list, size pills, notes, and 1-tap state advancement button.

---

## 13. Badges & Tag Specifications

| Badge Type | Appearance Tokens | Example Usage |
|---|---|---|
| **Popular Item** | `bg-amber-500 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full` | "Popular", "Top Seller" |
| **Spicy Dish** | `bg-red-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full flex items-center gap-0.5` | "🔥 Spicy" |
| **Out of Stock** | `bg-stone-800 text-stone-300 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full` | "Out of Stock" |
| **Order Channel** | `bg-stone-950 text-stone-400 text-[10px] font-bold uppercase px-2 py-0.5 rounded border border-stone-800` | "POS", "WEBSITE", "WHATSAPP" |
| **Live Pulse Tag**| `bg-green-500/20 text-green-400 border border-green-500/30 text-xs font-bold px-3 py-1 rounded-full` | "● Live Branch Operations" |

---

## 14. Table Specifications

Used for high-density ledgers (`/admin/orders`, `/admin/menu`):

- **Table Wrapper:** `rounded-3xl bg-stone-900 border border-stone-800 overflow-hidden shadow-xl`
- **Table Header (`thead`):** `text-[11px] uppercase tracking-wider text-stone-400 border-b border-stone-800 bg-stone-950/40 py-3.5 px-4 font-bold`
- **Table Row (`tr`):** `hover:bg-stone-850/50 transition-colors divide-y divide-stone-800/60`
- **Table Cell (`td`):** `py-3 px-4 text-xs text-stone-300`
- **Numerical Cells (Price, Order Number):** `font-black text-white font-mono`

---

## 15. Modal Dialog Specifications

- **Overlay Backdrop:** `fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in`
- **Dialog Container:** `w-full max-w-lg (standard) / max-w-2xl (product) rounded-3xl bg-stone-900 border border-stone-800 text-stone-100 shadow-2xl p-6 sm:p-8 space-y-6 animate-in zoom-in-95 duration-200`
- **Modal Header:** Border bottom divider in `border-stone-800` with bold title and `X` close icon button.
- **Modal Footer:** Right-aligned actions (`Cancel` in `bg-stone-800` + `Confirm` in `bg-red-600`).

---

## 16. Toast & Banner Specifications

- **Success Alert:** `p-3 rounded-2xl bg-green-600 text-white font-bold text-xs flex items-center gap-2 shadow-lg animate-in fade-in zoom-in-95`
- **Warning / Error Alert:** `p-3.5 rounded-2xl bg-red-950/70 border border-red-800/60 text-red-300 text-xs font-medium flex items-start gap-2.5`
- **Live Dispatch Notice:** `px-3 py-1.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs font-bold`

---

## 17. Navigation Bar Specifications

### Customer Storefront Navigation:
- **Top Notice Bar:** `bg-stone-900 text-stone-300 text-xs py-2 px-4 border-b border-stone-800` (Susan Rd address, hours, UAN).
- **Sticky Navbar:** `sticky top-0 z-40 bg-stone-900/95 backdrop-blur-md shadow-lg shadow-black/10 py-3`
- **Active Nav Pill:** `bg-red-600 text-white px-3.5 py-2 rounded-full text-sm font-semibold`
- **Mobile Menu Drawer:** `fixed inset-x-0 top-[105px] z-30 bg-stone-900 border-b border-stone-800 shadow-2xl p-6 md:hidden flex flex-col gap-4`

### Admin Management Header:
- **Top Bar:** `sticky top-0 z-30 h-18 bg-[#0F0F11]/90 backdrop-blur-md border-b border-stone-800 px-4 sm:px-6 flex items-center justify-between`
- **Branch Status Pill:** `px-3 py-1.5 rounded-full bg-stone-900 border border-stone-800 text-xs text-stone-300`

---

## 18. Sidebar Specifications

- **Desktop Expanded Width:** `w-72` (`288px`)
- **Desktop Collapsed Width:** `w-20` (`80px`)
- **Mobile Drawer:** `fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#0F0F11] border-r border-stone-800 translate-x-0 shadow-2xl transition-transform duration-300`
- **Section Label:** `px-3 pb-1.5 text-[10px] font-extrabold uppercase tracking-wider text-stone-400`
- **Active Navigation Item:** `bg-red-600 text-white font-bold shadow-md shadow-red-600/30 rounded-xl px-3 py-2.5 text-xs flex items-center gap-3`
- **Inactive Navigation Item:** `text-stone-300 hover:text-white hover:bg-stone-850 rounded-xl px-3 py-2.5 text-xs flex items-center gap-3 transition-colors`
- **Dynamic Badge:** `ml-auto px-2 py-0.5 rounded-full text-[10px] font-bold border` with optional pulse indicator.

---

## 19. Mobile Breakpoints & Layout Matrix

| Breakpoint | Minimum Width | Customer Storefront Behavior | Admin & POS Behavior |
|---|---|---|---|
| **Mobile (`<640px`)** | `0px` | Single-column, Hamburger drawer, 1-column food grid | Sidebar becomes mobile slide-out, POS stacks vertically |
| **Tablet (`sm: 640px`)**| `640px` | 2-column food grid, 2-column footer | 2-column stats, 2-column active orders |
| **Laptop (`lg: 1024px`)**| `1024px` | 3-column food grid, sticky desktop navbar | Sidebar visible (collapsible), 2-column POS terminal |
| **Desktop (`xl: 1280px`)**| `1280px` | 4-column deals grid, side-by-side about visual | 4-column stats, 3-column KDS station screen |
| **Wide (`2xl: 1536px`)** | `1536px` | Max container width `max-w-7xl` centered | Full table expansions, user profile metadata |

---

## 20. Animation & Micro-Interaction Rules

Powered by `framer-motion` and regulated by [`useDevicePerformance.ts`](file:///c:/Users/hp/Desktop/pizza-kitchen/src/hooks/useDevicePerformance.ts):

### Performance-Aware Animation Tiers:
1. **Low Tier / `prefers-reduced-motion`:**
   - Duration: `0.2s` - `0.3s`
   - Properties: Simple opacity fade only (`initial: { opacity: 0 }`, `animate: { opacity: 1 }`).
   - Parallax, floating pizzas, and heavy spring physics are completely disabled.
2. **Medium Tier (Standard mobile & tablets):**
   - Duration: `0.35s`
   - Properties: Subtle vertical translate (`y: 12px` &rarr; `0px`) + opacity fade.
3. **High Tier (Modern desktop & high-performance devices):**
   - Duration: `0.5s` - `0.6s`
   - Easing Curve: `[0.22, 1, 0.36, 1]` (Smooth cubic-bezier).
   - Micro-interactions: Floating decorative pizza badge (`animate: { y: [0, -15, 0], rotate: [0, 5, 0] }`), card hover lifts (`y: -4px` with red shadow expansion).

### Micro-Interaction Standard:
- All interactive buttons include `active:scale-95` or `active:scale-98` for tactile feedback on touch screens.
- Modals scale gracefully with `animate-in zoom-in-95 duration-150`.
- Badges and status pills utilize smooth color transitions with `transition-colors duration-200`.
