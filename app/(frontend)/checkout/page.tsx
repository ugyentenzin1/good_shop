'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CreditCard, Truck, Shield, CheckCircle } from 'lucide-react'
import { useCart } from '../(context)/cart-context'
import Image from 'next/image'
import { createOrder, type OrderData } from '../utils/order-utils'

interface FormData {
  // Customer Information
  email: string
  firstName: string
  lastName: string
  phone: string

  // Shipping Address
  shippingAddress: string
  shippingCity: string
  shippingState: string
  shippingZipCode: string
  shippingCountry: string

  // Billing Address (same as shipping unless specified)
  sameAsShipping: boolean
  billingAddress: string
  billingCity: string
  billingState: string
  billingZipCode: string
  billingCountry: string

  // Payment
  paymentMethod: 'card' | 'paypal'
  cardNumber: string
  expiryDate: string
  cvv: string
  cardName: string
}

const initialFormData: FormData = {
  email: '',
  firstName: '',
  lastName: '',
  phone: '',

  shippingAddress: '',
  shippingCity: '',
  shippingState: '',
  shippingZipCode: '',
  shippingCountry: 'United States',

  sameAsShipping: true,
  billingAddress: '',
  billingCity: '',
  billingState: '',
  billingZipCode: '',
  billingCountry: 'United States',

  paymentMethod: 'card',
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  cardName: '',
}

export default function CheckoutPage() {
  const { state, clearCart } = useCart()
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  const [errors, setErrors] = useState<Partial<FormData>>({})

  // Redirect if cart is empty
  if (state.items.length === 0 && !isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="text-gray-300 mb-6">
            <svg className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2 8m2-8l8-8m-8 8h8m0 0l2-8M9 21h6m-6 0a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some products before checking out.</p>
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

  // Show success message after order submission
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center p-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your order. We have sent a confirmation email to <strong>{formData.email}</strong>.
          </p>
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="text-sm text-gray-600 mb-2">Order Number</div>
            <div className="text-2xl font-bold text-gray-900">{orderNumber}</div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Continue Shopping
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = (e.target as HTMLInputElement).checked

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))

    // Clear error when user starts typing
    if (errors[name as keyof FormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }

    // Auto-fill billing address if same as shipping
    if (name.startsWith('shipping') && formData.sameAsShipping) {
      const billingField = name.replace('shipping', 'billing')
      setFormData(prev => ({
        ...prev,
        [billingField]: value
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {}

    // Required fields validation
    if (!formData.email) newErrors.email = 'Email is required'
    if (!formData.firstName) newErrors.firstName = 'First name is required'
    if (!formData.lastName) newErrors.lastName = 'Last name is required'
    if (!formData.phone) newErrors.phone = 'Phone number is required'

    // Shipping address validation
    if (!formData.shippingAddress) newErrors.shippingAddress = 'Address is required'
    if (!formData.shippingCity) newErrors.shippingCity = 'City is required'
    if (!formData.shippingState) newErrors.shippingState = 'State is required'
    if (!formData.shippingZipCode) newErrors.shippingZipCode = 'ZIP code is required'

    // Billing address validation (if not same as shipping)
    if (!formData.sameAsShipping) {
      if (!formData.billingAddress) newErrors.billingAddress = 'Billing address is required'
      if (!formData.billingCity) newErrors.billingCity = 'Billing city is required'
      if (!formData.billingState) newErrors.billingState = 'Billing state is required'
      if (!formData.billingZipCode) newErrors.billingZipCode = 'Billing ZIP code is required'
    }

    // Payment validation
    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required'
      if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required'
      if (!formData.cvv) newErrors.cvv = 'CVV is required'
      if (!formData.cardName) newErrors.cardName = 'Cardholder name is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Prepare order data
      const orderData: OrderData = {
        customerInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
        },
        shippingAddress: {
          street: formData.shippingAddress,
          city: formData.shippingCity,
          state: formData.shippingState,
          zipCode: formData.shippingZipCode,
          country: formData.shippingCountry,
        },
        billingAddress: {
          sameAsShipping: formData.sameAsShipping,
          street: formData.sameAsShipping ? formData.shippingAddress : formData.billingAddress,
          city: formData.sameAsShipping ? formData.shippingCity : formData.billingCity,
          state: formData.sameAsShipping ? formData.shippingState : formData.billingState,
          zipCode: formData.sameAsShipping ? formData.shippingZipCode : formData.billingZipCode,
          country: formData.sameAsShipping ? formData.shippingCountry : formData.billingCountry,
        },
        paymentInfo: {
          method: formData.paymentMethod,
          cardNumber: formData.cardNumber,
          cardName: formData.cardName,
          expiryDate: formData.expiryDate,
        },
      }

      // Create the order
      const result = await createOrder(state.items, orderData)

      if (!result.success) {
        throw new Error(result.error || 'Failed to create order')
      }

      // Set order number from response
      setOrderNumber(result.orderNumber!)

      // Clear cart after successful order
      clearCart()

      // Reset form
      setFormData(initialFormData)

      setIsSubmitted(true)
    } catch (error) {
      console.error('Order submission failed:', error)
      alert('Failed to place order. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const shippingCost = state.totalPrice >= 50 ? 0 : 9.99
  const tax = state.totalPrice * 0.08 // 8% tax
  const total = state.totalPrice + shippingCost + tax

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/cart"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
          >
            <ArrowLeft className="h-5 w-5" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Customer Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Customer Information</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="your@email.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="(555) 123-4567"
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="John"
                  />
                  {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Doe"
                  />
                  {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Address</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                  <input
                    type="text"
                    name="shippingAddress"
                    value={formData.shippingAddress}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.shippingAddress ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="123 Main Street"
                  />
                  {errors.shippingAddress && <p className="text-red-500 text-sm mt-1">{errors.shippingAddress}</p>}
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      name="shippingCity"
                      value={formData.shippingCity}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.shippingCity ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="New York"
                    />
                    {errors.shippingCity && <p className="text-red-500 text-sm mt-1">{errors.shippingCity}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <input
                      type="text"
                      name="shippingState"
                      value={formData.shippingState}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.shippingState ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="NY"
                    />
                    {errors.shippingState && <p className="text-red-500 text-sm mt-1">{errors.shippingState}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                    <input
                      type="text"
                      name="shippingZipCode"
                      value={formData.shippingZipCode}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.shippingZipCode ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="10001"
                    />
                    {errors.shippingZipCode && <p className="text-red-500 text-sm mt-1">{errors.shippingZipCode}</p>}
                  </div>
                </div>
              </div>
            </div>

            {/* Billing Address */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Billing Address</h2>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="sameAsShipping"
                    checked={formData.sameAsShipping}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">Same as shipping address</span>
                </label>
              </div>

              {!formData.sameAsShipping && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                    <input
                      type="text"
                      name="billingAddress"
                      value={formData.billingAddress}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.billingAddress ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="123 Main Street"
                    />
                    {errors.billingAddress && <p className="text-red-500 text-sm mt-1">{errors.billingAddress}</p>}
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        name="billingCity"
                        value={formData.billingCity}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.billingCity ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="New York"
                      />
                      {errors.billingCity && <p className="text-red-500 text-sm mt-1">{errors.billingCity}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                      <input
                        type="text"
                        name="billingState"
                        value={formData.billingState}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.billingState ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="NY"
                      />
                      {errors.billingState && <p className="text-red-500 text-sm mt-1">{errors.billingState}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                      <input
                        type="text"
                        name="billingZipCode"
                        value={formData.billingZipCode}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.billingZipCode ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="10001"
                      />
                      {errors.billingZipCode && <p className="text-red-500 text-sm mt-1">{errors.billingZipCode}</p>}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>

              {/* Payment Method Selection */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <label className={`border rounded-lg p-4 cursor-pointer transition ${
                  formData.paymentMethod === 'card'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <CreditCard className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="font-medium">Credit/Debit Card</span>
                  </div>
                </label>

                <label className={`border rounded-lg p-4 cursor-pointer transition ${
                  formData.paymentMethod === 'paypal'
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-gray-400'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={formData.paymentMethod === 'paypal'}
                    onChange={handleInputChange}
                    className="sr-only"
                  />
                  <div className="flex items-center">
                    <div className="w-5 h-5 bg-blue-600 rounded mr-3 flex items-center justify-center">
                      <span className="text-white text-xs font-bold">P</span>
                    </div>
                    <span className="font-medium">PayPal</span>
                  </div>
                </label>
              </div>

              {/* Card Details */}
              {formData.paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                    <input
                      type="text"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.cardName ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.cardNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="1234 5678 9012 3456"
                    />
                    {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.expiryDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="MM/YY"
                      />
                      {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.cvv ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="123"
                      />
                      {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* PayPal */}
              {formData.paymentMethod === 'paypal' && (
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <p className="text-gray-600 mb-4">You will be redirected to PayPal to complete your payment.</p>
                  <button
                    type="button"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                  >
                    Continue with PayPal
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {state.items.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden shrink-0">
                      {item.product.images && typeof item.product.images === 'object' && 'url' in item.product.images ? (
                        <Image
                          src={item.product.images.url || ''}
                          alt={item.product.images.alt || ''}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2 8m2-8l8-8m-8 8h8m0 0l2-8M9 21h6m-6 0a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {item.product.title || 'Untitled Product'}
                      </h3>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      <p className="text-sm font-medium text-gray-900">
                        ${(item.product.price || 0).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Totals */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({state.totalItems} items)</span>
                  <span className="font-medium">${state.totalPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-green-600 mr-2" />
                  <span className="text-sm text-green-800 font-medium">Secure Checkout</span>
                </div>
                <p className="text-xs text-green-700 mt-1">
                  Your payment information is encrypted and secure.
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Processing Order...
                  </>
                ) : (
                  <>
                    <Truck className="h-5 w-5 mr-2" />
                    Place Order
                  </>
                )}
              </button>

              {/* Free Shipping Notice */}
              {state.totalPrice < 50 && (
                <p className="text-xs text-gray-500 text-center mt-4">
                  Add ${(50 - state.totalPrice).toFixed(2)} more for free shipping
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}