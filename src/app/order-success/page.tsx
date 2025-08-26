"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Truck, Calendar, CreditCard } from "lucide-react";

// Mock order data - in a real app, this would come from the backend
interface OrderItem {
  id: string;
  name: string;
  image: string;
  quantity: number;
  price: number;
  sku: string;
}

interface OrderDetails {
  orderNumber: string;
  orderDate: string;
  estimatedDelivery: string;
  subtotal: number;
  memberSavings: number;
  total: number;
  items: OrderItem[];
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
  };
  paymentMethod: string;
}

const OrderSuccessPage = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  useEffect(() => {
    // Mock order data - in real app, get from URL params or API
    const mockOrder: OrderDetails = {
      orderNumber: "RH" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      orderDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      estimatedDelivery: "December 15-20, 2024",
      subtotal: 3598,
      memberSavings: 1079,
      total: 2519,
      items: [
        {
          id: "1",
          name: "Ezra Reclaimed Wood 3Dwr Console Table",
          image:
            "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          quantity: 1,
          price: 1299,
          sku: "RH-EZ3DWT-001",
        },
        {
          id: "2",
          name: "Mattai Reclaimed Wood 4Dwr Console",
          image:
            "https://images.unsplash.com/photo-1494947665470-20322015e3a8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          quantity: 1,
          price: 1599,
          sku: "RH-MT4DWC-002",
        },
        {
          id: "3",
          name: "Itsa Reclaimed Wood Bench",
          image:
            "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
          quantity: 1,
          price: 799,
          sku: "RH-ITRWB-003",
        },
      ],
      shippingAddress: {
        name: "John Smith",
        street: "123 Main Street",
        city: "San Francisco",
        state: "CA",
        zip: "94105",
      },
      paymentMethod: "•••• •••• •••• 4242",
    };

    setOrderDetails(mockOrder);
  }, []);

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <h1 className="text-4xl font-light text-gray-900 tracking-wider mb-4">
            ORDER CONFIRMED
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Thank you for your order!
          </p>
          <p className="text-gray-500">
            A confirmation email has been sent to your email address.
          </p>
        </div>

        {/* Order Summary Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Order Number */}
          <div className="bg-white border border-gray-200 p-6 text-center">
            <div className="flex justify-center mb-4">
              <CreditCard className="h-8 w-8 text-gray-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
              Order Number
            </h3>
            <p className="text-xl font-light text-gray-900 tracking-wider">
              {orderDetails.orderNumber}
            </p>
          </div>

          {/* Order Date */}
          <div className="bg-white border border-gray-200 p-6 text-center">
            <div className="flex justify-center mb-4">
              <Calendar className="h-8 w-8 text-gray-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
              Order Date
            </h3>
            <p className="text-xl font-light text-gray-900">
              {orderDetails.orderDate}
            </p>
          </div>

          {/* Estimated Delivery */}
          <div className="bg-white border border-gray-200 p-6 text-center">
            <div className="flex justify-center mb-4">
              <Truck className="h-8 w-8 text-gray-600" />
            </div>
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
              Estimated Delivery
            </h3>
            <p className="text-xl font-light text-gray-900">
              {orderDetails.estimatedDelivery}
            </p>
          </div>
        </div>

        {/* Order Items */}
        <div className="bg-white border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-light text-gray-900 tracking-wider mb-8">
            ORDER DETAILS
          </h2>

          <div className="space-y-6">
            {orderDetails.items.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-6 pb-6 border-b border-gray-200 last:border-b-0"
              >
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 relative bg-gray-100">
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
                  <h3 className="text-lg font-light text-gray-900 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-1">Item# {item.sku}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>

                <div className="text-right">
                  <p className="text-lg font-light text-gray-900">
                    ${item.price.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary & Shipping Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Order Summary */}
          <div className="bg-white border border-gray-200 p-8">
            <h3 className="text-xl font-light text-gray-900 tracking-wider mb-6">
              ORDER SUMMARY
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subtotal:</span>
                <span className="text-gray-900">
                  ${orderDetails.subtotal.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Member Savings:</span>
                <span className="text-green-600">
                  -${orderDetails.memberSavings.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-600">Shipping:</span>
                <span className="text-gray-900">Complimentary</span>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-gray-900">
                    Total:
                  </span>
                  <span className="text-xl font-light text-gray-900">
                    ${orderDetails.total.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping & Payment Info */}
          <div className="bg-white border border-gray-200 p-8">
            <h3 className="text-xl font-light text-gray-900 tracking-wider mb-6">
              SHIPPING & PAYMENT
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Shipping Address
                </h4>
                <div className="text-gray-900">
                  <p>{orderDetails.shippingAddress.name}</p>
                  <p>{orderDetails.shippingAddress.street}</p>
                  <p>
                    {orderDetails.shippingAddress.city},{" "}
                    {orderDetails.shippingAddress.state}{" "}
                    {orderDetails.shippingAddress.zip}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Payment Method
                </h4>
                <p className="text-gray-900">
                  Credit Card ending in {orderDetails.paymentMethod}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="text-center space-y-4 lg:space-y-0 lg:space-x-6 lg:flex lg:justify-center">
          <Link
            href="/orders"
            className="inline-block w-full lg:w-auto bg-gray-900 text-white px-8 py-4 font-medium tracking-wider hover:bg-gray-800 transition-colors"
          >
            TRACK YOUR ORDER
          </Link>

          <Link
            href="/products"
            className="inline-block w-full lg:w-auto border border-gray-400 px-8 py-4 font-medium text-gray-700 tracking-wider hover:bg-gray-50 transition-colors"
          >
            CONTINUE SHOPPING
          </Link>
        </div>

        {/* Additional Information */}
        <div className="mt-12 text-center">
          <div className="bg-white border border-gray-200 p-8">
            <h3 className="text-xl font-light text-gray-900 tracking-wider mb-4">
              WHAT&apos;S NEXT?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Order Confirmation
                </h4>
                <p className="text-gray-600 text-sm">
                  You&apos;ll receive an email confirmation with your order
                  details and tracking information.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Preparation
                </h4>
                <p className="text-gray-600 text-sm">
                  Your handcrafted furniture will be carefully prepared and
                  quality-checked before shipping.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Delivery
                </h4>
                <p className="text-gray-600 text-sm">
                  Our white-glove delivery service will bring your furniture
                  directly to your home.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-gray-600 text-sm">
                Questions about your order? Contact our customer service team at{" "}
                <Link
                  href="tel:1-800-555-0123"
                  className="underline hover:text-gray-800"
                >
                  1-800-555-0123
                </Link>{" "}
                or{" "}
                <Link
                  href="mailto:orders@classichome.com"
                  className="underline hover:text-gray-800"
                >
                  orders@classichome.com
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default OrderSuccessPage;
