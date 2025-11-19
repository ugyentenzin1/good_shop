import { CollectionConfig } from 'payload';

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
        relationTo: 'products',
      }
    ],
  }