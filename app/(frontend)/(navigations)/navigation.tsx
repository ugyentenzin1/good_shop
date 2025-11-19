'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ShoppingCart, Search, Menu, X, User, Heart } from 'lucide-react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0) // Replace with actual cart state

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-2 px-4 text-sm">
        Free shipping on orders over $50 🚚
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <span className="text-xl font-bold text-gray-900">ShopName</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-blue-600 font-medium transition">
              Products
            </Link>
            
            {/* Categories Dropdown */}
            <div className="relative group">
              <button className="text-gray-700 hover:text-blue-600 font-medium transition">
                Categories
              </button>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <Link href="/categories/electronics" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600">
                  Electronics
                </Link>
                <Link href="/categories/fashion" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600">
                  Fashion
                </Link>
                <Link href="/categories/home" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600">
                  Home & Living
                </Link>
                <Link href="/categories/sports" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600">
                  Sports
                </Link>
              </div>
            </div>

            <Link href="/deals" className="text-red-600 hover:text-red-700 font-medium transition">
              Deals
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition">
              About
            </Link>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="hidden lg:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Wishlist */}
            <button className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition">
              <Heart className="h-5 w-5 text-gray-700" />
            </button>

            {/* Account */}
            <Link href="/account" className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition">
              <User className="h-5 w-5 text-gray-700" />
            </Link>

            {/* Shopping Cart */}
            <Link href="/cart" className="relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition">
              <ShoppingCart className="h-5 w-5 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            {/* Mobile Links */}
            <Link href="/" className="block text-gray-700 hover:text-blue-600 font-medium py-2">
              Home
            </Link>
            <Link href="/products" className="block text-gray-700 hover:text-blue-600 font-medium py-2">
              Products
            </Link>
            
            {/* Mobile Categories */}
            <div className="border-l-2 border-gray-200 pl-4">
              <p className="text-gray-500 text-sm font-semibold mb-2">Categories</p>
              <Link href="/categories/electronics" className="block text-gray-700 hover:text-blue-600 py-1">
                Electronics
              </Link>
              <Link href="/categories/fashion" className="block text-gray-700 hover:text-blue-600 py-1">
                Fashion
              </Link>
              <Link href="/categories/home" className="block text-gray-700 hover:text-blue-600 py-1">
                Home & Living
              </Link>
              <Link href="/categories/sports" className="block text-gray-700 hover:text-blue-600 py-1">
                Sports
              </Link>
            </div>

            <Link href="/deals" className="block text-red-600 hover:text-red-700 font-medium py-2">
              Deals
            </Link>
            <Link href="/about" className="block text-gray-700 hover:text-blue-600 font-medium py-2">
              About
            </Link>

            {/* Mobile Account & Wishlist */}
            <div className="flex space-x-4 pt-4 border-t border-gray-200">
              <Link href="/wishlist" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                <Heart className="h-5 w-5" />
                <span>Wishlist</span>
              </Link>
              <Link href="/account" className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                <User className="h-5 w-5" />
                <span>Account</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}