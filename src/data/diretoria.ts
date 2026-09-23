// MOCK DATA — substituir por backend futuramente.
// Presidente (André Augusto "Dedé") e Carnavalesco (Rodrigo Pacheco) são
// dados confirmados. OS DEMAIS NOMES SÃO PLACEHOLDERS TEMPORÁRIOS — substituir
// pelos nomes oficiais quando forem informados pela gestão da escola.
// As fotos são retratos ilustrativos de licença livre (Unsplash); substituir
// pelo acervo oficial em /assets/images/directorate/ quando disponível.

import type { DirectorateMember } from './types';

export const diretoria: DirectorateMember[] = [
  {
    role: 'Presidente',
    name: 'André Augusto (Dedé)',
    photo: '/assets/images/directorate/presidente.jpg',
  },
  {
    role: 'Vice-Presidente',
    name: 'Marcelo Andrade',
    photo: '/assets/images/directorate/vice-presidente.jpg',
  },
  {
    role: 'Coreógrafo',
    name: 'Thiago Ramalho',
    photo: '/assets/images/directorate/coreografo.jpg',
  },
  {
    role: 'Diretor de Carnaval',
    name: 'Fábio Menezes',
    photo: '/assets/images/directorate/diretor-carnaval.jpg',
  },
  {
    role: 'Diretor de Harmonia',
    name: 'Ricardo Alencar',
    photo: '/assets/images/directorate/diretor-harmonia.jpg',
  },
  {
    role: 'Carnavalesco',
    name: 'Rodrigo Pacheco',
    photo: '/assets/images/directorate/carnavalesco.jpg',
  },
  {
    role: '1º Casal',
    name: 'Camila Ferraz e Diego Sant’Anna',
    photo: '/assets/images/directorate/primeiro-casal.jpg',
  },
  {
    role: '2º Casal',
    name: 'Larissa Muniz e Wagner Oliveira',
    photo: '/assets/images/directorate/segundo-casal.jpg',
  },
  {
    role: 'Diretora de Baianas',
    name: 'Cleide dos Santos',
    photo: '/assets/images/directorate/diretora-baianas.jpg',
  },
  {
    role: 'Diretora de Passistas',
    name: 'Juliana Peçanha',
    photo: '/assets/images/directorate/diretora-passistas.jpg',
  },
  {
    role: 'Mestre de Bateria',
    name: 'Alexandre Cortez',
    photo: '/assets/images/directorate/mestre-bateria.jpg',
  },
  {
    role: 'Rainha de Bateria',
    name: 'Patrícia Gomes',
    photo: '/assets/images/directorate/rainha-bateria.jpg',
  },
];
