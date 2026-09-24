const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/**
 * Formats a resume date string ("YYYY" or "YYYY-MM") from its literal
 * components, never via Date parsing, to avoid UTC-to-local shifts.
 */
export function formatResumeDate(date: string): string {
  const [year, month] = date.split("-");
  if (!month) return year;
  const monthIndex = Number.parseInt(month, 10) - 1;
  return `${MONTHS[monthIndex]} ${year}`;
}

export function formatDateRange(startDate: string, endDate?: string): string {
  const start = formatResumeDate(startDate);
  const end = endDate ? formatResumeDate(endDate) : "Present";
  return `${start} — ${end}`;
}
