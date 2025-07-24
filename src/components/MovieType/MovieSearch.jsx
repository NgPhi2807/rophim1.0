import { useState, useEffect, useCallback } from "react";

export function rutGonTinhTrangPhim(tinhTrang) {
  if (!tinhTrang) return "";

  const txt = tinhTrang.toLowerCase();
  const tapFullMatch = tinhTrang.match(/\(\d+\/\d+\)/);
  const tapNMatch = tinhTrang.match(/tập\s*\d+(\/\d+)?/i);

  if (txt.includes("hoàn tất") || txt.includes("full")) {
    return tapFullMatch ? `Full ${tapFullMatch[0]}` : "Full";
  }

  if (tapNMatch) {
    return `Cập nhật tới ${tapNMatch[0]}`;
  }

  if (txt.includes("update") || txt.includes("cập nhật")) {
    return "Cập Nhật";
  }

  return tinhTrang;
}

const BASE_URL = "https://phimapi.com";

export default function SearchContent({ initialKeyword, initialPage = 1 }) {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: initialPage, // Đây sẽ được cập nhật bởi phản hồi API
    total_pages: 1,
    total_items: 0,
    page_size: 10,
  });

  // Sử dụng các trạng thái riêng biệt để điều khiển hoạt động fetch, khởi tạo từ props.
  // Các trạng thái này sẽ thay đổi khi props ban đầu thay đổi HOẶC khi người dùng tương tác với phân trang.
  const [currentKeyword, setCurrentKeyword] = useState(initialKeyword);
  const [currentPageFetch, setCurrentPageFetch] = useState(initialPage);

  // Hàm fetchSearchResults hiện đã ổn định và không phụ thuộc vào các giá trị state nội bộ
  // như `keyword` hay `pagination.current_page` trực tiếp.
  // Nó nhận `kw` và `pageToFetch` làm đối số tường minh.
  const fetchSearchResults = useCallback(
    async (kw, pageToFetch) => {
      if (!kw) {
        setSearchResults([]);
        setLoading(false);
        setPagination({
          current_page: 1,
          total_pages: 1,
          total_items: 0,
          page_size: 10,
        });
        return;
      }

      setLoading(true); // Bắt đầu tải, hiển thị spinner
      setError(null); // Xóa lỗi cũ
      setSearchResults([]); // Xóa kết quả cũ ngay lập tức để tránh nhấp nháy dữ liệu cũ

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
            page_size: 10,
          }
        );

        // Cập nhật URL trong trình duyệt mà không tải lại trang đầy đủ
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
          page_size: 10,
        });
      } finally {
        setLoading(false); // Kết thúc tải
      }
    },
    [] // Mảng dependency rỗng có nghĩa là hàm này được tạo một lần và ổn định
  );

  // useEffect này xử lý các thay đổi từ props ban đầu và kích hoạt fetch.
  // Đây là điểm trung tâm để bắt đầu các tìm kiếm.
  useEffect(() => {
    // Kiểm tra xem các props ban đầu có khác với trạng thái nội bộ hiện tại không.
    // Điều này xảy ra khi Astro re-render với các tham số URL mới.
    if (initialKeyword !== currentKeyword || initialPage !== currentPageFetch) {
      setCurrentKeyword(initialKeyword);
      setCurrentPageFetch(initialPage);
      // Không gọi fetchSearchResults trực tiếp ở đây.
      // Phần khác của useEffect này (phụ thuộc vào currentKeyword/currentPageFetch) sẽ xử lý.
    }

    // Phần này của useEffect chạy khi currentKeyword hoặc currentPageFetch thay đổi
    // (từ đồng bộ hóa props ban đầu ở trên, hoặc từ handlePageChange).
    // Đây là yếu tố kích hoạt thực sự để gọi fetchSearchResults.
    if (currentKeyword) {
      fetchSearchResults(currentKeyword, currentPageFetch);
    }
  }, [
    currentKeyword,
    currentPageFetch,
    fetchSearchResults,
    initialKeyword,
    initialPage,
  ]);

  const handlePageChange = (pageNumber) => {
    // Cập nhật trạng thái currentPageFetch. Điều này sẽ tự động kích hoạt useEffect ở trên
    // để gọi fetchSearchResults với số trang mới.
    setCurrentPageFetch(pageNumber);
  };

  const { current_page, total_pages, total_items } = pagination; // Dùng trạng thái pagination cho hiển thị phân trang

  const paginationItems = [];
  const start = Math.max(1, current_page - 2);
  const end = Math.min(total_pages, start + 4);
  for (let i = start; i <= end; i++) {
    paginationItems.push(i);
  }

  return (
    <div className="mx-auto text-white">
      <h1 className="mb-6 text-lg lg:text-xl font-bold">
        Kết quả tìm kiếm cho:
        <span className="text-green-400">"{currentKeyword}"</span>
      </h1>

      {loading && (
        <div className="text-center text-gray-400">Đang tải kết quả...</div>
      )}

      {error && <div className="text-center text-red-500">{error}</div>}

      {!loading && !error && searchResults.length === 0 && (
        <div className="text-center text-gray-400">
          Không tìm thấy phim nào phù hợp với từ khóa "{currentKeyword}".
        </div>
      )}

      {!loading && !error && searchResults.length > 0 && (
        <>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {searchResults.map((movie) => {
              const fullPosterUrl = `https://ik.imagekit.io/17mpki7mv/motchill/${movie.poster_url}?tr=f-webp,w-300,h-450,fo-auto,q-85`;
              return (
                <a
                  key={movie._id}
                  href={`/phim/${movie.slug}`}
                  className="group relative flex-shrink-0"
                >
                  <div className="relative aspect-[2/3] w-full overflow-hidden rounded-[4px]">
                    <img
                      src={fullPosterUrl}
                      alt={`Poster phim ${movie.name}`}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <div
                      className="absolute bottom-0 left-0 h-[40%] w-full rounded-b-[4px]"
                      style={{
                        background:
                          "linear-gradient(to top,rgba(30, 30, 30, 0.8) 5%, transparent 100%)",
                      }}
                      aria-hidden="true"
                    />
                    <div className="absolute inset-0 rounded-[4px] bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
                      <svg
                        viewBox="0 0 60 60"
                        xmlns="http://www.w3.org/2000/svg"
                        className="play-button h-[25px] w-[25px] transition-transform duration-700 sm:h-[30px] sm:w-[30px] ease-in-out"
                      >
                        <circle
                          cx="30"
                          cy="30"
                          r="30"
                          className="fill-green-500 transition-colors duration-200"
                        />
                        <path
                          d="M35.7461509,22.4942263 L45.1405996,36.5858994 C46.059657,37.9644855 45.6871354,39.8270935 44.3085493,40.7461509 C43.8157468,41.0746859 43.2367237,41.25 42.6444487,41.25 L23.8555513,41.25 C22.198697,41.25 20.8555513,39.9068542 20.8555513,38.25 C20.8555513,37.657725 21.0308654,37.078702 21.3594004,36.5858994 L30.7538491,22.4942263 C31.6729065,21.1156403 33.5355145,20.7431187 34.9141006,21.662176 C35.2436575,21.8818806 35.5264463,22.1646695 35.7461509,22.4942263 Z"
                          fill="#FFFFFF"
                          transform="translate(33.25, 30) rotate(-270) translate(-33.25, -30)"
                        />
                      </svg>
                    </div>
                    <div className="absolute bottom-1 left-1 z-10">
                      {movie.episode_current && (
                        <span className="z-20 px-0.5 py-0.5 text-[12px] font-bold leading-tight text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                          {rutGonTinhTrangPhim(movie.episode_current)}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="pb-4 pt-2">
                    <p
                      className="line-clamp-2 text-[13px] font-semibold text-gray-200 hover:text-green-400"
                      title={movie.name}
                    >
                      {movie.name}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>

          {total_pages > 1 && (
            <nav className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {current_page > 1 && (
                <button
                  onClick={() => handlePageChange(current_page - 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-[4px] border border-gray-600 bg-[#23252b] text-sm text-gray-300 hover:bg-gray-600"
                  aria-label="Trang trước"
                  disabled={loading}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="currentColor"
                      d="m2 10l8 8l1.4-1.4L5.8 11H18V9H5.8l5.6-5.6L10 2z"
                    />
                  </svg>
                </button>
              )}

              {paginationItems.map((p) => (
                <button
                  key={p}
                  onClick={() => handlePageChange(p)}
                  className={`flex h-8 w-8 items-center justify-center rounded-[4px] border text-sm ${
                    current_page === p
                      ? "border-green-400 bg-green-500 text-white"
                      : "border-gray-600 bg-[#23252b] text-gray-300 hover:bg-gray-600"
                  }`}
                  disabled={loading}
                >
                  {p}
                </button>
              ))}

              {current_page < total_pages && (
                <button
                  onClick={() => handlePageChange(current_page + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-[4px] border border-gray-600 bg-[#23252b] text-sm text-gray-300 hover:bg-gray-600"
                  aria-label="Trang sau"
                  disabled={loading}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="currentColor"
                      d="M8.6 3.4L14.2 9H2v2h12.2l-5.6 5.6L10 18l8-8l-8-8z"
                    />
                  </svg>
                </button>
              )}
            </nav>
          )}
        </>
      )}
    </div>
  );
}
