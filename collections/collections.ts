import { CollectionConfig, PayloadRequest } from 'payload';

export const MEDIA_COLLECTION: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'card',
        width: 768,
        height: 1024,
        position: 'centre',
      },
      {
        name: 'tablet',
        width: 1024,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
  ],
  access: {
    read: () => true,
  },
//   endpoints: [
//     {
//       path: '/file/:filename',
//       method: 'get',
//       handler: async (req: PayloadRequest) => {
//         const url = req.url ? new URL(req.url) : null
//         const encodedFilename = url?.pathname.split('/').pop();
//         if (!encodedFilename) {
//           return Response.json({ error: 'Filename required' }, { status: 400 })
//         }
// 
//         // URL decode the filename to handle spaces and special characters
//         const filename = decodeURIComponent(encodedFilename);
// 
//         try {
//           // First, try to find the file exactly as requested
//           const mediaDoc = await req.payload.find({
//             collection: 'media',
//             where: {
//               filename: {
//                 equals: filename,
//               },  
//             },
//             limit: 1,
//           })
//           
//           const sizeName = null
//           const serverURL = req.payload.config.serverURL || 'http://localhost:3000'
// 
//           console.log(mediaDoc)
// 
//           if (!mediaDoc.docs.length) {
//             return Response.json({ error: 'File not found' }, { status: 404 })
//           }
// 
//           const media = mediaDoc.docs[0]
// 
//           console.log(media)
// 
//           // Redirect to the proper media URL with size if specified
//           const redirectURL = sizeName
//             ? `${serverURL}/api/media/${media.id}/${sizeName}`
//             : `${serverURL}/api/media/${media.id}`
// 
//           return Response.redirect(redirectURL, 302)
//         } catch (error) {
//           console.error('Media file error:', error)
//           return Response.json({ error: 'Internal server error' }, { status: 500 })
//         }
//       },
//     },
//   ],
}

export const PRODUCTS_COLLECTION: CollectionConfig = {
  slug: 'products',
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'description',
      type: 'text',
    },
    {
      name: 'price',
      type: 'number',
    },
    {
      name: 'category',
      type: 'text',
    },
    {
      name: 'featured',
      type: 'radio',
      options: [
        {
          label: 'Yes',
          value: 'yes',
        },
        {
          label: 'No',
          value: 'no',
        },
      ],
    },
    {
      name: 'images',
      type: 'upload',
      relationTo: 'media',
    }
  ],
}