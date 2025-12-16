import { useEffect, useState, useRef, useMemo } from "react";

import eposideGif from "../../assets/eposide.gif";

const Episodes = ({
  vietsub = [],
  thuyetminh = [],
  longtieng = [],
  movieTitle = "",
  slug,
  currentEpisodeSlug = "",
  currentType = "",
}) => {
  const hasVietsub = vietsub.length > 0;
  const hasThuyetminh = thuyetminh.length > 0;
  const hasLongtieng = longtieng.length > 0;
  const [activeType, setActiveType] = useState(() => {
    if (currentType) return currentType;
    if (hasVietsub) return "vietsub";
    if (hasThuyetminh) return "thuyetminh";
    if (hasLongtieng) return "longtieng";
    return "";
  });

  const [showAllEpisodes, setShowAllEpisodes] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (currentType) {
      setActiveType(currentType);
    }
  }, [currentType]);

  if (!hasVietsub && !hasThuyetminh && !hasLongtieng) return null;

  const isFullEpisode = (epList) =>
    epList.length === 1 &&
    (epList[0].slug === "full" ||
      epList[0].name?.toLowerCase().includes("full"));

  const vietsubIsFull = hasVietsub && isFullEpisode(vietsub);
  const thuyetminhIsFull = hasThuyetminh && isFullEpisode(thuyetminh);
  const longtiengIsFull = hasLongtieng && isFullEpisode(longtieng);
  const isAnyFull = vietsubIsFull || thuyetminhIsFull || longtiengIsFull;
  const processedVietsub = vietsub;
  const processedThuyetminh = thuyetminh;
  const processedLongtieng = longtieng;

  const filteredEpisodes = useMemo(() => {
    let episodesToFilter = [];
    switch (activeType) {
      case "vietsub":
        episodesToFilter = processedVietsub;
        break;
      case "thuyetminh":
        episodesToFilter = processedThuyetminh;
        break;
      case "longtieng":
        episodesToFilter = processedLongtieng;
        break;
      default:
        episodesToFilter = [];
    }

    episodesToFilter.sort((a, b) => {
      const numA = parseInt(a.name.match(/Tập (\d+)/)?.[1] || 0);
      const numB = parseInt(b.name.match(/Tập (\d+)/)?.[1] || 0);
      return numA - numB;
    });

    if (!searchTerm) {
      return episodesToFilter;
    }

    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return episodesToFilter.filter(
      (ep) =>
        ep.name?.toLowerCase().includes(lowerCaseSearchTerm) ||
        ep.slug?.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [
    activeType,
    searchTerm,
    processedVietsub,
    processedThuyetminh,
    processedLongtieng,
  ]);

  const episodesToDisplay =
    searchTerm || showAllEpisodes
      ? filteredEpisodes
      : filteredEpisodes.slice(0, 40);

  const hasMoreThan40Episodes = filteredEpisodes.length > 40;

  const renderEpisodeButton = (ep, displayType) => {
    const episodeSlug = ep.slug;
    let episodeName = ep.name;
    const isNumeric = /^\d+$/.test(episodeName);
    const startsWithTap = episodeName?.toLowerCase().startsWith("tập");
    if (isNumeric && !startsWithTap) {
      episodeName = `Tập ${episodeName}`;
    }
    const hasLink = ep.link_embed !== null || ep.link_m3u8 !== null;
    const href = hasLink
      ? `/xem-phim/${slug}/${episodeSlug}/${displayType}`
      : "#";
    const isActive =
      !isAnyFull &&
      currentEpisodeSlug &&
      currentType &&
      episodeSlug === currentEpisodeSlug &&
      displayType === currentType &&
      hasLink;

    const getDisplayName = (type) => {
      switch (type) {
        case "vietsub":
          return "Vietsub";
        case "thuyetminh":
          return "Thuyết Minh";
        case "longtieng":
          return "Lồng Tiếng";
        default:
          return "";
      }
    };

    const baseClasses = `relative truncate line-clamp-1 flex items-center justify-center rounded-md px-6 py-3 text-center text-[13px] font-semibold transition-colors duration-200 `;
    const activeClasses = `bg-[#FFD875] shadow-lg text-gray-900`;
    const availableClasses = `bg-[#23252b] text-gray-200 hover:text-[#FFD875]`;

    return (
      <a
        key={`${episodeSlug}-${displayType}`}
        href={href}
        className={`${baseClasses} ${
          isActive ? activeClasses : hasLink ? availableClasses : ""
        }`}
        title={`${episodeName} - ${movieTitle} (${getDisplayName(
          displayType
        )})`}
        onClick={(e) => !hasLink && e.preventDefault()}
      >
        {isActive ? (
          <img
            src={eposideGif.src}
            alt="Đang phát"
            className="h-4 w-auto"
            style={{ filter: "brightness(0) saturate(100%)" }}
          />
        ) : (
          episodeName
        )}
      </a>
    );
  };

  const renderFullButtons = () => (
    <div className="flex flex-wrap gap-3">
      {vietsubIsFull && (
        <a
          href={`/xem-phim/${slug}/full/vietsub`}
          className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-200 ${
            currentType === "vietsub" && currentEpisodeSlug === "full"
              ? "bg-[#23252b] text-[#ffd785]"
              : "bg-[#23252b] text-gray-200 "
          }`}
        >
          Xem Phụ Đề
        </a>
      )}
      {thuyetminhIsFull && (
        <a
          href={`/xem-phim/${slug}/full/thuyetminh`}
          className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-200 ${
            currentType === "thuyetminh" && currentEpisodeSlug === "full"
              ? "bg-[#23252b] text-[#ffd785]"
              : "bg-[#23252b] text-gray-200"
          }`}
        >
          Xem Thuyết Minh
        </a>
      )}
      {longtiengIsFull && (
        <a
          href={`/xem-phim/${slug}/full/longtieng`}
          className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-200 ${
            currentType === "longtieng" && currentEpisodeSlug === "full"
              ? "bg-[#23252b] text-[#ffd785] "
              : "bg-[#23252b] text-gray-200 "
          }`}
        >
          Xem Lồng Tiếng
        </a>
      )}
    </div>
  );

  const renderEpisodeList = (episodes, type) => (
    <div className="space-y-2">
      <div className="grid grid-cols-4 gap-2 md:grid-cols-8 lg:grid-cols-8 xl:grid-cols-8">
        {episodes.map((ep) => renderEpisodeButton(ep, type))}
      </div>
    </div>
  );

  const VerticalSeparatorSVG = () => (
    <svg
      width="1"
      height="32"
      viewBox="0 0 1 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-gray-600 mx-2 hidden lg:block"
    >
      <path d="M1 0V32" stroke="currentColor" strokeWidth="2" />
    </svg>
  );

  return (
    <div className="z-20 space-y-4 py-2 lg:px-0 lg:py-4">
      <h2 className="flex flex-col lg:flex-row text-base gap-4 font-medium text-white lg:text-xl justify-between">
        <div className="flex flex-row justify-between lg:gap-6 ">
          <div className="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M5 19q-.425 0-.712-.288T4 18t.288-.712T5 17h8q.425 0 .713.288T14 18t-.288.713T13 19zm0-4q-.425 0-.712-.288T4 14t.288-.712T5 13h14q.425 0 .713.288T20 14t-.288.713T19 15zm0-4q-.425 0-.712-.288T4 10t.288-.712T5 9h14q.425 0 .713.288T20 10t-.288.713T19 11zm0-4q-.425 0-.712-.288T4 6t.288-.712T5 5h14q.425 0 .713.288T20 6t-.288.713T19 7z"
              />
            </svg>
            <span>Tập Phim</span>
          </div>

          {!isAnyFull && (
            <div className="flex items-center gap-3">
              <VerticalSeparatorSVG />

              {hasVietsub && (
                <button
                  className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold transition-colors duration-200 ${
                    activeType === "vietsub"
                      ? "border-white border text-white"
                      : "text-gray-200 hover:text-white"
                  }`}
                  onClick={() => setActiveType("vietsub")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="currentColor"
                      d="M1 5.5A2.5 2.5 0 0 1 3.5 3h9A2.5 2.5 0 0 1 15 5.5v5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 10.5zM3.5 4A1.5 1.5 0 0 0 2 5.5v5A1.5 1.5 0 0 0 3.5 12h9a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 12.5 4zM3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m.5 1.5a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM10 8.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5M8.5 10a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1z"
                    />
                  </svg>
                  Phụ đề
                </button>
              )}
              {hasThuyetminh && (
                <button
                  className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold transition-colors duration-200 ${
                    activeType === "thuyetminh"
                      ? "border-white border text-white"
                      : "text-gray-200 hover:text-white"
                  }`}
                  onClick={() => setActiveType("thuyetminh")}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="currentColor"
                      d="M1 5.5A2.5 2.5 0 0 1 3.5 3h9A2.5 2.5 0 0 1 15 5.5v5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 10.5zM3.5 4A1.5 1.5 0 0 0 2 5.5v5A1.5 1.5 0 0 0 3.5 12h9a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 12.5 4zM3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m.5 1.5a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM10 8.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5M8.5 10a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1z"
                    />
                  </svg>
                  Thuyết minh
                </button>
              )}
              {hasLongtieng && (
                <button
                  className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold transition-colors duration-200 ${
                    activeType === "longtieng"
                      ? "border-white border text-white"
                      : "text-gray-200 hover:text-white"
                  }`}
                  onClick={() => setActiveType("longtieng")}
                >
                  Lồng Tiếng
                </button>
              )}
            </div>
          )}
        </div>

        {!isAnyFull && ( // Only show search if not a full movie
          <div className="flex items-center gap-4 flex-wrap ml-auto">
            <div className="relative flex items-center">
              <input
                type="text"
                placeholder="Tìm tập phim..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#23252b] text-gray-200 placeholder-gray-500 rounded-md py-1.5 pl-3 text-xs focus:outline-none "
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute right-2 text-gray-500"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div>
        )}
      </h2>

      {isAnyFull ? (
        renderFullButtons()
      ) : (
        <>
          {activeType === "vietsub" &&
            hasVietsub &&
            renderEpisodeList(episodesToDisplay, "vietsub")}
          {activeType === "thuyetminh" &&
            hasThuyetminh &&
            renderEpisodeList(episodesToDisplay, "thuyetminh")}
          {activeType === "longtieng" &&
            hasLongtieng &&
            renderEpisodeList(episodesToDisplay, "longtieng")}

          {hasMoreThan40Episodes &&
            !searchTerm && ( // Only show if more than 40 and no search term
              <div className="text-center mt-4">
                <button
                  onClick={() => setShowAllEpisodes(!showAllEpisodes)}
                  className="px-6 py-3 text-sm font-medium text-black bg-gradient-to-br from-[#FECF59] to-[#FFF1CC] rounded-full transition-all duration-200 ease-in-out hover:shadow-lg"
                >
                  {showAllEpisodes
                    ? "Thu gọn"
                    : `Xem thêm (${filteredEpisodes.length - 40} tập)`}
                </button>
              </div>
            )}
          {filteredEpisodes.length === 0 && searchTerm && (
            <p className="text-gray-500 text-center text-sm mt-6 italic">
              Không tìm thấy tập phim nào phù hợp với từ khóa "{searchTerm}".
            </p>
          )}
          {filteredEpisodes.length === 0 && !searchTerm && (
            <p className="text-gray-500 text-center text-sm mt-6 italic">
              Hiện tại chưa có tập phim nào cho loại này.
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default Episodes;
