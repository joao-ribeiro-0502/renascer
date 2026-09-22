// MOCK DATA — substituir por backend futuramente.
// Datas, locais e horários são de demonstração até a confirmação da agenda oficial.

import type { EventItem } from './types';

export const events: EventItem[] = [
  {
    slug: 'ensaio-aberto-de-carnaval',
    title: 'Ensaio aberto de carnaval',
    date: '2026-10-10',
    time: '19h30',
    location: 'Quadra da escola · Jacarepaguá',
    excerpt:
      'Ensaios abertos aproximam a comunidade da rotina de preparação da temporada.',
    description: [
      'O ensaio aberto recebe moradores, famílias e novos simpatizantes em uma noite dedicada ao ritmo e à convivência.',
      'A programação inclui a apresentação dos segmentos e a rodada de sambas da temporada.',
      'Horário e local serão confirmados pelos canais oficiais da escola.',
    ],
    image: '/assets/images/events/evento-01.jpg',
    imageAlt: 'Grafismo institucional para o evento Ensaios abertos de carnaval',
    info: [
      { label: 'Data', value: '10 de outubro de 2026' },
      { label: 'Horário', value: '19h30' },
      { label: 'Local', value: 'Quadra da escola · Jacarepaguá' },
      { label: 'Ingresso', value: null },
      { label: 'Classificação', value: null },
    ],
  },
  {
    slug: 'reuniao-geral-de-segmentos',
    title: 'Reunião geral de segmentos',
    date: '2026-10-24',
    time: '15h00',
    location: 'Sede da escola · Jacarepaguá',
    excerpt:
      'Encontro entre a coordenação e os responsáveis de cada segmento para a programação do calendário.',
    description: [
      'A reunião reúne lideranças e responsáveis de todos os segmentos para o alinhamento do calendário institucional.',
      'Serão apresentadas as etapas da temporada, os compromissos públicos e as orientações gerais de convivência.',
      'A pauta completa será divulgada previamente.',
    ],
    image: '/assets/images/events/evento-02.jpg',
    imageAlt: 'Grafismo institucional para a Reunião geral de segmentos',
    info: [
      { label: 'Data', value: '24 de outubro de 2026' },
      { label: 'Horário', value: '15h00' },
      { label: 'Local', value: 'Sede da escola · Jacarepaguá' },
      { label: 'Público', value: 'Segmentos e diretoria' },
    ],
  },
  {
    slug: 'apresentacao-do-samba-enredo',
    title: 'Apresentação oficial do samba-enredo',
    date: '2026-11-14',
    time: '20h00',
    location: 'A confirmar',
    excerpt:
      'A comunidade conhece oficialmente o samba-enredo da temporada em uma noite dedicada à música.',
    description: [
      'A noite dedicada à apresentação do samba-enredo reúne a comunidade em torno da música que representa a temporada.',
      'O evento contará com a presença dos segmentos e convidados, com programação a ser detalhada.',
      'Local, horário final e demais informações serão confirmados oficialmente.',
    ],
    image: '/assets/images/events/evento-03.jpg',
    imageAlt: 'Grafismo institucional para a apresentação do samba-enredo',
    info: [
      { label: 'Data', value: '14 de novembro de 2026' },
      { label: 'Horário', value: '20h00' },
      { label: 'Local', value: null },
      { label: 'Ingresso', value: null },
    ],
  },
  {
    slug: 'ensaio-geral-de-pavilhao',
    title: 'Ensaio geral de pavilhão',
    date: '2026-12-05',
    time: '19h00',
    location: 'Quadra da escola · Jacarepaguá',
    excerpt:
      'Espaço reservado para o ensaio completo dos segmentos, com evolução e apresentação das alas.',
    description: [
      'O ensaio geral reúne todos os segmentos para o trabalho de evolução e presença em cena.',
      'É um momento importante de integração entre as alas antes dos compromissos da temporada.',
      'Detalhes da programação serão informados pelos canais oficiais.',
    ],
    image: '/assets/images/events/evento-04.jpg',
    imageAlt: 'Grafismo institucional para o ensaio geral de pavilhão',
    info: [
      { label: 'Data', value: '5 de dezembro de 2026' },
      { label: 'Horário', value: '19h00' },
      { label: 'Local', value: 'Quadra da escola · Jacarepaguá' },
    ],
  },
  {
    slug: 'festa-de-encerramento',
    title: 'Festa de encerramento da temporada',
    date: '2026-12-19',
    time: '18h00',
    location: 'A confirmar',
    excerpt:
      'A comunidade celebra o fim de um ciclo de trabalho com música, confraternização e reconhecimento aos segmentos.',
    description: [
      'A festa de encerramento confraterniza a comunidade e celebra o trabalho de toda a temporada.',
      'A programação inclui apresentações musicais e a homenagem aos participantes dos segmentos.',
      'Local e demais detalhes serão confirmados em breve.',
    ],
    image: '/assets/images/news/noticia-02.jpg',
    imageAlt: 'Grafismo institucional para a festa de encerramento da temporada',
    info: [
      { label: 'Data', value: '19 de dezembro de 2026' },
      { label: 'Horário', value: '18h00' },
      { label: 'Local', value: null },
    ],
  },
];

export function getEvents(): EventItem[] {
  return [...events].sort((a, b) => (a.date < b.date ? -1 : 1));
}

export function getEventBySlug(slug: string): EventItem | undefined {
  return events.find((e) => e.slug === slug);
}

export function getUpcomingEvents(count = 3): EventItem[] {
  return getEvents().slice(0, count);
}
