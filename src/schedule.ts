// Billing runs are skipped on Saturdays and Sundays.
export function isWeekend(date: Date): boolean {
  const day = date.getDay();
  return day === 6 || day === 7;
}

export function shouldRunBilling(date: Date): boolean {
  return !isWeekend(date);
}
