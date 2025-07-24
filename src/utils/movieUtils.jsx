export function rutGonTinhTrangPhim(tinhTrang) {
  if (!tinhTrang) return "";

  const txt = tinhTrang.toLowerCase();
  const tapFullMatch = tinhTrang.match(/\(\d+\/\d+\)/);
  const tapNMatch = tinhTrang.match(/tập\s*\d+(\/\d+)?/i);

  if (txt.includes("hoàn tất") || txt.includes("full")) {
    return tapFullMatch ? `Full ${tapFullMatch[0]}` : "Full";
  }

  if (tapNMatch) {
    return `${tapNMatch[0]}`;
  }

  if (txt.includes("update") || txt.includes("cập nhật")) {
    return "Cập Nhật";
  }

  return tinhTrang;
}

export function rutGonTinhTrangPhim1(tinhTrang) {
  if (!tinhTrang) return "";

  const txt = tinhTrang.toLowerCase();
  const tapFullMatch = tinhTrang.match(/\(\d+\/\d+\)/);
  const tapNMatch = tinhTrang.match(/tập\s*\d+(\/\d+)?/i);

  if (txt.includes("hoàn tất") || txt.includes("full")) {
    return tapFullMatch ? `Full ${tapFullMatch[0]}` : "Full";
  }

  if (tapNMatch) {
    return `Cập Nhật ${tapNMatch[0]}`;
  }

  if (txt.includes("update") || txt.includes("cập nhật")) {
    return "Cập Nhật";
  }

  return tinhTrang;
}

export function rutGonTinhTrangNgonNgu(str) {
  if (!str) return "Chưa rõ";
  const lower = str.toLowerCase();
  const hasLT = lower.includes("lồng tiếng");
  const hasTM = lower.includes("thuyết minh");
  const hasVS = lower.includes("vietsub");

  if (hasLT && hasTM && hasVS) return "T.M + P.Đ";
  if (hasTM) return "T.M";
  if (hasVS) return "P.Đ";
  if (hasLT) return "L.T";
  return "Chưa rõ";
}
