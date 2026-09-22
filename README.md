# G.R.E.S. Renascer de Jacarepaguá — Site Institucional

Frontend do site institucional da **G.R.E.S. Renascer de Jacarepaguá**.
Projeto multipágina, estático, preparado para receber backend futuramente.

## Stack

- [Astro 7](https://astro.build) — build estático, SEO nativo, HTML semântico
- Tipografia: Playfair Display + Inter (auto-hospedadas via `@fontsource`)
- Estilos: CSS próprio com design tokens (`src/styles/global.css`)
- Imagens: processadas com `sharp` (`scripts/process-images.mjs`)
- Sem frameworks de runtime — JS mínimo e vanilla (menu, filtros, lightbox, formulário)

## Como executar

```bash
npm install        # instalar dependências
npm run dev        # servidor de desenvolvimento (http://localhost:4321)
npm run build      # gerar build estático em /dist
npm run preview    # servir o build de produção
npm run images     # regenerar o tratamento de imagens/placeholder
npm run check        # verificação de rotas, links, SEO e acessibilidade (com preview ativo)
npm run test:visual  # teste visual/interações com Playwright (com preview ativo)
```

## Estrutura

```
public/assets/images/    originais + versões tratadas + grafismos provisórios
scripts/
  process-images.mjs     tratamento de logo, bandeira e grafismos
  check-site.mjs         checagem de rotas, links, SEO e acessibilidade básica
  visual-test.mjs        teste visual e de interações (Playwright)
  inspect.mjs            inspeção pontual de layouts e animações
src/
  components/            Header, Footer, PageHero, SectionHeader, cards, estados…
  data/                  MOCK DATA — substituir por backend futuramente
  layouts/BaseLayout.astro  SEO/Open Graph/fontes/scripts globais
  pages/                 rotas do site
  styles/global.css      design system
  utils/format.ts        formatação de datas pt-BR
```

## Rotas

| Rota | Descrição |
| --- | --- |
| `/` | Home institucional |
| `/escola` | A Escola |
| `/historia` | História (linha do tempo estrutural) |
| `/carnaval` | Carnaval (temporada atual) |
| `/enredos` · `/enredos/[slug]` | Catálogo e detalhe de enredos |
| `/noticias` · `/noticias/[slug]` | Notícias com filtro por categoria |
| `/eventos` · `/eventos/[slug]` | Agenda de eventos |
| `/galeria` | Galeria com filtro e lightbox |
| `/segmentos` · `/segmentos/[slug]` | Segmentos da escola |
| `/contato` | Contato (formulário pronto para backend) |
| `/404` | Página não encontrada |

## Dados (mock) e backend futuro

Todo o conteúdo está em `src/data/*.ts`, marcado com
`// MOCK DATA — substituir por backend futuramente`.

Regras adotadas:

- **Nenhum dado institucional foi inventado.** Endereço, telefone, e-mail, redes
  sociais, datas históricas, cargos e funções artísticas estão como `null` e são
  exibidos como "a confirmar".
- Textos, notícias, eventos e enredos são de demonstração e estão sinalizados
  no rodapé do site.
- Os componentes recebem tudo por props/objetos — a troca por chamadas de API não
  altera o layout.

## Imagens

- `logo-renascer.jpeg` e `bandeira-renascer.png` são os **originais** (preservados).
- `npm run images` gera:
  - `logo-renascer-tratada.png` / `-512` / `-256` / `-128`: fundo branco removido
    por flood-fill, identidade preservada;
  - `emblema-renascer-512.png`, `favicon.png`, `apple-touch-icon.png`;
  - `bandeira-textura.jpg` e `bandeira-textura-suave.jpg`;
  - grafismos provisórios em `hero/`, `news/`, `events/`, `enredos/`, `gallery/`,
    `segments/`, `school/` — **placeholders derivados da bandeira oficial**,
    aguardando o acervo fotográfico real (nenhuma foto de terceiros é usada
    como se fosse da escola).
- Quando houver material oficial em alta resolução, basta substituir os arquivos
  em `public/assets/images/` mantendo os nomes.

## Próximas etapas (fora do escopo deste front-end)

Backend/CMS, banco de dados, API, Git/versionamento, hospedagem, domínio,
DNS e CI/CD serão responsabilidade do responsável pelo projeto.
