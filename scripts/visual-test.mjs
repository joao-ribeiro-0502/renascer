/**
 * Teste visual e de interação com Playwright.
 * - captura erros de console, falhas de requisição
 * - testa menu mobile, filtros, lightbox e formulário
 * - gera screenshots em várias larguras
 *
 * Requer: preview ativo (npm run preview) e playwright instalado.
 */
import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.SITE_BASE || 'http://localhost:4321';
const OUT = path.join(process.cwd(), '.test-shots');

const ROUTES = [
  ['home', '/'],
  ['escola', '/escola'],
  ['historia', '/historia'],
  ['carnaval', '/carnaval'],
  ['enredos', '/enredos'],
  ['enredo-detalhe', '/enredos/luz-de-um-novo-amanhecer'],
  ['noticias', '/noticias'],
  ['noticia-detalhe', '/noticias/ensaios-da-temporada'],
  ['eventos', '/eventos'],
  ['evento-detalhe', '/eventos/ensaio-aberto-de-carnaval'],
  ['galeria', '/galeria'],
  ['segmentos', '/segmentos'],
  ['segmento-detalhe', '/segmentos/bateria'],
  ['contato', '/contato'],
  ['404', '/rota-inexistente'],
];

const problems = [];

await fs.mkdir(OUT, { recursive: true });

const browser = await chromium.launch();

async function newPage(width, height) {
  const context = await browser.newContext({ viewport: { width, height } });
  const page = await context.newPage();
  page.on('console', (msg) => {
    if (msg.type() === 'error' && !page.url().includes('rota-inexistente')) {
      problems.push(`[console ${width}px] ${page.url()} :: ${msg.text()}`);
    }
  });
  page.on('pageerror', (err) => problems.push(`[pageerror ${width}px] ${page.url()} :: ${err.message}`));
  page.on('requestfailed', (req) =>
    problems.push(`[requestfailed ${width}px] ${req.url()} :: ${req.failure()?.errorText}`)
  );
  page.on('response', (res) => {
    if (res.status() >= 400 && !res.url().includes('rota-inexistente')) {
      problems.push(`[http ${res.status()} ${width}px] ${res.url()}`);
    }
  });
  return { context, page };
}

/* ---------- 1. Desktop: screenshots de todas as rotas ---------- */
{
  const { context, page } = await newPage(1440, 900);
  for (const [name, route] of ROUTES) {
    await page.goto(BASE + route, { waitUntil: 'networkidle' });
    await page.waitForTimeout(350);
    await page.screenshot({ path: path.join(OUT, `desktop-${name}.png`), fullPage: name === 'home' });
  }
  await context.close();
  console.log('✓ desktop: screenshots gerados');
}

/* ---------- 2. Tablet ---------- */
{
  const { context, page } = await newPage(768, 1024);
  for (const [name, route] of ROUTES.filter(([n]) => ['home', 'noticias', 'galeria', 'contato', 'segmentos'].includes(n))) {
    await page.goto(BASE + route, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(OUT, `tablet-${name}.png`), fullPage: false });
  }
  await context.close();
  console.log('✓ tablet: screenshots gerados');
}

/* ---------- 3. Mobile: screenshots + menu ---------- */
{
  const { context, page } = await newPage(390, 844);
  for (const [name, route] of ROUTES) {
    await page.goto(BASE + route, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(OUT, `mobile-${name}.png`), fullPage: false });
  }

  // Menu mobile
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  const toggle = page.locator('.menu-toggle');
  await toggle.click();
  await page.waitForTimeout(500);
  const menuVisible = await page.locator('#menu-mobile.is-open').count();
  if (!menuVisible) problems.push('[interação] menu mobile não abriu');
  await page.screenshot({ path: path.join(OUT, 'mobile-menu-aberto.png') });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(450);
  const menuClosed = await page.locator('#menu-mobile.is-open').count();
  if (menuClosed) problems.push('[interação] menu mobile não fechou com Escape');

  // 360px: verificar overflow horizontal
  await page.setViewportSize({ width: 360, height: 740 });
  for (const [name, route] of ROUTES) {
    await page.goto(BASE + route, { waitUntil: 'networkidle' });
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    if (overflow > 2) problems.push(`[overflow ${name}] rolagem horizontal de ${overflow}px em 360px`);
  }
  await page.screenshot({ path: path.join(OUT, 'mobile360-home.png') });
  await context.close();
  console.log('✓ mobile: screenshots, menu e overflow verificados');
}

/* ---------- 4. Interações desktop ---------- */
{
  const { context, page } = await newPage(1440, 900);

  // Filtro de notícias
  await page.goto(BASE + '/noticias', { waitUntil: 'networkidle' });
  const total = await page.locator('#news-grid > div').count();
  await page.locator('.filter[data-filter="Institucional"]').click();
  await page.waitForTimeout(250);
  const visible = await page.locator('#news-grid > div:not([hidden])').count();
  if (!(visible > 0 && visible < total)) problems.push(`[interação] filtro de notícias inesperado: ${visible}/${total}`);
  await page.locator('.filter[data-filter="Todos"]').click();

  // Lightbox da galeria
  await page.goto(BASE + '/galeria', { waitUntil: 'networkidle' });
  await page.locator('.gallery-figure').first().click();
  await page.waitForTimeout(400);
  const dialogOpen = await page.evaluate(() => document.getElementById('lightbox')?.open === true);
  if (!dialogOpen) problems.push('[interação] lightbox não abriu');
  const src1 = await page.locator('#lightbox-img').getAttribute('src');
  await page.locator('[data-lb-next]').click();
  await page.waitForTimeout(300);
  const src2 = await page.locator('#lightbox-img').getAttribute('src');
  if (src1 === src2) problems.push('[interação] next do lightbox não avançou');
  await page.screenshot({ path: path.join(OUT, 'desktop-lightbox.png') });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(300);

  // Formulário de contato
  await page.goto(BASE + '/contato', { waitUntil: 'networkidle' });
  await page.fill('#nome', 'Teste Visual');
  await page.fill('#email', 'teste@example.com');
  await page.selectOption('#assunto', 'segmentos');
  await page.fill('#mensagem', 'Mensagem de teste do fluxo visual.');
  await page.click('#contact-form button[type="submit"]');
  await page.waitForTimeout(300);
  const statusVisible = await page.locator('#form-status:not([hidden])').count();
  if (!statusVisible) problems.push('[interação] status do formulário não apareceu');
  await page.screenshot({ path: path.join(OUT, 'desktop-contato-status.png') });

  // Header muda com scroll
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  const before = await page.locator('[data-header]').evaluate((el) => el.classList.contains('is-scrolled'));
  await page.evaluate(() => window.scrollTo({ top: 600 }));
  await page.waitForTimeout(400);
  const after = await page.locator('[data-header]').evaluate((el) => el.classList.contains('is-scrolled'));
  if (before || !after) problems.push('[interação] header não alternou o estado no scroll');

  // Navegação: itens de páginas inativas apontam para '#' (etapa da home)
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  const menuHrefs = await page.$$eval('.nav-desktop a', (els) =>
    els.map((e) => e.getAttribute('href'))
  );
  const inactive = menuHrefs.filter((h) => h !== '/' && h !== '#');
  if (inactive.length)
    problems.push(`[interação] menu com destino de página inativa: ${inactive.join(', ')}`);
  await page.locator('.nav-desktop a', { hasText: 'Notícias' }).first().click();
  await page.waitForTimeout(300);
  if (!page.url().endsWith('/#'))
    problems.push(`[interação] item inativo não levou para "#": ${page.url()}`);

  await context.close();
  console.log('✓ interações: filtros, lightbox, formulário, header e navegação verificados');
}

await browser.close();

console.log(`\nProblemas encontrados: ${problems.length}`);
problems.forEach((p) => console.log('  ✗ ' + p));
console.log(`Screenshots em: ${OUT}`);
if (problems.length) process.exit(1);
console.log('OK — nenhum problema detectado.');
