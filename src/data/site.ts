// MOCK DATA — substituir por backend futuramente.
// Informações institucionais NÃO confirmadas ficam como `null` e são
// exibidas como placeholders visuais. Nunca preencher com dados inventados.

import type { SiteInfo, NavItem } from './types';

export const site: SiteInfo = {
  name: 'G.R.E.S. Renascer de Jacarepaguá',
  shortName: 'Renascer de Jacarepaguá',
  acronym: 'G.R.E.S.',
  fullName: 'Grêmio Recreativo Escola de Samba Renascer de Jacarepaguá',
  location: 'Jacarepaguá · Rio de Janeiro',
  tagline: 'Tradição, cultura e samba em Jacarepaguá.',
  description:
    'Site institucional da G.R.E.S. Renascer de Jacarepaguá: história, carnaval, enredos, notícias, agenda de eventos, galeria e segmentos da escola de samba do Rio de Janeiro.',

  // PLACEHOLDER — confirmar com a diretoria antes de publicar.
  address: null,
  phone: null,
  email: null,

  // PLACEHOLDER — vincular somente perfis oficiais confirmados.
  social: {
    instagram: null,
    facebook: null,
    youtube: null,
    tiktok: null,
  },
};

// Navegação global do site.
// ETAPA de aprovação da home: apenas a Home está ativa. Os itens mantêm os
// mesmos rótulos, mas apontam para '#'. Para reativar uma página, basta
// devolver o href correspondente (ex.: '/escola').
export const nav: NavItem[] = [
  { label: 'Início', href: '/' },
  {
    label: 'A Escola',
    href: '#',
    children: [
      { label: 'A Escola', href: '#' },
      { label: 'História', href: '#' },
      { label: 'Segmentos', href: '#' },
    ],
  },
  {
    label: 'Carnaval',
    href: '#',
    children: [
      { label: 'Carnaval', href: '#' },
      { label: 'Enredos', href: '#' },
    ],
  },
  { label: 'Notícias', href: '#' },
  { label: 'Agenda', href: '#' },
  { label: 'Galeria', href: '#' },
  { label: 'Contato', href: '#' },
];
