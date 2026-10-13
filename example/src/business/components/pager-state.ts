export function pagerState(page: number, pageSize: number, total: number) {
  const size = Number.isFinite(pageSize) && pageSize > 0 ? Math.max(1, Math.floor(pageSize)) : 1;
  const count = Number.isFinite(total) ? Math.max(0, Math.floor(total)) : 0;
  const pages = Math.max(1, Math.ceil(count / size));
  const current = Number.isFinite(page) ? Math.max(0, Math.min(pages - 1, Math.floor(page))) : 0;
  const start = current * size;
  const end = Math.min(start + size, count);
  const first = count ? start + 1 : 0;
  const visible = new Set([0, pages - 1, current - 1, current, current + 1]);
  if (current < 2) visible.add(2);
  if (current > pages - 3) visible.add(pages - 3);
  const pageNumbers = pages <= 7
    ? Array.from({ length: pages }, (_, index) => index)
    : [...visible].filter(value => value >= 0 && value < pages).sort((a, b) => a - b);
  return { pages, current, pageSize: size, total: count, start, end, first, pageNumbers };
}
