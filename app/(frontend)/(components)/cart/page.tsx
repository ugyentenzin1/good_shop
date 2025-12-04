'use client'

import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react'
import { useCart } from '../../(context)/cart-context'
import Image from 'next/image'

export default function CartPage() {
  const { state, removeFromCart, updateQuantity, clearCart } = useCart()

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    updateQuantity(productId, newQuantity)
  }

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some products to get started!</p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href="/products"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
            >
              <ArrowLeft className="h-5 w-5" />
              Continue Shopping
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={clearCart}
              className="text-red-600 hover:text-red-700 transition font-medium"
            >
              Clear Cart
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              {state.items.map((item) => (
                <div key={item.product.id} className="p-6 border-b border-gray-100 last:border-b-0">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                      {item.product.images && typeof item.product.images === 'object' && 'url' in item.product.images ? (
                        <Image
                          src={item.product.images.url || ''}
                          alt={item.product.images.alt || ''}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ShoppingBag className="h-8 w-8 text-gray-400" />
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <Link
                        href={`/products/${item.product.id}`}
                        className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition"
                      >
                        {item.product.title || 'Untitled Product'}
                      </Link>
                      <p className="text-gray-600 text-sm mt-1">
                        {item.product.description || 'No description available'}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-4">
                        <button
                          onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="font-medium min-w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition"
                        >
                          <Plus className="h-4 w-4" />
                        </button>

                        <div className="ml-auto flex items-center gap-4">
                          <span className="text-lg font-bold text-gray-900">
                            ${(item.product.price || 0).toFixed(2)}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-red-600 hover:text-red-700 transition p-2"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items ({state.totalItems})</span>
                  <span className="font-medium">${state.totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {state.totalPrice >= 50 ? 'Free' : '$9.99'}
                  </span>
                </div>

                {state.totalPrice < 50 && (
                  <p className="text-sm text-gray-500">
                    Add ${(50 - state.totalPrice).toFixed(2)} more for free shipping
                  </p>
                )}

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${(state.totalPrice + (state.totalPrice >= 50 ? 0 : 9.99)).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <Link href="/checkout">
                <button className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-semibold">
                  Proceed to Checkout
                </button>
              </Link>

              <div className="mt-4 text-center">
                <Link
                  href="/products"
                  className="text-blue-600 hover:text-blue-700 transition text-sm font-medium"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
