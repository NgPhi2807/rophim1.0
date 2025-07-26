import React, { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "react-responsive";

import {
  rutGonTinhTrangNgonNgu,
  rutGonTinhTrangPhim1,
} from "../utils/movieUtils";

function convertImageUrlToProxy(url) {
  if (!url) {
    return "";
  }
  const index = url.indexOf("/upload/");
  if (index === -1) return "";

  const path = url.slice(index + "/upload/".length);
  return `https://ik.imagekit.io/17mpki7mv/motchill/upload/${path}?tr=w-1000,h-450,f-webp,fo-auto,q-80`;
}

const gradientMaskStyle = {
  WebkitMaskImage: `
    linear-gradient(to bottom, rgba(0,0,0,1) 100%, rgba(0,0,0,0) 100%),
    linear-gradient(to right, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%),
    linear-gradient(to left, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)
  `,
  maskImage: `
    linear-gradient(to bottom, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 100%),
    linear-gradient(to top, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%),
    linear-gradient(to right, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%),
    linear-gradient(to left, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)
  `,
  maskComposite: "intersect",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
};

const MAX_DOTS = 7;

export default function MovieCard({ movies: initialMovies = [] }) {
  const scrollRef = useRef(null);
  const [allMovies, setAllMovies] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [dotsCount, setDotsCount] = useState(0);
  const isLg = useMediaQuery({ minWidth: 1024 });

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    if (initialMovies && initialMovies.length > 0) {
      setAllMovies(initialMovies);
      setCurrentMovieIndex((prevIndex) =>
        Math.min(prevIndex, initialMovies.length - 1)
      );
    } else {
      setAllMovies([]);
      setCurrentMovieIndex(0);
    }
  }, [initialMovies]);

  const currentMovie = allMovies[currentMovieIndex];

  const updateDotsCount = useCallback(() => {
    const el = scrollRef.current;
    if (!el || allMovies.length === 0) {
      setDotsCount(0);
      return;
    }

    let totalSlides = allMovies.length;
    totalSlides = Math.min(totalSlides, MAX_DOTS);
    setDotsCount(totalSlides);
  }, [allMovies]);

  useEffect(() => {
    updateDotsCount(); // Chạy lần đầu
    window.addEventListener("resize", updateDotsCount);
    return () => {
      window.removeEventListener("resize", updateDotsCount);
    };
  }, [updateDotsCount]);

  const scroll = useCallback(
    (direction) => {
      if (direction === "left") {
        setCurrentMovieIndex((prevIndex) => Math.max(0, prevIndex - 1));
      } else {
        setCurrentMovieIndex((prevIndex) =>
          Math.min(allMovies.length - 1, prevIndex + 1)
        );
      }
    },
    [allMovies.length]
  );

  const handleTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);

  const handleTouchMove = useCallback((e) => {
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    if (swipeDistance > 75) {
      setCurrentMovieIndex((prevIndex) =>
        Math.min(allMovies.length - 1, prevIndex + 1)
      );
    } else if (swipeDistance < -75) {
      setCurrentMovieIndex((prevIndex) => Math.max(0, prevIndex - 1));
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  }, [allMovies.length]);

  if (!currentMovie) {
    return null;
  }

  const mainThumbUrl = convertImageUrlToProxy(currentMovie.thumb_url);

  return (
    <section className="relative h-auto py-2 lg:px-0 lg:py-0">
      <div className="relative">
        <button
          type="button"
          onClick={() => scroll("left")}
          disabled={currentMovieIndex === 0} // Disable nếu ở slide đầu tiên
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 hidden lg:block p-2 transition-colors duration-200 hover:scale-110 cursor-pointer"
          aria-label="Cuộn trái"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
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

        <div
          ref={scrollRef} // Vẫn giữ scrollRef để tính toán chiều rộng cho dots
          className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="group movie-card-item movie-hero-width ">
            <div className="relative block aspect-[16/9] lg:aspect-[16/7] w-full overflow-hidden rounded-none lg:rounded-[4px]">
              <AnimatePresence initial={false}>
                <motion.img
                  key={currentMovie._id || currentMovie.slug}
                  src={mainThumbUrl}
                  alt={`Poster phim ${currentMovie.name}`}
                  className="h-full w-full object-cover brightness-110"
                  loading="lazy"
                  width="800"
                  height="450"
                  style={gradientMaskStyle}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>

              <div
                className="hidden md:block absolute inset-0 z-[1] pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(rgba(0,0,0,0.1) 0.5px, transparent 0.5px)`,
                  backgroundSize: "3px 3px",
                }}
                aria-hidden="true"
              ></div>

              {dotsCount > 1 && (
                <div className="absolute bottom-5 lg:bottom-8 lg:right-8 right-5 flex gap-1.5 z-20 ">
                  {Array.from({ length: dotsCount }).map((_, dotIndex) => (
                    <span
                      key={dotIndex}
                      className={`block h-1 lg:h-1.5 rounded-[1px] lg:rounded-[2px] transition-all duration-300 ${
                        dotIndex === currentMovieIndex
                          ? "bg-white w-2 lg:w-3"
                          : "bg-gray-400 w-1 lg:w-2"
                      }`}
                      aria-label={`Slide ${dotIndex + 1}`}
                      onClick={(e) => {
                        e.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ 'a'
                        setCurrentMovieIndex(dotIndex);
                      }}
                    />
                  ))}
                </div>
              )}
            </div>{" "}
            <div className="absolute bottom-5 lg:bottom-20 left-4 flex flex-col gap-1 lg:gap-3 text-white z-20 lg:left-16 drop-shadow-[0_20px_20px_rgba(0,0,0,10)]">
              <h2
                className="line-clamp-1 text-lg lg:text-3xl font-bold "
                id={`movie-title-${currentMovie.id || currentMovie.slug}`}
              >
                <a
                  href={`/phim/${currentMovie.slug}`}
                  title={currentMovie.name}
                >
                  {currentMovie.name}
                </a>
              </h2>

              <div className="flex items-center gap-2 text-white">
                <div
                  className="rounded-bl-sm rounded-tl-sm py-1 text-xs lg:text-base font-normal"
                  aria-label={`Tình trạng phim: ${rutGonTinhTrangPhim1(
                    currentMovie.episode_current
                  )}`}
                >
                  {rutGonTinhTrangPhim1(currentMovie.episode_current)}
                </div>
                <div className="w-[1px] h-4 bg-white/30" aria-hidden="true" />
                <p
                  className="line-clamp-1 text-xs lg:text-base font-normal text-[#ffd875]"
                  aria-label={`Tên khác: ${currentMovie.origin_name}`}
                >
                  {currentMovie.origin_name}
                </p>
              </div>

              <div className="flex items-center gap-2.5 text-[10px] lg:text-xs font-medium text-white">
                <div className="flex items-center border border-yellow-300 lg:px-2 px-1 py-0.5 lg:py-1 rounded-md">
                  <p className="text-[#f7d54d]">IMDb</p>
                  <p className="pl-1">
                    {currentMovie.tmdb.vote_average === 0
                      ? 10
                      : currentMovie.tmdb.vote_average.toFixed(1)}
                  </p>
                </div>

                <div
                  className="bg-white lg:px-2 px-1 py-0.5 lg:py-1 rounded-md text-black font-bold"
                  aria-label={`Ngôn ngữ: ${rutGonTinhTrangNgonNgu(
                    currentMovie.lang
                  )}`}
                >
                  {rutGonTinhTrangNgonNgu(currentMovie.lang)}
                </div>

                <div
                  className="bg-gradient-to-tr from-[#FFD875] to-white lg:px-2 px-1 py-0.5 lg:py-1 rounded-md text-black font-bold"
                  aria-label={`Chất lượng phim: ${currentMovie.quality}`}
                >
                  {currentMovie.quality}
                </div>

                <div
                  className="border border-white lg:px-2 px-1 py-0.5 lg:py-1 rounded-md"
                  aria-label={`Năm phát hành: ${currentMovie.year}`}
                >
                  {currentMovie.year}
                </div>

                <div
                  className="border border-white lg:px-2 px-1 py-0.5 lg:py-1  rounded-md"
                  aria-label={`Thời lượng phim: ${currentMovie.time}`}
                >
                  {currentMovie.time}
                </div>
              </div>

              {currentMovie.category?.length > 0 && (
                <div className="mt-2 hidden flex-wrap gap-2 lg:flex">
                  {currentMovie.category.map((genre) => (
                    <a
                      key={genre.slug}
                      href={`/the-loai/${genre.slug}`}
                      className="rounded-[4px] bg-[#ffffff14] px-3 py-1 text-[13px] font-medium text-gray-200 transition-colors duration-200 hover:text-yellow-400"
                      aria-label={`Thể loại: ${genre.name}`}
                    >
                      {genre.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Scroll Button */}
        <button
          type="button"
          onClick={() => scroll("right")}
          disabled={currentMovieIndex === allMovies.length - 1} // Disable nếu ở slide cuối cùng
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden lg:block px-2 transition-colors duration-500 hover:scale-110"
          aria-label="Cuộn phải"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
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
