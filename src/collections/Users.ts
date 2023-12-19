/** @format */

import { CollectionConfig } from 'payload/types';

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    verify: true,
    // {
    // generateEmailHTML: ({ token }) => {
    //   return `<p>Hello </p>`;
    // },

    // },
  },
  access: {
    read: () => true,
    create: () => true,
  },
  fields: [
    {
      admin: {
        condition: () => false,
      },
      required: true,
      defaultValue: 'user',
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
    },
  ],
};
