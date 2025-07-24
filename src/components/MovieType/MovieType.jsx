import { useState, useCallback, useEffect } from "react";
import {
  rutGonTinhTrangNgonNgu,
  rutGonTinhTrangPhim,
} from "../../utils/movieUtils";

export default function CategoryMovies({
  initialData,
  initialSlug,
  baseUrl,
  initialLimit,
  tittle,
}) {
  const [movies, setMovies] = useState(initialData?.items || []);
  const [pagination, setPagination] = useState(
    initialData?.params?.pagination || { current_page: 1, total_pages: 1 }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  const [selectedMovieType, setSelectedMovieType] = useState(initialSlug);

  const [filters, setFilters] = useState(() => {
    const initialQuocGia = initialData?.params?.filterCountry?.[0] || "";
    const initialTheLoai = initialData?.params?.filterCategory?.[0] || "";
    const initialNgonNgu = initialData?.params?.filterType?.[0] || ""; // Maps to sort_lang
    const initialNamPhatHanh = initialData?.params?.filterYear?.[0] || "";
    const initialSortField = initialData?.params?.sortField || "_id"; // Default to _id
    const initialSortType = initialData?.params?.sortType || "desc"; // Default to desc as in the example API call

    return {
      quoc_gia: initialQuocGia,
      the_loai: initialTheLoai,
      ngon_ngu: initialNgonNgu,
      nam_phat_hanh: initialNamPhatHanh,
      sort_field: initialSortField,
      sort_type: initialSortType,
    };
  });

  const currentPage = pagination.current_page;
  const totalPages = pagination.total_pages;

  // Movie type options for the "Loại phim" select dropdown
  const movieTypeOptions = [
    { label: "Tất cả", value: "phim" },
    { label: "Phim Lẻ", value: "phim-le" },
    { label: "Phim Bộ", value: "phim-bo" },
    { label: "Hoạt Hình", value: "hoat-hinh" },
    { label: "Phim Chiếu Rạp", value: "phim-chieu-rap" },
  ];

  // Options for other filters (Country, Category, Status, Language, Release Year, Sort)
  const countryOptions = [
    { label: "Tất cả", value: "" },
    { label: "Việt Nam", value: "viet-nam" },
    { label: "Hàn Quốc", value: "han-quoc" },
    { label: "Mỹ", value: "my" },
    { label: "Trung Quốc", value: "trung-quoc" },
    { label: "Nhật Bản", value: "nhat-ban" },
    { label: "Thái Lan", value: "thai-lan" },
    { label: "Hồng Kông", value: "hong-kong" },
    { label: "Đài Loan", value: "dai-loan" },
    { label: "Ấn Độ", value: "an-do" },
    { label: "Anh", value: "anh" },
    { label: "Pháp", value: "phap" },
    { label: "Canada", value: "canada" },
    { label: "Đức", value: "duc" },
    { label: "Khác", value: "khac" },
  ];
  const categoryOptions = [
    { label: "Tất cả", value: "" },
    { label: "Cổ Trang", value: "co-trang" },
    { label: "Hành Động", value: "hanh-dong" },
    { label: "Học Đường", value: "hoc-duong" },
    { label: "Kinh Dị", value: "kinh-di" },
    { label: "Tâm Lý", value: "tam-ly" },
    { label: "Viễn Tưởng", value: "vien-tuong" },
    { label: "Phiêu Lưu", value: "phieu-luu" },
    { label: "Tình Cảm", value: "tinh-cam" },
    { label: "Hình Sự", value: "hinh-su" },
    { label: "Võ Thuật", value: "vo-thuat" },
    { label: "Hoạt Hình", value: "hoat-hinh" },
    { label: "Tài Liệu", value: "tai-lieu" },
    { label: "Khoa Học", value: "khoa-hoc" },
    { label: "Chiến Tranh", value: "chien-tranh" },
    { label: "Thần Thoại", value: "than-thoai" },
    { label: "Âm Nhạc", value: "am-nhac" },
    { label: "Gia Đình", value: "gia-dinh" },
    { label: "Thể Thao", value: "the-thao" },
    { label: "Bí Ẩn", value: "bi-an" },
    { label: "Lịch Sử", value: "lich-su" },
  ];

  const statusOptions = [
    { label: "Tất cả", value: "" },
    { label: "Hoàn Thành", value: "hoan-thanh" },
    { label: "Đang Cập Nhật", value: "dang-cap-nhat" },
  ];

  const languageOptions = [
    { label: "Tất cả", value: "" },
    { label: "Vietsub", value: "vietsub" },
    { label: "Thuyết Minh", value: "thuyet-minh" },
    { label: "Lồng Tiếng", value: "long-tieng" },
  ];

  const releaseYearOptions = [
    { label: "Tất cả", value: "" },
    ...Array.from({ length: new Date().getFullYear() - 1999 + 1 }, (_, i) => ({
      label: `${new Date().getFullYear() - i}`,
      value: `${new Date().getFullYear() - i}`,
    })).sort((a, b) => parseInt(b.value) - parseInt(a.value)),
  ];

  const sortOptions = [
    { label: "Mới nhất (theo ID)", value: "_id" },
    { label: "Thời gian cập nhật", value: "modified.time" },
    { label: "Năm phát hành", value: "year" },
  ];

  const buildApiUrl = useCallback(
    (pageToFetch = 1) => {
      const url = new URL(`${baseUrl}/v1/api/danh-sach/${selectedMovieType}`);
      url.searchParams.set("page", pageToFetch.toString());
      url.searchParams.set("limit", initialLimit.toString());

      if (filters.sort_field) {
        url.searchParams.set("sort_field", filters.sort_field);
      }
      if (filters.sort_type) {
        url.searchParams.set("sort_type", filters.sort_type);
      }
      if (filters.ngon_ngu) {
        url.searchParams.set("sort_lang", filters.ngon_ngu);
      }
      if (filters.the_loai) {
        url.searchParams.set("category", filters.the_loai);
      }
      if (filters.quoc_gia) {
        url.searchParams.set("country", filters.quoc_gia);
      }
      if (filters.nam_phat_hanh) {
        url.searchParams.set("year", filters.nam_phat_hanh);
      }

      return url.toString();
    },
    [filters, baseUrl, selectedMovieType, initialLimit]
  );

  const fetchMovies = useCallback(
    async (pageToFetch = 1) => {
      setLoading(true);
      setError(null);
      try {
        const url = buildApiUrl(pageToFetch);
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`Lỗi khi fetch API: ${url} - Status: ${res.status}`);
        }
        const json = await res.json();

        setMovies(json.data?.items || []);
        setPagination(
          json.data?.params?.pagination || { current_page: 1, total_pages: 1 }
        );

        const newUrl = new URL(
          `${window.location.origin}/loai-phim/${selectedMovieType}`
        );
        newUrl.searchParams.set("page", pageToFetch.toString());
        newUrl.searchParams.set("limit", initialLimit.toString());

        if (filters.sort_field) {
          newUrl.searchParams.set("sort_field", filters.sort_field);
        } else {
          newUrl.searchParams.delete("sort_field");
        }
        if (filters.sort_type) {
          newUrl.searchParams.set("sort_type", filters.sort_type);
        } else {
          newUrl.searchParams.delete("sort_type");
        }
        if (filters.ngon_ngu) {
          newUrl.searchParams.set("sort_lang", filters.ngon_ngu);
        } else {
          newUrl.searchParams.delete("sort_lang");
        }
        if (filters.the_loai) {
          newUrl.searchParams.set("category", filters.the_loai);
        } else {
          newUrl.searchParams.delete("category");
        }
        if (filters.quoc_gia) {
          newUrl.searchParams.set("country", filters.quoc_gia);
        } else {
          newUrl.searchParams.delete("country");
        }
        if (filters.nam_phat_hanh) {
          newUrl.searchParams.set("year", filters.nam_phat_hanh);
        } else {
          newUrl.searchParams.delete("year");
        }

        window.history.pushState(null, "", newUrl.toString());
      } catch (err) {
        setError("Không thể tải phim. Vui lòng thử lại.");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    },
    [buildApiUrl, filters, initialLimit, selectedMovieType]
  );

  const handleFilterChange = (name, value) => {
    if (name === "loai_phim") {
      setSelectedMovieType(value);
      // Reset other filters when movie type changes
      setFilters({
        quoc_gia: "",
        the_loai: "",
        ngon_ngu: "",
        nam_phat_hanh: "",
        sort_field: "_id", // Default sort field
        sort_type: "desc", // Default sort type
      });
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    }
    // Đã xóa fetchMovies(1) ở đây
  };

  const handleApplyFilters = () => {
    fetchMovies(1);
  };

  const handlePageChange = (pageNumber) => {
    fetchMovies(pageNumber);
  };

  // Create a fixed array of pages from 1 to 5
  const fixedPageNumbers = [1, 2, 3, 4, 5];

  return (
    <div>
      <div className="">
        <div className="flex flex-row items-center justify-between gap-8 lg:justify-start">
          <h1 className="lg:text-xl text-lg font-semibold text-white">
            {tittle}
          </h1>
          <button
            onClick={() => setIsFilterExpanded(!isFilterExpanded)}
            className="flex items-center gap-1 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="leading-none"
            >
              <path d="M19 6H5c-1.1 0-1.4.6-.6 1.4l4.2 4.2c.8.8 1.4 2.3 1.4 3.4v5l4-2v-3.5c0-.8.6-2.1 1.4-2.9l4.2-4.2c.8-.8.5-1.4-.6-1.4" />
            </svg>
            <span className="text-xs font-medium leading-none text-white">
              Bộ lọc
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              className={`leading-none transition-transform duration-300 ${
                isFilterExpanded ? "rotate-180" : "rotate-0"
              }`}
            >
              <path d="M12 13.172L18.364 6.808l1.414 1.414L12 16L4.222 8.222l1.414-1.414L12 13.172z" />
            </svg>
          </button>
        </div>

        {isFilterExpanded && (
          <div className="mt-4 flex flex-col gap-4 text-xs text-white border border-gray-200/20 rounded-lg p-4">
            <div>
              <p className="mb-2 font-semibold">Loại phim:</p>
              <div className="flex flex-wrap gap-2">
                {movieTypeOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() =>
                      handleFilterChange("loai_phim", option.value)
                    }
                    className={`rounded-lg px-3 py-1.5 ${
                      selectedMovieType === option.value
                        ? "border border-gray-700 text-[#ffd875]"
                        : "text-gray-200 hover:text-whtie "
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quốc gia Filter */}
            <div>
              <p className="mb-2 font-semibold">Quốc gia:</p>
              <div className="flex flex-wrap gap-2">
                {countryOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleFilterChange("quoc_gia", option.value)}
                    className={`rounded-lg px-3 py-1.5 ${
                      filters.quoc_gia === option.value
                        ? "border border-gray-700 text-[#ffd875]"
                        : "text-gray-200 hover:text-whtie "
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Thể loại Filter */}
            <div>
              <p className="mb-2 font-semibold">Thể loại:</p>
              <div className="flex flex-wrap gap-2">
                {categoryOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleFilterChange("the_loai", option.value)}
                    className={`rounded-lg px-3 py-1.5 ${
                      filters.the_loai === option.value
                        ? "border border-gray-700 text-[#ffd875]"
                        : "text-gray-200 hover:text-whtie "
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Ngôn ngữ Filter */}
            <div>
              <p className="mb-2 font-semibold">Ngôn ngữ:</p>
              <div className="flex flex-wrap gap-2">
                {languageOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleFilterChange("ngon_ngu", option.value)}
                    className={`rounded-lg px-3 py-1.5 ${
                      filters.ngon_ngu === option.value
                        ? "border border-gray-700 text-[#ffd875]"
                        : "text-gray-200 hover:text-whtie "
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Năm sản xuất Filter */}
            <div>
              <p className="mb-2 font-semibold">Năm sản xuất:</p>
              <div className="flex flex-wrap gap-2">
                {releaseYearOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() =>
                      handleFilterChange("nam_phat_hanh", option.value)
                    }
                    className={`rounded-lg px-3 py-1.5 ${
                      filters.nam_phat_hanh === option.value
                        ? "border border-gray-700 text-[#ffd875]"
                        : "text-gray-200 hover:text-whtie "
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Sắp xếp Filter */}
            <div>
              <p className="mb-2 font-semibold">Sắp xếp:</p>
              <div className="flex flex-wrap gap-2">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() =>
                      handleFilterChange("sort_field", option.value)
                    }
                    className={`rounded-lg px-3 py-1.5 ${
                      filters.sort_field === option.value
                        ? "border border-gray-700 text-[#ffd875]"
                        : "text-gray-200 hover:text-whtie "
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
                <button
                  onClick={() =>
                    handleFilterChange(
                      "sort_type",
                      filters.sort_type === "desc" ? "asc" : "desc"
                    )
                  }
                  className={`rounded-[4px] px-3 py-1 transition-colors duration-200 ${
                    filters.sort_type === "desc"
                      ? "border border-gray-700 text-[#ffd875]"
                      : "text-gray-200 hover:text-whtie "
                  }`}
                >
                  {filters.sort_type === "desc" ? "Giảm dần" : "Tăng dần"}
                </button>
              </div>
            </div>

            <div className="flex justify-start gap-2 mt-4">
              <button
                onClick={handleApplyFilters} // Gọi hàm handleApplyFilters để tìm kiếm
                className="rounded-full border border-[#ffd785] bg-[#ffd785] px-4 py-2 text-xs font-semibold text-black"
              >
                Tìm Kiếm
              </button>
              <button
                onClick={() => setIsFilterExpanded(false)}
                className="rounded-full border border-white px-4 py-2 text-xs font-semibold text-white "
              >
                Đóng
              </button>
            </div>
          </div>
        )}
      </div>

      {error && <div className="mt-8 text-center text-red-500">{error}</div>}
      {!loading && !error && movies.length === 0 && (
        <div className="mt-8 text-center text-gray-400">
          Không tìm thấy phim nào phù hợp.
        </div>
      )}

      {!loading && !error && movies.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {movies.map((movie) => {
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
                        className="fill-[#ffd785] transition-colors duration-200"
                      />
                      <path
                        d="M35.7461509,22.4942263 L45.1405996,36.5858994 C46.059657,37.9644855 45.6871354,39.8270935 44.3085493,40.7461509 C43.8157468,41.0746859 43.2367237,41.25 42.6444487,41.25 L23.8555513,41.25 C22.198697,41.25 20.8555513,39.9068542 20.8555513,38.25 C20.8555513,37.657725 21.0308654,37.078702 21.3594004,36.5858994 L30.7538491,22.4942263 C31.6729065,21.1156403 33.5355145,20.7431187 34.9141006,21.662176 C35.2436575,21.8818806 35.5264463,22.1646695 35.7461509,22.4942263 Z"
                        fill="#000000"
                        transform="translate(33.25, 30) rotate(-270) translate(-33.25, -30)"
                      />
                    </svg>
                  </div>
                  <div className="absolute bottom-2 lg:bottom-0 left-2 lg:left-1/2 transform -translate-x-0 lg:-translate-x-1/2 flex flex-col lg:flex-row z-20 text-[10px] lg:text-[11px] font-semibold leading-tight text-white gap-1 lg:gap-0">
                    <span
                      className="whitespace-nowrap px-2 py-0.5 lg:py-1 rounded-md lg:rounded-none lg:rounded-tl-md bg-[#5e6070]"
                      aria-label={`Tình trạng phim: ${movie.episode_current}`}
                    >
                      {rutGonTinhTrangPhim(movie.episode_current)}
                    </span>
                    <span
                      className="whitespace-nowrap w-fit px-2 py-0.5 lg:py-1 rounded-md lg:rounded-none lg:rounded-tr-md bg-[#2ca35d]"
                      aria-label={`Ngôn ngữ phim: ${movie.lang}`}
                    >
                      {rutGonTinhTrangNgonNgu(movie.lang)}
                    </span>
                  </div>
                  <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-3xl rounded-md py-1 px-2 shadow-md">
                    <div className="flex flex-row items-center gap-1 font-bold justify-center text-white text-[10px] lg:text-xs leading-tight">
                      <p className="text-[#f0d25c]">IMDb</p>
                      <p className="flex items-center">
                        {movie.tmdb.vote_average === 0
                          ? 10
                          : movie.tmdb.vote_average.toFixed(1)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 pb-4">
                  <p
                    className="line-clamp-2 text-[13px] font-semibold text-gray-200 hover:text-[#ffd785]"
                    title={movie.name}
                  >
                    {movie.name}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      )}

      <nav className="mt-4 flex flex-wrap items-center justify-center gap-2">
        {currentPage > 1 && (
          <button
            onClick={() => handlePageChange(currentPage - 1)}
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

        {fixedPageNumbers.map((p) => (
          <button
            key={p}
            onClick={() => handlePageChange(p)}
            className={`flex h-8 w-8 items-center justify-center rounded-[4px] border text-sm ${
              currentPage === p
                ? "border-[#ffd785] text-white"
                : "border-gray-600 bg-[#23252b] text-gray-300 hover:bg-gray-600"
            }`}
            disabled={loading}
          >
            {p}
          </button>
        ))}

        {currentPage < 5 && (
          <button
            onClick={() => handlePageChange(currentPage + 1)}
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
    </div>
  );
}
