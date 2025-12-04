import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function CategoriesPage() {
  const categories = [
    { name: 'Electronics', emoji: '📱', color: 'from-blue-500 to-cyan-500', href: '/categories/electronics', description: 'Latest gadgets and tech' },
    { name: 'Fashion', emoji: '👔', color: 'from-pink-500 to-rose-500', href: '/categories/fashion', description: 'Trendy clothing and accessories' },
    { name: 'Home & Living', emoji: '🏠', color: 'from-green-500 to-emerald-500', href: '/categories/home', description: 'Home decor and essentials' },
    { name: 'Sports', emoji: '⚽', color: 'from-orange-500 to-amber-500', href: '/categories/sports', description: 'Sports equipment and gear' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Shop by Category</h1>
          <p className="text-gray-600">Explore our wide range of products across different categories</p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className={`absolute inset-0 bg-linear-to-br ${category.color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
              <div className="relative p-8 flex items-center justify-between">
                <div className="flex-1">
                  <span className="text-6xl mb-4 block">{category.emoji}</span>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="inline-flex items-center text-blue-600 font-semibold group-hover:text-blue-700">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
