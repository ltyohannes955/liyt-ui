'use client';

import { useParams, useRouter } from 'next/navigation';
import { DashboardLayout } from '../../components/DashboardLayout';
import { StatusBadge } from '../../components/StatusBadge';
import { mockOrders, ethiopiaLocations } from '../../data/mockOrders';
import {
  Map,
  MapMarker,
  MapPopup,
  MapTileLayer,
  MapZoomControl,
} from '@/components/ui/map';
import {
  ArrowLeft,
  Package,
  MapPin,
  User,
  Phone,
  Mail,
  Truck,
  Clock,
  CheckCircle2,
  Circle,
  Edit,
  Printer,
  MoreHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const timelineEvents = [
  {
    status: 'Order Created',
    date: 'Oct 24, 2023 - 09:30 AM',
    description: 'Order has been created and is awaiting pickup',
    completed: true,
  },
  {
    status: 'Picked Up',
    date: 'Oct 24, 2023 - 02:15 PM',
    description: 'Package has been picked up from origin',
    completed: true,
  },
  {
    status: 'In Transit',
    date: 'Oct 25, 2023 - 08:45 AM',
    description: 'Package is on the way to destination',
    completed: true,
  },
  {
    status: 'Out for Delivery',
    date: 'Oct 26, 2023 - 07:30 AM',
    description: 'Package is out for delivery',
    completed: false,
  },
  {
    status: 'Delivered',
    date: 'Pending',
    description: 'Package will be marked as delivered upon arrival',
    completed: false,
  },
];

// Dark theme map tiles - CartoDB Dark Matter
const darkTileLayer = {
  url: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
};

export default function OrderDetailPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const order = mockOrders.find((o) => o.id === orderId);

  if (!order) {
    return (
      <DashboardLayout>
      <div className="p-4 lg:p-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-4">Order Not Found</h1>
            <Button
              onClick={() => router.push('/dashboard/orders')}
              className="bg-[#E4FF2C] text-[#0a0a0a]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Orders
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const pickupCoords = ethiopiaLocations[order.pickUpLocation] || [9.03, 38.74];
  const dropoffCoords = ethiopiaLocations[order.dropOffLocation] || [9.03, 38.74];
  const centerCoords: [number, number] = [
    (pickupCoords[0] + dropoffCoords[0]) / 2,
    (pickupCoords[1] + dropoffCoords[1]) / 2,
  ];

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => router.push('/dashboard/orders')}
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-white">{order.orderNumber}</h1>
                <StatusBadge status={order.status} />
              </div>
              <p className="text-white/50 mt-1">Created on {order.date}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white/50 hover:text-white hover:bg-white/10"
                >
                  <MoreHorizontal className="w-5 h-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[#1a1a1a] border-white/10">
                <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer">
                  Cancel Order
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer">
                  Duplicate Order
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-400 hover:bg-red-500/10 cursor-pointer">
                  Delete Order
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Map Card */}
            <Card className="bg-[#141414] border-white/10 overflow-hidden">
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#E4FF2C]" />
                  Route Map - Addis Ababa, Ethiopia
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[400px] w-full">
                  <Map
                    center={centerCoords}
                    zoom={13}
                    className="h-full w-full"
                  >
                    <MapTileLayer
                      url={darkTileLayer.url}
                      attribution={darkTileLayer.attribution}
                    />
                    <MapZoomControl />
                    {/* Pickup Marker */}
                    <MapMarker position={pickupCoords}>
                      <MapPopup>
                        <div className="p-2">
                          <p className="font-semibold">Pickup Location</p>
                          <p className="text-sm text-gray-600">{order.pickUpLocation}</p>
                        </div>
                      </MapPopup>
                    </MapMarker>
                    {/* Dropoff Marker */}
                    <MapMarker position={dropoffCoords}>
                      <MapPopup>
                        <div className="p-2">
                          <p className="font-semibold">Dropoff Location</p>
                          <p className="text-sm text-gray-600">{order.dropOffLocation}</p>
                        </div>
                      </MapPopup>
                    </MapMarker>
                  </Map>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#E4FF2C]" />
                  Delivery Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {timelineEvents.map((event, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        {event.completed ? (
                          <CheckCircle2 className="w-6 h-6 text-[#E4FF2C]" />
                        ) : (
                          <Circle className="w-6 h-6 text-white/30" />
                        )}
                        {index < timelineEvents.length - 1 && (
                          <div
                            className={`w-0.5 h-full mt-2 ${
                              event.completed ? 'bg-[#E4FF2C]/30' : 'bg-white/10'
                            }`}
                          />
                        )}
                      </div>
                      <div className="pb-6">
                        <h4 className={`font-medium ${event.completed ? 'text-white' : 'text-white/50'}`}>
                          {event.status}
                        </h4>
                        <p className="text-sm text-[#E4FF2C]">{event.date}</p>
                        <p className="text-sm text-white/50 mt-1">{event.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Order Info */}
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#E4FF2C]" />
                  Order Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-white/50 text-sm">Item Name</p>
                  <p className="text-white font-medium">{order.itemName}</p>
                </div>
                <Separator className="bg-white/10" />
                <div>
                  <p className="text-white/50 text-sm">Order Number</p>
                  <p className="text-white font-medium">{order.orderNumber}</p>
                </div>
                <Separator className="bg-white/10" />
                <div>
                  <p className="text-white/50 text-sm">Order Date</p>
                  <p className="text-white font-medium">{order.date}</p>
                </div>
                <Separator className="bg-white/10" />
                <div>
                  <p className="text-white/50 text-sm">Status</p>
                  <div className="mt-1">
                    <StatusBadge status={order.status} />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Pickup Details */}
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Truck className="w-5 h-5 text-[#E4FF2C]" />
                  Pickup Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-white/50 text-sm">Location</p>
                  <p className="text-white font-medium">{order.pickUpLocation}</p>
                </div>
                <Separator className="bg-white/10" />
                <div>
                  <p className="text-white/50 text-sm">Contact Person</p>
                  <div className="flex items-center gap-2 mt-1">
                    <User className="w-4 h-4 text-white/50" />
                    <p className="text-white">Abebe Kebede</p>
                  </div>
                </div>
                <Separator className="bg-white/10" />
                <div>
                  <p className="text-white/50 text-sm">Contact Info</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="w-4 h-4 text-white/50" />
                    <p className="text-white">+251 911 234 567</p>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="w-4 h-4 text-white/50" />
                    <p className="text-white">abebe.kebede@example.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dropoff Details */}
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#E4FF2C]" />
                  Dropoff Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-white/50 text-sm">Location</p>
                  <p className="text-white font-medium">{order.dropOffLocation}</p>
                </div>
                <Separator className="bg-white/10" />
                <div>
                  <p className="text-white/50 text-sm">Contact Person</p>
                  <div className="flex items-center gap-2 mt-1">
                    <User className="w-4 h-4 text-white/50" />
                    <p className="text-white">Tigist Haile</p>
                  </div>
                </div>
                <Separator className="bg-white/10" />
                <div>
                  <p className="text-white/50 text-sm">Contact Info</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="w-4 h-4 text-white/50" />
                    <p className="text-white">+251 922 345 678</p>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="w-4 h-4 text-white/50" />
                    <p className="text-white">tigist.haile@example.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Package Info */}
            <Card className="bg-[#141414] border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#E4FF2C]" />
                  Package Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-white/50 text-sm">Weight</p>
                    <p className="text-white font-medium">12.5 kg</p>
                  </div>
                  <div>
                    <p className="text-white/50 text-sm">Dimensions</p>
                    <p className="text-white font-medium">40 x 30 x 25 cm</p>
                  </div>
                </div>
                <Separator className="bg-white/10" />
                <div>
                  <p className="text-white/50 text-sm">Description</p>
                  <p className="text-white text-sm mt-1">
                    Fragile electronics package. Handle with care. Contains sensitive equipment.
                  </p>
                </div>
                <Separator className="bg-white/10" />
                <div>
                  <p className="text-white/50 text-sm">Special Instructions</p>
                  <p className="text-white text-sm mt-1">
                    Deliver between 9 AM - 5 PM. Signature required upon delivery.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
