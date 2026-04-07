import { useEffect } from 'react';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Check, MapPin, Package, Clock, Phone, ChevronLeft, Home, Truck } from 'lucide-react';

export function ConfirmationPage() {
  const { currentOrder, setCurrentPage } = useStore();

  useEffect(() => {
    if (!currentOrder) {
      setCurrentPage('home');
    }
  }, [currentOrder, setCurrentPage]);

  if (!currentOrder) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'accepted':
        return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'delivered':
        return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Success Animation */}
        <div className="text-center mb-8 animate-scale-in">
          <div className="w-20 h-20 rounded-full gradient-green flex items-center justify-center mx-auto mb-4 animate-pulse-green">
            <Check className="w-10 h-10 text-white" />
          </div>
          <h1 
            className="text-2xl font-bold text-[#1A1A1A] mb-2"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Booking Confirmed!
          </h1>
          <p className="text-[#666666]">
            Your order has been placed successfully. We're finding the nearest driver.
          </p>
        </div>

        {/* Order ID */}
        <Card className="mb-6 shadow-card">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-[#666666]">Order ID</div>
                <div className="text-xl font-bold text-[#1A1A1A]">{currentOrder.id}</div>
              </div>
              <div className={`px-4 py-2 rounded-full border text-sm font-medium capitalize ${getStatusColor(currentOrder.status)}`}>
                {currentOrder.status}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Order Details */}
        <Card className="mb-6 shadow-card">
          <CardContent className="p-6 space-y-6">
            {/* Pickup */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#E6F9F3] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[#00D09C]" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-[#666666]">Pickup Location</div>
                <div className="font-medium text-[#1A1A1A]">{currentOrder.pickupLocation}</div>
                <div className="text-sm text-[#666666]">{currentOrder.pickupAddress}</div>
                {currentOrder.pickupPhone && (
                  <div className="flex items-center gap-2 mt-1 text-sm text-[#666666]">
                    <Phone className="w-3 h-3" />
                    {currentOrder.pickupPhone}
                  </div>
                )}
              </div>
            </div>

            <div className="border-l-2 border-dashed border-gray-200 ml-5 h-6" />

            {/* Drop-off */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-[#E6F9F3] flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[#00D09C]" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-[#666666]">Drop-off Location</div>
                <div className="font-medium text-[#1A1A1A]">{currentOrder.dropoffLocation}</div>
                <div className="text-sm text-[#666666]">{currentOrder.dropoffAddress}</div>
                {currentOrder.dropoffPhone && (
                  <div className="flex items-center gap-2 mt-1 text-sm text-[#666666]">
                    <Phone className="w-3 h-3" />
                    {currentOrder.dropoffPhone}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Package & Delivery Info */}
        <Card className="mb-6 shadow-card">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E6F9F3] flex items-center justify-center flex-shrink-0">
                  <Package className="w-5 h-5 text-[#00D09C]" />
                </div>
                <div>
                  <div className="text-sm text-[#666666]">Package</div>
                  <div className="font-medium text-[#1A1A1A] capitalize">
                    {currentOrder.packageDetails.size} - {currentOrder.packageDetails.type}
                  </div>
                  {currentOrder.packageDetails.description && (
                    <div className="text-sm text-[#666666]">{currentOrder.packageDetails.description}</div>
                  )}
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E6F9F3] flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-[#00D09C]" />
                </div>
                <div>
                  <div className="text-sm text-[#666666]">Delivery Time</div>
                  <div className="font-medium text-[#1A1A1A]">
                    {currentOrder.deliveryTime === 'now' ? 'ASAP' : 'Scheduled'}
                  </div>
                  {currentOrder.scheduledDate && (
                    <div className="text-sm text-[#666666]">
                      {currentOrder.scheduledDate} {currentOrder.scheduledTime}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Price */}
        <Card className="mb-6 shadow-card border-[#00D09C]/20 bg-[#E6F9F3]/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-[#666666]">Estimated Price</div>
                <div className="text-3xl font-bold text-[#00D09C]">AED {currentOrder.estimatedPrice}</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-[#666666]">Payment</div>
                <div className="font-medium text-[#1A1A1A]">Cash on Delivery</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* WhatsApp Notification Info */}
        <div className="bg-blue-50 rounded-xl p-4 mb-6 flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          <div>
            <div className="font-medium text-blue-900">WhatsApp Notification Sent</div>
            <div className="text-sm text-blue-700">
              We've notified our driver via WhatsApp. You'll receive updates on your order status.
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={() => setCurrentPage('tracking')}
            className="w-full gradient-green text-white hover:opacity-90"
          >
            <Truck className="w-5 h-5 mr-2" />
            Track Your Order
            <ChevronLeft className="w-5 h-5 ml-2 rotate-180" />
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setCurrentPage('home')}
            className="w-full border-[#E5E5E5]"
          >
            <Home className="w-5 h-5 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
