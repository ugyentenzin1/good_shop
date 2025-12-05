'use server'

import { getPayload } from 'payload'
import config from '@payload-config'
import PicturesGallery from './pictureClient'

// Server action to fetch initial pictures
async function getInitialPictures() {
  'use server'
  const payload = await getPayload({ config })
  const pictures = await payload.find({
    collection: 'media',
    limit: 20,
    sort: '-createdAt',
  })
  return pictures
}

// Server action to load more pictures
async function loadMorePictures(skip: number, limit: number = 20) {
  'use server'
  const payload = await getPayload({ config })
  const page = Math.floor(skip / limit) + 1
  const pictures = await payload.find({
    collection: 'media',
    limit,
    page,
    sort: '-createdAt',
  })
  return pictures
}

export default async function PicturesPage() {
  const initialData = await getInitialPictures()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Pictures Gallery</h1>
          <p className="text-gray-600">Beautiful collection of images</p>
        </div>

        <PicturesGallery
          initialPictures={initialData.docs}
          totalCount={initialData.totalDocs}
          loadMoreAction={loadMorePictures}
        />
      </div>
    </div>
  )
}