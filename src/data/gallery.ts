// MOCK DATA — substituir por backend futuramente.
// As imagens atuais são grafismos provisórios derivados da bandeira oficial.
// Substituir pelo acervo fotográfico da escola quando disponível.

import type { GalleryItem } from './types';

export const galleryCategories = ['Todos', 'Carnaval', 'Ensaios', 'Comunidade', 'Acervo'];

export const gallery: GalleryItem[] = [
  {
    id: 'galeria-01',
    src: '/assets/images/gallery/galeria-01.jpg',
    alt: 'Grafismo institucional em tons escuros com a bandeira da Renascer',
    caption: 'Composição institucional · material provisório',
    category: 'Carnaval',
  },
  {
    id: 'galeria-02',
    src: '/assets/images/gallery/galeria-02.jpg',
    alt: 'Grafismo institucional em tons de vermelho com emblema da escola',
    caption: 'Estudo de identidade · material provisório',
    category: 'Acervo',
  },
  {
    id: 'galeria-03',
    src: '/assets/images/gallery/galeria-03.jpg',
    alt: 'Grafismo institucional com textura da bandeira da Renascer',
    caption: 'Textura da bandeira · material provisório',
    category: 'Ensaios',
  },
  {
    id: 'galeria-04',
    src: '/assets/images/gallery/galeria-04.jpg',
    alt: 'Grafismo institucional vertical em vermelho profundo',
    caption: 'Retrato vertical · material provisório',
    category: 'Comunidade',
  },
  {
    id: 'galeria-05',
    src: '/assets/images/gallery/galeria-05.jpg',
    alt: 'Grafismo institucional escuro com marcas da bandeira',
    caption: 'Registro de ensaio · material provisório',
    category: 'Ensaios',
  },
  {
    id: 'galeria-06',
    src: '/assets/images/gallery/galeria-06.jpg',
    alt: 'Grafismo institucional quadrado com emblema da Renascer',
    caption: 'Emblema institucional · material provisório',
    category: 'Acervo',
  },
  {
    id: 'galeria-07',
    src: '/assets/images/gallery/galeria-07.jpg',
    alt: 'Grafismo institucional largo em tons carvão',
    caption: 'Composição horizontal · material provisório',
    category: 'Carnaval',
  },
  {
    id: 'galeria-08',
    src: '/assets/images/gallery/galeria-08.jpg',
    alt: 'Grafismo institucional vertical em tons neutros',
    caption: 'Detalhe vertical · material provisório',
    category: 'Comunidade',
  },
  {
    id: 'galeria-09',
    src: '/assets/images/gallery/galeria-09.jpg',
    alt: 'Grafismo institucional quadrado em vermelho da bandeira',
    caption: 'Cor da escola · material provisório',
    category: 'Acervo',
  },
];

export function getGallery(category = 'Todos'): GalleryItem[] {
  if (category === 'Todos') return gallery;
  return gallery.filter((g) => g.category === category);
}
