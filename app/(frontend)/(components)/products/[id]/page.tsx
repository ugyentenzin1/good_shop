import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ShoppingCart, Heart, Star, Truck, Shield, ArrowLeft } from 'lucide-react'
import type { Product } from '@/payload-types'
import QuantitySelector from './QuantitySelector'
import AddToCartButton from './AddToCartButton'

export default async function ProductPage({ params }: { params: { id: string } }) {
  const { id } = await params

  const payload = await getPayload({ config })
  
  // Fetch the product by ID
  let product: Product
  try {
    product = await payload.findByID({
      collection: 'products',
      id: id,
    })
  } catch (error) {
    notFound()
  }

  // Fetch related products (same category or random)
  const { docs: relatedProducts } = await payload.find({
    collection: 'products',
    limit: 4,
    where: {
      id: {
        not_equals: id,
      },
    },
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600 transition">
              Home
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-blue-600 transition">
              Products
            </Link>
            <span>/</span>
            <span className="text-gray-900">{product.title}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          href="/products"
          className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-6 transition group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Product Image */}
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
            <div className="aspect-square relative bg-gradient-to-br from-gray-100 to-gray-200">
              {/* Image placeholder */}
              <div className="absolute inset-0 flex items-center justify-center">
                <ShoppingCart className="h-32 w-32 text-gray-400" />
              </div>
              {/* Wishlist Button */}
              <button className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-md hover:bg-red-50 transition group/wishlist">
                <Heart className="h-6 w-6 text-gray-600 group-hover/wishlist:text-red-500 group-hover/wishlist:fill-red-500 transition" />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="bg-white rounded-2xl shadow-sm p-8 flex-1">
              {/* Category Badge */}
              {product.category && (
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full mb-4">
                  {product.category}
                </span>
              )}

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {product.title || 'Untitled Product'}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">(4.0) · 128 reviews</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-gray-900">
                    ${product.price?.toFixed(2) || '0.00'}
                  </span>
                  <span className="text-xl text-gray-400 line-through">
                    ${((product.price || 0) * 1.2).toFixed(2)}
                  </span>
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-sm font-semibold rounded">
                    20% OFF
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-600 leading-relaxed">
                  {product.description || 'No description available for this product.'}
                </p>
              </div>

              {/* Quantity Selector */}
              <QuantitySelector />

              {/* Action Buttons */}
              <AddToCartButton product={product} />

              {/* Trust Badges */}
              <div className="border-t border-gray-200 pt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck className="h-5 w-5 text-blue-600" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span>30-day money-back guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-16">
          <div className="border-b border-gray-200 mb-6">
            <div className="flex gap-8">
              <button className="pb-4 border-b-2 border-blue-600 text-blue-600 font-semibold">
                Details
              </button>
              <button className="pb-4 border-b-2 border-transparent text-gray-600 hover:text-gray-900 font-semibold">
                Reviews
              </button>
              <button className="pb-4 border-b-2 border-transparent text-gray-600 hover:text-gray-900 font-semibold">
                Shipping
              </button>
            </div>
          </div>
          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Product Specifications</h3>
            <ul className="space-y-2 text-gray-600">
              <li><strong>SKU:</strong> {product.id}</li>
              <li><strong>Category:</strong> {product.category || 'N/A'}</li>
              <li><strong>Availability:</strong> <span className="text-green-600">In Stock</span></li>
              <li><strong>Shipping:</strong> Worldwide delivery available</li>
            </ul>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">You May Also Like</h2>
              <Link
                href="/products"
                className="text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-2 group"
              >
                View All
                <ArrowLeft className="h-4 w-4 rotate-180 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct: Product) => (
                <Link
                  key={relatedProduct.id}
                  href={`/products/${relatedProduct.id}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  <div className="aspect-square bg-gray-200 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 group-hover:scale-110 transition-transform duration-300">
                      <ShoppingCart className="h-12 w-12 text-gray-400" />
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition">
                      {relatedProduct.title || 'Untitled Product'}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-900">
                        ${relatedProduct.price?.toFixed(2) || '0.00'}
                      </span>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}