'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '../components/DashboardLayout';
import { StatsCard } from '../components/StatsCard';
import { StatusBadge } from '../components/StatusBadge';
import { CreateOrderModal } from '../components/CreateOrderModal';
import { mockOrders, orderStats } from '../data/mockOrders';
import {
  ShoppingCart,
  Clock,
  CheckCircle,
  Rocket,
  Search,
  Filter,
  Download,
  Bell,
  MapPin,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Eye,
  Pencil,
  XCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const ITEMS_PER_PAGE = 10;

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredOrders = useMemo(() => {
    return mockOrders.filter((order) =>
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.itemName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.pickUpLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.dropOffLocation.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, filteredOrders.length);

  const handleOrderCreated = () => {
    // In a real app, this would refresh the orders list
    console.log('Order created successfully');
  };

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Orders Management</h1>
            <p className="text-white/50 mt-1">Real-time logistics tracking and processing</p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              <Bell className="w-5 h-5" />
            </Button>
            <CreateOrderModal onOrderCreated={handleOrderCreated} />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Orders"
            value={orderStats.totalOrders.toLocaleString()}
            change={orderStats.totalChange}
            icon={ShoppingCart}
          />
          <StatsCard
            title="Pending"
            value={orderStats.pending}
            change={orderStats.pendingChange}
            icon={Clock}
          />
          <StatsCard
            title="In Transit"
            value={orderStats.inTransit}
            change={orderStats.inTransitChange}
            icon={Rocket}
          />
          <StatsCard
            title="Completed"
            value={orderStats.completed.toLocaleString()}
            change={orderStats.completedChange}
            icon={CheckCircle}
          />
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
            <Input
              placeholder="Search Order ID, Item Name, or Location..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-10 bg-[#141414] border-white/10 text-white placeholder:text-white/50 focus:border-[#E4FF2C] focus:ring-[#E4FF2C]"
            />
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 hover:text-white"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 hover:text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-[#141414] rounded-lg border border-white/10 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-transparent">
                <TableHead className="text-white/50 font-medium">Order ID</TableHead>
                <TableHead className="text-white/50 font-medium">Item Name</TableHead>
                <TableHead className="text-white/50 font-medium">Pick Up Location</TableHead>
                <TableHead className="text-white/50 font-medium">Drop Off Location</TableHead>
                <TableHead className="text-white/50 font-medium">Date</TableHead>
                <TableHead className="text-white/50 font-medium">Status</TableHead>
                <TableHead className="text-white/50 font-medium text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedOrders.map((order) => (
                <TableRow key={order.id} className="border-white/5 hover:bg-white/5">
                  <TableCell className="font-medium">
                    <Link
                      href={`/dashboard/orders/${order.id}`}
                      className="text-[#E4FF2C] hover:underline"
                    >
                      {order.orderNumber}
                    </Link>
                  </TableCell>
                  <TableCell className="text-white/80">{order.itemName}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-white/70">
                      <MapPin className="w-4 h-4 text-white/40" />
                      {order.pickUpLocation}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-white/70">
                      <MapPin className="w-4 h-4 text-[#E4FF2C]" />
                      {order.dropOffLocation}
                    </div>
                  </TableCell>
                  <TableCell className="text-white/70">{order.date}</TableCell>
                  <TableCell>
                    <StatusBadge status={order.status} />
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white/50 hover:text-white hover:bg-white/10"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="bg-[#1a1a1a] border-white/10"
                      >
                        <DropdownMenuItem asChild className="text-white hover:bg-white/10 cursor-pointer">
                          <Link href={`/dashboard/orders/${order.id}`} className="flex items-center">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-white hover:bg-white/10 cursor-pointer">
                          <Pencil className="w-4 h-4 mr-2" />
                          Edit Order
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-400 hover:bg-red-500/10 cursor-pointer">
                          <XCircle className="w-4 h-4 mr-2" />
                          Cancel Order
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-white/50 text-sm">
            Showing {startItem}-{endItem} of {filteredOrders.length} results
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="border-white/20 text-white hover:bg-white/10 disabled:opacity-50"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i + 1}
                variant={currentPage === i + 1 ? 'default' : 'outline'}
                size="sm"
                onClick={() => setCurrentPage(i + 1)}
                className={
                  currentPage === i + 1
                    ? 'bg-[#E4FF2C] text-[#0a0a0a] hover:bg-[#E4FF2C]/90'
                    : 'border-white/20 text-white hover:bg-white/10'
                }
              >
                {i + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="border-white/20 text-white hover:bg-white/10 disabled:opacity-50"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
