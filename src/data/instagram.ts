// MOCK DATA — substituir pela resposta da API do Instagram futuramente.
// Estrutura de troca simples: quando a API estiver disponível, mapear a
// resposta para InstagramProfile/InstagramPost[] e repassar ao componente
// InstagramFeed — nenhum outro ajuste será necessário.

export interface InstagramProfile {
  /** PLACEHOLDER — confirmar o @ oficial do perfil antes de publicar. */
  handle: string;
  name: string;
  avatar: string;
  /** '#' nesta etapa; substituir pela URL do perfil quando confirmado. */
  link: string;
}

export interface InstagramPost {
  id: string;
  image: string;
  alt: string;
  caption: string;
  likes: number;
  comments: number;
  /** Data ISO (YYYY-MM-DD) — usada pela exibição da API futuramente. */
  date: string;
  /** '#' nesta etapa; a API fornecerá o link real de cada publicação. */
  permalink: string;
}

export const instagramProfile: InstagramProfile = {
  handle: '@renascerdejacarepagua',
  name: 'G.R.E.S. Renascer de Jacarepaguá',
  avatar: '/assets/images/logo-renascer-256.png',
  link: '#',
};

export const instagramPosts: InstagramPost[] = [
  {
    id: 'ig-01',
    image: '/assets/images/hero/foto-3-900.jpg',
    alt: 'Integrantes da comunidade da Renascer reunidas em foto de grupo',
    caption: 'A comunidade da Renascer reunida.',
    likes: 264,
    comments: 24,
    date: '2026-09-21',
    permalink: '#',
  },
  {
    id: 'ig-02',
    image: '/assets/images/hero/foto-1-900.jpg',
    alt: 'Bandeira oficial da Renascer de Jacarepaguá erguida durante solenidade na escola',
    caption: 'A bandeira da Renascer em solenidade na escola.',
    likes: 148,
    comments: 12,
    date: '2026-09-17',
    permalink: '#',
  },
  {
    id: 'ig-03',
    image: '/assets/images/hero/foto-4-900.jpg',
    alt: 'Integrantes da bateria da Renascer em ensaio, tocando pandeiros',
    caption: 'A bateria em ensaio, tocando pandeiros.',
    likes: 176,
    comments: 9,
    date: '2026-09-13',
    permalink: '#',
  },
  {
    id: 'ig-04',
    image: '/assets/images/hero/foto-2-900.jpg',
    alt: 'Casal de mestre-sala e porta-bandeira da Renascer em apresentação no salão da escola',
    caption: 'Mestre-sala e porta-bandeira no salão da escola.',
    likes: 212,
    comments: 18,
    date: '2026-09-08',
    permalink: '#',
  },
  {
    id: 'ig-05',
    image: '/assets/images/bandeira-renascer.png',
    alt: 'Bandeira oficial da G.R.E.S. Renascer de Jacarepaguá',
    caption: 'Vermelho e branco: as cores da escola.',
    likes: 97,
    comments: 6,
    date: '2026-09-03',
    permalink: '#',
  },
  {
    id: 'ig-06',
    image: '/assets/images/enredos/enredo-oficial.jpg',
    alt: 'Arte oficial do enredo do Carnaval 2027 da Renascer de Jacarepaguá',
    caption: 'Arte oficial do enredo do Carnaval 2027.',
    likes: 331,
    comments: 41,
    date: '2026-08-28',
    permalink: '#',
  },
];
