'use client'
import { Product } from '@/payload-types'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ShoppingBag, Grid, List, Heart, ShoppingCart } from 'lucide-react'

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data.docs)
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading products...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-600">Discover our complete collection</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-8">
          {/* Main Content */}
          <main className="w-full">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold text-gray-900 text-2xl">{products?.length}</span> Products Found
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  {/* View Toggle */}
                  <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                    >
                      <Grid className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                    >
                      <List className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {products?.length > 0 ? (
              <div className={viewMode === 'grid' 
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                : 'space-y-4'
              }>
                {products?.map((product: Product) => (
                  viewMode === 'grid' ? (
                    // Grid View
                    <div
                      key={product.id}
                      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                    >
                      <Link href={`/products/${product.id}`} className="block">
                        <div className="aspect-square bg-gray-200 relative overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 group-hover:scale-110 transition-transform duration-300">
                            <ShoppingBag className="h-16 w-16 text-gray-400" />
                          </div>
                          {/* Wishlist Button */}
                          <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition group/wishlist">
                            <Heart className="h-5 w-5 text-gray-600 group-hover/wishlist:text-red-500 group-hover/wishlist:fill-red-500 transition" />
                          </button>
                        </div>
                      </Link>
                      <div className="p-4">
                        <Link href={`/products/${product.id}`}>
                          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition">
                            {product.title || 'Untitled Product'}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {product.description || 'No description available'}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-gray-900">
                            ${product.price?.toFixed(2) || '0.00'}
                          </span>
                          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm font-medium">
                            <ShoppingCart className="h-4 w-4" />
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // List View
                    <div
                      key={product.id}
                      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex flex-col sm:flex-row">
                        <Link href={`/products/${product.id}`} className="sm:w-48 aspect-square sm:aspect-auto">
                          <div className="h-full bg-gray-200 relative overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
                              <ShoppingBag className="h-16 w-16 text-gray-400" />
                            </div>
                          </div>
                        </Link>
                        <div className="flex-1 p-6 flex flex-col justify-between">
                          <div>
                            <Link href={`/products/${product.id}`}>
                              <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition">
                                {product.title || 'Untitled Product'}
                              </h3>
                            </Link>
                            <p className="text-gray-600 mb-4">
                              {product.description || 'No description available'}
                            </p>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-3xl font-bold text-gray-900">
                              ${product.price?.toFixed(2) || '0.00'}
                            </span>
                            <div className="flex gap-2">
                              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
                                <Heart className="h-5 w-5 text-gray-600" />
                              </button>
                              <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium">
                                <ShoppingCart className="h-5 w-5" />
                                Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            ) : (
              // Empty State
              <div className="bg-white rounded-xl p-16 text-center">
                <ShoppingBag className="h-20 w-20 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">No Products Yet</h3>
                <p className="text-gray-600 mb-6">
                  Add products via the admin panel to see them here
                </p>
                <Link
                  href="/admin"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
                >
                  Go to Admin Panel
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}