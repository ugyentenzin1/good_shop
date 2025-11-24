import Link from 'next/link'
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, CreditCard, Shield, Truck } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-linear-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="text-xl font-bold">ShopName</span>
            </div>
            <p className="text-gray-300 text-sm">
              Your trusted online destination for quality products at unbeatable prices.
              Fast shipping, secure payments, and exceptional customer service.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-white transition">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/cart" className="text-gray-300 hover:text-white transition">
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link href="/checkout" className="text-gray-300 hover:text-white transition">
                  Checkout
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Categories</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/categories/electronics" className="text-gray-300 hover:text-white transition">
                  Electronics
                </Link>
              </li>
              <li>
                <Link href="/categories/fashion" className="text-gray-300 hover:text-white transition">
                  Fashion
                </Link>
              </li>
              <li>
                <Link href="/categories/home" className="text-gray-300 hover:text-white transition">
                  Home & Living
                </Link>
              </li>
              <li>
                <Link href="/categories/sports" className="text-gray-300 hover:text-white transition">
                  Sports
                </Link>
              </li>
              <li>
                <Link href="/categories/books" className="text-gray-300 hover:text-white transition">
                  Books & Media
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gray-400 shrink-0" />
                <span className="text-gray-300">
                  123 Commerce Street<br />
                  New York, NY 10001
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400 shrink-0" />
                <span className="text-gray-300">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400 shrink-0" />
                <span className="text-gray-300">support@shopname.com</span>
              </div>
            </div>

            {/* Customer Service Hours */}
            <div className="pt-4 border-t border-gray-700">
              <p className="text-xs text-gray-400 mb-1">Customer Service</p>
              <p className="text-sm text-gray-300">Mon-Fri: 9AM-6PM EST</p>
              <p className="text-sm text-gray-300">Sat-Sun: 10AM-4PM EST</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <Truck className="h-8 w-8 text-blue-400" />
              <div>
                <h5 className="font-semibold text-white">Free Shipping</h5>
                <p className="text-sm text-gray-300">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="h-8 w-8 text-green-400" />
              <div>
                <h5 className="font-semibold text-white">Secure Payment</h5>
                <p className="text-sm text-gray-300">SSL encrypted checkout</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <CreditCard className="h-8 w-8 text-purple-400" />
              <div>
                <h5 className="font-semibold text-white">Easy Returns</h5>
                <p className="text-sm text-gray-300">30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods & Legal */}
      <div className="bg-gray-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Payment Methods */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-400">We Accept:</span>
              <div className="flex space-x-2">
                <div className="w-8 h-5 bg-blue-600 rounded text-xs text-white flex items-center justify-center font-bold">V</div>
                <div className="w-8 h-5 bg-red-600 rounded text-xs text-white flex items-center justify-center font-bold">M</div>
                <div className="w-8 h-5 bg-blue-800 rounded text-xs text-white flex items-center justify-center font-bold">A</div>
                <div className="w-8 h-5 bg-yellow-500 rounded text-xs text-white flex items-center justify-center font-bold">PP</div>
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap items-center space-x-6 text-sm">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition">
                Terms of Service
              </Link>
              <Link href="/returns" className="text-gray-400 hover:text-white transition">
                Return Policy
              </Link>
              <Link href="/shipping" className="text-gray-400 hover:text-white transition">
                Shipping Info
              </Link>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-6 pt-6 text-center">
            <p className="text-sm text-gray-400">
              © {currentYear} ShopName. All rights reserved. Built with ❤️ for exceptional shopping experiences.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}