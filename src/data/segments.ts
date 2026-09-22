// MOCK DATA — substituir por backend futuramente.
// Os segmentos abaixo são estruturais (comuns às escolas de samba).
// Descrições e composições devem ser confirmadas com a diretoria da escola.

import type { Segment } from './types';

export const segments: Segment[] = [
  {
    slug: 'bateria',
    name: 'Bateria',
    summary: 'O coração rítmico da escola: pulso, força e afinação.',
    description: [
      'A bateria é o motor rítmico da escola, responsável pelo pulso que conduz o desfile e os ensaios.',
      'Seu trabalho reúne marcação, afinação e presença cênica, construídos ao longo de toda a temporada.',
      'A liderança e a composição atual do grupo serão confirmadas oficialmente antes da publicação definitiva.',
    ],
    image: '/assets/images/segments/segmento-01.jpg',
    imageAlt: 'Grafismo institucional representando a bateria da Renascer',
  },
  {
    slug: 'harmonia',
    name: 'Harmonia',
    summary: 'A arte de dar forma e movimento à escola no desfile.',
    description: [
      'A harmonia responde pela articulação entre alas, fantasias e movimento, garantindo a leitura coletiva do desfile.',
      'É um segmento técnico, que trabalha em conjunto com carnavalesco, direção artística e demais alas.',
      'Composição e coordenação atuais: a confirmar.',
    ],
    image: '/assets/images/segments/segmento-02.jpg',
    imageAlt: 'Grafismo institucional representando a harmonia da escola',
  },
  {
    slug: 'passistas',
    name: 'Passistas',
    summary: 'Elegância, leveza e presença na evolução da escola.',
    description: [
      'Os passistas carregam leveza e elegância para a evolução, com um trabalho dedicado à presença e à dança.',
      'O segmento representa a juventude e a vitalidade da escola nos ensaios e nos desfiles.',
      'Inscrições e coordenação: a confirmar pelos canais oficiais.',
    ],
    image: '/assets/images/segments/segmento-03.jpg',
    imageAlt: 'Grafismo institucional representando os passistas da escola',
  },
  {
    slug: 'baianas',
    name: 'Baianas',
    summary: 'Tradição, ancestralidade e memória viva do samba.',
    description: [
      'As baianas guardam uma das tradições mais profundas do samba, representando ancestralidade e memória.',
      'Sua presença dá dignidade e continuidade à história que a escola carrega.',
      'Registro de integrantes e coordenação: a confirmar.',
    ],
    image: '/assets/images/segments/segmento-04.jpg',
    imageAlt: 'Grafismo institucional representando o segmento de baianas',
  },
  {
    slug: 'ala-musical',
    name: 'Ala Musical',
    summary: 'Instrumentos e melodia que dão cor ao desfile.',
    description: [
      'A ala musical amplia o universo sonoro da escola com instrumentos que acompanham a evolução.',
      'Seu trabalho se integra à bateria e à harmonia na construção da paisagem musical.',
      'Composição atual: a confirmar.',
    ],
    image: '/assets/images/segments/segmento-05.jpg',
    imageAlt: 'Grafismo institucional representando a ala musical',
  },
  {
    slug: 'comissao-de-frente',
    name: 'Comissão de Frente',
    summary: 'A abertura coreográfica que apresenta a narrativa.',
    description: [
      'A comissão de frente abre a apresentação da escola com uma coreografia que anuncia o enredo.',
      'É o primeiro capítulo da narrativa, trabalhado com direção coreográfica específica.',
      'Direção e integrantes: a confirmar.',
    ],
    image: '/assets/images/segments/segmento-06.jpg',
    imageAlt: 'Grafismo institucional representando a comissão de frente',
  },
  {
    slug: 'velha-guarda',
    name: 'Velha Guarda',
    summary: 'A memória que ensina e a história que continua.',
    description: [
      'A velha guarda reúne quem construiu décadas de história e segue transmitindo saberes às novas gerações.',
      'Sua presença é o elo direto entre a origem da escola e o presente da comunidade.',
      'Registro de integrantes: a confirmar com a diretoria.',
    ],
    image: '/assets/images/segments/segmento-07.jpg',
    imageAlt: 'Grafismo institucional representando a velha guarda',
  },
  {
    slug: 'mestres-sala-e-porta-bandeira',
    name: 'Mestres-sala e Porta-bandeira',
    summary: 'A bandeira da escola, levada com orgulho e precisão.',
    description: [
      'O casal de mestres-sala e porta-bandeira conduz a bandeira institucional com precisão, elegância e orgulho.',
      'É um dos trabalhos mais tradicionais e exigentes da escola de samba.',
      'Casal atual: a confirmar oficialmente.',
    ],
    image: '/assets/images/segments/segmento-08.jpg',
    imageAlt: 'Grafismo institucional representando mestres-sala e porta-bandeira',
  },
];

export function getSegments(): Segment[] {
  return segments;
}

export function getSegmentBySlug(slug: string): Segment | undefined {
  return segments.find((s) => s.slug === slug);
}
