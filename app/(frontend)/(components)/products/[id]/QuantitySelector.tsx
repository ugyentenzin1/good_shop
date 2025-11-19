'use client'
import { useState } from 'react'

interface QuantitySelectorProps {
  initialQuantity?: number
  min?: number
  max?: number
  onChange?: (quantity: number) => void
}

export default function QuantitySelector({ 
  initialQuantity = 1, 
  min = 1, 
  max = 99,
  onChange 
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialQuantity)

  const handleDecrement = () => {
    if (quantity > min) {
      const newQuantity = quantity - 1
      setQuantity(newQuantity)
      onChange?.(newQuantity)
    }
  }

  const handleIncrement = () => {
    if (quantity < max) {
      const newQuantity = quantity + 1
      setQuantity(newQuantity)
      onChange?.(newQuantity)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (!isNaN(value) && value >= min && value <= max) {
      setQuantity(value)
      onChange?.(value)
    }
  }

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-900 mb-2">
        Quantity
      </label>
      <div className="flex items-center gap-3">
        <button 
          onClick={handleDecrement}
          disabled={quantity <= min}
          className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center justify-center text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          −
        </button>
        <input
          type="number"
          value={quantity}
          onChange={handleInputChange}
          min={min}
          max={max}
          className="w-16 h-10 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button 
          onClick={handleIncrement}
          disabled={quantity >= max}
          className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50 transition flex items-center justify-center text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          +
        </button>
      </div>
    </div>
  )
}

