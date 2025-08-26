"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  Package,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  Calendar,
  MapPin,
  CreditCard,
  Phone,
  Mail,
  ArrowRight,
  Home,
  ShoppingBag,
} from "lucide-react";

// Order interfaces
interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  sku?: string;
  category?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: OrderItem[];
  orderDate: string;
  estimatedDelivery?: string;
  shippingAddress: string;
  billingAddress?: string;
  paymentMethod?: string;
  paymentStatus?: "pending" | "paid" | "failed" | "refunded";
  trackingNumber?: string;
  subtotal?: number;
  shippingCost?: number;
  tax?: number;
  discount?: number;
  deliveryInstructions?: string;
  timeline?: TimelineEvent[];
}

interface TimelineEvent {
  id: string;
  status: string;
  title: string;
  description: string;
  timestamp: string;
  location?: string;
  icon: typeof Clock;
}

// Enhanced sample order data with detailed timelines
const sampleOrders: Record<string, Order> = {
  "ORD-2024-001": {
    id: "ORD001",
    orderNumber: "ORD-2024-001",
    customerName: "John Smith",
    customerEmail: "john.smith@email.com",
    customerPhone: "+1 (555) 123-4567",
    total: 2599,
    status: "processing",
    items: [
      {
        id: "59972101",
        name: "Mattai Reclaimed Wood 4Dwr Console",
        price: 1599,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1494947665470-20322015e3a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        sku: "MW-4DWR-001",
        category: "Console Tables",
      },
      {
        id: "59972102",
        name: "Modern Oak Dining Table",
        price: 1000,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1549497538-303791108f95?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        sku: "OAK-DT-002",
        category: "Dining Tables",
      },
    ],
    orderDate: "2024-01-15",
    estimatedDelivery: "2024-01-25",
    shippingAddress: "123 Main St, New York, NY 10001",
    billingAddress: "123 Main St, New York, NY 10001",
    paymentMethod: "Credit Card ending in 4242",
    paymentStatus: "paid",
    trackingNumber: "1Z999AA1234567890",
    subtotal: 2599,
    shippingCost: 0,
    tax: 208,
    discount: 0,
    deliveryInstructions:
      "Please call before delivery and use the side entrance.",
    timeline: [
      {
        id: "1",
        status: "placed",
        title: "Order Placed",
        description:
          "Your order has been successfully placed and payment confirmed.",
        timestamp: "2024-01-15T10:30:00Z",
        icon: CheckCircle,
      },
      {
        id: "2",
        status: "confirmed",
        title: "Order Confirmed",
        description: "Payment processed and order details verified.",
        timestamp: "2024-01-15T11:00:00Z",
        icon: CheckCircle,
      },
      {
        id: "3",
        status: "processing",
        title: "In Production",
        description:
          "Your handcrafted furniture is being prepared by our artisans.",
        timestamp: "2024-01-16T09:00:00Z",
        location: "Furniture Workshop, Austin TX",
        icon: Package,
      },
    ],
  },
  "ORD-2024-002": {
    id: "ORD002",
    orderNumber: "ORD-2024-002",
    customerName: "Sarah Johnson",
    customerEmail: "sarah.johnson@email.com",
    customerPhone: "+1 (555) 234-5678",
    total: 1299,
    status: "shipped",
    items: [
      {
        id: "59972104",
        name: "Vintage Leather Armchair",
        price: 1299,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        sku: "VL-AC-004",
        category: "Armchairs",
      },
    ],
    orderDate: "2024-01-14",
    estimatedDelivery: "2024-01-22",
    shippingAddress: "456 Oak Ave, Los Angeles, CA 90210",
    billingAddress: "456 Oak Ave, Los Angeles, CA 90210",
    paymentMethod: "Credit Card ending in 5555",
    paymentStatus: "paid",
    trackingNumber: "1Z999AA1234567891",
    subtotal: 1299,
    shippingCost: 0,
    tax: 104,
    discount: 50,
    timeline: [
      {
        id: "1",
        status: "placed",
        title: "Order Placed",
        description:
          "Your order has been successfully placed and payment confirmed.",
        timestamp: "2024-01-14T14:20:00Z",
        icon: CheckCircle,
      },
      {
        id: "2",
        status: "confirmed",
        title: "Order Confirmed",
        description: "Payment processed and order details verified.",
        timestamp: "2024-01-14T14:45:00Z",
        icon: CheckCircle,
      },
      {
        id: "3",
        status: "processing",
        title: "In Production",
        description: "Your handcrafted furniture was prepared by our artisans.",
        timestamp: "2024-01-15T08:00:00Z",
        location: "Furniture Workshop, Austin TX",
        icon: Package,
      },
      {
        id: "4",
        status: "shipped",
        title: "Out for Delivery",
        description:
          "Your order is on its way to you via white-glove delivery service.",
        timestamp: "2024-01-18T12:00:00Z",
        location: "Distribution Center, Dallas TX",
        icon: Truck,
      },
    ],
  },
  "ORD-2024-003": {
    id: "ORD003",
    orderNumber: "ORD-2024-003",
    customerName: "Michael Chen",
    customerEmail: "michael.chen@email.com",
    customerPhone: "+1 (555) 345-6789",
    total: 3299,
    status: "delivered",
    items: [
      {
        id: "59972105",
        name: "Ezra Reclaimed Wood 3Dwr Console Table",
        price: 1299,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        sku: "EZ-3DWT-001",
        category: "Console Tables",
      },
      {
        id: "59972106",
        name: "Rustic Dining Chair Set",
        price: 2000,
        quantity: 1,
        image:
          "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
        sku: "RDC-SET-004",
        category: "Dining Chairs",
      },
    ],
    orderDate: "2024-01-10",
    estimatedDelivery: "2024-01-20",
    shippingAddress: "789 Pine St, Seattle, WA 98101",
    billingAddress: "789 Pine St, Seattle, WA 98101",
    paymentMethod: "Credit Card ending in 7890",
    paymentStatus: "paid",
    trackingNumber: "1Z999AA1234567892",
    subtotal: 3299,
    shippingCost: 0,
    tax: 264,
    discount: 0,
    timeline: [
      {
        id: "1",
        status: "placed",
        title: "Order Placed",
        description:
          "Your order has been successfully placed and payment confirmed.",
        timestamp: "2024-01-10T16:15:00Z",
        icon: CheckCircle,
      },
      {
        id: "2",
        status: "confirmed",
        title: "Order Confirmed",
        description: "Payment processed and order details verified.",
        timestamp: "2024-01-10T16:30:00Z",
        icon: CheckCircle,
      },
      {
        id: "3",
        status: "processing",
        title: "In Production",
        description: "Your handcrafted furniture was prepared by our artisans.",
        timestamp: "2024-01-11T09:00:00Z",
        location: "Furniture Workshop, Austin TX",
        icon: Package,
      },
      {
        id: "4",
        status: "shipped",
        title: "Out for Delivery",
        description: "Your order was shipped via white-glove delivery service.",
        timestamp: "2024-01-17T10:30:00Z",
        location: "Distribution Center, Portland OR",
        icon: Truck,
      },
      {
        id: "5",
        status: "delivered",
        title: "Successfully Delivered",
        description: "Your order has been delivered and set up in your home.",
        timestamp: "2024-01-20T14:00:00Z",
        location: "789 Pine St, Seattle, WA 98101",
        icon: CheckCircle,
      },
    ],
  },
};

const statusConfig = {
  pending: {
    label: "Order Placed",
    icon: Clock,
    className: "bg-yellow-100 text-yellow-800 border-yellow-200",
    description: "Your order has been placed and is being processed.",
  },
  processing: {
    label: "In Production",
    icon: Package,
    className: "bg-blue-100 text-blue-800 border-blue-200",
    description: "Your order is being prepared for shipment.",
  },
  shipped: {
    label: "Shipped",
    icon: Truck,
    className: "bg-purple-100 text-purple-800 border-purple-200",
    description: "Your order is on the way to you.",
  },
  delivered: {
    label: "Delivered",
    icon: CheckCircle,
    className: "bg-green-100 text-green-800 border-green-200",
    description: "Your order has been delivered successfully.",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    className: "bg-red-100 text-red-800 border-red-200",
    description: "This order has been cancelled.",
  },
};

export default function OrderTrackingPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState("");

  const trackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) {
      setError("Please enter an order number");
      return;
    }

    setIsLoading(true);
    setError("");
    setHasSearched(true);

    // Simulate API call
    setTimeout(() => {
      const foundOrder = sampleOrders[orderNumber.trim().toUpperCase()];
      setOrder(foundOrder || null);
      setIsLoading(false);

      if (!foundOrder) {
        setError(
          "Order not found. Please check your order number and try again."
        );
      }
    }, 1000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const StatusIcon = order ? statusConfig[order.status].icon : Clock;

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-light text-gray-900 tracking-wider mb-4">
            TRACK YOUR ORDER
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enter your order number below to see the current status and tracking
            information for your furniture order.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <form onSubmit={trackOrder} className="max-w-md mx-auto">
            <div className="relative">
              <label
                htmlFor="orderNumber"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Order Number
              </label>
              <div className="flex">
                <input
                  type="text"
                  id="orderNumber"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="Enter order number (e.g., ORD-2024-001)"
                  className="flex-1 border border-gray-300 rounded-l-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="bg-gray-900 text-white px-6 py-3 rounded-r-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <Search className="h-5 w-5" />
                  )}
                </button>
              </div>
              {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
            </div>
          </form>
        </div>

        {/* Sample Order Numbers */}
        {!hasSearched && (
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-6 mb-8">
            <h3 className="text-lg font-medium text-blue-900 mb-3">
              Try these sample order numbers:
            </h3>
            <div className="flex flex-wrap gap-2">
              {Object.keys(sampleOrders).map((orderNum) => (
                <button
                  key={orderNum}
                  onClick={() => setOrderNumber(orderNum)}
                  className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-md text-sm hover:bg-blue-200 transition-colors"
                >
                  {orderNum}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Order Results */}
        {hasSearched && !isLoading && (
          <>
            {order ? (
              <div className="space-y-8">
                {/* Order Header */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="text-center">
                    <h2 className="text-3xl font-light text-gray-900 tracking-wider mb-2">
                      ORDER #{order.orderNumber}
                    </h2>
                    <p className="text-gray-600">
                      Placed on{" "}
                      {new Date(order.orderDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                {/* Current Status */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center justify-center mb-6">
                    <div
                      className={`inline-flex items-center px-6 py-3 text-lg font-semibold rounded-full border ${
                        statusConfig[order.status].className
                      }`}
                    >
                      <StatusIcon className="h-6 w-6 mr-3" />
                      {statusConfig[order.status].label}
                    </div>
                  </div>
                  <p className="text-center text-gray-600 mb-8">
                    {statusConfig[order.status].description}
                  </p>

                  {/* Progress Timeline */}
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      {Object.entries(statusConfig)
                        .filter(([key]) => key !== "cancelled")
                        .map(([key, config], index) => {
                          const isCompleted =
                            key === "pending" ||
                            (key === "processing" &&
                              ["processing", "shipped", "delivered"].includes(
                                order.status
                              )) ||
                            (key === "shipped" &&
                              ["shipped", "delivered"].includes(
                                order.status
                              )) ||
                            (key === "delivered" &&
                              order.status === "delivered");

                          const isCurrent = key === order.status;

                          return (
                            <div
                              key={key}
                              className="flex flex-col items-center"
                            >
                              <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                                  isCompleted
                                    ? "bg-green-100 border-green-500 text-green-600"
                                    : isCurrent
                                    ? "bg-blue-100 border-blue-500 text-blue-600"
                                    : "bg-gray-100 border-gray-300 text-gray-400"
                                }`}
                              >
                                <config.icon className="h-6 w-6" />
                              </div>
                              <span
                                className={`text-sm mt-2 font-medium ${
                                  isCompleted || isCurrent
                                    ? "text-gray-900"
                                    : "text-gray-500"
                                }`}
                              >
                                {config.label}
                              </span>
                            </div>
                          );
                        })}
                    </div>
                    <div className="absolute top-6 left-0 right-0 h-0.5 bg-gray-200 -z-10">
                      <div
                        className="h-full bg-green-500 transition-all duration-500"
                        style={{
                          width:
                            order.status === "pending"
                              ? "0%"
                              : order.status === "processing"
                              ? "33%"
                              : order.status === "shipped"
                              ? "66%"
                              : order.status === "delivered"
                              ? "100%"
                              : "0%",
                        }}
                      />
                    </div>
                  </div>

                  {/* Tracking Information */}
                  {order.trackingNumber && order.status === "shipped" && (
                    <div className="mt-8 p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-purple-900 mb-1">
                            Tracking Number
                          </h3>
                          <p className="text-sm text-purple-700 font-mono">
                            {order.trackingNumber}
                          </p>
                        </div>
                        <button className="text-purple-600 hover:text-purple-800 text-sm font-medium">
                          Track Package
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Expected Delivery */}
                  {order.estimatedDelivery && order.status !== "delivered" && (
                    <div className="mt-6 text-center">
                      <p className="text-sm text-gray-600">
                        Expected delivery:{" "}
                        <span className="font-medium text-gray-900">
                          {new Date(order.estimatedDelivery).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Detailed Timeline */}
                {order.timeline && order.timeline.length > 0 && (
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h2 className="text-xl font-light text-gray-900 tracking-wider">
                        ORDER TIMELINE
                      </h2>
                    </div>
                    <div className="p-6">
                      <div className="space-y-6">
                        {order.timeline.map((event, index) => {
                          const EventIcon = event.icon;
                          const isLastEvent =
                            index === order.timeline!.length - 1;

                          return (
                            <div key={event.id} className="relative">
                              <div className="flex items-start space-x-4">
                                <div className="flex-shrink-0 relative">
                                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center border-2 border-green-500">
                                    <EventIcon className="h-5 w-5 text-green-600" />
                                  </div>
                                  {!isLastEvent && (
                                    <div className="absolute top-10 left-1/2 w-0.5 h-8 bg-gray-200 transform -translate-x-1/2"></div>
                                  )}
                                </div>
                                <div className="flex-grow">
                                  <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-medium text-gray-900">
                                      {event.title}
                                    </h3>
                                    <span className="text-sm text-gray-500">
                                      {formatDate(event.timestamp)}
                                    </span>
                                  </div>
                                  <p className="text-gray-600 mt-1">
                                    {event.description}
                                  </p>
                                  {event.location && (
                                    <p className="text-sm text-gray-500 mt-1 flex items-center">
                                      <MapPin className="h-4 w-4 mr-1" />
                                      {event.location}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                )}

                {/* Order Items */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-xl font-light text-gray-900 tracking-wider">
                      ORDER ITEMS
                    </h2>
                  </div>
                  <div className="p-6">
                    <div className="space-y-6">
                      {order.items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center space-x-6 pb-6 border-b border-gray-200 last:border-b-0 last:pb-0"
                        >
                          <div className="flex-shrink-0">
                            <div className="w-24 h-24 relative bg-gray-100 rounded-lg overflow-hidden">
                              <Image
                                src={item.image}
                                alt={item.name}
                                fill
                                className="object-cover"
                                sizes="96px"
                              />
                            </div>
                          </div>
                          <div className="flex-grow">
                            <h3 className="text-lg font-light text-gray-900 mb-2">
                              {item.name}
                            </h3>
                            {item.sku && (
                              <p className="text-sm text-gray-500 mb-1">
                                Item# {item.sku}
                              </p>
                            )}
                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                              <span>Qty: {item.quantity}</span>
                              <span>•</span>
                              <span>${item.price.toLocaleString()} each</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-light text-gray-900">
                              ${(item.price * item.quantity).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Order Summary and Shipping */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Order Summary */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h2 className="text-xl font-light text-gray-900 tracking-wider">
                        ORDER SUMMARY
                      </h2>
                    </div>
                    <div className="p-6 space-y-4">
                      {order.subtotal && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Subtotal:</span>
                          <span className="text-gray-900">
                            ${order.subtotal.toLocaleString()}
                          </span>
                        </div>
                      )}

                      {order.discount && order.discount > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Discount:</span>
                          <span className="text-green-600">
                            -${order.discount.toLocaleString()}
                          </span>
                        </div>
                      )}

                      {order.shippingCost !== undefined && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Shipping:</span>
                          <span className="text-gray-900">
                            {order.shippingCost === 0
                              ? "Complimentary"
                              : `$${order.shippingCost.toLocaleString()}`}
                          </span>
                        </div>
                      )}

                      {order.tax && (
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Tax:</span>
                          <span className="text-gray-900">
                            ${order.tax.toLocaleString()}
                          </span>
                        </div>
                      )}

                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-medium text-gray-900">
                            Total:
                          </span>
                          <span className="text-xl font-light text-gray-900">
                            ${order.total.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Shipping Information */}
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h2 className="text-xl font-light text-gray-900 tracking-wider">
                        SHIPPING DETAILS
                      </h2>
                    </div>
                    <div className="p-6 space-y-6">
                      <div>
                        <div className="flex items-center mb-3">
                          <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                          <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                            Delivery Address
                          </h3>
                        </div>
                        <p className="text-gray-900 leading-relaxed">
                          {order.shippingAddress}
                        </p>
                        {order.deliveryInstructions && (
                          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-800">
                              <span className="font-medium">
                                Delivery Instructions:
                              </span>{" "}
                              {order.deliveryInstructions}
                            </p>
                          </div>
                        )}
                      </div>

                      {order.paymentMethod && (
                        <div>
                          <div className="flex items-center mb-3">
                            <CreditCard className="h-5 w-5 text-gray-400 mr-2" />
                            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">
                              Payment Method
                            </h3>
                          </div>
                          <p className="text-gray-900">{order.paymentMethod}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="text-center space-y-4 lg:space-y-0 lg:space-x-6 lg:flex lg:justify-center">
                    <Link
                      href="/products"
                      className="inline-flex items-center w-full lg:w-auto justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium tracking-wider hover:bg-gray-50 transition-colors"
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      CONTINUE SHOPPING
                    </Link>

                    <Link
                      href="/"
                      className="inline-flex items-center w-full lg:w-auto justify-center bg-gray-900 text-white px-6 py-3 font-medium tracking-wider hover:bg-gray-800 transition-colors"
                    >
                      <Home className="h-4 w-4 mr-2" />
                      BACK TO HOME
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
                <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Order Not Found
                </h2>
                <p className="text-gray-600 mb-6">
                  We couldn&apos;t find an order with the number &quot;
                  {orderNumber}&quot;. Please check your order number and try
                  again.
                </p>
                <div className="space-x-4">
                  <button
                    onClick={() => {
                      setOrderNumber("");
                      setHasSearched(false);
                      setError("");
                    }}
                    className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Try Again
                  </button>
                  <Link
                    href="/products"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            )}
          </>
        )}

        {/* Help Section */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <h3 className="text-xl font-light text-gray-900 tracking-wider mb-4">
              NEED HELP WITH YOUR ORDER?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our customer service team is here to help. Contact us if you have
              any questions about your order, delivery, or tracking.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-gray-600">
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>1-800-555-0123</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>orders@classichome.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
