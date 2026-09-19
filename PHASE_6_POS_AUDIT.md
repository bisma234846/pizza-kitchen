# PHASE 6 — POS & RESTAURANT OPERATIONS AUDIT

**Project:** The Pizza Kitchen  
**Audit Date:** September 19, 2026  
**Location:** Susan Road Branch HQ, Faisalabad, Pakistan  
**Scope:** POS System, Cashier Terminal, Payment Flow, Kitchen Display System (KDS), Order Lifecycle  
**Architecture Boundary:** POS / Restaurant Operations (Customer storefront and Admin management strictly isolated)

---

## 1. Existing Backend, Data & Payment Architecture Inspection

### A. Data Layer & API Architecture:
- **Database:** None (no SQL, Prisma, Mongoose, Supabase, or Firebase).
- **Backend API Routes:** None (`src/app/api/` does not exist).
- **Data Persistence:** Client-side React Context (`AdminOrderContext`, `MenuContext`, `AuthContext`) persisting to browser `localStorage`:
  - `tpk_admin_orders_v1` — Orders state & status history
  - `tpk_admin_riders_v1` — Fleet riders & dispatch trips
  - `tpk_menu_categories_v2` — Menu items, categories, and stock toggles
  - `tpk_admin_auth_user` — Active staff/admin session
- **Real-time Sync:** No WebSocket, WebRTC, or SSE server exists. State changes synchronize reactively across components sharing the same React Context tree within the active browser session, with cross-tab persistence via `localStorage`.

### B. Payment Integration Architecture:
- **Payment Gateways:** No real payment gateway SDKs or merchant APIs exist in the codebase (no Stripe, JazzCash Merchant API, EasyPaisa API, or bank gateway).
- **Supported Payment Recording Model:**
  - **Cash:** Direct cash exchange at the counter with cash tendered and change calculation.
  - **Counter Card / POS Terminal:** Manual recording of external card swipe machine authorization.
  - **JazzCash / EasyPaisa / QR:** Manual recording of customer mobile wallet transfer at counter.
- **Unsupported:** Automated online payment gateway webhooks, automated refund processing, direct bank acquirer integrations. These are documented as `NOT CONFIGURED / MANUAL COUNTER RECORD ONLY`.

### C. Order Lifecycle & Statuses:
- Existing statuses in `src/types/orders.ts` (strictly preserved without creating duplicate or conflicting statuses):
  - `pending` — New order placed at counter/online/WhatsApp, awaiting kitchen preparation.
  - `preparing` — Food in oven/prep station.
  - `ready` — Food prepared and plated/boxed at dispatch table.
  - `out-for-delivery` — Dispatched with delivery fleet rider (Delivery orders only).
  - `completed` — Handed over to customer (Dine-in / Takeaway) or marked delivered by rider.
  - `cancelled` — Order cancelled with reason.

---

## 2. Existing POS Routes & Status

| Route | Purpose | Current Status |
| :--- | :--- | :--- |
| `/admin/pos` | Counter Order Entry | Basic client-side ticket builder in `AdminShell`. Lacks search, item options modal, advanced payment settlement, and change calculator. |
| `/admin/kitchen` | Kitchen Display System | 3-column ticket view with basic status toggle (`preparing`, `ready`). Lacks elapsed timers, completed status progression, and full-screen KDS mode. |
| `/admin/orders` | Orders Ledger | Master tabular ledger with search, CSV export, and status/channel filters. |
| `/admin/orders/active` | Active Dispatch Stream | Live order progression with fleet rider assignment. |
| `/admin/orders/cancel-requests` | Refund & Cancellation Log | Inspection and re-activation of cancelled orders. |
| `/admin/login` | Management & Staff Login | Dual-role (Admin vs Staff) login card with demo credential autofill. |

---

## 3. Dedicated POS Operational Architecture (Phase 6)

To meet the operational workflow requirement while preserving the single order system:

```
POS LOGIN (/pos/login)
   ↓
POS DASHBOARD / NEW ORDER (/pos)
   ↓
ITEM CUSTOMIZATION & CART REVIEW
   ↓
PAYMENT SETTLEMENT (/pos/payment) [Cash calculation & manual counter method record]
   ↓
ORDER CONFIRMED & RECEIPT PREVIEW
   ↓
KITCHEN DISPLAY SYSTEM (/pos/kitchen) [NEW -> PREPARING -> READY -> COMPLETED]
   ↓
POS ORDERS LEDGER (/pos/orders) [Rapid counter ticket search & receipt reprint]
```

### Key Safety Constraints:
1. **Single Source of Truth:** All POS operations interface directly with `AdminOrderContext` and `MenuContext`. No second database or fake API.
2. **Customer & Admin Isolation:** Customer storefront (`src/app/(customer)/*`) and Admin management pages remain completely untouched.
3. **No Fake Gateways:** Payment options are explicitly presented as counter cash settlement or manual counter POS record (marking payment status as `paid` or `pending`), without simulating fake payment gateway API requests.
