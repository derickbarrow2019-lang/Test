import { useState } from 'react';
import { useStore, createOrderFromForm } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Package, Clock, ChevronLeft, ChevronRight, Calculator, Check, User } from 'lucide-react';
import type { BookingFormData, PackageSize, PackageType, DeliveryTime } from '@/types';

const packageSizes: { value: PackageSize; label: string; dimensions: string; price: number }[] = [
  { value: 'small', label: 'Small', dimensions: 'Up to 5kg, 30x30x30cm', price: 10 },
  { value: 'medium', label: 'Medium', dimensions: 'Up to 15kg, 50x50x50cm', price: 20 },
  { value: 'large', label: 'Large', dimensions: 'Up to 30kg, 80x80x80cm', price: 35 }
];

const packageTypes: { value: PackageType; label: string; icon: string; price: number }[] = [
  { value: 'documents', label: 'Documents', icon: '📄', price: 0 },
  { value: 'food', label: 'Food', icon: '🍔', price: 5 },
  { value: 'electronics', label: 'Electronics', icon: '📱', price: 15 },
  { value: 'clothes', label: 'Clothes', icon: '👕', price: 8 },
  { value: 'other', label: 'Other', icon: '📦', price: 10 }
];

// UAE Emirates
const uaeEmirates = [
  'Dubai',
  'Abu Dhabi',
  'Sharjah',
  'Ajman',
  'Ras Al Khaimah',
  'Fujairah',
  'Umm Al Quwain'
];

export function BookingPage() {
  const { setCurrentPage, addOrder, setCurrentOrder, currentUser, isAuthenticated, userType } = useStore();
  const [step, setStep] = useState(1);
  const [showPriceEstimate, setShowPriceEstimate] = useState(false);
  
  const [formData, setFormData] = useState<BookingFormData>({
    pickupLocation: '',
    pickupAddress: '',
    pickupPhone: '',
    dropoffLocation: '',
    dropoffAddress: '',
    dropoffPhone: '',
    packageDetails: {
      size: 'small',
      type: 'documents'
    },
    deliveryTime: 'now'
  });

  // Redirect if not logged in as customer
  if (!isAuthenticated || userType !== 'customer') {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center p-8">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-2">Please Sign In</h2>
          <p className="text-[#666666] mb-6">You need to be logged in as a customer to book a delivery.</p>
          <Button 
            onClick={() => setCurrentPage('login')}
            className="gradient-green text-white"
          >
            Sign In
          </Button>
        </Card>
      </div>
    );
  }

  const customer = currentUser as { id: string; name: string; phone: string };

  const calculatePrice = () => {
    const basePrice = 25; // AED
    const sizeCharge = packageSizes.find(s => s.value === formData.packageDetails.size)?.price || 0;
    const typeCharge = packageTypes.find(t => t.value === formData.packageDetails.type)?.price || 0;
    return basePrice + sizeCharge + typeCharge;
  };

  const handleInputChange = (field: keyof BookingFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePackageDetailChange = (field: keyof BookingFormData['packageDetails'], value: any) => {
    setFormData(prev => ({
      ...prev,
      packageDetails: { ...prev.packageDetails, [field]: value }
    }));
  };

  const handleSubmit = () => {
    const orderData = createOrderFromForm(formData, customer.name, customer.phone);
    const order = addOrder(orderData, customer.id);
    setCurrentOrder(order);
    setCurrentPage('confirmation');
  };

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.pickupLocation && formData.pickupAddress;
      case 2:
        return formData.dropoffLocation && formData.dropoffAddress;
      case 3:
        return true;
      default:
        return false;
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-8">
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
              s === step
                ? 'gradient-green text-white'
                : s < step
                ? 'bg-[#00D09C] text-white'
                : 'bg-gray-200 text-gray-500'
            }`}
          >
            {s < step ? <Check className="w-4 h-4" /> : s}
          </div>
          {s < 3 && (
            <div
              className={`w-12 h-1 mx-1 transition-colors ${
                s < step ? 'bg-[#00D09C]' : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-[#E6F9F3] flex items-center justify-center">
          <MapPin className="w-5 h-5 text-[#00D09C]" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#1A1A1A]">Pickup Details</h3>
          <p className="text-sm text-[#666666]">Where should we pick up your package?</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="pickupEmirate">Emirate *</Label>
          <Select
            value={formData.pickupLocation}
            onValueChange={(value) => handleInputChange('pickupLocation', value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select emirate" />
            </SelectTrigger>
            <SelectContent>
              {uaeEmirates.map((emirate) => (
                <SelectItem key={emirate} value={emirate}>
                  {emirate}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="pickupAddress">Full Address *</Label>
          <Textarea
            id="pickupAddress"
            placeholder="Building name, street, area, near landmark"
            value={formData.pickupAddress}
            onChange={(e) => handleInputChange('pickupAddress', e.target.value)}
            className="mt-1"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="pickupPhone">Contact Phone (Optional)</Label>
          <Input
            id="pickupPhone"
            type="tel"
            placeholder="+971 50 123 4567"
            value={formData.pickupPhone}
            onChange={(e) => handleInputChange('pickupPhone', e.target.value)}
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-[#E6F9F3] flex items-center justify-center">
          <MapPin className="w-5 h-5 text-[#00D09C]" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#1A1A1A]">Drop-off Details</h3>
          <p className="text-sm text-[#666666]">Where should we deliver your package?</p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="dropoffEmirate">Emirate *</Label>
          <Select
            value={formData.dropoffLocation}
            onValueChange={(value) => handleInputChange('dropoffLocation', value)}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select emirate" />
            </SelectTrigger>
            <SelectContent>
              {uaeEmirates.map((emirate) => (
                <SelectItem key={emirate} value={emirate}>
                  {emirate}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="dropoffAddress">Full Address *</Label>
          <Textarea
            id="dropoffAddress"
            placeholder="Building name, street, area, near landmark"
            value={formData.dropoffAddress}
            onChange={(e) => handleInputChange('dropoffAddress', e.target.value)}
            className="mt-1"
            rows={3}
          />
        </div>

        <div>
          <Label htmlFor="dropoffPhone">Contact Phone (Optional)</Label>
          <Input
            id="dropoffPhone"
            type="tel"
            placeholder="+971 50 123 4567"
            value={formData.dropoffPhone}
            onChange={(e) => handleInputChange('dropoffPhone', e.target.value)}
            className="mt-1"
          />
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-[#E6F9F3] flex items-center justify-center">
          <Package className="w-5 h-5 text-[#00D09C]" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#1A1A1A]">Package & Delivery</h3>
          <p className="text-sm text-[#666666]">Tell us about your package</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="mb-3 block">Package Size</Label>
          <RadioGroup
            value={formData.packageDetails.size}
            onValueChange={(value) => handlePackageDetailChange('size', value as PackageSize)}
            className="grid grid-cols-3 gap-3"
          >
            {packageSizes.map((size) => (
              <div key={size.value}>
                <RadioGroupItem
                  value={size.value}
                  id={size.value}
                  className="peer sr-only"
                />
                <Label
                  htmlFor={size.value}
                  className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer transition-all peer-data-[state=checked]:border-[#00D09C] peer-data-[state=checked]:bg-[#E6F9F3] hover:border-[#00D09C]/50"
                >
                  <Package className="w-6 h-6 mb-2 text-[#00D09C]" />
                  <span className="font-medium text-sm">{size.label}</span>
                  <span className="text-xs text-[#666666] text-center mt-1">{size.dimensions}</span>
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div>
          <Label className="mb-3 block">Package Type</Label>
          <Select
            value={formData.packageDetails.type}
            onValueChange={(value) => handlePackageDetailChange('type', value as PackageType)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select package type" />
            </SelectTrigger>
            <SelectContent>
              {packageTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  <span className="flex items-center gap-2">
                    <span>{type.icon}</span>
                    <span>{type.label}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="description" className="mb-2 block">Description (Optional)</Label>
          <Textarea
            id="description"
            placeholder="Any special instructions or details about the package"
            value={formData.packageDetails.description || ''}
            onChange={(e) => handlePackageDetailChange('description', e.target.value)}
            rows={2}
          />
        </div>

        <div>
          <Label className="mb-3 block">Delivery Time</Label>
          <RadioGroup
            value={formData.deliveryTime}
            onValueChange={(value) => handleInputChange('deliveryTime', value as DeliveryTime)}
            className="grid grid-cols-2 gap-3"
          >
            <div>
              <RadioGroupItem
                value="now"
                id="now"
                className="peer sr-only"
              />
              <Label
                htmlFor="now"
                className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer transition-all peer-data-[state=checked]:border-[#00D09C] peer-data-[state=checked]:bg-[#E6F9F3] hover:border-[#00D09C]/50"
              >
                <Clock className="w-6 h-6 mb-2 text-[#00D09C]" />
                <span className="font-medium">Deliver Now</span>
                <span className="text-xs text-[#666666]">ASAP</span>
              </Label>
            </div>
            <div>
              <RadioGroupItem
                value="scheduled"
                id="scheduled"
                className="peer sr-only"
              />
              <Label
                htmlFor="scheduled"
                className="flex flex-col items-center p-4 border-2 border-gray-200 rounded-xl cursor-pointer transition-all peer-data-[state=checked]:border-[#00D09C] peer-data-[state=checked]:bg-[#E6F9F3] hover:border-[#00D09C]/50"
              >
                <Clock className="w-6 h-6 mb-2 text-[#00D09C]" />
                <span className="font-medium">Schedule</span>
                <span className="text-xs text-[#666666]">Pick a time</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {formData.deliveryTime === 'scheduled' && (
          <div className="grid grid-cols-2 gap-4 animate-fade-in">
            <div>
              <Label htmlFor="scheduledDate">Date</Label>
              <Input
                id="scheduledDate"
                type="date"
                value={formData.scheduledDate || ''}
                onChange={(e) => handleInputChange('scheduledDate', e.target.value)}
                className="mt-1"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div>
              <Label htmlFor="scheduledTime">Time</Label>
              <Input
                id="scheduledTime"
                type="time"
                value={formData.scheduledTime || ''}
                onChange={(e) => handleInputChange('scheduledTime', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>
        )}

        {/* Price Summary */}
        <Card className="bg-[#E6F9F3]/30 border-[#00D09C]/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-[#666666]">Estimated Total</div>
                <div className="text-2xl font-bold text-[#00D09C]">AED {calculatePrice()}</div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPriceEstimate(!showPriceEstimate)}
                className="text-[#00D09C]"
              >
                <Calculator className="w-4 h-4 mr-1" />
                {showPriceEstimate ? 'Hide' : 'Details'}
              </Button>
            </div>
            
            {showPriceEstimate && (
              <div className="mt-4 pt-4 border-t border-[#00D09C]/20 space-y-2 text-sm animate-fade-in">
                <div className="flex justify-between">
                  <span className="text-[#666666]">Base Price:</span>
                  <span>AED 25</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">Size Charge:</span>
                  <span>AED {packageSizes.find(s => s.value === formData.packageDetails.size)?.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666666]">Type Charge:</span>
                  <span>AED {packageTypes.find(t => t.value === formData.packageDetails.type)?.price}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => step === 1 ? setCurrentPage('home') : setStep(step - 1)}
            className="rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <h1 
            className="text-xl font-bold text-[#1A1A1A]"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Book Delivery
          </h1>
        </div>

        {renderStepIndicator()}

        <Card className="shadow-card">
          <CardContent className="p-6">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                  className="flex-1"
                >
                  Back
                </Button>
              )}
              {step < 3 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={!isStepValid()}
                  className="flex-1 gradient-green text-white hover:opacity-90"
                >
                  Continue
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="flex-1 gradient-green text-white hover:opacity-90"
                >
                  Book Now
                  <Check className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
