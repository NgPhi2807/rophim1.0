/* empty css                                               */
import { c as createComponent, b as createAstro, m as maybeRenderHead, s as spreadAttributes, e as addAttribute, a as renderTemplate, d as renderComponent, F as Fragment, u as unescapeHTML } from '../../../../chunks/astro/server_CHdT0zCU.mjs';
import 'kleur/colors';
import { $ as $$Layout, H as Header } from '../../../../chunks/Header_DfUnSFlX.mjs';
import { E as Episodes, C as CommentBox } from '../../../../chunks/Comments_c22m-UHV.mjs';
import { T as TopMovies } from '../../../../chunks/TodayMovies_CAEoqM_J.mjs';
import 'clsx';
import axios from 'axios';
export { renderers } from '../../../../renderers.mjs';

const $$Astro$3 = createAstro();
const $$EpisodeBreadcrumbs = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$EpisodeBreadcrumbs;
  const { slug, so_tap, tenPhimFormatted, ...rest } = Astro2.props;
  const soTapFormatted = so_tap ? so_tap.charAt(0).toUpperCase() + so_tap.slice(1) : "";
  return renderTemplate`${maybeRenderHead()}<nav class="w-fit max-w-full px-2 py-2 mt-4 sm:mt-20 lg:mt-4"${spreadAttributes(rest)}> <ol class="flex items-center space-x-2 text-[13px] text-gray-300"> <li class="flex items-center gap-2"> <a href="/" class="text-white hover:text-[#ffd785] font-medium text-xs lg:text-base"> <div class="flex items-center gap-2"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M2.52 7.823C2 8.77 2 9.915 2 12.203v1.522c0 3.9 0 5.851 1.172 7.063S6.229 22 10 22h4c3.771 0 5.657 0 6.828-1.212S22 17.626 22 13.725v-1.521c0-2.289 0-3.433-.52-4.381c-.518-.949-1.467-1.537-3.364-2.715l-2-1.241C14.111 2.622 13.108 2 12 2s-2.11.622-4.116 1.867l-2 1.241C3.987 6.286 3.038 6.874 2.519 7.823m6.927 7.575a.75.75 0 1 0-.894 1.204A5.77 5.77 0 0 0 12 17.75a5.77 5.77 0 0 0 3.447-1.148a.75.75 0 1 0-.894-1.204A4.27 4.27 0 0 1 12 16.25a4.27 4.27 0 0 1-2.553-.852" clip-rule="evenodd"></path></svg> <span>Trang chủ</span> </div> </a> <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24"> <path fill="currentColor" d="M10.02 6L8.61 7.41L13.19 12l-4.58 4.59L10.02 18l6-6z"></path> </svg> </li> <li class="flex items-center gap-2"> <h1 class="text-white hover:text-[#ffd785] truncate max-w-[150px] lg:max-w-[500px] text-xs lg:text-base font-medium"> <a${addAttribute(`/phim/${slug}`, "href")}>${tenPhimFormatted}</a> </h1> <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 24 24"> <path fill="currentColor" d="M10.02 6L8.61 7.41L13.19 12l-4.58 4.59L10.02 18l6-6z"></path> </svg> </li> <li class="font-medium text-gray text-xs lg:text-base">
Tập ${soTapFormatted} </li> </ol> </nav>`;
}, "D:/motchillhd.online/src/components/Astrocomponents/EpisodeBreadcrumbs.astro", void 0);

const bgImage = new Proxy({"src":"/_astro/tips-box.cnkcbmZF.png","width":360,"height":120,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/motchillhd.online/src/assets/tips-box.png";
							}
							
							return target[name];
						}
					});

const $$Astro$2 = createAstro();
const $$EpisodeServerSelector = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$EpisodeServerSelector;
  const {
    slug,
    so_tap,
    ngon_ngu,
    server,
    hasSv1Video,
    hasSv2Video,
    hasSv3Video,
    ...rest
  } = Astro2.props;
  const formatEpisodeNumber = (numStr) => {
    const num = parseInt(numStr, 10);
    return isNaN(num) ? numStr : num < 10 ? `0${num}` : numStr;
  };
  const formattedSoTap = !isNaN(parseInt(so_tap)) ? formatEpisodeNumber(so_tap) : so_tap;
  const episodeSegment = !isNaN(parseInt(so_tap)) ? `tap-${formattedSoTap}` : so_tap;
  return renderTemplate`${maybeRenderHead()}<div class="relative z-10 rounded-[6px] overflow-hidden shadow-md py-4"> <div class="absolute inset-0 -z-10 bg-cover bg-center"${addAttribute(`background-image: url('${bgImage.src}');`, "style")}></div> <div class="bg-gray/50 text-white text-center text-xs font-medium px-5 space-y-3"> <div class="flex items-center justify-center gap-4 flex-col"> <div class="flex flex-row gap-2"> ${hasSv1Video && renderTemplate`<a${addAttribute(`/xem-phim/${slug}/${episodeSegment}/${ngon_ngu}?server=sv1`, "href")}${addAttribute([
    "px-3 py-1 rounded-[4px] text-xs font-semibold transition-all duration-200",
    server === "sv1" ? "bg-[#ffd785] text-black shadow-md" : "bg-[#303033] hover:bg-[#404040] text-gray-300"
  ], "class:list")}${addAttribute(!hasSv1Video ? "true" : "false", "aria-disabled")}>
Server 1
</a>`} ${hasSv2Video && renderTemplate`<a${addAttribute(`/xem-phim/${slug}/${episodeSegment}/${ngon_ngu}?server=sv2`, "href")}${addAttribute([
    "px-3 py-1 rounded-[4px] text-xs font-semibold transition-all duration-200",
    server === "sv2" ? "bg-[#ffd785] text-black shadow-md" : "bg-[#434347] hover:bg-[#404040] text-gray-300"
  ], "class:list")}>
Server 2
</a>`} ${hasSv3Video && renderTemplate`<a${addAttribute(`/xem-phim/${slug}/${episodeSegment}/${ngon_ngu}?server=sv3`, "href")}${addAttribute([
    "px-3 py-1 rounded-[4px] text-xs font-semibold transition-all duration-200",
    server === "sv3" ? "bg-[#ffd785] text-black shadow-md" : "bg-[#434347] hover:bg-[#404040] text-gray-300"
  ], "class:list")}>
Server 3
</a>`} </div> <p class="text-xs lg:text-base">
🌟 Nếu bạn không xem được video, hãy thử tắt trình chặn quảng , đổi
        server hoặc tải lại trang
</p> </div> </div> </div>`;
}, "D:/motchillhd.online/src/components/Astrocomponents/EpisodeServerSelector.astro", void 0);

const $$Astro$1 = createAstro();
const $$MovieDetailPlayer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$MovieDetailPlayer;
  const { movie, chuyenURLSangProxy } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="flex w-full items-center justify-center gap-16 lg:items-start lg:justify-start"> <div class="flex flex-col space-y-6 lg:w-[50%]"> <div class="flex items-start flex-row gap-4"> <div class="mx-auto w-40 flex-shrink-0 lg:mx-0"> <div class="relative h-[15rem] lg:h-[12rem] w-[80%] rounded-lg shadow-[0_12px_48px_rgba(255,255,255,0.15)] transition-all duration-300 hover:shadow-[0_16px_64px_rgba(255,255,255,0.25)]"> <img${addAttribute(chuyenURLSangProxy(movie.poster_url), "src")}${addAttribute(`Poster phim ${movie.name}`, "alt")} class="absolute left-0 top-0 h-full w-full rounded-[6px] object-cover" loading="eager" fetchpriority="high"> <div class="pointer-events-none absolute bottom-0 left-0 h-[100%] w-full rounded-b-[6px]"${addAttribute({
    background: "linear-gradient(to top, rgba(30, 30, 30, 0.2), transparent)"
  }, "style")} aria-hidden="true"></div> </div> </div> <div class="flex w-full flex-1 flex-col items-center gap-1 lg:items-start"> <h2 class="text-center text-lg font-semibold leading-tight text-white lg:text-left lg:text-xl"> ${movie.name} </h2> ${movie.origin_name && renderTemplate`<p class="text-center text-sm font-normal text-[#ffd875] lg:text-left"> ${movie.origin_name} </p>`} <div class="mt-2 hidden flex-wrap items-center justify-center gap-2 font-semibold text-[#ECECEC] sm:flex text-[11px]"> <div class="flex items-center border border-yellow-300 lg:px-2 px-1 py-0.5 rounded-md"> <p class="text-[#f7d54d]">IMDb</p> <p class="pl-1"> ${movie.tmdb.vote_average === 0 ? 10 : movie.tmdb.vote_average.toFixed(1)} </p> </div> ${movie.quality && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <span class="bg-white px-1 py-0.5  rounded-md text-black font-bold"> ${movie.quality} </span> ` })}`} ${movie.year && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <span class="border border-white  px-1 py-0.5  rounded-md"> ${movie.year} </span> ` })}`} ${movie.time && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <span class="border border-white  px-1 py-0.5 rounded-md"> ${movie.time} </span> ` })}`} </div> <div class="py-2"> ${movie.episode_current && renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate` <span class="hidden lg:flex items-center justify-center gap-2 text-xs bg-[#ffd875]/5 py-2 px-3 rounded-full"> ${/hoàn tất|full/i.test(movie.episode_current) ? renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate` <svg class="h-4 w-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"> <path d="M5 13l4 4L19 7"></path> </svg> ${movie.episode_current}` })}` : renderTemplate`${renderComponent($$result2, "Fragment", Fragment, {}, { "default": ($$result3) => renderTemplate` <div class="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent text-yellow-400" aria-hidden="true"></div>
Đang chiếu: ${movie.episode_current}` })}`} </span> ` })}`} </div> ${movie.category?.length > 0 && renderTemplate`<div class="mt-2 hidden flex-wrap gap-2 lg:flex"> ${movie.category.map((genre) => renderTemplate`<a${addAttribute(`/the-loai/${genre.slug}`, "href")} class="rounded-[4px] bg-[#ffffff14] px-2 py-1 text-[11px] font-normal text-gray-200 transition-colors duration-200 hover:text-yellow-400"> ${genre.name} </a>`)} </div>`} </div> </div> </div> <div class="hidden lg:block lg:w-[50%] space-y-3"> ${movie.director && renderTemplate`<h2 class=" text-[14px] font-semibold text-white">
Đạo diễn:
<span class="ml-2 text-[13px] font-normal text-gray-400"> ${movie.director} </span> </h2>`} ${movie.actor && movie.actor.length > 0 && renderTemplate`<h2 class=" text-[14px] font-semibold text-white">
Diễn viên:
<span class="ml-2 text-[13px] font-normal text-gray-400"> ${movie.actor.join(", ")} </span> </h2>`} ${movie.content && renderTemplate`<div class=""> <h2 class="my-1 text-[14px] font-semibold text-white">
Nội dung phim:
</h2> <p class="line-clamp-4 text-[13px] leading-relaxed text-gray-400"> ${movie.content} </p> </div>`} </div> </div>`;
}, "D:/motchillhd.online/src/components/MovieDetail/MovieDetailPlayer.astro", void 0);

const BASE_URL = "https://pphim.id.vn";
const SKIP_AD_API_URL = `${BASE_URL}/api/skip_ad/link/`;
const PHIMAPI_BASE_URL = "https://phimapi.com";
const OPHIM1_BASE_URL = "https://ophim1.com";
const phimApiAxiosInstance = axios.create({
  baseURL: PHIMAPI_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Connection: "keep-alive"
  },
  maxRedirects: 3,
  validateStatus: (status) => status >= 200 && status < 300
});
const ophim1AxiosInstance = axios.create({
  baseURL: OPHIM1_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Connection: "keep-alive"
  },
  maxRedirects: 3,
  validateStatus: (status) => status >= 200 && status < 300
});
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5e3,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Connection: "keep-alive"
  },
  maxRedirects: 3,
  validateStatus: (status) => status >= 200 && status < 300
});
const cache = /* @__PURE__ */ new Map();
const CACHE_DURATION = 5 * 60 * 1e3;
const getCacheKey = (url, instance) => `${instance.defaults.baseURL}${url}`;
const isCacheValid = (timestamp) => {
  return Date.now() - timestamp < CACHE_DURATION;
};
const fetchJson = async (url, instance = axiosInstance) => {
  const cacheKey = getCacheKey(url, instance);
  const cached = cache.get(cacheKey);
  if (cached && isCacheValid(cached.timestamp)) {
    return cached.data;
  }
  try {
    const response = await instance.get(url);
    const data = response.data;
    cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
    return data;
  } catch (error) {
    if (error.response) {
      console.error(
        `API Error: ${instance.defaults.baseURL}${url} (${error.response.status})`
      );
      throw new Error(`API Error: ${error.response.status}`);
    } else if (error.request) {
      console.error(`Network Error: ${instance.defaults.baseURL}${url}`);
      throw new Error(`Network Error`);
    } else {
      console.error(`Unknown Error: ${error.message}`);
      throw new Error(`Unknown Error: ${error.message}`);
    }
  }
};
const fetchPhimApiEpisode = async (slug, so_tap, ngon_ngu) => {
  try {
    const movieDetail = await fetchJson(`/phim/${slug}`, phimApiAxiosInstance);
    const { movie, episodes } = movieDetail || {};
    if (!movie || !episodes) {
      return { link_video: null, actual_ngon_ngu_type: null };
    }
    const targetEpisodeIdentifier = so_tap === "full" ? "full" : String(parseInt(so_tap, 10));
    const targetEpisodePadded = targetEpisodeIdentifier.padStart(2, "0");
    const findServerData = (searchTerms) => {
      return episodes.find((episodeServer) => {
        const serverNameLower = episodeServer.server_name.toLowerCase();
        return searchTerms.some((term) => serverNameLower.includes(term));
      })?.server_data || [];
    };
    let targetServerData = [];
    let typeFound = null;
    if (ngon_ngu === "vietsub") {
      targetServerData = findServerData(["vietsub"]);
      typeFound = "vietsub";
    } else if (ngon_ngu === "thuyetminh") {
      targetServerData = findServerData(["thuyết minh"]);
      typeFound = "thuyetminh";
      if (targetServerData.length === 0) {
        targetServerData = findServerData(["lồng tiếng"]);
        typeFound = "longtieng";
      }
    } else if (ngon_ngu === "longtieng") {
      targetServerData = findServerData(["lồng tiếng"]);
      typeFound = "longtieng";
    }
    if (targetServerData.length === 0) {
      return { link_video: null, actual_ngon_ngu_type: null };
    }
    const foundEpisode = targetServerData.find((item) => {
      const itemNameLower = String(item.name).toLowerCase();
      const itemSlugLower = String(item.slug).toLowerCase();
      return itemNameLower === `tập ${targetEpisodeIdentifier}` || itemNameLower === `tập ${targetEpisodePadded}` || itemSlugLower === `tap-${targetEpisodeIdentifier}` || itemSlugLower === `tap-${targetEpisodePadded}` || itemNameLower === targetEpisodeIdentifier;
    });
    if (!foundEpisode) {
      return { link_video: null, actual_ngon_ngu_type: null };
    }
    return {
      link_video: foundEpisode.link_m3u8 || foundEpisode.link_embed,
      actual_ngon_ngu_type: typeFound
    };
  } catch (error) {
    console.error(
      `Error fetching phimapi episode ${slug}-${so_tap}-${ngon_ngu}:`,
      error
    );
    return { link_video: null, actual_ngon_ngu_type: null };
  }
};
const fetchOphim1EpisodeEmbed = async (slug, so_tap, ngon_ngu) => {
  try {
    const movieDetail = await fetchJson(`/phim/${slug}`, ophim1AxiosInstance);
    const { movie, episodes } = movieDetail || {};
    if (!movie || !episodes) {
      return { link_video: null, actual_ngon_ngu_type: null };
    }
    const targetEpisodeIdentifier = so_tap === "full" ? "full" : String(parseInt(so_tap, 10));
    const targetEpisodePadded = targetEpisodeIdentifier.padStart(2, "0");
    const findServerData = (searchTerms) => {
      return episodes.find((episodeServer) => {
        const serverNameLower = episodeServer.server_name.toLowerCase();
        return searchTerms.some((term) => serverNameLower.includes(term));
      })?.server_data || [];
    };
    let targetServerData = [];
    let typeFound = null;
    if (ngon_ngu === "vietsub") {
      targetServerData = findServerData(["vietsub"]);
      typeFound = "vietsub";
    } else if (ngon_ngu === "thuyetminh") {
      targetServerData = findServerData(["thuyết minh"]);
      typeFound = "thuyetminh";
      if (targetServerData.length === 0) {
        targetServerData = findServerData(["lồng tiếng"]);
        typeFound = "longtieng";
      }
    } else if (ngon_ngu === "longtieng") {
      targetServerData = findServerData(["lồng tiếng"]);
      typeFound = "longtieng";
    }
    if (targetServerData.length === 0) {
      return { link_video: null, actual_ngon_ngu_type: null };
    }
    const foundEpisode = targetServerData.find((item) => {
      const itemNameLower = String(item.name).toLowerCase();
      const itemSlugLower = String(item.slug).toLowerCase();
      return itemNameLower === `tập ${targetEpisodeIdentifier}` || itemNameLower === `tập ${targetEpisodePadded}` || itemSlugLower === `tap-${targetEpisodeIdentifier}` || itemSlugLower === `tap-${targetEpisodePadded}` || itemNameLower === targetEpisodeIdentifier;
    });
    if (!foundEpisode) {
      return { link_video: null, actual_ngon_ngu_type: null };
    }
    return {
      link_video: foundEpisode.link_m3u8 || foundEpisode.link_embed,
      actual_ngon_ngu_type: typeFound
    };
  } catch (error) {
    return { link_video: null, actual_ngon_ngu_type: null };
  }
};
const fetchNguoncEpisodeEmbed = async (movieSlug, episodeNum, lang) => {
  const NGUONC_API_BASE = "https://phim.nguonc.com/api/film";
  const movieDetailUrl = `${NGUONC_API_BASE}/${movieSlug}`;
  try {
    const cacheKey = `nguonc_${movieSlug}`;
    const cached = cache.get(cacheKey);
    let data;
    if (cached && isCacheValid(cached.timestamp)) {
      data = cached.data;
    } else {
      const response = await axios.get(movieDetailUrl, { timeout: 5e3 });
      data = response.data;
      cache.set(cacheKey, {
        data,
        timestamp: Date.now()
      });
    }
    if (data.status !== "success" || !data.movie) {
      return { link_video: null, actual_ngon_ngu_type: null };
    }
    const movie = data.movie;
    const targetEpisodeName = String(episodeNum);
    const findServerItems = (searchTerms) => {
      return movie.episodes.find((episodeServer) => {
        const serverNameLower = episodeServer.server_name.toLowerCase();
        return searchTerms.some((term) => serverNameLower.includes(term));
      })?.items || [];
    };
    let targetServerDataItems = [];
    let typeFound = null;
    if (lang === "vietsub") {
      targetServerDataItems = findServerItems(["vietsub"]);
      typeFound = "vietsub";
    } else if (lang === "thuyetminh") {
      targetServerDataItems = findServerItems(["thuyết minh"]);
      typeFound = "thuyetminh";
      if (targetServerDataItems.length === 0) {
        targetServerDataItems = findServerItems(["lồng tiếng"]);
        typeFound = "longtieng";
      }
    } else if (lang === "longtieng") {
      targetServerDataItems = findServerItems(["lồng tiếng"]);
      typeFound = "longtieng";
    }
    if (targetServerDataItems.length === 0) {
      return { link_video: null, actual_ngon_ngu_type: null };
    }
    const foundEpisode = targetServerDataItems.find(
      (item) => String(item.name) === targetEpisodeName || String(item.slug).endsWith(`-${targetEpisodeName}`)
    );
    if (!foundEpisode) {
      return { link_video: null, actual_ngon_ngu_type: null };
    }
    return {
      link_video: foundEpisode.embed,
      actual_ngon_ngu_type: typeFound
    };
  } catch (error) {
    console.error("Error fetching Nguonc data:", error);
    return { link_video: null, actual_ngon_ngu_type: null };
  }
};
const fetchAllMovieData = async (slug) => {
  try {
    const [phimApiResult, homeDataResult] = await Promise.allSettled([
      fetchJson(`/phim/${slug}`, phimApiAxiosInstance),
      fetchHomeData()
      // assuming fetchHomeData is independent of movie slug
    ]);
    let movieDetailFromPhimApi = {};
    let vietsubEpisodes = [];
    let thuyetminhEpisodes = [];
    let longtiengEpisodes = [];
    let topData = [];
    let totalEpisodes = 0;
    if (phimApiResult.status === "fulfilled") {
      const phimApiResponse = phimApiResult.value;
      movieDetailFromPhimApi = phimApiResponse.movie || {};
      totalEpisodes = movieDetailFromPhimApi.total_episodes || 0;
      if (phimApiResponse?.episodes && Array.isArray(phimApiResponse.episodes)) {
        const episodeMap = /* @__PURE__ */ new Map();
        phimApiResponse.episodes.forEach((server) => {
          const serverNameLower = server.server_name?.toLowerCase();
          if (serverNameLower?.includes("vietsub") && Array.isArray(server.server_data)) {
            episodeMap.set("vietsub", server.server_data);
          } else if (serverNameLower?.includes("thuyết minh") && Array.isArray(server.server_data)) {
            episodeMap.set("thuyetminh", server.server_data);
          } else if (serverNameLower?.includes("lồng tiếng") && Array.isArray(server.server_data)) {
            episodeMap.set("longtieng", server.server_data);
          }
        });
        vietsubEpisodes = episodeMap.get("vietsub") || [];
        thuyetminhEpisodes = episodeMap.get("thuyetminh") || [];
        longtiengEpisodes = episodeMap.get("longtieng") || [];
      }
    }
    if (homeDataResult.status === "fulfilled") {
      topData = homeDataResult.value.topData || [];
    }
    return {
      movieData: movieDetailFromPhimApi,
      // This is the single source of movie metadata
      vietsubEpisodes,
      thuyetminhEpisodes,
      longtiengEpisodes,
      topData,
      total_episodes: totalEpisodes
    };
  } catch (error) {
    console.error(`Error fetching all movie data for ${slug}:`, error);
    return {
      movieData: {},
      // Ensure this is always returned even on error
      vietsubEpisodes: [],
      thuyetminhEpisodes: [],
      longtiengEpisodes: [],
      topData: [],
      total_episodes: 0
    };
  }
};
const fetchHomeData = async () => {
  try {
    const topResponse = await fetchJson(
      `/v1/api/danh-sach/phim-bo?page=1&sort_field=view&limit=7`,
      phimApiAxiosInstance
    );
    return {
      topData: topResponse.data?.items || []
    };
  } catch (error) {
    console.error("Error fetching home data:", error);
    return { topData: [] };
  }
};
const capitalizeWords = (str) => str ? str.split(" ").map(
  (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
).join(" ") : "";
const CANONICAL_APP_BASE_URL = "https://phimmoii.top";
const generateSeoData = (tenPhim, so_tap, ngon_ngu, canonicalUrl, thumbnail, slug, tenKhac) => {
  const finalThumbnail = thumbnail || `${CANONICAL_APP_BASE_URL}/default-thumbnail.jpg`;
  const tenPhimFormatted = capitalizeWords(tenPhim || "");
  const ngonNguLabel = ngon_ngu === "vietsub" ? "Vietsub" : ngon_ngu === "thuyetminh" ? "Thuyết Minh" : ngon_ngu === "longtieng" ? "Lồng Tiếng" : capitalizeWords(ngon_ngu || "");
  capitalizeWords(tenKhac || "");
  const so_tapFormatted = capitalizeWords(so_tap || "");
  const titleTag = `Xem Phim ${tenPhimFormatted} Tập ${so_tapFormatted} ${ngonNguLabel} HD - Phimmoi`;
  const seoDescription = `Xem ${tenPhimFormatted} - Tập ${so_tapFormatted} (${ngonNguLabel}) chất lượng cao. Thưởng thức phim nhanh, không quảng cáo, hỗ trợ đa nền tảng tại Phimmoi.`;
  const episodeJsonLd = {
    "@context": "https://schema.org",
    "@type": "Episode",
    name: `${tenPhimFormatted} - Tập ${so_tap} (${ngonNguLabel})`,
    episodeNumber: parseInt(so_tap) || 1,
    partOfSeries: {
      "@type": "TVSeries",
      name: tenPhimFormatted,
      url: `${CANONICAL_APP_BASE_URL}/phim/${slug}`
    },
    url: canonicalUrl,
    image: finalThumbnail,
    description: seoDescription,
    uploadDate: (/* @__PURE__ */ new Date()).toISOString(),
    duration: "PT20M",
    publisher: {
      "@type": "Organization",
      name: "Motphim",
      logo: {
        "@type": "ImageObject",
        url: `${CANONICAL_APP_BASE_URL}/logo.png`
      }
    },
    potentialAction: {
      "@type": "WatchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: canonicalUrl,
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      }
    }
  };
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Trang chủ",
        item: `${CANONICAL_APP_BASE_URL}/`
      },
      {
        "@type": "ListItem",
        position: 2,
        name: tenPhimFormatted,
        item: `${CANONICAL_APP_BASE_URL}/phim/${slug}`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `Tập ${so_tap} ${ngonNguLabel}`,
        item: canonicalUrl
      }
    ]
  };
  return {
    tenPhimFormatted,
    titleTag,
    seoDescription,
    episodeJsonLd,
    breadcrumbJsonLd
  };
};
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of cache.entries()) {
    if (now - value.timestamp > CACHE_DURATION) {
      cache.delete(key);
    }
  }
}, CACHE_DURATION);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro();
const prerender = false;
const $$ngonNgu = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ngonNgu;
  const { slug, tap_slug, ngon_ngu = "vietsub" } = Astro2.params;
  let so_tap = null;
  if (tap_slug === "full") {
    so_tap = "full";
  } else if (tap_slug?.startsWith("tap-")) {
    const numberPart = tap_slug.split("-")[1];
    so_tap = numberPart ? String(parseInt(numberPart, 10)) : void 0;
  }
  const episodeCommentIdentifier = `tap_phim/${slug}/${tap_slug}`;
  const server = Astro2.url.searchParams.get("server") || "sv1";
  const currentUrl = Astro2.url.href;
  let originalVideoUrl = null;
  let finalServer = server;
  let finalNgonNgu = ngon_ngu;
  let hasSv1VideoForRequestedLang = false;
  let hasSv2VideoForRequestedLang = false;
  let hasSv3VideoForRequestedLang = false;
  const {
    movieData: primaryMovieInfo,
    // Renamed for clarity: this is our consistent movie info
    vietsubEpisodes,
    thuyetminhEpisodes,
    longtiengEpisodes,
    topData,
    total_episodes
  } = await fetchAllMovieData(slug);
  if (!primaryMovieInfo || Object.keys(primaryMovieInfo).length === 0) {
    console.error(`No movie data found for slug: ${slug}`);
    return Astro2.redirect("/404");
  }
  try {
    let fetchedEpisodeLinkData = null;
    if (server === "sv1") {
      fetchedEpisodeLinkData = await fetchPhimApiEpisode(slug, so_tap, ngon_ngu);
    } else if (server === "sv2") {
      fetchedEpisodeLinkData = await fetchOphim1EpisodeEmbed(
        slug,
        so_tap,
        ngon_ngu
      );
    } else if (server === "sv3") {
      fetchedEpisodeLinkData = await fetchNguoncEpisodeEmbed(
        slug,
        so_tap,
        ngon_ngu
      );
    }
    if (fetchedEpisodeLinkData?.link_video) {
      originalVideoUrl = fetchedEpisodeLinkData.link_video;
      finalServer = server;
      finalNgonNgu = fetchedEpisodeLinkData.actual_ngon_ngu_type || ngon_ngu;
    } else {
      const allServers = ["sv1", "sv2", "sv3"];
      const allLanguages = ["vietsub", "thuyetminh", "longtieng"];
      let fallbackFound = false;
      for (const fbServer of allServers.filter((s) => s !== server)) {
        let fallbackData = null;
        if (fbServer === "sv1") {
          fallbackData = await fetchPhimApiEpisode(slug, so_tap, ngon_ngu);
        } else if (fbServer === "sv2") {
          fallbackData = await fetchOphim1EpisodeEmbed(slug, so_tap, ngon_ngu);
        } else if (fbServer === "sv3") {
          fallbackData = await fetchNguoncEpisodeEmbed(slug, so_tap, ngon_ngu);
        }
        if (fallbackData?.link_video) {
          originalVideoUrl = fallbackData.link_video;
          finalServer = fbServer;
          finalNgonNgu = fallbackData.actual_ngon_ngu_type || ngon_ngu;
          fallbackFound = true;
          break;
        }
      }
      if (!fallbackFound) {
        for (const fbServer of allServers) {
          for (const fbLang of allLanguages.filter((l) => l !== ngon_ngu)) {
            let fallbackData = null;
            if (fbServer === "sv1") {
              fallbackData = await fetchPhimApiEpisode(slug, so_tap, fbLang);
            } else if (fbServer === "sv2") {
              fallbackData = await fetchOphim1EpisodeEmbed(slug, so_tap, fbLang);
            } else if (fbServer === "sv3") {
              fallbackData = await fetchNguoncEpisodeEmbed(slug, so_tap, fbLang);
            }
            if (fallbackData?.link_video) {
              originalVideoUrl = fallbackData.link_video;
              finalServer = fbServer;
              finalNgonNgu = fallbackData.actual_ngon_ngu_type || fbLang;
              fallbackFound = true;
              break;
            }
          }
          if (fallbackFound) break;
        }
      }
    }
    const checkServerHasSpecificLangVideo = async (checkServer, checkLang) => {
      let result = null;
      try {
        if (checkServer === "sv1") {
          result = await fetchPhimApiEpisode(slug, so_tap, checkLang);
        } else if (checkServer === "sv2") {
          result = await fetchOphim1EpisodeEmbed(slug, so_tap, checkLang);
        } else if (checkServer === "sv3") {
          result = await fetchNguoncEpisodeEmbed(slug, so_tap, checkLang);
        }
        return result?.link_video && (result?.actual_ngon_ngu_type === checkLang || result?.actual_ngon_ngu_type === "full");
      } catch (e) {
        console.error(
          `Error checking availability for ${checkServer} with ${checkLang}:`,
          e.message
        );
        return false;
      }
    };
    [
      hasSv1VideoForRequestedLang,
      hasSv2VideoForRequestedLang,
      hasSv3VideoForRequestedLang
    ] = await Promise.all([
      checkServerHasSpecificLangVideo("sv1", ngon_ngu),
      checkServerHasSpecificLangVideo("sv2", ngon_ngu),
      checkServerHasSpecificLangVideo("sv3", ngon_ngu)
    ]);
    if (!originalVideoUrl) {
      return Astro2.redirect("/404");
    }
  } catch (error) {
    console.error("\u0110\xE3 x\u1EA3y ra l\u1ED7i khi t\u1EA3i d\u1EEF li\u1EC7u phim ho\u1EB7c t\u1EADp phim:", error);
    return Astro2.redirect("/404");
  }
  const tenPhim = primaryMovieInfo.name;
  const tenKhac = primaryMovieInfo.origin_name;
  const rawThumbnail = primaryMovieInfo.thumb_url;
  function chuyenURLSangProxy(url) {
    if (!url) return "";
    const originalPrefix = "https://phimimg.com/upload/";
    const imageKitPrefix = "https://ik.imagekit.io/17mpki7mv/motchill/upload/";
    if (url.startsWith(originalPrefix)) {
      const path = url.slice(originalPrefix.length);
      return `${imageKitPrefix}${path}?tr=f-webp,fo-auto,q-85`;
    } else {
      return url;
    }
  }
  function chuyenURLSangProxy1(url) {
    if (!url) return "";
    const originalPrefix = "https://phimimg.com/upload/";
    const imageKitPrefix = "https://ik.imagekit.io/17mpki7mv/motchill/upload/";
    if (url.startsWith(originalPrefix)) {
      const path = url.slice(originalPrefix.length);
      return `${imageKitPrefix}${path}?tr=f-webp,w-800,h-450,fo-auto,q-85`;
    } else {
      return url;
    }
  }
  const thumbnail = chuyenURLSangProxy(rawThumbnail);
  const currentEpisodeSlugParam = tap_slug;
  const currentType = finalNgonNgu;
  const {
    tenPhimFormatted,
    titleTag,
    seoDescription,
    episodeJsonLd,
    breadcrumbJsonLd
  } = generateSeoData(
    tenPhim,
    so_tap,
    currentType,
    // Pass currentType (actual language found)
    currentUrl,
    thumbnail,
    slug,
    tenKhac
  );
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$Layout, {}, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="bg-[#191B24]"> ${renderComponent($$result2, "Header", Header, { "client:idle": true, "client:component-hydration": "idle", "client:component-path": "D:/motchillhd.online/src/components/Header", "client:component-export": "default" })} <main class="lg:max-w-screen-xl lg:mx-auto flex flex-col gap-2 lg:gap-8"> <section class="w-full flex flex-col lg:py-16"> <div class="flex flex-col lg:flex-row gap-2 lg:gap-10 lg:px-8 px-0"> <div class="w-full lg:flex-[7] flex flex-col gap-4"> <div class="flex flex-col lg:flex-row justify-between px-4 lg:px-0"> ${renderComponent($$result2, "EpisodeHeader", $$EpisodeBreadcrumbs, { "slug": slug, "so_tap": so_tap, "tenPhimFormatted": tenPhimFormatted, "class": "w-fit max-w-full" })} </div> <div class="px-0"> ${renderComponent($$result2, "VideoPlayer", null, { "client:only": true, "originalUrl": originalVideoUrl, "skipAdApiUrl": SKIP_AD_API_URL, "slug": slug, "ngonngu": finalNgonNgu, "sotap": so_tap, "ten_phim": tenPhimFormatted, "activeServer": finalServer, "vietsubEpisodes": vietsubEpisodes, "thuyetminhEpisodes": thuyetminhEpisodes, "longtiengEpisodes": longtiengEpisodes, "movieThumbnail": thumbnail, "client:component-hydration": "only", "client:component-path": "D:/motchillhd.online/src/components/VideoPlayer", "client:component-export": "default" })} </div> <div class="flex items-center justify-center"> ${renderComponent($$result2, "EpisodeServerSelector", $$EpisodeServerSelector, { "slug": slug, "so_tap": so_tap, "ngon_ngu": ngon_ngu, "server": finalServer, "hasSv1Video": hasSv1VideoForRequestedLang, "hasSv2Video": hasSv2VideoForRequestedLang, "hasSv3Video": hasSv3VideoForRequestedLang })} </div> <div class="hidden lg:block py-6"> ${renderComponent($$result2, "MovieDetailStaticInfo", $$MovieDetailPlayer, { "movie": primaryMovieInfo, "chuyenURLSangProxy": chuyenURLSangProxy, "chuyenURLSangProxy1": chuyenURLSangProxy1 })} </div> <div class="flex flex-col lg:flex-row w-full lg:px-0 px-4 gap-8"> <div class="w-full lg:w-[70%] flex flex-col gap-4"> ${renderComponent($$result2, "Episodes", Episodes, { "client:load": true, "vietsub": vietsubEpisodes, "thuyetminh": thuyetminhEpisodes, "longtieng": longtiengEpisodes, "slug": slug, "movieTitle": tenPhimFormatted, "currentEpisodeSlug": currentEpisodeSlugParam, "currentType": finalNgonNgu, "totalEpisodes": total_episodes, "client:component-hydration": "load", "client:component-path": "D:/motchillhd.online/src/components/Episode", "client:component-export": "default" })} <div class="py-4 flex justify-center"> <div class="w-[80%] h-[4px] bg-white rounded-xs"></div> </div> ${renderComponent($$result2, "CommentBox", CommentBox, { "commentIdentifier": episodeCommentIdentifier, "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/motchillhd.online/src/components/Comment/Comments", "client:component-export": "default" })} </div> <div class="hidden lg:flex justify-center items-stretch"> <div class="w-[1px] bg-white/20"></div> </div> <div class="w-full lg:w-[30%] py-0 lg:py-4"> ${renderComponent($$result2, "TopMovies", TopMovies, { "movies": topData ?? [] })} </div> </div> </div> </div> </section> </main> </div> `, "head": async ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "head" }, { "default": async ($$result3) => renderTemplate(_a || (_a = __template([" <title>", '</title> <meta name="description"', '> <meta name="keywords"', '> <meta name="robots" content="index, follow"> <link rel="canonical"', '> <link rel="icon" href="/favicon.ico"> <meta property="og:type" content="video.episode"> <meta property="og:title"', '> <meta property="og:description"', '> <meta property="og:image"', '> <meta property="og:url"', '> <meta property="og:locale" content="vi_VN"> <meta property="og:site_name" content="MotChill"> <meta name="twitter:card" content="summary_large_image"> <meta name="twitter:title"', '> <meta name="twitter:description"', '> <meta name="twitter:image"', '> <script type="application/ld+json">', '<\/script> <script type="application/ld+json">', "<\/script> "])), titleTag, addAttribute(seoDescription, "content"), addAttribute(`Phim ${tenPhimFormatted} t\u1EADp ${so_tap}, ${tenKhac}, ${tenKhac} t\u1EADp ${so_tap}, ${tenPhim}, phim ${tenPhim}, phim ${tenKhac},phim ${tenKhac} Vietsub HD, Motchill`, "content"), addAttribute(currentUrl, "href"), addAttribute(titleTag, "content"), addAttribute(seoDescription, "content"), addAttribute(thumbnail, "content"), addAttribute(currentUrl, "content"), addAttribute(titleTag, "content"), addAttribute(seoDescription, "content"), addAttribute(thumbnail, "content"), unescapeHTML(JSON.stringify(episodeJsonLd)), unescapeHTML(JSON.stringify(breadcrumbJsonLd))) })}` })}`;
}, "D:/motchillhd.online/src/pages/xem-phim/[slug]/[tap_slug]/[ngon_ngu].astro", void 0);

const $$file = "D:/motchillhd.online/src/pages/xem-phim/[slug]/[tap_slug]/[ngon_ngu].astro";
const $$url = "/xem-phim/[slug]/[tap_slug]/[ngon_ngu]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ngonNgu,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
