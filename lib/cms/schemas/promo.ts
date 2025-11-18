import { defineType, defineField } from 'sanity'

/**
 * Promotional Content Schema
 *
 * Manages promotional banners, pop-ups, and special offers
 * displayed throughout the website.
 */
export default defineType({
  name: 'promo',
  title: 'Promotions',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Promotion Title',
      type: 'string',
      description: 'Main headline for the promotion',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Additional details about the promotion',
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'discount',
      title: 'Discount Percentage',
      type: 'number',
      description: 'Discount amount (e.g., 10 for 10% off)',
      validation: (Rule) => Rule.required().min(0).max(100),
    }),
    defineField({
      name: 'discountType',
      title: 'Discount Type',
      type: 'string',
      options: {
        list: [
          { title: 'Percentage Off', value: 'percentage' },
          { title: 'Dollar Amount', value: 'dollar' },
          { title: 'Free Service', value: 'free' },
        ],
      },
      initialValue: 'percentage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaText',
      title: 'Call-to-Action Text',
      type: 'string',
      description: 'Button text (e.g., "Learn More", "Get Quote")',
      initialValue: 'Learn More',
      validation: (Rule) => Rule.required().max(30),
    }),
    defineField({
      name: 'ctaLink',
      title: 'Call-to-Action Link',
      type: 'string',
      description: 'Where the CTA button should link to',
      initialValue: '/quote',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
      description: 'When this promotion becomes active',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'datetime',
      description: 'When this promotion expires',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'displayType',
      title: 'Display Type',
      type: 'string',
      options: {
        list: [
          { title: 'Pop-up Modal', value: 'modal' },
          { title: 'Banner (Top)', value: 'banner' },
          { title: 'Inline Section', value: 'inline' },
        ],
      },
      initialValue: 'modal',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Toggle to enable/disable this promotion',
      initialValue: true,
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'number',
      description: 'Higher priority promotions show first (1-10)',
      validation: (Rule) => Rule.required().min(1).max(10),
      initialValue: 5,
    }),
    defineField({
      name: 'image',
      title: 'Promotional Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Hex color for background (e.g., #3b82f6)',
      initialValue: '#3b82f6',
    }),
    defineField({
      name: 'textColor',
      title: 'Text Color',
      type: 'string',
      description: 'Hex color for text (e.g., #ffffff)',
      initialValue: '#ffffff',
    }),
    defineField({
      name: 'conditions',
      title: 'Terms & Conditions',
      type: 'text',
      rows: 4,
      description: 'Fine print and conditions for the promotion',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      discount: 'discount',
      discountType: 'discountType',
      isActive: 'isActive',
      media: 'image',
      startDate: 'startDate',
      endDate: 'endDate',
    },
    prepare({ title, discount, discountType, isActive, media, startDate, endDate }) {
      const discountDisplay =
        discountType === 'percentage'
          ? `${discount}% off`
          : discountType === 'dollar'
            ? `$${discount} off`
            : 'Free Service'

      const dateRange = `${new Date(startDate).toLocaleDateString()} - ${new Date(endDate).toLocaleDateString()}`
      const status = isActive ? '🟢' : '🔴'

      return {
        title: `${status} ${title}`,
        subtitle: `${discountDisplay} • ${dateRange}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Priority (High to Low)',
      name: 'priorityDesc',
      by: [{ field: 'priority', direction: 'desc' }],
    },
    {
      title: 'Start Date (Newest)',
      name: 'startDateDesc',
      by: [{ field: 'startDate', direction: 'desc' }],
    },
  ],
})
