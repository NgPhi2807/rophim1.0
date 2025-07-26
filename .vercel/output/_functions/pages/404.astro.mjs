/* empty css                                      */
import { c as createComponent, r as renderHead, a as renderTemplate } from '../chunks/astro/server_CHdT0zCU.mjs';
import 'kleur/colors';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="vi"> <head><meta charset="UTF-8"><title>Không tìm thấy trang | Motchill</title><meta name="description" content="Trang bạn yêu cầu không tồn tại. Vui lòng kiểm tra lại liên kết hoặc quay về trang chủ."><meta name="viewport" content="width=device-width, initial-scale=1">${renderHead()}</head> <body class="bg-[#1f1f29] text-white flex items-center justify-center min-h-screen px-4"> <div class="text-center space-y-6 max-w-lg"> <h1 class="text-5xl font-bold text-green-500 animate-pulse">404</h1> <h2 class="text-2xl font-semibold">Không tìm thấy trang</h2> <p class="text-gray-400">
Có thể liên kết bạn truy cập không tồn tại hoặc đã bị xóa. Vui lòng kiểm
        tra lại địa chỉ URL.
</p> <a href="/" class="inline-block px-3 py-3 bg-white-500 text-white font-medium rounded-lg transition duration-200">
Quay về trang chủ
</a> </div> </body></html>`;
}, "D:/motchillhd.online/src/pages/404.astro", void 0);

const $$file = "D:/motchillhd.online/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
