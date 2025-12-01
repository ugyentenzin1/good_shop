import Link from 'next/link'
import { ArrowRight, ShoppingBag, Truck, Shield, Headphones, Star } from 'lucide-react'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Product } from '@/payload-types';
import Image from 'next/image';

export default async function Home() {
  const payload = await getPayload({ config })
  
  // Fetch featured products (limit to 8)
  const { docs: products } = await payload.find({
    collection: 'products',
    limit: 8,
    where: {
      featured: {
        equals: 'yes',
      },
    },
  })

  // Populate images for each product with error handling
  const populatedProducts = await Promise.all(
    products.map(async (product) => {
      if (product.images && typeof product.images === 'string') {
        try {
          const imageDoc = await payload.findByID({
            collection: 'media',
            id: product.images,
          })
          return { ...product, images: imageDoc }
        } catch {
          // If image doesn't exist, return product without image
          console.warn(`Image with ID ${product.images} not found for product ${product.id}`)
          return { ...product, images: null }
        }
      }
      return product
    })
  )
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-blue-600 via-purple-600 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Discover Your Perfect Style
              </h1>
              <p className="text-lg md:text-xl text-blue-100">
                Shop the latest trends with up to 50% off. Free shipping on orders over $50.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition shadow-lg group"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative h-96 w-96 mx-auto">
                {/* Decorative circles */}
                <div className="absolute inset-0 bg-white/10 rounded-full animate-pulse"></div>
                <div className="absolute inset-8 bg-white/20 rounded-full animate-pulse delay-100"></div>
                <div className="absolute inset-16 bg-white/30 rounded-full animate-pulse delay-200"></div>
                <ShoppingBag className="absolute inset-0 m-auto h-32 w-32 text-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Truck className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Free Shipping</h3>
                <p className="text-sm text-gray-600">On orders over $50</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Secure Payment</h3>
                <p className="text-sm text-gray-600">100% secure transactions</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Headphones className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">24/7 Support</h3>
                <p className="text-sm text-gray-600">Dedicated support team</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-orange-100 p-3 rounded-lg">
                <Star className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Best Quality</h3>
                <p className="text-sm text-gray-600">Top-rated products</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 text-lg">
              Explore our wide range of products across different categories
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: 'Electronics', emoji: '📱', color: 'from-blue-500 to-cyan-500', href: '/categories/electronics' },
              { name: 'Fashion', emoji: '👔', color: 'from-pink-500 to-rose-500', href: '/categories/fashion' },
              { name: 'Home & Living', emoji: '🏠', color: 'from-green-500 to-emerald-500', href: '/categories/home' },
              { name: 'Sports', emoji: '⚽', color: 'from-orange-500 to-amber-500', href: '/categories/sports' },
            ].map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group relative overflow-hidden rounded-2xl aspect-square"
              >
                <div className={`absolute inset-0 bg-linear-to-br ${category.color} group-hover:scale-110 transition-transform duration-300`}></div>
                <div className="relative h-full flex flex-col items-center justify-center text-white p-6">
                  <span className="text-5xl mb-3">{category.emoji}</span>
                  <h3 className="text-xl font-bold text-center">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Featured Products
              </h2>
              <p className="text-gray-600 text-lg">
                Check out our handpicked selection of trending items
              </p>
            </div>
            <Link
              href="/products"
              className="hidden md:inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold group"
            >
              View All
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {populatedProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {populatedProducts.map((product: Product) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-square bg-gray-200 relative overflow-hidden">
                    {/* Placeholder for product image */}
                      <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 group-hover:scale-110 transition-transform duration-300">
                        {product.images && typeof product.images === 'object' && 'url' in product.images ? (
                          <Image src={product.images.url || ''} alt={product.images.alt || ''} fill className="object-cover" />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <ShoppingBag className="h-16 w-16 text-gray-400" />
                          </div>
                        )}
                      </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition">
                      {product.title || 'Untitled Product'}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {product.description || 'No description available'}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">
                        ${product.price?.toFixed(2) || '0.00'}
                      </span>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-300">
              <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Yet</h3>
              <p className="text-gray-600 mb-6">
                Add products via the admin panel to see them here
              </p>
              <Link
                href="/admin"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
              >
                Go to Admin Panel
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          )}

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/products"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold group"
            >
              View All Products
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Special Offer Banner */}
      <section className="py-16 bg-linear-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Special Offer - 50% Off!
            </h2>
            <p className="text-xl mb-8 text-purple-100">
              Limited time offer on selected items. Don't miss out!
            </p>
            <Link
              href="/deals"
              className="inline-flex items-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg hover:bg-purple-50 transition shadow-lg text-lg group"
            >
              Shop Deals Now
              <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Subscribe to Our Newsletter
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Get the latest updates on new products and exclusive deals
            </p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 font-semibold rounded-lg transition whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
            <p className="text-sm text-gray-500 mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">ShopName</h3>
              <p className="text-sm">
                Your one-stop shop for all your needs. Quality products at unbeatable prices.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/products" className="hover:text-white transition">Products</Link></li>
                <li><Link href="/deals" className="hover:text-white transition">Deals</Link></li>
                <li><Link href="/about" className="hover:text-white transition">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/shipping" className="hover:text-white transition">Shipping Info</Link></li>
                <li><Link href="/returns" className="hover:text-white transition">Returns</Link></li>
                <li><Link href="/faq" className="hover:text-white transition">FAQ</Link></li>
                <li><Link href="/support" className="hover:text-white transition">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-white transition">Facebook</a>
                <a href="#" className="hover:text-white transition">Twitter</a>
                <a href="#" className="hover:text-white transition">Instagram</a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2024 ShopName. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}