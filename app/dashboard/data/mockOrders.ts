import { Order, OrderStats } from '../types/order';

export const orderStats: OrderStats = {
  totalOrders: 1284,
  totalChange: 12.5,
  pending: 142,
  pendingChange: 0,
  inTransit: 84,
  inTransitChange: -2.1,
  completed: 1058,
  completedChange: 5.4,
};

// Ethiopia - Addis Ababa locations with coordinates
export const ethiopiaLocations: Record<string, [number, number]> = {
  // Major Landmarks & Areas
  'Bole International Airport': [8.9779, 38.7993],
  'Meskel Square': [9.0101, 38.7613],
  'Addis Ababa University': [9.0403, 38.7632],
  'National Palace': [9.0205, 38.7621],
  'African Union HQ': [9.0056, 38.7635],
  'Unity Park': [9.0202, 38.7638],
  'Holy Trinity Cathedral': [9.0348, 38.7654],
  'St. George Cathedral': [9.0371, 38.7526],
  'Merkato Market': [9.0352, 38.7374],
  'Ethiopian National Museum': [9.0408, 38.7613],
  'Red Terror Martyrs Memorial': [9.0198, 38.7617],
  'Friendship Park': [9.0062, 38.7641],
  // Business Districts
  'Bole Medhanealem': [8.9856, 38.7891],
  'Kazanchis': [9.0194, 38.7639],
  'Piazza': [9.0333, 38.7536],
  'Sarbet': [9.0012, 38.7334],
  'Ayat': [9.0256, 38.8234],
  'CMC': [9.0223, 38.8123],
  'Megenagna': [9.0345, 38.7890],
  // Hotels & Commercial
  'Sheraton Addis': [9.0134, 38.7634],
  'Hilton Addis Ababa': [9.0167, 38.7632],
  'Jupiter Hotel': [8.9876, 38.7889],
  'Edna Mall': [8.9789, 38.7901],
  'Century Mall': [8.9812, 38.7912],
};

export const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: '#LOG-8821',
    itemName: 'Electronics Pack A',
    pickUpLocation: 'Bole International Airport',
    dropOffLocation: 'Meskel Square',
    date: 'Oct 24, 2023',
    status: 'completed',
  },
  {
    id: '2',
    orderNumber: '#LOG-8822',
    itemName: 'Medical Supplies X',
    pickUpLocation: 'Addis Ababa University',
    dropOffLocation: 'African Union HQ',
    date: 'Oct 25, 2023',
    status: 'in-transit',
  },
  {
    id: '3',
    orderNumber: '#LOG-8823',
    itemName: 'Industrial Parts B',
    pickUpLocation: 'Merkato Market',
    dropOffLocation: 'Bole Medhanealem',
    date: 'Oct 25, 2023',
    status: 'pending',
  },
  {
    id: '4',
    orderNumber: '#LOG-8824',
    itemName: 'Consumer Goods Z',
    pickUpLocation: 'Kazanchis',
    dropOffLocation: 'Piazza',
    date: 'Oct 26, 2023',
    status: 'in-transit',
  },
  {
    id: '5',
    orderNumber: '#LOG-8825',
    itemName: 'Luxury Furniture C',
    pickUpLocation: 'Sheraton Addis',
    dropOffLocation: 'National Palace',
    date: 'Oct 26, 2023',
    status: 'completed',
  },
  {
    id: '6',
    orderNumber: '#LOG-8826',
    itemName: 'Auto Parts D',
    pickUpLocation: 'Sarbet',
    dropOffLocation: 'Ayat',
    date: 'Oct 27, 2023',
    status: 'completed',
  },
  {
    id: '7',
    orderNumber: '#LOG-8827',
    itemName: 'Pharmaceuticals Y',
    pickUpLocation: 'CMC',
    dropOffLocation: 'Unity Park',
    date: 'Oct 27, 2023',
    status: 'in-transit',
  },
  {
    id: '8',
    orderNumber: '#LOG-8828',
    itemName: 'Electronics Pack B',
    pickUpLocation: 'Megenagna',
    dropOffLocation: 'Holy Trinity Cathedral',
    date: 'Oct 28, 2023',
    status: 'pending',
  },
  {
    id: '9',
    orderNumber: '#LOG-8829',
    itemName: 'Food Supplies Z',
    pickUpLocation: 'St. George Cathedral',
    dropOffLocation: 'Ethiopian National Museum',
    date: 'Oct 28, 2023',
    status: 'completed',
  },
  {
    id: '10',
    orderNumber: '#LOG-8830',
    itemName: 'Building Materials A',
    pickUpLocation: 'Edna Mall',
    dropOffLocation: 'Red Terror Martyrs Memorial',
    date: 'Oct 29, 2023',
    status: 'in-transit',
  },
];

// Simulate API delay
export const fetchOrders = (): Promise<Order[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockOrders);
    }, 500);
  });
};

export const fetchOrderStats = (): Promise<OrderStats> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(orderStats);
    }, 300);
  });
};
