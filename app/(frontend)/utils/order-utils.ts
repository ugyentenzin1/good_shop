import type { CartItem } from '../(context)/cart-context'

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

export async function createOrder(
  cartItems: CartItem[],
  orderData: OrderData
): Promise<{ success: boolean; orderNumber?: string; error?: string }> {
  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: cartItems,
        orderData,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || 'Failed to create order')
    }

    return result
  } catch (error) {
    console.error('Error creating order:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create order',
    }
  }
}

export async function getOrders(limit: number = 10, page: number = 1) {
  try {
    const response = await fetch(`/api/orders?limit=${limit}&page=${page}`)

    if (!response.ok) {
      throw new Error('Failed to fetch orders')
    }

    const orders = await response.json()
    return orders
  } catch (error) {
    console.error('Error fetching orders:', error)
    throw error
  }
}

export async function getOrderById(id: string) {
  try {
    const response = await fetch(`/api/orders/${id}`)

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Order not found')
      }
      throw new Error('Failed to fetch order')
    }

    const order = await response.json()
    return order
  } catch (error) {
    console.error('Error fetching order:', error)
    throw error
  }
}

export async function updateOrderStatus(
  id: string,
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
) {
  try {
    const response = await fetch(`/api/orders/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to update order status')
    }

    const updatedOrder = await response.json()
    return updatedOrder
  } catch (error) {
    console.error('Error updating order status:', error)
    throw error
  }
}
