'use client'

import { useState, useCallback } from 'react'
import { Media } from '@/payload-types'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'

interface PicturesGalleryProps {
  initialPictures: Media[]
  totalCount: number
  loadMoreAction: (skip: number, limit?: number) => Promise<{ docs: Media[]; totalDocs: number }>
}

interface GalleryModalProps {
  picture: Media | null
  onClose: () => void
  onNext: () => void
  onPrev: () => void
  hasNext: boolean
  hasPrev: boolean
}

function GalleryModal({ picture, onClose, onNext, onPrev, hasNext, hasPrev }: GalleryModalProps) {
  if (!picture) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
      <div className="relative max-w-4xl max-h-full">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Navigation buttons */}
        {hasPrev && (
          <button
            onClick={onPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full p-2"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {hasNext && (
          <button
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors bg-black bg-opacity-50 rounded-full p-2"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Image */}
        <div className="relative">
          {picture.url ? (
            <Image
              src={picture.url}
              alt={picture.alt || 'Gallery image'}
              width={picture.width || 800}
              height={picture.height || 600}
              className="max-w-full max-h-[80vh] object-contain"
              priority
            />
          ) : (
            <div className="w-96 h-64 bg-gray-800 flex items-center justify-center text-white">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>

        {/* Image info */}
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-4">
          <p className="text-sm">{picture.alt || picture.filename || 'No description'}</p>
          {picture.width && picture.height && (
            <p className="text-xs text-gray-300 mt-1">
              {picture.width} × {picture.height} pixels
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function PicturesGallery({ initialPictures, totalCount, loadMoreAction }: PicturesGalleryProps) {
  const [pictures, setPictures] = useState<Media[]>(initialPictures)
  const [selectedPicture, setSelectedPicture] = useState<Media | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(initialPictures.length < totalCount)

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)
    try {
      const result = await loadMoreAction(pictures.length, 20)
      const newPictures = result.docs || []

      setPictures(prev => [...prev, ...newPictures])
      setHasMore(pictures.length + newPictures.length < totalCount)
    } catch (error) {
      console.error('Error loading more pictures:', error)
    } finally {
      setLoading(false)
    }
  }, [pictures.length, totalCount, loading, hasMore, loadMoreAction])

  const openModal = (picture: Media, index: number) => {
    setSelectedPicture(picture)
    setSelectedIndex(index)
  }

  const closeModal = () => {
    setSelectedPicture(null)
    setSelectedIndex(0)
  }

  const nextPicture = () => {
    const nextIndex = (selectedIndex + 1) % pictures.length
    setSelectedPicture(pictures[nextIndex])
    setSelectedIndex(nextIndex)
  }

  const prevPicture = () => {
    const prevIndex = selectedIndex === 0 ? pictures.length - 1 : selectedIndex - 1
    setSelectedPicture(pictures[prevIndex])
    setSelectedIndex(prevIndex)
  }

  console.log('pictures', pictures)
  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-8">
        {pictures.map((picture, index) => (
          <div
            key={picture.id}
            className="group relative aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300"
            onClick={() => openModal(picture, index)}
          >

            {picture.url ? (
              <Image
                src={picture.url}
                alt={picture.alt || 'Gallery image'}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400 group-hover:text-gray-600 transition-colors">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
            )}

            {/* Overlay on hover */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="text-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Loading...
              </>
            ) : (
              <>
                Load More Pictures
                <span className="ml-2 text-sm">({pictures.length} of {totalCount})</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Modal */}
      <GalleryModal
        picture={selectedPicture}
        onClose={closeModal}
        onNext={nextPicture}
        onPrev={prevPicture}
        hasNext={selectedIndex < pictures.length - 1}
        hasPrev={selectedIndex > 0}
      />
    </>
  )
}
