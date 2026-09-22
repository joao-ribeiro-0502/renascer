/**
 * Inspeção pontual: hero overlay, screenshots com scroll e mobile.
 */
import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.SITE_BASE || 'http://localhost:4321';
const OUT = path.join(process.cwd(), '.test-shots');

const browser = await chromium.launch();
const problems = [];

async function scrollAll(page) {
  await page.evaluate(async () => {
    const delay = (ms) => new Promise((r) => setTimeout(r, ms));
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 500) {
      window.scrollTo(0, y);
      await delay(90);
    }
    window.scrollTo(0, h);
    await delay(400);
    window.scrollTo(0, 0);
    await delay(300);
  });
}

// 1) Estilos do page-hero
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  await page.goto(BASE + '/carnaval', { waitUntil: 'networkidle' });
  const info = await page.evaluate(() => {
    const media = document.querySelector('.page-hero__media');
    const img = media?.querySelector('img');
    const after = media ? getComputedStyle(media, '::after') : null;
    const hero = document.querySelector('.page-hero');
    return {
      imgOpacity: img ? getComputedStyle(img).opacity : null,
      afterBg: after?.backgroundImage ?? after?.backgroundColor ?? null,
      heroH: hero ? hero.getBoundingClientRect().height : null,
    };
  });
  console.log('page-hero:', JSON.stringify(info));

  // 2) Home com scroll para ativar reveals
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await scrollAll(page);
  await page.screenshot({ path: path.join(OUT, 'desktop-home-scrolled.png'), fullPage: true });

  const notVisible = await page.evaluate(() =>
    Array.from(document.querySelectorAll('[data-reveal]')).filter(
      (el) => !el.classList.contains('is-visible')
    ).length
  );
  console.log('revelações pendentes após scroll:', notVisible);

  await ctx.close();
}

// 3) Mobile com scroll
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(OUT, 'mobile-home-top.png') });
  await scrollAll(page);
  await page.screenshot({ path: path.join(OUT, 'mobile-home-scrolled.png'), fullPage: true });

  await page.goto(BASE + '/noticias', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(OUT, 'mobile-noticias-top.png') });

  await page.goto(BASE + '/contato', { waitUntil: 'networkidle' });
  await page.screenshot({ path: path.join(OUT, 'mobile-contato-top.png') });

  await ctx.close();
}

// 4) Desktop: páginas-chave com scroll (viewport do topo + seções)
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  for (const [name, route] of [
    ['noticias-full', '/noticias'],
    ['eventos-full', '/eventos'],
    ['segmentos-full', '/segmentos'],
    ['contato-full', '/contato'],
    ['historia-full', '/historia'],
    ['enredo-full', '/enredos/luz-de-um-novo-amanhecer'],
  ]) {
    await page.goto(BASE + route, { waitUntil: 'networkidle' });
    await scrollAll(page);
    await page.screenshot({ path: path.join(OUT, `desktop-${name}.png`), fullPage: true });
  }
  await ctx.close();
}

await browser.close();
console.log('Concluído.');
