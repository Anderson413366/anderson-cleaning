import { defineType, defineField } from 'sanity'

/**
 * FAQ Schema
 *
 * Manages frequently asked questions displayed across the website
 */
export default defineType({
  name: 'faq',
  title: 'FAQs',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      description: 'The frequently asked question',
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 5,
      description: 'Detailed answer to the question',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'General', value: 'general' },
          { title: 'Services', value: 'services' },
          { title: 'Pricing', value: 'pricing' },
          { title: 'Scheduling', value: 'scheduling' },
          { title: 'Policies', value: 'policies' },
        ],
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'general',
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
      description: 'Show/hide this FAQ',
      initialValue: true,
    }),
    defineField({
      name: 'relatedServices',
      title: 'Related Services',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
      description: 'Show this FAQ on specific service pages',
    }),
    defineField({
      name: 'relatedIndustries',
      title: 'Related Industries',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'industry' }] }],
      description: 'Show this FAQ on specific industry pages',
    }),
  ],
  preview: {
    select: {
      title: 'question',
      category: 'category',
      order: 'order',
      isActive: 'isActive',
    },
    prepare({ title, category, order, isActive }) {
      const status = isActive ? '✅' : '❌'
      return {
        title: `${status} ${title}`,
        subtitle: `${category} • Order: ${order}`,
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
      title: 'Category',
      name: 'categoryAsc',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
  ],
})
