import { defineType, defineField } from 'sanity'

/**
 * Hero Section Schema
 *
 * Manages hero sections for different pages
 */
export default defineType({
  name: 'hero',
  title: 'Hero Sections',
  type: 'document',
  fields: [
    defineField({
      name: 'page',
      title: 'Page',
      type: 'string',
      options: {
        list: [
          { title: 'Homepage', value: 'homepage' },
          { title: 'Services', value: 'services' },
          { title: 'About', value: 'about' },
          { title: 'Contact', value: 'contact' },
          { title: 'Quote', value: 'quote' },
          { title: 'Careers', value: 'careers' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
      description: 'Main hero headline',
      validation: (Rule) => Rule.required().max(100),
    }),
    defineField({
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      rows: 3,
      description: 'Supporting text under the headline',
      validation: (Rule) => Rule.max(250),
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
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
      name: 'primaryCTA',
      title: 'Primary Call-to-Action',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          validation: (Rule) => Rule.required().max(30),
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'secondaryCTA',
      title: 'Secondary Call-to-Action',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
          validation: (Rule) => Rule.max(30),
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'trustSignals',
      title: 'Trust Signals',
      type: 'array',
      description: 'Small badges/stats to display (e.g., "4.8★ Rating")',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.max(4),
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      description: 'Use this hero section',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      page: 'page',
      headline: 'headline',
      isActive: 'isActive',
      media: 'backgroundImage',
    },
    prepare({ page, headline, isActive, media }) {
      const status = isActive ? '✅' : '❌'
      return {
        title: `${status} ${page.charAt(0).toUpperCase() + page.slice(1)}`,
        subtitle: headline,
        media,
      }
    },
  },
})
