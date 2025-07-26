/* empty css                                      */
import { c as createComponent, r as renderHead, a as renderTemplate } from '../chunks/astro/server_CHdT0zCU.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Episode404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="vi"> <head><meta charset="UTF-8"><title>Tập chưa cập nhật | Motchill</title><meta name="description" content="Tập phim bạn yêu cầu hiện chưa được cập nhật. Vui lòng quay lại sau hoặc chọn tập khác."><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="icon" href="/favicon.ico">${renderHead()}</head> <body class="bg-[#1a1a1a] text-white flex items-center justify-center min-h-screen px-4 py-8"> <div class="text-center space-y-6 max-w-lg bg-[#282828] p-8 rounded-lg shadow-xl"> <h1 class="text-5xl font-bold text-yellow-400">Oops!</h1> <h2 class="text-2xl font-semibold text-gray-100">
Tập này hiện chưa có sẵn
</h2> <p class="text-base text-gray-300 leading-relaxed">
Tập phim bạn đang tìm kiếm hiện chưa được cập nhật. Vui lòng quay lại
        sau.
</p> <div class="pt-4"> <a href="javascript:history.back()" class="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-md hover:bg-green-700 transition duration-200">
Quay lại
</a> </div> </div> </body></html>`;
}, "D:/motchillhd.online/src/pages/episode404.astro", void 0);

const $$file = "D:/motchillhd.online/src/pages/episode404.astro";
const $$url = "/episode404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Episode404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
