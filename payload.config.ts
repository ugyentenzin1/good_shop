import sharp from 'sharp'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { buildConfig } from 'payload'
import { PRODUCTS_COLLECTION, MEDIA_COLLECTION, ORDERS_COLLECTION } from './collections/collections'

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  // Define and configure your collections in this array
  collections: [
    PRODUCTS_COLLECTION,
    MEDIA_COLLECTION,
    ORDERS_COLLECTION,
  ],
  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || '',
  // Server URL for media and API endpoints
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || false,
  }),
  // Vercel Blob Storage Plugin for file uploads
  plugins: [
    vercelBlobStorage({
      collections: {
        media: true, // Apply to media collection
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp,
})