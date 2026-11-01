// Dates render the same on the server and in every browser: a fixed locale and
// the Doha time zone, so pages hydrate without text mismatches.
const LOCALE = 'en-US';
const TIME_ZONE = 'Asia/Qatar';

export function formatDate(value: string | Date, options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' }): string {
  return new Date(value).toLocaleDateString(LOCALE, { timeZone: TIME_ZONE, ...options });
}

export function formatTime(value: string | Date): string {
  return new Date(value).toLocaleTimeString(LOCALE, { timeZone: TIME_ZONE, hour: '2-digit', minute: '2-digit' });
}

// "12 days left", "1 day left" or "Deadline passed". It depends on today's date,
// so the element showing it should set suppressHydrationWarning.
export function deadlineLabel(deadline: string, now: Date = new Date()): string {
  const days = Math.ceil((new Date(deadline).getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (days < 0) return 'Deadline passed';
  return `${days} day${days === 1 ? '' : 's'} left`;
}
