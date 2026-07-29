export function paginateItems(items, page = 1, pageSize = 10) {
  const safePage = Math.max(1, page);
  const start = (safePage - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

export function getTotalPages(totalItems, pageSize = 10) {
  return Math.max(1, Math.ceil(totalItems / pageSize));
}

export function slugify(value = "") {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
