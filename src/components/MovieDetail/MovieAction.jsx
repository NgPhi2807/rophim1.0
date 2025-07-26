import { useState, useEffect } from "react";

export default function MovieActions({
  movieSlug,
  firstEpisodeSlug,
  firstEpisodeType,
  movieName,
}) {
  const [hrefXemNgay, setHrefXemNgay] = useState("");

  useEffect(() => {
    let initialHref;
    // Ensure movieSlug is defined before constructing the URL
    if (movieSlug) {
      if (firstEpisodeType === "vietsub" && firstEpisodeSlug) {
        initialHref = `/xem-phim/${movieSlug}/${firstEpisodeSlug}/vietsub`;
      } else if (firstEpisodeType === "thuyetminh" && firstEpisodeSlug) {
        initialHref = `/xem-phim/${movieSlug}/${firstEpisodeSlug}/thuyetminh`;
      } else if (firstEpisodeType === "longtieng" && firstEpisodeSlug) {
        initialHref = `/xem-phim/${movieSlug}/${firstEpisodeSlug}/longtieng`;
      } else {
        // Fallback if firstEpisodeType or firstEpisodeSlug are not available
        initialHref = `/xem-phim/${movieSlug}/tap-1/vietsub`;
      }
    } else {
      // If movieSlug is not available, set a default or empty href
      initialHref = "#"; // Or handle this case by disabling the button
      console.warn(
        "Movie slug is undefined in MovieActions, setting default href to '#'."
      );
    }
    setHrefXemNgay(initialHref);
  }, [movieSlug, firstEpisodeSlug, firstEpisodeType]);

  const handleShare = () => {
    const shareData = {
      title: `${movieName} | PhimMoi`,
      text: "Khám phá phim hấp dẫn mỗi ngày trên phimmoii.top",
      url: window.location.href,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => {
          console.log("Chia sẻ thành công!");
        })
        .catch((error) => {
          console.log("Lỗi khi chia sẻ:", error);
        });
    } else {
      if (navigator.clipboard) {
        navigator.clipboard
          .writeText(shareData.url)
          .then(() => {
            alert("📋 Đã sao chép đường dẫn vào clipboard!");
          })
          .catch(() => {
            alert(
              "⚠️ Không thể sao chép, vui lòng copy thủ công: " + shareData.url
            );
          });
      } else {
        alert(
          "⚠️ Trình duyệt của bạn không hỗ trợ sao chép tự động. Hãy copy đường dẫn này: " +
            shareData.url
        );
      }
    }
  };

  return (
    <>
      {/* Hidden on small screens, flex on large screens */}
      <div className="hidden lg:flex mt-3 flex-row gap-8 items-center justify-center ">
        <a
          href={hrefXemNgay}
          className="flex items-center justify-center gap-4 rounded-full bg-gradient-to-br from-[#FECF59] to-[#FFF1CC] px-8 py-4 text-base font-medium text-gray-900 transition-all duration-200 shadow-lg hover:shadow-[0_4px_20px_rgba(255,222,128,1)]"
          aria-label="Xem phim ngay"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M21.409 9.353a2.998 2.998 0 0 1 0 5.294L8.597 21.614C6.534 22.737 4 21.277 4 18.968V5.033c0-2.31 2.534-3.769 4.597-2.648z" />
          </svg>
          Xem ngay
        </a>

        {/* Action buttons like favorite, add, share, comment */}
        <div className="flex flex-row gap-4 items-center ml-4">
          <button
            onClick={handleShare}
            className="flex flex-col items-center gap-2 justify-center text-white text-xs font-semibold hover:text-[#ffd785] px-4 py-2 rounded-lg hover:bg-[#ffffff10] transition-colors duration-200"
            aria-label="Chia sẻ phim"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M20.336 3.221L3.873 8.71a.35.35 0 0 0-.027.654l6.05 2.593a.2.2 0 0 0 .196-.021l5.931-4.238c.184-.13.41.096.28.28l-4.238 5.931a.2.2 0 0 0-.02.195l2.592 6.05a.35.35 0 0 0 .654-.026L20.78 3.664a.35.35 0 0 0-.443-.443"
              />
            </svg>
            Chia sẻ
          </button>
          <button className="flex flex-col gap-2 items-center justify-center text-white text-xs font-semibold hover:text-[#ffd785] px-4 py-2 rounded-lg hover:bg-[#ffffff10] transition-colors duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                d="M5.4 17.604c.33.437.957.526 1.399.2l4.011-2.962h4.59c1.436 0 2.6-1.149 2.6-2.566v-6.71C18 4.149 16.836 3 15.4 3H4.6C3.164 3 2 4.149 2 5.566v6.71c0 1.418 1.164 2.566 2.6 2.566h.6v2.171c0 .213.07.42.2.591M9.5 10a.5.5 0 0 1 0-1H15a.5.5 0 0 1 0 1zm-2-1a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zM5 11h5.5a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1m7.5 1a.5.5 0 0 1 0-1H15a.5.5 0 0 1 0 1z"
              />
            </svg>
            Bình luận
          </button>
        </div>
      </div>

      {/* Visible on small screens, hidden on large screens */}
      <div className="mt-4 flex w-full flex-col gap-3 lg:hidden">
        <div className="flex flex-col justify-center gap-6 items-center">
          <a
            href={hrefXemNgay}
            className="w-[50%] flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#FECF59] to-[#FFF1CC] px-6 py-3 text-base font-semibold text-gray-900 transition-all duration-200 hover:drop-shadow-xl shadow-lg"
            aria-label="Xem phim ngay"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M21.409 9.353a2.998 2.998 0 0 1 0 5.294L8.597 21.614C6.534 22.737 4 21.277 4 18.968V5.033c0-2.31 2.534-3.769 4.597-2.648z" />
            </svg>
            Xem ngay
          </a>

          <div className="flex flex-row gap-8 items-center ml-4">
            <button
              onClick={handleShare}
              className="flex flex-col items-center gap-2 justify-center text-white text-xs font-semibold hover:text-[#ffd785] transition-colors duration-200"
              aria-label="Chia sẻ phim"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M20.336 3.221L3.873 8.71a.35.35 0 0 0-.027.654l6.05 2.593a.2.2 0 0 0 .196-.021l5.931-4.238c.184-.13.41.096.28.28l-4.238 5.931a.2.2 0 0 0-.02.195l2.592 6.05a.35.35 0 0 0 .654-.026L20.78 3.664a.35.35 0 0 0-.443-.443"
                />
              </svg>
              Chia sẻ
            </button>
            <button className="flex flex-col gap-2 items-center justify-center text-white text-xs font-semibold hover:text-[#ffd785] hover:bg-slate-200/20 transition-colors duration-200">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 20 20"
              >
                <path
                  fill="currentColor"
                  d="M5.4 17.604c.33.437.957.526 1.399.2l4.011-2.962h4.59c1.436 0 2.6-1.149 2.6-2.566v-6.71C18 4.149 16.836 3 15.4 3H4.6C3.164 3 2 4.149 2 5.566v6.71c0 1.418 1.164 2.566 2.6 2.566h.6v2.171c0 .213.07.42.2.591M9.5 10a.5.5 0 0 1 0-1H15a.5.5 0 0 1 0 1zm-2-1a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1zM5 11h5.5a.5.5 0 0 1 0 1H5a.5.5 0 0 1 0-1m7.5 1a.5.5 0 0 1 0-1H15a.5.5 0 0 1 0 1z"
                />
              </svg>
              Bình luận
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
