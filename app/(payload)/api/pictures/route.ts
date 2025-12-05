import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const payload = await getPayload({ config })
    const pictures = await payload.find({
      collection: 'media',
    })

    return NextResponse.json(pictures)
  } catch (error) {
    console.error('Error fetching pictures:', error)
    return NextResponse.json(
      { error: 'Failed to fetch pictures' },
      { status: 500 }
    )
  }
}
