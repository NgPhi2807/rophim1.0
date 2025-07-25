import { useEffect, useState, useRef } from "react";
import logo from "../assets/logo.png";
export const BASE_IMAGE_URL = "https://ik.imagekit.io/17mpki7mv/motchill";
const BASE_URL = "https://phimapi.com";

const SearchIcon = () => (
  <svg
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    className="h-5 w-5"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const DropdownArrowIcon = ({ open }) => (
  <svg
    className={`h-4 w-4 transform transition-transform duration-300 ${
      open ? "rotate-180" : ""
    }`}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 9l-7 7-7-7"
    />
  </svg>
);

const MobileMenuIcon = ({ open }) => (
  <svg
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden="true"
  >
    {open ? (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    ) : (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 6h16M4 12h16M4 18h16"
      />
    )}
  </svg>
);

export default function Header() {
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

  const staticQuocGiaList = [
    { id: 1, label: "Việt Nam", value: "viet-nam" },
    { id: 2, label: "Hàn Quốc", value: "han-quoc" },
    { id: 3, label: "Mỹ", value: "au-my" },
    { id: 4, label: "Trung Quốc", value: "trung-quoc" },
    { id: 5, label: "Nhật Bản", value: "nhat-ban" },
    { id: 6, label: "Thái Lan", value: "thai-lan" },
    { id: 7, label: "Ấn Độ", value: "an-do" },
    { id: 8, label: "Pháp", value: "phap" },
    { id: 9, label: "Anh", value: "anh" },
    { id: 10, label: "Nga", value: "nga" },
    { id: 11, label: "Đức", value: "duc" },
    { id: 12, label: "Ý", value: "y" },
    { id: 13, label: "Tây Ban Nha", value: "tay-ban-nha" },
    { id: 14, label: "Úc", value: "uc" },
    { id: 15, label: "Canada", value: "canada" },
    { id: 16, label: "Philippines", value: "philippines" },
    { id: 17, label: "Indonesia", value: "indonesia" },
    { id: 18, label: "Singapore", value: "singapore" },
    { id: 19, label: "Malaysia", value: "malaysia" },
    { id: 20, label: "Hong Kong", value: "hong-kong" },
    { id: 21, label: "Mexico", value: "mexico" },
    { id: 22, label: "Đan Mạch", value: "dan-mach" },
    { id: 23, label: "Thụy Điển", value: "thuy-dien" },
    { id: 24, label: "Thụy Sĩ", value: "thuy-si" },
    { id: 25, label: "Ukraina", value: "ukraina" },
    { id: 26, label: "Ba Lan", value: "ba-lan" },
    { id: 27, label: "Bồ Đào Nha", value: "bo-dao-nha" },
    { id: 28, label: "UAE", value: "u-a-e" },
    { id: 29, label: "Đài Loan", value: "dai-loan" },
    { id: 30, label: "Ả Rập Xê Út", value: "a-rap-xe-ut" },
    { id: 31, label: "Thổ Nhĩ Kỳ", value: "tho-nhi-ky" },
    { id: 32, label: "Brazil", value: "brazil" },
    { id: 33, label: "Nam Phi", value: "nam-phi" },
    { id: 34, label: "Na Uy", value: "na-uy" },
    { id: 35, label: "Châu Phi", value: "chau-phi" },
    { id: 36, label: "Quốc Gia Khác", value: "quoc-gia-khac" },
  ];

  // API Data States (remain as is, using static data)
  const [theLoaiList, setTheLoaiList] = useState(staticTheLoaiList);
  const [quocGiaList, setQuocGiaList] = useState(staticQuocGiaList);

  // UI States
  const [showTheLoai, setShowTheLoai] = useState(false);
  const [showQuocGia, setShowQuocGia] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Desktop Search States
  const [desktopSearchQuery, setDesktopSearchQuery] = useState("");
  const [desktopSearchResults, setDesktopSearchResults] = useState([]);
  const [showDesktopSearchResults, setShowDesktopSearchResults] =
    useState(false);
  const [isDesktopSearching, setIsDesktopSearching] = useState(false);

  // Mobile Search States
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const [mobileSearchResults, setMobileSearchResults] = useState([]);
  const [showMobileSearchResults, setShowMobileSearchResults] = useState(false);
  const [isMobileSearching, setIsMobileSearching] = useState(false);

  // Refs
  const theLoaiRef = useRef(null);
  const quocGiaRef = useRef(null);
  const desktopSearchRef = useRef(null);
  const mobileMenuPanelRef = useRef(null);
  const mobileSearchInputRef = useRef(null); // Used for focus
  const desktopSearchInputRef = useRef(null);
  const headerRef = useRef(null); // Ref for the main header element

  // === EFFECTS ===

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeAllPopups(); // Use the consolidated function
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close desktop dropdowns
      if (theLoaiRef.current && !theLoaiRef.current.contains(event.target))
        setShowTheLoai(false);
      // Fixed typo: quocGocgiaRef -> quocGiaRef
      if (quocGiaRef.current && !quocGiaRef.current.contains(event.target))
        setShowQuocGia(false);
      if (
        desktopSearchRef.current &&
        !desktopSearchRef.current.contains(event.target)
      )
        setShowDesktopSearchResults(false);

      // Handle closing mobile menu if click outside the menu panel and not on its toggle button
      if (
        mobileMenuOpen &&
        mobileMenuPanelRef.current &&
        !mobileMenuPanelRef.current.contains(event.target) &&
        headerRef.current &&
        !headerRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }

      // Handle closing mobile search results if click outside input and results dropdown
      if (
        mobileSearchInputRef.current &&
        !mobileSearchInputRef.current.contains(event.target) &&
        !event.target.closest(".mobile-search-results-dropdown")
      ) {
        setShowMobileSearchResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  // Real-time Desktop Search Effect with 200ms delay
  useEffect(() => {
    if (desktopSearchQuery.trim().length < 2) {
      setDesktopSearchResults([]);
      setShowDesktopSearchResults(false);
      return;
    }

    setIsDesktopSearching(true);

    const handler = setTimeout(async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/v1/api/tim-kiem?keyword=${encodeURIComponent(
            desktopSearchQuery
          )}`
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        const resultsArray = data.data.items || data || [];
        const hasResults = resultsArray.length > 0;

        setDesktopSearchResults(resultsArray);
        setShowDesktopSearchResults(
          hasResults && desktopSearchQuery.trim().length >= 2
        );
      } catch (error) {
        setDesktopSearchResults([]);
        setShowDesktopSearchResults(false);
      } finally {
        setIsDesktopSearching(false);
      }
    }, 200);

    return () => {
      clearTimeout(handler);
      setIsDesktopSearching(false);
    };
  }, [desktopSearchQuery]);

  // Real-time Mobile Search Effect with 200ms delay
  useEffect(() => {
    if (mobileSearchQuery.trim().length < 2) {
      setMobileSearchResults([]);
      setShowMobileSearchResults(false);
      return;
    }

    setIsMobileSearching(true);

    const handler = setTimeout(async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/v1/api/tim-kiem?keyword=${encodeURIComponent(
            mobileSearchQuery
          )}`
        );
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        const resultsArray = data.data.items || data || [];
        const hasResults = resultsArray.length > 0;

        setMobileSearchResults(resultsArray);
        setShowMobileSearchResults(
          hasResults && mobileSearchQuery.trim().length >= 2
        );
      } catch (error) {
        console.error("Lỗi khi tìm kiếm trên mobile:", error);
        setMobileSearchResults([]);
        setShowMobileSearchResults(false);
      } finally {
        setIsMobileSearching(false);
      }
    }, 200);

    return () => {
      clearTimeout(handler);
      setIsMobileSearching(false);
    };
  }, [mobileSearchQuery]);

  const closeAllPopups = () => {
    setShowTheLoai(false);
    setShowQuocGia(false);
    setShowDesktopSearchResults(false);
    setShowMobileSearchResults(false);
    setMobileMenuOpen(false);
    setDesktopSearchQuery("");
    setMobileSearchQuery("");
  };

  // Helper function for handling internal navigation links
  const handleInternalNavLinkClick = (e, href) => {
    e.preventDefault(); // Prevent default <a> behavior
    window.location.href = href; // Manually navigate
    closeAllPopups(); // Then close all popups
  };

  const handleDesktopSearchSubmit = (e) => {
    e.preventDefault();
    if (desktopSearchQuery.trim()) {
      window.location.href = `/tim-kiem?q=${encodeURIComponent(
        desktopSearchQuery
      )}`;
      setShowDesktopSearchResults(false);
    }
  };

  const handleMobileSearchSubmit = (e) => {
    e.preventDefault();
    if (mobileSearchQuery.trim()) {
      window.location.href = `/tim-kiem?q=${encodeURIComponent(
        mobileSearchQuery
      )}`;
      setShowMobileSearchResults(false);
      setMobileSearchQuery("");
      setMobileMenuOpen(false);
    }
  };

  const handleDesktopSearchResultClick = (movie) => {
    setDesktopSearchQuery("");
    setShowDesktopSearchResults(false);
    window.location.href = `/phim/${movie.slug}`;
  };

  const handleMobileSearchResultClick = (movie) => {
    setMobileSearchQuery("");
    setShowMobileSearchResults(false);
    window.location.href = `/phim/${movie.slug}`;
  };

  const toggleDropdown = (dropdown) => {
    if (dropdown === "theloai") {
      setShowTheLoai((p) => !p);
      setShowQuocGia(false);
    } else if (dropdown === "quocgia") {
      setShowQuocGia((p) => !p);
      setShowTheLoai(false);
    }
  };

  const handleDropdownKeyDown = (event, dropdown) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleDropdown(dropdown);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      toggleDropdown(dropdown);
    }
  };

  const SearchResultsDropdown = ({
    results,
    isSearching,
    searchQueryLength,
    onResultClick,
    searchType,
  }) => (
    <div className="p-2" role="listbox" aria-label="Kết quả tìm kiếm">
      {isSearching ? (
        <div
          className="p-4 text-center text-white/60 text-xs"
          role="status"
          aria-live="polite"
        >
          Đang tìm kiếm phim
        </div>
      ) : results.length > 0 ? (
        <>
          {results.slice(0, 5).map((movie) => (
            <div
              key={movie.id}
              onClick={(e) => {
                e.preventDefault(); // Prevent div default click
                e.stopPropagation();
                onResultClick(movie);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onResultClick(movie);
                }
              }}
              className="flex cursor-pointer items-center space-x-3 rounded-md px-3 py-3 transition-all duration-200  focus:bg-white/10 focus:outline-none"
              role="option"
              tabIndex={0}
              aria-selected={false}
              aria-label={`Phim ${movie.name}, ${movie.episode_current}, ${movie.lang}`}
            >
              <img
                src={`${BASE_IMAGE_URL}/${movie.poster_url}?tr=f-webp,w-300,h-450,fo-auto,q-85`}
                alt=""
                className="h-16 w-12 flex-shrink-0 rounded-[4px] object-fill"
                onError={(e) => {
                  e.target.src = "/placeholder-image.jpg";
                }}
                aria-hidden="true"
              />
              <div className="min-w-0 flex-1">
                <h4 className="truncate text-sm font-medium text-white hover:text-[#ffd785]">
                  {movie.name}
                </h4>
                <p className="truncate text-xs text-white/60">
                  {movie.episode_current} • {movie.lang}
                </p>
              </div>
            </div>
          ))}
          {results.length > 5 && (
            <a
              href={`/tim-kiem?q=${encodeURIComponent(
                (searchType === "desktop"
                  ? desktopSearchQuery
                  : mobileSearchQuery) || ""
              ).trim()}`}
              className="block border-t border-white/10 px-3 py-2 text-center text-sm text-white hover:text-[#ffd785]"
              onClick={(e) =>
                handleInternalNavLinkClick(
                  e,
                  `/tim-kiem?q=${encodeURIComponent(
                    (searchType === "desktop"
                      ? desktopSearchQuery
                      : mobileSearchQuery) || ""
                  ).trim()}`
                )
              }
              aria-label={`Xem tất cả ${results.length} kết quả tìm kiếm`}
            >
              Xem tất cả ({results.length} kết quả)
            </a>
          )}
        </>
      ) : (
        <div
          className="p-4 text-center text-white/60"
          role="status"
          aria-live="polite"
        >
          {searchQueryLength < 2
            ? "Nhập ít nhất 2 ký tự để tìm kiếm."
            : "Không tìm thấy kết quả."}
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Overlay for mobile menu/search results - Only appears if mobile menu or search results are open */}
      {(showMobileSearchResults && mobileSearchQuery.length >= 2) ||
      mobileMenuOpen ? (
        <div
          onClick={closeAllPopups}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              closeAllPopups();
            }
          }}
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          role="button"
          tabIndex={0}
          aria-label="Đóng overlay"
        ></div>
      ) : null}

      <header
        ref={headerRef}
        className={`z-50 mx-auto max-w-screen-xl transition-colors duration-300 ease-in-out ${
          scrolled ||
          mobileMenuOpen ||
          (mobileSearchQuery.length >= 2 && showMobileSearchResults)
            ? "bg-[#020202]"
            : "bg-transparent"
        } sm:fixed sm:left-0 sm:right-0 sm:top-0`}
        role="banner"
      >
        <div className="relative md:mx-auto md:container flex h-16 w-full items-center justify-between px-3 lg:px-7 md:h-18">
          <div className="flex flex-grow items-center gap-2 lg:gap-4">
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen((p) => !p)}
                className="text-white/80 hover:text-white focus:text-white"
                aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
              >
                <MobileMenuIcon open={mobileMenuOpen} />
              </button>
            </div>
            <a
              href="/"
              className="flex-shrink-0 rounded-md"
              aria-label="Trang chủ"
              onClick={(e) => handleInternalNavLinkClick(e, "/")}
            >
              <img
                src={typeof logo === "string" ? logo : logo.src}
                alt="Logo trang web phim"
                className="h-9 lg:h-10 w-auto mb-2"
              />
            </a>
            <div className="relative flex-grow lg:hidden">
              <form
                onSubmit={handleMobileSearchSubmit}
                className="relative flex-grow"
                role="search"
              >
                <label htmlFor="mobile-search" className="sr-only">
                  Tìm kiếm phim
                </label>
                <input
                  ref={mobileSearchInputRef}
                  id="mobile-search"
                  type="text"
                  value={mobileSearchQuery}
                  onChange={(e) => setMobileSearchQuery(e.target.value)}
                  onFocus={() => {
                    if (
                      mobileSearchQuery.trim().length >= 2 ||
                      mobileSearchResults.length > 0
                    ) {
                      setShowMobileSearchResults(true);
                    }
                  }}
                  placeholder="Tìm kiếm phim..."
                  className="h-8 w-full rounded-[4px] bg-white/10 px-4 pr-10 text-white placeholder-white/60 text-sm focus:outline-none"
                  autoComplete="off"
                  aria-describedby={
                    showMobileSearchResults
                      ? "mobile-search-results"
                      : undefined
                  }
                  aria-expanded={showMobileSearchResults}
                  aria-autocomplete="list"
                  role="combobox"
                />
                {mobileSearchQuery.length > 0 ? (
                  <button
                    type="button"
                    onClick={() => {
                      setMobileSearchQuery("");
                      setShowMobileSearchResults(false);
                    }}
                    className="absolute right-0 top-0 h-full rounded-[4px] px-3 text-white/70 hover:text-white focus:outline-none"
                    aria-label="Xóa tìm kiếm"
                  >
                    <CloseIcon />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="absolute right-0 top-0 h-full rounded-[4px] px-3 text-white/70 hover:text-white focus:outline-none"
                    aria-label="Tìm kiếm"
                  >
                    <SearchIcon />
                  </button>
                )}
              </form>
            </div>
            {/* Desktop Navigation (hidden on mobile) */}
            <nav
              className="hidden items-center space-x-2 text-sm xl:flex"
              role="navigation"
              aria-label="Menu chính"
            >
              {[
                { href: "/loai-phim/phim-le", label: "Phim Lẻ" },
                { href: "/loai-phim/phim-bo", label: "Phim Bộ" },
                { href: "/loai-phim/hoat-hinh", label: "Hoạt Hình" },
                { href: "/loai-phim/phim-chieu-rap", label: "Phim Chiếu Rạp" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="group relative px-3 py-2 font-medium text-white/90 transition-all duration-300 hover:text-[#ffd785]"
                  onClick={(e) => handleInternalNavLinkClick(e, link.href)}
                >
                  {link.label}
                </a>
              ))}

              <div className="relative" ref={theLoaiRef}>
                <button
                  onClick={() => toggleDropdown("theloai")}
                  onKeyDown={(e) => handleDropdownKeyDown(e, "theloai")}
                  className="flex items-center space-x-2 px-3 py-2 font-medium text-white/90 transition-all duration-300 hover:text-white"
                  aria-expanded={showTheLoai}
                  aria-haspopup="true"
                  aria-controls="theloai-dropdown"
                  id="theloai-button"
                >
                  <span>Thể Loại</span>
                  <DropdownArrowIcon open={showTheLoai} />
                </button>
                {showTheLoai && (
                  <div
                    className="absolute left-0 top-full z-[51] mt-2 w-80 overflow-hidden rounded-lg bg-[#23252b] shadow-2xl backdrop-blur-xl"
                    role="menu"
                    aria-labelledby="theloai-button"
                    id="theloai-dropdown"
                  >
                    <div className="p-2">
                      <div className="grid grid-cols-3 gap-1">
                        {theLoaiList.map((item) => (
                          <a
                            key={item.id}
                            href={`/the-loai/${item.slug}`}
                            className="block px-3 py-2 text-sm text-white/80 hover:text-[#ffd785]"
                            onClick={(e) =>
                              handleInternalNavLinkClick(
                                e,
                                `/the-loai/${item.slug}`
                              )
                            }
                            role="menuitem"
                          >
                            {item.ten}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="relative" ref={quocGiaRef}>
                <button
                  onClick={() => toggleDropdown("quocgia")}
                  onKeyDown={(e) => handleDropdownKeyDown(e, "quocgia")}
                  className="flex items-center space-x-2 px-3 py-2 font-medium text-white/90 transition-all duration-300 hover:text-white"
                  aria-expanded={showQuocGia}
                  aria-haspopup="true"
                  aria-controls="quocgia-dropdown"
                  id="quocgia-button"
                >
                  <span>Quốc Gia</span>
                  <DropdownArrowIcon open={showQuocGia} />
                </button>
                {showQuocGia && (
                  <div
                    className="absolute left-0 top-full z-[51] mt-2 w-96 overflow-hidden rounded-lg  bg-[#23252b] shadow-2xl backdrop-blur-xl"
                    role="menu"
                    aria-labelledby="quocgia-button"
                    id="quocgia-dropdown"
                  >
                    <div className="p-2">
                      <div className="grid grid-cols-3 gap-1">
                        {quocGiaList.map((item) => (
                          <a
                            key={item.id}
                            href={`/quoc-gia/${item.value}`}
                            className="block rounded-lg px-3 py-2 text-sm text-white/80 transition-all hover:text-[#ffd785]"
                            onClick={(e) =>
                              handleInternalNavLinkClick(
                                e,
                                `/quoc-gia/${item.value}`
                              )
                            }
                            role="menuitem"
                          >
                            {item.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </nav>
          </div>

          <div className="flex items-center space-x-2 px-0 lg:px-1">
            <div ref={desktopSearchRef} className="relative hidden lg:block">
              <form
                onSubmit={handleDesktopSearchSubmit}
                className="relative"
                role="search"
              >
                <label htmlFor="desktop-search" className="sr-only">
                  Tìm kiếm phim
                </label>
                <input
                  ref={desktopSearchInputRef}
                  id="desktop-search"
                  type="text"
                  value={desktopSearchQuery}
                  onChange={(e) => setDesktopSearchQuery(e.target.value)}
                  onFocus={() => {
                    if (
                      desktopSearchQuery.trim().length >= 2 ||
                      desktopSearchResults.length > 0
                    ) {
                      setShowDesktopSearchResults(true);
                    }
                  }}
                  placeholder="Tìm kiếm phim..."
                  className="rounded-lg w-[22rem] bg-[#ffffff14] px-3 py-2 pr-12 text-sm text-white placeholder-white/60 focus:outline-none"
                  autoComplete="off"
                  aria-describedby={
                    showDesktopSearchResults ? "search-results" : undefined
                  }
                  aria-expanded={showDesktopSearchResults}
                  aria-autocomplete="list"
                  role="combobox"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 flex h-6 -translate-y-1/2 transform items-center gap-2 border-l border-white/30 pl-3 text-white/70 transition-colors hover:text-white"
                  aria-label="Tìm kiếm"
                >
                  <SearchIcon />
                </button>
              </form>
              {showDesktopSearchResults && desktopSearchQuery.length > 1 && (
                <div
                  className="absolute right-0 top-full z-50 mt-2 max-h-[60vh] w-full overflow-y-auto rounded-lg bg-[#1a1c22] shadow-2xl backdrop-blur-xl"
                  id="search-results"
                >
                  <SearchResultsDropdown
                    results={desktopSearchResults}
                    isSearching={isDesktopSearching}
                    searchQueryLength={desktopSearchQuery.length}
                    onResultClick={handleDesktopSearchResultClick}
                    searchType="desktop"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {showMobileSearchResults && mobileSearchQuery.length > 1 && (
          <div
            className="mobile-search-results-dropdown absolute left-0 right-0 top-16 z-[51] max-h-[80vh] overflow-y-auto rounded-md  bg-[#1f1f29] shadow-2xl backdrop-blur-xl lg:hidden"
            onClick={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
            id="mobile-search-results"
          >
            <SearchResultsDropdown
              results={mobileSearchResults}
              isSearching={isMobileSearching}
              searchQueryLength={mobileSearchQuery.length}
              onResultClick={handleMobileSearchResultClick}
              searchType="mobile"
            />
          </div>
        )}

        {mobileMenuOpen && (
          <div
            ref={mobileMenuPanelRef}
            className="absolute left-4 right-4 top-16 w-[70%] z-[51] border-t border-white/10 bg-[#1f1f29] text-sm backdrop-blur-xl lg:hidden rounded-lg"
            id="mobile-menu"
            role="navigation"
            aria-label="Menu di động"
          >
            <div className="space-y-1 px-2 py-2 grid grid-cols-2">
              {[
                { href: "/loai-phim/phim-le", label: "Phim Lẻ" },
                { href: "/loai-phim/phim-bo", label: "Phim Bộ" },
                { href: "/loai-phim/hoat-hinh", label: "Hoạt Hình" },
                { href: "/loai-phim/phim-chieu-rap", label: "Phim Chiếu Rạp" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="block rounded-md px-4 py-2 text-white/90 transition-all hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white"
                  onClick={(e) => handleInternalNavLinkClick(e, link.href)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
