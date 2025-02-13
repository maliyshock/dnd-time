export const SECOND = 1;
export const MINUTE = SECOND * 60;
export const HOUR = MINUTE * 60;
export const DAY = 24 * HOUR;
export const MINUTES_IN_DAY = DAY / MINUTE;

// in seconds
export const MORNING_START = 6 * HOUR;
export const DAY_START = 7 * HOUR;
export const EVENING_START = 18 * HOUR;
export const NIGHT_START = 19 * HOUR;
export const ZERO_TIME = 0;
export const DAY_TIME_DURATION = NIGHT_START - MORNING_START;

export const COLORS = [
  { name: "ZERO_TIME", time: ZERO_TIME, color: ["#0f0c29", "#302b63"] },
  { name: "MORNING_START - 1 hour", time: MORNING_START - HOUR, color: ["#4b6cb7", "#182848"] },
  { name: "MORNING_START", time: MORNING_START, color: ["#fad0c4", "#ff9a9e"] },
  { name: "DAY_START", time: DAY_START, color: ["#ADD8E6", "#87CEEB"] },
  { name: "DAY_START + 1 hour", time: DAY_START, color: ["#00BFFF", "#1E90FF"] },
  { name: "EVENING_START - 1 hour", time: EVENING_START - HOUR, color: ["#003582", "#245399"] },
  { name: "EVENING_START", time: EVENING_START, color: ["#a18cd1", "#fbc2eb"] },
  { name: "NIGHT_START", time: NIGHT_START, color: ["#4b6cb7", "#182848"] },
  { name: "END", time: DAY, color: ["#0f0c29", "#302b63"] },
];

export const DAY_ANGLE = 270; // градусов
export const NIGHT_ANGLE = 90; // градусов

export const DAY_ANGLE_PER_SECOND = DAY_ANGLE / DAY_TIME_DURATION; // градусов/минуту
export const NIGHT_ANGLE_PER_SECOND = NIGHT_ANGLE / DAY_TIME_DURATION; // градусов/минуту
