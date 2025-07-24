import { writeFile } from "fs/promises";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const BASE_API_URL = "https://phimapi.com";
const SITE_URL = "https://motchillw.live";
const OUTPUT_DIR = "./public";
const MAX_URLS_PER_SITEMAP = 10000;
const CONCURRENT_API_LIMIT = 3; // Giảm số lượng yêu cầu API đồng thời tối đa xuống 3-5

// --- Cài đặt Delay và Retry ---
const DELAY_BETWEEN_LIST_PAGES_MS = 2000; // QUAN TRỌNG: Độ trễ giữa các lần gọi API lấy danh sách trang (ví dụ: 2 giây)
const DELAY_BETWEEN_MOVIE_DETAILS_MS = 1000; // QUAN TRỌNG: Độ trễ giữa các lần gọi API lấy chi tiết phim (ví dụ: 1 giây)
const RETRY_DELAY_MS = 3000; // Độ trễ ban đầu khi gặp 429
const MAX_RETRIES = 5; // Số lần thử lại tối đa khi gặp 429

// --- User-Agent Faking ---
const USER_AGENTS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:127.0) Gecko/20100101 Firefox/127.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:127.0) Gecko/20100101 Firefox/127.0",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1",
  "Mozilla/5.0 (Linux; Android 14; Pixel 8) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Mobile Safari/537.36",
];

function getRandomUserAgent() {
  const randomIndex = Math.floor(Math.random() * USER_AGENTS.length);
  return USER_AGENTS[randomIndex];
}

/**
 * Hàm delay đơn giản
 * @param {number} ms - Thời gian delay bằng mili giây
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Generates an XML sitemap string from an array of URL objects.
 * @param {Array<Object>} urls - Array of URL objects with loc, lastmod, changefreq, priority.
 * @returns {string} - The XML sitemap string.
 */
function createSitemapXml(urls) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;
}

/**
 * Writes sitemap files, splitting them if the number of URLs exceeds MAX_URLS_PER_SITEMAP.
 * @param {Array<Object>} urls - Array of URL objects.
 * @param {string} baseFileName - The base name for the sitemap file (e.g., "sitemap-movies").
 */
async function writeSitemapFiles(urls, baseFileName) {
  const numSitemaps = Math.ceil(urls.length / MAX_URLS_PER_SITEMAP);
  const sitemapIndexUrls = [];

  for (let i = 0; i < numSitemaps; i++) {
    const start = i * MAX_URLS_PER_SITEMAP;
    const end = Math.min((i + 1) * MAX_URLS_PER_SITEMAP, urls.length);
    const subsetUrls = urls.slice(start, end);

    const sitemapFileName =
      numSitemaps > 1 ? `${baseFileName}-${i + 1}.xml` : `${baseFileName}.xml`;
    const sitemapPath = path.join(OUTPUT_DIR, sitemapFileName);
    const sitemapXml = createSitemapXml(subsetUrls);

    try {
      await writeFile(sitemapPath, sitemapXml);
      console.log(`✅ Đã lưu sitemap tại: ${sitemapPath}`);
      sitemapIndexUrls.push({
        loc: `${SITE_URL}/${sitemapFileName}`,
        lastmod: new Date().toISOString().split("T")[0],
      });
    } catch (error) {
      console.error(
        `❌ Lỗi khi ghi sitemap ${sitemapFileName}:`,
        error.message
      );
    }
  }

  // If there's more than one sitemap file, create a sitemap index file
  if (numSitemaps > 1) {
    const sitemapIndexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapIndexUrls
  .map(
    (url) => `  <sitemap>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
  </sitemap>`
  )
  .join("\n")}
</sitemapindex>`;

    const sitemapIndexPath = path.join(OUTPUT_DIR, `${baseFileName}-index.xml`);
    try {
      await writeFile(sitemapIndexPath, sitemapIndexXml);
      console.log(`✅ Đã lưu sitemap index tại: ${sitemapIndexPath}`);
    } catch (error) {
      console.error(
        `❌ Lỗi khi ghi sitemap index ${baseFileName}-index.xml:`,
        error.message
      );
    }
  }
}

/**
 * Fetches data from a given URL with retries for 429 errors.
 * @param {string} url - The URL to fetch.
 * @param {string} slugForLog - The movie slug for logging purposes.
 * @param {number} retries - Current retry count.
 * @returns {Promise<Response|null>} - The fetch Response object or null if failed after retries.
 */
async function fetchWithRetry(url, slugForLog, retries = 0) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": getRandomUserAgent(),
      },
    });

    if (!res.ok) {
      if (res.status === 429 && retries < MAX_RETRIES) {
        const delayMs = RETRY_DELAY_MS * Math.pow(2, retries);
        console.warn(
          `⚠️ Nhận 429 cho "${slugForLog}". Đang thử lại sau ${
            delayMs / 1000
          } giây (Thử lại lần ${retries + 1}/${MAX_RETRIES})...`
        );
        await delay(delayMs);
        return fetchWithRetry(url, slugForLog, retries + 1);
      } else {
        console.warn(
          `⚠️ Lỗi khi lấy dữ liệu cho "${slugForLog}" từ ${url}: ${
            res.status
          } - ${res.statusText}${
            res.status === 429 ? " (Đã hết số lần thử lại)" : ""
          }`
        );
        return null;
      }
    }
    return res;
  } catch (err) {
    console.error(`❌ Lỗi khi fetch ${url} cho "${slugForLog}":`, err.message);
    return null;
  }
}

/**
 * Fetches movie details concurrently with a limited number of requests.
 * @param {Array<Object>} movieBriefs - Array of brief movie objects.
 * @param {Set<string>} movieDetailPageUrls - Set to store movie detail page URLs.
 * @param {Set<string>} episodePageUrls - Set to store episode page URLs.
 */
async function fetchMovieDetailsConcurrently(
  movieBriefs,
  movieDetailPageUrls,
  episodePageUrls
) {
  const runningPromises = new Set();
  let currentIndex = 0;

  const processNext = async () => {
    while (currentIndex < movieBriefs.length || runningPromises.size > 0) {
      if (
        runningPromises.size < CONCURRENT_API_LIMIT &&
        currentIndex < movieBriefs.length
      ) {
        const movieBrief = movieBriefs[currentIndex++];

        if (!movieBrief.slug) {
          console.warn(
            `⚠️ Phim "${
              movieBrief.name || movieBrief.id || "N/A"
            }" không có slug trong danh sách, bỏ qua.`
          );
          continue;
        }

        // Add movie detail page URL immediately
        const movieLastmodDate = new Date(
          movieBrief.updated_at ||
            movieBrief.ngay_cap_nhat ||
            movieBrief.created_at ||
            Date.now()
        )
          .toISOString()
          .split("T")[0];

        movieDetailPageUrls.add(
          JSON.stringify({
            loc: `${SITE_URL}/phim/${movieBrief.slug}`,
            lastmod: movieLastmodDate,
            changefreq: "daily",
            priority: "0.9",
          })
        );

        const task = async (currentMovieBrief) => {
          const movieDetailApiUrl = `${BASE_API_URL}/phim/${currentMovieBrief.slug}`;
          // QUAN TRỌNG: Thêm delay trước mỗi lần gọi chi tiết phim
          await delay(DELAY_BETWEEN_MOVIE_DETAILS_MS);

          const resDetail = await fetchWithRetry(
            movieDetailApiUrl,
            currentMovieBrief.slug
          );
          if (!resDetail) {
            return; // Failed after retries or other error
          }

          const dataDetail = await resDetail.json();
          const movieFull = dataDetail.movie;
          const episodes = dataDetail.episodes;

          if (movieFull && Array.isArray(episodes) && episodes.length > 0) {
            for (const server of episodes) {
              if (Array.isArray(server.server_data)) {
                const languageType = server.server_name.includes("Lồng Tiếng")
                  ? "thuyet-minh"
                  : "vietsub";
                for (const episode of server.server_data) {
                  if (episode.slug) {
                    const episodeLastmodDate = new Date(
                      movieFull.modified?.time ||
                        movieFull.updated_at ||
                        Date.now()
                    )
                      .toISOString()
                      .split("T")[0];

                    episodePageUrls.add(
                      JSON.stringify({
                        loc: `${SITE_URL}/xem-phim/${movieFull.slug}/${episode.slug}/${languageType}`,
                        lastmod: episodeLastmodDate,
                        changefreq: "daily",
                        priority: "0.8",
                      })
                    );
                  } else {
                    console.warn(
                      `⚠️ Tập phim không có slug: ${episode.name}, bỏ qua.`
                    );
                  }
                }
              }
            }
          } else {
            console.log(
              `ℹ️ Không có tập phim nào cho phim: ${movieBrief.slug}`
            );
          }
        };

        const p = task(movieBrief);
        runningPromises.add(p);
        p.finally(() => {
          runningPromises.delete(p);
          processNext(); // Schedule next task if concurrency slot opens up
        });
      } else if (
        runningPromises.size === 0 &&
        currentIndex >= movieBriefs.length
      ) {
        break; // All tasks finished and no more to add
      } else {
        // Wait for one of the running promises to complete
        await Promise.race(runningPromises);
      }
    }
  };

  await processNext(); // Start the concurrent processing
}

/**
 * Generates sitemap for individual movie detail pages and episode pages.
 */
async function generateMovieSitemap() {
  console.log(
    "🚀 Bắt đầu tạo sitemap cho trang chi tiết phim và trang tập phim từ phimapi.com..."
  );

  const movieDetailPageUrls = new Set();
  const episodePageUrls = new Set();
  const movieTypes = ["phim-le", "phim-bo", "hoat-hinh", "phim-chieu-rap"];
  const maxPages = 15;
  const limit = 64;

  for (const movieType of movieTypes) {
    console.log(`--- Đang lấy danh sách phim loại: ${movieType} ---`);
    const allMovieBriefsForType = [];

    for (let page = 1; page <= maxPages; page++) {
      const listApiUrl = `${BASE_API_URL}/v1/api/danh-sach/${movieType}?page=${page}&limit=${limit}&sort_type=dsc&sort_field=_id`;

      // QUAN TRỌNG: Thêm delay giữa các lần gọi API danh sách trang
      if (page > 1) {
        // Apply delay from the second page onwards
        await delay(DELAY_BETWEEN_LIST_PAGES_MS);
      }

      try {
        console.log(`💡 Đang gọi API danh sách: ${listApiUrl}`);
        const resList = await fetchWithRetry(
          listApiUrl,
          `list-${movieType}-page-${page}`
        );

        if (!resList) {
          continue; // Move to next page or type if fetch failed after retries
        }

        const dataList = await resList.json();
        const moviesInList = dataList.data?.items || dataList.items;

        if (!Array.isArray(moviesInList) || moviesInList.length === 0) {
          console.log(
            `ℹ️ Không còn phim nào loại ${movieType} ở trang ${page}.`
          );
          break; // Break if no more movies on this type, no need to check further pages
        }
        console.log(
          `✅ Đã lấy ${moviesInList.length} phim loại ${movieType} từ trang ${page}`
        );
        allMovieBriefsForType.push(...moviesInList);
      } catch (err) {
        console.error(
          `❌ Lỗi tổng quan khi lấy phim loại ${movieType} trang ${page}:`,
          err.message
        );
        // Continue to next page/type even if there's an error
      }
    }

    console.log(
      `Tổng số phim đã lấy loại ${movieType}: ${allMovieBriefsForType.length}`
    );

    // Fetch details for all collected movies concurrently, but respecting limits and internal delays
    console.log(`--- Đang lấy chi tiết và tập phim loại: ${movieType} ---`);
    await fetchMovieDetailsConcurrently(
      allMovieBriefsForType,
      movieDetailPageUrls,
      episodePageUrls
    );
  }

  // Generate sitemap for movie detail pages
  const finalMovieUrls = Array.from(movieDetailPageUrls).map((urlStr) =>
    JSON.parse(urlStr)
  );
  console.log(`Tổng số URL trang chi tiết phim: ${finalMovieUrls.length}`);
  await writeSitemapFiles(finalMovieUrls, "sitemap-movies");

  // Generate sitemap for episode pages
  const finalEpisodeUrls = Array.from(episodePageUrls).map((urlStr) =>
    JSON.parse(urlStr)
  );
  console.log(`Tổng số URL trang tập phim: ${finalEpisodeUrls.length}`);
  await writeSitemapFiles(finalEpisodeUrls, "sitemap-episodes");
}

/**
 * Generates sitemap for static movie type paths.
 */
async function generateStaticTypeSitemap() {
  console.log("🚀 Bắt đầu tạo sitemap cho các trang loại phim tĩnh...");
  const staticTypeUrls = [
    { params: { slug: "phim-le" } },
    { params: { slug: "phim-bo" } },
    { params: { slug: "hoat-hinh" } },
    { params: { slug: "phim-chieu-rap" } },
  ];

  const urls = staticTypeUrls.map((path) => ({
    loc: `${SITE_URL}/loai-phim/${path.params.slug}`,
    lastmod: new Date().toISOString().split("T")[0],
    changefreq: "daily",
    priority: "0.7",
  }));

  console.log(`Tổng số URL loại phim tĩnh: ${urls.length}`);
  await writeSitemapFiles(urls, "sitemap-types");
}

/**
 * Generates sitemap for static genre paths.
 */
async function generateGenreSitemap() {
  console.log("🚀 Bắt đầu tạo sitemap cho các trang thể loại phim tĩnh...");
  const staticTheLoaiList = [
    { id: 1, ten: "Hành Động", slug: "hanh-dong" },
    { id: 2, ten: "Cổ Trang", slug: "co-trang" },
    { id: 3, ten: "Viễn Tưởng", slug: "vien-tuong" },
    { id: 4, ten: "Bí Ẩn", slug: "bi-an" },
    { id: 5, ten: "Tâm Lý", slug: "tam-ly" },
    { id: 6, ten: "Âm Nhạc", slug: "am-nhac" },
    { id: 7, ten: "Phiêu Lưu", slug: "phieu-luu" },
    { id: 8, ten: "Chính Kịch", slug: "chinh-kich" },
    { id: 9, ten: "Khoa Học", slug: "khoa-hoc" },
    { id: 10, ten: "Học Đường", slug: "hoc-duong" },
    { id: 11, ten: "Võ Thuật", slug: "vo-thuat" },
    { id: 12, ten: "Chiến Tranh", slug: "chien-tranh" },
    { id: 18, ten: "Hình Sự", slug: "hinh-su" },
    { id: 19, ten: "Gia Đình", slug: "gia-dinh" },
    { id: 20, ten: "Tình Cảm", slug: "tinh-cam" },
    { id: 21, ten: "Thần Thoại", slug: "than-thoai" },
    { id: 22, ten: "Thể Thao", slug: "the-thao" },
    { id: 23, ten: "Kinh Dị", slug: "kinh-di" },
    { id: 24, ten: "Kinh Điển", slug: "kinh-dien" },
  ];

  const urls = staticTheLoaiList.map((genre) => ({
    loc: `${SITE_URL}/the-loai/${genre.slug}`, // Assuming your genre paths are like /the-loai/hanh-dong
    lastmod: new Date().toISOString().split("T")[0],
    changefreq: "daily",
    priority: "0.7",
  }));

  console.log(`Tổng số URL thể loại phim tĩnh: ${urls.length}`);
  await writeSitemapFiles(urls, "sitemap-genres");
}

/**
 * Generates sitemap for static country paths.
 */
async function generateCountrySitemap() {
  console.log("🚀 Bắt đầu tạo sitemap cho các trang quốc gia phim tĩnh...");
  const staticCountrySlugs = [
    "viet-nam",
    "han-quoc",
    "au-my",
    "trung-quoc",
    "nhat-ban",
    "thai-lan",
    "an-do",
    "phap",
    "anh",
    "nga",
    "duc",
    "y",
    "tay-ban-nha",
    "uc",
    "canada",
    "philippines",
    "indonesia",
    "malaysia",
    "hong-kong",
    "mexico",
    "dan-mach",
    "thuy-dien",
    "thuy-si",
    "ukraina",
    "ba-lan",
    "bo-dao-nha",
    "u-a-e",
    "dai-loan",
    "a-rap-xe-ut",
    "tho-nhi-ky",
    "brazil",
    "nam-phi",
    "na-uy",
    "chau-phi",
    "quoc-gia-khac",
  ];

  const urls = staticCountrySlugs.map((slug) => ({
    loc: `${SITE_URL}/quoc-gia/${slug}`, // Assuming your country paths are like /quoc-gia/viet-nam
    lastmod: new Date().toISOString().split("T")[0],
    changefreq: "daily",
    priority: "0.7",
  }));

  console.log(`Tổng số URL quốc gia phim tĩnh: ${urls.length}`);
  await writeSitemapFiles(urls, "sitemap-countries");
}

/**
 * Main function to generate all sitemaps.
 */
async function generateAllSitemaps() {
  console.log("\n--- BẮT ĐẦU TẠO TẤT CẢ SITEMAP ---");
  const startTime = process.hrtime.bigint(); // Start time

  // Generate sitemaps based on API data
  await generateMovieSitemap();

  // Generate sitemaps for static paths
  await generateStaticTypeSitemap();
  await generateGenreSitemap();
  await generateCountrySitemap();

  const endTime = process.hrtime.bigint(); // End time
  const totalTimeMs = Number(endTime - startTime) / 1_000_000; // Convert nanoseconds to milliseconds
  console.log(
    `\n--- HOÀN TẤT TẠO TẤT CẢ SITEMAP TRONG ${totalTimeMs.toFixed(2)} ms ---`
  );
}

// Run the main sitemap generation function
generateAllSitemaps();
