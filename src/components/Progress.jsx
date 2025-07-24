import React, { useState, useEffect, useCallback } from "react";

// --- IndexedDB Constants ---
const DB_NAME = "VideoProgressDB";
const DB_VERSION = 1;
const STORE_NAME = "videoProgress";

// --- IndexedDB Helper Functions ---
const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = (event) => reject(event.target.error);
    request.onsuccess = (event) => resolve(event.target.result);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        store.createIndex("lastUpdated", "lastUpdated", { unique: false });
      }
    };
  });
};

const getAllProgressFromDB = async () => {
  let db;
  try {
    db = await initDB();
    const transaction = db.transaction([STORE_NAME], "readonly");
    const store = transaction.objectStore(STORE_NAME);

    const result = await new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = (event) => reject(event.target.error);
    });

    return result || [];
  } catch (error) {
    console.error("Error getting all progress from IndexedDB:", error);
    return [];
  } finally {
    if (db) db.close();
  }
};

const deleteProgressFromDB = async (progressId) => {
  let db;
  try {
    db = await initDB();
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    await new Promise((resolve, reject) => {
      const request = store.delete(progressId);
      request.onsuccess = () => resolve();
      request.onerror = (event) => reject(event.target.error);
    });
  } catch (error) {
    console.error(
      `Error deleting progress for ID ${progressId} from IndexedDB:`,
      error
    );
  } finally {
    if (db) db.close();
  }
};

// --- Date Formatting Helper ---
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Hôm nay";
  if (diffDays === 1) return "Hôm qua";
  if (diffDays < 7) return `${diffDays} ngày trước`;

  return date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// --- WatchedMovies Component ---
const WatchedMovies = ({ onMovieSelect = null }) => {
  const [watchedMovies, setWatchedMovies] = useState([]);

  // Function to load and filter movies
  const loadWatchedMovies = useCallback(async () => {
    try {
      const allProgress = await getAllProgressFromDB();
      const movieMap = new Map();
      const idsToDelete = [];

      // Process and identify completed movies for deletion
      allProgress.forEach((item) => {
        const progressPercentage = (item.progress / item.duration) * 100;
        if (progressPercentage >= 90) {
          idsToDelete.push(item.id);
        } else {
          // Only keep the most recent progress for a given movie slug
          const movieKey = item.slug;
          if (
            !movieMap.has(movieKey) ||
            new Date(item.lastUpdated) >
              new Date(movieMap.get(movieKey).lastUpdated)
          ) {
            movieMap.set(movieKey, item);
          }
        }
      });

      if (idsToDelete.length > 0) {
        await Promise.all(idsToDelete.map((id) => deleteProgressFromDB(id)));
      }

      const movies = Array.from(movieMap.values())
        .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
        .slice(0, 4);

      setWatchedMovies(movies);
    } catch (error) {
      console.error("Error loading watched movies:", error);
    }
  }, []);

  useEffect(() => {
    loadWatchedMovies();
  }, [loadWatchedMovies]);

  const getProgressPercentage = (progress, duration) => {
    if (!duration || duration <= 0) return 0;
    return Math.min(Math.max((progress / duration) * 100, 0), 100);
  };

  if (watchedMovies.length === 0) {
    return null;
  }

  return (
    <section className="hidden lg:block relative bg-none lg:bg-[#18181b] pt-2 lg:px-6 rounded-[5px]">
      <h2 className="text-lg font-bold text-white">Phim Xem Gần Đây</h2>

      <div className="relative mt-2">
        <div className="grid grid-cols-2 gap-2 ">
          {watchedMovies.map((movie) => {
            const progressPercentage = getProgressPercentage(
              movie.progress,
              movie.duration
            );
            const movieLanguage = movie.ngonngu || "vi";

            const movieHref =
              movie.sotap && movie.sotap > 1
                ? `/xem-phim/${movie.slug}/tap-${movie.sotap}/${movieLanguage}`
                : `/xem-phim/${movie.slug}/full/${movieLanguage}`;

            return (
              <div key={movie.id} className="group relative block rounded-sm">
                <a
                  href={movieHref}
                  onClick={(e) => {
                    if (onMovieSelect) {
                      e.preventDefault();
                      onMovieSelect(movie);
                    }
                  }}
                  className="relative block aspect-[16/9] w-full overflow-hidden"
                >
                  <img
                    src={movie.banner || "/api/placeholder/300/200"}
                    alt={movie.ten_phim || "Ảnh bìa phim"}
                    className="h-full w-full rounded-t-[4px] object-cover"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = "/api/placeholder/300/200";
                    }}
                  />

                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-600/70">
                    <div
                      className="h-full bg-green-500"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>

                  {progressPercentage < 90 && (
                    <div className="group absolute bottom-4 right-2 cursor-pointer">
                      <svg
                        viewBox="0 0 60 60"
                        xmlns="http://www.w3.org/2000/svg"
                        className="play-button h-[20px] w-[20px] transition-transform duration-200"
                      >
                        <circle
                          cx="30"
                          cy="30"
                          r="30"
                          className="fill-green-500 transition-colors duration-200 group-hover:fill-green-400"
                        />
                        <path
                          d="M35.7461509,22.4942263 L45.1405996,36.5858994 C46.059657,37.9644855 45.6871354,39.8270935 44.3085493,40.7461509 C43.8157468,41.0746859 43.2367237,41.25 42.6444487,41.25 L23.8555513,41.25 C22.198697,41.25 20.8555513,39.9068542 20.8555513,38.25 C20.8555513,37.657725 21.0308654,37.078702 21.3594004,36.5858994 L30.7538491,22.4942263 C31.6729065,21.1156403 33.5355145,20.7431187 34.9141006,21.662176 C35.2436575,21.8818806 35.5264463,22.1646695 35.7461509,22.4942263 Z"
                          fill="#FFFFFF"
                          transform="translate(33.25, 30) rotate(-270) translate(-33.25, -30)"
                        />
                      </svg>
                    </div>
                  )}
                </a>

                <div className="flex flex-col items-center py-2 text-center text-gray-200">
                  <div className="mb-1 flex w-full items-start justify-center">
                    <div className="flex w-full flex-col items-center justify-center gap-1">
                      <h3
                        className="line-clamp-2 flex-grow text-sm font-semibold"
                        title={movie.ten_phim}
                      >
                        {movie.ten_phim || "Không có tên"}
                      </h3>
                      <p className="line-clamp-1 text-center text-[11px] text-gray-400 font-bold">
                        {movie.sotap && movie.sotap > 0
                          ? `Tập ${movie.sotap} - `
                          : ""}
                        {formatDate(movie.lastUpdated)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WatchedMovies;
