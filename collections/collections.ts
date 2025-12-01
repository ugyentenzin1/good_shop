import { CollectionConfig } from 'payload';
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob';

export const MEDIA_COLLECTION: CollectionConfig = {
  slug: 'media',
  upload: {
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      }
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
    },
    {
      name: 'stock',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
  ],
}

export const ORDERS_COLLECTION: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'orderNumber',
  },
  fields: [
    // Order Information
    {
      name: 'orderNumber',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Processing', value: 'processing' },
        { label: 'Shipped', value: 'shipped' },
        { label: 'Delivered', value: 'delivered' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
    },

    // Order Items
    {
      name: 'items',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'quantity',
          type: 'number',
          required: true,
          min: 1,
        },
        {
          name: 'price',
          type: 'number',
          required: true,
          admin: {
            readOnly: true,
          },
        },
      ],
    },

    // Pricing
    {
      name: 'subtotal',
      type: 'number',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'shipping',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
    {
      name: 'tax',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
    {
      name: 'total',
      type: 'number',
      required: true,
      admin: {
        readOnly: true,
      },
    },

    // Customer Information
    {
      name: 'customerInfo',
      type: 'group',
      fields: [
        {
          name: 'firstName',
          type: 'text',
          required: true,
        },
        {
          name: 'lastName',
          type: 'text',
          required: true,
        },
        {
          name: 'email',
          type: 'email',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
        },
      ],
    },

    // Shipping Address
    {
      name: 'shippingAddress',
      type: 'group',
      fields: [
        {
          name: 'street',
          type: 'text',
          required: true,
        },
        {
          name: 'city',
          type: 'text',
          required: true,
        },
        {
          name: 'state',
          type: 'text',
          required: true,
        },
        {
          name: 'zipCode',
          type: 'text',
          required: true,
        },
        {
          name: 'country',
          type: 'text',
          required: true,
          defaultValue: 'United States',
        },
      ],
    },

    // Billing Address (optional, defaults to shipping)
    {
      name: 'billingAddress',
      type: 'group',
      fields: [
        {
          name: 'sameAsShipping',
          type: 'checkbox',
          defaultValue: true,
        },
        {
          name: 'street',
          type: 'text',
        },
        {
          name: 'city',
          type: 'text',
        },
        {
          name: 'state',
          type: 'text',
        },
        {
          name: 'zipCode',
          type: 'text',
        },
        {
          name: 'country',
          type: 'text',
          defaultValue: 'United States',
        },
      ],
    },

    // Payment Information
    {
      name: 'paymentInfo',
      type: 'group',
      fields: [
        {
          name: 'method',
          type: 'select',
          required: true,
          options: [
            { label: 'Credit Card', value: 'card' },
            { label: 'PayPal', value: 'paypal' },
          ],
        },
        {
          name: 'cardNumber',
          type: 'text',
          admin: {
            condition: (data) => data.paymentInfo?.method === 'card',
          },
        },
        {
          name: 'cardName',
          type: 'text',
          admin: {
            condition: (data) => data.paymentInfo?.method === 'card',
          },
        },
        {
          name: 'expiryDate',
          type: 'text',
          admin: {
            condition: (data) => data.paymentInfo?.method === 'card',
          },
        },
        {
          name: 'transactionId',
          type: 'text',
          admin: {
            readOnly: true,
          },
        },
      ],
    },

    // Timestamps
    {
      name: 'orderDate',
      type: 'date',
      required: true,
      defaultValue: () => new Date(),
      admin: {
        readOnly: true,
      },
    },
  ],
}