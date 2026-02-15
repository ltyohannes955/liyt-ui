'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { DashboardLayout } from './components/DashboardLayout';
import { StatsCard } from './components/StatsCard';
import { ShoppingCart, Clock, CheckCircle, Rocket } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppSelector, useAppDispatch } from '@/lib/hooks';
import { fetchCurrentUser } from '@/lib/features/auth/authSlice';
import { useAuthCheck } from '@/lib/hooks/useAuthCheck';

export default function DashboardPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, business } = useAppSelector((state) => state.auth);
  
  // Use auth check hook - redirects to login if not authenticated
  const { isAuthenticated, isLoading } = useAuthCheck({ requireAuth: true, redirectTo: '/login' });

  useEffect(() => {
    // Fetch current user data if authenticated
    if (isAuthenticated && !user) {
      dispatch(fetchCurrentUser());
    }
  }, [isAuthenticated, user, dispatch]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#E4FF2C] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-white/50 mt-1">
            Welcome back{business?.name ? ` to ${business.name}` : ''}
            {user?.email ? `, ${user.email.split('@')[0]}` : ''}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Total Orders"
            value="1,284"
            change={12.5}
            icon={ShoppingCart}
          />
          <StatsCard
            title="Pending"
            value="142"
            change={0}
            icon={Clock}
          />
          <StatsCard
            title="In Transit"
            value="84"
            change={-2.1}
            icon={Rocket}
          />
          <StatsCard
            title="Completed"
            value="1,058"
            change={5.4}
            icon={CheckCircle}
          />
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-[#141414] border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Link
                  href="/dashboard/orders"
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <div>
                    <h3 className="text-white font-medium">View Orders</h3>
                    <p className="text-white/50 text-sm">Manage and track all orders</p>
                  </div>
                  <Rocket className="w-5 h-5 text-[#E4FF2C]" />
                </Link>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">Create New Order</h3>
                    <p className="text-white/50 text-sm">Add a new shipment</p>
                  </div>
                  <ShoppingCart className="w-5 h-5 text-[#E4FF2C]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#141414] border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-[#E4FF2C] rounded-full mt-2" />
                  <div>
                    <p className="text-white text-sm">Order #LOG-8830 marked as In Transit</p>
                    <p className="text-white/50 text-xs">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2" />
                  <div>
                    <p className="text-white text-sm">Order #LOG-8829 completed successfully</p>
                    <p className="text-white/50 text-xs">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-white/30 rounded-full mt-2" />
                  <div>
                    <p className="text-white text-sm">New order #LOG-8831 created</p>
                    <p className="text-white/50 text-xs">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
