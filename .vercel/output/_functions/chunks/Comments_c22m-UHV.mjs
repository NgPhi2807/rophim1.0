import { jsxs, jsx, Fragment } from 'react/jsx-runtime';
import { useState, useEffect, useMemo, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, push, update } from 'firebase/database';

const eposideGif = new Proxy({"src":"/_astro/eposide.CaavVmCT.gif","width":72,"height":72,"format":"gif"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/motchillhd.online/src/assets/eposide.gif";
							}
							
							return target[name];
						}
					});

const Episodes = ({
  vietsub = [],
  thuyetminh = [],
  longtieng = [],
  movieTitle = "",
  slug,
  currentEpisodeSlug = "",
  currentType = "",
  totalEpisodes = 0
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
  if (!hasVietsub && !hasThuyetminh && !hasLongtieng && parseInt(totalEpisodes) === 0)
    return null;
  const isFullEpisode = (epList) => epList.length === 1 && (epList[0].slug === "full" || epList[0].name?.toLowerCase().includes("full"));
  const vietsubIsFull = hasVietsub && isFullEpisode(vietsub);
  const thuyetminhIsFull = hasThuyetminh && isFullEpisode(thuyetminh);
  const longtiengIsFull = hasLongtieng && isFullEpisode(longtieng);
  const isAnyFull = vietsubIsFull || thuyetminhIsFull || longtiengIsFull;
  const getProcessedEpisodes = (epList, total) => {
    if (isFullEpisode(epList)) {
      return epList;
    }
    const parsedTotal = parseInt(total);
    if (isNaN(parsedTotal) || parsedTotal <= 0) {
      return epList;
    }
    const processedList = [...epList];
    const existingEpisodeNumbers = new Set(
      epList.map((ep) => {
        const match = ep.name?.match(/Tập (\d+)/);
        return match ? parseInt(match[1]) : null;
      }).filter((num) => num !== null)
    );
    for (let i = 1; i <= parsedTotal; i++) {
      if (!existingEpisodeNumbers.has(i)) {
        processedList.push({
          name: `Tập ${String(i).padStart(2, "0")}`,
          slug: `tap-${String(i).padStart(2, "0")}`,
          link_embed: null,
          // Set to null to indicate no actual link
          link_m3u8: null
        });
      }
    }
    processedList.sort((a, b) => {
      const numA = parseInt(a.name.match(/Tập (\d+)/)?.[1] || 0);
      const numB = parseInt(b.name.match(/Tập (\d+)/)?.[1] || 0);
      return numA - numB;
    });
    return processedList;
  };
  const processedVietsub = hasVietsub ? getProcessedEpisodes(vietsub, totalEpisodes) : [];
  const processedThuyetminh = hasThuyetminh ? getProcessedEpisodes(thuyetminh, totalEpisodes) : [];
  const processedLongtieng = hasLongtieng ? getProcessedEpisodes(longtieng, totalEpisodes) : [];
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
    if (!searchTerm) {
      return episodesToFilter;
    }
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return episodesToFilter.filter(
      (ep) => ep.name?.toLowerCase().includes(lowerCaseSearchTerm) || ep.slug?.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }, [
    activeType,
    searchTerm,
    processedVietsub,
    processedThuyetminh,
    processedLongtieng
  ]);
  const episodesToDisplay = searchTerm || showAllEpisodes ? filteredEpisodes : filteredEpisodes.slice(0, 40);
  const hasMoreThan40Episodes = filteredEpisodes.length > 40;
  const renderEpisodeButton = (ep, displayType) => {
    const episodeSlug = ep.slug;
    const episodeName = ep.name;
    const hasLink = ep.link_embed !== null || ep.link_m3u8 !== null;
    const href = hasLink ? `/xem-phim/${slug}/${episodeSlug}/${displayType}` : "#";
    const isActive = !isAnyFull && currentEpisodeSlug && currentType && episodeSlug === currentEpisodeSlug && displayType === currentType && hasLink;
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
    const unavailableClasses = `bg-[#23252b] text-gray-500 cursor-not-allowed`;
    return /* @__PURE__ */ jsx(
      "a",
      {
        href,
        className: `${baseClasses} ${isActive ? activeClasses : hasLink ? availableClasses : unavailableClasses}`,
        title: `${episodeName} - ${movieTitle} (${getDisplayName(
          displayType
        )})`,
        onClick: (e) => !hasLink && e.preventDefault(),
        children: isActive ? /* @__PURE__ */ jsx(
          "img",
          {
            src: eposideGif.src,
            alt: "Đang phát",
            className: "h-4 w-auto",
            style: { filter: "brightness(0) saturate(100%)" }
          }
        ) : episodeName
      },
      `${episodeSlug}-${displayType}`
    );
  };
  const renderFullButtons = () => /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-3", children: [
    vietsubIsFull && /* @__PURE__ */ jsx(
      "a",
      {
        href: `/xem-phim/${slug}/full/vietsub`,
        className: `rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-200 ${currentType === "vietsub" && currentEpisodeSlug === "full" ? "bg-[#23252b] text-[#ffd785]" : "bg-[#23252b] text-gray-200 "}`,
        children: "Xem Phụ Đề"
      }
    ),
    thuyetminhIsFull && /* @__PURE__ */ jsx(
      "a",
      {
        href: `/xem-phim/${slug}/full/thuyetminh`,
        className: `rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-200 ${currentType === "thuyetminh" && currentEpisodeSlug === "full" ? "bg-[#23252b] text-[#ffd785]" : "bg-[#23252b] text-gray-200"}`,
        children: "Xem Thuyết Minh"
      }
    ),
    longtiengIsFull && /* @__PURE__ */ jsx(
      "a",
      {
        href: `/xem-phim/${slug}/full/longtieng`,
        className: `rounded-lg px-3 py-2 text-sm font-semibold transition-colors duration-200 ${currentType === "longtieng" && currentEpisodeSlug === "full" ? "bg-[#23252b] text-[#ffd785] " : "bg-[#23252b] text-gray-200 "}`,
        children: "Xem Lồng Tiếng"
      }
    )
  ] });
  const renderEpisodeList = (episodes, type) => /* @__PURE__ */ jsx("div", { className: "space-y-2", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-4 gap-2 md:grid-cols-8 lg:grid-cols-8 xl:grid-cols-8", children: episodes.map((ep) => renderEpisodeButton(ep, type)) }) });
  const VerticalSeparatorSVG = () => /* @__PURE__ */ jsx(
    "svg",
    {
      width: "1",
      height: "32",
      viewBox: "0 0 1 32",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "text-gray-600 mx-2 hidden lg:block",
      children: /* @__PURE__ */ jsx("path", { d: "M1 0V32", stroke: "currentColor", strokeWidth: "2" })
    }
  );
  return /* @__PURE__ */ jsxs("div", { className: "z-20 space-y-4 py-2 lg:px-0 lg:py-4", children: [
    /* @__PURE__ */ jsxs("h2", { className: "flex flex-col lg:flex-row text-base gap-4 font-medium text-white lg:text-xl justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-between lg:gap-6 ", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(
            "svg",
            {
              xmlns: "http://www.w3.org/2000/svg",
              width: "24",
              height: "24",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  fill: "currentColor",
                  d: "M5 19q-.425 0-.712-.288T4 18t.288-.712T5 17h8q.425 0 .713.288T14 18t-.288.713T13 19zm0-4q-.425 0-.712-.288T4 14t.288-.712T5 13h14q.425 0 .713.288T20 14t-.288.713T19 15zm0-4q-.425 0-.712-.288T4 10t.288-.712T5 9h14q.425 0 .713.288T20 10t-.288.713T19 11zm0-4q-.425 0-.712-.288T4 6t.288-.712T5 5h14q.425 0 .713.288T20 6t-.288.713T19 7z"
                }
              )
            }
          ),
          /* @__PURE__ */ jsx("span", { children: "Tập Phim" })
        ] }),
        !isAnyFull && // Only show type selection if not a full movie
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
          /* @__PURE__ */ jsx(VerticalSeparatorSVG, {}),
          hasVietsub && /* @__PURE__ */ jsxs(
            "button",
            {
              className: `flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold transition-colors duration-200 ${activeType === "vietsub" ? "border-white border text-white" : "text-gray-200 hover:text-white"}`,
              onClick: () => setActiveType("vietsub"),
              children: [
                /* @__PURE__ */ jsx(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "16",
                    height: "16",
                    viewBox: "0 0 16 16",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        fill: "currentColor",
                        d: "M1 5.5A2.5 2.5 0 0 1 3.5 3h9A2.5 2.5 0 0 1 15 5.5v5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 10.5zM3.5 4A1.5 1.5 0 0 0 2 5.5v5A1.5 1.5 0 0 0 3.5 12h9a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 12.5 4zM3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m.5 1.5a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM10 8.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5M8.5 10a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1z"
                      }
                    )
                  }
                ),
                "Phụ đề"
              ]
            }
          ),
          hasThuyetminh && /* @__PURE__ */ jsxs(
            "button",
            {
              className: `flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold transition-colors duration-200 ${activeType === "thuyetminh" ? "border-white border text-white" : "text-gray-200 hover:text-white"}`,
              onClick: () => setActiveType("thuyetminh"),
              children: [
                /* @__PURE__ */ jsx(
                  "svg",
                  {
                    xmlns: "http://www.w3.org/2000/svg",
                    width: "16",
                    height: "16",
                    viewBox: "0 0 16 16",
                    children: /* @__PURE__ */ jsx(
                      "path",
                      {
                        fill: "currentColor",
                        d: "M1 5.5A2.5 2.5 0 0 1 3.5 3h9A2.5 2.5 0 0 1 15 5.5v5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 10.5zM3.5 4A1.5 1.5 0 0 0 2 5.5v5A1.5 1.5 0 0 0 3.5 12h9a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 12.5 4zM3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m.5 1.5a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1zM10 8.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5M8.5 10a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1z"
                      }
                    )
                  }
                ),
                "Thuyết minh"
              ]
            }
          ),
          hasLongtieng && /* @__PURE__ */ jsx(
            "button",
            {
              className: `flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold transition-colors duration-200 ${activeType === "longtieng" ? "border-white border text-white" : "text-gray-200 hover:text-white"}`,
              onClick: () => setActiveType("longtieng"),
              children: "Lồng Tiếng"
            }
          )
        ] })
      ] }),
      !isAnyFull && // Only show search if not a full movie
      /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4 flex-wrap ml-auto", children: /* @__PURE__ */ jsxs("div", { className: "relative flex items-center", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "text",
            placeholder: "Tìm tập phim...",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value),
            className: "bg-[#23252b] text-gray-200 placeholder-gray-500 rounded-md py-1.5 pl-3 text-xs focus:outline-none "
          }
        ),
        /* @__PURE__ */ jsxs(
          "svg",
          {
            xmlns: "http://www.w3.org/2000/svg",
            width: "14",
            height: "14",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            className: "absolute right-2 text-gray-500",
            children: [
              /* @__PURE__ */ jsx("circle", { cx: "11", cy: "11", r: "8" }),
              /* @__PURE__ */ jsx("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" })
            ]
          }
        )
      ] }) })
    ] }),
    isAnyFull ? renderFullButtons() : /* @__PURE__ */ jsxs(Fragment, { children: [
      activeType === "vietsub" && hasVietsub && renderEpisodeList(episodesToDisplay, "vietsub"),
      activeType === "thuyetminh" && hasThuyetminh && renderEpisodeList(episodesToDisplay, "thuyetminh"),
      activeType === "longtieng" && hasLongtieng && renderEpisodeList(episodesToDisplay, "longtieng"),
      hasMoreThan40Episodes && !searchTerm && // Only show if more than 40 and no search term
      /* @__PURE__ */ jsx("div", { className: "text-center mt-4", children: /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setShowAllEpisodes(!showAllEpisodes),
          className: "px-6 py-3 text-sm font-medium text-black bg-gradient-to-br from-[#FECF59] to-[#FFF1CC] rounded-full transition-all duration-200 ease-in-out hover:shadow-lg",
          children: showAllEpisodes ? "Thu gọn" : `Xem thêm (${filteredEpisodes.length - 40} tập)`
        }
      ) }),
      filteredEpisodes.length === 0 && searchTerm && /* @__PURE__ */ jsxs("p", { className: "text-gray-500 text-center text-sm mt-6 italic", children: [
        'Không tìm thấy tập phim nào phù hợp với từ khóa "',
        searchTerm,
        '".'
      ] }),
      filteredEpisodes.length === 0 && !searchTerm && /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-center text-sm mt-6 italic", children: "Hiện tại chưa có tập phim nào cho loại này." })
    ] }),
    /* @__PURE__ */ jsx(
      "script",
      {
        type: "application/ld+json",
        dangerouslySetInnerHTML: {
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TVSeries",
            name: movieTitle,
            numberOfEpisodes: parseInt(totalEpisodes) || 0
          })
        }
      }
    )
  ] });
};

const defaultAvatar = new Proxy({"src":"/_astro/avatar.qhoT-wEi.webp","width":500,"height":500,"format":"webp"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "D:/motchillhd.online/src/assets/avatar.webp";
							}
							
							return target[name];
						}
					});

const firebaseConfig = {
  apiKey: "AIzaSyASSvFwOCSEPnVeX5wP7HkcCf0kK-9CGiw",
  authDomain: "node-1d576.firebaseapp.com",
  databaseURL: "https://node-1d576-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "node-1d576",
  storageBucket: "node-1d576.firebasestorage.app",
  messagingSenderId: "124129220162",
  appId: "1:124129220162:web:96f5d4618416f8ad2f3fdb",
  measurementId: "G-QS6SVMBE6F"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const INITIAL_LOAD_COUNT = 10;
const LOAD_MORE_COUNT = 10;
const MAX_COMMENT_LENGTH = 1e3;
const COMMENT_COOLDOWN_SECONDS = 15;
const getDeviceId = () => {
  if (typeof window !== "undefined") {
    let deviceId = localStorage.getItem("deviceId");
    if (!deviceId) {
      deviceId = "device_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("deviceId", deviceId);
    }
    return deviceId;
  }
  return null;
};
function CommentBox({ commentIdentifier }) {
  const [ten, setTen] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userName") || "";
    }
    return "";
  });
  const [noiDung, setNoiDung] = useState("");
  const [email, setEmail] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("userEmail") || "";
    }
    return "";
  });
  const [allBinhLuan, setAllBinhLuan] = useState([]);
  const [visibleCommentCount, setVisibleCommentCount] = useState(INITIAL_LOAD_COUNT);
  const [userLikes, setUserLikes] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);
  const deviceId = getDeviceId();
  const cooldownTimerRef = useRef(null);
  useEffect(() => {
    if (!deviceId || !commentIdentifier) return;
    const commentRef = ref(database, `binhluan/${commentIdentifier}`);
    const unsubscribe = onValue(commentRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }));
        setAllBinhLuan(list.reverse());
        const likes = {};
        list.forEach((comment) => {
          if (comment.votes && comment.votes[deviceId] === "like") {
            likes[comment.id] = true;
          }
        });
        setUserLikes(likes);
      } else {
        setAllBinhLuan([]);
      }
      setVisibleCommentCount(INITIAL_LOAD_COUNT);
    });
    if (typeof window !== "undefined") {
      const lastPostTime = parseInt(
        localStorage.getItem("lastCommentPostTime") || "0",
        10
      );
      const timeSinceLastPost = Math.floor((Date.now() - lastPostTime) / 1e3);
      if (timeSinceLastPost < COMMENT_COOLDOWN_SECONDS) {
        setCooldownRemaining(COMMENT_COOLDOWN_SECONDS - timeSinceLastPost);
      }
    }
    return () => {
      unsubscribe();
      if (cooldownTimerRef.current) {
        clearInterval(cooldownTimerRef.current);
      }
    };
  }, [commentIdentifier, deviceId]);
  useEffect(() => {
    if (cooldownRemaining > 0) {
      cooldownTimerRef.current = setInterval(() => {
        setCooldownRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(cooldownTimerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1e3);
    }
    return () => {
      if (cooldownTimerRef.current) {
        clearInterval(cooldownTimerRef.current);
      }
    };
  }, [cooldownRemaining]);
  const handleSend = async () => {
    setErrorMessage("");
    if (cooldownRemaining > 0) {
      setErrorMessage(
        `Vui lòng đợi ${cooldownRemaining} giây trước khi bình luận lại.`
      );
      return;
    }
    if (!ten.trim() && showUserDetails) {
      setErrorMessage("Tên không được để trống.");
      return;
    }
    if (!noiDung.trim()) {
      setErrorMessage("Nội dung bình luận không được để trống.");
      return;
    }
    if (noiDung.trim().length < 10) {
      setErrorMessage("Nội dung bình luận phải có ít nhất 10 ký tự.");
      return;
    }
    if (noiDung.trim().length > MAX_COMMENT_LENGTH) {
      setErrorMessage(
        `Nội dung bình luận không được vượt quá ${MAX_COMMENT_LENGTH} ký tự.`
      );
      return;
    }
    const urlRegex = /(https?:\/\/[^\s]+)|(www\.[^\s]+)|([a-zA-Z0-9-]+\.(com|net|org|edu|gov|io|co|me|xyz)(\/\S*)?)/gi;
    if (urlRegex.test(noiDung)) {
      setErrorMessage("Nội dung bình luận không được chứa liên kết.");
      return;
    }
    if (email.trim() && !email.trim().endsWith("@gmail.com")) {
      setErrorMessage("Email phải có định dạng @gmail.com.");
      return;
    }
    if (isSending || !deviceId || !commentIdentifier) return;
    setIsSending(true);
    const commentData = {
      ten: showUserDetails ? ten : "Ẩn Danh",
      noiDung,
      email: showUserDetails ? email.trim() || null : null,
      thoiGian: (/* @__PURE__ */ new Date()).toISOString(),
      likes: 0,
      votes: {},
      deviceId
      // Include deviceId in comment data for potential server-side checks
    };
    const commentRef = ref(database, `binhluan/${commentIdentifier}`);
    try {
      await push(commentRef, commentData);
      setNoiDung("");
      if (typeof window !== "undefined") {
        if (showUserDetails) {
          localStorage.setItem("userName", ten);
          localStorage.setItem("userEmail", email);
        }
        localStorage.setItem("lastCommentPostTime", Date.now().toString());
        setCooldownRemaining(COMMENT_COOLDOWN_SECONDS);
      }
    } catch (error) {
      console.error("Error sending comment:", error);
      setErrorMessage("Đã xảy ra lỗi khi gửi bình luận. Vui lòng thử lại.");
    } finally {
      setIsSending(false);
    }
  };
  const handleToggleLike = async (commentId) => {
    if (!deviceId || !commentIdentifier) return;
    const isLiked = userLikes[commentId];
    const commentRef = ref(
      database,
      `binhluan/${commentIdentifier}/${commentId}`
    );
    const comment = allBinhLuan.find((c) => c.id === commentId);
    let newLikes = comment.likes || 0;
    let updates = {};
    if (isLiked) {
      newLikes = Math.max(0, newLikes - 1);
      updates = {
        likes: newLikes,
        [`votes/${deviceId}`]: null
      };
      setUserLikes((prev) => {
        const newState = { ...prev };
        delete newState[commentId];
        return newState;
      });
    } else {
      newLikes += 1;
      updates = {
        likes: newLikes,
        [`votes/${deviceId}`]: "like"
      };
      setUserLikes((prev) => ({
        ...prev,
        [commentId]: true
      }));
    }
    await update(commentRef, updates);
  };
  const formatTimeAgo = (isoString) => {
    const commentDate = new Date(isoString);
    const now = /* @__PURE__ */ new Date();
    const diffInSeconds = Math.floor((now - commentDate) / 1e3);
    if (diffInSeconds < 60) {
      return "vừa đăng";
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} phút trước`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} giờ trước`;
    } else if (diffInSeconds < 2592e3) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} ngày trước`;
    } else {
      return commentDate.toLocaleDateString("vi-VN");
    }
  };
  const handleLoadMore = () => {
    setVisibleCommentCount((prevCount) => prevCount + LOAD_MORE_COUNT);
  };
  const commentsToDisplay = allBinhLuan.slice(0, visibleCommentCount);
  const hasMoreComments = allBinhLuan.length > visibleCommentCount;
  const CommentItem = ({ comment }) => /* @__PURE__ */ jsx("div", { className: "border-b border-gray-700 last:border-b-0", children: /* @__PURE__ */ jsxs("div", { className: "flex items-start space-x-4 py-4", children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        src: typeof defaultAvatar === "string" ? defaultAvatar : defaultAvatar.src,
        alt: "Avatar người dùng",
        className: "flex-shrink-0 w-10 h-10 rounded-full object-cover border border-gray-200",
        onError: (e) => {
          e.target.onerror = null;
          e.target.src = "/placeholder-avatar.png";
        }
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex-grow", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center text-sm mb-2", children: [
        /* @__PURE__ */ jsx("span", { className: "font-semibold text-white mr-2", children: comment.ten }),
        /* @__PURE__ */ jsx("span", { className: "text-gray-400 mr-3 text-xs", children: formatTimeAgo(comment.thoiGian) })
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-gray-200 mb-3 leading-relaxed text-sm", children: comment.noiDung }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-4 text-sm", children: /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: () => handleToggleLike(comment.id),
          className: `flex items-center justify-between space-x-1 transition-all duration-200 ${userLikes[comment.id] ? "text-blue-200" : "text-gray-400 hover:text-blue-300"}`,
          children: [
            /* @__PURE__ */ jsx(
              "svg",
              {
                xmlns: "http://www.w3.org/2000/svg",
                width: "18",
                height: "18",
                viewBox: "0 0 24 24",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    fill: "currentColor",
                    fillRule: "evenodd",
                    d: "M11.277 4.781A4 4 0 0 1 14.606 3h.213a2 2 0 0 1 1.973 2.329L16.18 9h2.38a3 3 0 0 1 2.942 3.588l-1.2 6A3 3 0 0 1 17.36 21H6a3 3 0 0 1-3-3v-8a1 1 0 0 1 1-1h3.93a1 1 0 0 0 .832-.445zM7 11H5v7a1 1 0 0 0 1 1h1z",
                    clipRule: "evenodd"
                  }
                )
              }
            ),
            /* @__PURE__ */ jsx("span", { children: comment.likes || 0 })
          ]
        }
      ) })
    ] })
  ] }) });
  const isSendButtonDisabled = isSending || noiDung.trim().length === 0 || showUserDetails && ten.trim().length === 0 || cooldownRemaining > 0;
  return /* @__PURE__ */ jsxs("div", { className: "py-6 text-white font-sans", children: [
    /* @__PURE__ */ jsxs("h3", { className: "text-base flex flex-row gap-3 lg:text-xl font-semibold text-gray-100 items-center pb-6", children: [
      /* @__PURE__ */ jsx(
        "svg",
        {
          xmlns: "http://www.w3.org/2000/svg",
          width: "20",
          height: "20",
          viewBox: "0 0 21 21",
          fill: "none",
          children: /* @__PURE__ */ jsx("g", { "clip-path": "url(#clip0_281_3026)", children: /* @__PURE__ */ jsx(
            "path",
            {
              d: "M14.499 0.5H6.50109C3.19363 0.5 0.502686 3.19095 0.502686 6.4984V11.1638C0.502686 14.3596 3.01468 16.9796 6.16784 17.1532V19.9338C6.16784 20.2461 6.42244 20.5 6.73536 20.5C6.88498 20.5 7.02661 20.4407 7.13358 20.3337L7.75875 19.7085C9.40031 18.0666 11.5834 17.1622 13.9054 17.1622H14.499C17.8064 17.1622 20.4974 14.4713 20.4974 11.1638V6.4984C20.4974 3.19095 17.8064 0.5 14.499 0.5ZM6.16784 10.1641C5.4327 10.1641 4.83486 9.56625 4.83486 8.83111C4.83486 8.09597 5.4327 7.49813 6.16784 7.49813C6.90298 7.49813 7.50082 8.09597 7.50082 8.83111C7.50082 9.56625 6.90265 10.1641 6.16784 10.1641ZM10.5 10.1641C9.76488 10.1641 9.16704 9.56625 9.16704 8.83111C9.16704 8.09597 9.76488 7.49813 10.5 7.49813C11.2352 7.49813 11.833 8.09597 11.833 8.83111C11.833 9.56625 11.2348 10.1641 10.5 10.1641ZM14.8322 10.1641C14.0971 10.1641 13.4992 9.56625 13.4992 8.83111C13.4992 8.09597 14.0971 7.49813 14.8322 7.49813C15.5673 7.49813 16.1652 8.09597 16.1652 8.83111C16.1652 9.56625 15.567 10.1641 14.8322 10.1641Z",
              fill: "currentColor"
            }
          ) })
        }
      ),
      "Bình Luận (",
      allBinhLuan.length,
      ")"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "bg-[#ffffff10] px-2 py-3 rounded-lg shadow-lg mb-8", children: [
      " ",
      errorMessage && /* @__PURE__ */ jsx("div", { className: "bg-red-800 text-white p-3 rounded-[4px] mb-4 text-sm", children: errorMessage }),
      /* @__PURE__ */ jsxs("div", { className: "relative mb-4", children: [
        /* @__PURE__ */ jsx(
          "textarea",
          {
            className: "w-full p-3 rounded-lg bg-[#191b24] text-white resize-none focus:outline-none text-sm placeholder-gray-400 border border-transparent focus:border-white",
            rows: 4,
            placeholder: "Viết bình luận",
            value: noiDung,
            onChange: (e) => {
              if (e.target.value.length <= MAX_COMMENT_LENGTH) {
                setNoiDung(e.target.value);
              }
            }
          }
        ),
        /* @__PURE__ */ jsxs("span", { className: "absolute top-2 right-3 text-xs text-gray-400", children: [
          noiDung.length,
          " / ",
          MAX_COMMENT_LENGTH
        ] })
      ] }),
      showUserDetails && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4 mb-4", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "ten",
              className: "block text-gray-300 text-sm font-medium mb-1",
              children: "Tên của bạn *"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "ten",
              className: "w-full p-2 rounded-[4px] bg-[#191b24] text-white placeholder-gray-400 focus:outline-none text-sm border border-transparent focus:border-gray-600",
              placeholder: "Nhập tên của bạn",
              value: ten,
              onChange: (e) => setTen(e.target.value)
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "email",
              className: "block text-gray-300 text-sm font-medium mb-1",
              children: "Email *"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "email",
              type: "email",
              className: "w-full p-2 rounded-[4px] bg-[#191b24] text-white placeholder-gray-400 focus:outline-none text-sm border border-transparent focus:border-gray-600",
              placeholder: "your@email.com",
              value: email,
              onChange: (e) => setEmail(e.target.value)
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center px-2", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setShowUserDetails(!showUserDetails),
            className: "flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 text-sm",
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: `w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-200
                ${showUserDetails ? "bg-[#FFD875] border-[#FFD875]" : "border-gray-600"}`,
                  children: showUserDetails && /* @__PURE__ */ jsx(
                    "svg",
                    {
                      xmlns: "http://www.w3.org/2000/svg",
                      width: "14",
                      height: "14",
                      viewBox: "0 0 24 24",
                      fill: "none",
                      stroke: "currentColor",
                      strokeWidth: "3",
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      className: "text-gray-900",
                      children: /* @__PURE__ */ jsx("polyline", { points: "20 6 9 17 4 12" })
                    }
                  )
                }
              ),
              "Tiết lộ?"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: handleSend,
            disabled: isSendButtonDisabled,
            className: `flex items-center gap-2 font-semibold ${isSendButtonDisabled ? "text-gray-500 cursor-not-allowed" : "text-[#FFD875] hover:text-[#FFDF91]"} transition-colors duration-200`,
            children: [
              "Gửi",
              cooldownRemaining > 0 && /* @__PURE__ */ jsxs("span", { className: "ml-1 text-xs", children: [
                "(",
                cooldownRemaining,
                "s)"
              ] }),
              /* @__PURE__ */ jsx(
                "svg",
                {
                  xmlns: "http://www.w3.org/2000/svg",
                  width: "20",
                  height: "20",
                  viewBox: "0 0 32 32",
                  children: /* @__PURE__ */ jsx(
                    "path",
                    {
                      fill: "currentColor",
                      d: "m27.45 15.11l-22-11a1 1 0 0 0-1.08.12a1 1 0 0 0-.33 1L6.69 15H18v2H6.69L4 26.74A1 1 0 0 0 5 28a1 1 0 0 0 .45-.11l22-11a1 1 0 0 0 0-1.78"
                    }
                  )
                }
              )
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mb-8 space-y-2 text-sm", children: [
      commentsToDisplay.map((comment, i) => /* @__PURE__ */ jsx(CommentItem, { comment }, comment.id || i)),
      hasMoreComments && /* @__PURE__ */ jsx("div", { className: "text-center", children: /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: handleLoadMore,
          className: "px-6 py-3 text-sm font-medium text-black bg-gradient-to-br from-[#FECF59] to-[#FFF1CC] rounded-full  transition-all duration-200 ease-in-out",
          children: [
            "Xem thêm (",
            allBinhLuan.length - visibleCommentCount,
            " bình luận)"
          ]
        }
      ) }),
      !hasMoreComments && allBinhLuan.length > INITIAL_LOAD_COUNT && /* @__PURE__ */ jsx("p", { className: "text-gray-500 text-center text-sm mt-6 italic", children: "✨ Đã hiển thị tất cả bình luận." })
    ] })
  ] });
}

export { CommentBox as C, Episodes as E };
