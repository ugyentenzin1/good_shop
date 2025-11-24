'use client'
import { useState, useEffect, useRef } from 'react'
import { ShoppingCart, Share2, Check } from 'lucide-react'
import type { Product } from '@/payload-types'
import { useCart } from '@/app/(frontend)/(context)/cart-context'

interface AddToCartButtonProps {
  product: Product
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const isClientRef = useRef(false)

  useEffect(() => {
    isClientRef.current = true
  }, [])

  const handleAddToCart = async () => {
    setIsAdding(true)

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Add to cart using context
    addToCart(product)

    setIsAdding(false)
    setIsAdded(true)

    // Reset after 2 seconds
    setTimeout(() => {
      setIsAdded(false)
    }, 2000)
  }

  const handleShare = async () => {
    if (!isClientRef.current) return // Prevent execution during SSR

    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title || 'Product',
          text: product.description || 'Check out this product!',
          url: window.location.href,
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href)
        alert('Link copied to clipboard!')
      } catch (error) {
        console.log('Error copying to clipboard:', error)
      }
    }
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      <button 
        onClick={handleAddToCart}
        disabled={isAdding || isAdded}
        className={`flex-1 flex items-center justify-center gap-2 px-8 py-4 rounded-xl transition font-semibold text-lg shadow-lg disabled:opacity-75 ${
          isAdded 
            ? 'bg-green-600 text-white shadow-green-600/30' 
            : 'bg-blue-600 text-white shadow-blue-600/30 hover:bg-blue-700'
        }`}
      >
        {isAdding ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            Adding...
          </>
        ) : isAdded ? (
          <>
            <Check className="h-5 w-5" />
            Added to Cart!
          </>
        ) : (
          <>
            <ShoppingCart className="h-5 w-5" />
            Add to Cart
          </>
        )}
      </button>
      <button 
        onClick={handleShare}
        className="flex items-center justify-center gap-2 border-2 border-gray-300 text-gray-700 px-6 py-4 rounded-xl hover:bg-gray-50 transition font-semibold"
      >
        <Share2 className="h-5 w-5" />
        Share
      </button>
    </div>
  )
}

