import { client, sanityConfigured, sanityImageUrl } from './sanity';
import { demoArtwork, demoInstructors, demoPrograms, demoSettings, demoTuition } from '../data/demo';

export type Award = {
  competition?: string;
  awardName?: string;
  division?: string;
  level?: string;
  year?: number;
  date?: string;
  url?: string;
  notes?: string;
  certificateImage?: string;
  additionalMedia?: Array<{ image: string; kind?: string; caption?: string }>;
};

export type Instructor = {
  id: string;
  name: string;
  publicTitle?: string;
  displayOrder?: number;
  bio?: string;
  photo?: string;
  credentials?: string[];
  specialties?: string[];
};

export type Program = {
  id: string;
  name: string;
  slug: string;
  programType?: string;
  instructor?: string;
  additionalInstructors?: string[];
  primaryProgram?: boolean;
  displayOrder?: number;
  summary?: string;
  details?: string;
  ageRange?: string;
  scheduleSummary?: string;
  enrollmentStatus?: string;
  registrationNote?: string;
  image?: string;
};

export type Artwork = {
  id: string;
  title: string;
  student: string;
  program?: string;
  programSlug?: string;
  category: string;
  medium?: string;
  year?: number;
  artworkDate?: string;
  className?: string;
  description?: string;
  artistStatement?: string;
  videoUrl?: string;
  needsMetadataReview?: boolean;
  image: string;
  imageLarge?: string;
  alt?: string;
  ageAtCompletion?: number;
  gradeAtCompletion?: string;
  dimensions?: { width?: number; height?: number; unit?: string };
  instructors?: string[];
  studentPhoto?: string;
  studentContextImages?: Array<{ image: string; caption?: string }>;
  awards: Award[];
  createdAt?: string;
  sortDate?: number;
};

export type SiteSettings = {
  studioName: string;
  tagline: string;
  galleryIntro: string;
  aboutHeading: string;
  aboutText: string;
  contactText: string;
  studioPhotoUrl?: string;
  wechatQrUrl?: string;
  email?: string;
  phone?: string;
  address?: string;
  instagram?: string;
  registrationUrl?: string;
  googleMapsUrl?: string;
  hoursSummary?: string;
  serviceAreas?: string[];
  seoTitle?: string;
  seoDescription?: string;
  socialShareImageUrl?: string;
  homepageVideoUrl?: string;
  homepageVideoPosterUrl?: string;
};

export type TuitionSheet = {
  id?: string;
  program: string;
  programSlug?: string;
  primaryProgram?: boolean;
  term: string;
  current?: boolean;
  effectiveDate?: string;
  lastUpdated?: string;
  classCount?: number;
  plans: Array<{ label: string; durationMinutes?: number; semesterPrice: number; regularPrice?: number; note?: string }>;
  notes?: string[];
  registrationCta?: string;
};

export type Faq = {
  id: string;
  question: string;
  answer: string;
  category?: string;
  displayOrder?: number;
};

const artworkQuery = `*[_type == "artwork" && defined(image.asset) && defined(student->displayName) && coalesce(needsMetadataReview, false) != true] | order(artworkDate desc, _createdAt desc) {
  "id": _id,
  "createdAt": _createdAt,
  "title": coalesce(title, "Untitled"),
  "student": student->displayName,
  "studentPhoto": student->photo,
  "program": program->name,
  "programSlug": program->slug.current,
  "instructors": instructors[]->name,
  "category": category->name,
  medium,
  year,
  artworkDate,
  className,
  description,
  artistStatement,
  videoUrl,
  needsMetadataReview,
  ageAtCompletion,
  gradeAtCompletion,
  dimensions,
  "studentContextImages": studentContextImages[]{image, caption},
  image,
  "alt": image.alt,
  awards[]{
    "competition": coalesce(competition->name, competitionNameOverride),
    awardName,
    division,
    level,
    year,
    date,
    "url": coalesce(url, competition->website),
    notes,
    certificateImage,
    "additionalMedia": additionalAwardMedia[]{image, kind, caption}
  }
}`;

export async function getArtwork(): Promise<Artwork[]> {
  if (!sanityConfigured || !client) return demoArtwork;
  const rows = await client.fetch<any[]>(artworkQuery);
  const mapped = rows.map((row) => {
    const exactDate = row.artworkDate ? Date.parse(row.artworkDate) : Number.NaN;
    const yearDate = row.year ? Date.UTC(Number(row.year), 11, 31) : Number.NaN;
    const createdDate = row.createdAt ? Date.parse(row.createdAt) : 0;
    const sortDate = Number.isFinite(exactDate)
      ? exactDate
      : Number.isFinite(yearDate)
        ? yearDate
        : createdDate;

    return {
      ...row,
      sortDate,
      image: sanityImageUrl(row.image, 900),
      imageLarge: sanityImageUrl(row.image, 1800),
      studentPhoto: row.studentPhoto ? sanityImageUrl(row.studentPhoto, 500) : undefined,
      studentContextImages: (row.studentContextImages || []).map((item: any) => ({
        ...item,
        image: item.image ? sanityImageUrl(item.image, 900) : undefined,
      })).filter((item: any) => item.image),
      alt: row.alt || `${row.title} by ${row.student}`,
      awards: (row.awards || []).map((award: any) => ({
        ...award,
        certificateImage: award.certificateImage ? sanityImageUrl(award.certificateImage, 1200) : undefined,
        additionalMedia: (award.additionalMedia || []).map((item: any) => ({
          ...item,
          image: item.image ? sanityImageUrl(item.image, 1200) : undefined,
        })).filter((item: any) => item.image),
      })),
    };
  });

  return mapped.sort((a, b) => (b.sortDate || 0) - (a.sortDate || 0));
}

export async function getRecentArtwork(limit = 6) {
  const artwork = await getArtwork();
  return artwork.slice(0, limit);
}

export async function getPrograms(): Promise<Program[]> {
  if (!sanityConfigured || !client) return demoPrograms;
  const rows = await client.fetch<any[]>(`*[_type == "program"] | order(coalesce(displayOrder, 9999) asc, name asc) {
    "id": _id,
    name,
    "slug": slug.current,
    programType,
    "instructor": instructor->name,
    "additionalInstructors": additionalInstructors[]->name,
    primaryProgram,
    displayOrder,
    summary,
    details,
    ageRange,
    scheduleSummary,
    enrollmentStatus,
    registrationNote,
    featuredImage
  }`);
  return rows.map((row) => ({
    ...row,
    image: row.featuredImage ? sanityImageUrl(row.featuredImage, 1200) : undefined,
  }));
}

export async function getInstructors(): Promise<Instructor[]> {
  if (!sanityConfigured || !client) return demoInstructors;
  const rows = await client.fetch<any[]>(`*[_type == "instructor"] | order(coalesce(displayOrder, 9999) asc, name asc) {
    "id": _id,
    name,
    publicTitle,
    displayOrder,
    bio,
    photo,
    credentials,
    specialties
  }`);
  return rows.map((row) => ({
    ...row,
    photo: row.photo ? sanityImageUrl(row.photo, 900) : undefined,
  }));
}

export async function getTuitionSheets(): Promise<TuitionSheet[]> {
  if (!sanityConfigured || !client) return demoTuition;
  const rows = await client.fetch<any[]>(`*[_type == "tuition" && current == true] | order(coalesce(displayOrder, 9999) asc, program->displayOrder asc, term desc) {
    "id": _id,
    "program": program->name,
    "programSlug": program->slug.current,
    "primaryProgram": program->primaryProgram,
    term,
    current,
    effectiveDate,
    lastUpdated,
    classCount,
    plans,
    notes,
    registrationCta
  }`);
  return rows.length ? rows : demoTuition;
}

export async function getPrimaryTuition(): Promise<TuitionSheet> {
  const sheets = await getTuitionSheets();
  return (sheets.find((sheet) => sheet.primaryProgram) || sheets[0]) as TuitionSheet;
}

export async function getFaqs(): Promise<Faq[]> {
  if (!sanityConfigured || !client) return [];
  return client.fetch<Faq[]>(`*[_type == "faq"] | order(coalesce(displayOrder, 9999) asc, question asc) {
    "id": _id,
    question,
    answer,
    category,
    displayOrder
  }`);
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!sanityConfigured || !client) return demoSettings;
  const row = await client.fetch<any>(`*[_type == "siteSettings" && _id == "siteSettings"][0]{studioName,tagline,galleryIntro,aboutHeading,aboutText,studioPhoto,wechatQr,contactText,email,phone,address,instagram,registrationUrl,googleMapsUrl,hoursSummary,serviceAreas,seoTitle,seoDescription,socialShareImage,"homepageVideoUrl": homepageVideo.asset->url,homepageVideoPoster}`);
  if (!row) return demoSettings;
  return {
    ...demoSettings,
    ...row,
    studioPhotoUrl: row.studioPhoto ? sanityImageUrl(row.studioPhoto, 1200) : undefined,
    wechatQrUrl: row.wechatQr ? sanityImageUrl(row.wechatQr, 900) : undefined,
    socialShareImageUrl: row.socialShareImage ? sanityImageUrl(row.socialShareImage, 1600) : undefined,
    homepageVideoUrl: row.homepageVideoUrl || undefined,
    homepageVideoPosterUrl: row.homepageVideoPoster ? sanityImageUrl(row.homepageVideoPoster, 1800) : undefined,
  };
}
