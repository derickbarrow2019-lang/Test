import { useState } from 'react';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { 
  MapPin, 
  Package, 
  Clock, 
  Phone, 
  Check, 
  X, 
  Truck, 
  LogOut, 
  User, 
  DollarSign, 
  Calendar,
  ChevronLeft
} from 'lucide-react';
import type { Order, OrderStatus } from '@/types';

export function AdminPage() {
  const { orders, updateOrderStatus, currentUser, userType, logout, setCurrentPage } = useStore();
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('pending');

  // Redirect if not logged in as driver
  if (!currentUser || userType !== 'driver') {
    return (
      <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center p-8">
          <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <Truck className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-xl font-bold text-[#1A1A1A] mb-2">Driver Access Only</h2>
          <p className="text-[#666666] mb-6">Please sign in as a driver to access the dashboard.</p>
          <Button 
            onClick={() => setCurrentPage('login')}
            className="gradient-green text-white"
          >
            Driver Login
          </Button>
        </Card>
      </div>
    );
  }

  const driver = currentUser as { id: string; name: string; phone: string; vehicleType: string; vehicleNumber: string };

  const handleAcceptOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'accepted');
    setShowOrderDialog(false);
    setSelectedOrder(null);
  };

  const handleRejectOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'rejected');
    setShowOrderDialog(false);
    setSelectedOrder(null);
  };

  const handleCompleteOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'delivered');
    setShowOrderDialog(false);
    setSelectedOrder(null);
  };

  const openOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderDialog(true);
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-50 text-amber-600 border-amber-200';
      case 'accepted':
        return 'bg-blue-50 text-blue-600 border-blue-200';
      case 'delivered':
        return 'bg-emerald-50 text-emerald-600 border-emerald-200';
      case 'rejected':
        return 'bg-red-50 text-red-600 border-red-200';
      default:
        return 'bg-gray-50 text-gray-600 border-gray-200';
    }
  };

  const pendingOrders = orders.filter(o => o.status === 'pending');
  const activeOrders = orders.filter(o => o.status === 'accepted' && o.driverId === driver.id);
  const completedOrders = orders.filter(o => 
    (o.status === 'delivered' || o.status === 'rejected') && o.driverId === driver.id
  );

  const myEarnings = orders
    .filter(o => o.status === 'delivered' && o.driverId === driver.id)
    .reduce((sum, o) => sum + o.estimatedPrice, 0);

  const todayDeliveries = orders.filter(o => {
    if (o.status !== 'delivered' || o.driverId !== driver.id) return false;
    const deliveredDate = new Date(o.deliveredAt || '').toDateString();
    return deliveredDate === new Date().toDateString();
  }).length;

  const renderOrderCard = (order: Order, showActions: boolean = false) => (
    <Card 
      key={order.id} 
      className="shadow-card hover:shadow-card-hover transition-shadow cursor-pointer"
      onClick={() => openOrderDetails(order)}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-sm text-[#666666]">Order ID</div>
            <div className="font-bold text-[#1A1A1A]">{order.id}</div>
          </div>
          <div className={`px-3 py-1 rounded-full border text-xs font-medium capitalize ${getStatusColor(order.status)}`}>
            {order.status}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-[#00D09C] mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <span className="text-[#666666]">From:</span>{' '}
              <span className="text-[#1A1A1A]">{order.pickupLocation}</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-[#00D09C] mt-0.5 flex-shrink-0" />
            <div className="text-sm">
              <span className="text-[#666666]">To:</span>{' '}
              <span className="text-[#1A1A1A]">{order.dropoffLocation}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Package className="w-4 h-4 text-[#00D09C] flex-shrink-0" />
            <div className="text-sm text-[#1A1A1A] capitalize">
              {order.packageDetails.size} - {order.packageDetails.type}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="w-4 h-4 text-[#00D09C] flex-shrink-0" />
            <div className="text-sm text-[#1A1A1A]">
              {order.deliveryTime === 'now' ? 'ASAP' : 'Scheduled'}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          <div className="text-lg font-bold text-[#00D09C]">AED {order.estimatedPrice}</div>
          {showActions && order.status === 'pending' && (
            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleRejectOrder(order.id)}
                className="border-red-200 text-red-600 hover:bg-red-50"
              >
                <X className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                onClick={() => handleAcceptOrder(order.id)}
                className="gradient-green text-white"
              >
                <Check className="w-4 h-4" />
              </Button>
            </div>
          )}
          {order.status === 'accepted' && order.driverId === driver.id && (
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleCompleteOrder(order.id);
              }}
              className="gradient-green text-white"
            >
              <Check className="w-4 h-4 mr-1" />
              Complete
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setCurrentPage('home')}
                className="rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <div className="w-10 h-10 rounded-full gradient-green flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 
                  className="font-bold text-[#1A1A1A]"
                  style={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Driver Dashboard
                </h1>
                <p className="text-xs text-[#666666]">{driver.name}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E6F9F3] flex items-center justify-center">
                  <Package className="w-5 h-5 text-[#00D09C]" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#1A1A1A]">{pendingOrders.length}</div>
                  <div className="text-xs text-[#666666]">Pending</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                  <Truck className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#1A1A1A]">{activeOrders.length}</div>
                  <div className="text-xs text-[#666666]">My Active</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center">
                  <Check className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#1A1A1A]">{todayDeliveries}</div>
                  <div className="text-xs text-[#666666]">Today</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#1A1A1A]">AED {myEarnings}</div>
                  <div className="text-xs text-[#666666]">My Earnings</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="pending" className="relative">
              Available
              {pendingOrders.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-white text-xs rounded-full flex items-center justify-center">
                  {pendingOrders.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="active">My Active</TabsTrigger>
            <TabsTrigger value="completed">My History</TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingOrders.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-[#1A1A1A]">No pending orders</h3>
                <p className="text-[#666666]">New orders will appear here</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {pendingOrders.map(order => renderOrderCard(order, true))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            {activeOrders.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-[#1A1A1A]">No active deliveries</h3>
                <p className="text-[#666666]">Accept orders to see them here</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {activeOrders.map(order => renderOrderCard(order, true))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedOrders.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-[#1A1A1A]">No completed orders</h3>
                <p className="text-[#666666]">Your delivery history will appear here</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {completedOrders.map(order => renderOrderCard(order))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Order Details Dialog */}
      <Dialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
        <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Order {selectedOrder?.id}
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-4">
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium capitalize ${getStatusColor(selectedOrder.status)}`}>
                {selectedOrder.status}
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-[#00D09C] mt-0.5" />
                  <div>
                    <div className="text-sm text-[#666666]">Customer</div>
                    <div className="font-medium">{selectedOrder.customerName}</div>
                    <div className="text-sm text-[#666666]">{selectedOrder.customerPhone}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#00D09C] mt-0.5" />
                  <div>
                    <div className="text-sm text-[#666666]">Pickup</div>
                    <div className="font-medium">{selectedOrder.pickupLocation}</div>
                    <div className="text-sm text-[#666666]">{selectedOrder.pickupAddress}</div>
                    {selectedOrder.pickupPhone && (
                      <div className="text-sm flex items-center gap-1 mt-1">
                        <Phone className="w-3 h-3" />
                        {selectedOrder.pickupPhone}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#00D09C] mt-0.5" />
                  <div>
                    <div className="text-sm text-[#666666]">Drop-off</div>
                    <div className="font-medium">{selectedOrder.dropoffLocation}</div>
                    <div className="text-sm text-[#666666]">{selectedOrder.dropoffAddress}</div>
                    {selectedOrder.dropoffPhone && (
                      <div className="text-sm flex items-center gap-1 mt-1">
                        <Phone className="w-3 h-3" />
                        {selectedOrder.dropoffPhone}
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Package className="w-5 h-5 text-[#00D09C] mt-0.5" />
                  <div>
                    <div className="text-sm text-[#666666]">Package</div>
                    <div className="font-medium capitalize">
                      {selectedOrder.packageDetails.size} - {selectedOrder.packageDetails.type}
                    </div>
                    {selectedOrder.packageDetails.description && (
                      <div className="text-sm text-[#666666]">{selectedOrder.packageDetails.description}</div>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#00D09C] mt-0.5" />
                  <div>
                    <div className="text-sm text-[#666666]">Delivery Time</div>
                    <div className="font-medium">
                      {selectedOrder.deliveryTime === 'now' ? 'ASAP' : `${selectedOrder.scheduledDate} ${selectedOrder.scheduledTime}`}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-[#00D09C] mt-0.5" />
                  <div>
                    <div className="text-sm text-[#666666]">Order Date</div>
                    <div className="font-medium">
                      {new Date(selectedOrder.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#666666]">Total Price</span>
                  <span className="text-2xl font-bold text-[#00D09C]">AED {selectedOrder.estimatedPrice}</span>
                </div>
              </div>

              {/* Action Buttons */}
              {selectedOrder.status === 'pending' && (
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => handleRejectOrder(selectedOrder.id)}
                    className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                  <Button
                    onClick={() => handleAcceptOrder(selectedOrder.id)}
                    className="flex-1 gradient-green text-white"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Accept
                  </Button>
                </div>
              )}

              {selectedOrder.status === 'accepted' && selectedOrder.driverId === driver.id && (
                <Button
                  onClick={() => handleCompleteOrder(selectedOrder.id)}
                  className="w-full gradient-green text-white"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Mark as Delivered
                </Button>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
