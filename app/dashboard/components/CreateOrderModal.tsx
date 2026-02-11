'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, Package, MapPin, User, Truck } from 'lucide-react';

interface CreateOrderModalProps {
  onOrderCreated?: () => void;
}

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'in-transit', label: 'In Transit' },
  { value: 'completed', label: 'Completed' },
];

// Ethiopia - Addis Ababa locations
const ethiopiaLocations = [
  'Bole International Airport',
  'Meskel Square',
  'Addis Ababa University',
  'National Palace',
  'African Union HQ',
  'Unity Park',
  'Holy Trinity Cathedral',
  'St. George Cathedral',
  'Merkato Market',
  'Ethiopian National Museum',
  'Red Terror Martyrs Memorial',
  'Friendship Park',
  'Bole Medhanealem',
  'Kazanchis',
  'Piazza',
  'Sarbet',
  'Ayat',
  'CMC',
  'Megenagna',
  'Sheraton Addis',
  'Hilton Addis Ababa',
  'Jupiter Hotel',
  'Edna Mall',
  'Century Mall',
];

export function CreateOrderModal({ onOrderCreated }: CreateOrderModalProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    itemName: '',
    itemDescription: '',
    weight: '',
    dimensions: '',
    pickupLocation: '',
    pickupContactName: '',
    pickupContactPhone: '',
    pickupContactEmail: '',
    dropoffLocation: '',
    dropoffContactName: '',
    dropoffContactPhone: '',
    dropoffContactEmail: '',
    specialInstructions: '',
    status: 'pending',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Reset form and close modal
    setFormData({
      itemName: '',
      itemDescription: '',
      weight: '',
      dimensions: '',
      pickupLocation: '',
      pickupContactName: '',
      pickupContactPhone: '',
      pickupContactEmail: '',
      dropoffLocation: '',
      dropoffContactName: '',
      dropoffContactPhone: '',
      dropoffContactEmail: '',
      specialInstructions: '',
      status: 'pending',
    });
    setIsSubmitting(false);
    setOpen(false);
    onOrderCreated?.();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#E4FF2C] text-[#0a0a0a] hover:bg-[#E4FF2C]/90 font-medium">
          <Plus className="w-4 h-4 mr-2" />
          Create New Order
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#141414] border-white/10 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Package className="w-6 h-6 text-[#E4FF2C]" />
            Create New Order
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8 mt-4">
          {/* Package Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Package className="w-5 h-5 text-[#E4FF2C]" />
              Package Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="itemName" className="text-white">
                  Item Name <span className="text-red-400">*</span>
                </Label>
                <Input
                  id="itemName"
                  placeholder="e.g., Electronics Pack A"
                  value={formData.itemName}
                  onChange={(e) => handleInputChange('itemName', e.target.value)}
                  required
                  className="bg-[#1a1a1a] border-white/10 text-white placeholder:text-white/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status" className="text-white">
                  Status
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange('status', value)}
                >
                  <SelectTrigger className="bg-[#1a1a1a] border-white/10 text-white">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1a] border-white/10">
                    {statusOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="text-white hover:bg-white/10"
                      >
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="itemDescription" className="text-white">
                Item Description
              </Label>
              <Textarea
                id="itemDescription"
                placeholder="Describe the item being shipped..."
                value={formData.itemDescription}
                onChange={(e) => handleInputChange('itemDescription', e.target.value)}
                className="bg-[#1a1a1a] border-white/10 text-white placeholder:text-white/30 min-h-[80px]"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="weight" className="text-white">
                  Weight (kg)
                </Label>
                <Input
                  id="weight"
                  type="number"
                  step="0.1"
                  placeholder="e.g., 12.5"
                  value={formData.weight}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  className="bg-[#1a1a1a] border-white/10 text-white placeholder:text-white/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dimensions" className="text-white">
                  Dimensions (L x W x H cm)
                </Label>
                <Input
                  id="dimensions"
                  placeholder="e.g., 40 x 30 x 25"
                  value={formData.dimensions}
                  onChange={(e) => handleInputChange('dimensions', e.target.value)}
                  className="bg-[#1a1a1a] border-white/10 text-white placeholder:text-white/30"
                />
              </div>
            </div>
          </div>

          {/* Pickup Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#E4FF2C]" />
              Pickup Information
            </h3>
            <div className="space-y-2">
              <Label htmlFor="pickupLocation" className="text-white">
                Pickup Location <span className="text-red-400">*</span>
              </Label>
              <Select
                value={formData.pickupLocation}
                onValueChange={(value) => handleInputChange('pickupLocation', value)}
              >
                <SelectTrigger className="bg-[#1a1a1a] border-white/10 text-white">
                  <SelectValue placeholder="Select pickup location in Addis Ababa..." />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-white/10 max-h-[300px]">
                  {ethiopiaLocations.map((location) => (
                    <SelectItem
                      key={location}
                      value={location}
                      className="text-white hover:bg-white/10"
                    >
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="pickupContactName" className="text-white">
                  Contact Name
                </Label>
                <Input
                  id="pickupContactName"
                  placeholder="e.g., Abebe Kebede"
                  value={formData.pickupContactName}
                  onChange={(e) => handleInputChange('pickupContactName', e.target.value)}
                  className="bg-[#1a1a1a] border-white/10 text-white placeholder:text-white/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pickupContactPhone" className="text-white">
                  Contact Phone
                </Label>
                <Input
                  id="pickupContactPhone"
                  type="tel"
                  placeholder="e.g., +251 911 234 567"
                  value={formData.pickupContactPhone}
                  onChange={(e) => handleInputChange('pickupContactPhone', e.target.value)}
                  className="bg-[#1a1a1a] border-white/10 text-white placeholder:text-white/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pickupContactEmail" className="text-white">
                  Contact Email
                </Label>
                <Input
                  id="pickupContactEmail"
                  type="email"
                  placeholder="e.g., abebe@example.com"
                  value={formData.pickupContactEmail}
                  onChange={(e) => handleInputChange('pickupContactEmail', e.target.value)}
                  className="bg-[#1a1a1a] border-white/10 text-white placeholder:text-white/30"
                />
              </div>
            </div>
          </div>

          {/* Dropoff Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#E4FF2C]" />
              Dropoff Information
            </h3>
            <div className="space-y-2">
              <Label htmlFor="dropoffLocation" className="text-white">
                Dropoff Location <span className="text-red-400">*</span>
              </Label>
              <Select
                value={formData.dropoffLocation}
                onValueChange={(value) => handleInputChange('dropoffLocation', value)}
              >
                <SelectTrigger className="bg-[#1a1a1a] border-white/10 text-white">
                  <SelectValue placeholder="Select dropoff location in Addis Ababa..." />
                </SelectTrigger>
                <SelectContent className="bg-[#1a1a1a] border-white/10 max-h-[300px]">
                  {ethiopiaLocations.map((location) => (
                    <SelectItem
                      key={location}
                      value={location}
                      className="text-white hover:bg-white/10"
                    >
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dropoffContactName" className="text-white">
                  Contact Name
                </Label>
                <Input
                  id="dropoffContactName"
                  placeholder="e.g., Tigist Haile"
                  value={formData.dropoffContactName}
                  onChange={(e) => handleInputChange('dropoffContactName', e.target.value)}
                  className="bg-[#1a1a1a] border-white/10 text-white placeholder:text-white/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dropoffContactPhone" className="text-white">
                  Contact Phone
                </Label>
                <Input
                  id="dropoffContactPhone"
                  type="tel"
                  placeholder="e.g., +251 922 345 678"
                  value={formData.dropoffContactPhone}
                  onChange={(e) => handleInputChange('dropoffContactPhone', e.target.value)}
                  className="bg-[#1a1a1a] border-white/10 text-white placeholder:text-white/30"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dropoffContactEmail" className="text-white">
                  Contact Email
                </Label>
                <Input
                  id="dropoffContactEmail"
                  type="email"
                  placeholder="e.g., tigist@example.com"
                  value={formData.dropoffContactEmail}
                  onChange={(e) => handleInputChange('dropoffContactEmail', e.target.value)}
                  className="bg-[#1a1a1a] border-white/10 text-white placeholder:text-white/30"
                />
              </div>
            </div>
          </div>

          {/* Special Instructions */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <User className="w-5 h-5 text-[#E4FF2C]" />
              Additional Information
            </h3>
            <div className="space-y-2">
              <Label htmlFor="specialInstructions" className="text-white">
                Special Instructions
              </Label>
              <Textarea
                id="specialInstructions"
                placeholder="Any special handling instructions, delivery preferences, etc..."
                value={formData.specialInstructions}
                onChange={(e) => handleInputChange('specialInstructions', e.target.value)}
                className="bg-[#1a1a1a] border-white/10 text-white placeholder:text-white/30 min-h-[100px]"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="border-white/20 text-white hover:bg-white/10"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#E4FF2C] text-[#0a0a0a] hover:bg-[#E4FF2C]/90 font-medium"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-[#0a0a0a] border-t-transparent" />
                  Creating...
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Order
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
