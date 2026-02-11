# Logistics Dashboard Implementation Plan

## Overview
Create a comprehensive logistics admin panel with sidebar navigation and order management functionality, matching the provided UI design.

## File Structure to Create

### 1. Types
**File:** `app/dashboard/types/order.ts`
```typescript
export interface Order {
  id: string;
  orderNumber: string;
  itemName: string;
  pickUpLocation: string;
  dropOffLocation: string;
  date: string;
  status: 'completed' | 'pending' | 'in-transit';
  itemDescription?: string;
}

export interface OrderStats {
  totalOrders: number;
  totalChange: number;
  pending: number;
  pendingChange: number;
  inTransit: number;
  inTransitChange: number;
  completed: number;
  completedChange: number;
}
```

### 2. Mock Data
**File:** `app/dashboard/data/mockOrders.ts`
- Contains 15 sample orders matching the UI
- Simulates API calls with delays
- Order stats: 1,284 total, 142 pending, 84 in-transit, 1,058 completed

### 3. Components

#### Sidebar Component
**File:** `app/dashboard/components/Sidebar.tsx`
- Logo: "Logistics ADMIN PANEL" with icon
- Navigation: Dashboard, Orders, Settings
- Active state with yellow highlight
- Responsive mobile support

#### DashboardLayout Component
**File:** `app/dashboard/components/DashboardLayout.tsx`
- Two-column layout: Sidebar + Main Content
- Removes main site Header/Footer for dashboard routes
- Responsive design

#### StatsCard Component
**File:** `app/dashboard/components/StatsCard.tsx`
- Icon + title + value + percentage change
- Green for positive, red for negative changes
- Used in Orders page

#### StatusBadge Component
**File:** `app/dashboard/components/StatusBadge.tsx`
- Three variants: Completed (yellow), Pending (outline), In Transit (green)
- Pill-shaped badges

### 4. Pages

#### Dashboard Home
**File:** `app/dashboard/page.tsx`
- Welcome/overview page
- Quick stats and recent activity

#### Orders Page
**File:** `app/dashboard/orders/page.tsx`
- Header: "Orders Management" + "Create New Order" button
- Stats cards row (4 cards)
- Search bar + Filters + Export CSV
- Orders table with columns: Order ID, Item Name, Pick Up Location, Drop Off Location, Date, Status, Action
- Pagination at bottom
- Matches the provided UI exactly

#### Settings Page
**File:** `app/dashboard/settings/page.tsx`
- Placeholder settings page
- Basic settings layout

### 5. Layout Update
**File:** `app/layout.tsx`
- Conditionally render Header/Footer based on route
- Dashboard routes use their own layout

## Design Specifications

### Colors (matching existing site)
- Background: #0a0a0a (dark)
- Primary accent: #E4FF2C (neon yellow/lime)
- Text: White and gray variants
- Cards: Dark gray with subtle borders

### Typography
- Use existing Geist font family
- Clean, modern sans-serif

### Icons
- Lucide React icons
- Truck, LayoutDashboard, Settings, ShoppingCart, Clock, CheckCircle, Rocket, MoreHorizontal, Bell, Plus, Search, Filter, Download, ChevronLeft, ChevronRight

## Implementation Steps
1. Create types and mock data
2. Create all dashboard components
3. Create dashboard pages
4. Update root layout for conditional rendering
5. Test all routes work correctly

## Dependencies to Add
- None additional - using existing lucide-react and Tailwind CSS

## Route Structure
- `/dashboard` - Dashboard home
- `/dashboard/orders` - Orders management
- `/dashboard/settings` - Settings page
