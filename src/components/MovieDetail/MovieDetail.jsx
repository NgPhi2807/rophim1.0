export default function MovieDetailWrapper({ movie, children }) {
  function chuyenURLSangProxy(url) {
    const index = url.indexOf("/upload/");
    if (index === -1) return "";
    const path = url.slice(index + "/upload/".length);
    return `https://ik.imagekit.io/17mpki7mv/motchill/upload/${path}?tr=f-webp,w-800,h-450,fo-auto,q-85`;
  }

  return (
    <div className=" text-gray-300 ">
      <div className="px-4">
        <div className="container mx-auto">
          <div className="flex flex-col gap-3 lg:flex-row">{children}</div>
        </div>
      </div>
    </div>
  );
}
