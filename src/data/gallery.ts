// MOCK DATA — substituir por backend futuramente.
// Fotos oficiais da escola em public/assets/images/gallery/photo-1.jpg … photo-5.jpg.
// PARA TROCAR PELO ACERVO REAL: substituir os arquivos mantendo os mesmos
// nomes — nenhuma alteração de código será necessária.

import type { GalleryItem } from './types';

export const galleryCategories = ['Todos', 'Carnaval', 'Ensaios', 'Comunidade', 'Acervo'];

export const gallery: GalleryItem[] = [
  {
    id: 'photo-1',
    src: '/assets/images/gallery/photo-1.jpg',
    alt: 'Bandeiras oficiais da G.R.E.S. Renascer de Jacarepaguá',
    caption: 'Bandeiras oficiais da escola',
    category: 'Acervo',
  },
  {
    id: 'photo-2',
    src: '/assets/images/gallery/photo-2.jpg',
    alt: 'Mestre-sala e porta-bandeira da Renascer posando com a bandeira da escola',
    caption: 'Mestre-sala e porta-bandeira com a bandeira',
    category: 'Carnaval',
  },
  {
    id: 'photo-3',
    src: '/assets/images/gallery/photo-3.jpg',
    alt: 'Público reunido em mesas e cadeiras brancas durante atividade na sede da escola',
    caption: 'Público reunido na sede da escola',
    category: 'Ensaios',
  },
  {
    id: 'photo-4',
    src: '/assets/images/gallery/photo-4.jpg',
    alt: 'Entrega de troféu de homenagem durante evento da Renascer',
    caption: 'Homenagem durante evento da escola',
    category: 'Comunidade',
  },
  {
    id: 'photo-5',
    src: '/assets/images/gallery/photo-5.jpg',
    alt: 'Porta-bandeira com traje dourado e mestre-sala da Renascer durante apresentação',
    caption: 'Mestre-sala e porta-bandeira em apresentação',
    category: 'Carnaval',
  },
];

export function getGallery(category = 'Todos'): GalleryItem[] {
  if (category === 'Todos') return gallery;
  return gallery.filter((g) => g.category === category);
}
