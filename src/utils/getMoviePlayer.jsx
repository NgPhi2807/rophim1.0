// src/utils/getMoviePlayer.js (or .ts)

import axios from "axios";

const BASE_URL = import.meta.env.PUBLIC_API_SKIP_URL;
export const SKIP_AD_API_URL = `${BASE_URL}/api/skip_ad/link/`;
const PHIMAPI_BASE_URL = "https://phimapi.com";
const OPHIM1_BASE_URL = "https://ophim1.com";

const phimApiAxiosInstance = axios.create({
  baseURL: PHIMAPI_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Connection: "keep-alive",
  },
  maxRedirects: 3,
  validateStatus: (status) => status >= 200 && status < 300,
});

const ophim1AxiosInstance = axios.create({
  baseURL: OPHIM1_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Connection: "keep-alive",
  },
  maxRedirects: 3,
  validateStatus: (status) => status >= 200 && status < 300,
});

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    Connection: "keep-alive",
  },
  maxRedirects: 3,
  validateStatus: (status) => status >= 200 && status < 300,
});

const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000;

const getCacheKey = (url, instance) => `${instance.defaults.baseURL}${url}`;

const isCacheValid = (timestamp) => {
  return Date.now() - timestamp < CACHE_DURATION;
};

export const fetchJson = async (url, instance = axiosInstance) => {
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
      timestamp: Date.now(),
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

// ** Modified fetchPhimApiEpisode to NOT return movie_data.
// It will only return the link_video and actual_ngon_ngu_type**
export const fetchPhimApiEpisode = async (slug, so_tap, ngon_ngu) => {
  try {
    const movieDetail = await fetchJson(`/phim/${slug}`, phimApiAxiosInstance);
    const { movie, episodes } = movieDetail || {};

    if (!movie || !episodes) {
      return { link_video: null, actual_ngon_ngu_type: null };
    }

    const targetEpisodeIdentifier =
      so_tap === "full" ? "full" : String(parseInt(so_tap, 10));
    const targetEpisodePadded = targetEpisodeIdentifier.padStart(2, "0");

    const findServerData = (searchTerms) => {
      return (
        episodes.find((episodeServer) => {
          const serverNameLower = episodeServer.server_name.toLowerCase();
          return searchTerms.some((term) => serverNameLower.includes(term));
        })?.server_data || []
      );
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

      return (
        itemNameLower === `tập ${targetEpisodeIdentifier}` ||
        itemNameLower === `tập ${targetEpisodePadded}` ||
        itemSlugLower === `tap-${targetEpisodeIdentifier}` ||
        itemSlugLower === `tap-${targetEpisodePadded}` ||
        itemNameLower === targetEpisodeIdentifier
      );
    });

    if (!foundEpisode) {
      return { link_video: null, actual_ngon_ngu_type: null };
    }

    return {
      link_video: foundEpisode.link_m3u8 || foundEpisode.link_embed,
      actual_ngon_ngu_type: typeFound,
    };
  } catch (error) {
    console.error(
      `Error fetching phimapi episode ${slug}-${so_tap}-${ngon_ngu}:`,
      error
    );
    return { link_video: null, actual_ngon_ngu_type: null };
  }
};

// ** Modified fetchOphim1EpisodeEmbed to NOT return movie_data.
// It will only return the link_video and actual_ngon_ngu_type**
export const fetchOphim1EpisodeEmbed = async (slug, so_tap, ngon_ngu) => {
  try {
    const movieDetail = await fetchJson(`/phim/${slug}`, ophim1AxiosInstance);
    const { movie, episodes } = movieDetail || {};

    if (!movie || !episodes) {
      return { link_video: null, actual_ngon_ngu_type: null };
    }

    const targetEpisodeIdentifier =
      so_tap === "full" ? "full" : String(parseInt(so_tap, 10));
    const targetEpisodePadded = targetEpisodeIdentifier.padStart(2, "0");

    const findServerData = (searchTerms) => {
      return (
        episodes.find((episodeServer) => {
          const serverNameLower = episodeServer.server_name.toLowerCase();
          return searchTerms.some((term) => serverNameLower.includes(term));
        })?.server_data || []
      );
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

      return (
        itemNameLower === `tập ${targetEpisodeIdentifier}` ||
        itemNameLower === `tập ${targetEpisodePadded}` ||
        itemSlugLower === `tap-${targetEpisodeIdentifier}` ||
        itemSlugLower === `tap-${targetEpisodePadded}` ||
        itemNameLower === targetEpisodeIdentifier
      );
    });

    if (!foundEpisode) {
      return { link_video: null, actual_ngon_ngu_type: null };
    }

    return {
      link_video: foundEpisode.link_m3u8 || foundEpisode.link_embed,
      actual_ngon_ngu_type: typeFound,
    };
  } catch (error) {
    return { link_video: null, actual_ngon_ngu_type: null };
  }
};

// ** Modified fetchNguoncEpisodeEmbed to NOT return movie_data.
// It will only return the link_video and actual_ngon_ngu_type**
export const fetchNguoncEpisodeEmbed = async (movieSlug, episodeNum, lang) => {
  const NGUONC_API_BASE = "https://phim.nguonc.com/api/film";
  const movieDetailUrl = `${NGUONC_API_BASE}/${movieSlug}`;

  try {
    const cacheKey = `nguonc_${movieSlug}`;
    const cached = cache.get(cacheKey);

    let data;
    if (cached && isCacheValid(cached.timestamp)) {
      data = cached.data;
    } else {
      const response = await axios.get(movieDetailUrl, { timeout: 5000 });
      data = response.data;

      cache.set(cacheKey, {
        data,
        timestamp: Date.now(),
      });
    }

    if (data.status !== "success" || !data.movie) {
      return { link_video: null, actual_ngon_ngu_type: null };
    }

    const movie = data.movie;
    const targetEpisodeName = String(episodeNum);

    const findServerItems = (searchTerms) => {
      return (
        movie.episodes.find((episodeServer) => {
          const serverNameLower = episodeServer.server_name.toLowerCase();
          return searchTerms.some((term) => serverNameLower.includes(term));
        })?.items || []
      );
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
      (item) =>
        String(item.name) === targetEpisodeName ||
        String(item.slug).endsWith(`-${targetEpisodeName}`)
    );

    if (!foundEpisode) {
      return { link_video: null, actual_ngon_ngu_type: null };
    }

    return {
      link_video: foundEpisode.embed,
      actual_ngon_ngu_type: typeFound,
    };
  } catch (error) {
    console.error("Error fetching Nguonc data:", error);
    return { link_video: null, actual_ngon_ngu_type: null };
  }
};

// ** fetchAllMovieData remains largely the same, but it's now the primary source for movie info. **
export const fetchAllMovieData = async (slug) => {
  try {
    const [phimApiResult, homeDataResult] = await Promise.allSettled([
      fetchJson(`/phim/${slug}`, phimApiAxiosInstance),
      fetchHomeData(), // assuming fetchHomeData is independent of movie slug
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

      if (
        phimApiResponse?.episodes &&
        Array.isArray(phimApiResponse.episodes)
      ) {
        const episodeMap = new Map();

        phimApiResponse.episodes.forEach((server) => {
          const serverNameLower = server.server_name?.toLowerCase();
          if (
            serverNameLower?.includes("vietsub") &&
            Array.isArray(server.server_data)
          ) {
            episodeMap.set("vietsub", server.server_data);
          } else if (
            serverNameLower?.includes("thuyết minh") &&
            Array.isArray(server.server_data)
          ) {
            episodeMap.set("thuyetminh", server.server_data);
          } else if (
            serverNameLower?.includes("lồng tiếng") &&
            Array.isArray(server.server_data)
          ) {
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

    // Return the consolidated movie data from PhimAPI and episode lists
    return {
      movieData: movieDetailFromPhimApi, // This is the single source of movie metadata
      vietsubEpisodes,
      thuyetminhEpisodes,
      longtiengEpisodes,
      topData,
      total_episodes: totalEpisodes,
    };
  } catch (error) {
    console.error(`Error fetching all movie data for ${slug}:`, error);
    return {
      movieData: {}, // Ensure this is always returned even on error
      vietsubEpisodes: [],
      thuyetminhEpisodes: [],
      longtiengEpisodes: [],
      topData: [],
      total_episodes: 0,
    };
  }
};

export const fetchMovieData = async (slug) => {
  try {
    const response = await fetchJson(`/phim/${slug}`, phimApiAxiosInstance);
    return { movieInfoFromBase: response?.movie || {} };
  } catch (error) {
    console.error(`Error fetching movie data for ${slug}:`, error);
    return { movieInfoFromBase: {} };
  }
};

export const fetchHomeData = async () => {
  try {
    const topResponse = await fetchJson(
      `/v1/api/danh-sach/phim-bo?page=1&sort_field=view&limit=7`,
      phimApiAxiosInstance
    );

    return {
      topData: topResponse.data?.items || [],
    };
  } catch (error) {
    console.error("Error fetching home data:", error);
    return { topData: [] };
  }
};

export const capitalizeWords = (str) =>
  str
    ? str
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ")
    : "";

const CANONICAL_APP_BASE_URL = "https://motphims.live";

export const generateSeoData = (
  tenPhim,
  so_tap,
  ngon_ngu,
  canonicalUrl,
  thumbnail,
  slug,
  tenKhac
) => {
  const finalThumbnail =
    thumbnail || `${CANONICAL_APP_BASE_URL}/default-thumbnail.jpg`;
  const tenPhimFormatted = capitalizeWords(tenPhim || "");
  const ngonNguLabel =
    ngon_ngu === "vietsub"
      ? "Vietsub"
      : ngon_ngu === "thuyetminh"
      ? "Thuyết Minh"
      : ngon_ngu === "longtieng"
      ? "Lồng Tiếng"
      : capitalizeWords(ngon_ngu || "");

  const tenKhacFormatted = capitalizeWords(tenKhac || "");
  const tenKhacPart =
    tenKhacFormatted && tenKhacFormatted !== tenPhimFormatted
      ? ` - ${tenKhacFormatted}`
      : "";
  const so_tapFormatted = capitalizeWords(so_tap || "");

  const titleTag = `Xem Phim ${tenPhimFormatted} Tập ${so_tapFormatted} ${ngonNguLabel} HD - Motphim`;
  const seoDescription = `Xem ${tenPhimFormatted} - Tập ${so_tapFormatted} (${ngonNguLabel}) chất lượng cao. Thưởng thức phim nhanh, không quảng cáo, hỗ trợ đa nền tảng tại Motphim.`;

  const episodeJsonLd = {
    "@context": "https://schema.org",
    "@type": "Episode",
    name: `${tenPhimFormatted} - Tập ${so_tap} (${ngonNguLabel})`,
    episodeNumber: parseInt(so_tap) || 1,
    partOfSeries: {
      "@type": "TVSeries",
      name: tenPhimFormatted,
      url: `${CANONICAL_APP_BASE_URL}/phim/${slug}`,
    },
    url: canonicalUrl,
    image: finalThumbnail,
    description: seoDescription,
    uploadDate: new Date().toISOString(),
    duration: "PT20M",
    publisher: {
      "@type": "Organization",
      name: "Motphim",
      logo: {
        "@type": "ImageObject",
        url: `${CANONICAL_APP_BASE_URL}/logo.png`,
      },
    },
    potentialAction: {
      "@type": "WatchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: canonicalUrl,
        actionPlatform: [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform",
        ],
      },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Trang chủ",
        item: `${CANONICAL_APP_BASE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: tenPhimFormatted,
        item: `${CANONICAL_APP_BASE_URL}/phim/${slug}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `Tập ${so_tap} ${ngonNguLabel}`,
        item: canonicalUrl,
      },
    ],
  };

  return {
    tenPhimFormatted,
    titleTag,
    seoDescription,
    episodeJsonLd,
    breadcrumbJsonLd,
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
