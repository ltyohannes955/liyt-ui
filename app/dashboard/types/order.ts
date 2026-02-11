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
