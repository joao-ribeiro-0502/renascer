/**
 * Verificação automatizada do site (build + preview).
 * - confere status 200 de todas as rotas
 * - confere se todos os href/src locais existem no build
 * - confere títulos, meta description, heading h1 e alt de imagens
 *
 * Executar com o preview ativo: node scripts/check-site.mjs
 */
import fs from 'node:fs/promises';
import path from 'node:path';

const BASE = process.env.SITE_BASE || 'http://localhost:4321';
const DIST = path.resolve(process.cwd(), 'dist');

const errors = [];
const warnings = [];

async function collectRoutes(dir = DIST, base = '/') {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const routes = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      routes.push(...(await collectRoutes(full, `${base}${entry.name}/`)));
    } else if (entry.name === 'index.html') {
      routes.push(base);
    } else if (entry.name.endsWith('.html') && entry.name !== '404.html') {
      routes.push(`${base}${entry.name}`);
    }
  }
  return routes;
}

function extract(html, regex) {
  const out = [];
  let m;
  while ((m = regex.exec(html)) !== null) out.push(m[1]);
  return out;
}

const routes = (await collectRoutes()).sort();
console.log(`Rotas encontradas no build: ${routes.length}`);

for (const route of routes) {
  const url = `${BASE}${route}`;
  let res;
  try {
    res = await fetch(url);
  } catch (e) {
    errors.push(`${route}: falha de conexão (${e.message})`);
    continue;
  }
  if (res.status !== 200) {
    errors.push(`${route}: HTTP ${res.status}`);
    continue;
  }
  const html = await res.text();

  // SEO básico
  if (!/<title>[^<]+<\/title>/.test(html)) errors.push(`${route}: sem <title>`);
  if (!/<meta name="description" content="[^"]+"/.test(html)) errors.push(`${route}: sem meta description`);
  if (!/<meta property="og:title"/.test(html)) warnings.push(`${route}: sem og:title`);
  if (!/<h1[\s>]/.test(html)) errors.push(`${route}: sem <h1>`);

  // Landmarks
  if (!/<main/.test(html)) errors.push(`${route}: sem <main>`);
  if (!/<footer/.test(html)) errors.push(`${route}: sem <footer>`);
  if (!/<nav/.test(html)) warnings.push(`${route}: sem <nav>`);

  // Imagens sem alt
  const imgs = extract(html, /<img[^>]*>/g);
  for (const tag of extract(html, /(<img[^>]*>)/g)) {
    if (!/\salt=/.test(tag)) errors.push(`${route}: imagem sem alt → ${tag.slice(0, 90)}`);
  }

  // Links e assets locais
  const refs = [
    ...extract(html, /href="(\/[^"]*)"/g),
    ...extract(html, /src="(\/[^"]*)"/g),
  ].filter((r) => !r.startsWith('//'));

  for (const ref of refs) {
    const clean = ref.split('#')[0].split('?')[0];
    if (!clean) continue;
    let target = path.join(DIST, clean);
    try {
      const st = await fs.stat(target);
      if (st.isDirectory()) target = path.join(target, 'index.html');
      await fs.stat(target);
    } catch {
      // rotas sem extensão podem ser páginas
      const asHtml = path.join(DIST, clean, 'index.html');
      try {
        await fs.stat(asHtml);
      } catch {
        errors.push(`${route}: referência quebrada → ${ref}`);
      }
    }
  }
}

// Fontes e estilos empacotados
try {
  const assets = await fs.readdir(path.join(DIST, '_astro'));
  const hasFont = assets.some((f) => f.endsWith('.woff2'));
  const hasCss = assets.some((f) => f.endsWith('.css'));
  if (!hasFont) warnings.push('nenhuma fonte .woff2 encontrada em /_astro');
  if (!hasCss) warnings.push('nenhum CSS encontrado em /_astro');
} catch {
  errors.push('pasta /_astro ausente no build');
}

console.log(`\nAvisos: ${warnings.length}`);
warnings.forEach((w) => console.log('  ⚠ ' + w));
console.log(`\nErros: ${errors.length}`);
errors.forEach((e) => console.log('  ✗ ' + e));

if (errors.length) process.exit(1);
console.log('\nOK — todas as verificações passaram.');
