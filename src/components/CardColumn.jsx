import { useRef, useEffect, useState } from "react";

import {
  rutGonTinhTrangNgonNgu,
  rutGonTinhTrangPhim,
} from "../utils/movieUtils";

export default function MovieCard({ movies = [], title = "Phim" }) {
  const scrollRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const [canScrollRight, setCanScrollRight] = useState(true); // Initial state: can scroll right

  const GAP_PX = 8;

  if (!movies || movies.length === 0) {
    return null;
  }

  const updateScrollButtons = () => {
    const el = scrollRef.current;

    if (!el) return;
    const hasScrollableContent = el.scrollWidth > el.clientWidth;

    const scrollEndThreshold = Math.round(el.scrollWidth - el.clientWidth);

    if (hasScrollableContent) {
      setCanScrollLeft(el.scrollLeft > 5);

      setCanScrollRight(el.scrollLeft < scrollEndThreshold - 5);
    } else {
      // If content isn't scrollable, hide both buttons

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

    return () => {
      el.removeEventListener("scroll", updateScrollButtons);

      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [movies]);

  const scroll = (direction) => {
    const el = scrollRef.current;

    if (!el) return;

    const firstItem = el.querySelector(".movie-card-item");

    if (!firstItem) return;

    const itemWidth = firstItem.offsetWidth + GAP_PX;

    const scrollAmount = direction === "left" ? -itemWidth : itemWidth;

    el.scrollBy({
      left: scrollAmount,

      behavior: "smooth",
    });
  };

  return (
    <section
      className="relative h-auto px-0 py-2"
      aria-labelledby={`${title.replace(/\s+/g, "-")}-heading`}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2
          id={`${title.replace(/\s+/g, "-")}-heading`}
          className="text-lg font-bold text-white lg:text-2xl"
        >
          {title}
        </h2>
      </div>

      <div className="relative ">
        <div
          ref={scrollRef}
          className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth "
        >
          {movies.map((movie) => {
            const {
              id,
              slug,
              name,
              poster_url,
              episode_current,
              lang,
              tmdb,
              origin_name,
            } = movie;
            const movieKey = id || slug;
            const fullPosterUrl = `https://ik.imagekit.io/17mpki7mv/motchill/${poster_url}?tr=f-webp,w-300,h-450,fo-auto,q-85`;
            return (
              <a
                key={movieKey}
                href={`/phim/${slug}`}
                title={name}
                className="group movie-card-item movie-card-width "
                aria-label={`Xem phim ${name}`}
              >
                <div className="relative aspect-[2/3] w-full overflow-hidden rounded-md">
                  <img
                    src={fullPosterUrl}
                    alt={`Poster phim ${name}`}
                    className="h-full w-full object-cover brightness-100"
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
                      aria-hidden="true"
                    >
                      <circle
                        cx="30"
                        cy="30"
                        r="30"
                        className="fill-[#FFDE8A] transition-colors duration-200"
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

                  <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-3xl rounded-md py-1 px-2 shadow-md">
                    <div className="flex flex-row items-center gap-1 font-bold justify-center text-white text-[10px] lg:text-xs leading-tight">
                      <p className="text-[#f0d25c]">IMDb</p>
                      <p className="flex items-center">
                        {tmdb.vote_average === 0
                          ? 10
                          : tmdb.vote_average.toFixed(1)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="py-2 flex flex-col items-center justify-center gap-1">
                  <h3
                    className="line-clamp-1 text-[13px] font-medium text-white hover:text-[#FFDE8A]"
                    title={name}
                  >
                    {name}
                  </h3>
                  <p className="line-clamp-1 text-[12px] font-medium text-gray-400">
                    {origin_name}
                  </p>
                </div>
              </a>
            );
          })}
        </div>

        <button
          onClick={() => scroll("left")}
          className={`absolute left-0 z-30 top-[35%] sm:flex hidden h-8 w-8 items-center justify-center transition-opacity duration-300 py-1 hover:scale-110 cursor-pointer ${
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
            <g fill="none" fillRule="evenodd">
              <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />

              <path
                fill="currentColor"
                d="M7.94 13.06a1.5 1.5 0 0 1 0-2.12l5.656-5.658a1.5 1.5 0 1 1 2.121 2.122L11.122 12l4.596 4.596a1.5 1.5 0 1 1-2.12 2.122l-5.66-5.658Z"
              />
            </g>
          </svg>
        </button>

        <button
          onClick={() => scroll("right")}
          className={`absolute right-0 z-30  top-[35%] sm:flex hidden h-8 w-8 items-center justify-center transition-opacity duration-300 py-1 hover:scale-110 cursor-pointer ${
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
            <g fill="none" fillRule="evenodd">
              <path d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />

              <path
                fill="currentColor"
                d="M16.06 10.94a1.5 1.5 0 0 1 0 2.12l-5.656 5.658a1.5 1.5 0 1 1-2.121-2.122L12.879 12L8.283 7.404a1.5 1.5 0 0 1 2.12-2.122l5.658 5.657Z"
              />
            </g>
          </svg>
        </button>
      </div>
    </section>
  );
}
