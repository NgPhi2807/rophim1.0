import { useRef, useEffect, useState } from "react";
import {
  rutGonTinhTrangPhim,
  rutGonTinhTrangNgonNgu,
} from "../utils/movieUtils";

export default function MovieCard2({ movies = [], title = "Phim Lẻ Mới" }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const GAP_PX = 8;

  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;

    const hasScrollableContent = el.scrollWidth > el.clientWidth;
    const scrollEndThreshold = Math.ceil(el.scrollWidth - el.clientWidth);

    if (hasScrollableContent) {
      setCanScrollLeft(el.scrollLeft > 5);
      setCanScrollRight(el.scrollLeft < scrollEndThreshold - 5);
    } else {
      setCanScrollLeft(false);
      setCanScrollRight(false);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);
    const observer = new MutationObserver(updateScrollButtons);
    observer.observe(el, { childList: true, subtree: true, attributes: true });

    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
      observer.disconnect();
    };
  }, [movies]); // Phụ thuộc được cập nhật thành [movies]

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;

    const firstItem = el.querySelector(".movie-card-item");
    if (!firstItem) {
      const scrollAmount = el.clientWidth;
      el.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
      return;
    }

    const itemWidth = firstItem.offsetWidth + GAP_PX;
    const scrollAmount = direction === "left" ? -itemWidth : itemWidth;

    el.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  // Trả về null nếu không có phim nào trong danh sách
  if (movies.length === 0) {
    return null;
  }

  return (
    <section
      className="relative py-1 lg:py-4 "
      aria-labelledby={`${title.replace(/\s+/g, "-")}-heading`}
    >
      {/* Tiêu đề được giữ lại */}
      <div className="mb-4">
        <h2
          id={`${title.replace(/\s+/g, "-")}-heading`}
          className="mb-0 text-lg font-bold text-white lg:text-2xl"
        >
          {title}
        </h2>
      </div>

      {/* Vùng hiển thị phim, không còn bộ lọc */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth"
        >
          {/* Map trực tiếp từ prop `movies` */}
          {movies.map((movie, index) => {
            const {
              id,
              slug,
              name,
              thumb_url,
              year,
              episode_current,
              lang,
              origin_name,
            } = movie;
            const thumb_url1 = `https://ik.imagekit.io/17mpki7mv/motchill/${thumb_url}?tr=f-webp,w-800,h-450,fo-auto,q-85`;
            const movieKey = id || slug || `movie-${index}`;
            return (
              <a
                key={movieKey}
                href={`/phim/${slug}`}
                title={name}
                className="movie-card-item group movie-card"
                aria-label={`Xem phim ${name}`}
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md">
                  <img
                    src={thumb_url1}
                    alt={`Poster phim ${name}`}
                    className="h-full w-full object-cover brightness-100"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 rounded-[4px] bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
                    <svg viewBox="0 0 60 60" className="h-[30px] w-[30px]">
                      <circle
                        cx="30"
                        cy="30"
                        r="30"
                        className="fill-[#FFDE8A]"
                      />
                      <path
                        d="M35.746,22.494 L45.14,36.586 C46.059,37.964 45.687,39.827 44.308,40.746 C43.815,41.074 43.236,41.25 42.644,41.25 L23.855,41.25 C22.198,41.25 20.855,39.906 20.855,38.25 C20.855,37.657 21.03,37.078 21.359,36.586 L30.753,22.494 C31.672,21.116 33.535,20.743 34.914,21.662 C35.243,21.882 35.526,22.165 35.746,22.494 Z"
                        fill="#000000"
                        transform="translate(33.25, 30) rotate(-270) translate(-33.25, -30)"
                      />
                    </svg>
                  </div>
                  <div className="absolute bottom-2 lg:bottom-0 left-2 lg:left-1/2 transform -translate-x-0 lg:-translate-x-1/2 flex flex-col lg:flex-row z-20 text-[10px] lg:text-[11px] font-semibold leading-tight text-white gap-1 lg:gap-0">
                    <span
                      className="whitespace-nowrap px-2 py-0.5 lg:py-1 rounded-md lg:rounded-none lg:rounded-tl-md bg-[#5e6070]"
                      aria-label={`Tình trạng phim: ${episode_current}`}
                    >
                      {rutGonTinhTrangPhim(episode_current)}
                    </span>
                    <span
                      className="whitespace-nowrap w-fit px-2 py-0.5 lg:py-1 rounded-md lg:rounded-none lg:rounded-tr-md bg-[#2ca35d]"
                      aria-label={`Ngôn ngữ phim: ${lang}`}
                    >
                      {rutGonTinhTrangNgonNgu(lang)}
                    </span>
                  </div>
                </div>

                <div className="p-2">
                  <h3 className="line-clamp-1 text-[13px] font-semibold text-white group-hover:text-[#FFDE8A]">
                    {name}
                  </h3>
                  <p className="line-clamp-1 text-xs font-semibold text-gray-400 mt-1">
                    {origin_name}
                  </p>
                </div>
              </a>
            );
          })}
        </div>

        <button
          onClick={() => scroll("left")}
          className={`absolute left-0 z-30 top-12 hidden sm:flex md:top-16 lg:top-20 xl:top-12 h-8 w-8 items-center justify-center transition-opacity duration-300 py-0.5 hover:scale-110 cursor-pointer ${
            canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
          } sm:block hidden`}
          aria-label={`Cuộn trái phần ${title}`}
          disabled={!canScrollLeft}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            className="drop-shadow-[0_0_12px_rgba(255,255,255,0.7)] text-gray-100"
          >
            <path
              fill="currentColor"
              d="M7.94 13.06a1.5 1.5 0 0 1 0-2.12l5.656-5.658a1.5 1.5 0 1 1 2.121 2.122L11.122 12l4.596 4.596a1.5 1.5 0 1 1-2.12 2.122l-5.66-5.658Z"
            />
          </svg>
        </button>
        <button
          onClick={() => scroll("right")}
          className={`absolute right-0 z-30 hidden sm:flex md:top-16 lg:top-20 xl:top-12  h-8 w-8 items-center justify-center transition-opacity duration-300 py-0.5 hover:scale-110 cursor-pointer ${
            canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
          } sm:block hidden`}
          aria-label={`Cuộn phải phần ${title}`}
          disabled={!canScrollRight}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            className="drop-shadow-[0_0_12px_rgba(255,255,255,0.7)] text-gray-100"
          >
            <path
              fill="currentColor"
              d="M16.06 10.94a1.5 1.5 0 0 1 0 2.12l-5.656 5.658a1.5 1.5 0 1 1-2.121-2.122L12.879 12L8.283 7.404a1.5 1.5 0 0 1 2.12-2.122l5.658 5.657Z"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
