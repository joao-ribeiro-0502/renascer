// MOCK DATA — substituir por backend futuramente.
// Nomes de direção artística, carnavalesco, intérprete e demais funções
// NÃO devem ser publicados sem fonte oficial confirmada — permanecem `null`.

import type { CarnavalFicha } from './types';

export const carnaval: CarnavalFicha = {
  year: 2026,
  status: 'Em preparação',
  enredoSlug: 'luz-de-um-novo-amanhecer',
  enredoTitle: 'Luz de um novo amanhecer',
  sambaTitle: 'A luz que nos reúne',
  sambaAuthors: [],
  ficha: [
    { label: 'Ano', value: '2026' },
    { label: 'Enredo', value: 'Luz de um novo amanhecer' },
    { label: 'Samba-enredo', value: 'A luz que nos reúne' },
    { label: 'Compositores', value: null },
    { label: 'Carnavalesco', value: null },
    { label: 'Intérprete', value: null },
    { label: 'Direção de bateria', value: null },
    { label: 'Direção de harmonia', value: null },
    { label: 'Comissão de frente', value: null },
    { label: 'Mestres-sala e porta-bandeira', value: null },
    { label: 'Alegorias e enfeites', value: null },
    { label: 'Data do desfile', value: null },
    { label: 'Local do desfile', value: null },
    { label: 'Grupo / liga', value: null },
  ],
};

export const carnavalVideos = [] as { title: string; url: string }[];
