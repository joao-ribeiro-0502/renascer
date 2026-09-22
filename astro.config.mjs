// @ts-check
import { defineConfig } from 'astro/config';

// Site institucional da G.R.E.S. Renascer de Jacarepaguá
// Configuração pronta para futura integração com backend/CMS.
export default defineConfig({
  site: 'https://renascerdejacarepagua.com.br',
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'auto',
  },
  devToolbar: {
    enabled: false,
  },
});
