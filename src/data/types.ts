/**
 * Tipos de domínio do site institucional.
 * Os objetos retornados por src/data/* seguem estes contratos, o que facilita
 * a futura troca por respostas de API sem alterar os componentes.
 */

export interface NavChild {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href?: string;
  children?: NavChild[];
}

export interface SocialLinks {
  instagram: string | null;
  facebook: string | null;
  youtube: string | null;
  tiktok: string | null;
}

export interface SiteInfo {
  name: string;
  shortName: string;
  acronym: string;
  fullName: string;
  location: string;
  tagline: string;
  description: string;
  address: string | null;
  phone: string | null;
  email: string | null;
  social: SocialLinks;
}

export interface NewsItem {
  slug: string;
  title: string;
  category: string;
  date: string; // ISO: YYYY-MM-DD
  excerpt: string;
  content: string[];
  author: string | null;
  image: string;
  imageAlt: string;
}

export interface EventInfo {
  label: string;
  value: string | null;
}

export interface EventItem {
  slug: string;
  title: string;
  date: string; // ISO: YYYY-MM-DD
  time: string | null;
  location: string | null;
  excerpt: string;
  description: string[];
  image: string;
  imageAlt: string;
  info: EventInfo[];
}

export interface FichaTecnicaItem {
  label: string;
  value: string | null;
}

export interface Enredo {
  slug: string;
  year: number;
  title: string;
  summary: string;
  paragraphs: string[];
  sambaTitle: string | null;
  sambaAuthors: string[];
  image: string;
  imageAlt: string;
  ficha: FichaTecnicaItem[];
}

export interface Segment {
  slug: string;
  name: string;
  summary: string;
  description: string[];
  image: string;
  imageAlt: string;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: string;
}

export interface DirectorateMember {
  role: string;
  name: string;
  photo: string;
}

export interface TimelineEntry {
  period: string | null;
  title: string;
  text: string;
}

export interface CarnavalFicha {
  year: number;
  status: string;
  enredoSlug: string | null;
  enredoTitle: string | null;
  sambaTitle: string | null;
  sambaAuthors: string[];
  ficha: FichaTecnicaItem[];
}
