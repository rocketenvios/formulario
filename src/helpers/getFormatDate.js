export function formatDate(weeks = 0) {
  const date = new Date();
  date.setDate(date.getDate() + 1 + weeks * 7);

  return date.toISOString().slice(0, 10);
}
