// src/blocks/TestimonialSlider/config.ts
import type { Block } from 'payload'
import { blockFields } from '../shared.ts'

export const TestimonialSliderBlock: Block = {
  slug: 'testimonial-slider',
  labels: { singular: 'Testimonial Slider', plural: 'Testimonial Sliders' },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'testimonials',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'quote', type: 'textarea', required: true },
        { name: 'author', type: 'text', required: true },
        { name: 'location', type: 'text' },
      ],
    },
    ...blockFields,
  ],
}
