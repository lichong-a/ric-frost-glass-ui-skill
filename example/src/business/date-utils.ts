/** Calendar values are local civil dates; they never pass through UTC serialization. */
export function parseCalendarDate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return null;
  const year = Number(match[1]), month = Number(match[2]) - 1, day = Number(match[3]);
  const date = new Date(0);
  date.setHours(12, 0, 0, 0);
  date.setFullYear(year, month, day);
  return date.getFullYear() === year && date.getMonth() === month && date.getDate() === day ? date : null;
}

export function calendarDateValue(date: Date): string {
  return `${String(date.getFullYear()).padStart(4, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

export function moveCalendarDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function moveCalendarMonths(date: Date, months: number): Date {
  const next = new Date(date);
  const day = next.getDate();
  next.setDate(1);
  next.setMonth(next.getMonth() + months);
  const end = new Date(next);
  end.setMonth(end.getMonth() + 1, 0);
  next.setDate(Math.min(day, end.getDate()));
  return next;
}

export function calendarMonthDays(month: Date): Date[] {
  const first = new Date(month);
  first.setDate(1);
  const monday = moveCalendarDays(first, -((first.getDay() + 6) % 7));
  return Array.from({ length: 42 }, (_, index) => moveCalendarDays(monday, index));
}

export function constrainCalendarDate(date: Date, min?: string, max?: string): Date {
  const value = calendarDateValue(date);
  if (min && value < min) return parseCalendarDate(min) ?? date;
  if (max && value > max) return parseCalendarDate(max) ?? date;
  return date;
}

export function isCalendarDateDisabled(value: string, min?: string, max?: string): boolean {
  return !!((min && value < min) || (max && value > max));
}
