import axios from "axios";

const BASE_URL = import.meta.env.PUBLIC_API_BASE_URL;

const CACHE_KEY = "homepageDataCache";
const CACHE_EXPIRATION_TIME = 2 * 60 * 60 * 1000;
const homepageAxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
});

export async function getHomePageData() {
  const endpoints = [
    {
      key: "moviechinas",
      url: `/v1/api/danh-sach/phim-bo?page=1&sort_field=_id&sort_type=dsc&country=trung-quoc&year=2025&limit=24`,
    },
    {
      key: "moviekoreas",
      url: `/v1/api/danh-sach/phim-bo?page=1&sort_type=dsc&country=han-quoc&year=2025&limit=24`,
    },
    {
      key: "moviethailans",
      url: `/v1/api/danh-sach/phim-bo?page=1&sort_type=dsc&country=thai-lan&year=2025&limit=24`,
    },
    {
      key: "movieusuks",
      url: `/v1/api/danh-sach/phim-bo?page=1&sort_type=dsc&country=au-my  &year=2025&limit=24`,
    },
    {
      key: "moviehhs",
      url: `/v1/api/danh-sach/hoat-hinh?page=1&sort_type=dsc&year=2025&limit=18`,
    },
    {
      key: "movieles",
      url: `/v1/api/danh-sach/phim-le?page=1&sort_type=dsc&year=2025&limit=18`,
    },
    {
      key: "movieles_hanhdong",
      url: `/v1/api/danh-sach/phim-le?page=1&sort_type=dsc&category=hanh-dong&year=2025&limit=12`,
    },
    {
      key: "movieles_kinhdi",
      url: `/v1/api/danh-sach/phim-le?page=1&sort_field=_id&sort_type=dsc&category=kinh-di&year=2025&limit=12`,
    },
    {
      key: "movieles_tamly",
      url: `/v1/api/danh-sach/phim-le?page=1&sort_field=_id&sort_type=dsc&category=tam-ly&year=2025&limit=12`,
    },
    {
      key: "movieles_phieuluu",
      url: `/v1/api/danh-sach/phim-le?page=1&sort_field=_id&sort_type=dsc&category=phieu-luu&year=2025&limit=12`,
    },
    {
      key: "moviebos",
      url: `/v1/api/danh-sach/phim-bo?page=1&sort_type=dsc&year=2025&limit=18`,
    },
    {
      key: "moviebos_hanhdong",
      url: `/v1/api/danh-sach/phim-bo?page=1&sort_field=_id&sort_type=dsc&category=hanh-dong&year=2025&limit=12`,
    },
    {
      key: "moviebos_kinhdi",
      url: `/v1/api/danh-sach/phim-bo?page=1&sort_field=_id&sort_type=dsc&category=kinh-di&year=2025&limit=12`,
    },
    {
      key: "moviebos_tamly",
      url: `/v1/api/danh-sach/phim-bo?page=1&sort_field=_id&sort_type=dsc&category=tam-ly&year=2025&limit=12`,
    },
    {
      key: "moviebos_phieuluu",
      url: `/v1/api/danh-sach/phim-bo?page=1&sort_field=_id&sort_type=dsc&category=phieu-luu&year=2025&limit=12`,
    },

    {
      key: "moviehoathinhs",
      url: `/v1/api/danh-sach/hoat-hinh?page=1&sort_type=dsc&country=trung-quoc&year=2025&limit=12`,
    },
    {
      key: "moviecotrangs",
      url: `/v1/api/danh-sach/phim-bo?page=1&sort_type=dsc&category=co-trang&country=trung-quoc&year=2025&limit=12`,
    },
    {
      key: "moviehots",
      url: `/danh-sach/phim-moi-cap-nhat-v3?page=1&limit=10`,
    },
    {
      key: "movietodays",
      url: `/v1/api/danh-sach/phim-bo?page=1&sort_type=dsc&limit=10`,
    },
    {
      key: "movieupchieuraps",
      url: `/v1/api/danh-sach/phim-chieu-rap?page=1&sort_type=dsc&limit=12`,
    },
  ];

  if (typeof window !== "undefined" && window.localStorage) {
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedTimestamp = localStorage.getItem(`${CACHE_KEY}_timestamp`);

    if (cachedData && cachedTimestamp) {
      const parsedTimestamp = parseInt(cachedTimestamp, 10);
      if (Date.now() - parsedTimestamp < CACHE_EXPIRATION_TIME) {
        try {
          return JSON.parse(cachedData);
        } catch (e) {
          localStorage.removeItem(CACHE_KEY);
          localStorage.removeItem(`${CACHE_KEY}_timestamp`);
        }
      } else {
        localStorage.removeItem(CACHE_KEY);
        localStorage.removeItem(`${CACHE_KEY}_timestamp`);
      }
    }
  }

  try {
    const results = await Promise.all(
      endpoints.map(({ key, url }) =>
        homepageAxiosInstance
          .get(url)
          .then((response) => response.data)
          .catch((error) => {
            console.error(
              `❌ Error fetching data for '${key}' from ${url}:`,
              error.message,
              error.response?.statusText || ""
            );

            if (key === "moviehots") {
              return { items: [] };
            } else {
              return { data: { items: [] } };
            }
          })
      )
    );

    const processedData = results.reduce((acc, res, i) => {
      const currentKey = endpoints[i].key;
      let items = [];
      if (currentKey === "moviehots") {
        items = res?.items || [];
      } else {
        items = res?.data?.items || [];
      }
      acc[currentKey] = items;
      return acc;
    }, {});

    if (typeof window !== "undefined" && window.localStorage) {
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(processedData));
        localStorage.setItem(`${CACHE_KEY}_timestamp`, Date.now().toString());
      } catch (e) {}
    }

    return processedData;
  } catch (err) {
    return Object.fromEntries(endpoints.map((e) => [e.key, []]));
  }
}
