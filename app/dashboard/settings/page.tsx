'use client';

import { DashboardLayout } from '../components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Bell, Shield, User, Mail, Lock } from 'lucide-react';

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="p-4 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Settings</h1>
          <p className="text-white/50 mt-1">Manage your account and application preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Settings */}
          <Card className="bg-[#141414] border-white/10 lg:col-span-2">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#E4FF2C]/10 rounded-lg">
                  <User className="w-5 h-5 text-[#E4FF2C]" />
                </div>
                <div>
                  <CardTitle className="text-white">Profile Settings</CardTitle>
                  <CardDescription className="text-white/50">
                    Update your personal information
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-white">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    className="bg-[#1a1a1a] border-white/10 text-white placeholder:text-white/30"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-white">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    className="bg-[#1a1a1a] border-white/10 text-white placeholder:text-white/30"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="pl-10 bg-[#1a1a1a] border-white/10 text-white placeholder:text-white/30"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="text-white">Company</Label>
                <Input
                  id="company"
                  placeholder="Logistics Co."
                  className="bg-[#1a1a1a] border-white/10 text-white placeholder:text-white/30"
                />
              </div>
              <Button className="bg-[#E4FF2C] text-[#0a0a0a] hover:bg-[#E4FF2C]/90 font-medium">
                Save Changes
              </Button>
            </CardContent>
          </Card>

          {/* Security Settings */}
          <Card className="bg-[#141414] border-white/10">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-[#E4FF2C]/10 rounded-lg">
                  <Shield className="w-5 h-5 text-[#E4FF2C]" />
                </div>
                <div>
                  <CardTitle className="text-white">Security</CardTitle>
                  <CardDescription className="text-white/50">
                    Manage your security preferences
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Lock className="w-4 h-4 text-white/50" />
                    <div>
                      <p className="text-white text-sm font-medium">Two-Factor Auth</p>
                      <p className="text-white/50 text-xs">Add extra security</p>
                    </div>
                  </div>
                  <Switch className="data-[state=checked]:bg-[#E4FF2C]" />
                </div>
                <Separator className="bg-white/10" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bell className="w-4 h-4 text-white/50" />
                    <div>
                      <p className="text-white text-sm font-medium">Email Notifications</p>
                      <p className="text-white/50 text-xs">Get updates via email</p>
                    </div>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-[#E4FF2C]" />
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/10"
              >
                Change Password
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
