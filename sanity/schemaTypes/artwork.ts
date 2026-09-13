import { defineField, defineType } from 'sanity';

export const artwork = defineType({
  name: 'artwork',
  title: 'Student Work',
  type: 'document',
  groups: [
    { name: 'basics', title: '1. Artwork', default: true },
    { name: 'student', title: '2. Student & Photos' },
    { name: 'awards', title: '3. Awards' },
    { name: 'details', title: '4. More Details' },
  ],
  fields: [
    defineField({
      name: 'image',
      title: 'Artwork / Thumbnail Image',
      type: 'image',
      group: 'basics',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text (optional)', type: 'string' })],
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'student', title: 'Student', type: 'reference', to: [{ type: 'student' }], group: 'basics', validation: (Rule) => Rule.required(), description: 'Choose a student or create a new student from this field.' }),
    defineField({ name: 'title', title: 'Work Title (optional)', type: 'string', group: 'basics', description: 'Leave blank for “Untitled”.' }),
    defineField({
      name: 'program',
      title: 'Program',
      type: 'reference',
      to: [{ type: 'program' }],
      group: 'basics',
      initialValue: { _type: 'reference', _ref: 'program-studio-art' },
      description: 'Defaults to Studio Art. Change this for Animation or another program.',
    }),
    defineField({ name: 'category', title: 'Category (optional)', type: 'reference', to: [{ type: 'workCategory' }], group: 'basics', description: 'Choose an existing category or create a new one.' }),
    defineField({
      name: 'needsMetadataReview',
      title: 'Needs Metadata Review',
      type: 'boolean',
      group: 'basics',
      initialValue: false,
      description: 'Leave this off for normal uploads. Turn it on only while an entry is incomplete; checked works stay out of the public website until review is finished.',
    }),

    defineField({ name: 'ageAtCompletion', title: 'Age When Completed', type: 'number', group: 'student', validation: (Rule) => Rule.integer().min(3).max(100) }),
    defineField({ name: 'gradeAtCompletion', title: 'Grade When Completed', type: 'string', group: 'student', description: 'Optional. Example: 7th grade.' }),
    defineField({
      name: 'studentContextImages',
      title: 'Extra Student / Process Photos (optional)',
      type: 'array',
      group: 'student',
      description: 'Optional photos of the student creating, presenting, or receiving recognition for this work.',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, validation: (Rule) => Rule.required() }),
          defineField({ name: 'caption', title: 'Caption (optional)', type: 'string' }),
        ],
        preview: { select: { title: 'caption', media: 'image' }, prepare: ({ title, media }) => ({ title: title || 'Student / process photo', media }) },
      }],
    }),

    defineField({
      name: 'awards',
      title: 'Awards',
      type: 'array',
      group: 'awards',
      description: 'Add awards in the order you want them shown. The first award with a certificate is used on the gallery card.',
      of: [{ type: 'award' }],
    }),

    defineField({ name: 'medium', title: 'Medium / Technique', type: 'string', group: 'details' }),
    defineField({ name: 'artworkDate', title: 'Completion Date', type: 'date', group: 'details' }),
    defineField({ name: 'year', title: 'Completion Year', description: 'Use this if the exact date is unknown.', type: 'number', group: 'details', validation: (Rule) => Rule.min(1990).max(2100) }),
    defineField({ name: 'className', title: 'Class / Section', type: 'string', group: 'details' }),
    defineField({ name: 'instructors', title: 'Instructor(s)', type: 'array', of: [{ type: 'reference', to: [{ type: 'instructor' }] }], group: 'details' }),
    defineField({
      name: 'dimensions',
      title: 'Dimensions',
      type: 'object',
      group: 'details',
      fields: [
        defineField({ name: 'width', title: 'Width', type: 'number', validation: (Rule) => Rule.positive() }),
        defineField({ name: 'height', title: 'Height', type: 'number', validation: (Rule) => Rule.positive() }),
        defineField({ name: 'unit', title: 'Unit', type: 'string', options: { list: ['in', 'cm'] }, initialValue: 'in' }),
      ],
    }),
    defineField({ name: 'description', title: 'Work Description', type: 'text', rows: 4, group: 'details' }),
    defineField({ name: 'artistStatement', title: 'Artist Statement', type: 'text', rows: 5, group: 'details' }),
    defineField({ name: 'videoUrl', title: 'Animation / Video URL', type: 'url', group: 'details', description: 'For Animation work hosted on YouTube, Vimeo, or another video service. The artwork image acts as the thumbnail.' }),
  ],
  orderings: [
    { title: 'Newest', name: 'newest', by: [{ field: 'artworkDate', direction: 'desc' }, { field: '_createdAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', student: 'student.displayName', media: 'image', needsReview: 'needsMetadataReview', age: 'ageAtCompletion' },
    prepare({ title, student, media, needsReview, age }) {
      const flags = [age ? `Age ${age}` : null, needsReview ? 'Needs review' : null].filter(Boolean).join(' · ');
      return { title: title || 'Untitled', subtitle: [student, flags].filter(Boolean).join(' — '), media };
    },
  },
});
