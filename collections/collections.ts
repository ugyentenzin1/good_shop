import { CollectionConfig } from 'payload';

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
  }
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

export const ORDERS_COLLECTION: CollectionConfig = {
  slug: 'orders',
  fields: [
    {
      name: 'products',
      type: 'array',
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          hasMany: true,
        },
      ],
    },
    {
      name: 'total',
      type: 'number',
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'Delivered', value: 'delivered' },
      ],
    },
    {
      name: 'customer',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'address',
      type: 'text',
    },
    {
      name: 'paymentMethod',
      type: 'select',
      options: [
        { label: 'Card', value: 'card' },
        { label: 'PayPal', value: 'paypal' },
      ],
    },
    {
      name: 'cardNumber',
      type: 'text',
    },
    {
      name: 'updatedAt',
      type: 'date',
      defaultValue: new Date(),
    }
  ],
}