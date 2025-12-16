// src/components/Episode/Episodes.jsx
import React from "react";
import useEpisodesLogic from "./useEpisodesLogic"; // Import the new custom hook
import EpisodeTypeSelector from "./EpisodeTypeSelector";
import EpisodeSearch from "./EpisodeSearch";
import FullMovieEpisodeButtons from "./FullMovieEpisodeButtons";
import EpisodeGrid from "./EpisodeGrid";
import ShowMoreButton from "./ShowMoreButton";

// Assuming BASE_IMAGE_URL is used elsewhere or remove if not.
// import { BASE_IMAGE_URL } from "./useEpisodesLogic"; // Not strictly needed here if only eposideGif uses it

// SVG for the vertical separator (can remain here or be moved to its own file if reused globally)
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

const Episodes = ({
  vietsub = [],
  thuyetminh = [],
  longtieng = [],
  movieTitle = "",
  slug,
  currentEpisodeSlug = "",
  currentType = "",
}) => {
  // Consume logic from the custom hook
  const {
    activeType,
    setActiveType,
    searchTerm,
    setSearchTerm,
    showAllEpisodes,
    setShowAllEpisodes,
    hasVietsub,
    hasThuyetminh,
    hasLongtieng,
    vietsubIsFull,
    thuyetminhIsFull,
    longtiengIsFull,
    isAnyFull,
    episodesToDisplay,
    filteredEpisodesLength,
    hasMoreThan40Episodes,
  } = useEpisodesLogic({
    vietsub,
    thuyetminh,
    longtieng,
    currentEpisodeSlug,
    currentType,
  });

  // If no episodes are available at all, return null.
  if (!hasVietsub && !hasThuyetminh && !hasLongtieng) {
    return null;
  }

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
            <EpisodeTypeSelector
              hasVietsub={hasVietsub}
              hasThuyetminh={hasThuyetminh}
              hasLongtieng={hasLongtieng}
              activeType={activeType}
              setActiveType={setActiveType}
            />
          )}
        </div>

        {!isAnyFull && (
          <EpisodeSearch
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        )}
      </h2>

      {isAnyFull ? (
        <FullMovieEpisodeButtons
          slug={slug}
          currentEpisodeSlug={currentEpisodeSlug}
          currentType={currentType}
          vietsubIsFull={vietsubIsFull}
          thuyetminhIsFull={thuyetminhIsFull}
          longtiengIsFull={longtiengIsFull}
        />
      ) : (
        <>
          {activeType === "vietsub" && hasVietsub && (
            <EpisodeGrid
              episodes={episodesToDisplay}
              type="vietsub"
              slug={slug}
              movieTitle={movieTitle}
              currentEpisodeSlug={currentEpisodeSlug}
              currentType={currentType}
              isAnyFull={isAnyFull}
            />
          )}
          {activeType === "thuyetminh" && hasThuyetminh && (
            <EpisodeGrid
              episodes={episodesToDisplay}
              type="thuyetminh"
              slug={slug}
              movieTitle={movieTitle}
              currentEpisodeSlug={currentEpisodeSlug}
              currentType={currentType}
              isAnyFull={isAnyFull}
            />
          )}
          {activeType === "longtieng" && hasLongtieng && (
            <EpisodeGrid
              episodes={episodesToDisplay}
              type="longtieng"
              slug={slug}
              movieTitle={movieTitle}
              currentEpisodeSlug={currentEpisodeSlug}
              currentType={currentType}
              isAnyFull={isAnyFull}
            />
          )}

          {/* Conditional message for no results or no episodes */}
          {filteredEpisodesLength === 0 && searchTerm && (
            <p className="text-gray-500 text-center text-sm mt-6 italic">
              Không tìm thấy tập phim nào phù hợp với từ khóa "{searchTerm}".
            </p>
          )}
          {filteredEpisodesLength === 0 && !searchTerm && (
            <p className="text-gray-500 text-center text-sm mt-6 italic">
              Hiện tại chưa có tập phim nào cho loại này.
            </p>
          )}
        </>
      )}

      {/* Show more/less button outside the conditional rendering of episode grid */}
      {!isAnyFull && !searchTerm && hasMoreThan40Episodes && (
        <ShowMoreButton
          showAllEpisodes={showAllEpisodes}
          setShowAllEpisodes={setShowAllEpisodes}
          filteredEpisodesLength={filteredEpisodesLength}
        />
      )}
    </div>
  );
};

export default Episodes;
