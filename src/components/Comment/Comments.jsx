import React, { useEffect, useState, useRef } from "react";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push, onValue, update } from "firebase/database";

// Your Firebase config (unchanged)
const firebaseConfig = {
  apiKey: "AIzaSyASSvFwOCSEPnVeX5wP7HkcCf0kK-9CGiw",
  authDomain: "node-1d576.firebaseapp.com",
  databaseURL:
    "https://node-1d576-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "node-1d576",
  storageBucket: "node-1d576.firebasestorage.app",
  messagingSenderId: "124129220162",
  appId: "1:124129220162:web:96f5d4618416f8ad2f3fdb",
  measurementId: "G-QS6SVMBE6F",
};

// Init Firebase (unchanged)
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Define how many comments to load initially and per "load more" click
const INITIAL_LOAD_COUNT = 10;
const LOAD_MORE_COUNT = 10;
const MAX_COMMENT_LENGTH = 1000; // Max characters for comment

// Generate unique device ID
const getDeviceId = () => {
  if (typeof window !== "undefined") {
    let deviceId = localStorage.getItem("deviceId");
    if (!deviceId) {
      deviceId =
        "device_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("deviceId", deviceId);
    }
    return deviceId;
  }
  return null;
};

export default function CommentBox({ commentIdentifier }) {
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
  const [visibleCommentCount, setVisibleCommentCount] =
    useState(INITIAL_LOAD_COUNT);
  const [userLikes, setUserLikes] = useState({});
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showUserDetails, setShowUserDetails] = useState(false); // State for "Tiết lộ?" toggle

  const deviceId = getDeviceId();

  useEffect(() => {
    if (!deviceId || !commentIdentifier) return;

    const commentRef = ref(database, `binhluan/${commentIdentifier}`);

    const unsubscribe = onValue(commentRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
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

    return () => unsubscribe();
  }, [commentIdentifier, deviceId]);

  const handleSend = async () => {
    setErrorMessage("");

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

    const urlRegex =
      /(https?:\/\/[^\s]+)|(www\.[^\s]+)|([a-zA-Z0-9-]+\.(com|net|org|edu|gov|io|co|me|xyz)(\/\S*)?)/gi;
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
      thoiGian: new Date().toISOString(),
      likes: 0,
      votes: {},
    };

    const commentRef = ref(database, `binhluan/${commentIdentifier}`);

    try {
      await push(commentRef, commentData);
      setNoiDung("");
      if (typeof window !== "undefined" && showUserDetails) {
        localStorage.setItem("userName", ten);
        localStorage.setItem("userEmail", email);
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
        [`votes/${deviceId}`]: null,
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
        [`votes/${deviceId}`]: "like",
      };
      setUserLikes((prev) => ({
        ...prev,
        [commentId]: true,
      }));
    }

    await update(commentRef, updates);
  };

  const getInitials = (name) => {
    if (!name) return "";
    const words = name.split(" ").filter(Boolean);
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }
    return (
      words[0].charAt(0).toUpperCase() +
      words[words.length - 1].charAt(0).toUpperCase()
    );
  };

  const formatTimeAgo = (isoString) => {
    const commentDate = new Date(isoString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - commentDate) / 1000);

    if (diffInSeconds < 60) {
      return "vừa đăng";
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} phút trước`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} giờ trước`;
    } else if (diffInSeconds < 2592000) {
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

  const CommentItem = ({ comment }) => (
    <div className="border-b border-gray-700 last:border-b-0">
      <div className="flex items-start space-x-4 py-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br border border-gray-200 from-[#292929] to-[#2b2a2a] flex items-center justify-center text-white font-semibold text-sm shadow-lg">
          {getInitials(comment.ten)}
        </div>
        <div className="flex-grow">
          <div className="flex items-center text-sm mb-2">
            <span className="font-semibold text-white mr-2">{comment.ten}</span>
            <span className="text-gray-400 mr-3 text-xs">
              {formatTimeAgo(comment.thoiGian)}
            </span>
          </div>
          <p className="text-gray-200 mb-3 leading-relaxed text-sm">
            {comment.noiDung}
          </p>

          <div className="flex items-center space-x-4 text-sm">
            <button
              onClick={() => handleToggleLike(comment.id)}
              className={`flex items-center justify-between space-x-1 transition-all duration-200 ${
                userLikes[comment.id]
                  ? "text-blue-200"
                  : "text-gray-400 hover:text-blue-300"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M11.277 4.781A4 4 0 0 1 14.606 3h.213a2 2 0 0 1 1.973 2.329L16.18 9h2.38a3 3 0 0 1 2.942 3.588l-1.2 6A3 3 0 0 1 17.36 21H6a3 3 0 0 1-3-3v-8a1 1 0 0 1 1-1h3.93a1 1 0 0 0 .832-.445zM7 11H5v7a1 1 0 0 0 1 1h1z"
                  clipRule="evenodd"
                />
              </svg>
              <span>{comment.likes || 0}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-6 text-white font-sans">
      <h3 className="text-base flex flex-row gap-3 lg:text-xl font-semibold text-gray-100 items-center pb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 21 21"
          fill="none"
        >
          <g clip-path="url(#clip0_281_3026)">
            <path
              d="M14.499 0.5H6.50109C3.19363 0.5 0.502686 3.19095 0.502686 6.4984V11.1638C0.502686 14.3596 3.01468 16.9796 6.16784 17.1532V19.9338C6.16784 20.2461 6.42244 20.5 6.73536 20.5C6.88498 20.5 7.02661 20.4407 7.13358 20.3337L7.75875 19.7085C9.40031 18.0666 11.5834 17.1622 13.9054 17.1622H14.499C17.8064 17.1622 20.4974 14.4713 20.4974 11.1638V6.4984C20.4974 3.19095 17.8064 0.5 14.499 0.5ZM6.16784 10.1641C5.4327 10.1641 4.83486 9.56625 4.83486 8.83111C4.83486 8.09597 5.4327 7.49813 6.16784 7.49813C6.90298 7.49813 7.50082 8.09597 7.50082 8.83111C7.50082 9.56625 6.90265 10.1641 6.16784 10.1641ZM10.5 10.1641C9.76488 10.1641 9.16704 9.56625 9.16704 8.83111C9.16704 8.09597 9.76488 7.49813 10.5 7.49813C11.2352 7.49813 11.833 8.09597 11.833 8.83111C11.833 9.56625 11.2348 10.1641 10.5 10.1641ZM14.8322 10.1641C14.0971 10.1641 13.4992 9.56625 13.4992 8.83111C13.4992 8.09597 14.0971 7.49813 14.8322 7.49813C15.5673 7.49813 16.1652 8.09597 16.1652 8.83111C16.1652 9.56625 15.567 10.1641 14.8322 10.1641Z"
              fill="currentColor"
            ></path>
          </g>
        </svg>
        Bình Luận ({allBinhLuan.length})
      </h3>

      {/* New comment input area - MOVED TO TOP */}
      <div className="bg-[#ffffff10] px-2 py-3 rounded-lg shadow-lg mb-8">
        {" "}
        {/* Added mb-8 for spacing */}
        {errorMessage && (
          <div className="bg-red-800 text-white p-3 rounded-[4px] mb-4 text-sm">
            {errorMessage}
          </div>
        )}
        {/* Textarea with character counter */}
        <div className="relative mb-4">
          <textarea
            className="w-full p-3 rounded-lg bg-[#191b24] text-white resize-none focus:outline-none text-sm placeholder-gray-400 border border-transparent focus:border-white"
            rows={4}
            placeholder="Viết bình luận"
            value={noiDung}
            onChange={(e) => {
              if (e.target.value.length <= MAX_COMMENT_LENGTH) {
                setNoiDung(e.target.value);
              }
            }}
          />
          <span className="absolute top-2 right-3 text-xs text-gray-400">
            {noiDung.length} / {MAX_COMMENT_LENGTH}
          </span>
        </div>
        {showUserDetails && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label
                htmlFor="ten"
                className="block text-gray-300 text-sm font-medium mb-1"
              >
                Tên của bạn *
              </label>
              <input
                id="ten"
                className="w-full p-2 rounded-[4px] bg-[#191b24] text-white placeholder-gray-400 focus:outline-none text-sm border border-transparent focus:border-gray-600"
                placeholder="Nhập tên của bạn"
                value={ten}
                onChange={(e) => setTen(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-300 text-sm font-medium mb-1"
              >
                Email *
              </label>
              <input
                id="email"
                type="email"
                className="w-full p-2 rounded-[4px] bg-[#191b24] text-white placeholder-gray-400 focus:outline-none text-sm border border-transparent focus:border-gray-600"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
        )}
        <div className="flex justify-between items-center px-2">
          <button
            onClick={() => setShowUserDetails(!showUserDetails)}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 text-sm"
          >
            <div
              className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all duration-200
                ${
                  showUserDetails
                    ? "bg-[#FFD875] border-[#FFD875]" // Changed to yellow
                    : "border-gray-600" // Darker border for consistency
                }`}
            >
              {showUserDetails && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-gray-900"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </div>
            Tiết lộ?
          </button>
          {/* Gửi button */}
          <button
            onClick={handleSend}
            disabled={
              isSending ||
              noiDung.trim().length === 0 ||
              (showUserDetails && ten.trim().length === 0)
            }
            className="flex items-center gap-2 font-semibold text-[#FFD875]" // Adjusted padding for arrow
          >
            Gửi
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 32 32"
            >
              <path
                fill="currentColor"
                d="m27.45 15.11l-22-11a1 1 0 0 0-1.08.12a1 1 0 0 0-.33 1L6.69 15H18v2H6.69L4 26.74A1 1 0 0 0 5 28a1 1 0 0 0 .45-.11l22-11a1 1 0 0 0 0-1.78"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Existing comments list */}
      <div className="mb-8 space-y-2 text-sm">
        {commentsToDisplay.map((comment, i) => (
          <CommentItem key={comment.id || i} comment={comment} />
        ))}

        {hasMoreComments && (
          <div className="text-center">
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 text-sm font-medium text-black bg-gradient-to-br from-[#FECF59] to-[#FFF1CC] rounded-full  transition-all duration-200 ease-in-out"
            >
              Xem thêm ({allBinhLuan.length - visibleCommentCount} bình luận)
            </button>
          </div>
        )}

        {!hasMoreComments && allBinhLuan.length > INITIAL_LOAD_COUNT && (
          <p className="text-gray-500 text-center text-sm mt-6 italic">
            ✨ Đã hiển thị tất cả bình luận.
          </p>
        )}
      </div>
    </div>
  );
}
