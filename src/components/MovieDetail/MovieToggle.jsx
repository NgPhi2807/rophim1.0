import { useState } from "react";

export default function MobileMovieInfoToggle({ movie }) {
  const [showMobileInfo, setShowMobileInfo] = useState(false);

  const toggleMobileInfo = () => {
    setShowMobileInfo(!showMobileInfo);
  };

  return (
    <>
      <button
        onClick={toggleMobileInfo}
        className="items-center justify-center rounded-[4px] px-4 text-xs font-semibold text-white lg:hidden"
        aria-label="Xem thông tin phim"
      >
        {showMobileInfo ? "Ẩn thông tin" : "Thông tin phim"}
      </button>

      {showMobileInfo && (
        <div className="w-full space-y-4 rounded-[4px] lg:hidden">
          <div className="mt-2 flex flex-wrap justify-start gap-2">
            {movie.quality && (
              <span className="flex items-center justify-center rounded-[4px] bg-white px-2 py-0.5 text-[10px] font-bold text-black lg:text-[13px]">
                {movie.quality}
              </span>
            )}
            {movie.year && (
              <span className="flex items-center justify-center rounded-[4px] border border-white px-2 py-0.5 text-[10px] text-white lg:text-[13px]">
                {movie.year}
              </span>
            )}
            {movie.time && (
              <span className="flex items-center justify-center rounded-[4px] border border-white px-2 py-0.5 text-[10px] text-white lg:text-[13px]">
                {movie.time}
              </span>
            )}
            {movie.episode_current && (
              <span
                className={`flex items-center justify-center gap-1 rounded-[4px] px-2 py-0.5 text-[10px] font-semibold lg:text-[13px] ${
                  /hoàn tất|full/i.test(movie.episode_current)
                    ? "border-white border text-white"
                    : "bg-[#FFD875] text-black"
                }`}
              >
                {/hoàn tất|full/i.test(movie.episode_current) ? (
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                ) : (
                  <div
                    className="h-3 w-3 animate-spin rounded-full border-2 border-current border-t-transparent"
                    aria-hidden="true"
                  ></div>
                )}
                <span className="sr-only">Tình trạng:</span>
                {movie.episode_current}
              </span>
            )}
          </div>
          {movie.category?.length > 0 && (
            <div>
              <h3 className="mb-2 text-[13px] font-bold text-white">
                Thể loại:
              </h3>
              <div className="flex flex-wrap gap-2">
                {movie.category.map((genre) => (
                  <a
                    key={genre.slug}
                    href={`/the-loai/${genre.slug}`}
                    className="rounded-[4px] bg-[#353946] px-2 py-1 text-[10px] text-[#ececec] transition-colors duration-200 hover:bg-[#383a42] lg:text-[13px]"
                  >
                    {genre.name}
                  </a>
                ))}
              </div>
            </div>
          )}
          {movie.director && (
            <div>
              <h3 className="mb-1 text-[13px] font-bold text-white">
                Đạo diễn:
              </h3>
              <p className="text-[13px] text-gray-400">{movie.director}</p>
            </div>
          )}
          {movie.actor && (
            <div>
              <h3 className="mb-1 text-[13px] font-bold text-white">
                Diễn viên:
              </h3>
              <p className="text-[13px] text-gray-400">
                {movie.actor.join(", ")}
              </p>
            </div>
          )}
          {movie.content && (
            <div>
              <h3 className="mb-2 text-[13px] font-bold text-white">
                Nội dung phim:
              </h3>
              <p className="text-[13px] leading-relaxed text-gray-400">
                {movie.content}
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}
