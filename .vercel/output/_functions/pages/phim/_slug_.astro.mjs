/* empty css                                         */
import { c as createComponent, b as createAstro, m as maybeRenderHead, e as addAttribute, a as renderTemplate, d as renderComponent, F as Fragment, u as unescapeHTML } from '../../chunks/astro/server_CHdT0zCU.mjs';
import 'kleur/colors';
import { $ as $$Layout, H as Header } from '../../chunks/Header_DfUnSFlX.mjs';
import { jsx, jsxs, Fragment as Fragment$1 } from 'react/jsx-runtime';
import { useState, useEffect } from 'react';
import { T as TopMovies } from '../../chunks/TodayMovies_CAEoqM_J.mjs';
import { E as Episodes, C as CommentBox } from '../../chunks/Comments_c22m-UHV.mjs';
import axios from 'axios';
export { renderers } from '../../renderers.mjs';

function MovieDetailWrapper({ movie, children }) {
  return /* @__PURE__ */ jsx("div", { className: " text-gray-300 ", children: /* @__PURE__ */ jsx("div", { className: "px-4", children: /* @__PURE__ */ jsx("div", { className: "container mx-auto", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-3 lg:flex-row", children }) }) }) });
}

const $$Astro$1 = createAstro();
const $$MovieDetailStaticInfo = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$MovieDetailStaticInfo;
  const { movie, chuyenURLSangProxy1 } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex w-full items-center justify-center gap-6 lg:items-start lg:justify-start"> <div class="space-y-6"> <div class="flex flex-col items-start gap-3 lg:flex-col lg:gap-6"> <div class="mx-auto w-40 flex-shrink-0 lg:mx-0"> <div class="relative h-[15rem] lg:h-[15rem] w-full rounded-lg shadow-[0_12px_48px_rgba(255,255,255,0.15)] transition-all duration-300 hover:shadow-[0_16px_64px_rgba(255,255,255,0.25)]"> <img${addAttribute(chuyenURLSangProxy1(movie.poster_url), "src")}${addAttribute(`Poster phim ${movie.name}`, "alt")} class="absolute left-0 top-0 h-full w-full rounded-[6px] object-cover" loading="eager" fetchpriority="high"> <div class="pointer-events-none absolute bottom-0 left-0 h-[100%] w-full rounded-b-[6px]"${addAttribute({
    background: "linear-gradient(to top, rgba(30, 30, 30, 0.2), transparent)"
  }, "style")} aria-hidden="true"></div> </div> </div> <div class="flex w-full flex-1 flex-col items-center gap-3 lg:items-start"> <h1 class="text-center text-lg font-semibold leading-tight text-white lg:text-left lg:text-xl"> ${movie.name} </h1> ${movie.origin_name && renderTemplate`<p class="text-center text-sm font-normal text-[#ffd875] lg:text-left"> ${movie.origin_name} </p>`} <div class="mt-2 hidden flex-wrap items-center justify-center gap-2 text-[10px] font-semibold text-[#ECECEC] sm:flex lg:justify-start lg:text-[11px]"> <div class="flex items-center border border-yellow-300 px-2 py-0.5 rounded-md"> <p class="text-[#f7d54d]">IMDb</p> <p class="pl-1"> ${movie.tmdb.vote_average === 0 ? 10 : movie.tmdb.vote_average.toFixed(1)} </p> </div> ${movie.quality && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <span class="bg-white  px-2 py-0.5  rounded-md text-black font-bold"> ${movie.quality} </span> ` })}`} ${movie.year && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <span class="border border-white  px-2 py-0.5   rounded-md"> ${movie.year} </span> ` })}`} ${movie.time && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <span class="border border-white px-2 py-0.5   rounded-md"> ${movie.time} </span> ` })}`} </div> <div> ${movie.episode_current && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <span class="hidden lg:flex items-center justify-center gap-2 text-xs border py-2 px-3 rounded-full"> ${/hoàn tất|full/i.test(movie.episode_current) ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate` <svg class="h-4 w-4 text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"> <path d="M5 13l4 4L19 7"></path> </svg>
Tình Trạng: ${movie.episode_current}` })}` : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate` <div class="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent text-yellow-400" aria-hidden="true"></div>
Đang chiếu: ${movie.episode_current}` })}`} </span> ` })}`} </div> ${movie.category?.length > 0 && renderTemplate`<div class="mt-2 hidden flex-wrap gap-2 lg:flex"> ${movie.category.map((genre) => renderTemplate`<a${addAttribute(`/the-loai/${genre.slug}`, "href")} class="rounded-[4px] bg-[#ffffff14] px-2 py-1 text-[11px] font-normal text-gray-200 transition-colors duration-200 hover:text-yellow-400"> ${genre.name} </a>`)} </div>`} ${movie.director && renderTemplate`<h2 class="text-[14px] my-1 hidden font-semibold text-white lg:block">
Đạo diễn:
<span class="ml-2 text-[13px] font-normal text-gray-400"> ${movie.director} </span> </h2>`} ${movie.actor && movie.actor.length > 0 && renderTemplate`<h2 class="text-[14px] my-1 hidden font-semibold text-white lg:block">
Diễn viên:
<span class="ml-2 text-[13px] font-normal text-gray-400"> ${movie.actor.join(", ")} </span> </h2>`} ${movie.content && renderTemplate`<div class="my-1 hidden lg:block"> <h2 class="text-[14px] my-1 hidden font-semibold text-white lg:block">
Nội dung phim:
</h2> <p class="line-clamp-5 text-[13px] leading-relaxed text-gray-400"> ${movie.content} </p> </div>`} </div> </div> </div> </div>`;
}, "D:/motchillhd.online/src/components/MovieDetail/MovieDetailStaticInfo.astro", void 0);

function MobileMovieInfoToggle({ movie }) {
  const [showMobileInfo, setShowMobileInfo] = useState(false);
  const toggleMobileInfo = () => {
    setShowMobileInfo(!showMobileInfo);
  };
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: toggleMobileInfo,
        className: "items-center justify-center rounded-[4px] px-4 text-xs font-semibold text-white lg:hidden",
        "aria-label": "Xem thông tin phim",
        children: showMobileInfo ? "Ẩn thông tin" : "Thông tin phim"
      }
    ),
    showMobileInfo && /* @__PURE__ */ jsxs("div", { className: "w-full space-y-4 rounded-[4px] lg:hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-wrap justify-start gap-2", children: [
        movie.quality && /* @__PURE__ */ jsx("span", { className: "flex items-center justify-center rounded-[4px] bg-white px-2 py-0.5 text-[10px] font-bold text-black lg:text-[13px]", children: movie.quality }),
        movie.year && /* @__PURE__ */ jsx("span", { className: "flex items-center justify-center rounded-[4px] border border-white px-2 py-0.5 text-[10px] text-white lg:text-[13px]", children: movie.year }),
        movie.time && /* @__PURE__ */ jsx("span", { className: "flex items-center justify-center rounded-[4px] border border-white px-2 py-0.5 text-[10px] text-white lg:text-[13px]", children: movie.time }),
        movie.episode_current && /* @__PURE__ */ jsxs(
          "span",
          {
            className: `flex items-center justify-center gap-1 rounded-[4px] px-2 py-0.5 text-[10px] font-semibold lg:text-[13px] ${/hoàn tất|full/i.test(movie.episode_current) ? "border-white border text-white" : "bg-[#FFD875] text-black"}`,
            children: [
              /hoàn tất|full/i.test(movie.episode_current) ? /* @__PURE__ */ jsx(
                "svg",
                {
                  className: "h-4 w-4",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: 2,
                  viewBox: "0 0 24 24",
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      d: "M5 13l4 4L19 7"
                    }
                  )
                }
              ) : /* @__PURE__ */ jsx(
                "div",
                {
                  className: "h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent",
                  "aria-hidden": "true"
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Tình trạng:" }),
              movie.episode_current
            ]
          }
        )
      ] }),
      movie.category?.length > 0 && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "mb-2 text-[13px] font-bold text-white", children: "Thể loại:" }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: movie.category.map((genre) => /* @__PURE__ */ jsx(
          "a",
          {
            href: `/the-loai/${genre.slug}`,
            className: "rounded-[4px] bg-[#353946] px-2 py-1 text-[10px] text-[#ececec] transition-colors duration-200 hover:bg-[#383a42] lg:text-[13px]",
            children: genre.name
          },
          genre.slug
        )) })
      ] }),
      movie.director && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "mb-1 text-[13px] font-bold text-white", children: "Đạo diễn:" }),
        /* @__PURE__ */ jsx("p", { className: "text-[13px] text-gray-400", children: movie.director })
      ] }),
      movie.actor && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "mb-1 text-[13px] font-bold text-white", children: "Diễn viên:" }),
        /* @__PURE__ */ jsx("p", { className: "text-[13px] text-gray-400", children: movie.actor.join(", ") })
      ] }),
      movie.content && /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h3", { className: "mb-2 text-[13px] font-bold text-white", children: "Nội dung phim:" }),
        /* @__PURE__ */ jsx("p", { className: "text-[13px] leading-relaxed text-gray-400", children: movie.content })
      ] })
    ] })
  ] });
}

const BASE_URL = "https://phimapi.com";
const CACHE_KEY_PREFIX = "moviePageDataCache_";
const CACHE_EXPIRATION_TIME = 2 * 60 * 60 * 1e3;
async function getMoviePageData(slug) {
  const CACHE_KEY = CACHE_KEY_PREFIX + slug;
  if (typeof window !== "undefined" && window.localStorage) {
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedTimestamp = localStorage.getItem(`${CACHE_KEY}_timestamp`);
    if (cachedData && cachedTimestamp) {
      const parsedTimestamp = parseInt(cachedTimestamp, 10);
      if (Date.now() - parsedTimestamp < CACHE_EXPIRATION_TIME) {
        try {
          return JSON.parse(cachedData);
        } catch (e) {
          console.error(
            "Lỗi khi phân tích cú pháp dữ liệu bộ nhớ đệm, đang tìm nạp dữ liệu mới.",
            e
          );
          localStorage.removeItem(CACHE_KEY);
          localStorage.removeItem(`${CACHE_KEY}_timestamp`);
        }
      } else {
        console.warn(
          `Dữ liệu bộ nhớ đệm cho slug "${slug}" đã hết hạn, đang xóa và tìm nạp dữ liệu mới.`
        );
        localStorage.removeItem(CACHE_KEY);
        localStorage.removeItem(`${CACHE_KEY}_timestamp`);
      }
    }
  }
  const urlMovieDetail = `${BASE_URL}/phim/${slug}`;
  const urlTop = `${BASE_URL}/v1/api/danh-sach/phim-bo?page=1&sort_field=_id&sort_type=dsc&year=2025&limit=7`;
  const urlDeXuat = `${BASE_URL}/v1/api/danh-sach/phim-bo?page=1&sort_field=_id&sort_type=dsc&limit=24`;
  try {
    const [movieDetailResponse, topRes, deXuatRes] = await Promise.all([
      axios.get(urlMovieDetail),
      axios.get(urlTop),
      axios.get(urlDeXuat)
    ]);
    const movieDetailData = movieDetailResponse.data;
    const topmovies = topRes.data?.data?.items || [];
    const dexuatmovies = deXuatRes.data?.data?.items || [];
    let vietsubEpisodes = [];
    let thuyetMinhEpisodes = [];
    let longTiengEpisodes = [];
    let firstEpisodeLink = null;
    let firstEpisodeSlug = null;
    let firstEpisodeType = null;
    if (movieDetailData?.episodes && Array.isArray(movieDetailData.episodes)) {
      const vietsubServer = movieDetailData.episodes.find(
        (server) => server.server_name?.toLowerCase().includes("vietsub")
      );
      const thuyetMinhServer = movieDetailData.episodes.find(
        (server) => server.server_name?.toLowerCase().includes("thuyết minh")
      );
      const longTiengServer = movieDetailData.episodes.find(
        (server) => server.server_name?.toLowerCase().includes("lồng tiếng")
      );
      if (vietsubServer && Array.isArray(vietsubServer.server_data)) {
        vietsubEpisodes = vietsubServer.server_data;
      }
      if (thuyetMinhServer && Array.isArray(thuyetMinhServer.server_data)) {
        thuyetMinhEpisodes = thuyetMinhServer.server_data;
      }
      if (longTiengServer && Array.isArray(longTiengServer.server_data)) {
        longTiengEpisodes = longTiengServer.server_data;
      }
      if (vietsubEpisodes.length > 0 && vietsubEpisodes[0].link_m3u8) {
        firstEpisodeLink = vietsubEpisodes[0].link_m3u8;
        firstEpisodeSlug = vietsubEpisodes[0].slug;
        firstEpisodeType = "vietsub";
      } else if (thuyetMinhEpisodes.length > 0 && thuyetMinhEpisodes[0].link_m3u8) {
        firstEpisodeLink = thuyetMinhEpisodes[0].link_m3u8;
        firstEpisodeSlug = thuyetMinhEpisodes[0].slug;
        firstEpisodeType = "thuyetminh";
      } else if (longTiengEpisodes.length > 0 && longTiengEpisodes[0].link_m3u8) {
        firstEpisodeLink = longTiengEpisodes[0].link_m3u8;
        firstEpisodeSlug = longTiengEpisodes[0].slug;
        firstEpisodeType = "longtieng";
      }
    }
    const processedData = {
      movieInfo: movieDetailData?.movie || null,
      vietsub: vietsubEpisodes,
      thuyetminh: thuyetMinhEpisodes,
      longtieng: longTiengEpisodes,
      topmovies,
      dexuatmovies,
      firstEpisode: firstEpisodeLink,
      firstEpisodeSlug,
      firstEpisodeType
    };
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(processedData));
        localStorage.setItem(`${CACHE_KEY}_timestamp`, Date.now().toString());
      } catch (e) {
        console.warn("Không thể lưu dữ liệu vào localStorage:", e);
      }
    }
    return processedData;
  } catch (err) {
    console.error(`Lỗi khi lấy dữ liệu cho slug "${slug}":`, err);
    return {
      movieInfo: null,
      vietsub: [],
      thuyetminh: [],
      longtieng: [],
      topmovies: [],
      dexuatmovies: [],
      firstEpisode: null,
      firstEpisodeSlug: null,
      firstEpisodeType: null
    };
  }
}

function MovieActions({
  movieSlug,
  firstEpisodeSlug,
  firstEpisodeType,
  movieName
}) {
  const [hrefXemNgay, setHrefXemNgay] = useState("");
  useEffect(() => {
    let initialHref;
    if (movieSlug) {
      if (firstEpisodeType === "vietsub" && firstEpisodeSlug) {
        initialHref = `/xem-phim/${movieSlug}/${firstEpisodeSlug}/vietsub`;
      } else if (firstEpisodeType === "thuyetminh" && firstEpisodeSlug) {
        initialHref = `/xem-phim/${movieSlug}/${firstEpisodeSlug}/thuyetminh`;
      } else if (firstEpisodeType === "longtieng" && firstEpisodeSlug) {
        initialHref = `/xem-phim/${movieSlug}/${firstEpisodeSlug}/longtieng`;
      } else {
        initialHref = `/xem-phim/${movieSlug}/tap-1/vietsub`;
      }
    } else {
      initialHref = "#";
      console.warn(
        "Movie slug is undefined in MovieActions, setting default href to '#'."
      );
    }
    setHrefXemNgay(initialHref);
  }, [movieSlug, firstEpisodeSlug, firstEpisodeType]);
  const handleShare = () => {
    const shareData = {
      title: `${movieName} | PhimMoi`,
      text: "Khám phá phim hấp dẫn mỗi ngày trên phimmoii.top",
      url: window.location.href
    };
    if (navigator.share) {
      navigator.share(shareData).then(() => {
        console.log("Chia sẻ thành công!");
      }).catch((error) => {
        console.log("Lỗi khi chia sẻ:", error);
      });
    } else {
      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareData.url).then(() => {
          alert("📋 Đã sao chép đường dẫn vào clipboard!");
        }).catch(() => {
          alert(
            "⚠️ Không thể sao chép, vui lòng copy thủ công: " + shareData.url
          );
        });
      } else {
        alert(
          "⚠️ Trình duyệt của bạn không hỗ trợ sao chép tự động. Hãy copy đường dẫn này: " + shareData.url
        );
      }
    }
  };
  return /* @__PURE__ */ jsxs(Fragment$1, { children: [
    /* @__PURE__ */ jsxs("div", { className: "hidden lg:flex mt-3 flex-row gap-8 items-center justify-center ", children: [
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: hrefXemNgay,
          className: "flex items-center justify-center gap-4 rounded-full bg-gradient-to-br from-[#FECF59] to-[#FFF1CC] px-8 py-4 text-base font-medium text-gray-900 transition-all duration-200 shadow-lg hover:shadow-[0_4px_20px_rgba(255,222,128,1)]",
          "aria-label": "Xem phim ngay",
          children: [
            /* @__PURE__ */ jsx(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                width: "20",
                height: "20",
                viewBox: "0 0 24 24",
                fill: "currentColor",
                children: /* @__PURE__ */ jsx("path", { d: "M21.409 9.353a2.998 2.998 0 0 1 0 5.294L8.597 21.614C6.534 22.737 4 21.277 4 18.968V5.033c0-2.31 2.534-3.769 4.597-2.648z" })
              }
            ),
            "Xem ngay"
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-4 items-center ml-4", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleShare,
            className: "flex flex-col items-center gap-2 justify-center text-white text-xs font-semibold hover:text-[#ffd785] px-4 py-2 rounded-lg hover:bg-[#ffffff10] transition-colors duration-200",
            "aria-label": "Chia sẻ phim",
            children: [
              /* @__PURE__ */ jsx(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "24",
                  height: "24",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      fill: "currentColor",
                      d: "M20.336 3.221L3.873 8.71a.35.35 0 0 0-.027.654l6.05 2.593a.2.2 0 0 0 .196-.021l5.931-4.238c.184-.13.41.096.28.28l-4.238 5.931a.2.2 0 0 0-.02.195l2.592 6.05a.35.35 0 0 0 .654-.026L20.78 3.664a.35.35 0 0 0-.443-.443"
                    }
                  )
                }
              ),
              "Chia sẻ"
            ]
          }
        ),
        /* @__PURE__ */ jsxs("button", { className: "flex flex-col gap-2 items-center justify-center text-white text-xs font-semibold hover:text-[#ffd785] px-4 py-2 rounded-lg hover:bg-[#ffffff10] transition-colors duration-200", children: [
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 20 20",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  fill: "currentColor",
                  d: "M5.4 17.604c.33.437.957.526 1.399.2l4.011-2.962h4.59c1.436 0 2.6-1.149 2.6-2.566v-6.71C18 4.149 16.836 3 15.4 3H4.6C3.164 3 2 4.149 2 5.566v6.71c0 1.418 1.164 2.566 2.6 2.566h.6v2.171c0 .213.07.42.2.591M9.5 10a.5.5 0 0 1 0-1H15a.5.5 0 0 1 0 1zm-2-1a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zM5 11h5.5a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1m7.5 1a.5.5 0 0 1 0-1H15a.5.5 0 0 1 0 1z"
                }
              )
            }
          ),
          "Bình luận"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-4 flex w-full flex-col gap-3 lg:hidden", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col justify-center gap-6 items-center", children: [
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: hrefXemNgay,
          className: "w-[50%] flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#FECF59] to-[#FFF1CC] px-6 py-3 text-base font-semibold text-gray-900 transition-all duration-200 hover:drop-shadow-xl shadow-lg",
          "aria-label": "Xem phim ngay",
          children: [
            /* @__PURE__ */ jsx(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                width: "14",
                height: "14",
                viewBox: "0 0 24 24",
                fill: "currentColor",
                children: /* @__PURE__ */ jsx("path", { d: "M21.409 9.353a2.998 2.998 0 0 1 0 5.294L8.597 21.614C6.534 22.737 4 21.277 4 18.968V5.033c0-2.31 2.534-3.769 4.597-2.648z" })
              }
            ),
            "Xem ngay"
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-8 items-center ml-4", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleShare,
            className: "flex flex-col items-center gap-2 justify-center text-white text-xs font-semibold hover:text-[#ffd785] transition-colors duration-200",
            "aria-label": "Chia sẻ phim",
            children: [
              /* @__PURE__ */ jsx(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "24",
                  height: "24",
                  viewBox: "0 0 24 24",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      fill: "currentColor",
                      d: "M20.336 3.221L3.873 8.71a.35.35 0 0 0-.027.654l6.05 2.593a.2.2 0 0 0 .196-.021l5.931-4.238c.184-.13.41.096.28.28l-4.238 5.931a.2.2 0 0 0-.02.195l2.592 6.05a.35.35 0 0 0 .654-.026L20.78 3.664a.35.35 0 0 0-.443-.443"
                    }
                  )
                }
              ),
              "Chia sẻ"
            ]
          }
        ),
        /* @__PURE__ */ jsxs("button", { className: "flex flex-col gap-2 items-center justify-center text-white text-xs font-semibold hover:text-[#ffd785] hover:bg-slate-200/20 transition-colors duration-200", children: [
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 20 20",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  fill: "currentColor",
                  d: "M5.4 17.604c.33.437.957.526 1.399.2l4.011-2.962h4.59c1.436 0 2.6-1.149 2.6-2.566v-6.71C18 4.149 16.836 3 15.4 3H4.6C3.164 3 2 4.149 2 5.566v6.71c0 1.418 1.164 2.566 2.6 2.566h.6v2.171c0 .213.07.42.2.591M9.5 10a.5.5 0 0 1 0-1H15a.5.5 0 0 1 0 1zm-2-1a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zM5 11h5.5a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1m7.5 1a.5.5 0 0 1 0-1H15a.5.5 0 0 1 0 1z"
                }
              )
            }
          ),
          "Bình luận"
        ] })
      ] })
    ] }) })
  ] });
}

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$slug;
  const capitalizeWords = (str) => {
    if (!str) return "";
    return str.split(" ").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");
  };
  const stripHtml = (html) => html?.replace(/<[^>]*>?/gm, "") || "";
  const getOptimizedImageUrl = (url, width, height) => {
    if (!url) return "";
    const index = url.indexOf("/upload/");
    if (index === -1) return "";
    const path = url.slice(index + "/upload/".length);
    let transformParams = "f-webp,fo-auto,q-85";
    if (width) transformParams += `,w-${width}`;
    if (height) transformParams += `,h-${height}`;
    return `https://ik.imagekit.io/17mpki7mv/motchill/upload/${path}?tr=${transformParams}`;
  };
  const { slug } = Astro2.params;
  const siteUrl = "https://phimmoii.top";
  const canonicalUrl = `${siteUrl}/phim/${slug}`;
  const movieCommentIdentifier = `phim/${slug}`;
  let movieDetail = null;
  let vietsubEpisodes = [];
  let thuyetMinhEpisodes = [];
  let longTiengEpisodes = [];
  let topmovies = [];
  let dexuatmovies = [];
  let firstEpisodeLink = null;
  let firstEpisodeSlug = null;
  let firstEpisodeType = null;
  try {
    const moviePageData = await getMoviePageData(slug);
    if (moviePageData) {
      movieDetail = moviePageData.movieInfo;
      vietsubEpisodes = moviePageData.vietsub || [];
      thuyetMinhEpisodes = moviePageData.thuyetminh || [];
      longTiengEpisodes = moviePageData.longtieng || [];
      topmovies = moviePageData.topmovies || [];
      dexuatmovies = moviePageData.dexuatmovies || [];
      firstEpisodeLink = moviePageData.firstEpisode || null;
      firstEpisodeSlug = moviePageData.firstEpisodeSlug || null;
      firstEpisodeType = moviePageData.firstEpisodeType || null;
    }
  } catch (error) {
    console.error(`Error fetching movie data for slug "${slug}":`, error);
  }
  if (!movieDetail) {
    return new Response(null, {
      status: 404,
      statusText: "Not Found"
    });
  }
  const movieTitleFormatted = capitalizeWords(movieDetail.name);
  const movieOriginalName = capitalizeWords(movieDetail.origin_name);
  const cleanContent = stripHtml(movieDetail.content);
  const shortContent = cleanContent.length > 160 ? cleanContent.slice(0, 157) + "[...]" : cleanContent;
  const randomRating = (Math.random() * 0.5 + 9).toFixed(1);
  const randomCount = Math.floor(Math.random() * 2e3 + 1e3);
  const genreList = Array.isArray(movieDetail.category) ? movieDetail.category.map((g) => g.name) : [];
  const actorList = Array.isArray(movieDetail.actor) ? movieDetail.actor.map((name) => ({
    "@type": "Person",
    name: name.trim()
  })) : [];
  const directorSchema = Array.isArray(movieDetail.director) && movieDetail.director.length > 0 ? { "@type": "Person", name: movieDetail.director[0] } : void 0;
  const datePublishedSchema = movieDetail.year ? `${movieDetail.year}-01-01` : "";
  const ratingValue = movieDetail.tmdb?.vote_average?.toString() || randomRating;
  const ratingCount = movieDetail.tmdb?.vote_count?.toString() || randomCount.toString();
  const posterUrlProxy = getOptimizedImageUrl(movieDetail.poster_url);
  const thumbUrlProxy = getOptimizedImageUrl(movieDetail.thumb_url);
  const posterSmallUrlProxy = getOptimizedImageUrl(
    movieDetail.poster_url,
    300,
    450
  );
  const seoTitle = `Xem Phim ${movieTitleFormatted} - Full HD - ${movieOriginalName} - Phimmoi`;
  const seoDescription = `Phim ${movieTitleFormatted} - ${shortContent}`;
  const ogImageContent = getOptimizedImageUrl(movieDetail.poster_url);
  const schemaOrgData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Movie",
        name: movieTitleFormatted,
        description: movieDetail.content || "Xem phim online Vietsub mi\u1EC5n ph\xED t\u1EA1i Phimmoi.",
        image: posterUrlProxy,
        url: canonicalUrl,
        datePublished: datePublishedSchema,
        genre: genreList,
        director: directorSchema,
        actor: actorList,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue,
          bestRating: "10",
          worstRating: "1",
          ratingCount
        },
        potentialAction: {
          "@type": "WatchAction",
          target: [
            {
              "@type": "EntryPoint",
              urlTemplate: canonicalUrl,
              actionPlatform: [
                "http://schema.org/DesktopWebPlatform",
                "http://schema.org/MobileWebPlatform",
                "http://schema.org/TabletWebPlatform"
              ]
            }
          ]
        }
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Trang ch\u1EE7",
            item: siteUrl
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Phim",
            item: `${siteUrl}/phim`
          },
          {
            "@type": "ListItem",
            position: 3,
            name: movieTitleFormatted,
            item: canonicalUrl
          }
        ]
      },
      {
        "@type": "WebPage",
        name: `${movieTitleFormatted} - Phimmoi`,
        url: canonicalUrl,
        description: movieDetail.content || "Xem phim Vietsub mi\u1EC5n ph\xED t\u1EA1i Phimmoi."
      }
    ]
  };
  const gradientMaskStyle = {
    maskImage: `
    linear-gradient(to bottom, rgba(0,0,0,1) 50%, rgba(0,0,0,0) 90%),
    linear-gradient(to top, rgba(0,0,0,1) 90%, rgba(0,0,0,0) 100%),
    linear-gradient(to right, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%),
    linear-gradient(to left, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)
  `,
    maskComposite: "intersect",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat"
  };
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Layout, {}, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="bg-[#191B24] relative"> ${renderComponent($$result2, "Header", Header, { "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/motchillhd.online/src/components/Header", "client:component-export": "default" })} <div class="relative w-full h-[200px] lg:h-[500px] overflow-hidden"> <img${addAttribute(thumbUrlProxy, "src")}${addAttribute(`${movieTitleFormatted} thumbnail`, "alt")} class="absolute inset-0 w-full h-full object-cover filter opacity-50"${addAttribute(gradientMaskStyle, "style")}> </div> <div class="hidden md:block absolute inset-0 z-[1] pointer-events-none"${addAttribute({
    backgroundImage: `radial-gradient(rgba(0,0,0,0.1) 0.5px, transparent 0.5px)`,
    backgroundSize: "3px 3px"
  }, "style")} aria-hidden="true"></div> <div class="mx-auto lg:px-8 lg:flex lg:pt-40 lg:pb-10 px-4 relative z-20 -mt-[100px] lg:-mt-[250px]"> <div class="relative w-full lg:w-[45%] min-w-0"> <div class="hidden lg:block absolute top-0 left-0 right-0 h-[20%] bg-gradient-to-b from-black/10 to-transparent backdrop-blur-sm rounded-t-[2rem] z-10"></div> <div class="relative flex flex-col w-full bg-transparent z-10"> <div class="-mx-4 lg:mx-0 py-2 lg:py-8 px-2"> ${renderComponent($$result2, "MovieDetailWrapper", MovieDetailWrapper, { "movie": movieDetail, "firstEpisodeSlug": firstEpisodeSlug, "firstEpisodeType": firstEpisodeType, "client:visible": true, "client:component-hydration": "visible", "client:component-path": "D:/motchillhd.online/src/components/MovieDetail/MovieDetail", "client:component-export": "default" }, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "MovieDetailStaticInfo", $$MovieDetailStaticInfo, { "movie": movieDetail, "chuyenURLSangProxy": getOptimizedImageUrl, "chuyenURLSangProxy1": (url) => getOptimizedImageUrl(url, 300, 450) }, { "movie-actions": async ($$result4) => renderTemplate`${movieDetail && renderTemplate`${renderComponent($$result4, "MovieActions", MovieActions, { "slot": "movie-actions", "movieSlug": movieDetail.slug, "firstEpisodeSlug": firstEpisodeSlug, "firstEpisodeType": firstEpisodeType, "movieName": movieDetail.name, "client:visible": true, "client:component-hydration": "visible", "client:component-path": "D:/motchillhd.online/src/components/MovieDetail/MovieAction", "client:component-export": "default" })}`}` })} ${renderComponent($$result3, "MobileMovieInfoToggle", MobileMovieInfoToggle, { "movie": movieDetail, "client:visible": true, "client:component-hydration": "visible", "client:component-path": "D:/motchillhd.online/src/components/MovieDetail/MovieToggle", "client:component-export": "default" })} ` })} </div> <div class="hidden lg:flex py-4 justify-center"> <div class="w-full h-[4px] bg-white rounded-xs"></div> </div> <div class="w-full py-0 lg:py-4 px-4 lg:px-0"> ${renderComponent($$result2, "TopMovies", TopMovies, { "movies": topmovies })} </div> </div> </div> <div class="relative basis-full lg:w-[55%]"> <div class="hidden lg:block pointer-events-none absolute top-0 left-0 right-0 h-[20%] bg-gradient-to-b from-black/20 to-transparent backdrop-blur-sm rounded-t-[2rem] z-10"></div> <div class="relative z-20 p-0 lg:px-10 lg:py-4"> ${renderComponent($$result2, "MovieActions", MovieActions, { "movieSlug": movieDetail.slug, "firstEpisodeSlug": firstEpisodeSlug, "firstEpisodeType": firstEpisodeType, "movieName": movieDetail.name, "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/motchillhd.online/src/components/MovieDetail/MovieAction", "client:component-export": "default" })} <div class="py-10 flex justify-center"> <div class="w-[80%] h-[4px] bg-white rounded-xs"></div> </div> ${renderComponent($$result2, "Episodes", Episodes, { "vietsub": vietsubEpisodes, "thuyetminh": thuyetMinhEpisodes, "longtieng": longTiengEpisodes, "slug": slug, "currentType": firstEpisodeType, "totalEpisodes": movieDetail.episode_total, "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/motchillhd.online/src/components/Episode", "client:component-export": "default" })} ${renderComponent($$result2, "CommentBox", CommentBox, { "commentIdentifier": movieCommentIdentifier, "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/motchillhd.online/src/components/Comment/Comments", "client:component-export": "default" })} </div> </div> </div> </div> `, "head": async ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "head" }, { "default": async ($$result3) => renderTemplate(_a || (_a = __template([" <title>", '</title> <meta name="description"', '> <link rel="canonical"', '> <meta name="robots" content="index, follow"> <meta property="og:title"', '> <meta property="og:description"', '> <meta property="og:image"', '> <meta property="og:url"', '> <meta property="og:type" content="video.movie"> <meta property="og:locale" content="vi_VN"> <meta property="og:site_name" content="Phimmoi"> <meta name="twitter:card" content="summary_large_image"> <meta name="twitter:title"', '> <meta name="twitter:description"', '> <meta name="twitter:image"', '> <link rel="icon" href="/favicon.ico"> ', "", '<script type="application/ld+json">', "<\/script> "])), seoTitle, addAttribute(seoDescription, "content"), addAttribute(canonicalUrl, "href"), addAttribute(seoTitle, "content"), addAttribute(movieDetail.content || seoDescription, "content"), addAttribute(ogImageContent, "content"), addAttribute(canonicalUrl, "content"), addAttribute(seoTitle, "content"), addAttribute(movieDetail.content || seoDescription, "content"), addAttribute(ogImageContent, "content"), movieDetail.poster_url && renderTemplate`<link rel="preload" as="image"${addAttribute(posterSmallUrlProxy, "href")}${addAttribute(`${posterSmallUrlProxy} 300w`, "imagesrcset")} imagesizes="(max-width: 768px) 100vw, 300px">`, movieDetail.thumb_url && renderTemplate`<link rel="preload" as="image"${addAttribute(thumbUrlProxy, "href")}${addAttribute(`${thumbUrlProxy} 800w`, "imagesrcset")} imagesizes="(max-width: 768px) 100vw, 800px">`, unescapeHTML(JSON.stringify(schemaOrgData))) })}` })}`;
}, "D:/motchillhd.online/src/pages/phim/[slug].astro", void 0);

const $$file = "D:/motchillhd.online/src/pages/phim/[slug].astro";
const $$url = "/phim/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
