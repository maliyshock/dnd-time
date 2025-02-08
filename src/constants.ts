export const SECOND = 1;
export const MINUTE = SECOND * 60;
export const HOUR = MINUTE * 60;
export const DAY = 24 * HOUR;

// in seconds
export const MORNING_START = 6 * HOUR;
export const DAY_START = 7 * HOUR;
export const EVENING_START = 18 * HOUR;
export const NIGHT_START = 19 * HOUR;
export const ZERO_TIME = 0;
export const DAY_TIME_DURATION = NIGHT_START - MORNING_START;

export const ANGLE_OFFSET = 90;
export const DAY_ANGLE = 270; // градусов
export const NIGHT_ANGLE = 90; // градусов

export const DAY_ANGLE_PER_SECOND = DAY_ANGLE / DAY_TIME_DURATION; // градусов/минуту
export const NIGHT_ANGLE_PER_SECOND = NIGHT_ANGLE / DAY_TIME_DURATION; // градусов/минуту
