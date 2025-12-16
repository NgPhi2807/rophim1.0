import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

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
  return `https://ik.imagekit.io/17mpki7mv/motchill/upload/${path}?tr=w-1200,h-450,f-webp,fo-auto`;
}

export default function MovieCard({ movies = [] }) {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <section className="relative h-auto py-2 lg:px-0 lg:py-0">
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          pagination={{
            clickable: true,
            el: ".swiper-pagination-custom",
            bulletClass: `swiper-pagination-bullet-custom`,
            bulletActiveClass: `swiper-pagination-bullet-custom-active`,
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          effect="fade"
          grabCursor={true}
          loop={false}
          className="movie-hero-slider"
        >
          {movies.map((movie) => {
            const mainThumbUrl = convertImageUrlToProxy(movie.thumb_url);

            return (
              <SwiperSlide key={movie._id || movie.slug}>
                <div className="group movie-card-item movie-hero-width">
                  <div className="gradient-mask-responsive relative block aspect-[16/9] lg:aspect-[16/7] w-full overflow-hidden rounded-none lg:rounded-[4px]">
                    <img
                      src={mainThumbUrl}
                      alt={`Poster phim ${movie.name}`}
                      className="h-full w-full object-cover bg-center "
                      fetchPriority="high"
                    />
                    <div
                      className="hidden md:block absolute inset-0 z-[1] pointer-events-none"
                      style={{
                        backgroundImage: `radial-gradient(rgba(0,0,0,0.1) 0.5px, transparent 0.5px)`,
                        backgroundSize: "3px 3px",
                      }}
                      aria-hidden="true"
                    ></div>
                  </div>
                  <div className="absolute bottom-5 lg:bottom-20 left-4 flex flex-col gap-1 lg:gap-3 text-white z-20 lg:left-16 drop-shadow-[0_20px_20px_rgba(0,0,0,10)]">
                    <h2
                      className="line-clamp-1 text-lg lg:text-3xl font-bold"
                      id={`movie-title-${movie.id || movie.slug}`}
                    >
                      <a href={`/phim/${movie.slug}`} title={movie.name}>
                        {movie.name}
                      </a>
                    </h2>

                    <div className="flex items-center gap-2 text-white">
                      <div
                        className="rounded-bl-sm rounded-tl-sm py-1 text-xs lg:text-base font-normal"
                        aria-label={`Tình trạng phim: ${rutGonTinhTrangPhim1(
                          movie.episode_current
                        )}`}
                      >
                        {rutGonTinhTrangPhim1(movie.episode_current)}
                      </div>
                      <div
                        className="w-[1px] h-4 bg-white/30"
                        aria-hidden="true"
                      />
                      <p
                        className="line-clamp-1 text-xs lg:text-base font-normal text-[#ffd875]"
                        aria-label={`Tên khác: ${movie.origin_name}`}
                      >
                        {movie.origin_name}
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5 text-[10px] lg:text-xs font-medium text-white">
                      <div className="flex items-center border border-yellow-300 lg:px-2 px-1 py-0.5 lg:py-1 rounded-md">
                        <p className="text-[#f7d54d]">IMDb</p>
                        <p className="pl-1">
                          {movie.tmdb.vote_average === 0
                            ? 10
                            : movie.tmdb.vote_average.toFixed(1)}
                        </p>
                      </div>

                      <div
                        className="bg-white lg:px-2 px-1 py-0.5 lg:py-1 rounded-md text-black font-bold"
                        aria-label={`Ngôn ngữ: ${rutGonTinhTrangNgonNgu(
                          movie.lang
                        )}`}
                      >
                        {rutGonTinhTrangNgonNgu(movie.lang)}
                      </div>

                      <div
                        className="bg-gradient-to-tr from-[#FFD875] to-white lg:px-2 px-1 py-0.5 lg:py-1 rounded-md text-black font-bold"
                        aria-label={`Chất lượng phim: ${movie.quality}`}
                      >
                        {movie.quality}
                      </div>

                      <div
                        className="border border-white lg:px-2 px-1 py-0.5 lg:py-1 rounded-md"
                        aria-label={`Năm phát hành: ${movie.year}`}
                      >
                        {movie.year}
                      </div>

                      <div
                        className="border border-white lg:px-2 px-1 py-0.5 lg:py-1 rounded-md"
                        aria-label={`Thời lượng phim: ${movie.time}`}
                      >
                        {movie.time}
                      </div>
                    </div>

                    {movie.category?.length > 0 && (
                      <div className="mt-2 hidden flex-wrap gap-2 lg:flex">
                        {movie.category.map((genre) => (
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
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="swiper-pagination-custom absolute bottom-5 lg:bottom-8 lg:right-8 right-5 flex gap-1.5 z-20"></div>

        <button
          type="button"
          className="swiper-button-prev-custom absolute left-0 top-1/2 -translate-y-1/2 z-20 hidden lg:block p-2 transition-colors duration-200 hover:scale-110 cursor-pointer"
          aria-label="Cuộn trái"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
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
          type="button"
          className="swiper-button-next-custom absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden lg:block px-2 transition-colors duration-500 hover:scale-110"
          aria-label="Cuộn phải"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
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
