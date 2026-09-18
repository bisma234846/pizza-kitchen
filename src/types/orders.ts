// ============================================
// The Pizza Kitchen - Order & Delivery Data Models
// ============================================

export type OrderStatus =
  | "pending"
  | "preparing"
  | "ready"
  | "out-for-delivery"
  | "completed"
  | "cancelled";

export type OrderType = "dine-in" | "takeaway" | "delivery";

export type OrderSource = "pos" | "website" | "whatsapp";

export type PaymentMethod = "cash" | "card" | "jazzcash" | "easypaisa" | "online";

export type PaymentStatus = "pending" | "paid" | "refunded";

export type RiderStatus = "available" | "on-trip" | "offline";

export interface OrderItem {
  id: string;
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  size?: "Regular" | "Medium" | "Large" | "XL" | string;
  crust?: "Normal Crust" | "Thick Crust" | "Thin Crust" | "Square Thick" | string;
  customizations?: string[];
  notes?: string;
  itemTotal: number;
}

export interface DeliveryAddress {
  id?: string;
  street: string;
  area: string;
  city: string;
  houseNumber?: string;
  landmark?: string;
  fullAddress: string;
}

export interface Rider {
  id: string;
  name: string;
  phone: string;
  vehicleType: "bike" | "car";
  vehicleNumber: string;
  status: RiderStatus;
  currentOrderId?: string | null;
  primaryZone: string;
  completedDeliveriesToday: number;
  totalDeliveries: number;
  rating?: number;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  addresses?: DeliveryAddress[];
  totalOrders: number;
  totalSpent: number;
  loyaltyPoints?: number;
  birthday?: string;
  createdAt: string;
}

export interface Order {
  id: string;
  orderNumber: string; // e.g. "#PK-1042"
  customerName: string;
  phone: string;
  customer?: Customer;
  orderType: OrderType;
  deliveryAddress?: DeliveryAddress;
  tableNumber?: string; // For dine-in
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  source: OrderSource;
  riderAssigned?: Rider | null;
  riderId?: string | null;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  notes?: string;
  cancelReason?: string;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}
