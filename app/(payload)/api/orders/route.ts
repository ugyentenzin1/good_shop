import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { CartItem } from '../../../(frontend)/(context)/cart-context'

export interface OrderData {
  customerInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
  shippingAddress: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  billingAddress?: {
    sameAsShipping: boolean
    street?: string
    city?: string
    state?: string
    zipCode?: string
    country?: string
  }
  paymentInfo: {
    method: 'card' | 'paypal'
    cardNumber?: string
    cardName?: string
    expiryDate?: string
  }
}

// POST /api/orders - Create a new order
export async function POST(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const body: { items: CartItem[]; orderData: OrderData } = await request.json()

    const { items, orderData } = body;
    console.log('Creating order', items, orderData, body)

    // Calculate totals
    const subtotal = items.reduce(
      (total, item) => total + (item.product.price || 0) * item.quantity,
      0
    )

    const shipping = subtotal >= 50 ? 0 : 9.99
    const tax = subtotal * 0.08 // 8% tax
    const total = subtotal + shipping + tax

    // Generate order number
    const orderNumber = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`

    // Prepare order items
    const orderItems = items.map(item => ({
      product: item.product.id,
      quantity: item.quantity,
      price: item.product.price || 0,
    }))

    // Prepare billing address
    const billingAddress = orderData.billingAddress?.sameAsShipping
      ? {
          sameAsShipping: true,
          street: orderData.shippingAddress.street,
          city: orderData.shippingAddress.city,
          state: orderData.shippingAddress.state,
          zipCode: orderData.shippingAddress.zipCode,
          country: orderData.shippingAddress.country,
        }
      : orderData.billingAddress || {
          sameAsShipping: false,
        }

    // Create the order
    const order = await payload.create({
      collection: 'orders',
      data: {
        orderNumber,
        status: 'pending',
        items: orderItems,
        subtotal: Math.round(subtotal * 100) / 100, // Round to 2 decimal places
        shipping: Math.round(shipping * 100) / 100,
        tax: Math.round(tax * 100) / 100,
        total: Math.round(total * 100) / 100,
        customerInfo: orderData.customerInfo,
        shippingAddress: orderData.shippingAddress,
        billingAddress,
        paymentInfo: {
          method: orderData.paymentInfo.method,
          cardNumber: orderData.paymentInfo.cardNumber,
          cardName: orderData.paymentInfo.cardName,
          expiryDate: orderData.paymentInfo.expiryDate,
          transactionId: `TXN-${Date.now()}`, // Generate transaction ID
        },
        orderDate: new Date().toISOString(),
      },
    })

    return NextResponse.json({
      success: true,
      orderNumber,
      orderId: order.id,
    })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to create order',
      },
      { status: 500 }
    )
  }
}

// GET /api/orders - Get orders (admin only)
export async function GET(request: NextRequest) {
  try {
    const payload = await getPayload({ config })
    const { searchParams } = new URL(request.url)

    const limit = parseInt(searchParams.get('limit') || '10')
    const page = parseInt(searchParams.get('page') || '1')

    const orders = await payload.find({
      collection: 'orders',
      limit,
      page,
      sort: '-orderDate', // Sort by newest first
    })

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}