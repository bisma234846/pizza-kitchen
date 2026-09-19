# Comprehensive Codebase & Architecture Audit
## "The Pizza Kitchen" — Restaurant Ordering & Management Application

**Audit Date:** September 19, 2026  
**Project Name:** `user-panel` / The Pizza Kitchen  
**Location:** Faisalabad, Pakistan (Susan Road Branch HQ)  
**Framework:** Next.js 16.3.5 (App Router, Turbopack) & React 19.2.8  

---

## 1. Current Folder Structure

```
pizza-kitchen/
├── .next/                         # Next.js build and cache output
├── node_modules/                  # Installed dependencies
├── public/                        # Static assets (SVGs, icons)
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src/
│   ├── app/                       # App Router routes and page layouts
│   │   ├── (customer)/            # Customer-facing storefront route group
│   │   │   ├── about/
│   │   │   │   └── page.tsx       # About page (/about)
│   │   │   ├── contact/
│   │   │   │   └── page.tsx       # Contact & location page (/contact)
│   │   │   ├── menu/
│   │   │   │   └── page.tsx       # Full interactive menu page (/menu)
│   │   │   ├── reviews/
│   │   │   │   └── page.tsx       # Customer reviews page (/reviews)
│   │   │   ├── specials/
│   │   │   │   └── page.tsx       # Deals and feast bundles (/specials)
│   │   │   ├── layout.tsx         # Customer storefront layout (Navbar + Footer)
│   │   │   └── page.tsx           # Customer homepage (/)
│   │   ├── admin/                 # Internal management & POS portal
│   │   │   ├── abandoned-carts/
│   │   │   │   └── page.tsx       # Abandoned cart recovery (/admin/abandoned-carts)
│   │   │   ├── birthdays/
│   │   │   │   └── page.tsx       # Birthday club automation (/admin/birthdays)
│   │   │   ├── categories/
│   │   │   │   └── page.tsx       # Category ordering & CRUD (/admin/categories)
│   │   │   ├── dashboard/
│   │   │   │   └── page.tsx       # Alias route for overview dashboard (/admin/dashboard)
│   │   │   ├── deals/
│   │   │   │   └── page.tsx       # Promotions & deals manager (/admin/deals)
│   │   │   ├── follow-up-wa/
│   │   │   │   └── page.tsx       # WhatsApp follow-up manager (/admin/follow-up-wa)
│   │   │   ├── kitchen/
│   │   │   │   └── page.tsx       # Kitchen Display System KDS (/admin/kitchen)
│   │   │   ├── login/
│   │   │   │   └── page.tsx       # Management portal login (/admin/login)
│   │   │   ├── loyalty/
│   │   │   │   └── page.tsx       # Customer loyalty program (/admin/loyalty)
│   │   │   ├── menu/
│   │   │   │   └── page.tsx       # Menu catalog & stock manager (/admin/menu)
│   │   │   ├── orders/
│   │   │   │   ├── active/
│   │   │   │   │   └── page.tsx   # Live stream & rider dispatch (/admin/orders/active)
│   │   │   │   ├── cancel-requests/
│   │   │   │   │   └── page.tsx   # Order cancellations & refunds (/admin/orders/cancel-requests)
│   │   │   │   └── page.tsx       # Master orders ledger (/admin/orders)
│   │   │   ├── pos/
│   │   │   │   └── page.tsx       # Point of Sale terminal (/admin/pos)
│   │   │   ├── reviews/
│   │   │   │   └── page.tsx       # Google/web review moderation (/admin/reviews)
│   │   │   ├── riders/
│   │   │   │   └── page.tsx       # Delivery fleet management (/admin/riders)
│   │   │   ├── layout.tsx         # Admin layout with AuthGuard & OrderProvider
│   │   │   └── page.tsx           # Admin Overview Dashboard (/admin)
│   │   ├── favicon.ico
│   │   ├── globals.css            # Global CSS tokens & Tailwind imports
│   │   └── layout.tsx             # Root layout with MenuProvider & metadata
│   ├── components/
│   │   ├── admin/                 # Admin panel shell & management modals
│   │   │   ├── AdminAuthGuard.tsx # Route protection & session hydration guard
│   │   │   ├── AdminHeader.tsx    # Admin top bar with live activity notifications
│   │   │   ├── AdminShell.tsx     # Responsive wrapper with sidebar + header
│   │   │   ├── AdminSidebar.tsx   # Collapsible & mobile navigation drawer
│   │   │   ├── CategoryModal.tsx  # Add / Edit category modal
│   │   │   └── ProductModal.tsx   # Add / Edit menu product modal (with variants)
│   │   ├── layout/                # Storefront navigation & footer
│   │   │   ├── Footer.tsx         # Footer with contact details & opening hours
│   │   │   └── Navbar.tsx         # Sticky header with mobile drawer & quick links
│   │   ├── sections/              # Customer landing & page sections
│   │   │   ├── AboutSection.tsx   # Story, ambiance & quality highlights
│   │   │   ├── ContactSection.tsx # Store details, map embed & WhatsApp form
│   │   │   ├── CTASection.tsx     # Urgent ordering call-to-action
│   │   │   ├── HeroSection.tsx    # Main hero banner with rating & CTA buttons
│   │   │   ├── MenuSection.tsx    # Interactive category tabs, search & cards
│   │   │   ├── SpecialsSection.tsx# Special deals & discount bundles
│   │   │   └── TestimonialsSection.tsx # Verified customer ratings & reviews
│   │   └── ui/                    # Reusable visual components
│   │       ├── AnimatedSection.tsx# Performance-aware Framer Motion wrapper
│   │       ├── MenuCard.tsx       # Individual menu item card with stock badge
│   │       ├── ScrollToTop.tsx    # Floating scroll-to-top button
│   │       └── SectionHeading.tsx # Standardized section title & badge header
│   ├── context/                   # Global React Context providers
│   │   ├── AdminOrderContext.tsx  # Orders, KDS, Riders, Dispatch & Live metrics
│   │   ├── AuthContext.tsx        # Admin & Staff authentication session
│   │   └── MenuContext.tsx        # Menu catalog, categories, stock & CRUD operations
│   ├── hooks/
│   │   └── useDevicePerformance.ts# Hardware & network tier detection for animations
│   ├── lib/                       # Static seed data & helper functions
│   │   ├── adminData.ts           # Navigation structure, demo users & branch status
│   │   ├── data.ts                # Restaurant info, contact, default menu & deals
│   │   └── mockOrders.ts          # Sample riders & realistic multi-scenario orders
│   └── types/                     # TypeScript data interfaces & types
│       ├── admin.ts               # Admin user, navigation & branch types
│       ├── index.ts               # Menu, special deal, testimonial & device types
│       └── orders.ts              # Order, order item, rider, address & customer types
├── AGENTS.md                      # Next.js agent rule specifications
├── package.json                   # Project scripts and dependencies
├── postcss.config.mjs             # PostCSS configuration with Tailwind plugin
├── tailwind.config.ts             # Tailwind content paths configuration
└── tsconfig.json                  # TypeScript compiler configuration
```

---

## 2. Frontend Architecture

- **Next.js App Router (v16.3.5):** Uses nested layouts and route groups `(customer)` and `admin` to isolate navigation chrome and state providers.
- **React 19 (v19.2.8):** All pages and interactive components utilize `"use client"` directives for dynamic client-side state handling.
- **Styling with Tailwind CSS v4:** Integrated via `@tailwindcss/postcss` and `@import "tailwindcss"` in `globals.css`. Color variables defined in `:root` (`--color-primary`, `--color-cream`, `--color-dark`).
- **Animation System:** Powered by `framer-motion` (v13.3.0) with an adaptive device performance tiering system (`useDevicePerformance.ts`) that disables heavy parallax/animations on low-spec hardware or when `prefers-reduced-motion` is active.
- **Icons:** Standardized on `lucide-react` (v1.46.0) across both customer storefront and admin hub, with custom SVG path definitions for brand icons (Facebook, Instagram, TikTok).
- **Static Page Generation:** All 24 routes successfully build as static pages (`○ (Static)`) with zero compilation errors.

---

## 3. All Existing Routes

| Route | Type | Description |
|---|---|---|
| `/` | Customer | Homepage (Hero, Deals preview, Call-to-action) |
| `/about` | Customer | About Us (Brand story, kitchen quality, branch photo, stats) |
| `/menu` | Customer | Full Interactive Menu (Category tabs, real-time search, WhatsApp order links) |
| `/specials` | Customer | Deals & Feast Bundles (Eid/Ramzan specials, combo savings) |
| `/reviews` | Customer | Customer Reviews (Google rating breakdown, verified testimonials) |
| `/contact` | Customer | Contact & Location (Address, phone numbers, map embed, WhatsApp query form) |
| `/admin` | Admin | Operations Dashboard (Gross sales, active orders, live pipeline, quick shortcuts) |
| `/admin/dashboard` | Admin | Alias route rendering Overview Dashboard |
| `/admin/login` | Admin | Management Login (Admin & Staff demo credentials with role toggle) |
| `/admin/pos` | Admin | Point of Sale Terminal (Live ticket builder, category selector, settlement) |
| `/admin/orders` | Admin | All Orders Ledger (Search, filter by status/type, CSV data export) |
| `/admin/orders/active` | Admin | Live Active Stream (Order progression, rider dispatching, cancellation) |
| `/admin/orders/cancel-requests` | Admin | Cancellation & Refund Logs (Reason inspection, re-activation) |
| `/admin/kitchen` | Admin | Kitchen Display System KDS (Station tickets, oven timers, status advancement) |
| `/admin/riders` | Admin | Delivery Fleet Hub (Rider statuses, active assignments, call buttons) |
| `/admin/menu` | Admin | Product Catalog Manager (Add/Edit products, variants, 1-click stock toggle) |
| `/admin/categories` | Admin | Category Manager (Move up/down tab sequence, add/edit categories) |
| `/admin/abandoned-carts` | Admin | Abandoned Carts Recovery (WhatsApp recovery trigger, drop-off history) |
| `/admin/reviews` | Admin | Review Management (Reply modal, star breakdown, Feature on Web toggle) |
| `/admin/follow-up-wa` | Admin | WhatsApp Follow-up Automation (Post-meal surveys, win-back campaigns) |
| `/admin/birthdays` | Admin | Birthday Club (Automated birthday greetings & gift perks) |
| `/admin/loyalty` | Admin | Loyalty & Rewards Program (Tier perks, cashback rules, member counts) |
| `/admin/deals` | Admin | Deals & Promotions Manager (Bundle pricing, active toggles) |

---

## 4. Customer-Facing Pages

1. **Homepage (`/`):**
   - Hero banner with rating badges (4.1★ / 938+ reviews), 30-min delivery guarantees, direct WhatsApp order trigger, and UAN phone link (`041-111-192021`).
   - Special offer feature card with 20% Eid feast promo.
   - Quick CTA section for instant ordering.

2. **Menu Page (`/menu`):**
   - Category navigation tabs (Pizza, Appetizers, Pastas, Platters, Sandwiches, Beverages, Desserts).
   - Real-time client-side search across names and item descriptions.
   - Menu cards displaying price notes (e.g. Medium vs Large pricing), spicy badges, popularity flags, and out-of-stock indicators.
   - Direct 1-click WhatsApp order button pre-filling the item name.

3. **About Us Page (`/about`):**
   - Susan Road restaurant story, halal confirmation, 30-minute delivery SLA.
   - Susan Road branch photo visual card.
   - 4 key feature highlights (Fresh Ingredients, Oven Baked, Fast Delivery, Family Ambiance).

4. **Specials & Deals Page (`/specials`):**
   - Special Deals grid featuring Eid Feast (20% OFF), Ramzan Specials (Rs 790+), Deal 2 (1 Regular + 1 Medium for Rs 1250), and Iftaar Family Deal (Rs 1350).
   - Price savings indicators (`oldPrice` vs `price`).
   - Direct WhatsApp order trigger for each deal.

5. **Customer Reviews Page (`/reviews`):**
   - Google rating header block (4.1/5.0 with 938+ reviews).
   - Grid of verified customer testimonials with ratings and initials.

6. **Contact Us Page (`/contact`):**
   - Susan Road physical address, delivery UAN (`041 111 19 20 21`), and mobile numbers.
   - Embedded interactive Google Map for Susan Road, Faisalabad.
   - Quick Inquiry form generating formatted WhatsApp messages.

---

## 5. Admin Pages

- **Overview Dashboard (`/admin`):**
  - Live revenue metric calculated from active order state.
  - Live counts for Kitchen, Out-for-Delivery, and Available Fleet.
  - 4-stage live fulfillment pipeline (Pending → In Kitchen → Out with Riders → Completed).
  - Recent orders table with 1-click view links.
  - Marketing shortcuts and customer satisfaction summary.
- **Login Portal (`/admin/login`):**
  - Dark glassmorphic login card with tabbed role selection (Admin vs Staff).
  - 1-click demo credential autofill.
  - Input validation with error alerts and animated redirects.
- **All Orders (`/admin/orders`):**
  - Full tabular ledger of all historical and active orders.
  - Search by Order ID, Customer Name, or Phone number.
  - Filtering by status (Pending, Preparing, Ready, Out-for-Delivery, Completed, Cancelled) and order channel (Dine-in, Takeaway, Delivery).
  - 1-click CSV export utility generating downloadable spreadsheets.
- **Active Orders Stream (`/admin/orders/active`):**
  - Live orders stream with status progression buttons.
  - Dropdown to assign available delivery fleet riders.
  - Reasoned order cancellation prompt.
- **Cancel Requests (`/admin/orders/cancel-requests`):**
  - Log of cancelled orders, refund status, and customer-stated reasons.
  - Ability to re-open cancelled orders back to pending status.
- **Kitchen KDS (`/admin/kitchen`):**
  - Touch-friendly station cards showing order items, sizes, and custom kitchen notes.
  - 1-click status transitions (`Start Cooking (In Oven)` → `Mark Oven Ready`).
- **Fleet & Riders (`/admin/riders`):**
  - Detailed cards for each of the 6 delivery riders with vehicle details, primary zones, completed orders count, and rating.
  - 1-click phone call integration and online/offline toggle.
- **Menu & Catalog (`/admin/menu`):**
  - Dual view modes: Data Table and Visual Card Grid.
  - Instant 1-click In-Stock / Out-of-Stock toggle that propagates to customer menu.
  - Product modal for adding/editing items with image presets and multi-size variants.
- **Category Manager (`/admin/categories`):**
  - Visual tab sequence manager with `Move Up` and `Move Down` controls.
  - Add / edit category with icon selector and description.
- **Marketing Suite:**
  - Abandoned carts recovery (`/admin/abandoned-carts`)
  - Reviews moderation & reply system (`/admin/reviews`)
  - WhatsApp post-meal follow-up automation (`/admin/follow-up-wa`)
  - Birthday club perk assignments (`/admin/birthdays`)
  - Loyalty tier & cashback manager (`/admin/loyalty`)
  - Promotional deals manager (`/admin/deals`)

---

## 6. POS-Related Pages & Features

- **Route:** `/admin/pos`
- **Menu Selection:**
  - Dynamic category horizontal switcher mapped to `MenuContext`.
  - Responsive food item grid with out-of-stock disablement and badges.
- **Interactive Ticket Builder:**
  - Order type switcher: **Delivery** (reveals delivery address input), **Takeaway**, and **Dine-In** (reveals table number input).
  - Quick customer fields: Customer Name, Phone, and Order Notes.
  - Live cart item list with incremental quantity adjusters (`+` / `-`) and item removal.
- **Calculations & Settlement:**
  - Automatic subtotal calculation.
  - Delivery fee logic: automatically adds Rs 150 for Delivery orders; Rs 0 for Takeaway/Dine-In.
  - Settlement options:
    - **Cash Order:** Marks payment status as `pending`.
    - **Kitchen Push (Card/Online):** Marks payment status as `paid`.
  - Automatically pushes generated order into `AdminOrderContext` and `localStorage`, broadcasting it across Dashboard, Active Orders, and Kitchen KDS.

---

## 7. Authentication Implementation

- **Location:** `src/context/AuthContext.tsx` & `src/components/admin/AdminAuthGuard.tsx`
- **Mechanism:** Client-side React context with persistent session hydration from `localStorage` (`tpk_admin_auth_user`).
- **Credentials & Roles:**
  - **Admin Role:** Password `admin123` or `admin` → logs in as Super Admin ("Muhammad Hamza").
  - **Staff Role:** Password `staff123` or `staff` → logs in as Kitchen Head ("Bilal Ahmed").
- **Guard Logic (`AdminAuthGuard.tsx`):**
  - Detects current path; if attempting to view any `/admin/*` route other than `/admin/login` without an active session, redirects to `/admin/login`.
  - If authenticated user accesses `/admin/login`, automatically forwards to `/admin/dashboard`.
  - Wraps all protected admin content in `AdminShell` (Sidebar + Header).

---

## 8. API & Backend Integration

- **Current Status:** 100% Client-Side Simulation.
- **API Routes:** No Next.js API routes (`src/app/api/`) currently exist in the codebase.
- **Database:** No database ORM or connection (no Prisma, Mongoose, PostgreSQL, Supabase, or Firebase).
- **Data Persistence:** Browser `localStorage` acts as the persistent storage layer:
  - `tpk_admin_orders_v1`: Order collection and live status changes.
  - `tpk_admin_riders_v1`: Delivery fleet statuses and active trip references.
  - `tpk_menu_categories_v2`: Menu categories, products, prices, and stock statuses.
  - `tpk_admin_auth_user`: Active admin session tokens.
- **External Communications:** Triggered via deep links (`https://wa.me/...` for WhatsApp and `tel:...` for UAN telephony).

---

## 9. State Management

The application employs **React Context + Custom Hooks**:

1. **`MenuContext` (`src/context/MenuContext.tsx`):**
   - State: `categories` (nested tree) and `allProducts` (memoized flat list with category metadata).
   - Actions: `addProduct`, `updateProduct`, `deleteProduct`, `toggleProductStock`, `addCategory`, `updateCategory`, `deleteCategory`, `moveCategory`, `reorderCategories`, `resetToDefaultMenu`.
   - Persistence: Automatically loads from and writes to `localStorage`.

2. **`AdminOrderContext` (`src/context/AdminOrderContext.tsx`):**
   - State: `orders` (array of 15+ comprehensive orders) and `riders` (array of 6 delivery drivers).
   - Computed Selectors: `activeOrders`, `kitchenOrders`, `cancelRequests`, `activeOrdersCount`, `cancelRequestsCount`, `availableRidersCount`, `todayTotalRevenue`, `todayCompletedCount`.
   - Actions: `createOrder`, `updateOrderStatus`, `assignRider`, `unassignRider`, `cancelOrder`, `updateOrder`, `deleteOrder`, `updateRiderStatus`, `resetToMockData`.
   - Persistence: Dual-key sync with `localStorage`.

3. **`AuthContext` (`src/context/AuthContext.tsx`):**
   - State: `user` (`AdminUser | null`), `isAuthenticated`, `isLoading`.
   - Actions: `login`, `logout`.

4. **`useDevicePerformance` (`src/hooks/useDevicePerformance.ts`):**
   - Detects screen size, CPU concurrency, device memory, network speed, and `prefers-reduced-motion` to categorize device into `low`, `medium`, or `high` performance tiers.

---

## 10. Cart / Order Flow

```
[CUSTOMER STOREFRONT]
Menu Browsing (/menu, /specials)
        │
        ▼
Select Item / Deal
        │
        ▼
Click "Order via WhatsApp"
        │
        ▼
Deep links to WhatsApp (+923222192021) with pre-filled item string
(Order finalized via human WhatsApp order desk)

-----------------------------------------------------------------------

[ADMIN / POS WORKFLOW]
Counter / Phone Order (/admin/pos)
        │
        ▼
Select Category -> Add Items -> Set Quantities
        │
        ▼
Select Order Type (Delivery / Takeaway / Dine-In)
        │
        ▼
Choose Settlement (Cash / Card Push)
        │
        ▼
Order Placed -> Persisted in AdminOrderContext & localStorage
        │
        ├──► Appears in Kitchen KDS (/admin/kitchen)
        │       └─► Start Cooking (In Oven) ──► Mark Oven Ready
        │
        ├──► Appears in Active Orders (/admin/orders/active)
        │       └─► Assign Fleet Rider (Dispatches Rider, Rider -> "on-trip")
        │       └─► Mark Delivered & Paid (Completes Order, Rider -> "available")
        │
        └──► Recorded in All Orders Ledger (/admin/orders) & CSV Export
```

---

## 11. Existing Reusable Components

### Customer Layout & UI:
- [`Navbar.tsx`](file:///c:/Users/hp/Desktop/pizza-kitchen/src/components/layout/Navbar.tsx): Sticky responsive header with brand logo, top notice bar, desktop links, WhatsApp CTA, and animated mobile drawer.
- [`Footer.tsx`](file:///c:/Users/hp/Desktop/pizza-kitchen/src/components/layout/Footer.tsx): Multi-column footer with Susan Road address, UAN telephone links, operating hours, and social media links.
- [`AnimatedSection.tsx`](file:///c:/Users/hp/Desktop/pizza-kitchen/src/components/ui/AnimatedSection.tsx): Wrapper utilizing `getMotionProps` for adaptive animations.
- [`MenuCard.tsx`](file:///c:/Users/hp/Desktop/pizza-kitchen/src/components/ui/MenuCard.tsx): Food item card with stock badge, spicy indicator, price notes, and direct WhatsApp order button.
- [`SectionHeading.tsx`](file:///c:/Users/hp/Desktop/pizza-kitchen/src/components/ui/SectionHeading.tsx): Standardized section headers with pill badge, title, subtitle, and dual-color divider.
- [`ScrollToTop.tsx`](file:///c:/Users/hp/Desktop/pizza-kitchen/src/components/ui/ScrollToTop.tsx): Floating button that appears past 400px scroll depth.

### Admin Components:
- [`AdminShell.tsx`](file:///c:/Users/hp/Desktop/pizza-kitchen/src/components/admin/AdminShell.tsx): Unified management shell supporting responsive collapse and fluid content area.
- [`AdminSidebar.tsx`](file:///c:/Users/hp/Desktop/pizza-kitchen/src/components/admin/AdminSidebar.tsx): Multi-section collapsible navigation with live badge counts, active route indicators, user profile pill, and sign-out modal.
- [`AdminHeader.tsx`](file:///c:/Users/hp/Desktop/pizza-kitchen/src/components/admin/AdminHeader.tsx): Header with page title resolver, search bar, live kitchen activity notification popover, quick POS trigger, and branch status indicator.
- [`AdminAuthGuard.tsx`](file:///c:/Users/hp/Desktop/pizza-kitchen/src/components/admin/AdminAuthGuard.tsx): Authentication guard with session verification spinner and login redirects.
- [`ProductModal.tsx`](file:///c:/Users/hp/Desktop/pizza-kitchen/src/components/admin/ProductModal.tsx): Modal for creating/updating menu items with image presets and multi-size variants.
- [`CategoryModal.tsx`](file:///c:/Users/hp/Desktop/pizza-kitchen/src/components/admin/CategoryModal.tsx): Modal for creating/updating category names, descriptions, and icons.

---

## 12. Existing Design System, Colors & Fonts

### Color Palette:
- **Primary Brand Red:** `#DC2626` (Tailwind `red-600`), Dark Red: `#B91C1C` (`red-700`)
- **Secondary Green:** `#166534` (`green-800`), Accent Green: `#16a34a` (`green-600` for WhatsApp & delivery)
- **Accent Amber/Gold:** `#F59E0B` (`amber-500`), `#D97706` (`amber-600`)
- **Customer Store Background:** `#FFF8F0` (Warm Cream)
- **Admin Dark Backgrounds:** `#0F0F11` (Sidebar/Header), `#141416` (Body), `#1C1917` (Cards)
- **Text:** `#1C1917` (Store text), `#FFFFFF` / `#E7E5E4` (Admin headings & text)

### Typography & Aesthetics:
- Sans-serif font family (Geist / System UI fallback) with high contrast tracking.
- Rounded corners: `rounded-2xl` and `rounded-3xl` for modern app feel.
- Glassmorphic overlays with `backdrop-blur-md` and semi-transparent dark borders (`border-stone-800`).

---

## 13. Responsive & Mobile Implementation

- **Breakpoints:** Tailwind standard breakpoints (`sm: 640px`, `md: 768px`, `lg: 1024px`, `xl: 1280px`, `2xl: 1536px`).
- **Customer Navigation:** Desktop menu hides on mobile; clean hamburger opens animated slide-down full drawer with direct Call and WhatsApp actions.
- **Admin Navigation:** Sidebar collapses to 80px on tablet/laptop screens and converts to a touch slide-out drawer on mobile screens with dark backdrop overlay.
- **Horizontal Scroll Containers:** Category tabs in Menu Section and POS Terminal feature overflow containers with hidden scrollbars for mobile swipes.
- **Hardware Adaptation:** `useDevicePerformance` detects mobile viewports and reduced memory to throttle heavy transitions.

---

## 14. Duplicate Components & Redundancies

1. **`app/admin/dashboard/page.tsx`:** Simply re-exports/renders `AdminDashboardPage` from `app/admin/page.tsx`.
2. **Icon resolver duplication:** Icon mapping switch cases exist in `MenuSection.tsx`, `AdminSidebar.tsx`, `Categories/page.tsx`, and `CategoryModal.tsx`.
3. **Card templates in marketing sub-pages:** `abandoned-carts`, `birthdays`, `follow-up-wa`, and `loyalty` share near-identical card structures that could eventually share a common card component if expanded.

---

## 15. Broken or Risky Code

1. **Navigation Link Mismatch (Follow-up WA):**
   - In `src/lib/adminData.ts` (line 137), the navigation item has `href: "/admin/followup"`.
   - The actual file route in Next.js is `src/app/admin/follow-up-wa/page.tsx` (`/admin/follow-up-wa`).
   - Clicking this sidebar link directly navigates to a 404 page unless corrected.
2. **Sidebar Icon Fallback for Categories & Utensils:**
   - `AdminSidebar.tsx` imports `ChefHat` and `LayoutDashboard` as fallbacks for `"Utensils"` and `"Layers"` rather than importing the exact `Utensils` or `Layers` icons from `lucide-react`.
3. **Client-Only Mock Data Persistence:**
   - Clearing browser cache or switching devices resets menu updates and active orders back to initial mock seeds.
4. **Unsecured Client-Side Auth:**
   - Password strings (`"admin123"`, `"staff123"`) are evaluated directly in browser JavaScript; this is purely a frontend prototype guard without backend JWT/session cookies.
5. **Inline Phone Strings vs Centralized Constant:**
   - While `lib/data.ts` exports `CONTACT.whatsapp = "+923222192021"`, several components (`MenuCard.tsx`, `ContactSection.tsx`) hardcode `923222192021` in template literals.

---

## 16. Features That Already Work

- [x] Full customer storefront with Hero, Menu, About, Specials, Reviews, and Contact pages.
- [x] Live client-side search across all menu dishes and descriptions.
- [x] WhatsApp message generator with customer details pre-filled.
- [x] Admin authentication flow with role separation (Admin vs Staff) and session storage.
- [x] Collapsible, responsive admin shell with breadcrumb title resolver and mobile drawer.
- [x] Point of Sale (POS) terminal with dynamic category filtering, cart management, delivery fee calculation, and order placement.
- [x] Live order lifecycle pipeline: Pending → In Kitchen → Out for Delivery → Completed / Cancelled.
- [x] Kitchen Display System (KDS) with station tickets and 1-click cooking state advancement.
- [x] Delivery Fleet Management with 6 pre-configured riders, zone assignments, call links, and live trip status updates.
- [x] Full Menu Catalog Manager with Add/Edit/Delete products, image presets, multi-size variant support, and 1-click In-Stock toggling.
- [x] Category Manager with 1-click tab sequence reordering (Move Up / Move Down).
- [x] All Orders ledger with multi-field search, status filtering, channel filtering, and CSV export.
- [x] Customer Reviews management with reply publisher, star rating breakdown, and "Feature on Web" toggle.
- [x] Adaptive device performance detection with reduced motion support.

---

## 17. Features That Are Incomplete

- [ ] **Customer-Facing Digital Checkout:** The customer website does not have an in-browser shopping cart or checkout page; orders are routed to WhatsApp or telephone.
- [ ] **Backend Database & API Layer:** No persistent database (PostgreSQL, MongoDB, Supabase, MySQL) or Next.js backend API routes.
- [ ] **Multi-User Real-Time Sync:** No WebSockets, Supabase Realtime, or Server-Sent Events; changes made on one device's POS do not sync to another device's KDS.
- [ ] **Real Authentication & RBAC:** No server-side session cookies, JWT authentication, or bcrypt password hashing.
- [ ] **Direct WhatsApp / SMS API Integration:** Abandoned cart recovery, birthday greetings, and follow-up reviews use simulated browser `alert()` or manual WhatsApp links rather than an automated WhatsApp Business API / Twilio gateway.
- [ ] **Thermal Receipt Printing:** POS print buttons are UI triggers without ESC/POS web-serial thermal printer integration.

---

## 18. Features That Should NOT Be Rebuilt

1. **Design System & Visual Styling:** The Tailwind color palette, typography hierarchy, customer cream theme, and dark glassmorphic admin styling are cohesive, modern, and high quality.
2. **TypeScript Data Models:** `src/types/index.ts`, `src/types/orders.ts`, and `src/types/admin.ts` provide clean, well-structured interfaces for menus, orders, riders, customers, and administrative users.
3. **Core Context Architecture:** `MenuContext.tsx` and `AdminOrderContext.tsx` contain comprehensive business logic for state mutations, selectors, and calculations that should be preserved.
4. **POS & KDS User Interface:** The Point of Sale ticket layout and Kitchen Display System station card workflows are intuitive and battle-tested.
5. **Customer Presentation Components:** All storefront sections (Hero, Menu, Specials, Testimonials, About, Contact, CTA) are well-crafted with micro-animations.
