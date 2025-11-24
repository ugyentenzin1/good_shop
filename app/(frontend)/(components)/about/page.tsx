import Link from 'next/link'
import { Shield, Users, ShoppingBag, Truck, Star, Heart, Trophy, Zap, Award, CheckCircle } from 'lucide-react'

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-blue-600 via-purple-600 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Your Trusted Online Store
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
              ShopName is your premier destination for quality products at unbeatable prices. We offer a wide range of items with exceptional customer service and fast, reliable delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              To provide customers with a seamless online shopping experience, offering high-quality products,
              exceptional service, and competitive prices that make everyday shopping better.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Shopping</h3>
              <p className="text-gray-600">Safe and secure checkout process with multiple payment options and buyer protection.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">Quick and reliable shipping with real-time tracking and flexible delivery options.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Products</h3>
              <p className="text-gray-600">Curated selection of premium products from trusted brands with satisfaction guarantee.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What We Offer
            </h2>
            <p className="text-lg text-gray-600">
              Discover our diverse range of premium products
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Electronics', icon: Zap, color: 'bg-blue-500' },
              { name: 'Fashion', icon: Star, color: 'bg-purple-500' },
              { name: 'Home & Living', icon: Heart, color: 'bg-pink-500' },
              { name: 'Sports', icon: Trophy, color: 'bg-green-500' }
            ].map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-center">
                <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-gray-600 text-sm">Premium quality products and accessories</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose GGB?
            </h2>
            <p className="text-lg text-gray-600">
              We are committed to providing the best gaming experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              {[
                'Secure payment processing with multiple payment methods',
                '24/7 customer support for all your shopping needs',
                'Fast and reliable shipping with tracking',
                'Quality products from trusted brands',
                'Competitive pricing with frequent promotions',
                'User-friendly platform with easy navigation'
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            <div className="bg-linear-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <div className="text-center">
                <Users className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Join Our Community</h3>
                <p className="text-gray-600 mb-6">
                  Over 100,000+ customers trust us for their shopping needs. Join the community and discover amazing products.
                </p>
                <div className="flex justify-center space-x-6 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">100K+</div>
                    <div className="text-gray-500">Happy Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">1M+</div>
                    <div className="text-gray-500">Products Sold</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-pink-600">4.8/5</div>
                    <div className="text-gray-500">Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Our Story
          </h2>
          <div className="prose prose-lg mx-auto text-gray-600">
            <p className="mb-6">
              Founded in 2020, ShopName started with a simple mission: to make quality shopping accessible to everyone.
              We noticed that many customers struggled to find reliable online stores with genuine products and trustworthy service.
            </p>
            <p className="mb-6">
              Our team of retail experts and technology professionals came together to create a platform that prioritizes security,
              speed, and customer satisfaction. We work directly with trusted suppliers and brands to ensure all products are authentic and high-quality.
            </p>
            <p>
              Today, we are proud to serve customers across the globe, offering a wide range of products and continuously expanding
              our catalog to meet the evolving needs of modern shoppers.
            </p>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-linear-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ShoppingBag className="h-16 w-16 text-white mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-lg text-blue-100 mb-8">
            Join thousands of satisfied customers who trust ShopName for their shopping needs.
            Start shopping today and experience the difference.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition shadow-lg"
          >
            Browse Products
          </Link>
        </div>
      </section>
    </div>
  )
}