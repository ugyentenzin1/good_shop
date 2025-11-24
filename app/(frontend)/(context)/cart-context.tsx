'use client'

import React, { createContext, useContext, useReducer, ReactNode } from 'react'
import type { Product } from '@/payload-types'

// Cart item type
export interface CartItem {
  product: Product
  quantity: number
}

// Cart state type
export interface CartState {
  items: CartItem[]
  totalItems: number
  totalPrice: number
}

// Cart actions
type CartAction =
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string } // product id
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }

// Cart context type
interface CartContextType {
  state: CartState
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
}

// Initial state
const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
}

// Cart reducer
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIndex = state.items.findIndex(
        item => item.product.id === action.payload.id
      )

      let newItems: CartItem[]

      if (existingItemIndex >= 0) {
        // Item already exists, increase quantity
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        // Add new item
        newItems = [...state.items, { product: action.payload, quantity: 1 }]
      }

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = newItems.reduce(
        (sum, item) => sum + (item.product.price || 0) * item.quantity,
        0
      )

      return {
        items: newItems,
        totalItems,
        totalPrice,
      }
    }

    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(
        item => item.product.id !== action.payload
      )

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = newItems.reduce(
        (sum, item) => sum + (item.product.price || 0) * item.quantity,
        0
      )

      return {
        items: newItems,
        totalItems,
        totalPrice,
      }
    }

    case 'UPDATE_QUANTITY': {
      const { productId, quantity } = action.payload

      if (quantity <= 0) {
        // Remove item if quantity is 0 or negative
        return cartReducer(state, { type: 'REMOVE_FROM_CART', payload: productId })
      }

      const newItems = state.items.map(item =>
        item.product.id === productId
          ? { ...item, quantity }
          : item
      )

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0)
      const totalPrice = newItems.reduce(
        (sum, item) => sum + (item.product.price || 0) * item.quantity,
        0
      )

      return {
        items: newItems,
        totalItems,
        totalPrice,
      }
    }

    case 'CLEAR_CART':
      return initialState

    default:
      return state
  }
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined)

// Cart provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product })
  }

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId })
  }

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  const value: CartContextType = {
    state,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

// Custom hook to use cart context
export const useCart = (): CartContextType => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

// Helper functions for cart operations
export const getCartItemCount = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + item.quantity, 0)
}

export const getCartTotal = (items: CartItem[]): number => {
  return items.reduce((total, item) => total + (item.product.price || 0) * item.quantity, 0)
}
