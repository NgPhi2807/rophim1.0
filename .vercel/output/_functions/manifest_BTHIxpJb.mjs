import 'kleur/colors';
import { f as decodeKey } from './chunks/astro/server_CHdT0zCU.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_Du6Cp6SF.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///D:/motchillhd.online/","cacheDir":"file:///D:/motchillhd.online/node_modules/.astro/","outDir":"file:///D:/motchillhd.online/dist/","srcDir":"file:///D:/motchillhd.online/src/","publicDir":"file:///D:/motchillhd.online/public/","buildClientDir":"file:///D:/motchillhd.online/dist/client/","buildServerDir":"file:///D:/motchillhd.online/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/episode404.CKFQIrZW.css"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/episode404.CKFQIrZW.css"}],"routeData":{"route":"/episode404","isIndex":false,"type":"page","pattern":"^\\/episode404\\/?$","segments":[[{"content":"episode404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/episode404.astro","pathname":"/episode404","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/episode404.CKFQIrZW.css"},{"type":"external","src":"/_astro/index.aWXZ8XIm.css"}],"routeData":{"route":"/phim/[slug]","isIndex":false,"type":"page","pattern":"^\\/phim\\/([^/]+?)\\/?$","segments":[[{"content":"phim","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}]],"params":["slug"],"component":"src/pages/phim/[slug].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/episode404.CKFQIrZW.css"},{"type":"external","src":"/_astro/index.aWXZ8XIm.css"}],"routeData":{"route":"/tim-kiem","isIndex":false,"type":"page","pattern":"^\\/tim-kiem\\/?$","segments":[[{"content":"tim-kiem","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tim-kiem.astro","pathname":"/tim-kiem","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/episode404.CKFQIrZW.css"},{"type":"external","src":"/_astro/index.aWXZ8XIm.css"}],"routeData":{"route":"/xem-phim/[slug]/[tap_slug]/[ngon_ngu]","isIndex":false,"type":"page","pattern":"^\\/xem-phim\\/([^/]+?)\\/([^/]+?)\\/([^/]+?)\\/?$","segments":[[{"content":"xem-phim","dynamic":false,"spread":false}],[{"content":"slug","dynamic":true,"spread":false}],[{"content":"tap_slug","dynamic":true,"spread":false}],[{"content":"ngon_ngu","dynamic":true,"spread":false}]],"params":["slug","tap_slug","ngon_ngu"],"component":"src/pages/xem-phim/[slug]/[tap_slug]/[ngon_ngu].astro","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/episode404.CKFQIrZW.css"},{"type":"external","src":"/_astro/index.aWXZ8XIm.css"},{"type":"inline","content":".no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{-ms-overflow-style:none;scrollbar-width:none}#splash-screen{transition:opacity .5s ease-out,transform .5s ease-out}#splash-screen.fade-scale-out{opacity:0;transform:scale(1.3)}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["D:/motchillhd.online/src/pages/404.astro",{"propagation":"none","containsHead":true}],["D:/motchillhd.online/src/pages/episode404.astro",{"propagation":"none","containsHead":true}],["D:/motchillhd.online/src/pages/index.astro",{"propagation":"none","containsHead":true}],["D:/motchillhd.online/src/pages/loai-phim/[slug].astro",{"propagation":"none","containsHead":true}],["D:/motchillhd.online/src/pages/phim/[slug].astro",{"propagation":"none","containsHead":true}],["D:/motchillhd.online/src/pages/quoc-gia/[slug].astro",{"propagation":"none","containsHead":true}],["D:/motchillhd.online/src/pages/the-loai/[slug].astro",{"propagation":"none","containsHead":true}],["D:/motchillhd.online/src/pages/tim-kiem.astro",{"propagation":"none","containsHead":true}],["D:/motchillhd.online/src/pages/xem-phim/[slug]/[tap_slug]/[ngon_ngu].astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/episode404@_@astro":"pages/episode404.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:src/pages/loai-phim/[slug]@_@astro":"pages/loai-phim/_slug_.astro.mjs","\u0000@astro-page:src/pages/quoc-gia/[slug]@_@astro":"pages/quoc-gia/_slug_.astro.mjs","\u0000@astro-page:src/pages/the-loai/[slug]@_@astro":"pages/the-loai/_slug_.astro.mjs","\u0000@astro-page:src/pages/tim-kiem@_@astro":"pages/tim-kiem.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/phim/[slug]@_@astro":"pages/phim/_slug_.astro.mjs","\u0000@astro-page:src/pages/xem-phim/[slug]/[tap_slug]/[ngon_ngu]@_@astro":"pages/xem-phim/_slug_/_tap_slug_/_ngon_ngu_.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","D:/motchillhd.online/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_D5O7ErMp.mjs","\u0000@astrojs-manifest":"manifest_BTHIxpJb.mjs","D:/motchillhd.online/src/components/MovieType/MovieType":"_astro/MovieType.C1RyDz0P.js","D:/motchillhd.online/src/components/MovieDetail/MovieDetail":"_astro/MovieDetail.Bmhfk6_j.js","D:/motchillhd.online/src/components/MovieDetail/MovieAction":"_astro/MovieAction.BthHkzf2.js","D:/motchillhd.online/src/components/MovieDetail/MovieToggle":"_astro/MovieToggle.GnvDeWL3.js","D:/motchillhd.online/src/components/MovieType/MovieCountry":"_astro/MovieCountry.DHxHuqEF.js","D:/motchillhd.online/src/components/MovieType/MovieCategory":"_astro/MovieCategory.BGn91IuE.js","D:/motchillhd.online/src/components/MovieType/MovieSearch":"_astro/MovieSearch.CBpzQaSn.js","D:/motchillhd.online/src/components/CardRow1":"_astro/CardRow1.CFy_muQF.js","D:/motchillhd.online/src/components/CardColumn":"_astro/CardColumn.BkLQC3az.js","D:/motchillhd.online/src/components/CardColumn2":"_astro/CardColumn2.BXmqSxAZ.js","D:/motchillhd.online/src/components/CardRow":"_astro/CardRow.DxzE2uWV.js","D:/motchillhd.online/src/components/AnimeList":"_astro/AnimeList.7rH3Zirq.js","D:/motchillhd.online/src/components/Astrocomponents/MobileNav.astro?astro&type=script&index=0&lang.ts":"_astro/MobileNav.astro_astro_type_script_index_0_lang.BJdlqDsE.js","D:/motchillhd.online/src/components/Astrocomponents/AntiDevTools.astro?astro&type=script&index=0&lang.ts":"_astro/AntiDevTools.astro_astro_type_script_index_0_lang.Cyod5R3J.js","D:/motchillhd.online/src/components/Episode":"_astro/Episode.Das0_Ixq.js","D:/motchillhd.online/node_modules/@vercel/analytics/dist/astro/index.astro?astro&type=script&index=0&lang.ts":"_astro/index.astro_astro_type_script_index_0_lang.3u430bf-.js","D:/motchillhd.online/src/components/VideoPlayer":"_astro/VideoPlayer.Bz6MzgXa.js","D:/motchillhd.online/src/components/Comment/Comments":"_astro/Comments.CsNny_I8.js","D:/motchillhd.online/src/components/HeroSection":"_astro/HeroSection.CpeUVbx6.js","@astrojs/react/client.js":"_astro/client.BPIbHqJh.js","D:/motchillhd.online/src/components/Header":"_astro/Header.DTzr3TN6.js","D:/motchillhd.online/src/components/Header.jsx":"_astro/Header.BUQgtovS.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["D:/motchillhd.online/src/components/Astrocomponents/MobileNav.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"DOMContentLoaded\",function(){const e=document.getElementById(\"mobile-nav\");e&&window.addEventListener(\"scroll\",function(){window.scrollY>100?(e.classList.remove(\"hidden\"),e.classList.add(\"flex\")):(e.classList.add(\"hidden\"),e.classList.remove(\"flex\"))})});"],["D:/motchillhd.online/src/components/Astrocomponents/AntiDevTools.astro?astro&type=script&index=0&lang.ts","document.addEventListener(\"keydown\",function(n){(n.key===\"F12\"||n.ctrlKey&&n.shiftKey&&(n.key===\"I\"||n.key===\"J\")||n.ctrlKey&&n.key===\"u\")&&(n.preventDefault(),window.location.href=\"/\")});function e(){return window.outerWidth-window.innerWidth>160||window.outerHeight-window.innerHeight>160}setInterval(function(){const n=performance.now();debugger;(performance.now()-n>100||e())&&(window.location.href=\"/\")},1e3);"],["D:/motchillhd.online/node_modules/@vercel/analytics/dist/astro/index.astro?astro&type=script&index=0&lang.ts","var f=\"@vercel/analytics\",l=\"1.5.0\",w=()=>{window.va||(window.va=function(...r){(window.vaq=window.vaq||[]).push(r)})};function d(){return typeof window<\"u\"}function u(){try{const e=\"production\"}catch{}return\"production\"}function v(e=\"auto\"){if(e===\"auto\"){window.vam=u();return}window.vam=e}function m(){return(d()?window.vam:u())||\"production\"}function c(){return m()===\"development\"}function b(e,r){if(!e||!r)return e;let n=e;try{const t=Object.entries(r);for(const[a,i]of t)if(!Array.isArray(i)){const o=s(i);o.test(n)&&(n=n.replace(o,`/[${a}]`))}for(const[a,i]of t)if(Array.isArray(i)){const o=s(i.join(\"/\"));o.test(n)&&(n=n.replace(o,`/[...${a}]`))}return n}catch{return e}}function s(e){return new RegExp(`/${h(e)}(?=[/?#]|$)`)}function h(e){return e.replace(/[.*+?^${}()|[\\]\\\\]/g,\"\\\\$&\")}function y(e){return e.scriptSrc?e.scriptSrc:c()?\"https://va.vercel-scripts.com/v1/script.debug.js\":e.basePath?`${e.basePath}/insights/script.js`:\"/_vercel/insights/script.js\"}function g(e={debug:!0}){var r;if(!d())return;v(e.mode),w(),e.beforeSend&&((r=window.va)==null||r.call(window,\"beforeSend\",e.beforeSend));const n=y(e);if(document.head.querySelector(`script[src*=\"${n}\"]`))return;const t=document.createElement(\"script\");t.src=n,t.defer=!0,t.dataset.sdkn=f+(e.framework?`/${e.framework}`:\"\"),t.dataset.sdkv=l,e.disableAutoTrack&&(t.dataset.disableAutoTrack=\"1\"),e.endpoint?t.dataset.endpoint=e.endpoint:e.basePath&&(t.dataset.endpoint=`${e.basePath}/insights`),e.dsn&&(t.dataset.dsn=e.dsn),t.onerror=()=>{const a=c()?\"Please check if any ad blockers are enabled and try again.\":\"Be sure to enable Web Analytics for your project and deploy again. See https://vercel.com/docs/analytics/quickstart for more information.\";console.log(`[Vercel Web Analytics] Failed to load script from ${n}. ${a}`)},c()&&e.debug===!1&&(t.dataset.debug=\"false\"),document.head.appendChild(t)}function p({route:e,path:r}){var n;(n=window.va)==null||n.call(window,\"pageview\",{route:e,path:r})}function k(){try{return}catch{}}customElements.define(\"vercel-analytics\",class extends HTMLElement{constructor(){super();try{const r=JSON.parse(this.dataset.props??\"{}\"),n=JSON.parse(this.dataset.params??\"{}\");g({...r,disableAutoTrack:!0,framework:\"astro\",basePath:k(),beforeSend:window.webAnalyticsBeforeSend});const t=this.dataset.pathname;p({route:b(t??\"\",n),path:t})}catch(r){throw new Error(`Failed to parse WebAnalytics properties: ${r}`)}}});"]],"assets":["/_astro/avatar.qhoT-wEi.webp","/_astro/eposide.CaavVmCT.gif","/_astro/box-1.Bn1UieXg.jpg","/_astro/tips-box.cnkcbmZF.png","/_astro/logo.fk88Ay7t.svg","/_astro/episode404.CKFQIrZW.css","/_astro/index.aWXZ8XIm.css","/favicon.ico","/index.astro","/logo.png","/logo.svg","/robots.txt","/sitemap-episodes-1.xml","/sitemap-episodes-2.xml","/sitemap-episodes-3.xml","/sitemap-episodes-4.xml","/sitemap-episodes-5.xml","/sitemap-index.xml","/sitemap-movies.xml","/_astro/AnimeList.7rH3Zirq.js","/_astro/CardColumn.BkLQC3az.js","/_astro/CardColumn2.BXmqSxAZ.js","/_astro/CardRow.DxzE2uWV.js","/_astro/CardRow1.CFy_muQF.js","/_astro/client.BPIbHqJh.js","/_astro/Comments.CsNny_I8.js","/_astro/Episode.Das0_Ixq.js","/_astro/Header.BUQgtovS.js","/_astro/Header.DTzr3TN6.js","/_astro/HeroSection.CpeUVbx6.js","/_astro/index.BVOCwoKb.js","/_astro/jsx-runtime.D_zvdyIk.js","/_astro/MovieAction.BthHkzf2.js","/_astro/MovieCategory.BGn91IuE.js","/_astro/MovieCountry.DHxHuqEF.js","/_astro/MovieDetail.Bmhfk6_j.js","/_astro/MovieSearch.CBpzQaSn.js","/_astro/MovieToggle.GnvDeWL3.js","/_astro/MovieType.C1RyDz0P.js","/_astro/movieUtils.BzFiPXDS.js","/_astro/proxy.ordYrxt9.js","/_astro/VideoPlayer.Bz6MzgXa.js","/_astro/_commonjsHelpers.Cpj98o6Y.js"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"nPoG/iIk/oUKbfg7KOZtcU7EhNwgmV29Ie+Kx4EjuZk="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
