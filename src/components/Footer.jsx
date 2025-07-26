import logo from "../assets/logo.svg";

const Footer = () => {
  const navLinks = [
    { name: "Hỏi-Đáp", href: "/#" },
    { name: "Chính sách bảo mật", href: "/#" },
    { name: "Điều khoản sử dụng", href: "/#" },
    { name: "Giới thiệu", href: "/#" },
    { name: "Liên hệ", href: "/#" },
  ];

  return (
    <footer className="bg-[#0F111A] py-6 text-white px-4 lg:px-6 font-medium ">
      <div className="container mx-auto">
        <div className="mb-4 flex flex-col items-start justify-between md:flex-row md:items-center">
          <div className="mb-4 flex flex-wrap items-center gap-4 md:mb-0 lg:gap-16">
            <div className="flex items-center gap-2">
              <img
                src={typeof logo === "string" ? logo : logo.src}
                alt="Motchill Logo"
                className="h-10"
                loading="lazy"
              />
            </div>

            <div className="flex items-center space-x-2">
              <h3 className="sr-only">Theo dõi chúng tôi trên mạng xã hội</h3>
            </div>
          </div>
        </div>
        <nav className="mb-4" aria-label="Liên kết chân trang">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            {navLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="transition-colors duration-300 hover:text-white"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mb-4 text-sm leading-relaxed">
          <p>
            MotPhim - Trang xem phim online chất lượng cao miễn phí Vietsub,
            thuyết minh, lồng tiếng full HD. Kho phim mới không lỗi, phim chiếu
            rạp, phim bộ, phim lẻ từ nhiều quốc gia như Việt Nam, Hàn Quốc,
            Trung Quốc, Thái Lan, Nhật Bản, Âu Mỹ,... đa dạng thể loại. Khám phá
            nền tảng phim trực tuyến hay nhất 2024 chất lượng 4K.
          </p>
        </div>

        <div className="text-sm">
          <p>© 2025 MotPhim</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
