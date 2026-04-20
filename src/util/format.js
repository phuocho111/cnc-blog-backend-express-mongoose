const formatSlug = (str) => {
  return str
    .normalize("NFD") // tách dấu
    .replace(/[\u0300-\u036f]/g, "") // xóa dấu
    .replace(/đ/g, "d") // fix cho "đ"
    .replace(/Đ/g, "d") // fix cho "Đ"
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // xóa ký tự đặc biệt
    .replace(/\s+/g, "-") // thay khoảng trắng bằng -
    .replace(/-+/g, "-"); // gộp nhiều dấu - liên tiếp
};

module.exports = { formatSlug };
