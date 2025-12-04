import { getPayload } from 'payload'
import config from '@payload-config'
import ProductListClient from '../../products/ProductListClient'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import type { Product } from '@/payload-types'
import type { Metadata } from 'next'

// Force dynamic rendering for category pages since categories can change
export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params
  const decodedCategory = decodeURIComponent(category)
  const displayCategory = decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1)

  return {
    title: `${displayCategory} - Shop`,
    description: `Discover our ${displayCategory.toLowerCase()} collection`,
  }
}

interface CategoryPageProps {
  params: Promise<{
    category: string
  }>
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const payload = await getPayload({ config })
  const { category } = await params

  // Decode the category name (handles URL encoding)
  const decodedCategory = decodeURIComponent(category)

  // Capitalize first letter for display
  const displayCategory = decodedCategory.charAt(0).toUpperCase() + decodedCategory.slice(1)

  // Fetch products filtered by category
  const { docs: products } = await payload.find({
    collection: 'products',
    where: {
      category: {
        equals: decodedCategory,
      },
    },
    limit: 100,
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/products"
              className="inline-flex items-center text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Products
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{displayCategory}</h1>
          <p className="text-gray-600">Discover our {displayCategory.toLowerCase()} collection</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {populatedProducts.length > 0 ? (
          <div className="flex flex-col gap-8">
            {/* Main Content */}
            <main className="w-full">
              <ProductListClient products={populatedProducts} />
            </main>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-300">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Found</h3>
            <p className="text-gray-600 mb-6">
              We don't have any {displayCategory.toLowerCase()} products yet.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              View All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
