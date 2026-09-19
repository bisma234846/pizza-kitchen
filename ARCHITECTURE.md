# Target Architecture & System Blueprint
## "The Pizza Kitchen" — Multi-Experience Architecture

**Document Version:** 1.0.0  
**Target Platform:** Next.js (App Router), React 19, TypeScript, Tailwind CSS  
**Target Deployment:** Susan Road Branch HQ, Faisalabad & Web Edge Deployment  

---

## 1. Executive Summary & Architectural Goals

The Pizza Kitchen requires three distinct, specialized experiences sharing a unified brand identity, design system, and core domain data models:

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           THE PIZZA KITCHEN                             │
├──────────────────┬────────────────────────────┬─────────────────────────┤
│ 1. CUSTOMER      │ 2. ADMIN                   │ 3. POS & RESTAURANT     │
│    STOREFRONT    │    MANAGEMENT HUB          │    OPERATIONS           │
│                  │                            │                         │
│ • Public Browsing│ • Executive Dashboard      │ • Fast Counter POS      │
│ • Menu & Search  │ • Menu & Category CRUD     │ • Kitchen KDS Screen    │
│ • Deals & Bundles│ • Order History & CSV      │ • Live Rider Dispatch   │
│ • WA / Direct CTA│ • Review Moderation        │ • Fleet Tracking        │
│ • Reviews & Story│ • Marketing & Loyalty      │ • Active Stream Alerts  │
└──────────────────┴────────────────────────────┴─────────────────────────┘
```

### Core Architecture Principles:
1. **Preserve Working Code:** Maintain existing components, design tokens, and state patterns rather than rewriting.
2. **Zero Route Disruption:** Keep existing route access backward-compatible while introducing clear operational groupings.
3. **Strict Boundary Isolation:** Public storefront code, admin management utilities, and rapid POS operational interfaces must be modularized to avoid bundle bloat and permission leakage.
4. **Resilient Data Flow:** Support local-first operational capabilities (localStorage + reactive Context) while preparing clear contracts for database and real-time backend sync.

---

## 2. Three Distinct Application Experiences

### Experience 1: Customer Website (Public Storefront)
- **Target Audience:** Diners, online customers, Faisalabad pizza lovers.
- **Visual Identity:** Warm Cream (`#FFF8F0`), Rich Brand Red (`#DC2626`), Golden Amber (`#F59E0B`), warm imagery, inviting typography.
- **Key Focus:** High visual appeal, micro-animations, fast page loads, effortless menu discovery, clear pricing notes, 1-click WhatsApp and phone ordering.

### Experience 2: Admin Dashboard (Management & Marketing)
- **Target Audience:** Restaurant Owners, General Managers, Marketing Leads.
- **Visual Identity:** Sleek Dark Glassmorphism (`#0F0F11`, `#141416`, `#1C1917`), high contrast data cards, compact tables.
- **Key Focus:** Business metrics, gross sales KPIs, catalog management (categories, products, sizes, prices), customer reviews moderation, promotional campaigns, abandoned cart recovery, loyalty tiers, and data exports.

### Experience 3: POS & Restaurant Operations (Operational Terminals)
- **Target Audience:** Counter Cashiers, Kitchen Supervisors, Order Dispatchers, Fleet Coordinators.
- **Visual Identity:** Ultra-high contrast dark operational UI with touch-friendly controls, color-coded status badges, large tap targets, and real-time audio/visual alert indicators.
- **Key Focus:** Speed (sub-5-second order entry), live Kitchen Display System (KDS), station-by-station progression, instant rider dispatch, and zero friction.

---

## 3. Target Route Structure

```
src/app/
├── (customer)/                      # Experience 1: Customer Storefront
│   ├── layout.tsx                   # Customer layout (Cream bg, Customer Navbar, Footer)
│   ├── page.tsx                     # Landing / Homepage (/)
│   ├── menu/page.tsx                # Full Menu & Search (/menu)
│   ├── specials/page.tsx            # Deals & Feast Bundles (/specials)
│   ├── about/page.tsx               # Story & Susan Rd Ambiance (/about)
│   ├── reviews/page.tsx             # Verified Testimonials (/reviews)
│   └── contact/page.tsx             # Location, Map & WhatsApp Query (/contact)
│
├── admin/                           # Experience 2: Admin Management Hub
│   ├── layout.tsx                   # Admin layout (Dark shell, AuthGuard, AdminOrderProvider)
│   ├── page.tsx                     # Overview Dashboard (/admin)
│   ├── dashboard/page.tsx           # Dashboard alias (/admin/dashboard)
│   ├── login/page.tsx               # Management Authentication (/admin/login)
│   ├── menu/page.tsx                # Menu Catalog & Stock Management (/admin/menu)
│   ├── categories/page.tsx          # Category Ordering & CRUD (/admin/categories)
│   ├── orders/page.tsx              # Master Historical Ledger & CSV (/admin/orders)
│   ├── reviews/page.tsx             # Review Moderation & Replies (/admin/reviews)
│   ├── deals/page.tsx               # Deals & Bundles Manager (/admin/deals)
│   ├── abandoned-carts/page.tsx     # Abandoned Carts Recovery (/admin/abandoned-carts)
│   ├── follow-up-wa/page.tsx        # WhatsApp Follow-up Automation (/admin/follow-up-wa)
│   ├── birthdays/page.tsx           # Birthday Club Automation (/admin/birthdays)
│   └── loyalty/page.tsx             # Loyalty Program & Tiers (/admin/loyalty)
│
└── (pos)/                           # Experience 3: Fast Operations & POS Terminals
    │                                # (Accessible directly or through Admin Nav)
    ├── admin/pos/page.tsx           # POS Counter Terminal (/admin/pos)
    ├── admin/kitchen/page.tsx       # Kitchen Display System KDS (/admin/kitchen)
    ├── admin/orders/active/page.tsx # Live Stream & Dispatch (/admin/orders/active)
    ├── admin/orders/cancel-requests/page.tsx # Cancel & Refund Approvals (/admin/orders/cancel-requests)
    └── admin/riders/page.tsx        # Delivery Fleet Hub (/admin/riders)
```

> **Compatibility Note:** The existing `/admin/*` URLs for POS, Kitchen, Active Orders, and Riders remain intact, ensuring 100% backward compatibility without changing any working URLs.

---

## 4. Target Folder Structure

```
src/
├── app/                             # Next.js App Router pages (as defined above)
├── components/
│   ├── common/                      # Universally shared components across all 3 experiences
│   │   ├── SectionHeading.tsx       # Reusable section headers
│   │   ├── AnimatedSection.tsx      # Adaptive device animation wrapper
│   │   ├── ScrollToTop.tsx          # Floating scroll utility
│   │   ├── StatusBadge.tsx          # Unified status badge (Pending, Preparing, Ready, etc.)
│   │   ├── PriceDisplay.tsx         # Standardized PKR currency formatter
│   │   └── Modal.tsx                # Reusable glassmorphic modal base
│   │
│   ├── customer/                    # Customer Storefront Components
│   │   ├── layout/
│   │   │   ├── CustomerNavbar.tsx   # Sticky header with mobile drawer
│   │   │   └── CustomerFooter.tsx   # Storefront footer & location info
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx      # Main hero with rating badges & CTAs
│   │   │   ├── MenuSection.tsx      # Interactive category tabs & search
│   │   │   ├── SpecialsSection.tsx  # Combo deals & savings cards
│   │   │   ├── TestimonialsSection.tsx # Google verified review cards
│   │   │   ├── AboutSection.tsx     # Susan Rd story & quality features
│   │   │   ├── ContactSection.tsx   # Map embed & quick inquiry form
│   │   │   └── CTASection.tsx       # 30-minute delivery urgency banner
│   │   └── cards/
│   │       ├── CustomerMenuCard.tsx # Menu dish card with stock status & WA button
│   │       └── DealCard.tsx         # Special deal bundle card
│   │
│   ├── admin/                       # Admin Management Components
│   │   ├── layout/
│   │   │   ├── AdminShell.tsx       # Responsive layout container (collapsed/expanded)
│   │   │   ├── AdminSidebar.tsx     # Navigation sidebar with dynamic live badges
│   │   │   └── AdminHeader.tsx      # Top bar with title, search & notifications
│   │   ├── modals/
│   │   │   ├── ProductModal.tsx     # Product Add/Edit with image presets & variants
│   │   │   ├── CategoryModal.tsx    # Category Add/Edit with icon selector
│   │   │   ├── ReviewReplyModal.tsx # Customer feedback response publisher
│   │   │   └── DealModal.tsx        # Promotional bundle creator
│   │   ├── tables/
│   │   │   ├── OrdersTable.tsx      # Master order ledger with multi-filters
│   │   │   └── ProductTable.tsx     # Menu products table with 1-click stock switches
│   │   └── cards/
│   │       ├── MetricStatCard.tsx   # KPI card with gradient icons
│   │       └── PipelineCard.tsx     # Live order fulfillment pipeline
│   │
│   └── pos/                         # POS & Operations Components
│       ├── terminal/
│       │   ├── POSTerminal.tsx      # POS counter main interface
│       │   ├── POSCartTicket.tsx    # Live order ticket builder with item counters
│       │   ├── OrderTypeTabs.tsx    # Delivery / Takeaway / Dine-in switcher
│       │   ├── SettlementButtons.tsx# Cash vs Card settlement triggers
│       │   └── TableSelector.tsx    # Dine-in table assigner
│       ├── kitchen/
│       │   ├── KitchenStationGrid.tsx # KDS ticket columns (Prep vs Baking vs Ready)
│       │   ├── KitchenTicketCard.tsx  # Touch ticket card with item notes & timers
│       │   └── OvenBumpButton.tsx     # 1-touch status advancement button
│       └── dispatch/
│           ├── RiderSelectDropdown.tsx# Available fleet driver assigner
│           ├── ActiveOrderCard.tsx    # Live dispatch order card
│           └── RiderStatusToggle.tsx  # Driver online/offline switcher
│
├── context/                         # State Management & Store Contexts
│   ├── AuthContext.tsx              # User authentication, role verification & session storage
│   ├── MenuContext.tsx              # Menu catalog, categories, products & stock state
│   ├── AdminOrderContext.tsx        # Orders, KDS, Rider fleet & dispatch management
│   └── POSContext.tsx               # Dedicated POS active ticket & cart calculations (optional split)
│
├── hooks/
│   ├── useDevicePerformance.ts      # Hardware & connection tier detector (low/med/high)
│   ├── useKitchenTimer.ts           # Elapsed order prep timer utility
│   └── useOrderFilter.ts            # Multi-parameter order filter & search hook
│
├── lib/
│   ├── data.ts                      # Customer restaurant data, contact info & seed menu
│   ├── adminData.ts                 # Admin navigation structure, demo profiles & branch info
│   ├── mockOrders.ts                # Sample realistic multi-channel orders & fleet drivers
│   └── formatters.ts                # Currency (PKR), time relative formatters & phone cleaners
│
└── types/
    ├── index.ts                     # Menu, testimonial, deal & device capability types
    ├── orders.ts                    # Order, OrderItem, Rider, Customer & DeliveryAddress types
    └── admin.ts                     # AdminUser, AuthRole, AdminRole & Navigation types
```

---

## 5. Authentication & Authorization Boundaries

```
                    ┌─────────────────────────┐
                    │     USER / REQUEST      │
                    └────────────┬────────────┘
                                 │
                 ┌───────────────┴───────────────┐
                 ▼                               ▼
       [PUBLIC ACCESS]                  [AUTHENTICATION REQUIRED]
       Customer Storefront              Admin Hub & Operations Terminals
       (/, /menu, /about,               (/admin/*, /admin/pos, /admin/kitchen)
        /specials, /reviews)                     │
                                                 ▼
                                        [AdminAuthGuard]
                                                 │
                        ┌────────────────────────┴────────────────────────┐
                        ▼                                                 ▼
                 [ROLE: ADMIN]                                     [ROLE: STAFF / CASHIER]
            • Full System Access                              • POS Terminal Order Entry
            • Gross Sales & Financials                        • Kitchen Display System (KDS)
            • Menu & Category CRUD                            • Active Order Progression
            • Price & Stock Toggles                           • Rider Dispatching
            • Marketing & Loyalty Config                      • Read-only Menu & Orders
            • Review Moderation & Deletion                    • Blocked: Deletions & Financials
```

### Boundary Specifications:
1. **Public Zone (`(customer)/*`):**
   - No authentication required.
   - Zero access to customer PII or backend admin state.
   - Client-side read-only access to published menu items and active deals.
2. **Protected Zone (`/admin/*`):**
   - Protected by [`AdminAuthGuard.tsx`](file:///c:/Users/hp/Desktop/pizza-kitchen/src/components/admin/AdminAuthGuard.tsx).
   - Unauthenticated users are redirected to `/admin/login`.
   - Hydrates active management session from persistent secure storage.
3. **Role Capabilities Matrix:**

| Feature Area | Super Admin | Branch Manager | Kitchen Head | Cashier | Delivery Rider | Customer |
|---|:---:|:---:|:---:|:---:|:---:|:---:|
| Browse Menu & Deals | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Place WhatsApp Order | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Counter POS Order Entry | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ |
| Kitchen KDS Bump Status | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ |
| Assign Delivery Riders | ✅ | ✅ | ❌ | ✅ | ❌ | ❌ |
| Cancel & Refund Orders | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Edit Menu & Pricing | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| 1-Click Stock Toggle | ✅ | ✅ | ✅ | ✅ | ❌ | ❌ |
| View Gross Revenues | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Moderate Reviews | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| Export Orders CSV | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |

---

## 6. Detailed Kitchen & Dispatch Workflow

```
[CUSTOMER / COUNTER]
Order Placed via POS (/admin/pos), Web, or WhatsApp
        │
        ▼ (Status: "pending")
[KITCHEN DISPLAY SYSTEM] (/admin/kitchen)
Ticket appears on KDS screen with audio alert chime
Oven timer starts counting elapsed prep minutes
        │
        ▼ Cook taps "Start Cooking (In Oven)" (Status: "preparing")
[BAKING & PREP STAGE]
Kitchen staff prepares pizza base, toppings & bakes in oven
Station item checklist checked off
        │
        ▼ Cook taps "Mark Oven Ready" (Status: "ready")
[HOT PASS & PACKAGING]
Order packed in thermal heat bag with dips & receipt
        │
        ▼ Dispatcher selects available driver (/admin/orders/active)
[RIDER DISPATCH]
Rider status changes to "on-trip", Order status -> "out-for-delivery"
Driver receives order slip with delivery address & customer phone
        │
        ▼ Rider completes delivery (/admin/orders/active)
[SETTLEMENT & COMPLETION]
Dispatcher/Cashier marks "Delivered & Paid" (Status: "completed")
Payment recorded as "paid", Rider automatically reverts to "available"
```

---

## 7. Data Flow & State Synchronization Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                             CLIENT LAYER (BROWSER)                          │
├────────────────────────┬──────────────────────────┬─────────────────────────┤
│ Customer Storefront    │ Admin Management         │ POS & Operations        │
│ • Reads MenuContext    │ • Reads & Mutates Menu   │ • Reads MenuContext     │
│ • Generates WA Links   │ • Reads AdminOrderContext│ • Creates New Orders    │
│ • Reads Testimonials   │ • Moderates Reviews      │ • Advances KDS Status   │
└───────────┬────────────┴────────────┬─────────────┴────────────┬────────────┘
            │                         │                          │
            ▼                         ▼                          ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          REACT CONTEXT & MUTATION LAYER                     │
├─────────────────────────────────────────────────────────────────────────────┤
│ • MenuContext: categories, allProducts, inStock toggles, CRUD actions       │
│ • AdminOrderContext: orders, riders, live dispatch, KDS bump, calculations  │
│ • AuthContext: active user, role permissions, session lifecycle             │
└─────────────────────────────────────┬───────────────────────────────────────┘
                                      │
                                      ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                   PERSISTENCE LAYER (CURRENT + FUTURE TARGET)               │
├─────────────────────────────────────┬───────────────────────────────────────┤
│ CURRENT (Client-First Prototype):   │ TARGET (Production Scaled Database):  │
│ • localStorage:                     │ • Database: PostgreSQL / Supabase     │
│   - tpk_admin_orders_v1             │ • ORM: Prisma / Drizzle               │
│   - tpk_admin_riders_v1             │ • Realtime: WebSockets / SSE Channels │
│   - tpk_menu_categories_v2          │ • Auth: HTTP-only secure JWT Cookies  │
│   - tpk_admin_auth_user             │ • Storage: S3 / Cloudinary for Images │
└─────────────────────────────────────┴───────────────────────────────────────┘
```

---

## 8. API Boundaries & Contracts (Target Endpoints)

While the application currently operates seamlessly on client state + `localStorage`, the architecture establishes clean API contract boundaries for database connectivity:

### Group A: Public Storefront API (`/api/store/*`)
- `GET /api/store/menu`: Retrieve active menu categories and in-stock dishes.
- `GET /api/store/specials`: Retrieve active special deals and promotional banners.
- `GET /api/store/reviews`: Retrieve approved and featured customer testimonials.
- `POST /api/store/inquiry`: Submit customer contact/inquiry message.

### Group B: POS & Operations Terminal API (`/api/operations/*`)
- `POST /api/operations/orders`: Create new counter POS or phone order.
- `GET /api/operations/orders/active`: Stream active orders for KDS and dispatch queue.
- `PATCH /api/operations/orders/:id/status`: Advance order state (`pending` → `preparing` → `ready` → `completed`).
- `POST /api/operations/orders/:id/assign-rider`: Assign fleet driver to delivery order.
- `GET /api/operations/riders`: Retrieve live fleet status (`available`, `on-trip`, `offline`).
- `PATCH /api/operations/riders/:id/status`: Toggle driver shift status.

### Group C: Admin Management API (`/api/admin/*`)
- `POST /api/admin/auth/login`: Authenticate management credentials.
- `POST /api/admin/auth/logout`: Invalidate session.
- `GET /api/admin/dashboard/metrics`: Compute daily sales, prep time averages, order volumes.
- `POST /api/admin/menu/products`: Create new menu product with variants.
- `PUT /api/admin/menu/products/:id`: Update dish details or toggle stock status.
- `DELETE /api/admin/menu/products/:id`: Remove product from catalog.
- `PUT /api/admin/menu/categories/reorder`: Persist updated tab sequence.
- `GET /api/admin/orders/export`: Stream CSV export of historical orders.
- `POST /api/admin/reviews/:id/reply`: Publish management reply to customer review.

---

## 9. Component Taxonomy Matrix

```
┌──────────────────────────────────────────────────────────────────────────┐
│                           COMPONENT TAXONOMY                             │
├──────────────────────────────────────────────────────────────────────────┤
│ 1. COMMON / SHARED (All 3 Experiences)                                   │
│    • SectionHeading, AnimatedSection, ScrollToTop, PriceDisplay          │
│    • ModalBase, StatusBadge, Button, Input, Dropdown                     │
├──────────────────────────────────────────────────────────────────────────┤
│ 2. CUSTOMER COMPONENTS ((customer)/*)                                    │
│    • CustomerNavbar, CustomerFooter                                      │
│    • HeroSection, MenuSection, SpecialsSection                           │
│    • TestimonialsSection, AboutSection, ContactSection, CTASection       │
│    • CustomerMenuCard, DealCard, StoreLocationMap                        │
├──────────────────────────────────────────────────────────────────────────┤
│ 3. ADMIN MANAGEMENT COMPONENTS (admin/*)                                 │
│    • AdminShell, AdminSidebar, AdminHeader, AdminAuthGuard               │
│    • MetricStatCard, PipelineCard, RecentOrdersTable                     │
│    • ProductModal, CategoryModal, ReviewReplyModal, DealModal            │
│    • MasterOrdersTable, ProductTable, CategoryReorderList                │
├──────────────────────────────────────────────────────────────────────────┤
│ 4. POS & OPERATIONS COMPONENTS (admin/pos, admin/kitchen, etc.)          │
│    • POSTerminal, POSCartTicket, OrderTypeTabs, SettlementButtons        │
│    • KitchenStationGrid, KitchenTicketCard, OvenBumpButton               │
│    • ActiveOrderCard, RiderSelectDropdown, RiderStatusToggle             │
└──────────────────────────────────────────────────────────────────────────┘
```

---

## 10. Implementation & Progressive Rollout Plan

To preserve existing functionality while refining boundaries, changes should follow this phased roadmap:

1. **Phase 1: Zero-Risk Refinements (Documentation & Navigation Consistency)**
   - Fix navigation route reference in `adminData.ts` (`href: "/admin/follow-up-wa"`).
   - Standardize icon imports in `AdminSidebar.tsx`.
   - Document domain schemas and component locations.

2. **Phase 2: Component Directory Restructuring (Optional / Gradual)**
   - Organize components into `components/customer/`, `components/admin/`, and `components/pos/` subfolders while preserving all existing component exports.
   - Extract common UI primitives into `components/common/`.

3. **Phase 3: Backend & Database Connection (Future)**
   - Introduce Prisma/PostgreSQL schema matching `types/orders.ts` and `types/index.ts`.
   - Implement API routes matching Section 8 contracts.
   - Add WebSocket or SSE channel to broadcast new orders between POS and Kitchen KDS instantly.
