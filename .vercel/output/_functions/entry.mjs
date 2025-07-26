import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_BjX1Jp68.mjs';
import { manifest } from './manifest_BTHIxpJb.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/episode404.astro.mjs');
const _page3 = () => import('./pages/loai-phim/_slug_.astro.mjs');
const _page4 = () => import('./pages/phim/_slug_.astro.mjs');
const _page5 = () => import('./pages/quoc-gia/_slug_.astro.mjs');
const _page6 = () => import('./pages/the-loai/_slug_.astro.mjs');
const _page7 = () => import('./pages/tim-kiem.astro.mjs');
const _page8 = () => import('./pages/xem-phim/_slug_/_tap_slug_/_ngon_ngu_.astro.mjs');
const _page9 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/episode404.astro", _page2],
    ["src/pages/loai-phim/[slug].astro", _page3],
    ["src/pages/phim/[slug].astro", _page4],
    ["src/pages/quoc-gia/[slug].astro", _page5],
    ["src/pages/the-loai/[slug].astro", _page6],
    ["src/pages/tim-kiem.astro", _page7],
    ["src/pages/xem-phim/[slug]/[tap_slug]/[ngon_ngu].astro", _page8],
    ["src/pages/index.astro", _page9]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "03c4eb18-f37a-4ca5-93d4-c86ab7efb84e",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
