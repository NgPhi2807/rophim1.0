/* empty css                                      */
import { c as createComponent, b as createAstro, d as renderComponent, a as renderTemplate, e as addAttribute, m as maybeRenderHead } from '../chunks/astro/server_CHdT0zCU.mjs';
import 'kleur/colors';
import { $ as $$Layout, H as Header } from '../chunks/Header_DfUnSFlX.mjs';
import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useCallback, useEffect } from 'react';
import { r as rutGonTinhTrangPhim } from '../chunks/movieUtils_DevODtGj.mjs';
import { T as TopMovies } from '../chunks/TodayMovies_CAEoqM_J.mjs';
export { renderers } from '../renderers.mjs';

const BASE_URL = "https://phimapi.com";
function SearchContent({ initialKeyword, initialPage = 1 }) {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: initialPage,
    total_pages: 1,
    total_items: 0,
    page_size: 10
  });
  const [currentKeyword, setCurrentKeyword] = useState(initialKeyword);
  const [currentPageFetch, setCurrentPageFetch] = useState(initialPage);
  const fetchSearchResults = useCallback(async (kw, pageToFetch) => {
    if (!kw) {
      setSearchResults([]);
      setLoading(false);
      setPagination({
        current_page: 1,
        total_pages: 1,
        total_items: 0,
        page_size: 10
      });
      return;
    }
    setLoading(true);
    setError(null);
    setSearchResults([]);
    try {
      const response = await fetch(
        `${BASE_URL}/v1/api/tim-kiem?keyword=${encodeURIComponent(
          kw
        )}&page=${pageToFetch}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSearchResults(data.data?.items || []);
      setPagination(
        data.data?.params?.pagination || {
          current_page: 1,
          total_pages: 1,
          total_items: 0,
          page_size: 10
        }
      );
      const newUrl = `/tim-kiem?q=${encodeURIComponent(
        kw
      )}&page=${pageToFetch}`;
      window.history.pushState(null, "", newUrl);
    } catch (err) {
      console.error("Lỗi khi tải kết quả tìm kiếm:", err);
      setError("Không thể tải kết quả tìm kiếm. Vui lòng thử lại.");
      setSearchResults([]);
      setPagination({
        current_page: 1,
        total_pages: 1,
        total_items: 0,
        page_size: 10
      });
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    if (initialKeyword !== currentKeyword || initialPage !== currentPageFetch) {
      setCurrentKeyword(initialKeyword);
      setCurrentPageFetch(initialPage);
    }
    if (currentKeyword) {
      fetchSearchResults(currentKeyword, currentPageFetch);
    }
  }, [
    currentKeyword,
    currentPageFetch,
    fetchSearchResults,
    initialKeyword,
    initialPage
  ]);
  const handlePageChange = (pageNumber) => {
    setCurrentPageFetch(pageNumber);
  };
  const { current_page, total_pages, total_items } = pagination;
  const paginationItems = [];
  const start = Math.max(1, current_page - 2);
  const end = Math.min(total_pages, start + 4);
  for (let i = start; i <= end; i++) {
    paginationItems.push(i);
  }
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto text-white", children: [
    /* @__PURE__ */ jsxs("h1", { className: "mb-6 text-lg lg:text-xl font-bold", children: [
      "Kết quả tìm kiếm cho:",
      /* @__PURE__ */ jsxs("span", { className: "text-[#ffd785]", children: [
        '"',
        currentKeyword,
        '"'
      ] })
    ] }),
    loading && /* @__PURE__ */ jsx("div", { className: "text-center text-gray-400", children: "Đang tải kết quả..." }),
    error && /* @__PURE__ */ jsx("div", { className: "text-center text-red-500", children: error }),
    !loading && !error && searchResults.length === 0 && /* @__PURE__ */ jsxs("div", { className: "text-center text-gray-400", children: [
      'Không tìm thấy phim nào phù hợp với từ khóa "',
      currentKeyword,
      '".'
    ] }),
    !loading && !error && searchResults.length > 0 && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6", children: searchResults.map((movie) => {
        const fullPosterUrl = `https://ik.imagekit.io/17mpki7mv/motchill/${movie.poster_url}?tr=f-webp,w-300,h-450,fo-auto,q-85`;
        return /* @__PURE__ */ jsxs(
          "a",
          {
            href: `/phim/${movie.slug}`,
            className: "group relative flex-shrink-0",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "relative aspect-[2/3] w-full overflow-hidden rounded-[4px]", children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: fullPosterUrl,
                    alt: `Poster phim ${movie.name}`,
                    className: "h-full w-full object-cover",
                    loading: "lazy"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "absolute bottom-0 left-0 h-[40%] w-full rounded-b-[4px]",
                    style: {
                      background: "linear-gradient(to top,rgba(30, 30, 30, 0.8) 5%, transparent 100%)"
                    },
                    "aria-hidden": "true"
                  }
                ),
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-[4px] bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" }),
                /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100", children: /* @__PURE__ */ jsxs(
                  "svg",
                  {
                    viewBox: "0 0 60 60",
                    xmlns: "http://www.w3.org/2000/svg",
                    className: "play-button h-[25px] w-[25px] transition-transform duration-700 sm:h-[30px] sm:w-[30px] ease-in-out",
                    children: [
                      /* @__PURE__ */ jsx(
                        "circle",
                        {
                          cx: "30",
                          cy: "30",
                          r: "30",
                          className: "fill-[#ffd785] transition-colors duration-200"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "path",
                        {
                          d: "M35.7461509,22.4942263 L45.1405996,36.5858994 C46.059657,37.9644855 45.6871354,39.8270935 44.3085493,40.7461509 C43.8157468,41.0746859 43.2367237,41.25 42.6444487,41.25 L23.8555513,41.25 C22.198697,41.25 20.8555513,39.9068542 20.8555513,38.25 C20.8555513,37.657725 21.0308654,37.078702 21.3594004,36.5858994 L30.7538491,22.4942263 C31.6729065,21.1156403 33.5355145,20.7431187 34.9141006,21.662176 C35.2436575,21.8818806 35.5264463,22.1646695 35.7461509,22.4942263 Z",
                          fill: "#000000",
                          transform: "translate(33.25, 30) rotate(-270) translate(-33.25, -30)"
                        }
                      )
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsx("div", { className: "absolute bottom-1 left-1 z-10", children: movie.episode_current && /* @__PURE__ */ jsx("span", { className: "z-20 px-0.5 py-0.5 text-[12px] font-bold leading-tight text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]", children: rutGonTinhTrangPhim(movie.episode_current) }) })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "pb-4 pt-2", children: /* @__PURE__ */ jsx(
                "p",
                {
                  className: "line-clamp-2 text-[13px] font-semibold text-gray-200 hover:text-[#ffd785]",
                  title: movie.name,
                  children: movie.name
                }
              ) })
            ]
          },
          movie._id
        );
      }) }),
      total_pages > 1 && /* @__PURE__ */ jsxs("nav", { className: "mt-8 flex flex-wrap items-center justify-center gap-2", children: [
        current_page > 1 && /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handlePageChange(current_page - 1),
            className: "flex h-8 w-8 items-center justify-center rounded-[4px] border border-gray-600 bg-[#23252b] text-sm text-gray-300 hover:bg-gray-600",
            "aria-label": "Trang trước",
            disabled: loading,
            children: /* @__PURE__ */ jsx(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                width: "16",
                height: "16",
                viewBox: "0 0 20 20",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    fill: "currentColor",
                    d: "m2 10l8 8l1.4-1.4L5.8 11H18V9H5.8l5.6-5.6L10 2z"
                  }
                )
              }
            )
          }
        ),
        paginationItems.map((p) => /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handlePageChange(p),
            className: `flex h-8 w-8 items-center justify-center rounded-[4px] border text-sm ${current_page === p ? "border-green-400 bg-green-500 text-white" : "border-gray-600 bg-[#23252b] text-gray-300 hover:bg-gray-600"}`,
            disabled: loading,
            children: p
          },
          p
        )),
        current_page < total_pages && /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => handlePageChange(current_page + 1),
            className: "flex h-8 w-8 items-center justify-center rounded-[4px] border border-gray-600 bg-[#23252b] text-sm text-gray-300 hover:bg-gray-600",
            "aria-label": "Trang sau",
            disabled: loading,
            children: /* @__PURE__ */ jsx(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                width: "16",
                height: "16",
                viewBox: "0 0 20 20",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    fill: "currentColor",
                    d: "M8.6 3.4L14.2 9H2v2h12.2l-5.6 5.6L10 18l8-8l-8-8z"
                  }
                )
              }
            )
          }
        )
      ] })
    ] })
  ] });
}

const $$Astro = createAstro();
const $$TimKiem = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$TimKiem;
  const keyword = Astro2.url.searchParams.get("q") || "";
  const page = parseInt(Astro2.url.searchParams.get("page") || "1");
  const BASE_URL = "https://phimapi.com";
  const TOP_URL = `${BASE_URL}/v1/api/danh-sach/phim-bo?page=1&sort_field=_id&sort_type=dsc&limit=10`;
  const siteUrl = "https://phimmoii.top";
  const fetchJson = async (url) => {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`L\u1ED7i khi fetch API: ${url}`);
      return await res.json();
    } catch (err) {
      return null;
    }
  };
  const topResponse = await fetchJson(TOP_URL);
  const topmovies = topResponse?.data.items || [];
  const pageTitle = keyword ? `T\xECm Ki\u1EBFm Phim V\u1EDBi T\u1EEB Kh\xF3a" ${keyword}"` : `T\xECm ki\u1EBFm phim - Trang ${page}`;
  const pageDescription = keyword ? `K\u1EBFt qu\u1EA3 t\xECm ki\u1EBFm phim cho t\u1EEB kh\xF3a "${keyword}" tr\xEAn Phimmoi. Duy\u1EC7t qua h\xE0ng ng\xE0n b\u1ED9 phim v\xE0 ch\u01B0\u01A1ng tr\xECnh truy\u1EC1n h\xECnh.` : `Trang t\xECm ki\u1EBFm phim c\u1EE7a Phimmoi. Kh\xE1m ph\xE1 c\xE1c b\u1ED9 phim v\xE0 ch\u01B0\u01A1ng tr\xECnh truy\u1EC1n h\xECnh y\xEAu th\xEDch c\u1EE7a b\u1EA1n.`;
  const canonicalUrl = new URL(
    `/tim-kiem?q=${encodeURIComponent(keyword)}&page=${page}`,
    Astro2.site?.toString() || siteUrl
  ).href;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` <title>${pageTitle}</title> <meta name="description"${addAttribute(pageDescription, "content")}> <meta name="robots" content="index, follow"> <link rel="canonical"${addAttribute(canonicalUrl, "href")}> <meta property="og:title"${addAttribute(pageTitle, "content")}> <meta property="og:description"${addAttribute(pageDescription, "content")}> <meta property="og:url"${addAttribute(canonicalUrl, "content")}> <meta property="og:type" content="website"> <meta name="twitter:card" content="summary_large_image"> <meta name="twitter:title"${addAttribute(pageTitle, "content")}> <meta name="twitter:description"${addAttribute(pageDescription, "content")}> ${maybeRenderHead()}<div class="bg-[#0F0F0Fe6]"> ${renderComponent($$result2, "Header", Header, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "D:/motchillhd.online/src/components/Header.jsx", "client:component-export": "default" })} <main id="main-content" class="container mx-auto px-4 lg:px-8 lg:flex lg:gap-10 py-4 lg:py-20"> <div class="w-full lg:flex-[7] flex flex-col gap-6"> <div class="px-0 lg:px-0"> ${renderComponent($$result2, "MovieSearch", SearchContent, { "initialKeyword": keyword, "initialPage": page, "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/motchillhd.online/src/components/MovieType/MovieSearch", "client:component-export": "default" })} </div> </div> <div class="w-full lg:flex-[3] px-0 lg:px-0"> ${renderComponent($$result2, "TopMovies", TopMovies, { "movies": topmovies })} </div> </main> </div> ` })}`;
}, "D:/motchillhd.online/src/pages/tim-kiem.astro", void 0);

const $$file = "D:/motchillhd.online/src/pages/tim-kiem.astro";
const $$url = "/tim-kiem";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$TimKiem,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
