// MOCK DATA — substituir por backend futuramente.
// Textos de demonstração para validar o layout do catálogo de notícias.
// Substituir por conteúdo editorial oficial quando a API/CMS estiver disponível.

import type { NewsItem } from './types';

export const news: NewsItem[] = [
  {
    slug: 'ensaios-da-temporada',
    title: 'A escola inicia os ensaios da nova temporada de carnaval',
    category: 'Carnaval',
    date: '2026-09-12',
    excerpt:
      'Com a temporada em ritmo de preparação, os ensaios semanais retomam a rotina na quadra da escola e movimentam a comunidade.',
    content: [
      'A rotina de ensaios da escola entra em uma nova fase com o início da temporada de carnaval. Nos encontros semanais, segmentos e comunidade se reúnem em torno do ritmo, da letra e da experiência coletiva que define a trajetória da Renascer.',
      'A programação dos próximos meses prevê o aprofundamento do trabalho com os segmentos, a apresentação dos arranjos musicais e a preparação das alas para os compromissos do calendário institucional.',
      'Os detalhes de cada etapa serão divulgados progressivamente nas páginas de Agenda e Notícias do site oficial.',
    ],
    author: 'Comunicação · G.R.E.S. Renascer de Jacarepaguá',
    image: '/assets/images/news/noticia-01.jpg',
    imageAlt: 'Grafismo institucional com a bandeira da Renascer de Jacarepaguá',
  },
  {
    slug: 'inscricoes-novos-membros',
    title: 'Inscrições para novos membros abrem neste mês',
    category: 'Comunidade',
    date: '2026-09-02',
    excerpt:
      'Quer fazer parte da Renascer? A escola abre o período de inscrições para quem deseja integrar os segmentos e a comunidade.',
    content: [
      'A escola abre o período de inscrições para novos membros interessados em participar das atividades ao longo do ano. O processo é conduzido pelos responsáveis de cada segmento.',
      'Inscrições, documentação e calendário de acolhimento serão informados pelos canais oficiais de comunicação da instituição.',
      'A escola reforça que toda a documentação e os contatos oficiais serão divulgados exclusivamente pelos perfis oficiais da Renascer.',
    ],
    author: 'Comunicação · G.R.E.S. Renascer de Jacarepaguá',
    image: '/assets/images/news/noticia-02.jpg',
    imageAlt: 'Grafismo institucional em tons de vermelho com emblema da escola',
  },
  {
    slug: 'segmentos-na-quadra',
    title: 'Segmentos se preparam para as apresentações do fim de semana',
    category: 'Segmentos',
    date: '2026-08-24',
    excerpt:
      'Bateria, passistas, baianas e harmonia revezam ensaios e reforçam a preparação para os próximos compromissos.',
    content: [
      'A preparação dos segmentos segue intensa nos ensaios das últimas semanas. Cada ala trabalha em ritmo próprio, com foco na evolução e na presença em cena.',
      'A coordenação da escola destaca a dedicação dos participantes e o protagonismo da velha guarda na transmissão de saberes para as novas gerações.',
      'Novos registros das apresentações serão publicados na galeria do site.',
    ],
    author: null,
    image: '/assets/images/news/noticia-03.jpg',
    imageAlt: 'Grafismo institucional com textura da bandeira da Renascer',
  },
  {
    slug: 'bateria-novos-arranjos',
    title: 'A bateria ensaia novos arranjos para a temporada',
    category: 'Música',
    date: '2026-08-10',
    excerpt:
      'O trabalho com a bateria ganha novos arranjos e marcações, em ensaios dedicados à afinação do grupo.',
    content: [
      'A bateria da Renascer mantém ensaios dedicados ao trabalho de marcação e afinação, sob a coordenação de sua liderança musical.',
      'Os arranjos em construção farão parte do repertório oficial da temporada, que será apresentado progressivamente à comunidade.',
      'A escola reforça que as informações sobre a direção artística serão confirmadas oficialmente antes da publicação definitiva.',
    ],
    author: null,
    image: '/assets/images/news/noticia-04.jpg',
    imageAlt: 'Grafismo institucional escuro com emblema da Renascer',
  },
  {
    slug: 'acervo-digital',
    title: 'Acervo digital da escola ganha nova estrutura',
    category: 'Institucional',
    date: '2026-07-28',
    excerpt:
      'O novo site institucional passa a reunir enredos, histórias e imagens em um acervo organizado para a comunidade.',
    content: [
      'O acervo digital da Renascer entra em processo de organização com o novo site institucional. Enredos, registros históricos e imagens passam a ter um endereço permanente.',
      'A estrutura foi pensada para receber, no futuro, informações oficiais vindas da gestão da escola e de seus segmentos.',
      'Contribuições da comunidade para o acervo podem ser encaminhadas pelos canais oficiais de contato.',
    ],
    author: null,
    image: '/assets/images/school/escola-01.jpg',
    imageAlt: 'Grafismo institucional com a bandeira da Renascer de Jacarepaguá',
  },
  {
    slug: 'agenda-cultural-jacarepagua',
    title: 'Agenda cultural de Jacarepaguá reúne ensaios e encontros',
    category: 'Agenda',
    date: '2026-07-15',
    excerpt:
      'Confira os próximos compromissos da escola no bairro e a programação oficial da temporada.',
    content: [
      'A programação da temporada reúne ensaios abertos, reuniões de segmentos e eventos culturais no calendário institucional.',
      'A Agenda do site é atualizada regularmente com data, horário e local de cada compromisso.',
      'A comunidade pode consultar também os detalhes de cada evento na página dedicada.',
    ],
    author: null,
    image: '/assets/images/events/evento-01.jpg',
    imageAlt: 'Grafismo institucional com cores da bandeira da Renascer',
  },
];

export function getNews(): NewsItem[] {
  return [...news].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getNewsBySlug(slug: string): NewsItem | undefined {
  return news.find((n) => n.slug === slug);
}

export function getLatestNews(count = 3): NewsItem[] {
  return getNews().slice(0, count);
}
