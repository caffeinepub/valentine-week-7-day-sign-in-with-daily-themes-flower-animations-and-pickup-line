import { VALENTINE_DAYS, type ValentineDay } from './valentineWeek';

export interface ValentineWeekStatus {
  isActive: boolean;
  currentDayIndex: number | null;
  currentDay: ValentineDay | null;
  daysUntilStart: number | null;
  daysUntilEnd: number | null;
}

// Valentine Week 2026: February 7-13 (ending on Valentine's Day Feb 14)
const VALENTINE_WEEK_START = new Date(Date.UTC(2026, 1, 7, 0, 0, 0)); // Feb 7, 2026
const VALENTINE_WEEK_END = new Date(Date.UTC(2026, 1, 13, 23, 59, 59)); // Feb 13, 2026
const VALENTINES_DAY = new Date(Date.UTC(2026, 1, 14, 0, 0, 0)); // Feb 14, 2026

export function getValentineWeekStatus(): ValentineWeekStatus {
  const now = new Date();
  const nowUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const startUTC = VALENTINE_WEEK_START.getTime();
  const endUTC = VALENTINE_WEEK_END.getTime();

  // Check if we're within Valentine Week
  if (nowUTC < startUTC) {
    const daysUntilStart = Math.ceil((startUTC - nowUTC) / (1000 * 60 * 60 * 24));
    return {
      isActive: false,
      currentDayIndex: null,
      currentDay: null,
      daysUntilStart,
      daysUntilEnd: null,
    };
  }

  if (nowUTC > endUTC) {
    return {
      isActive: false,
      currentDayIndex: null,
      currentDay: null,
      daysUntilStart: null,
      daysUntilEnd: 0,
    };
  }

  // Calculate which day of the week we're on (1-7)
  const daysSinceStart = Math.floor((nowUTC - startUTC) / (1000 * 60 * 60 * 24));
  const currentDayIndex = Math.min(daysSinceStart + 1, 7);
  const currentDay = VALENTINE_DAYS[currentDayIndex - 1];

  return {
    isActive: true,
    currentDayIndex,
    currentDay,
    daysUntilStart: null,
    daysUntilEnd: Math.ceil((endUTC - nowUTC) / (1000 * 60 * 60 * 24)),
  };
}

export function isValentinesDay(): boolean {
  const now = new Date();
  const nowUTC = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const valentinesDayUTC = VALENTINES_DAY.getTime();
  return nowUTC === valentinesDayUTC;
}
