export const demoInstructors = [
  {
    id: 'yolanda-liang',
    name: 'Yolanda Liang',
    publicTitle: 'Instructor',
    displayOrder: 1,
    bio: '[Draft] Add Yolanda Liang’s education, teaching experience, media specialties, competition mentorship, and approach to instruction.',
    credentials: [],
    specialties: [],
  },
  {
    id: 'paula-pelet-cruz',
    name: 'Paula Pelet Cruz',
    publicTitle: 'Instructor',
    displayOrder: 2,
    bio: '[Draft] Add Paula Pelet Cruz’s background in animation and Spanish instruction, relevant education or professional experience, and teaching approach.',
    credentials: [],
    specialties: [],
  },
];

export const demoPrograms = [
  {
    id: 'studio-art',
    name: 'Studio Art',
    slug: 'studio-art',
    programType: 'Studio Art',
    instructor: 'Yolanda Liang',
    primaryProgram: true,
    displayOrder: 1,
    summary: 'Learn how to draw from a professional.',
  },
  {
    id: 'animation',
    name: 'Animation',
    slug: 'animation',
    programType: 'Animation',
    instructor: 'Paula Pelet Cruz',
    primaryProgram: false,
    displayOrder: 2,
    summary: '[Draft] Class details, schedule, age range, and tuition information will be added here.',
  },
  {
    id: 'spanish',
    name: 'Spanish',
    slug: 'spanish',
    programType: 'Spanish',
    instructor: 'Paula Pelet Cruz',
    primaryProgram: false,
    displayOrder: 3,
    summary: '[Draft] Class details, schedule, age range, and tuition information will be added here.',
  },
];

export const demoArtwork = [
  { id: 'demo-1', title: 'Demo Artwork 01', student: 'Demo Student A.', program: 'Studio Art', programSlug: 'studio-art', category: 'Watercolor', medium: 'Watercolor on paper', year: 2026, ageAtCompletion: 12, image: '/demo/art-1.svg', awards: [{ competition: '[Draft] Demo Competition', awardName: '[Draft] Demo Award', year: 2026 }] },
  { id: 'demo-2', title: 'Demo Artwork 02', student: 'Demo Student B.', program: 'Studio Art', programSlug: 'studio-art', category: 'Painting', medium: 'Acrylic', year: 2026, image: '/demo/art-2.svg', awards: [] },
  { id: 'demo-3', title: 'Demo Artwork 03', student: 'Demo Student C.', program: 'Studio Art', programSlug: 'studio-art', category: 'Drawing', medium: 'Colored pencil', year: 2025, ageAtCompletion: 10, image: '/demo/art-3.svg', awards: [{ competition: '[Draft] Demo Competition', awardName: '[Draft] Demo Award', year: 2025 }] },
  { id: 'demo-4', title: 'Demo Artwork 04', student: 'Demo Student D.', program: 'Studio Art', programSlug: 'studio-art', category: 'Painting', medium: 'Oil study', year: 2025, image: '/demo/art-4.svg', awards: [] },
  { id: 'demo-5', title: 'Demo Artwork 05', student: 'Demo Student E.', program: 'Studio Art', programSlug: 'studio-art', category: 'Mixed Media', medium: 'Mixed media', year: 2026, image: '/demo/art-5.svg', awards: [] },
  { id: 'demo-6', title: 'Demo Artwork 06', student: 'Demo Student F.', program: 'Studio Art', programSlug: 'studio-art', category: 'Charcoal', medium: 'Charcoal', year: 2025, ageAtCompletion: 14, image: '/demo/art-6.svg', awards: [{ competition: '[Draft] Demo Competition', awardName: '[Draft] Demo Award', year: 2025 }] },
];

export const demoTuition = [
  {
    id: 'legacy-studio-art-fall-2025',
    program: 'Studio Art',
    programSlug: 'studio-art',
    primaryProgram: true,
    term: 'Fall 2025',
    current: true,
    effectiveDate: '2025-08-09',
    lastUpdated: '2025-08-09',
    classCount: 18,
    plans: [
      { label: 'One Hour Classes', durationMinutes: 60, semesterPrice: 540 },
      { label: 'Two Hour Classes', durationMinutes: 120, semesterPrice: 900, regularPrice: 1080 },
      { label: 'Three Hour Classes', durationMinutes: 180, semesterPrice: 1296, regularPrice: 1620 },
      { label: 'Four Hour Classes', durationMinutes: 240, semesterPrice: 1620, regularPrice: 2160 },
    ],
    notes: ['Legacy pricing from the original website. Update this rate sheet in Sanity before launch.'],
    registrationCta: 'Contact Us',
  },
];

export const demoSettings = {
  studioName: 'Liang Art Studio',
  tagline: 'Learn how to draw from a professional.',
  galleryIntro: 'Check out featured student works from Liang Art Studio classes.',
  aboutHeading: 'About Liang Art Studio',
  aboutText: 'Liang Studio is committed to various art education and training. Yolanda Liang has been engaged in art education since graduating from a professional art school. Many children have won awards in county, state, and national visual art competitions and entered top universities such as the Ivy League schools.',
  contactText: 'Yolanda Liang can be reached through WeChat. Save or screenshot the code below, then scan in the WeChat app:',
};
