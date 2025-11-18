import { defineType, defineField } from 'sanity'

/**
 * Pricing Schema
 *
 * Manages pricing tiers and packages
 */
export default defineType({
  name: 'pricing',
  title: 'Pricing Plans',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Plan Name',
      type: 'string',
      description: 'Name of the pricing tier (e.g., "Standard", "Premium")',
      validation: (Rule) => Rule.required().max(50),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short description of who this is for',
      validation: (Rule) => Rule.max(100),
    }),
    defineField({
      name: 'basePrice',
      title: 'Base Price',
      type: 'number',
      description: 'Starting price (per month or per service)',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'pricingUnit',
      title: 'Pricing Unit',
      type: 'string',
      options: {
        list: [
          { title: 'Per Month', value: 'per-month' },
          { title: 'Per Week', value: 'per-week' },
          { title: 'Per Visit', value: 'per-visit' },
          { title: 'Per Square Foot', value: 'per-sqft' },
          { title: 'Custom Quote', value: 'custom' },
        ],
      },
      initialValue: 'per-month',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'features',
      title: 'Included Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'feature',
              title: 'Feature',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'included',
              title: 'Included',
              type: 'boolean',
              initialValue: true,
            },
          ],
          preview: {
            select: {
              title: 'feature',
              included: 'included',
            },
            prepare({ title, included }) {
              return {
                title: `${included ? '✓' : '✗'} ${title}`,
              }
            },
          },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'isPopular',
      title: 'Mark as Popular',
      type: 'boolean',
      description: 'Highlight this plan as most popular',
      initialValue: false,
    }),
    defineField({
      name: 'ctaText',
      title: 'Call-to-Action Text',
      type: 'string',
      initialValue: 'Get Quote',
      validation: (Rule) => Rule.required().max(30),
    }),
    defineField({
      name: 'ctaLink',
      title: 'Call-to-Action Link',
      type: 'string',
      initialValue: '/quote',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'minimumCommitment',
      title: 'Minimum Commitment',
      type: 'string',
      description: 'e.g., "6 months", "No contract"',
    }),
    defineField({
      name: 'serviceArea',
      title: 'Service Areas',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Locations where this plan is available',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
      validation: (Rule) => Rule.required().min(1),
      initialValue: 100,
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Show/hide this pricing plan',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      price: 'basePrice',
      unit: 'pricingUnit',
      isPopular: 'isPopular',
      isActive: 'isActive',
    },
    prepare({ title, price, unit, isPopular, isActive }) {
      const status = isActive ? '✅' : '❌'
      const popular = isPopular ? '⭐' : ''
      const priceDisplay = unit === 'custom' ? 'Custom Quote' : `$${price}/${unit}`

      return {
        title: `${status} ${popular} ${title}`,
        subtitle: priceDisplay,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Price (Low to High)',
      name: 'priceAsc',
      by: [{ field: 'basePrice', direction: 'asc' }],
    },
  ],
})
