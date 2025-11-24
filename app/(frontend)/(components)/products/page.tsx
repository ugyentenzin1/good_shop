import { getPayload } from 'payload'
import config from '@payload-config'
import ProductListClient from './ProductListClient'

export default async function ProductList() {
  const payload = await getPayload({ config })

  const { docs: products } = await payload.find({
    collection: 'products',
    limit: 100, // Adjust limit as needed
  })

  // Populate images for each product
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">All Products</h1>
          <p className="text-gray-600">Discover our complete collection</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-8">
          {/* Main Content */}
          <main className="w-full">
            <ProductListClient products={populatedProducts} />
          </main>
        </div>
      </div>
    </div>
  )
}