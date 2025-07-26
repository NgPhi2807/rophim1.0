/* empty css                                      */
import { c as createComponent, m as maybeRenderHead, e as addAttribute, a as renderTemplate, b as createAstro, d as renderComponent, F as Fragment, u as unescapeHTML } from '../chunks/astro/server_CHdT0zCU.mjs';
import 'kleur/colors';
import { $ as $$Layout, H as Header } from '../chunks/Header_DfUnSFlX.mjs';
import { jsx, jsxs } from 'react/jsx-runtime';
import { useRef, useState, useEffect, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { b as rutGonTinhTrangPhim1, a as rutGonTinhTrangNgonNgu, r as rutGonTinhTrangPhim } from '../chunks/movieUtils_DevODtGj.mjs';
import axios from 'axios';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

function convertImageUrlToProxy(url) {
  if (!url) {
    return "";
  }
  const index = url.indexOf("/upload/");
  if (index === -1) return "";
  const path = url.slice(index + "/upload/".length);
  return `https://ik.imagekit.io/17mpki7mv/motchill/upload/${path}?tr=w-1200,h-450,f-webp,fo-auto`;
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
  maskRepeat: "no-repeat"
};
const MAX_DOTS = 7;
function MovieCard$2({ movies: initialMovies = [] }) {
  const scrollRef = useRef(null);
  const [allMovies, setAllMovies] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [dotsCount, setDotsCount] = useState(0);
  const [animationDirection, setAnimationDirection] = useState(1);
  useMediaQuery({ minWidth: 1024 });
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  useEffect(() => {
    if (initialMovies && initialMovies.length > 0) {
      setAllMovies(initialMovies);
      setCurrentMovieIndex(
        (prevIndex) => Math.min(prevIndex, initialMovies.length - 1)
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
    updateDotsCount();
    window.addEventListener("resize", updateDotsCount);
    return () => {
      window.removeEventListener("resize", updateDotsCount);
    };
  }, [updateDotsCount]);
  const scroll = useCallback(
    (direction) => {
      if (direction === "left") {
        setAnimationDirection(-1);
        setCurrentMovieIndex((prevIndex) => Math.max(0, prevIndex - 1));
      } else {
        setAnimationDirection(1);
        setCurrentMovieIndex(
          (prevIndex) => Math.min(allMovies.length - 1, prevIndex + 1)
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
      setAnimationDirection(1);
      setCurrentMovieIndex(
        (prevIndex) => Math.min(allMovies.length - 1, prevIndex + 1)
      );
    } else if (swipeDistance < -75) {
      setAnimationDirection(-1);
      setCurrentMovieIndex((prevIndex) => Math.max(0, prevIndex - 1));
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  }, [allMovies.length]);
  if (!currentMovie) {
    return null;
  }
  const mainThumbUrl = convertImageUrlToProxy(currentMovie.thumb_url);
  return /* @__PURE__ */ jsx("section", { className: "relative h-auto py-2 lg:px-0 lg:py-0", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => scroll("left"),
        disabled: currentMovieIndex === 0,
        className: "absolute left-0 top-1/2 -translate-y-1/2 z-20 hidden lg:block p-2 transition-colors duration-200 hover:scale-110 cursor-pointer",
        "aria-label": "Cuộn trái",
        children: /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: "40",
            height: "40",
            viewBox: "0 0 24 24",
            className: "drop-shadow-[0_0_12px_rgba(255,255,255,0.7)] text-gray-100",
            children: /* @__PURE__ */ jsxs("g", { fill: "none", fillRule: "evenodd", children: [
              /* @__PURE__ */ jsx("path", { d: "M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" }),
              /* @__PURE__ */ jsx(
                "path",
                {
                  fill: "currentColor",
                  d: "M7.94 13.06a1.5 1.5 0 0 1 0-2.12l5.656-5.658a1.5 1.5 0 1 1 2.121 2.122L11.122 12l4.596 4.596a1.5 1.5 0 1 1-2.12 2.122l-5.66-5.658Z"
                }
              )
            ] })
          }
        )
      }
    ),
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: scrollRef,
        className: "no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth",
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd,
        children: /* @__PURE__ */ jsxs("div", { className: "group movie-card-item movie-hero-width ", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative block aspect-[16/9] lg:aspect-[16/7] w-full overflow-hidden rounded-none lg:rounded-[4px]", children: [
            /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: /* @__PURE__ */ jsx(
              motion.img,
              {
                src: mainThumbUrl,
                alt: `Poster phim ${currentMovie.name}`,
                className: "h-full w-full object-cover brightness-110",
                loading: "lazy",
                width: "800",
                height: "450",
                style: gradientMaskStyle,
                initial: { opacity: 0, x: animationDirection * 100 },
                animate: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: animationDirection * -100 },
                transition: { duration: 0.3 }
              },
              currentMovie._id || currentMovie.slug
            ) }),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "hidden md:block absolute inset-0 z-[1] pointer-events-none",
                style: {
                  backgroundImage: `radial-gradient(rgba(0,0,0,0.1) 0.5px, transparent 0.5px)`,
                  backgroundSize: "3px 3px"
                },
                "aria-hidden": "true"
              }
            ),
            dotsCount > 1 && /* @__PURE__ */ jsx("div", { className: "absolute bottom-5 lg:bottom-8 lg:right-8 right-5 flex gap-1.5 z-20 ", children: Array.from({ length: dotsCount }).map((_, dotIndex) => /* @__PURE__ */ jsx(
              "span",
              {
                className: `block h-1 lg:h-1.5 rounded-[1px] lg:rounded-[2px] transition-all duration-300 ${dotIndex === currentMovieIndex ? "bg-white w-2 lg:w-3" : "bg-gray-400 w-1 lg:w-2"}`,
                "aria-label": `Slide ${dotIndex + 1}`,
                onClick: (e) => {
                  e.preventDefault();
                  setAnimationDirection(
                    dotIndex > currentMovieIndex ? 1 : -1
                  );
                  setCurrentMovieIndex(dotIndex);
                }
              },
              dotIndex
            )) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "absolute bottom-5 lg:bottom-20 left-4 flex flex-col gap-1 lg:gap-3 text-white z-20 lg:left-16 drop-shadow-[0_20px_20px_rgba(0,0,0,10)]", children: [
            /* @__PURE__ */ jsx(
              "h2",
              {
                className: "line-clamp-1 text-lg lg:text-3xl font-bold ",
                id: `movie-title-${currentMovie.id || currentMovie.slug}`,
                children: /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: `/phim/${currentMovie.slug}`,
                    title: currentMovie.name,
                    children: currentMovie.name
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-white", children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "rounded-bl-sm rounded-tl-sm py-1 text-xs lg:text-base font-normal",
                  "aria-label": `Tình trạng phim: ${rutGonTinhTrangPhim1(
                    currentMovie.episode_current
                  )}`,
                  children: rutGonTinhTrangPhim1(currentMovie.episode_current)
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "w-[1px] h-4 bg-white/30", "aria-hidden": "true" }),
              /* @__PURE__ */ jsx(
                "p",
                {
                  className: "line-clamp-1 text-xs lg:text-base font-normal text-[#ffd875]",
                  "aria-label": `Tên khác: ${currentMovie.origin_name}`,
                  children: currentMovie.origin_name
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2.5 text-[10px] lg:text-xs font-medium text-white", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center border border-yellow-300 lg:px-2 px-1 py-0.5 lg:py-1 rounded-md", children: [
                /* @__PURE__ */ jsx("p", { className: "text-[#f7d54d]", children: "IMDb" }),
                /* @__PURE__ */ jsx("p", { className: "pl-1", children: currentMovie.tmdb.vote_average === 0 ? 10 : currentMovie.tmdb.vote_average.toFixed(1) })
              ] }),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "bg-white lg:px-2 px-1 py-0.5 lg:py-1 rounded-md text-black font-bold",
                  "aria-label": `Ngôn ngữ: ${rutGonTinhTrangNgonNgu(
                    currentMovie.lang
                  )}`,
                  children: rutGonTinhTrangNgonNgu(currentMovie.lang)
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "bg-gradient-to-tr from-[#FFD875] to-white lg:px-2 px-1 py-0.5 lg:py-1 rounded-md text-black font-bold",
                  "aria-label": `Chất lượng phim: ${currentMovie.quality}`,
                  children: currentMovie.quality
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "border border-white lg:px-2 px-1 py-0.5 lg:py-1 rounded-md",
                  "aria-label": `Năm phát hành: ${currentMovie.year}`,
                  children: currentMovie.year
                }
              ),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "border border-white lg:px-2 px-1 py-0.5 lg:py-1 rounded-md",
                  "aria-label": `Thời lượng phim: ${currentMovie.time}`,
                  children: currentMovie.time
                }
              )
            ] }),
            currentMovie.category?.length > 0 && /* @__PURE__ */ jsx("div", { className: "mt-2 hidden flex-wrap gap-2 lg:flex", children: currentMovie.category.map((genre) => /* @__PURE__ */ jsx(
              "a",
              {
                href: `/the-loai/${genre.slug}`,
                className: "rounded-[4px] bg-[#ffffff14] px-3 py-1 text-[13px] font-medium text-gray-200 transition-colors duration-200 hover:text-yellow-400",
                "aria-label": `Thể loại: ${genre.name}`,
                children: genre.name
              },
              genre.slug
            )) })
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => scroll("right"),
        disabled: currentMovieIndex === allMovies.length - 1,
        className: "absolute right-0 top-1/2 -translate-y-1/2 z-20 hidden lg:block px-2 transition-colors duration-500 hover:scale-110",
        "aria-label": "Cuộn phải",
        children: /* @__PURE__ */ jsx(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: "40",
            height: "40",
            viewBox: "0 0 24 24",
            className: "drop-shadow-[0_0_12px_rgba(255,255,255,0.7)] text-gray-100",
            children: /* @__PURE__ */ jsxs("g", { fill: "none", fillRule: "evenodd", children: [
              /* @__PURE__ */ jsx("path", { d: "M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" }),
              /* @__PURE__ */ jsx(
                "path",
                {
                  fill: "currentColor",
                  d: "M16.06 10.94a1.5 1.5 0 0 1 0 2.12l-5.656 5.658a1.5 1.5 0 1 1-2.121-2.122L12.879 12L8.283 7.404a1.5 1.5 0 0 1 2.12-2.122l5.658 5.657Z"
                }
              )
            ] })
          }
        )
      }
    )
  ] }) });
}

const BASE_URL = "https://phimapi.com";
const CACHE_KEY = "homepageDataCache";
const CACHE_EXPIRATION_TIME = 2 * 60 * 60 * 1e3;
const homepageAxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5e3,
  headers: { "Content-Type": "application/json", Accept: "application/json" }
});
async function getHomePageData() {
  const endpoints = [
    {
      key: "moviechinas",
      url: `/v1/api/danh-sach/phim-bo?page=1&sort_field=_id&sort_type=dsc&country=trung-quoc&year=2025&limit=24`
    },
    {
      key: "moviekoreas",
      url: `/v1/api/danh-sach/phim-bo?page=1&sort_type=dsc&country=han-quoc&year=2025&limit=24`
    },
    {
      key: "moviethailans",
      url: `/v1/api/danh-sach/phim-bo?page=1&sort_type=dsc&country=thai-lan&year=2025&limit=24`
    },
    {
      key: "movieusuks",
      url: `/v1/api/danh-sach/phim-bo?page=1&sort_type=dsc&country=au-my  &year=2025&limit=24`
    },
    {
      key: "moviehhs",
      url: `/v1/api/danh-sach/hoat-hinh?page=1&sort_type=dsc&year=2025&limit=18`
    },
    {
      key: "movieles",
      url: `/v1/api/danh-sach/phim-le?page=1&sort_type=dsc&year=2025&limit=18`
    },
    {
      key: "movieles_hanhdong",
      url: `/v1/api/danh-sach/phim-le?page=1&sort_type=dsc&category=hanh-dong&year=2025&limit=12`
    },
    {
      key: "movieles_kinhdi",
      url: `/v1/api/danh-sach/phim-le?page=1&sort_field=_id&sort_type=dsc&category=kinh-di&year=2025&limit=12`
    },
    {
      key: "movieles_tamly",
      url: `/v1/api/danh-sach/phim-le?page=1&sort_field=_id&sort_type=dsc&category=tam-ly&year=2025&limit=12`
    },
    {
      key: "movieles_phieuluu",
      url: `/v1/api/danh-sach/phim-le?page=1&sort_field=_id&sort_type=dsc&category=phieu-luu&year=2025&limit=12`
    },
    {
      key: "moviebos",
      url: `/v1/api/danh-sach/phim-bo?page=1&sort_type=dsc&year=2025&limit=18`
    },
    {
      key: "moviebos_hanhdong",
      url: `/v1/api/danh-sach/phim-bo?page=1&sort_field=_id&sort_type=dsc&category=hanh-dong&year=2025&limit=12`
    },
    {
      key: "moviebos_kinhdi",
      url: `/v1/api/danh-sach/phim-bo?page=1&sort_field=_id&sort_type=dsc&category=kinh-di&year=2025&limit=12`
    },
    {
      key: "moviebos_tamly",
      url: `/v1/api/danh-sach/phim-bo?page=1&sort_field=_id&sort_type=dsc&category=tam-ly&year=2025&limit=12`
    },
    {
      key: "moviebos_phieuluu",
      url: `/v1/api/danh-sach/phim-bo?page=1&sort_field=_id&sort_type=dsc&category=phieu-luu&year=2025&limit=12`
    },
    {
      key: "moviehoathinhs",
      url: `/v1/api/danh-sach/hoat-hinh?page=1&sort_type=dsc&country=trung-quoc&year=2025&limit=12`
    },
    {
      key: "moviecotrangs",
      url: `/v1/api/danh-sach/phim-bo?page=1&sort_type=dsc&category=co-trang&country=trung-quoc&year=2025&limit=12`
    },
    {
      key: "moviehots",
      url: `/danh-sach/phim-moi-cap-nhat-v3?page=1&limit=10`
    },
    {
      key: "movietodays",
      url: `/v1/api/danh-sach/phim-bo?page=1&sort_type=dsc&limit=10`
    },
    {
      key: "movieupchieuraps",
      url: `/v1/api/danh-sach/phim-chieu-rap?page=1&sort_type=dsc&limit=12`
    }
  ];
  if (typeof window !== "undefined" && window.localStorage) {
    const cachedData = localStorage.getItem(CACHE_KEY);
    const cachedTimestamp = localStorage.getItem(`${CACHE_KEY}_timestamp`);
    if (cachedData && cachedTimestamp) {
      const parsedTimestamp = parseInt(cachedTimestamp, 10);
      if (Date.now() - parsedTimestamp < CACHE_EXPIRATION_TIME) {
        try {
          return JSON.parse(cachedData);
        } catch (e) {
          localStorage.removeItem(CACHE_KEY);
          localStorage.removeItem(`${CACHE_KEY}_timestamp`);
        }
      } else {
        localStorage.removeItem(CACHE_KEY);
        localStorage.removeItem(`${CACHE_KEY}_timestamp`);
      }
    }
  }
  try {
    const results = await Promise.all(
      endpoints.map(
        ({ key, url }) => homepageAxiosInstance.get(url).then((response) => response.data).catch((error) => {
          console.error(
            `❌ Error fetching data for '${key}' from ${url}:`,
            error.message,
            error.response?.statusText || ""
          );
          if (key === "moviehots") {
            return { items: [] };
          } else {
            return { data: { items: [] } };
          }
        })
      )
    );
    const processedData = results.reduce((acc, res, i) => {
      const currentKey = endpoints[i].key;
      let items = [];
      if (currentKey === "moviehots") {
        items = res?.items || [];
      } else {
        items = res?.data?.items || [];
      }
      acc[currentKey] = items;
      return acc;
    }, {});
    if (typeof window !== "undefined" && window.localStorage) {
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(processedData));
        localStorage.setItem(`${CACHE_KEY}_timestamp`, Date.now().toString());
      } catch (e) {
      }
    }
    return processedData;
  } catch (err) {
    return Object.fromEntries(endpoints.map((e) => [e.key, []]));
  }
}

function MovieCard$1({ movies = [], title = "Phim" }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const GAP_PX = 8;
  if (!movies || movies.length === 0) {
    return null;
  }
  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    const hasScrollableContent = el.scrollWidth > el.clientWidth;
    const scrollEndThreshold = Math.round(el.scrollWidth - el.clientWidth);
    if (hasScrollableContent) {
      setCanScrollLeft(el.scrollLeft > 5);
      setCanScrollRight(el.scrollLeft < scrollEndThreshold - 5);
    } else {
      setCanScrollLeft(false);
      setCanScrollRight(false);
    }
  };
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [movies]);
  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const firstItem = el.querySelector(".movie-card-item");
    if (!firstItem) return;
    const itemWidth = firstItem.offsetWidth + GAP_PX;
    const scrollAmount = direction === "left" ? -itemWidth : itemWidth;
    el.scrollBy({
      left: scrollAmount,
      behavior: "smooth"
    });
  };
  return /* @__PURE__ */ jsxs(
    "section",
    {
      className: "relative h-auto px-0 py-2",
      "aria-labelledby": `${title.replace(/\s+/g, "-")}-heading`,
      children: [
        /* @__PURE__ */ jsx("div", { className: "mb-4 flex items-center justify-between", children: /* @__PURE__ */ jsx(
          "h2",
          {
            id: `${title.replace(/\s+/g, "-")}-heading`,
            className: "text-lg font-bold text-white lg:text-2xl",
            children: title
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "relative ", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              ref: scrollRef,
              className: "no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth ",
              children: movies.map((movie) => {
                const {
                  id,
                  slug,
                  name,
                  poster_url,
                  episode_current,
                  lang,
                  tmdb,
                  origin_name
                } = movie;
                const movieKey = id || slug;
                const fullPosterUrl = `https://ik.imagekit.io/17mpki7mv/motchill/${poster_url}?tr=f-webp,w-300,h-450,fo-auto,q-85`;
                return /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: `/phim/${slug}`,
                    title: name,
                    className: "group movie-card-item movie-card-width ",
                    "aria-label": `Xem phim ${name}`,
                    children: [
                      /* @__PURE__ */ jsxs("div", { className: "relative aspect-[2/3] w-full overflow-hidden rounded-md", children: [
                        /* @__PURE__ */ jsx(
                          "img",
                          {
                            src: fullPosterUrl,
                            alt: `Poster phim ${name}`,
                            className: "h-full w-full object-cover brightness-100",
                            loading: "lazy"
                          }
                        ),
                        /* @__PURE__ */ jsx(
                          "div",
                          {
                            className: "absolute bottom-0 left-0 h-[40%] w-full rounded-b-[4px]",
                            style: {
                              background: "linear-gradient(to top,rgba(30, 30, 30, 0.8) 5%, transparent 100%)"
                            },
                            "aria-hidden": "true"
                          }
                        ),
                        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-[4px] bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" }),
                        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100", children: /* @__PURE__ */ jsxs(
                          "svg",
                          {
                            viewBox: "0 0 60 60",
                            xmlns: "http://www.w3.org/2000/svg",
                            className: "play-button h-[25px] w-[25px] transition-transform duration-700 sm:h-[30px] sm:w-[30px] ease-in-out",
                            "aria-hidden": "true",
                            children: [
                              /* @__PURE__ */ jsx(
                                "circle",
                                {
                                  cx: "30",
                                  cy: "30",
                                  r: "30",
                                  className: "fill-[#FFDE8A] transition-colors duration-200"
                                }
                              ),
                              /* @__PURE__ */ jsx(
                                "path",
                                {
                                  d: "M35.7461509,22.4942263 L45.1405996,36.5858994 C46.059657,37.9644855 45.6871354,39.8270935 44.3085493,40.7461509 C43.8157468,41.0746859 43.2367237,41.25 42.6444487,41.25 L23.8555513,41.25 C22.198697,41.25 20.8555513,39.9068542 20.8555513,38.25 C20.8555513,37.657725 21.0308654,37.078702 21.3594004,36.5858994 L30.7538491,22.4942263 C31.6729065,21.1156403 33.5355145,20.7431187 34.9141006,21.662176 C35.2436575,21.8818806 35.5264463,22.1646695 35.7461509,22.4942263 Z",
                                  fill: "#000000",
                                  transform: "translate(33.25, 30) rotate(-270) translate(-33.25, -30)"
                                }
                              )
                            ]
                          }
                        ) }),
                        /* @__PURE__ */ jsxs("div", { className: "absolute bottom-2 lg:bottom-0 left-2 lg:left-1/2 transform -translate-x-0 lg:-translate-x-1/2 flex flex-col lg:flex-row z-20 text-[10px] lg:text-[11px] font-semibold leading-tight text-white gap-1 lg:gap-0", children: [
                          /* @__PURE__ */ jsx(
                            "span",
                            {
                              className: "whitespace-nowrap px-2 py-0.5 lg:py-1 rounded-md lg:rounded-none lg:rounded-tl-md bg-[#5e6070]",
                              "aria-label": `Tình trạng phim: ${episode_current}`,
                              children: rutGonTinhTrangPhim(episode_current)
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "span",
                            {
                              className: "whitespace-nowrap w-fit px-2 py-0.5 lg:py-1 rounded-md lg:rounded-none lg:rounded-tr-md bg-[#2ca35d]",
                              "aria-label": `Ngôn ngữ phim: ${lang}`,
                              children: rutGonTinhTrangNgonNgu(lang)
                            }
                          )
                        ] }),
                        /* @__PURE__ */ jsx("div", { className: "absolute top-2 left-2 bg-black/70 backdrop-blur-3xl rounded-md py-1 px-2 shadow-md", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center gap-1 font-bold justify-center text-white text-[10px] lg:text-xs leading-tight", children: [
                          /* @__PURE__ */ jsx("p", { className: "text-[#f0d25c]", children: "IMDb" }),
                          /* @__PURE__ */ jsx("p", { className: "flex items-center", children: tmdb.vote_average === 0 ? 10 : tmdb.vote_average.toFixed(1) })
                        ] }) })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "py-2 flex flex-col items-center justify-center gap-1", children: [
                        /* @__PURE__ */ jsx(
                          "h3",
                          {
                            className: "line-clamp-1 text-[13px] font-medium text-white hover:text-[#FFDE8A]",
                            title: name,
                            children: name
                          }
                        ),
                        /* @__PURE__ */ jsx("p", { className: "line-clamp-1 text-[12px] font-medium text-gray-400", children: origin_name })
                      ] })
                    ]
                  },
                  movieKey
                );
              })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => scroll("left"),
              className: `absolute left-0 z-30  lg:top-[7.5rem] xl:top-[6.5rem] sm:flex hidden h-8 w-8 items-center justify-center transition-opacity duration-300 py-1 hover:scale-110 cursor-pointer ${canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"} sm:block hidden`,
              "aria-label": `Cuộn trái phần ${title}`,
              disabled: !canScrollLeft,
              children: /* @__PURE__ */ jsx(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "32",
                  height: "32",
                  viewBox: "0 0 24 24",
                  className: "drop-shadow-[0_0_12px_rgba(255,255,255,0.7)] text-gray-100",
                  children: /* @__PURE__ */ jsxs("g", { fill: "none", fillRule: "evenodd", children: [
                    /* @__PURE__ */ jsx("path", { d: "M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" }),
                    /* @__PURE__ */ jsx(
                      "path",
                      {
                        fill: "currentColor",
                        d: "M7.94 13.06a1.5 1.5 0 0 1 0-2.12l5.656-5.658a1.5 1.5 0 1 1 2.121 2.122L11.122 12l4.596 4.596a1.5 1.5 0 1 1-2.12 2.122l-5.66-5.658Z"
                      }
                    )
                  ] })
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => scroll("right"),
              className: `absolute right-0 z-30  lg:top-[7.5rem] xl:top-[6.5rem] sm:flex hidden h-8 w-8 items-center justify-center transition-opacity duration-300 py-1 hover:scale-110 cursor-pointer ${canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"} sm:block hidden`,
              "aria-label": `Cuộn phải phần ${title}`,
              disabled: !canScrollRight,
              children: /* @__PURE__ */ jsx(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "32",
                  height: "32",
                  viewBox: "0 0 24 24",
                  className: "drop-shadow-[0_0_12px_rgba(255,255,255,0.7)] text-gray-100",
                  children: /* @__PURE__ */ jsxs("g", { fill: "none", fillRule: "evenodd", children: [
                    /* @__PURE__ */ jsx("path", { d: "M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.019-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" }),
                    /* @__PURE__ */ jsx(
                      "path",
                      {
                        fill: "currentColor",
                        d: "M16.06 10.94a1.5 1.5 0 0 1 0 2.12l-5.656 5.658a1.5 1.5 0 1 1-2.121-2.122L12.879 12L8.283 7.404a1.5 1.5 0 0 1 2.12-2.122l5.658 5.657Z"
                      }
                    )
                  ] })
                }
              )
            }
          )
        ] })
      ]
    }
  );
}

function MovieCard({ movies = [], title = "Phim" }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const GAP_PX = 8;
  const clipPathLeft = "polygon(94.239% 100%, 5.761% 100%, 5.761% 100%, 4.826% 99.95%, 3.94% 99.803%, 3.113% 99.569%, 2.358% 99.256%, 1.687% 98.87%, 1.111% 98.421%, .643% 97.915%, .294% 97.362%, .075% 96.768%, 0 96.142%, 0 3.858%, 0 3.858%, .087% 3.185%, .338% 2.552%, .737% 1.968%, 1.269% 1.442%, 1.92% .984%, 2.672% .602%, 3.512% .306%, 4.423% .105%, 5.391% .008%, 6.4% .024%, 94.879% 6.625%, 94.879% 6.625%, 95.731% 6.732%, 96.532% 6.919%, 97.272% 7.178%, 97.942% 7.503%, 98.533% 7.887%, 99.038% 8.323%, 99.445% 8.805%, 99.747% 9.326%, 99.935% 9.88%, 100% 10.459%, 100% 96.142%, 100% 96.142%, 99.925% 96.768%, 99.706% 97.362%, 99.357% 97.915%, 98.889% 98.421%, 98.313% 98.87%, 97.642% 99.256%, 96.887% 99.569%, 96.06% 99.803%, 95.174% 99.95%, 94.239% 100%)";
  const clipPathRight = "polygon(5.761% 100%, 94.239% 100%, 94.239% 100%, 95.174% 99.95%, 96.06% 99.803%, 96.887% 99.569%, 97.642% 99.256%, 98.313% 98.87%, 98.889% 98.421%, 99.357% 97.915%, 99.706% 97.362%, 99.925% 96.768%, 100% 96.142%, 100% 3.858%, 100% 3.858%, 99.913% 3.185%, 99.662% 2.552%, 99.263% 1.968%, 98.731% 1.442%, 98.08% .984%, 97.328% .602%, 96.488% .306%, 95.577% .105%, 94.609% .008%, 93.6% .024%, 5.121% 6.625%, 5.121% 6.625%, 4.269% 6.732%, 3.468% 6.919%, 2.728% 7.178%, 2.058% 7.503%, 1.467% 7.887%, .962% 8.323%, .555% 8.805%, .253% 9.326%, .065% 9.88%, 0% 10.459%, 0% 96.142%, 0% 96.142%, .075% 96.768%, .294% 97.362%, .643% 97.915%, 1.111% 98.421%, 1.687% 98.87%, 2.358% 99.256%, 3.113% 99.569%, 3.94% 99.803%, 4.826% 99.95%, 5.761% 100%)";
  if (!movies || movies.length === 0) {
    return null;
  }
  const updateScrollButtons = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const hasScrollableContent = el.scrollWidth > el.clientWidth;
    const scrollEndThreshold = Math.round(el.scrollWidth - el.clientWidth);
    if (hasScrollableContent) {
      setCanScrollLeft(el.scrollLeft > 5);
      setCanScrollRight(el.scrollLeft < scrollEndThreshold - 5);
    } else {
      setCanScrollLeft(false);
      setCanScrollRight(false);
    }
  }, []);
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
    };
  }, [movies, updateScrollButtons]);
  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const firstItem = el.querySelector(".movie-card-item");
    if (!firstItem) return;
    const itemWidth = firstItem.offsetWidth + GAP_PX;
    const scrollAmount = direction === "left" ? -itemWidth : itemWidth;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };
  const getFullPosterUrl = (poster_url) => {
    return `https://ik.imagekit.io/17mpki7mv/motchill/${poster_url}?tr=f-webp,w-300,h-450,fo-auto,q-85`;
  };
  return /* @__PURE__ */ jsxs(
    "section",
    {
      className: "relative h-auto px-0 py-2",
      "aria-labelledby": `${title.replace(/\s+/g, "-")}-heading`,
      children: [
        /* @__PURE__ */ jsx("div", { className: "mb-4 flex items-center justify-between", children: /* @__PURE__ */ jsx(
          "h2",
          {
            id: `${title.replace(/\s+/g, "-")}-heading`,
            className: "text-lg font-bold text-white lg:text-2xl",
            children: title
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "relative ", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              ref: scrollRef,
              className: "no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth ",
              children: movies.map((movie, index) => {
                const {
                  id,
                  slug,
                  name,
                  poster_url,
                  episode_current,
                  lang,
                  origin_name
                } = movie;
                const movieKey = id || slug;
                const fullPosterUrl = getFullPosterUrl(poster_url);
                const cardClipPath = index % 2 === 0 ? clipPathLeft : clipPathRight;
                return /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: `/phim/${slug}`,
                    title: name,
                    className: "group movie-card-item movie-card-width2",
                    "aria-label": `Xem phim ${name}`,
                    children: [
                      /* @__PURE__ */ jsxs(
                        "div",
                        {
                          className: "relative aspect-[2/3] w-full overflow-hidden rounded-[4px] ",
                          style: {
                            clipPath: cardClipPath,
                            WebkitClipPath: cardClipPath
                          },
                          children: [
                            /* @__PURE__ */ jsx(
                              "img",
                              {
                                src: fullPosterUrl,
                                alt: `Poster phim ${name}`,
                                className: "h-full w-full object-cover brightness-110 rounded-[4px] transition-all duration-200 hover:border-yellow-300 hover:border-2",
                                loading: "lazy",
                                width: "300",
                                height: "450"
                              }
                            ),
                            /* @__PURE__ */ jsx(
                              "div",
                              {
                                className: "absolute bottom-0 left-0 h-[50%] w-full rounded-b-[4px]",
                                style: {
                                  background: "linear-gradient(to top,black 10%, transparent 100%)"
                                },
                                "aria-hidden": "true"
                              }
                            ),
                            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-[4px] bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" }),
                            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100", children: /* @__PURE__ */ jsxs(
                              "svg",
                              {
                                viewBox: "0 0 60 60",
                                xmlns: "http://www.w3.org/2000/svg",
                                className: "play-button h-[25px] w-[25px] transition-transform duration-700 sm:h-[30px] sm:w-[30px] ease-in-out",
                                "aria-hidden": "true",
                                children: [
                                  /* @__PURE__ */ jsx(
                                    "circle",
                                    {
                                      cx: "30",
                                      cy: "30",
                                      r: "30",
                                      className: "fill-[#FFDE8A] transition-colors duration-200"
                                    }
                                  ),
                                  /* @__PURE__ */ jsx(
                                    "path",
                                    {
                                      d: "M35.7461509,22.4942263 L45.1405996,36.5858994 C46.059657,37.9644855 45.6871354,39.8270935 44.3085493,40.7461509 C43.8157468,41.0746859 43.2367237,41.25 42.6444487,41.25 L23.8555513,41.25 C22.198697,41.25 20.8555513,39.9068542 20.8555513,38.25 C20.8555513,37.657725 21.0308654,37.078702 21.3594004,36.5858994 L30.7538491,22.4942263 C31.6729065,21.1156403 33.5355145,20.7431187 34.9141006,21.662176 C35.2436575,21.8818806 35.5264463,22.1646695 35.7461509,22.4942263 Z",
                                      fill: "#000000",
                                      transform: "translate(33.25, 30) rotate(-270) translate(-33.25, -30)"
                                    }
                                  )
                                ]
                              }
                            ) }),
                            /* @__PURE__ */ jsxs("div", { className: "absolute bottom-2 lg:bottom-0 left-2 lg:left-1/2 transform -translate-x-0 lg:-translate-x-1/2 flex flex-col lg:flex-row z-20 text-[10px] lg:text-[11px] font-semibold leading-tight text-white gap-1 lg:gap-0", children: [
                              /* @__PURE__ */ jsx(
                                "span",
                                {
                                  className: "whitespace-nowrap px-2 py-0.5 lg:py-1 rounded-md lg:rounded-none lg:rounded-tl-md bg-[#5e6070]",
                                  "aria-label": `Tình trạng phim: ${episode_current}`,
                                  children: rutGonTinhTrangPhim(episode_current)
                                }
                              ),
                              /* @__PURE__ */ jsx(
                                "span",
                                {
                                  className: "whitespace-nowrap w-fit px-2 py-0.5 lg:py-1 rounded-md lg:rounded-none lg:rounded-tr-md bg-[#2ca35d]",
                                  "aria-label": `Ngôn ngữ phim: ${lang}`,
                                  children: rutGonTinhTrangNgonNgu(lang)
                                }
                              )
                            ] })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxs("div", { className: "py-2 flex items-center gap-x-3", children: [
                        /* @__PURE__ */ jsx("span", { className: "text-4xl lg:text-5xl font-black bg-clip-text text-transparent bg-[linear-gradient(39deg,rgba(254,207,89,1),rgba(255,241,204,1))] -mt-1 font-segoe italic", children: index + 1 }),
                        /* @__PURE__ */ jsxs("div", { className: "flex-grow min-w-0", children: [
                          /* @__PURE__ */ jsx(
                            "h3",
                            {
                              className: "line-clamp-1 text-[13px] font-semibold text-gray-200 hover:text-[#FFDE8A]",
                              title: name,
                              children: name
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "p",
                            {
                              className: "line-clamp-1 text-[12px] font-medium text-gray-400",
                              dangerouslySetInnerHTML: { __html: origin_name }
                            }
                          )
                        ] })
                      ] })
                    ]
                  },
                  movieKey
                );
              })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => scroll("left"),
              className: `absolute left-0 z-30  lg:top-[7.5rem] xl:top-[6.5rem] sm:flex hidden h-8 w-8 items-center justify-center transition-opacity duration-300 py-1 hover:scale-110 cursor-pointer ${canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"} sm:block hidden`,
              "aria-label": `Cuộn trái phần ${title}`,
              disabled: !canScrollLeft,
              children: /* @__PURE__ */ jsx(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "32",
                  height: "32",
                  viewBox: "0 0 24 24",
                  className: "drop-shadow-[0_0_12px_rgba(255,255,255,0.7)] text-gray-100",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      fill: "currentColor",
                      d: "M7.94 13.06a1.5 1.5 0 0 1 0-2.12l5.656-5.658a1.5 1.5 0 1 1 2.121 2.122L11.122 12l4.596 4.596a1.5 1.5 0 1 1-2.12 2.122l-5.66-5.658Z"
                    }
                  )
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => scroll("right"),
              className: `absolute right-0 z-30 sm:flex hidden lg:top-[7.5rem] xl:top-[6.5rem] h-8 w-8 items-center justify-center transition-opacity duration-300 py-1 hover:scale-110 cursor-pointer ${canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"} sm:block hidden`,
              "aria-label": `Cuộn phải phần ${title}`,
              disabled: !canScrollRight,
              children: /* @__PURE__ */ jsx(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "32",
                  height: "32",
                  viewBox: "0 0 24 24",
                  className: "drop-shadow-[0_0_12px_rgba(255,255,255,0.7)] text-gray-100",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      fill: "currentColor",
                      d: "M16.06 10.94a1.5 1.5 0 0 1 0 2.12l-5.656 5.658a1.5 1.5 0 1 1-2.121-2.122L12.879 12L8.283 7.404a1.5 1.5 0 0 1 2.12-2.122l5.658 5.657Z"
                    }
                  )
                }
              )
            }
          )
        ] })
      ]
    }
  );
}

function MovieCard2$1({ movies = [], title = "Phim Lẻ Mới" }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const GAP_PX = 8;
  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    const hasScrollableContent = el.scrollWidth > el.clientWidth;
    const scrollEndThreshold = Math.ceil(el.scrollWidth - el.clientWidth);
    if (hasScrollableContent) {
      setCanScrollLeft(el.scrollLeft > 5);
      setCanScrollRight(el.scrollLeft < scrollEndThreshold - 5);
    } else {
      setCanScrollLeft(false);
      setCanScrollRight(false);
    }
  };
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);
    const observer = new MutationObserver(updateScrollButtons);
    observer.observe(el, { childList: true, subtree: true, attributes: true });
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
      observer.disconnect();
    };
  }, [movies]);
  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const firstItem = el.querySelector(".movie-card-item");
    if (!firstItem) {
      const scrollAmount2 = el.clientWidth;
      el.scrollBy({
        left: direction === "left" ? -scrollAmount2 : scrollAmount2,
        behavior: "smooth"
      });
      return;
    }
    const itemWidth = firstItem.offsetWidth + GAP_PX;
    const scrollAmount = direction === "left" ? -itemWidth : itemWidth;
    el.scrollBy({
      left: scrollAmount,
      behavior: "smooth"
    });
  };
  if (movies.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxs(
    "section",
    {
      className: "relative py-1 lg:py-4 ",
      "aria-labelledby": `${title.replace(/\s+/g, "-")}-heading`,
      children: [
        /* @__PURE__ */ jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsx(
          "h2",
          {
            id: `${title.replace(/\s+/g, "-")}-heading`,
            className: "mb-0 text-lg font-bold text-white lg:text-2xl",
            children: title
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              ref: scrollRef,
              className: "no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth",
              children: movies.map((movie, index) => {
                const {
                  id,
                  slug,
                  name,
                  thumb_url,
                  year,
                  episode_current,
                  lang,
                  origin_name
                } = movie;
                const thumb_url1 = `https://ik.imagekit.io/17mpki7mv/motchill/${thumb_url}?tr=f-webp,w-800,h-450,fo-auto,q-85`;
                const movieKey = id || slug || `movie-${index}`;
                return /* @__PURE__ */ jsxs(
                  "a",
                  {
                    href: `/phim/${slug}`,
                    title: name,
                    className: "movie-card-item group movie-card",
                    "aria-label": `Xem phim ${name}`,
                    children: [
                      /* @__PURE__ */ jsxs("div", { className: "relative aspect-[16/9] w-full overflow-hidden rounded-md", children: [
                        /* @__PURE__ */ jsx(
                          "img",
                          {
                            src: thumb_url1,
                            alt: `Poster phim ${name}`,
                            className: "h-full w-full object-cover brightness-100",
                            loading: "lazy"
                          }
                        ),
                        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 rounded-[4px] bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100" }),
                        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100", children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 60 60", className: "h-[30px] w-[30px]", children: [
                          /* @__PURE__ */ jsx(
                            "circle",
                            {
                              cx: "30",
                              cy: "30",
                              r: "30",
                              className: "fill-[#FFDE8A]"
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "path",
                            {
                              d: "M35.746,22.494 L45.14,36.586 C46.059,37.964 45.687,39.827 44.308,40.746 C43.815,41.074 43.236,41.25 42.644,41.25 L23.855,41.25 C22.198,41.25 20.855,39.906 20.855,38.25 C20.855,37.657 21.03,37.078 21.359,36.586 L30.753,22.494 C31.672,21.116 33.535,20.743 34.914,21.662 C35.243,21.882 35.526,22.165 35.746,22.494 Z",
                              fill: "#000000",
                              transform: "translate(33.25, 30) rotate(-270) translate(-33.25, -30)"
                            }
                          )
                        ] }) }),
                        /* @__PURE__ */ jsxs("div", { className: "absolute bottom-2 lg:bottom-0 left-2 lg:left-1/2 transform -translate-x-0 lg:-translate-x-1/2 flex flex-col lg:flex-row z-20 text-[10px] lg:text-[11px] font-semibold leading-tight text-white gap-1 lg:gap-0", children: [
                          /* @__PURE__ */ jsx(
                            "span",
                            {
                              className: "whitespace-nowrap px-2 py-0.5 lg:py-1 rounded-md lg:rounded-none lg:rounded-tl-md bg-[#5e6070]",
                              "aria-label": `Tình trạng phim: ${episode_current}`,
                              children: rutGonTinhTrangPhim(episode_current)
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "span",
                            {
                              className: "whitespace-nowrap w-fit px-2 py-0.5 lg:py-1 rounded-md lg:rounded-none lg:rounded-tr-md bg-[#2ca35d]",
                              "aria-label": `Ngôn ngữ phim: ${lang}`,
                              children: rutGonTinhTrangNgonNgu(lang)
                            }
                          )
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxs("div", { className: "p-2", children: [
                        /* @__PURE__ */ jsx("h3", { className: "line-clamp-1 text-[13px] font-semibold text-white group-hover:text-[#FFDE8A]", children: name }),
                        /* @__PURE__ */ jsx("p", { className: "line-clamp-1 text-xs font-semibold text-gray-400 mt-1", children: origin_name })
                      ] })
                    ]
                  },
                  movieKey
                );
              })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => scroll("left"),
              className: `absolute left-0 z-30 top-12 hidden sm:flex md:top-16 lg:top-20 xl:top-12 h-8 w-8 items-center justify-center transition-opacity duration-300 py-0.5 hover:scale-110 cursor-pointer ${canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"} sm:block hidden`,
              "aria-label": `Cuộn trái phần ${title}`,
              disabled: !canScrollLeft,
              children: /* @__PURE__ */ jsx(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "32",
                  height: "32",
                  viewBox: "0 0 24 24",
                  className: "drop-shadow-[0_0_12px_rgba(255,255,255,0.7)] text-gray-100",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      fill: "currentColor",
                      d: "M7.94 13.06a1.5 1.5 0 0 1 0-2.12l5.656-5.658a1.5 1.5 0 1 1 2.121 2.122L11.122 12l4.596 4.596a1.5 1.5 0 1 1-2.12 2.122l-5.66-5.658Z"
                    }
                  )
                }
              )
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => scroll("right"),
              className: `absolute right-0 z-30 hidden sm:flex md:top-16 lg:top-20 xl:top-12  h-8 w-8 items-center justify-center transition-opacity duration-300 py-0.5 hover:scale-110 cursor-pointer ${canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"} sm:block hidden`,
              "aria-label": `Cuộn phải phần ${title}`,
              disabled: !canScrollRight,
              children: /* @__PURE__ */ jsx(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "32",
                  height: "32",
                  viewBox: "0 0 24 24",
                  className: "drop-shadow-[0_0_12px_rgba(255,255,255,0.7)] text-gray-100",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      fill: "currentColor",
                      d: "M16.06 10.94a1.5 1.5 0 0 1 0 2.12l-5.656 5.658a1.5 1.5 0 1 1-2.121-2.122L12.879 12L8.283 7.404a1.5 1.5 0 0 1 2.12-2.122l5.658 5.657Z"
                    }
                  )
                }
              )
            }
          )
        ] })
      ]
    }
  );
}

function MovieCard2({
  movies = [],
  title = "Phim Mới",
  gradient = ""
}) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const GAP_PX = 12;
  const titleStyle = gradient ? {
    backgroundImage: gradient,
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent"
  } : {};
  const updateScrollButtons = () => {
    const el = scrollRef.current;
    if (!el) return;
    const hasScrollableContent = el.scrollWidth > el.clientWidth;
    const scrollEndThreshold = Math.ceil(el.scrollWidth - el.clientWidth);
    if (hasScrollableContent) {
      setCanScrollLeft(el.scrollLeft > 5);
      setCanScrollRight(el.scrollLeft < scrollEndThreshold - 5);
    } else {
      setCanScrollLeft(false);
      setCanScrollRight(false);
    }
  };
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollButtons();
    el.addEventListener("scroll", updateScrollButtons);
    window.addEventListener("resize", updateScrollButtons);
    const observer = new MutationObserver(updateScrollButtons);
    observer.observe(el, { childList: true, subtree: true, attributes: true });
    return () => {
      el.removeEventListener("scroll", updateScrollButtons);
      window.removeEventListener("resize", updateScrollButtons);
      observer.disconnect();
    };
  }, [movies]);
  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const firstItem = el.querySelector(".movie-card-item");
    if (!firstItem) return;
    const scrollAmount = (firstItem.offsetWidth + GAP_PX) * 3;
    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth"
    });
  };
  if (movies.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxs("section", { className: "flex flex-col py-1 lg:py-4 lg:flex-row sm:gap-6", children: [
    /* @__PURE__ */ jsx("div", { className: "flex-shrink-0 pb-4 sm:w-48 sm:pb-0", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between sm:block", children: [
      /* @__PURE__ */ jsxs(
        "h2",
        {
          id: `${title.replace(/\s+/g, "-")}-heading`,
          className: "text-lg font-bold font-segoe text-white lg:text-2xl leading-tight",
          style: titleStyle,
          children: [
            /* @__PURE__ */ jsxs("span", { className: "hidden lg:block", children: [
              title.split(" ").slice(0, 2).join(" "),
              /* @__PURE__ */ jsx("br", {}),
              title.split(" ").slice(2).join(" ")
            ] }),
            /* @__PURE__ */ jsx("span", { className: "block lg:hidden", children: title })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/danh-sach/phim-moi",
          className: "text-xs text-gray-200 transition-colors hover:text-[#FFDE8A] mt-1 sm:mt-2 block sm:inline-block font-semibold",
          children: "Xem toàn bộ"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "relative flex-1 min-w-0", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          ref: scrollRef,
          className: "no-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth",
          style: { gap: `${GAP_PX}px` },
          children: movies.map((movie, index) => {
            const {
              id,
              slug,
              name,
              thumb_url,
              year,
              episode_current,
              origin_name
            } = movie;
            const thumb_url1 = `https://ik.imagekit.io/17mpki7mv/motchill/${thumb_url}?tr=f-webp,w-800,h-450,fo-auto,q-85`;
            const movieKey = id || slug || `movie-${index}`;
            const displayStatus = rutGonTinhTrangPhim1(episode_current);
            return /* @__PURE__ */ jsxs(
              "a",
              {
                href: `/phim/${slug}`,
                title: name,
                className: "group movie-card-item movie-card-row1",
                "aria-label": `Xem phim ${name}`,
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "relative aspect-[16/9] w-full overflow-hidden rounded-md", children: [
                    /* @__PURE__ */ jsx(
                      "img",
                      {
                        src: thumb_url1,
                        alt: `Poster phim ${name}`,
                        className: "h-full w-full object-cover",
                        loading: "lazy"
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      "div",
                      {
                        className: "absolute bottom-0 left-0 h-[40%] w-full rounded-b-md",
                        style: {
                          background: "linear-gradient(to top,rgba(30, 30, 30, 0.8) 5%, transparent 100%)"
                        },
                        "aria-hidden": "true"
                      }
                    ),
                    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100", children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 60 60", className: "h-[30px] w-[30px]", children: [
                      /* @__PURE__ */ jsx(
                        "circle",
                        {
                          cx: "30",
                          cy: "30",
                          r: "30",
                          className: "fill-[#FFDE8A]"
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "path",
                        {
                          d: "M35.746,22.494 L45.14,36.586 C46.059,37.964 45.687,39.827 44.308,40.746 C43.815,41.074 43.236,41.25 42.644,41.25 L23.855,41.25 C22.198,41.25 20.855,39.906 20.855,38.25 C20.855,37.657 21.03,37.078 21.359,36.586 L30.753,22.494 C31.672,21.116 33.535,20.743 34.914,21.662 C35.243,21.882 35.526,22.165 35.746,22.494 Z",
                          fill: "#000000",
                          transform: "translate(33.25, 30) rotate(-270) translate(-33.25, -30)"
                        }
                      )
                    ] }) }),
                    /* @__PURE__ */ jsxs("div", { className: "absolute bottom-2 left-2 z-20 flex items-center text-[12px] font-bold text-white", children: [
                      /* @__PURE__ */ jsx("span", { children: displayStatus }),
                      /* @__PURE__ */ jsx("span", { className: "mx-1 text-white/70", children: "|" }),
                      /* @__PURE__ */ jsx("span", { children: year })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "p-3", children: [
                    /* @__PURE__ */ jsx("h3", { className: "line-clamp-1 text-[13px] font-semibold text-white group-hover:text-[#FFDE8A]", children: name }),
                    /* @__PURE__ */ jsx("p", { className: "line-clamp-1 text-xs font-semibold text-gray-400 mt-1", children: origin_name })
                  ] })
                ]
              },
              movieKey
            );
          })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => scroll("left"),
          className: `absolute left-0 top-14 z-30 hidden -translate-x-1/2  transform items-center justify-center rounded-full bg-white p-1 text-black transition-opacity md:flex ${canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"}`,
          "aria-label": `Cuộn trái phần ${title}`,
          disabled: !canScrollLeft,
          children: /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "20",
              height: "20",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  fill: "currentColor",
                  d: "M15.41 7.41L14 6l-6 6l6 6l1.41-1.41L10.83 12z"
                }
              )
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => scroll("right"),
          className: `absolute right-0 top-14 z-30 hidden translate-x-1/2 transform items-center justify-center rounded-full bg-white p-1 text-black transition-opacity md:flex ${canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"}`,
          "aria-label": `Cuộn phải phần ${title}`,
          disabled: !canScrollRight,
          children: /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "20",
              height: "20",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  fill: "currentColor",
                  d: "M10 6L8.59 7.41L13.17 12l-4.58 4.59L10 18l6-6z"
                }
              )
            }
          )
        }
      )
    ] })
  ] });
}

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
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    if (swipeDistance > 75) {
      setCurrentMovieIndex(
        (prevIndex) => prevIndex < allMovies.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (swipeDistance < -75) {
      setCurrentMovieIndex(
        (prevIndex) => prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };
  if (loading) {
    return /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsx("section", { className: "text-white text-center py-10", children: "Đang tải phim..." }) });
  }
  if (!movieData) {
    return /* @__PURE__ */ jsx("div", { className: "p-6", children: /* @__PURE__ */ jsx("section", { className: "text-white text-center py-10", children: "Không có phim hoạt hình nào để hiển thị." }) });
  }
  const mainThumbUrl = `https://ik.imagekit.io/17mpki7mv/motchill/${movieData.thumb_url}?tr=f-webp,w-800,h-450,fo-auto,q-85`;
  return /* @__PURE__ */ jsx("div", { className: "pb-24 pt-2", children: /* @__PURE__ */ jsxs("section", { role: "region", "aria-label": title, children: [
    /* @__PURE__ */ jsx("header", { className: "px-1", children: /* @__PURE__ */ jsx("div", { className: "flex flex-col lg:flex-row mb-4 gap-4 lg:gap-10", children: /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-white lg:text-2xl", children: /* @__PURE__ */ jsx("span", { children: title }) }) }) }),
    /* @__PURE__ */ jsxs(
      "main",
      {
        className: "relative py-16 bg-black rounded-xl h-[380px] lg:h-[400px]",
        onTouchStart: handleTouchStart,
        onTouchMove: handleTouchMove,
        onTouchEnd: handleTouchEnd,
        children: [
          /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0 overflow-hidden", children: [
            /* @__PURE__ */ jsx(AnimatePresence, { initial: false, children: /* @__PURE__ */ jsx(
              motion.img,
              {
                src: mainThumbUrl,
                alt: `${movieData.name} - Phim hoạt hình ${movieData.year}`,
                className: "h-full w-full object-cover scale-100 rounded-xl object-pos-50-30 lg:object-pos-20-30",
                initial: { opacity: 0, x: 100 },
                animate: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: -100 },
                transition: { duration: 0.3 },
                loading: "lazy"
              },
              movieData._id
            ) }),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "hidden md:block absolute inset-0 z-10 pointer-events-none",
                style: {
                  backgroundImage: `radial-gradient(#000000 1px, transparent 1px)`,
                  backgroundSize: "3px 3px",
                  opacity: 0.3
                },
                "aria-hidden": "true"
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#191B24]/95 via-[#191B24]/70 to-transparent" }),
          /* @__PURE__ */ jsx("div", { className: "relative z-10 w-full pt-32 md:pt-10 lg:pt-10", children: /* @__PURE__ */ jsx("div", { className: "px-4 lg:px-10 grid grid-cols-1 lg:grid-cols-5 items-end", children: /* @__PURE__ */ jsxs("article", { className: "flex flex-col items-start col-span-2 lg:col-span-12 space-y-3 md:space-y-4 text-white", children: [
            /* @__PURE__ */ jsx("h3", { className: "text-[16px] md:text-2xl font-bold leading-tight tracking-tight", children: /* @__PURE__ */ jsx(
              "a",
              {
                href: `/phim/${movieData.slug}`,
                className: " transition-colors line-clamp-2",
                title: `Xem phim ${movieData.name} - ${movieData.episode_current}`,
                children: movieData.name
              }
            ) }),
            /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx(
              "div",
              {
                className: " text-xs lg:text-sm text-yellow-200",
                dangerouslySetInnerHTML: { __html: movieData.origin_name }
              }
            ) }),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "flex items-center gap-1 lg:gap-2.5 text-[10px] lg:text-xs font-medium text-white",
                role: "list",
                children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center border border-yellow-300 lg:px-2 px-1 py-0.5 lg:py-1 rounded-md", children: [
                    /* @__PURE__ */ jsx("p", { className: "text-[#f7d54d]", children: "IMDb" }),
                    /* @__PURE__ */ jsx("p", { className: "pl-1", children: movieData.tmdb.vote_average === 0 ? 10 : movieData.tmdb.vote_average.toFixed(1) })
                  ] }),
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: "bg-gradient-to-tr from-[#FFD875] to-white lg:px-2 px-1 py-0.5 lg:py-1 rounded-md text-black font-bold",
                      role: "listitem",
                      children: movieData.quality
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: "bg-white lg:px-2 px-1 py-0.5 lg:py-1 rounded-md text-black font-bold",
                      role: "listitem",
                      children: movieData.lang
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: "border border-white lg:px-2 px-1 py-0.5 lg:py-1  rounded-md",
                      role: "listitem",
                      children: movieData.episode_current
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: "border border-white lg:px-2 px-1 py-0.5 lg:py-1 rounded-md",
                      role: "listitem",
                      children: movieData.year
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      className: "border border-white lg:px-2 px-1 py-0.5 lg:py-1 rounded-md",
                      role: "listitem",
                      children: movieData.time
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "nav",
              {
                className: "flex flex-wrap space-x-1 xl:space-x-3 text-xs font-medium",
                "aria-label": "Thể loại phim",
                children: movieData.category && movieData.category.slice(0, 3).map((genre) => /* @__PURE__ */ jsx(
                  "a",
                  {
                    href: `/the-loai/${genre.slug}`,
                    className: "rounded-[4px] bg-[#ffffff14] lg:px-2 px-1 py-0.5 lg:py-1 text-[10px]lg:text-[13px] font-medium text-gray-200 transition-colors duration-200 hover:text-yellow-400",
                    title: `Xem phim thể loại ${genre.name}`,
                    children: genre.name
                  },
                  genre.slug
                ))
              }
            )
          ] }) }) }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "absolute bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-4 lg:translate-y-10 z-20",
              role: "tablist",
              "aria-label": "Danh sách phim",
              children: [
                /* @__PURE__ */ jsx("div", { className: "hidden lg:flex justify-center items-center space-x-2", children: allMovies.slice(0, 15).map((movie) => {
                  const thumbnailPosterUrl = `https://ik.imagekit.io/17mpki7mv/motchill/${movie.poster_url}?tr=f-webp,w-300,h-450,fo-auto,q-85`;
                  return /* @__PURE__ */ jsx(
                    "button",
                    {
                      role: "tab",
                      "aria-selected": movie._id === movieData._id,
                      "aria-label": `Xem phim ${movie.name}`,
                      className: `w-[50px] h-[75px] 2xl:w-[55px] 2xl:h-[80px] rounded-md object-fill cursor-pointer transition duration-150 ease-in-out border-2 ${movie._id === movieData._id ? "border-white scale-105" : "border-transparent hover:scale-105"}`,
                      onClick: () => handleThumbnailClick(movie),
                      children: /* @__PURE__ */ jsx(
                        "img",
                        {
                          src: thumbnailPosterUrl,
                          alt: `Poster phim ${movie.name}`,
                          className: "w-full h-full object-fill rounded-md",
                          loading: "lazy"
                        }
                      )
                    },
                    movie._id
                  );
                }) }),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "flex lg:hidden justify-center items-center space-x-2",
                    role: "tablist",
                    "aria-label": "Điều hướng phim",
                    children: allMovies.slice(0, 17).map((movie, index) => /* @__PURE__ */ jsx(
                      "button",
                      {
                        role: "tab",
                        "aria-selected": movie._id === movieData._id,
                        "aria-label": `Chuyển đến phim ${movie.name}`,
                        className: `w-2 h-2 rounded-full cursor-pointer ${index === currentMovieIndex ? "bg-orange-400" : "bg-gray-300"}`,
                        onClick: () => handleThumbnailClick(movie)
                      },
                      movie._id
                    ))
                  }
                )
              ]
            }
          )
        ]
      }
    )
  ] }) });
}

const bgImage = new Proxy({"src":"/_astro/box-1.Bn1UieXg.jpg","width":1200,"height":563,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/motchillhd.online/src/assets/box-1.jpg";
							}
							
							return target[name];
						}
					});

const $$InfoGroupTele = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="relative z-10 overflow-hidden shadow-lg mb-4 border-2 border-white">  <div class="absolute inset-0 -z-10 bg-cover bg-center"${addAttribute(`background-image: url('${bgImage.src}');`, "style")}></div>  <div class="absolute inset-0 -z-10 bg-black/20"></div> <div class="w-full overflow-hidden"> <h1 class="text-black font-semibold font-segoe text-sm lg:text-lg px-4 py-2 text-center whitespace-normal md:whitespace-nowrap md:animate-scroll">
Chào mừng bạn đến với PhimMoiChill - Xem phim không quảng cáo - Full HD -
      Cập nhật mỗi ngày !!!
</h1> </div> </div>`;
}, "D:/motchillhd.online/src/components/Astrocomponents/InfoGroupTele.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a, _b;
const $$Astro = createAstro();
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const homepageData = await getHomePageData();
  const chinaGradient = "linear-gradient(235deg, rgb(255, 255, 255) 30%, rgb(103, 65, 150) 130%)";
  const koreaGradient = "linear-gradient(235deg, rgb(255, 255, 255) 30%, rgb(247, 161, 11) 130%)";
  const usukGradient = "linear-gradient(235deg, rgb(255, 255, 255) 30%, rgb(255, 0, 153) 130%)";
  const {
    moviehots = [],
    moviechinas = [],
    moviekoreas = [],
    moviecotrangs = [],
    moviethailans = [],
    movieusuks = [],
    movieles = [],
    moviebos = [],
    moviehhs = [],
    movieupchieuraps = [],
    moviehoathinhs = []
  } = homepageData;
  const siteUrl = "https://phimmoii.top";
  const pageTitle = "Phim M\u1EDBi | PhimMoiChill | Xem Phim Nhanh Vietsub HD M\u1EDBi Nh\u1EA5t";
  const description = "PhimMoi and Chill - Xem phim m\u1EDBi t\u1ED1c \u0111\u1ED9 cao, giao di\u1EC7n ch\xEDnh th\u1EE9c. C\u1EADp nh\u1EADt phim vietsub m\u1ED7i ng\xE0y, ch\u1EA5t l\u01B0\u1EE3ng HD/4K \u0111a th\u1EC3 lo\u1EA1i, kh\xF4ng c\u1EA7n \u0111\u0103ng k\xFD!";
  const seoJsonLD = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${siteUrl}/`,
        url: `${siteUrl}/`,
        name: pageTitle,
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${siteUrl}/#organization` },
        description,
        breadcrumb: { "@id": `${siteUrl}/#breadcrumb` },
        inLanguage: "vi",
        dateModified: "2025-07-16"
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Trang ch\u1EE7",
            item: `${siteUrl}/`
          }
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: "Phimmoi",
        description: "Xem phim Vietsub HD t\u1EA1i Phimmoi",
        publisher: { "@id": `${siteUrl}/#organization` },
        inLanguage: "vi",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${siteUrl}/?s={search_term_string}`
          },
          "query-input": {
            "@type": "PropertyValueSpecification",
            name: "search_term_string",
            valueRequired: true
          }
        }
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: "Phimmoi",
        url: `${siteUrl}/`,
        logo: {
          "@type": "ImageObject",
          "@id": `${siteUrl}/#logo`,
          inLanguage: "vi",
          url: `${siteUrl}/logo.png`,
          contentUrl: `${siteUrl}/logo.png`,
          caption: "Phimmoi"
        },
        image: { "@id": `${siteUrl}/#logo` }
      }
    ]
  };
  return renderTemplate(_b || (_b = __template(["", ' <script>\n  document.addEventListener("DOMContentLoaded", () => {\n    const splashScreen = document.getElementById("splash-screen");\n    if (splashScreen) {\n      const animationDuration = 500;\n      setTimeout(() => {\n        splashScreen.classList.add("fade-scale-out");\n        setTimeout(() => {\n          splashScreen.remove();\n        }, animationDuration);\n      }, 700);\n    }\n  });\n<\/script>'])), renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div id="splash-screen" class="fixed inset-0 bg-black z-[9999] flex flex-col justify-center items-center opacity-100 scale-100"> <img src="/logo.svg" alt="PhimMoi Logo" class="w-auto h-14 lg:h-24 object-cover"> <p class="text-gray-200 font-semibold text-xl lg:text-4xl text-center mt-4 font-segoe leading-tight">
Chào Mừng Đến Với PhimMoi
</p> <p class="hidden sm:block text-gray-200 font-semibold text-4xl text-center mt-4 font-segoe leading-tight">
Xem Phim Miễn Phí Không Quảng Cáo
</p> </div> <div class="bg-[#191B24]"> ${renderComponent($$result2, "Header", Header, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "D:/motchillhd.online/src/components/Header", "client:component-export": "default" })} <main id="main-content" class="px-4 lg:px-8 lg:flex gap-2 lg:gap-10"> <div class="w-full lg:flex-[7] flex flex-col min-w-0 gap-0 lg:gap-4"> <div class="-mx-4 lg:-mx-8 mb-6"> ${renderComponent($$result2, "HeroSection", MovieCard$2, { "movies": moviehots, "client:load": true, "client:component-hydration": "load", "client:component-path": "D:/motchillhd.online/src/components/HeroSection", "client:component-export": "default" })} </div> ${renderComponent($$result2, "TeleInfo", $$InfoGroupTele, {})} <div class="pb-6 flex flex-col gap-4 lg:gap-6"> ${renderComponent($$result2, "CardRow1", MovieCard2, { "movies": moviechinas, "client:load": true, "title": "Phim Trung Qu\u1ED1c M\u1EDBi", "gradient": chinaGradient, "client:component-hydration": "load", "client:component-path": "D:/motchillhd.online/src/components/CardRow1", "client:component-export": "default" })} ${renderComponent($$result2, "CardRow1", MovieCard2, { "movies": moviekoreas, "client:load": true, "title": "Phim H\xE0n Qu\u1ED1c M\u1EDBi", "gradient": koreaGradient, "client:component-hydration": "load", "client:component-path": "D:/motchillhd.online/src/components/CardRow1", "client:component-export": "default" })} ${renderComponent($$result2, "CardRow1", MovieCard2, { "movies": movieusuks, "client:load": true, "title": "Phim US-UK M\u1EDBi", "gradient": usukGradient, "client:component-hydration": "load", "client:component-path": "D:/motchillhd.online/src/components/CardRow1", "client:component-export": "default" })} <div class="mt-6 flex justify-center"> <div class="w-[60%] h-[4px] bg-white rounded-xs"></div> </div> </div> ${renderComponent($$result2, "CardColum", MovieCard$1, { "movies": movieupchieuraps, "client:load": true, "title": "B\u1EAFc R\u1EA1p Xem Phim N\xE0o !!", "client:component-hydration": "load", "client:component-path": "D:/motchillhd.online/src/components/CardColumn", "client:component-export": "default" })} ${renderComponent($$result2, "CardColum2", MovieCard, { "movies": moviecotrangs, "client:load": true, "title": "Phim C\u1ED5 Trang Hot Nh\u1EA5t 2025 ! \u{1F525}", "client:component-hydration": "load", "client:component-path": "D:/motchillhd.online/src/components/CardColumn2", "client:component-export": "default" })} ${renderComponent($$result2, "CardColum", MovieCard$1, { "movies": moviehoathinhs, "client:load": true, "title": "\u0110\u1EC9nh Cao DongHua Ch\u1EC9 C\xF3 Tr\xEAn PhimMoi ! \u{1F525}", "client:component-hydration": "load", "client:component-path": "D:/motchillhd.online/src/components/CardColumn", "client:component-export": "default" })} <div class="py-6 flex justify-center"> <div class="w-[60%] h-[4px] bg-white rounded-xs"></div> </div> ${renderComponent($$result2, "CardColum", MovieCard$1, { "movies": moviethailans, "client:visible": true, "title": "Phim Th\xE1i Lan Hot", "client:component-hydration": "visible", "client:component-path": "D:/motchillhd.online/src/components/CardColumn", "client:component-export": "default" })} ${renderComponent($$result2, "CardRow", MovieCard2$1, { "movies": movieles, "client:visible": true, "title": "Phim L\u1EBB M\u1EDBi ", "client:component-hydration": "visible", "client:component-path": "D:/motchillhd.online/src/components/CardRow", "client:component-export": "default" })} ${renderComponent($$result2, "CardRow", MovieCard2$1, { "movies": moviebos, "client:visible": true, "title": "Phim B\u1ED9 M\u1EDBi ", "client:component-hydration": "visible", "client:component-path": "D:/motchillhd.online/src/components/CardRow", "client:component-export": "default" })} <div class="py-6 flex justify-center"> <div class="w-[60%] h-[4px] bg-white rounded-xs"></div> </div> ${renderComponent($$result2, "AnimeList", AnimeList, { "movies": moviehhs, "client:visible": true, "title": "Kho Anime X\u1ECBn X\xF2 ", "client:component-hydration": "visible", "client:component-path": "D:/motchillhd.online/src/components/AnimeList", "client:component-export": "default" })} </div> </main> </div> `, "head": async ($$result2) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "slot": "head" }, { "default": async ($$result3) => renderTemplate(_a || (_a = __template([' <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>', '</title> <meta name="description"', '> <meta name="robots" content="index, follow"> <meta name="author" content="Phimmoi"> <meta name="copyright" content="\xA9 2025 Phimmoi"> <link rel="canonical"', '> <meta name="theme-color" content="#1f1f29"> <link rel="icon" href="/favicon.ico" type="image/x-icon"> <link rel="apple-touch-icon" href="/logo.png"> <link rel="alternate"', ' hreflang="vi"> <link rel="preconnect"', ' crossorigin> <link rel="preload" as="image" href="/logo.png"> <meta property="og:type" content="website"> <meta property="og:title"', '> <meta property="og:description"', '> <meta property="og:url"', '> <meta property="og:site_name" content="Phimmoi"> <meta property="og:image"', '> <meta property="og:image:width" content="600"> <meta property="og:image:height" content="315"> <meta property="og:locale" content="vi_VN"> <meta name="twitter:card" content="summary_large_image"> <meta name="twitter:title"', '> <meta name="twitter:description"', '> <meta name="twitter:image"', '> <meta name="twitter:image:alt" content="Phimmoi - Xem Phim Vietsub HD Kh\xF4ng Qu\u1EA3ng C\xE1o"> <script type="application/ld+json">', "<\/script>  "])), pageTitle, addAttribute(description, "content"), addAttribute(siteUrl, "href"), addAttribute(siteUrl, "href"), addAttribute(siteUrl, "href"), addAttribute(pageTitle, "content"), addAttribute(description, "content"), addAttribute(siteUrl, "content"), addAttribute(`${siteUrl}/logo.png`, "content"), addAttribute(pageTitle, "content"), addAttribute(description, "content"), addAttribute(`${siteUrl}/logo.png`, "content"), unescapeHTML(JSON.stringify(seoJsonLD))) })}` }));
}, "D:/motchillhd.online/src/pages/index.astro", void 0);

const $$file = "D:/motchillhd.online/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
