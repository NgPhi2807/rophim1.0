const TopMovies = ({ movies = [] }) => {
  if (!movies || movies.length === 0) {
    return null;
  }
  return (
    <div className="hidden lg:block h-fit px-0 ">
      <h2 className="mb-2 flex items-center gap-2 text-base font-semibold text-white lg:text-xl">
        Xem Gì Hôm Nay
      </h2>

      <div className="">
        {movies.map((movie, i) => {
          const { id, slug, name, poster_url, episode_current, lang } = movie;
          const movieKey = id || slug;
          const fullPosterUrl = `https://ik.imagekit.io/17mpki7mv/motchill/${poster_url}?tr=f-webp,w-300,h-450,fo-auto,q-85`;

          return (
            <a
              key={movieKey}
              href={`/phim/${slug}`}
              title={name}
              className="group flex items-center gap-5 rounded-lg py-2"
            >
              <div className="flex flex-row gap-4 bg-[#ffffff05] w-full justify-between items-center rounded-lg">
                <div className="aspect-[2/3] w-20 flex-shrink-0 overflow-hidden rounded-[4px] shadow-lg ">
                  <img
                    src={fullPosterUrl}
                    alt={name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>

                <div className="min-w-0 flex-1 space-y-1.5 px-2">
                  <p className="line-clamp-2 text-sm font-semibold text-gray-200 transition-colors duration-200 group-hover:text-[#ffd875]">
                    {name}
                  </p>

                  <div className="flex flex-col gap-1">
                    <p className="text-xs text-gray-400">{episode_current}</p>
                    <p className="text-xs text-gray-400">{lang}</p>
                  </div>
                </div>
                <span
                  className="px-4 font-quicksand text-5xl font-extrabold text-transparent"
                  style={{
                    WebkitTextStroke: "1px white",
                    color: "transparent",
                  }}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default TopMovies;
