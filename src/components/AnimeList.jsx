import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

function AnimeList({ title, movies }) {
  const [movieData, setMovieData] = useState(null);
  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    if (movies && movies.length > 0) {
      setAllMovies(movies);
      setMovieData(movies[0]);
      setCurrentMovieIndex(0);
      setLoading(false);
    } else {
      setAllMovies([]);
      setMovieData(null);
      setLoading(false);
    }
  }, [movies]);

  useEffect(() => {
    if (allMovies.length > 0) {
      setMovieData(allMovies[currentMovieIndex]);
    }
  }, [currentMovieIndex, allMovies]);

  const handleThumbnailClick = (movie) => {
    const index = allMovies.findIndex((m) => m._id === movie._id);
    if (index !== -1) {
      setCurrentMovieIndex(index);
    }
  };

  const handleXemNgay = () => {
    if (!movieData) return;
    const playbackUrl = `/xem-phim/${movieData.slug}/tap/1?id=${movieData._id}&ngonngu=vietsub`;
    window.location.href = playbackUrl;
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    if (swipeDistance > 75) {
      setCurrentMovieIndex((prevIndex) =>
        prevIndex < allMovies.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (swipeDistance < -75) {
      setCurrentMovieIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  if (loading) {
    return (
      <div className="p-6">
        <section className="text-white text-center py-10">
          Đang tải phim...
        </section>
      </div>
    );
  }

  if (!movieData) {
    return (
      <div className="p-6">
        <section className="text-white text-center py-10">
          Không có phim hoạt hình nào để hiển thị.
        </section>
      </div>
    );
  }

  const mainThumbUrl = `https://ik.imagekit.io/17mpki7mv/motchill/${movieData.thumb_url}?tr=f-webp,w-800,h-450,fo-auto,q-85`;

  return (
    <div className="pb-24 pt-2">
      <section role="region" aria-label={title}>
        <header className="px-1">
          <div className="flex flex-col lg:flex-row mb-4 gap-4 lg:gap-10">
            <h2 className="text-lg font-bold text-white lg:text-2xl">
              <span>{title}</span>
            </h2>
          </div>
        </header>

        <main
          className="relative py-16 bg-black rounded-xl h-[380px] lg:h-[400px]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="absolute inset-0 z-0 overflow-hidden">
            <AnimatePresence initial={false}>
              <motion.img
                key={movieData._id}
                src={mainThumbUrl}
                alt={`${movieData.name} - Phim hoạt hình ${movieData.year}`}
                className="h-full w-full object-cover scale-100 rounded-xl object-pos-50-30 lg:object-pos-20-30"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                loading="lazy"
              />
            </AnimatePresence>
            <div
              className="hidden md:block absolute inset-0 z-10 pointer-events-none"
              style={{
                backgroundImage: `radial-gradient(#000000 1px, transparent 1px)`,
                backgroundSize: "3px 3px",
                opacity: 0.3,
              }}
              aria-hidden="true"
            ></div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#191B24]/95 via-[#191B24]/70 to-transparent"></div>

          <div className="relative z-10 w-full pt-32 md:pt-10 lg:pt-10">
            <div className="px-4 lg:px-10 grid grid-cols-1 lg:grid-cols-5 items-end">
              <article className="flex flex-col items-start col-span-2 lg:col-span-12 space-y-3 md:space-y-4 text-white">
                <h3 className="text-[16px] md:text-2xl font-bold leading-tight tracking-tight">
                  <a
                    href={`/phim/${movieData.slug}`}
                    className=" transition-colors line-clamp-2"
                    title={`Xem phim ${movieData.name} - ${movieData.episode_current}`}
                  >
                    {movieData.name}
                  </a>
                </h3>

                <div className="">
                  <div
                    className=" text-xs lg:text-sm text-yellow-200"
                    dangerouslySetInnerHTML={{ __html: movieData.origin_name }}
                  />
                </div>

                <div
                  className="flex items-center gap-1 lg:gap-2.5 text-[10px] lg:text-xs font-medium text-white"
                  role="list"
                >
                  <div className="flex items-center border border-yellow-300 lg:px-2 px-1 py-0.5 lg:py-1 rounded-md">
                    <p className="text-[#f7d54d]">IMDb</p>
                    <p className="pl-1">
                      {movieData.tmdb.vote_average === 0
                        ? 10
                        : movieData.tmdb.vote_average.toFixed(1)}
                    </p>
                  </div>
                  <span
                    className="bg-gradient-to-tr from-[#FFD875] to-white lg:px-2 px-1 py-0.5 lg:py-1 rounded-md text-black font-bold"
                    role="listitem"
                  >
                    {movieData.quality}
                  </span>
                  <span
                    className="bg-white lg:px-2 px-1 py-0.5 lg:py-1 rounded-md text-black font-bold"
                    role="listitem"
                  >
                    {movieData.lang}
                  </span>
                  <span
                    className="border border-white lg:px-2 px-1 py-0.5 lg:py-1  rounded-md"
                    role="listitem"
                  >
                    {movieData.episode_current}
                  </span>
                  <span
                    className="border border-white lg:px-2 px-1 py-0.5 lg:py-1 rounded-md"
                    role="listitem"
                  >
                    {movieData.year}
                  </span>
                  <span
                    className="border border-white lg:px-2 px-1 py-0.5 lg:py-1 rounded-md"
                    role="listitem"
                  >
                    {movieData.time}
                  </span>
                </div>

                <nav
                  className="flex flex-wrap space-x-1 xl:space-x-3 text-xs font-medium"
                  aria-label="Thể loại phim"
                >
                  {movieData.category &&
                    movieData.category.slice(0, 3).map((genre) => (
                      <a
                        key={genre.slug}
                        href={`/the-loai/${genre.slug}`}
                        className="rounded-[4px] bg-[#ffffff14] lg:px-2 px-1 py-0.5 lg:py-1 text-[10px]lg:text-[13px] font-medium text-gray-200 transition-colors duration-200 hover:text-yellow-400"
                        title={`Xem phim thể loại ${genre.name}`}
                      >
                        {genre.name}
                      </a>
                    ))}
                </nav>
              </article>
            </div>
          </div>

          <div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-4 lg:translate-y-10 z-20"
            role="tablist"
            aria-label="Danh sách phim"
          >
            <div className="hidden lg:flex justify-center items-center space-x-2">
              {allMovies.slice(0, 15).map((movie) => {
                const thumbnailPosterUrl = `https://ik.imagekit.io/17mpki7mv/motchill/${movie.poster_url}?tr=f-webp,w-300,h-450,fo-auto,q-85`;
                return (
                  <button
                    key={movie._id}
                    role="tab"
                    aria-selected={movie._id === movieData._id}
                    aria-label={`Xem phim ${movie.name}`}
                    className={`w-[50px] h-[75px] 2xl:w-[55px] 2xl:h-[80px] rounded-md object-fill cursor-pointer transition duration-150 ease-in-out border-2 ${
                      movie._id === movieData._id
                        ? "border-white scale-105"
                        : "border-transparent hover:scale-105"
                    }`}
                    onClick={() => handleThumbnailClick(movie)}
                  >
                    <img
                      src={thumbnailPosterUrl}
                      alt={`Poster phim ${movie.name}`}
                      className="w-full h-full object-fill rounded-md"
                      loading="lazy"
                    />
                  </button>
                );
              })}
            </div>

            <div
              className="flex lg:hidden justify-center items-center space-x-2"
              role="tablist"
              aria-label="Điều hướng phim"
            >
              {allMovies.slice(0, 17).map((movie, index) => (
                <button
                  key={movie._id}
                  role="tab"
                  aria-selected={movie._id === movieData._id}
                  aria-label={`Chuyển đến phim ${movie.name}`}
                  className={`w-2 h-2 rounded-full cursor-pointer ${
                    index === currentMovieIndex
                      ? "bg-orange-400"
                      : "bg-gray-300"
                  }`}
                  onClick={() => handleThumbnailClick(movie)}
                />
              ))}
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}

export default AnimeList;
