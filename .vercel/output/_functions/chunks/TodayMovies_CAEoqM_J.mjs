import { jsxs, jsx } from 'react/jsx-runtime';

const TopMovies = ({ movies = [] }) => {
  if (!movies || movies.length === 0) {
    return null;
  }
  return /* @__PURE__ */ jsxs("div", { className: "hidden lg:block h-fit px-0 ", children: [
    /* @__PURE__ */ jsx("h2", { className: "mb-2 flex items-center gap-2 text-base font-semibold text-white lg:text-xl", children: "Xem Gì Hôm Nay" }),
    /* @__PURE__ */ jsx("div", { className: "", children: movies.map((movie, i) => {
      const { id, slug, name, poster_url, episode_current, lang } = movie;
      const movieKey = id || slug;
      const fullPosterUrl = `https://ik.imagekit.io/17mpki7mv/motchill/${poster_url}?tr=f-webp,w-300,h-450,fo-auto,q-85`;
      return /* @__PURE__ */ jsx(
        "a",
        {
          href: `/phim/${slug}`,
          title: name,
          className: "group flex items-center gap-5 rounded-lg py-2",
          children: /* @__PURE__ */ jsxs("div", { className: "flex flex-row gap-4 bg-[#ffffff05] w-full justify-between items-center rounded-lg", children: [
            /* @__PURE__ */ jsx("div", { className: "aspect-[2/3] w-20 flex-shrink-0 overflow-hidden rounded-[4px] shadow-lg ", children: /* @__PURE__ */ jsx(
              "img",
              {
                src: fullPosterUrl,
                alt: name,
                className: "h-full w-full object-cover",
                loading: "lazy"
              }
            ) }),
            /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1 space-y-1.5 px-2", children: [
              /* @__PURE__ */ jsx("p", { className: "line-clamp-2 text-sm font-semibold text-gray-200 transition-colors duration-200 group-hover:text-[#ffd875]", children: name }),
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: episode_current }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400", children: lang })
              ] })
            ] }),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: "px-4 font-quicksand text-5xl font-extrabold text-transparent",
                style: {
                  WebkitTextStroke: "1px white",
                  color: "transparent"
                },
                "aria-hidden": "true",
                children: i + 1
              }
            )
          ] })
        },
        movieKey
      );
    }) })
  ] });
};

export { TopMovies as T };
