import { useRef, useEffect, useState } from "react";
import { rutGonTinhTrangPhim1 } from "../utils/movieUtils";

// 1. Thêm prop 'gradient' vào danh sách tham số
export default function MovieCard2({
  movies = [],
  title = "Phim Mới",
  gradient = "",
}) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const GAP_PX = 12;

  // 2. Tạo đối tượng style cho tiêu đề dựa trên prop 'gradient'
  const titleStyle = gradient
    ? {
        backgroundImage: gradient,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }
    : {};

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
  }, [movies]);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const firstItem = el.querySelector(".movie-card-item");
    if (!firstItem) return;
    const scrollAmount = (firstItem.offsetWidth + GAP_PX) * 3;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  if (movies.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col py-1 lg:py-4 lg:flex-row sm:gap-6">
      <div className="flex-shrink-0 pb-4 sm:w-48 sm:pb-0">
        <div className="flex justify-between sm:block">
          <h2
            id={`${title.replace(/\s+/g, "-")}-heading`}
            className="text-lg font-bold font-segoe text-white lg:text-2xl leading-tight"
            style={titleStyle}
          >
            <span className="hidden lg:block">
              {title.split(" ").slice(0, 2).join(" ")}
              <br />
              {title.split(" ").slice(2).join(" ")}
            </span>

            <span className="block lg:hidden">{title}</span>
          </h2>

          <a
            href="/danh-sach/phim-moi"
            className="text-xs text-gray-200 transition-colors hover:text-[#FFDE8A] mt-1 sm:mt-2 block sm:inline-block font-semibold"
          >
            Xem toàn bộ
          </a>
        </div>
      </div>

      <div className="relative flex-1 min-w-0">
        <div
          ref={scrollRef}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
          style={{ gap: `${GAP_PX}px` }}
        >
          {movies.map((movie, index) => {
            const {
              id,
              slug,
              name,
              thumb_url,
              year,
              episode_current,
              origin_name,
            } = movie;
            const thumb_url1 = `https://ik.imagekit.io/17mpki7mv/motchill/${thumb_url}?tr=f-webp,w-800,h-450,fo-auto,q-85`;
            const movieKey = id || slug || `movie-${index}`;
            const displayStatus = rutGonTinhTrangPhim1(episode_current);
            return (
              <a
                key={movieKey}
                href={`/phim/${slug}`}
                title={name}
                className="group movie-card-item movie-card-row1"
                aria-label={`Xem phim ${name}`}
              >
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md">
                  <img
                    src={thumb_url1}
                    alt={`Poster phim ${name}`}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />

                  <div
                    className="absolute bottom-0 left-0 h-[40%] w-full rounded-b-md"
                    style={{
                      background:
                        "linear-gradient(to top,rgba(30, 30, 30, 0.8) 5%, transparent 100%)",
                    }}
                    aria-hidden="true"
                  />
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
                  <div className="absolute bottom-2 left-2 z-20 flex items-center text-[12px] font-bold text-white">
                    <span>{displayStatus}</span>
                    <span className="mx-1 text-white/70">|</span>
                    <span>{year}</span>
                  </div>
                </div>
                <div className="p-3">
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
          className={`absolute left-0 top-14 z-30 hidden -translate-x-1/2  transform items-center justify-center rounded-full bg-white p-1 text-black transition-opacity md:flex ${
            canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-label={`Cuộn trái phần ${title}`}
          disabled={!canScrollLeft}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12z"
            />
          </svg>
        </button>
        <button
          onClick={() => scroll("right")}
          className={`absolute right-0 top-14 z-30 hidden translate-x-1/2 transform items-center justify-center rounded-full bg-white p-1 text-black transition-opacity md:flex ${
            canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-label={`Cuộn phải phần ${title}`}
          disabled={!canScrollRight}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
