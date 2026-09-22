/**
 * Tratamento de assets da G.R.E.S. Renascer de Jacarepaguá.
 *
 * - Preserva os arquivos originais em public/assets/images.
 * - Remove o fundo branco da logo por flood-fill (mantendo a identidade original).
 * - Gera versões otimizadas para web (light/dark, favicon, texturas da bandeira).
 * - Gera grafismos editoriais provisórios derivados da bandeira oficial
 *   (PLACEHOLDERS — substituir por fotografias oficiais quando disponíveis).
 *
 * Executar: npm run images
 */
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = path.resolve(process.cwd(), 'public', 'assets', 'images');
const LOGO = path.join(ROOT, 'logo-renascer.jpeg');
const BANDEIRA = path.join(ROOT, 'bandeira-renascer.png');

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

/** Remove o fundo branco com flood-fill a partir das bordas (preserva brancos internos). */
async function removeWhiteBackground(input) {
  const { data, info } = await sharp(input)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width: w, height: h, channels } = info;
  if (channels !== 4) throw new Error('Esperava RGBA');

  const at = (x, y) => y * w + x;
  const minc = (i) => Math.min(data[i * 4], data[i * 4 + 1], data[i * 4 + 2]);
  const stack = [];
  const seen = new Uint8Array(w * h);

  const push = (x, y) => {
    const i = at(x, y);
    if (seen[i]) return;
    if (minc(i) < 240) return;
    seen[i] = 1;
    stack.push(i);
  };

  for (let x = 0; x < w; x++) {
    push(x, 0);
    push(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    push(0, y);
    push(w - 1, y);
  }

  // Passo 1: remove o branco puro ligado às bordas.
  while (stack.length) {
    const i = stack.pop();
    data[i * 4 + 3] = 0;
    const x = i % w;
    const y = (i / w) | 0;
    if (x > 0) push(x - 1, y);
    if (x < w - 1) push(x + 1, y);
    if (y > 0) push(x, y - 1);
    if (y < h - 1) push(x, y + 1);
  }

  // Passo 2: suaviza a borda (antialiasing do original) junto aos pixels já removidos.
  const seen2 = new Uint8Array(w * h);
  const queue = [];
  let qHead = 0;
  for (let i = 0; i < w * h; i++) {
    if (data[i * 4 + 3] === 0) {
      seen2[i] = 1;
      queue.push(i);
    }
  }

  while (qHead < queue.length) {
    const i = queue[qHead++];
    const x = i % w;
    const y = (i / w) | 0;
    const neighbors = [];
    if (x > 0) neighbors.push(i - 1);
    if (x < w - 1) neighbors.push(i + 1);
    if (y > 0) neighbors.push(i - w);
    if (y < h - 1) neighbors.push(i + w);
    for (const n of neighbors) {
      if (seen2[n] || data[n * 4 + 3] === 0) continue;
      const m = minc(n);
      if (m < 205) continue;
      seen2[n] = 1;
      data[n * 4 + 3] = clamp(Math.round(((252 - m) / 47) * 255), 0, 255);
      if (data[n * 4 + 3] > 8) queue.push(n);
    }
  }

  return sharp(data, { raw: { width: w, height: h, channels: 4 } });
}

function boundingBox(data, w, h) {
  let minX = w, minY = h, maxX = 0, maxY = 0;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (data[(y * w + x) * 4 + 3] > 4) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }
  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 };
}

async function processLogo() {
  console.log('→ Logo: removendo fundo e gerando versões tratadas…');
  const pipe = await removeWhiteBackground(LOGO);
  const { data, info } = await pipe.raw().toBuffer({ resolveWithObject: true });
  const box = boundingBox(data, info.width, info.height);

  const trimmed = sharp(data, { raw: info }).extract(box);

  // Versão tratada completa (transparência, bordas aparadas).
  await trimmed.clone().png({ compressionLevel: 9 }).toFile(path.join(ROOT, 'logo-renascer-tratada.png'));

  // Versões para uso em interface.
  await trimmed.clone().resize({ width: 512 }).png({ compressionLevel: 9 }).toFile(path.join(ROOT, 'logo-renascer-512.png'));
  await trimmed.clone().resize({ width: 256 }).png({ compressionLevel: 9 }).toFile(path.join(ROOT, 'logo-renascer-256.png'));
  await trimmed.clone().resize({ width: 128 }).png({ compressionLevel: 9 }).toFile(path.join(ROOT, 'logo-renascer-128.png'));

  // Emblema quadrado (para favicon, marca d'água e apoios visuais).
  const size = Math.max(box.width, box.height);
  const emblem = trimmed.clone().resize({
    width: size,
    height: size,
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  });
  await emblem.clone().resize(512).png({ compressionLevel: 9 }).toFile(path.join(ROOT, 'emblema-renascer-512.png'));
  await emblem.clone().resize(180).png({ compressionLevel: 9 }).toFile(path.join(ROOT, 'apple-touch-icon.png'));

  // Favicon (fundo branco para leitura do anel externo).
  await emblem
    .clone()
    .resize(64)
    .flatten({ background: '#ffffff' })
    .png()
    .toFile(path.join(ROOT, 'favicon.png'));

  console.log('  ok: logo-renascer-tratada / 512 / 256 / 128, emblema, favicon');
}

async function processFlag() {
  console.log('→ Bandeira: gerando texturas institucionais…');
  // Textura nítida (uso em seções e cartões).
  await sharp(BANDEIRA)
    .resize({ width: 1000, kernel: 'lanczos3' })
    .modulate({ brightness: 0.92 })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(path.join(ROOT, 'bandeira-textura.jpg'));

  // Textura suave e dessaturada (fundos editoriais sutis).
  await sharp(BANDEIRA)
    .resize({ width: 1200, kernel: 'lanczos3' })
    .grayscale()
    .modulate({ brightness: 0.75 })
    .blur(3)
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(path.join(ROOT, 'bandeira-textura-suave.jpg'));

  console.log('  ok: bandeira-textura.jpg, bandeira-textura-suave.jpg');
}

/* ------------------------------------------------------------------ *
 * Grafismos provisórios (PLACEHOLDERS) derivados da bandeira oficial.
 * São grafismos, não fotografias: substituir pelo acervo oficial.
 * ------------------------------------------------------------------ */
const PALETTE = ['#141414', '#1b1b1d', '#5f0d12', '#7a1116', '#23211f', '#101013'];

async function makeGraphic({ out, w, h, bg, crop, blur, flagAlpha, emblemAlpha, bright = 1 }) {
  const base = await sharp({ create: { width: w, height: h, channels: 3, background: bg } })
    .png()
    .toBuffer();

  // Camada derivada da bandeira (recorte + desfoque + escurecimento), preservando a identidade cromática.
  const targetRatio = w / h;
  let cw = 500, ch = Math.round(500 / targetRatio);
  if (ch > 352) { ch = 352; cw = Math.round(352 * targetRatio); }
  cw = Math.min(cw, 500); ch = Math.min(ch, 352);
  const maxLeft = 500 - cw, maxTop = 352 - ch;
  const left = Math.round(maxLeft * crop.x);
  const top = Math.round(maxTop * crop.y);

  const flagRaw = await sharp(BANDEIRA)
    .extract({ left, top, width: cw, height: ch })
    .resize(w, h, { fit: 'cover', kernel: 'lanczos3' })
    .modulate({ brightness: 0.55 * bright, saturation: 0.95 })
    .blur(blur)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 3; i < flagRaw.data.length; i += 4) {
    flagRaw.data[i] = Math.round(flagRaw.data[i] * flagAlpha);
  }
  const flagLayer = await sharp(flagRaw.data, {
    raw: { width: flagRaw.info.width, height: flagRaw.info.height, channels: 4 },
  }).png().toBuffer();

  // Emblema como marca d'água (opacidade aplicada no canal alfa).
  const emblemRaw = await sharp(path.join(ROOT, 'emblema-renascer-512.png'))
    .resize(Math.round(Math.min(w, h) * 0.42))
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 3; i < emblemRaw.data.length; i += 4) {
    emblemRaw.data[i] = Math.round(emblemRaw.data[i] * emblemAlpha);
  }
  const emblem = await sharp(emblemRaw.data, {
    raw: { width: emblemRaw.info.width, height: emblemRaw.info.height, channels: 4 },
  }).png().toBuffer();

  await sharp(base)
    .composite([
      { input: flagLayer, blend: 'over' },
      { input: emblem, left: Math.round((w - emblemRaw.info.width) / 2), top: Math.round((h - emblemRaw.info.height) / 2) },
    ])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(out);
}

async function processPlaceholders() {
  console.log('→ Gerando grafismos provisórios para conteúdo…');

  const jobs = [
    // hero
    { dir: 'hero', name: 'renascer-hero', w: 1920, h: 1080, bg: '#141414', crop: { x: 0.5, y: 0.5 }, blur: 26, flagAlpha: 0.5, emblemAlpha: 0.1, bright: 0.9 },
    { dir: 'hero', name: 'renascer-hero-interna', w: 1920, h: 900, bg: '#17151a', crop: { x: 0.2, y: 0.4 }, blur: 30, flagAlpha: 0.42, emblemAlpha: 0.09, bright: 0.85 },
    // notícia
    { dir: 'news', name: 'noticia-01', w: 1400, h: 900, bg: '#161616', crop: { x: 0.1, y: 0.2 }, blur: 18, flagAlpha: 0.5, emblemAlpha: 0.1, bright: 0.95 },
    { dir: 'news', name: 'noticia-02', w: 1400, h: 900, bg: '#5f0d12', crop: { x: 0.7, y: 0.3 }, blur: 22, flagAlpha: 0.45, emblemAlpha: 0.12, bright: 1 },
    { dir: 'news', name: 'noticia-03', w: 1400, h: 900, bg: '#1b1b1d', crop: { x: 0.3, y: 0.7 }, blur: 16, flagAlpha: 0.55, emblemAlpha: 0.1, bright: 0.9 },
    { dir: 'news', name: 'noticia-04', w: 1400, h: 900, bg: '#23211f', crop: { x: 0.6, y: 0.6 }, blur: 24, flagAlpha: 0.4, emblemAlpha: 0.11, bright: 0.95 },
    // eventos
    { dir: 'events', name: 'evento-01', w: 1400, h: 900, bg: '#141414', crop: { x: 0.4, y: 0.1 }, blur: 20, flagAlpha: 0.48, emblemAlpha: 0.1, bright: 0.92 },
    { dir: 'events', name: 'evento-02', w: 1400, h: 900, bg: '#7a1116', crop: { x: 0.8, y: 0.5 }, blur: 26, flagAlpha: 0.42, emblemAlpha: 0.12, bright: 1 },
    { dir: 'events', name: 'evento-03', w: 1400, h: 900, bg: '#101013', crop: { x: 0.2, y: 0.6 }, blur: 18, flagAlpha: 0.5, emblemAlpha: 0.1, bright: 0.9 },
    { dir: 'events', name: 'evento-04', w: 1400, h: 900, bg: '#1b1b1d', crop: { x: 0.5, y: 0.8 }, blur: 22, flagAlpha: 0.45, emblemAlpha: 0.1, bright: 0.95 },
    // enredos
    { dir: 'enredos', name: 'enredo-01', w: 1400, h: 1000, bg: '#5f0d12', crop: { x: 0.2, y: 0.3 }, blur: 20, flagAlpha: 0.5, emblemAlpha: 0.13, bright: 1 },
    { dir: 'enredos', name: 'enredo-02', w: 1400, h: 1000, bg: '#141414', crop: { x: 0.6, y: 0.2 }, blur: 24, flagAlpha: 0.45, emblemAlpha: 0.1, bright: 0.9 },
    { dir: 'enredos', name: 'enredo-03', w: 1400, h: 1000, bg: '#23211f', crop: { x: 0.4, y: 0.6 }, blur: 18, flagAlpha: 0.5, emblemAlpha: 0.11, bright: 0.95 },
    { dir: 'enredos', name: 'enredo-04', w: 1400, h: 1000, bg: '#101013', crop: { x: 0.8, y: 0.7 }, blur: 22, flagAlpha: 0.47, emblemAlpha: 0.1, bright: 0.9 },
    // galeria (proporções variadas)
    { dir: 'gallery', name: 'galeria-01', w: 900, h: 1200, bg: '#161616', crop: { x: 0.1, y: 0.2 }, blur: 18, flagAlpha: 0.5, emblemAlpha: 0.11, bright: 0.95 },
    { dir: 'gallery', name: 'galeria-02', w: 1400, h: 900, bg: '#5f0d12', crop: { x: 0.6, y: 0.4 }, blur: 22, flagAlpha: 0.45, emblemAlpha: 0.12, bright: 1 },
    { dir: 'gallery', name: 'galeria-03', w: 1100, h: 1100, bg: '#1b1b1d', crop: { x: 0.3, y: 0.5 }, blur: 16, flagAlpha: 0.55, emblemAlpha: 0.1, bright: 0.92 },
    { dir: 'gallery', name: 'galeria-04', w: 900, h: 1200, bg: '#7a1116', crop: { x: 0.7, y: 0.6 }, blur: 24, flagAlpha: 0.42, emblemAlpha: 0.12, bright: 1 },
    { dir: 'gallery', name: 'galeria-05', w: 1400, h: 900, bg: '#101013', crop: { x: 0.2, y: 0.7 }, blur: 20, flagAlpha: 0.5, emblemAlpha: 0.1, bright: 0.9 },
    { dir: 'gallery', name: 'galeria-06', w: 1100, h: 1100, bg: '#23211f', crop: { x: 0.5, y: 0.1 }, blur: 18, flagAlpha: 0.5, emblemAlpha: 0.11, bright: 0.95 },
    { dir: 'gallery', name: 'galeria-07', w: 1400, h: 900, bg: '#141414', crop: { x: 0.8, y: 0.2 }, blur: 26, flagAlpha: 0.45, emblemAlpha: 0.1, bright: 0.9 },
    { dir: 'gallery', name: 'galeria-08', w: 900, h: 1200, bg: '#1b1b1d', crop: { x: 0.4, y: 0.8 }, blur: 20, flagAlpha: 0.5, emblemAlpha: 0.1, bright: 0.95 },
    { dir: 'gallery', name: 'galeria-09', w: 1100, h: 1100, bg: '#5f0d12', crop: { x: 0.1, y: 0.6 }, blur: 22, flagAlpha: 0.44, emblemAlpha: 0.12, bright: 1 },
    // segmentos
    { dir: 'segments', name: 'segmento-01', w: 1000, h: 1000, bg: '#141414', crop: { x: 0.2, y: 0.2 }, blur: 18, flagAlpha: 0.5, emblemAlpha: 0.12, bright: 0.92 },
    { dir: 'segments', name: 'segmento-02', w: 1000, h: 1000, bg: '#5f0d12', crop: { x: 0.7, y: 0.3 }, blur: 22, flagAlpha: 0.45, emblemAlpha: 0.13, bright: 1 },
    { dir: 'segments', name: 'segmento-03', w: 1000, h: 1000, bg: '#1b1b1d', crop: { x: 0.4, y: 0.6 }, blur: 16, flagAlpha: 0.55, emblemAlpha: 0.12, bright: 0.9 },
    { dir: 'segments', name: 'segmento-04', w: 1000, h: 1000, bg: '#23211f', crop: { x: 0.6, y: 0.7 }, blur: 20, flagAlpha: 0.48, emblemAlpha: 0.12, bright: 0.95 },
    { dir: 'segments', name: 'segmento-05', w: 1000, h: 1000, bg: '#101013', crop: { x: 0.3, y: 0.4 }, blur: 24, flagAlpha: 0.45, emblemAlpha: 0.12, bright: 0.9 },
    { dir: 'segments', name: 'segmento-06', w: 1000, h: 1000, bg: '#7a1116', crop: { x: 0.8, y: 0.5 }, blur: 18, flagAlpha: 0.5, emblemAlpha: 0.13, bright: 1 },
    { dir: 'segments', name: 'segmento-07', w: 1000, h: 1000, bg: '#141414', crop: { x: 0.5, y: 0.8 }, blur: 22, flagAlpha: 0.47, emblemAlpha: 0.12, bright: 0.92 },
    { dir: 'segments', name: 'segmento-08', w: 1000, h: 1000, bg: '#1b1b1d', crop: { x: 0.1, y: 0.7 }, blur: 20, flagAlpha: 0.5, emblemAlpha: 0.12, bright: 0.95 },
    // institucional / história
    { dir: 'school', name: 'escola-01', w: 1400, h: 950, bg: '#141414', crop: { x: 0.3, y: 0.3 }, blur: 20, flagAlpha: 0.5, emblemAlpha: 0.11, bright: 0.92 },
    { dir: 'school', name: 'escola-02', w: 1400, h: 950, bg: '#5f0d12', crop: { x: 0.7, y: 0.5 }, blur: 24, flagAlpha: 0.44, emblemAlpha: 0.12, bright: 1 },
    { dir: 'school', name: 'historia-01', w: 1400, h: 950, bg: '#23211f', crop: { x: 0.2, y: 0.6 }, blur: 18, flagAlpha: 0.5, emblemAlpha: 0.11, bright: 0.95 },
    { dir: 'school', name: 'historia-02', w: 1400, h: 950, bg: '#101013', crop: { x: 0.6, y: 0.2 }, blur: 26, flagAlpha: 0.45, emblemAlpha: 0.1, bright: 0.9 },
    { dir: 'school', name: 'carnaval-01', w: 1400, h: 950, bg: '#7a1116', crop: { x: 0.4, y: 0.7 }, blur: 22, flagAlpha: 0.46, emblemAlpha: 0.13, bright: 1 },
  ];

  for (const job of jobs) {
    const dir = path.join(ROOT, job.dir);
    await fs.mkdir(dir, { recursive: true });
    const out = path.join(dir, `${job.name}.jpg`);
    await makeGraphic({ out, ...job });
  }

  // Imagem padrão para redes sociais (Open Graph).
  await makeGraphic({
    out: path.join(ROOT, 'og-renascer.jpg'),
    w: 1200, h: 630, bg: '#141414',
    crop: { x: 0.5, y: 0.5 }, blur: 24, flagAlpha: 0.5, emblemAlpha: 0.12, bright: 0.9,
  });

  console.log(`  ok: ${jobs.length + 1} grafismos gerados`);
}

async function main() {
  await processLogo();
  await processFlag();
  await processPlaceholders();
  console.log('Concluído.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
