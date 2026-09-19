'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import {
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Bike,
  Boxes,
  ChevronDown,
  CircleDollarSign,
  ClipboardList,
  Clock3,
  Grid2X2,
  LayoutDashboard,
  ListOrdered,
  LogIn,
  Menu,
  Minus,
  PackageCheck,
  Plus,
  Search,
  Settings2,
  ShoppingBag,
  Soup,
  Tags,
  Utensils,
  X,
} from 'lucide-react'

const navGroups = [
  {
    label: 'Overview',
    items: [{ label: 'Dashboard', icon: LayoutDashboard, href: '/admin' }],
  },
  {
    label: 'Operations',
    items: [
      { label: 'POS', icon: ShoppingBag, href: '/admin/pos' },
      { label: 'Active Orders', icon: ListOrdered, href: '/admin/active-orders' },
      { label: 'Kitchen', icon: Utensils, href: '/admin/kitchen' },
      { label: 'Riders', icon: Bike, href: '/admin/riders' },
      { label: 'Cancel Requests', icon: X, href: '/admin/cancel-requests' },
      { label: 'All Orders', icon: ClipboardList, href: '/admin/all-orders' },
    ],
  },
  {
    label: 'Management',
    items: [
      { label: 'Menu Management', icon: Soup, href: '/admin/menu-management' },
      { label: 'Categories Management', icon: Tags, href: '/admin/categories-management' },
    ],
  },
]

const menuItems = [
  { name: 'Classic Margherita', category: 'Pizza', price: 12.99, color: 'bg-red-100', emoji: '🍅' },
  { name: 'Pepperoni Feast', category: 'Pizza', price: 15.99, color: 'bg-orange-100', emoji: '🌶️' },
  { name: 'Garden Veggie', category: 'Pizza', price: 14.5, color: 'bg-green-100', emoji: '🥦' },
  { name: 'BBQ Chicken', category: 'Pizza', price: 16.25, color: 'bg-yellow-100', emoji: '🍗' },
  { name: 'Garlic Knots', category: 'Sides', price: 6.5, color: 'bg-amber-100', emoji: '🥖' },
  { name: 'Caesar Salad', category: 'Sides', price: 8.99, color: 'bg-lime-100', emoji: '🥗' },
]

const recentOrders = [
  { id: '#PK-1048', customer: 'Olivia Martin', items: 'Pepperoni Feast, Cola', type: 'Delivery', total: '$23.48', status: 'Preparing', time: '2 min ago' },
  { id: '#PK-1047', customer: 'Noah Williams', items: 'Classic Margherita', type: 'Pickup', total: '$12.99', status: 'Ready', time: '8 min ago' },
  { id: '#PK-1046', customer: 'Emma Davis', items: 'Garden Veggie, Garlic Knots', type: 'Delivery', total: '$21.00', status: 'Out for delivery', time: '12 min ago' },
  { id: '#PK-1045', customer: 'Liam Brown', items: 'BBQ Chicken, Cola', type: 'Pickup', total: '$19.24', status: 'Completed', time: '18 min ago' },
]

const statusStyles: Record<string, string> = {
  Preparing: 'bg-orange-50 text-orange-700 ring-orange-200',
  Ready: 'bg-yellow-50 text-yellow-700 ring-yellow-200',
  'Out for delivery': 'bg-green-50 text-green-700 ring-green-200',
  Completed: 'bg-stone-100 text-stone-600 ring-stone-200',
}

function Logo() {
  return (
    <Link href="/admin" className="flex items-center gap-3">
      <div className="relative grid size-10 place-items-center overflow-hidden rounded-xl bg-[#dc2626] shadow-sm">
        <img src="/pizza-logo.png" alt="The Pizza Kitchen Logo" className="size-8 object-contain brightness-0 invert" />
        <span className="absolute bottom-1 right-1 size-1.5 rounded-full bg-[#facc15]" />
      </div>
      <div>
        <p className="font-black tracking-tight text-[#193c2c]">The Pizza</p>
        <p className="-mt-1 text-sm font-semibold text-[#dc2626]">Kitchen</p>
      </div>
    </Link>
  )
}

function Sidebar({ active, onClose }: { active: string; onClose?: () => void }) {
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-stone-200 bg-white">
      <div className="flex h-20 items-center justify-between px-7">
        <Logo />
        {onClose && (
          <button onClick={onClose} className="rounded-lg p-1 text-stone-400 hover:bg-stone-100 lg:hidden">
            <X className="size-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-5">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-7">
            <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.18em] text-stone-400">
              {group.label}
            </p>
            <div className="flex flex-col gap-1">
              {group.items.map((item) => {
                const Icon = item.icon
                const selected = active.toLowerCase() === item.label.toLowerCase()
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                      selected
                        ? 'bg-[#dc2626] text-white shadow-md shadow-red-200'
                        : 'text-stone-600 hover:bg-stone-100 hover:text-[#193c2c]'
                    }`}
                  >
                    <Icon className="size-[18px]" />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-stone-100 p-4">
        <Link
          href="/admin/login"
          onClick={onClose}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-stone-600 hover:bg-stone-100"
        >
          <LogIn className="size-[18px]" />
          Log in
        </Link>
        <div className="mt-3 flex items-center gap-3 rounded-xl bg-[#f5f3ef] p-3">
          <div className="grid size-8 place-items-center rounded-full bg-[#193c2c] text-xs font-bold text-white">
            JD
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold text-[#193c2c]">Jordan Davis</p>
            <p className="truncate text-[11px] text-stone-500">Restaurant manager</p>
          </div>
          <Settings2 className="size-4 text-stone-400" />
        </div>
      </div>
    </aside>
  )
}

function MobileHeader({ onOpen }: { onOpen: () => void }) {
  return (
    <div className="flex items-center justify-between border-b border-stone-200 bg-white px-5 py-4 lg:hidden">
      <Logo />
      <button
        onClick={onOpen}
        className="rounded-lg p-2 text-stone-600 hover:bg-stone-100"
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </button>
    </div>
  )
}

function StatCard({
  title,
  value,
  change,
  icon: Icon,
  tone,
}: {
  title: string
  value: string
  change: string
  icon: typeof CircleDollarSign
  tone: string
}) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-[0_4px_20px_rgba(35,30,20,0.04)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-stone-500">{title}</p>
          <p className="mt-2 text-3xl font-black tracking-tight text-[#193c2c]">{value}</p>
        </div>
        <div className={`grid size-11 place-items-center rounded-xl ${tone}`}>
          <Icon className="size-5" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-green-700">
        <ArrowUpRight className="size-3.5" />
        {change}
        <span className="font-normal text-stone-400">vs last week</span>
      </div>
    </div>
  )
}

function DashboardHome() {
  return (
    <>
      <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="mb-1 text-sm font-medium text-stone-500">Tuesday, September 19, 2026</p>
          <h1 className="text-3xl font-black tracking-tight text-[#193c2c]">Good morning, Jordan</h1>
          <p className="mt-1 text-sm text-stone-500">Here&apos;s what&apos;s happening at The Pizza Kitchen today.</p>
        </div>
        <button className="flex w-fit items-center gap-2 rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-sm font-semibold text-stone-700 shadow-sm">
          <Clock3 className="size-4" />
          Today <ChevronDown className="size-4" />
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard title="Today's orders" value="128" change="12.5%" icon={ShoppingBag} tone="bg-red-50 text-red-600" />
        <StatCard title="Total revenue" value="$3,842" change="8.2%" icon={CircleDollarSign} tone="bg-yellow-50 text-yellow-600" />
        <StatCard title="Pending orders" value="24" change="4.6%" icon={Clock3} tone="bg-orange-50 text-orange-600" />
      </div>

      <div className="mt-7 rounded-2xl border border-stone-200 bg-white shadow-[0_4px_20px_rgba(35,30,20,0.04)]">
        <div className="flex items-center justify-between border-b border-stone-100 p-5">
          <div>
            <h2 className="font-bold text-[#193c2c]">Recent orders</h2>
            <p className="mt-1 text-xs text-stone-500">Keep track of your latest orders</p>
          </div>
          <Link href="/admin/all-orders" className="text-sm font-bold text-[#dc2626] hover:underline">
            View all
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="bg-stone-50/80 text-xs font-semibold text-stone-500">
              <tr>
                <th className="px-5 py-3">Order</th>
                <th className="px-5 py-3">Customer</th>
                <th className="px-5 py-3">Items</th>
                <th className="px-5 py-3">Type</th>
                <th className="px-5 py-3">Total</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-t border-stone-100">
                  <td className="px-5 py-4 font-bold text-[#193c2c]">{order.id}</td>
                  <td className="px-5 py-4 text-stone-700">{order.customer}</td>
                  <td className="max-w-48 truncate px-5 py-4 text-stone-500">{order.items}</td>
                  <td className="px-5 py-4 text-stone-500">{order.type}</td>
                  <td className="px-5 py-4 font-bold text-[#193c2c]">{order.total}</td>
                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ring-1 ${statusStyles[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs text-stone-400">{order.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

function POS() {
  const [category, setCategory] = useState('All')
  const [cart, setCart] = useState([
    { ...menuItems[0], qty: 1 },
    { ...menuItems[4], qty: 1 },
  ])

  const shown = category === 'All' ? menuItems : menuItems.filter((item) => item.category === category)

  const add = (item: (typeof menuItems)[number]) =>
    setCart((current) =>
      current.some((x) => x.name === item.name)
        ? current.map((x) => (x.name === item.name ? { ...x, qty: x.qty + 1 } : x))
        : [...current, { ...item, qty: 1 }],
    )

  const total = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.qty, 0), [cart])

  return (
    <>
      <div className="mb-7">
        <p className="text-sm font-medium text-stone-500">Point of sale</p>
        <h1 className="text-3xl font-black tracking-tight text-[#193c2c]">Build an order</h1>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <section>
          <div className="mb-5 flex flex-wrap gap-2">
            {['All', 'Pizza', 'Sides'].map((tab) => (
              <button
                key={tab}
                onClick={() => setCategory(tab)}
                className={`rounded-full px-4 py-2 text-sm font-bold ${
                  category === tab
                    ? 'bg-[#193c2c] text-white'
                    : 'bg-white text-stone-500 ring-1 ring-stone-200 hover:bg-stone-50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {shown.map((item) => (
              <button
                key={item.name}
                onClick={() => add(item)}
                className="group rounded-2xl border border-stone-200 bg-white p-3 text-left shadow-[0_4px_20px_rgba(35,30,20,0.04)] transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className={`grid h-32 place-items-center rounded-xl ${item.color} text-6xl`}>
                  {item.emoji}
                </div>
                <div className="px-1 pt-3">
                  <p className="font-bold text-[#193c2c]">{item.name}</p>
                  <p className="mt-1 text-xs text-stone-500">{item.category}</p>
                  <p className="mt-2 font-black text-[#dc2626]">${item.price.toFixed(2)}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <aside className="h-fit rounded-2xl border border-stone-200 bg-white shadow-[0_4px_20px_rgba(35,30,20,0.04)]">
          <div className="border-b border-stone-100 p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-[#193c2c]">Current order</h2>
              <span className="rounded-full bg-red-50 px-2.5 py-1 text-xs font-bold text-red-600">
                {cart.reduce((s, x) => s + x.qty, 0)} items
              </span>
            </div>
            <p className="mt-1 text-xs text-stone-500">Order #PK-1049 · Counter</p>
          </div>
          <div className="flex flex-col gap-4 p-5">
            {cart.map((item) => (
              <div key={item.name} className="flex items-center gap-3">
                <div className={`grid size-11 shrink-0 place-items-center rounded-lg ${item.color} text-2xl`}>
                  {item.emoji}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-[#193c2c]">{item.name}</p>
                  <p className="text-xs text-stone-500">${item.price.toFixed(2)} each</p>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-stone-100 p-1">
                  <button
                    aria-label={`Decrease ${item.name}`}
                    onClick={() =>
                      setCart((c) =>
                        c.flatMap((x) => (x.name === item.name ? (x.qty > 1 ? [{ ...x, qty: x.qty - 1 }] : []) : [x])),
                      )
                    }
                    className="grid size-6 place-items-center rounded-md text-stone-500 hover:bg-white"
                  >
                    <Minus className="size-3" />
                  </button>
                  <span className="w-4 text-center text-xs font-bold">{item.qty}</span>
                  <button
                    aria-label={`Increase ${item.name}`}
                    onClick={() => add(item)}
                    className="grid size-6 place-items-center rounded-md text-stone-500 hover:bg-white"
                  >
                    <Plus className="size-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-stone-100 p-5">
            <div className="flex justify-between text-sm text-stone-500">
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div className="mt-2 flex justify-between text-sm text-stone-500">
              <span>Tax</span>
              <span>${(total * 0.08).toFixed(2)}</span>
            </div>
            <div className="mt-4 flex justify-between text-lg font-black text-[#193c2c]">
              <span>Total</span>
              <span>${(total * 1.08).toFixed(2)}</span>
            </div>
            <button className="mt-5 w-full rounded-xl bg-[#dc2626] py-3.5 text-sm font-bold text-white shadow-lg shadow-red-200 transition hover:bg-red-700">
              Place order
            </button>
          </div>
        </aside>
      </div>
    </>
  )
}

function OrdersBoard({ kitchen = false }: { kitchen?: boolean }) {
  const cards = kitchen
    ? [
        {
          id: '#PK-1046',
          name: 'Emma Davis',
          items: ['Garden Veggie', 'Garlic Knots'],
          status: 'Cooking',
          tone: 'border-orange-200 bg-orange-50/40',
        },
        {
          id: '#PK-1048',
          name: 'Olivia Martin',
          items: ['Pepperoni Feast', 'Cola'],
          status: 'Cooking',
          tone: 'border-orange-200 bg-orange-50/40',
        },
        {
          id: '#PK-1049',
          name: 'Walk-in order',
          items: ['Classic Margherita'],
          status: 'New order',
          tone: 'border-red-200 bg-red-50/40',
        },
      ]
    : recentOrders.map((x) => ({
        id: x.id,
        name: x.customer,
        items: x.items.split(', '),
        status: x.status,
        tone: 'border-stone-200 bg-white',
      }))

  return (
    <>
      <div className="mb-7">
        <p className="text-sm font-medium text-stone-500">{kitchen ? 'Kitchen display' : 'Live operations'}</p>
        <h1 className="text-3xl font-black tracking-tight text-[#193c2c]">
          {kitchen ? 'Kitchen queue' : 'Active orders'}
        </h1>
        <p className="mt-1 text-sm text-stone-500">
          {kitchen
            ? 'Prepare orders with precision and keep the line moving.'
            : 'Monitor every order from ticket to doorstep.'}
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((card) => (
          <article
            key={card.id}
            className={`rounded-2xl border p-5 shadow-[0_4px_20px_rgba(35,30,20,0.04)] ${card.tone}`}
          >
            <div className="flex items-center justify-between">
              <span className="font-black text-[#193c2c]">{card.id}</span>
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${
                  card.status === 'New order' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                }`}
              >
                {card.status}
              </span>
            </div>
            <p className="mt-4 text-sm font-bold text-stone-700">{card.name}</p>
            <div className="mt-3 flex flex-col gap-2 border-t border-stone-200/70 pt-3">
              {card.items.map((item) => (
                <div key={item} className="flex items-center justify-between text-sm">
                  <span className="text-stone-600">{item}</span>
                  <span className="text-xs text-stone-400">1x</span>
                </div>
              ))}
            </div>
            <button className="mt-5 w-full rounded-xl bg-[#193c2c] py-2.5 text-xs font-bold text-white hover:bg-[#28543f]">
              {kitchen ? 'Mark as ready' : 'View order'}
            </button>
          </article>
        ))}
      </div>
    </>
  )
}

function GenericManagementBoard({ title }: { title: string }) {
  return (
    <>
      <div className="mb-7">
        <p className="text-sm font-medium text-stone-500">Operations & Management</p>
        <h1 className="text-3xl font-black tracking-tight text-[#193c2c]">{title}</h1>
        <p className="mt-1 text-sm text-stone-500">Manage real-time catalog and operational workflows.</p>
      </div>
      <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-[0_4px_20px_rgba(35,30,20,0.04)]">
        <div className="flex items-center gap-3 text-[#193c2c]">
          <LayoutDashboard className="size-6 text-[#dc2626]" />
          <h2 className="text-lg font-bold">{title} Control Center</h2>
        </div>
        <p className="mt-2 text-sm text-stone-500">
          Interactive management panel connected to live store data.
        </p>
      </div>
    </>
  )
}

export default function PizzaDashboard({ page = 'Dashboard' }: { page?: string }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const isPOS = page.toLowerCase() === 'pos'
  const isKitchen = page.toLowerCase() === 'kitchen'
  const isActive = page.toLowerCase() === 'active orders' || page.toLowerCase() === 'active-orders'
  const isGeneric = ['riders', 'cancel requests', 'all orders', 'menu management', 'categories management'].includes(
    page.toLowerCase(),
  )

  return (
    <div className="min-h-screen bg-[#faf9f6] text-stone-900">
      <MobileHeader onOpen={() => setMobileOpen(true)} />

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setMobileOpen(false)} />
          <div className="relative z-10 w-64 max-w-[80vw]">
            <Sidebar active={page} onClose={() => setMobileOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex min-h-screen">
        <div className="hidden lg:block">
          <Sidebar active={page} />
        </div>

        <main className="min-w-0 flex-1">
          <header className="hidden h-20 items-center justify-between border-b border-stone-200 bg-white px-8 lg:flex">
            <div className="flex items-center gap-3 text-sm text-stone-500">
              <Search className="size-4" />
              Press <kbd className="rounded-md border border-stone-200 bg-stone-50 px-1.5 py-0.5 text-[10px]">⌘ K</kbd> to search
            </div>
            <div className="flex items-center gap-5">
              <button aria-label="Notifications" className="relative text-stone-500">
                <Bell className="size-5" />
                <span className="absolute -right-1 -top-1 size-2 rounded-full bg-[#dc2626]" />
              </button>
              <div className="h-6 w-px bg-stone-200" />
              <div className="flex items-center gap-2 text-sm font-semibold text-[#193c2c]">
                <div className="grid size-8 place-items-center rounded-full bg-[#facc15] text-xs font-black text-[#193c2c]">
                  JD
                </div>
                Jordan Davis
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-[1480px] p-5 sm:p-7 lg:p-9">
            {isPOS ? (
              <POS />
            ) : isKitchen || isActive ? (
              <OrdersBoard kitchen={isKitchen} />
            ) : isGeneric ? (
              <GenericManagementBoard title={page} />
            ) : (
              <DashboardHome />
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
