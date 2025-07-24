import { useRef, useEffect, useCallback, useState } from "react";
import Artplayer from "artplayer";
import Hls from "hls.js";

const DB_NAME = "VideoProgressDB";
const DB_VERSION = 1;
const STORE_NAME = "videoProgress";

const initDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
        store.createIndex("lastUpdated", "lastUpdated", { unique: false });
      }
    };
  });
};

const saveProgressToDB = async (progressData) => {
  try {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    await new Promise((resolve, reject) => {
      const request = store.put(progressData);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });

    db.close();
  } catch (error) {
    console.error("Error saving progress to IndexedDB:", error);
  }
};

const getProgressFromDB = async (progressKey) => {
  try {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], "readonly");
    const store = transaction.objectStore(STORE_NAME);

    const result = await new Promise((resolve, reject) => {
      const request = store.get(progressKey);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    db.close();
    return result || null;
  } catch (error) {
    console.error("Error getting progress from IndexedDB:", error);
    return null;
  }
};

const cleanupOldProgress = async () => {
  try {
    const db = await initDB();
    const transaction = db.transaction([STORE_NAME], "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const index = store.index("lastUpdated");

    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

    const request = index.openCursor(
      IDBKeyRange.upperBound(twoDaysAgo.toISOString())
    );

    request.onsuccess = (event) => {
      const cursor = event.target.result;
      if (cursor) {
        cursor.delete();
        cursor.continue();
      }
    };

    db.close();
  } catch (error) {
    console.error("Error cleaning up old progress:", error);
  }
};

const processVideoUrl = async (originalLink, skipAdApiEndpoint) => {
  if (!originalLink || !skipAdApiEndpoint)
    return { url: originalLink, success: false, isOriginal: true }; // Thêm isOriginal

  try {
    const url = new URL(skipAdApiEndpoint);
    url.searchParams.append("url", originalLink);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000); // 7-second timeout (tăng nhẹ để phù hợp với backend)
    const response = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);
    if (!response.ok) {
      console.warn("API lọc quảng cáo không phản hồi tốt. Thử dùng URL gốc.");
      return { url: originalLink, success: false, isOriginal: true }; // Thêm isOriginal
    }
    const playlistData = await response.text();
    if (playlistData.includes("#EXTM3U")) {
      const blob = new Blob([playlistData], {
        type: "application/vnd.apple.mpegurl",
      });
      const blobUrl = URL.createObjectURL(blob);
      console.log("Đã tạo Blob URL từ playlist đã lọc.");
      return { url: blobUrl, success: true, isOriginal: false }; // Thêm isOriginal
    } else {
      console.warn(
        "API lọc quảng cáo trả về playlist không hợp lệ. Thử dùng URL gốc."
      );
      return { url: originalLink, success: false, isOriginal: true }; // Thêm isOriginal
    }
  } catch (error) {
    console.error("Lỗi khi gọi API lọc quảng cáo:", error);
    return { url: originalLink, success: false, isOriginal: true }; // Thêm isOriginal
  }
};

const VideoPlayer = ({
  originalUrl,
  skipAdApiUrl,
  slug,
  ngonngu,
  sotap,
  ten_phim,
  activeServer,
  vietsubEpisodes = [],
  thuyetminhEpisodes = [],
  longtiengEpisodes = [],
  movieThumbnail, // <-- NHẬN PROP MỚI Ở ĐÂY
}) => {
  const containerRef = useRef(null);
  const artRef = useRef(null);
  const hlsRef = useRef(null);
  const [videoSource, setVideoSource] = useState(null);
  const [isLoadingSource, setIsLoadingSource] = useState(true);
  const [playerInitialized, setPlayerInitialized] = useState(false);
  const [error, setError] = useState(null);
  const [isUsingOriginalUrl, setIsUsingOriginalUrl] = useState(false); // State mới để theo dõi việc sử dụng URL gốc

  const isIframeSource = activeServer === "sv3";

  const getProgressKey = useCallback(() => {
    return `video_progress_${slug}_${sotap}_${ngonngu}`;
  }, [slug, sotap, ngonngu]);

  const getProgressFromIndexedDB = useCallback(async () => {
    if (isIframeSource) return null;
    try {
      const progressKey = getProgressKey();
      const savedData = await getProgressFromDB(progressKey);

      if (savedData) {
        return {
          progress: savedData.progress || 0,
          duration: savedData.duration || null,
          lastUpdated: savedData.lastUpdated || null,
        };
      }
      return null;
    } catch (error) {
      console.error("Lỗi khi lấy progress từ IndexedDB:", error);
      return null;
    }
  }, [getProgressKey, isIframeSource]);

  const saveProgressToIndexedDB = useCallback(
    async (progress, duration) => {
      if (isIframeSource) return;
      try {
        const progressKey = getProgressKey();
        const dataToSave = {
          id: progressKey,
          progress,
          duration,
          lastUpdated: new Date().toISOString(),
          slug,
          sotap,
          ngonngu,
          ten_phim,
          banner: movieThumbnail, // <-- LƯU THUMBNAIL VÀO ĐÂY
        };

        await saveProgressToDB(dataToSave);
        if (Math.random() < 0.1) {
          cleanupOldProgress();
        }
      } catch (error) {
        console.error("Không thể lưu progress:", error);
      }
    },
    [
      getProgressKey,
      slug,
      sotap,
      ngonngu,
      ten_phim,
      movieThumbnail, // <-- THÊM movieThumbnail VÀO DEPENDENCY ARRAY
      isIframeSource,
    ]
  );

  const findNextEpisodeUrl = useCallback(() => {
    const currentEpisodeNumber = parseInt(sotap, 10);
    const currentEpisodeType = ngonngu;

    let nextEpisode = null;
    let nextEpisodeType = currentEpisodeType;

    const filterAndSortEpisodes = (episodes) => {
      return episodes
        .filter((ep) => {
          const epNum = (ep.tap_phim?.so_tap || ep.so_tap || "")
            .toString()
            .toLowerCase();
          return epNum !== "full" && epNum !== "fullhd" && epNum !== "hd";
        })
        .sort(
          (a, b) =>
            parseInt(a.tap_phim?.so_tap || a.so_tap, 10) -
            parseInt(b.tap_phim?.so_tap || b.so_tap, 10)
        );
    };

    const filteredVietsub = filterAndSortEpisodes(vietsubEpisodes);
    const filteredThuyetminh = filterAndSortEpisodes(thuyetminhEpisodes);
    const filteredLongtieng = filterAndSortEpisodes(longtiengEpisodes);

    const languageOrder = [
      currentEpisodeType,
      "vietsub",
      "thuyetminh",
      "longtieng",
    ].filter((lang, i, arr) => arr.indexOf(lang) === i);

    for (const lang of languageOrder) {
      let episodesToSearch = [];
      if (lang === "vietsub") episodesToSearch = filteredVietsub;
      else if (lang === "thuyetminh") episodesToSearch = filteredThuyetminh;
      else if (lang === "longtieng") episodesToSearch = filteredLongtieng;
      else continue;

      if (lang === currentEpisodeType) {
        const currentIndex = episodesToSearch.findIndex(
          (ep) =>
            parseInt(ep.tap_phim?.so_tap || ep.so_tap, 10) ===
            currentEpisodeNumber
        );
        if (currentIndex !== -1 && currentIndex < episodesToSearch.length - 1) {
          nextEpisode = episodesToSearch[currentIndex + 1];
          nextEpisodeType = lang;
          break;
        }
      } else if (episodesToSearch.length > 0) {
        nextEpisode = episodesToSearch[0];
        nextEpisodeType = lang;
        break;
      }
    }

    if (nextEpisode) {
      const nextSoTap = nextEpisode.tap_phim?.so_tap || nextEpisode.so_tap;
      return `/xem-phim/${slug}/tap-${nextSoTap}/${nextEpisodeType}`;
    }
    return null;
  }, [
    sotap,
    ngonngu,
    vietsubEpisodes,
    thuyetminhEpisodes,
    longtiengEpisodes,
    slug,
  ]);

  useEffect(() => {
    let isMounted = true;
    let createdBlobUrl = null;

    const setupVideoSource = async () => {
      if (!originalUrl) {
        setError("Không tìm thấy nguồn video.");
        setIsLoadingSource(false);
        return;
      }

      setError(null);
      setIsLoadingSource(true);

      if (isIframeSource) {
        setVideoSource(originalUrl);
        setIsLoadingSource(false);
        setIsUsingOriginalUrl(true); // Nếu là iframe, luôn dùng originalUrl
      } else {
        const result = await processVideoUrl(originalUrl, skipAdApiUrl);
        if (isMounted) {
          if (result.success) {
            createdBlobUrl = result.url;
            setVideoSource(result.url);
            setIsUsingOriginalUrl(false); // Đã lọc thành công, không dùng original
          } else {
            // Nếu lọc thất bại, quay về originalUrl
            setVideoSource(result.url);
            setIsUsingOriginalUrl(true); // Đang dùng originalUrl
          }
          setIsLoadingSource(false);
        }
      }
    };

    setupVideoSource();

    return () => {
      isMounted = false;
      if (createdBlobUrl) {
        URL.revokeObjectURL(createdBlobUrl);
      }
    };
  }, [originalUrl, skipAdApiUrl, isIframeSource]);

  const handleDoubleTapSeek = useCallback((e) => {
    const art = artRef.current;
    if (!art || !art.template || !art.template.$video) return;

    const container = art.template.$video;
    const currentTime = new Date().getTime();
    const seekTime = 10;

    if (!art._lastTap) art._lastTap = 0;
    const tapLength = currentTime - art._lastTap;
    const rect = container.getBoundingClientRect();
    const x = e.changedTouches[0].clientX - rect.left;
    const isLeft = x < rect.width / 2;

    if (tapLength < 300 && tapLength > 0) {
      e.preventDefault();

      if (isLeft) {
        art.seek = Math.max(0, art.currentTime - seekTime);
      } else {
        art.seek = Math.min(art.duration, art.currentTime + seekTime);
      }

      if (art.paused) {
        art.play();
      }
    }
    art._lastTap = currentTime;
  }, []);

  useEffect(() => {
    if (
      !videoSource ||
      isIframeSource ||
      !containerRef.current ||
      isLoadingSource ||
      !playerInitialized
    ) {
      return;
    }

    if (artRef.current) {
      if (artRef.current.template && artRef.current.template.$video) {
        artRef.current.template.$video.removeEventListener(
          "touchend",
          handleDoubleTapSeek
        );
      }
      if (artRef.current.progressSaveInterval) {
        clearInterval(artRef.current.progressSaveInterval);
        artRef.current.progressSaveInterval = null;
      }
      artRef.current.destroy();
      artRef.current = null;
    }
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    const art = new Artplayer({
      container: containerRef.current,
      url: videoSource,
      type: "m3u8",
      volume: 1,
      isLive: false,
      autoplay: true,
      pip: true,
      setting: true,
      loop: false,
      flip: true,
      playbackRate: true,
      aspectRatio: true,
      fullscreen: true,
      mutex: true,
      backdrop: true,
      playsInline: true,
      airplay: true,
      notice: true,
      theme: "#ffffff",
      lang: "vi-VN",
      moreVideoAttr: {
        crossOrigin: "anonymous",
      },
      customType: {
        m3u8: function (video, url) {
          if (Hls.isSupported()) {
            const hls = new Hls({
              capLevelToPlayerSize: true,
              maxBufferLength: 15,
              startLevel: -1,
            });
            hlsRef.current = hls;
            hls.loadSource(url);
            hls.attachMedia(video);
            hls.on(Hls.Events.ERROR, (event, data) => {
              console.error("HLS.js error:", data);
              if (data.fatal) {
                if (!isUsingOriginalUrl) {
                  console.warn(
                    "Lỗi fatal khi phát Blob URL. Đang thử lại với nguồn gốc để kiểm tra."
                  );
                  if (hlsRef.current) {
                    hlsRef.current.destroy();
                    hlsRef.current = null;
                  }

                  setVideoSource(originalUrl);
                  setIsUsingOriginalUrl(true); // Đặt trạng thái đang dùng URL gốc tạm thời
                  setError(
                    "Lỗi xử lý nguồn video, đang thử lại với nguồn gốc. Vui lòng đợi..."
                  );
                } else {
                  // Đã thử dùng URL gốc mà vẫn lỗi fatal
                  setError(
                    "Không thể tải video. Vui lòng thử server khác hoặc refresh trang."
                  );
                }
              }
            });
          } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = url;
          } else {
            setError(
              "Trình duyệt không hỗ trợ phát video này. Vui lòng cập nhật hoặc thử trình duyệt khác."
            );
          }
        },
      },
      controls: [
        {
          position: "right",
          html: `<button aria-label="Lùi 10 giây" class="art-icon art-icon-backward art-mobile-hide">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 56 56"><path fill="currentColor" d="M28 54.402c13.055 0 23.906-10.828 23.906-23.906c0-11.531-8.437-21.305-19.383-23.46v-3.33c0-1.664-1.148-2.11-2.437-1.195l-7.477 5.226c-1.054.75-1.078 1.875 0 2.649l7.453 5.25c1.313.937 2.461.492 2.461-1.196v-3.35c8.86 2.015 15.375 9.914 15.375 19.406A19.84 19.84 0 0 1 28 50.418c-11.063 0-19.945-8.86-19.922-19.922c.023-6.656 3.258-12.539 8.25-16.101c.961-.727 1.266-1.829.656-2.813c-.562-.96-1.851-1.219-2.883-.422C8.055 15.543 4.094 22.621 4.094 30.496c0 13.078 10.828 23.906 23.906 23.906m5.648-14.039c3.891 0 6.446-3.68 6.446-9.304c0-5.672-2.555-9.399-6.446-9.399s-6.445 3.727-6.445 9.399c0 5.625 2.555 9.304 6.445 9.304m-12.21-.281c.913 0 1.5-.633 1.5-1.617V23.723c0-1.149-.61-1.875-1.665-1.875c-.633 0-1.078.21-1.922.773l-3.257 2.18c-.516.375-.774.797-.774 1.36c0 .773.61 1.429 1.36 1.429c.445 0 .656-.094 1.125-.422l2.18-1.594v12.89c0 .962.585 1.618 1.452 1.618m12.21-2.555c-2.062 0-3.398-2.46-3.398-6.468c0-4.079 1.312-6.563 3.398-6.563c2.11 0 3.375 2.461 3.375 6.563c0 4.007-1.289 6.468-3.375 6.468"/></svg>
            </button>`,
          mounted: function ($control) {
            $control.addEventListener("click", () => {
              art.seek = Math.max(0, art.currentTime - 10);
            });
          },
        },
        {
          position: "right",
          html: `<button aria-label="Tiến 10 giây" class="art-icon art-icon-forward art-mobile-hide">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 56 56"><path fill="currentColor" d="M28 54.402c13.055 0 23.906-10.828 23.906-23.906c0-7.875-3.984-14.953-10.008-19.336c-1.03-.797-2.32-.539-2.906.422c-.586.984-.281 2.086.656 2.813c4.993 3.562 8.25 9.445 8.274 16.101C47.945 41.56 39.039 50.418 28 50.418c-11.063 0-19.899-8.86-19.899-19.922c0-9.492 6.516-17.39 15.376-19.406v3.375c0 1.664 1.148 2.11 2.413 1.195l7.5-5.25c1.055-.726 1.079-1.851 0-2.625l-7.476-5.25c-1.29-.937-2.437-.492-2.437 1.196v3.304C12.507 9.168 4.094 18.965 4.094 30.496c0 13.078 10.828 23.906 23.906 23.906m5.672-14.039c3.89 0 6.422-3.68 6.422-9.304c0-5.672-2.532-9.399-6.422-9.399s-6.445 3.727-6.445 9.399c0 5.625 2.554 9.304 6.445 9.304m-12.235-.281c.914 0 1.524-.633 1.524-1.617V23.723c0-1.149-.633-1.875-1.688-1.875c-.633 0-1.054.21-1.922.773l-3.234 2.18c-.539.375-.773.797-.773 1.36c0 .773.609 1.429 1.359 1.429c.422 0 .656-.094 1.125-.422l2.18-1.594v12.89c0 .962.562 1.618 1.43 1.618m12.235-2.555c-2.086 0-3.399-2.46-3.399-6.468c0-4.079 1.29-6.563 3.399-6.563c2.086 0 3.351 2.461 3.351 6.563c0 4.007-1.289 6.468-3.351 6.468"/></svg>           </button>`,
          mounted: function ($control) {
            $control.addEventListener("click", () => {
              art.seek = Math.min(art.duration, art.currentTime + 10);
            });
          },
        },
      ],
    });

    artRef.current = art;

    art.on("ready", async () => {
      const progressData = await getProgressFromIndexedDB();
      if (progressData && progressData.progress > 0) {
        art.currentTime = progressData.progress;
        console.log(`Loaded progress: ${progressData.progress}s`);
      }

      if (art.template && art.template.$video) {
        art.template.$video.addEventListener("touchend", handleDoubleTapSeek);
      }
    });

    art.on("fullscreen", (state) => {
      if (state) {
        if (screen.orientation && screen.orientation.lock) {
          screen.orientation.lock("landscape").catch((err) => {
            console.warn("Could not lock screen orientation:", err);
          });
        }
      } else {
        if (screen.orientation && screen.orientation.unlock) {
          screen.orientation.unlock();
        }
      }
    });

    let progressSaveInterval;

    art.on("play", () => {
      // Đảm bảo chỉ có một interval chạy
      if (artRef.current.progressSaveInterval) {
        clearInterval(artRef.current.progressSaveInterval);
      }
      progressSaveInterval = setInterval(async () => {
        if (art && art.duration && art.currentTime > 0) {
          await saveProgressToIndexedDB(art.currentTime, art.duration);
        }
      }, 30000);
      artRef.current.progressSaveInterval = progressSaveInterval;
    });

    art.on("pause", async () => {
      if (artRef.current.progressSaveInterval) {
        clearInterval(artRef.current.progressSaveInterval);
        artRef.current.progressSaveInterval = null; // Xóa interval khỏi ref
      }
      if (art && art.duration && art.currentTime > 0) {
        await saveProgressToIndexedDB(art.currentTime, art.duration);
      }
    });

    art.on("ended", async () => {
      if (artRef.current.progressSaveInterval) {
        clearInterval(artRef.current.progressSaveInterval);
        artRef.current.progressSaveInterval = null;
      }
      if (art && art.duration) {
        // Lưu lại tiến độ cuối cùng là toàn bộ thời lượng
        await saveProgressToDB({
          id: getProgressKey(),
          progress: art.duration,
          duration: art.duration,
          lastUpdated: new Date().toISOString(),
          slug,
          sotap,
          ngonngu,
          ten_phim,
          banner: movieThumbnail, // <-- LƯU THUMBNAIL KHI KẾT THÚC VIDEO
        });
      }

      const nextUrl = findNextEpisodeUrl();
      if (nextUrl) {
        console.log("Video ended, navigating to next episode:", nextUrl);
        window.location.href = nextUrl;
      }
    });

    const handleUnload = async () => {
      if (
        artRef.current &&
        artRef.current.duration &&
        artRef.current.currentTime > 0
      ) {
        await saveProgressToIndexedDB(
          artRef.current.currentTime,
          artRef.current.duration
        );
      }
    };

    window.addEventListener("beforeunload", handleUnload);
    window.addEventListener("pagehide", handleUnload);

    return () => {
      handleUnload();

      window.removeEventListener("beforeunload", handleUnload);
      window.removeEventListener("pagehide", handleUnload);

      if (artRef.current && artRef.current.progressSaveInterval) {
        clearInterval(artRef.current.progressSaveInterval);
        artRef.current.progressSaveInterval = null;
      }

      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }

      if (artRef.current) {
        if (artRef.current.template && artRef.current.template.$video) {
          artRef.current.template.$video.removeEventListener(
            "touchend",
            handleDoubleTapSeek
          );
        }
        artRef.current.destroy();
        artRef.current = null;
      }
    };
  }, [
    videoSource,
    isLoadingSource,
    handleDoubleTapSeek,
    getProgressFromIndexedDB,
    saveProgressToIndexedDB,
    originalUrl,
    isIframeSource,
    playerInitialized,
    findNextEpisodeUrl,
    isUsingOriginalUrl, // Thêm dependency này
    getProgressKey, // Thêm dependency này cho ended event
    slug,
    sotap,
    ngonngu,
    ten_phim,
    movieThumbnail, // <-- THÊM movieThumbnail VÀO DEPENDENCY ARRAY
  ]);

  const handleCustomBannerClick = () => {
    setPlayerInitialized(true);
  };

  return (
    <div className="group relative aspect-[16/11] w-full overflow-hidden rounded-none lg:rounded-lg bg-black lg:aspect-[16/8]">
      {error && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black bg-opacity-75">
          <p className="p-4 text-center text-lg text-red-500">{error}</p>
        </div>
      )}

      {isIframeSource ? (
        <iframe
          src={originalUrl}
          frameBorder="0"
          allowFullScreen
          className="h-full w-full"
          title={`${ten_phim} - Tập ${sotap} (${
            ngonngu === "vietsub"
              ? "Vietsub"
              : ngonngu === "thuyetminh"
              ? "Thuyết Minh"
              : "Lồng Tiếng"
          })`}
          referrerPolicy="origin"
          sandbox="allow-forms allow-pointer-lock allow-same-origin allow-scripts allow-top-navigation-by-user-activation"
        ></iframe>
      ) : (
        <>
          {!playerInitialized && (
            <div
              className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black"
              onClick={handleCustomBannerClick}
            >
              {isLoadingSource ? (
                <div className="flex flex-col items-center">
                  {/* Có thể thêm spinner ở đây */}
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                  <p className="text-white mt-2">Đang tải video...</p>
                </div>
              ) : (
                <button
                  className="rounded-full bg-white bg-opacity-30 p-4 text-white backdrop-blur-sm transition-transform duration-300 hover:scale-110"
                  aria-label="Play video"
                  disabled={!!error}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="56"
                    height="56"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              )}
            </div>
          )}

          {playerInitialized && (
            <div ref={containerRef} className="h-full w-full" />
          )}
        </>
      )}
    </div>
  );
};

export default VideoPlayer;
