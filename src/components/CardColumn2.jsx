import React, { useRef, useEffect, useState, useCallback } from "react";
import {
  rutGonTinhTrangPhim,
  rutGonTinhTrangNgonNgu,
} from "../utils/movieUtils";

export default function MovieCard({ movies = [], title = "Phim" }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const GAP_PX = 8;

  const clipPathLeft =
    "polygon(94.239% 100%, 5.761% 100%, 5.761% 100%, 4.826% 99.95%, 3.94% 99.803%, 3.113% 99.569%, 2.358% 99.256%, 1.687% 98.87%, 1.111% 98.421%, .643% 97.915%, .294% 97.362%, .075% 96.768%, 0 96.142%, 0 3.858%, 0 3.858%, .087% 3.185%, .338% 2.552%, .737% 1.968%, 1.269% 1.442%, 1.92% .984%, 2.672% .602%, 3.512% .306%, 4.423% .105%, 5.391% .008%, 6.4% .024%, 94.879% 6.625%, 94.879% 6.625%, 95.731% 6.732%, 96.532% 6.919%, 97.272% 7.178%, 97.942% 7.503%, 98.533% 7.887%, 99.038% 8.323%, 99.445% 8.805%, 99.747% 9.326%, 99.935% 9.88%, 100% 10.459%, 100% 96.142%, 100% 96.142%, 99.925% 96.768%, 99.706% 97.362%, 99.357% 97.915%, 98.889% 98.421%, 98.313% 98.87%, 97.642% 99.256%, 96.887% 99.569%, 96.06% 99.803%, 95.174% 99.95%, 94.239% 100%)";

  const clipPathRight =
    "polygon(5.761% 100%, 94.239% 100%, 94.239% 100%, 95.174% 99.95%, 96.06% 99.803%, 96.887% 99.569%, 97.642% 99.256%, 98.313% 98.87%, 98.889% 98.421%, 99.357% 97.915%, 99.706% 97.362%, 99.925% 96.768%, 100% 96.142%, 100% 3.858%, 100% 3.858%, 99.913% 3.185%, 99.662% 2.552%, 99.263% 1.968%, 98.731% 1.442%, 98.08% .984%, 97.328% .602%, 96.488% .306%, 95.577% .105%, 94.609% .008%, 93.6% .024%, 5.121% 6.625%, 5.121% 6.625%, 4.269% 6.732%, 3.468% 6.919%, 2.728% 7.178%, 2.058% 7.503%, 1.467% 7.887%, .962% 8.323%, .555% 8.805%, .253% 9.326%, .065% 9.88%, 0% 10.459%, 0% 96.142%, 0% 96.142%, .075% 96.768%, .294% 97.362%, .643% 97.915%, 1.111% 98.421%, 1.687% 98.87%, 2.358% 99.256%, 3.113% 99.569%, 3.94% 99.803%, 4.826% 99.95%, 5.761% 100%)";

  if (!movies || movies.length === 0) {
    return null;
  }

  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const hasScrollableContent = el.scrollWidth > el.clientWidth;
    const scrollEndThreshold = Math.round(el.scrollWidth - el.clientWidth);
    if (hasScrollableContent) {
      setCanScrollLeft(el.scrollLeft > 5);
      setCanScrollRight(el.scrollLeft < scrollEndThreshold - 5);
    } else {
      setCanScrollLeft(false);
      setCanScrollRight(false);
    }
  }, []);

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
  }, [movies, updateScrollButtons]);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const firstItem = el.querySelector(".movie-card-item");
    if (!firstItem) return;
    const itemWidth = firstItem.offsetWidth + GAP_PX;
    const scrollAmount = direction === "left" ? -itemWidth : itemWidth;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  const getFullPosterUrl = (poster_url) => {
    return `https://ik.imagekit.io/17mpki7mv/motchill/${poster_url}?tr=f-webp,w-300,h-450,fo-auto,q-85`;
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
          {movies.map((movie, index) => {
            const {
              id,
              slug,
              name,
              poster_url,
              episode_current,
              lang,
              origin_name,
            } = movie;
            const movieKey = id || slug;
            const fullPosterUrl = getFullPosterUrl(poster_url);
            const cardClipPath = index % 2 === 0 ? clipPathLeft : clipPathRight;

            return (
              <a
                key={movieKey}
                href={`/phim/${slug}`}
                title={name}
                className="group movie-card-item movie-card-width"
                aria-label={`Xem phim ${name}`}
              >
                <div
                  className="relative aspect-[2/3] w-full overflow-hidden rounded-[4px] "
                  style={{
                    clipPath: cardClipPath,
                    WebkitClipPath: cardClipPath,
                  }}
                >
                  <img
                    src={fullPosterUrl}
                    alt={`Poster phim ${name}`}
                    className="h-full w-full object-cover brightness-110 rounded-[4px] transition-all duration-200 hover:border-yellow-300 hover:border-2"
                    loading="lazy"
                    width="300"
                    height="450"
                  />
                  <div
                    className="absolute bottom-0 left-0 h-[50%] w-full rounded-b-[4px]"
                    style={{
                      background:
                        "linear-gradient(to top,black 10%, transparent 100%)",
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

                  {/* ĐÃ XÓA "TOP {index}" TẠI ĐÂY */}

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

                <div className="py-2 flex items-center gap-x-2.5">
                  <span className="text-4xl font-black bg-clip-text text-transparent bg-[linear-gradient(39deg,rgba(254,207,89,1),rgba(255,241,204,1))] -mt-1 font-segoe italic">
                    {index + 1}
                  </span>

                  <div className="flex-grow min-w-0">
                    <h3
                      className="line-clamp-1 text-[13px] font-semibold text-gray-200 hover:text-[#FFDE8A]"
                      title={name}
                    >
                      {name}
                    </h3>
                    <p
                      className="line-clamp-1 text-[12px] font-medium text-gray-400"
                      dangerouslySetInnerHTML={{ __html: origin_name }}
                    ></p>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <button
          onClick={() => scroll("left")}
          className={`absolute left-0 z-30  lg:top-[7.5rem] xl:top-[6.5rem] sm:flex hidden h-8 w-8 items-center justify-center transition-opacity duration-300 py-1 hover:scale-110 cursor-pointer ${
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
          className={`absolute right-0 z-30 sm:flex hidden lg:top-[7.5rem] xl:top-[6.5rem] h-8 w-8 items-center justify-center transition-opacity duration-300 py-1 hover:scale-110 cursor-pointer ${
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
