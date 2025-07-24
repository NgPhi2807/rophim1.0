import axios from "axios";

const BASE_URL = import.meta.env.PUBLIC_API_BASE_URL;
const CACHE_KEY_PREFIX = "moviePageDataCache_";
const CACHE_EXPIRATION_TIME = 2 * 60 * 60 * 1000;

export async function getMoviePageData(slug) {
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
      axios.get(urlDeXuat),
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
      const vietsubServer = movieDetailData.episodes.find((server) =>
        server.server_name?.toLowerCase().includes("vietsub")
      );
      const thuyetMinhServer = movieDetailData.episodes.find((server) =>
        server.server_name?.toLowerCase().includes("thuyết minh")
      );
      const longTiengServer = movieDetailData.episodes.find((server) =>
        server.server_name?.toLowerCase().includes("lồng tiếng")
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
      } else if (
        thuyetMinhEpisodes.length > 0 &&
        thuyetMinhEpisodes[0].link_m3u8
      ) {
        firstEpisodeLink = thuyetMinhEpisodes[0].link_m3u8;
        firstEpisodeSlug = thuyetMinhEpisodes[0].slug;
        firstEpisodeType = "thuyetminh";
      } else if (
        longTiengEpisodes.length > 0 &&
        longTiengEpisodes[0].link_m3u8
      ) {
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
      firstEpisodeSlug: firstEpisodeSlug,
      firstEpisodeType: firstEpisodeType,
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
      firstEpisodeType: null,
    };
  }
}
