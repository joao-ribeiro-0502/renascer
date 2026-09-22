// MOCK DATA — substituir por backend futuramente.
// Títulos, sambas e fichas técnicas são de demonstração até a publicação
// dos registros oficiais de cada temporada.

import type { Enredo } from './types';

export const enredos: Enredo[] = [
  {
    slug: 'luz-de-um-novo-amanhecer',
    year: 2026,
    title: 'Luz de um novo amanhecer',
    summary:
      'Uma travessia poética sobre recomeços, luz e pertencimento, contada a partir das raízes da comunidade.',
    paragraphs: [
      'O enredo convida a comunidade a atravessar a madrugada em direção a um novo amanhecer, entre imagens de luz, fogo e renascimento.',
      'A narrativa se desenvolve em quadros que celebram a memória do bairro e a força coletiva que sustenta a escola.',
      'Este registro é estrutural e aguarda a versão oficial do texto, que substituirá este conteúdo mediante integração com a gestão da escola.',
    ],
    sambaTitle: 'A luz que nos reúne',
    sambaAuthors: [],
    image: '/assets/images/enredos/enredo-01.jpg',
    imageAlt: 'Grafismo institucional do enredo de 2026 da Renascer de Jacarepaguá',
    ficha: [
      { label: 'Ano', value: '2026' },
      { label: 'Enredo', value: 'Luz de um novo amanhecer' },
      { label: 'Samba-enredo', value: 'A luz que nos reúne' },
      { label: 'Compositores', value: null },
      { label: 'Carnavalesco', value: null },
      { label: 'Intérprete', value: null },
      { label: 'Direção de bateria', value: null },
      { label: 'Harmonia', value: null },
      { label: 'Comissão de frente', value: null },
      { label: 'Alegorias e enfeites', value: null },
    ],
  },
  {
    slug: 'aguas-que-abracam-a-serra',
    year: 2025,
    title: 'As águas que abraçam a serra',
    summary:
      'Rios, memórias e paisagens do território em uma narrativa sobre a água como origem e caminho.',
    paragraphs: [
      'Uma jornada pelas águas que moldam a paisagem e a memória do território, da serra ao mar.',
      'O enredo homenageia os movimentos naturais que dão forma à vida do bairro e à identidade da comunidade.',
      'Registro estrutural — o texto oficial será inserido mediante integração com o acervo da escola.',
    ],
    sambaTitle: 'Água que faz o meu cantar',
    sambaAuthors: [],
    image: '/assets/images/enredos/enredo-02.jpg',
    imageAlt: 'Grafismo institucional do enredo de 2025 da Renascer de Jacarepaguá',
    ficha: [
      { label: 'Ano', value: '2025' },
      { label: 'Enredo', value: 'As águas que abraçam a serra' },
      { label: 'Samba-enredo', value: 'Água que faz o meu cantar' },
      { label: 'Compositores', value: null },
      { label: 'Carnavalesco', value: null },
      { label: 'Intérprete', value: null },
      { label: 'Direção de bateria', value: null },
    ],
  },
  {
    slug: 'das-raizes-ao-ceu',
    year: 2024,
    title: 'Das raízes ao céu: a força que nos move',
    summary:
      'Uma celebração das origens, do trabalho comunitário e das gerações que mantêm a escola em movimento.',
    paragraphs: [
      'Da terra das raízes ao céu das grandes noites de carnaval, a narrativa percorre gerações de dedicação coletiva.',
      'O desfile valoriza o trabalho invisível que sustenta a escola: ensaios, encontros e afeto cotidiano.',
      'Registro estrutural — aguardando o conteúdo oficial no acervo.',
    ],
    sambaTitle: 'A raiz que me faz crescer',
    sambaAuthors: [],
    image: '/assets/images/enredos/enredo-03.jpg',
    imageAlt: 'Grafismo institucional do enredo de 2024 da Renascer de Jacarepaguá',
    ficha: [
      { label: 'Ano', value: '2024' },
      { label: 'Enredo', value: 'Das raízes ao céu: a força que nos move' },
      { label: 'Samba-enredo', value: 'A raiz que me faz crescer' },
      { label: 'Compositores', value: null },
      { label: 'Carnavalesco', value: null },
      { label: 'Intérprete', value: null },
    ],
  },
  {
    slug: 'cores-que-contam-a-nossa-historia',
    year: 2023,
    title: 'Cores que contam a nossa história',
    summary:
      'Cultura popular, arte e identidade em uma narrativa sobre as cores que traduzem a memória da comunidade.',
    paragraphs: [
      'As cores da bandeira, das fantasias e das ruas compõem um painel sobre identidade e memória coletiva.',
      'A narrativa conecta a arte popular ao cotidiano de quem faz a escola todos os dias.',
      'Registro estrutural — aguardando o conteúdo oficial no acervo.',
    ],
    sambaTitle: 'Minha cor, minha história',
    sambaAuthors: [],
    image: '/assets/images/enredos/enredo-04.jpg',
    imageAlt: 'Grafismo institucional do enredo de 2023 da Renascer de Jacarepaguá',
    ficha: [
      { label: 'Ano', value: '2023' },
      { label: 'Enredo', value: 'Cores que contam a nossa história' },
      { label: 'Samba-enredo', value: 'Minha cor, minha história' },
      { label: 'Compositores', value: null },
      { label: 'Carnavalesco', value: null },
      { label: 'Intérprete', value: null },
    ],
  },
];

export function getEnredos(): Enredo[] {
  return [...enredos].sort((a, b) => b.year - a.year);
}

export function getEnredoBySlug(slug: string): Enredo | undefined {
  return enredos.find((e) => e.slug === slug);
}

export function getLatestEnredo(): Enredo {
  return getEnredos()[0];
}
