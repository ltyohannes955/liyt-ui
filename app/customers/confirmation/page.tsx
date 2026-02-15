'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, MapPin, Package, Truck, Phone, Mail, User, Loader2, AlertCircle } from 'lucide-react';
import dynamic from 'next/dynamic';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const LocationPicker = dynamic(() => import('@/components/ui/location-picker'), {
  ssr: false,
  loading: () => (
    <div className="h-64 w-full bg-[#1a1a1a] border border-white/10 rounded-lg flex items-center justify-center">
      <span className="text-white/50">Loading map...</span>
    </div>
  ),
});

interface Business {
  id: number;
  name: string;
}

interface PickupStop {
  address1?: string;
  city?: string;
}

interface Item {
  name: string;
  quantity: number;
}

interface DeliveryPreview {
  public_id: string;
  status: string;
  description?: string;
  price: number;
  business: Business;
  pickup: PickupStop;
  items: Item[];
}

function ConfirmDeliveryContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [delivery, setDelivery] = useState<DeliveryPreview | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address1: '',
    address2: '',
    city: '',
    region: '',
    postalCode: '',
    countryCode: 'ET',
    latitude: '',
    longitude: '',
    instructions: '',
    locationName: '',
  });

  useEffect(() => {
    if (!token) {
      setError('Invalid confirmation link. Please check your email for the correct link.');
      setLoading(false);
      return;
    }

    const fetchDeliveryPreview = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/customers/confirmation?token=${token}`);

        if (response.ok) {
          const data = await response.json();
          const deliveryData = data.delivery;
          setDelivery(deliveryData);

          // If delivery is already confirmed (not awaiting_recipient), redirect to tracking page
          if (deliveryData.status !== 'awaiting_recipient' && token) {
            router.push(`/track/${token}`);
            return;
          }
        } else if (response.status === 404) {
          setError('Confirmation link not found. Please check your email for the correct link.');
        } else if (response.status === 410) {
          setError('This confirmation link has expired. Please contact the business for a new link.');
        } else {
          setError('Unable to load delivery details. Please try again later.');
        }
      } catch (err) {
        console.error('Error fetching delivery:', err);
        setError('Network error. Please check your connection and try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchDeliveryPreview();
  }, [token, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) return;

    setSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/customers/confirmation/confirm`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          full_name: formData.fullName,
          phone: formData.phone,
          email: formData.email || undefined,
          dropoff: {
            address1: formData.address1,
            address2: formData.address2 || undefined,
            city: formData.city,
            region: formData.region,
            postal_code: formData.postalCode || undefined,
            country_code: formData.countryCode,
            latitude: formData.latitude || undefined,
            longitude: formData.longitude || undefined,
            instructions: formData.instructions || undefined,
          },
        }),
      });

      if (response.ok) {
        // Redirect to tracking page with the same token
        router.push(`/track/${token}`);
      } else if (response.status === 422) {
        const data = await response.json();
        setError(data.message || 'This delivery has already been confirmed.');
      } else if (response.status === 404) {
        setError('Confirmation link not found. Please check your email for the correct link.');
      } else if (response.status === 410) {
        setError('This confirmation link has expired. Please contact the business for a new link.');
      } else {
        setError('Unable to confirm delivery. Please try again later.');
      }
    } catch (err) {
      console.error('Error confirming delivery:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 pt-4">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-[#E4FF2C] animate-spin mx-auto mb-4" />
          <p className="text-white/50">Loading delivery details...</p>
        </div>
      </div>
    );
  }

  if (error && !delivery) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 pt-4">
        <Card className="bg-[#141414] border-white/10 max-w-md w-full">
          <CardHeader className="text-center">
            <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
            <CardTitle className="text-white">Unable to Confirm</CardTitle>
            <CardDescription className="text-white/50">{error}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => router.push('/')}
              className="w-full bg-[#E4FF2C] text-[#0a0a0a] hover:bg-[#E4FF2C]/90"
            >
              Go to Homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-4 lg:p-8 pt-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white">Confirm Your Delivery</h1>
          <p className="text-white/50 mt-2">
            Please provide your delivery details below
          </p>
        </div>

        {/* Delivery Summary */}
        {delivery && (
          <Card className="bg-[#141414] border-white/10 mb-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Package className="w-5 h-5 text-[#E4FF2C]" />
                Delivery Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-white/50 text-sm">Order ID</p>
                  <p className="text-white font-medium">{delivery.public_id}</p>
                </div>
                <div>
                  <p className="text-white/50 text-sm">Business</p>
                  <p className="text-white font-medium">{delivery.business?.name}</p>
                </div>
              </div>
              <Separator className="bg-white/10" />
              <div>
                <p className="text-white/50 text-sm">Pickup Location</p>
                <p className="text-white font-medium flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#E4FF2C]" />
                  {delivery.pickup?.address1}, {delivery.pickup?.city}
                </p>
              </div>
              {delivery.items && delivery.items.length > 0 && (
                <>
                  <Separator className="bg-white/10" />
                  <div>
                    <p className="text-white/50 text-sm">Items</p>
                    <div className="space-y-1 mt-1">
                      {delivery.items.map((item, idx) => (
                        <p key={idx} className="text-white">
                          {item.name} x{item.quantity}
                        </p>
                      ))}
                    </div>
                  </div>
                </>
              )}
              {delivery.price > 0 && (
                <>
                  <Separator className="bg-white/10" />
                  <div>
                    <p className="text-white/50 text-sm">Total Price</p>
                    <p className="text-white font-medium text-xl">ETB {Number(delivery.price).toFixed(2)}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}

        {/* Confirmation Form */}
        <Card className="bg-[#141414] border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <User className="w-5 h-5 text-[#E4FF2C]" />
              Your Information
            </CardTitle>
            <CardDescription className="text-white/50">
              Please provide your contact details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-white">
                    Full Name <span className="text-red-400">*</span>
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                      className="pl-10 bg-[#1a1a1a] border-white/10 text-white placeholder:text-white/30"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white">
                    Phone Number <span className="text-red-400">*</span>
                  </Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+251 911 234 567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      className="pl-10 bg-[#1a1a1a] border-white/10 text-white placeholder:text-white/30"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  Email (Optional)
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 bg-[#1a1a1a] border-white/10 text-white placeholder:text-white/30"
                  />
                </div>
              </div>

              <Separator className="bg-white/10" />

              <div>
                <CardTitle className="text-white flex items-center gap-2 mb-4">
                  <Truck className="w-5 h-5 text-[#E4FF2C]" />
                  Delivery Address
                </CardTitle>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address1" className="text-white">
                      Address Line 1 <span className="text-red-400">*</span>
                    </Label>
                    <Input
                      id="address1"
                      placeholder="123 Main Street"
                      value={formData.address1}
                      onChange={(e) => setFormData({ ...formData, address1: e.target.value })}
                      required
                      className="bg-[#1a1a1a] border-white/10 text-white placeholder:text-white/30"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address2" className="text-white">
                      Address Line 2 (Optional)
                    </Label>
                    <Input
                      id="address2"
                      placeholder="Apartment, suite, etc."
                      value={formData.address2}
                      onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
                      className="bg-[#1a1a1a] border-white/10 text-white placeholder:text-white/30"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-white">
                        City <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        id="city"
                        placeholder="Addis Ababa"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        required
                        className="bg-[#1a1a1a] border-white/10 text-white placeholder:text-white/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="region" className="text-white">
                        Region <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        id="region"
                        placeholder="Addis Ababa"
                        value={formData.region}
                        onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                        required
                        className="bg-[#1a1a1a] border-white/10 text-white placeholder:text-white/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="postalCode" className="text-white">
                        Postal Code
                      </Label>
                      <Input
                        id="postalCode"
                        placeholder="1000"
                        value={formData.postalCode}
                        onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                        className="bg-[#1a1a1a] border-white/10 text-white placeholder:text-white/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="countryCode" className="text-white">
                        Country Code <span className="text-red-400">*</span>
                      </Label>
                      <Input
                        id="countryCode"
                        placeholder="ET"
                        value={formData.countryCode}
                        onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                        required
                        maxLength={2}
                        className="bg-[#1a1a1a] border-white/10 text-white placeholder:text-white/30"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-white">Location (Optional)</Label>
                    <p className="text-white/50 text-sm">Click on the map or use current location to set coordinates</p>
                    <LocationPicker
                      latitude={formData.latitude}
                      longitude={formData.longitude}
                      onLocationChange={(lat, lng) => {
                        setFormData({ ...formData, latitude: lat, longitude: lng });
                      }}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instructions" className="text-white">
                      Delivery Instructions (Optional)
                    </Label>
                    <Input
                      id="instructions"
                      placeholder="Ring doorbell, use side entrance, etc."
                      value={formData.instructions}
                      onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                      className="bg-[#1a1a1a] border-white/10 text-white placeholder:text-white/30"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <p className="text-red-400 text-sm">{error}</p>
                </div>
              )}

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push('/')}
                  className="flex-1 border-white/20 text-white hover:bg-white/10"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-[#E4FF2C] text-[#0a0a0a] hover:bg-[#E4FF2C]/90"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Confirming...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Confirm Delivery
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function ConfirmDeliveryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-[#E4FF2C] animate-spin" />
      </div>
    }>
      <ConfirmDeliveryContent />
    </Suspense>
  );
}
