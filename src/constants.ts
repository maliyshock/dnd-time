import { AudioFile } from "~/types.ts";
import music from "~/assets/sound/music.mp3";
import bip from "~/assets/sound/bip.wav";
import wetClick from "~/assets/sound/wet-click.wav";
import wetClickHigh from "~/assets/sound/wet-click-high.wav";
import drop from "~/assets/sound/drop.mp3";
import tap from "~/assets/sound/tap.mp3";
import star1 from "~/assets/sound/star_1.mp3";
import star2 from "~/assets/sound/star_2.mp3";
import star3 from "~/assets/sound/star_3.mp3";
import star4 from "~/assets/sound/star_4.mp3";
import star5 from "~/assets/sound/star_5.mp3";
import brokenStar1 from "~/assets/sound/broken_star_1.mp3";
import brokenStar2 from "~/assets/sound/broken_star_2.mp3";
import fire from "~/assets/sound/fire.mp3";
import scream from "~/assets/sound/scream.mp3";
import { formatTime } from "~/utils/time/formatTime.ts";

export const SECOND = 1;
export const MINUTE = SECOND * 60;
export const HOUR = MINUTE * 60;
export const DAY = 24 * HOUR;
export const MINUTES_IN_DAY = DAY / MINUTE;

export const HOURS_OPTIONS = Array.from({ length: 24 }, (_, i) => String(formatTime(i)));
export const MINUTES_OPTIONS = Array.from({ length: 12 }, (_, i) => String(formatTime(i * 5)));

// in seconds
export const MORNING_START = 6.75 * HOUR; // 15 minutes before day
export const DAY_START = 7 * HOUR;
export const EVENING_START = 18.75 * HOUR;
export const NIGHT_START = 19 * HOUR;
export const ZERO_TIME = 0;
export const DAY_TIME_DURATION = NIGHT_START - MORNING_START;

const NIGHT_COLORS = ["#0f0c29", "#302b63"];

export const COLORS = [
  { name: "ZERO_TIME", time: ZERO_TIME, color: NIGHT_COLORS },
  { name: "EARLY NIGHT", time: MORNING_START - 15 * MINUTE, color: ["#4b6cb7", "#182848"] }, // 15 minutes before morning
  { name: "MORNING_START", time: MORNING_START, color: ["#fad0c4", "#ff9a9e"], gradientDeg: 135 },
  { name: "DAY_START", time: DAY_START, color: ["#ADD8E6", "#87CEEB"], gradientDeg: 165 },
  { name: "DAY_START + 1 hour", time: DAY_START + HOUR, color: ["#00BFFF", "#1E90FF"], gradientDeg: 70 },
  { name: "EVENING_START - 1 hour", time: EVENING_START - 15 * MINUTE, color: ["#003582", "#245399"], gradientDeg: 100 },
  { name: "EVENING_START", time: EVENING_START, color: ["#a18cd1", "#fbc2eb"], gradientDeg: 100 },
  { name: "NIGHT_START", time: NIGHT_START, color: ["#182848", "#4b6cb7"], gradientDeg: 135 },
  { name: "END", time: DAY, color: NIGHT_COLORS, gradientDeg: 135 },
];

export const DAY_ANGLE = 270;
export const NIGHT_ANGLE = 90;

export const DAY_ANGLE_PER_SECOND = DAY_ANGLE / DAY_TIME_DURATION;
export const NIGHT_ANGLE_PER_SECOND = NIGHT_ANGLE / DAY_TIME_DURATION;

// time speed
export const TICK = 1000;

// sound
export const MAX_VOLUME = 0.7;
export const FADE_DURATION = 0.5;
export const HIGHPASS_FREQ = 200;
export const NORMAL_PLAYBACK_RATE = 1.0;
export const SLOW_PLAYBACK_RATE = 0.5;

export const BROKEN_STAR_SOUNDS: AudioFile[] = [
  { name: "brokenStar1", filePath: brokenStar1 },
  { name: "brokenStar2", filePath: brokenStar2 },
];
export type BrokenStarKind = (typeof BROKEN_STAR_SOUNDS)[number];

export const STAR_SOUNDS: AudioFile[] = [
  { name: "star1", filePath: star1 },
  { name: "star2", filePath: star2 },
  { name: "star3", filePath: star3 },
  { name: "star4", filePath: star4 },
  { name: "star5", filePath: star5 },
];
export type StarKind = (typeof STAR_SOUNDS)[number];

export const STAR_SOUNDS_MAP: Record<StarVariation, Array<StarKind["name"] | BrokenStarKind["name"]>> = {
  broken: BROKEN_STAR_SOUNDS.map(item => item.name),
  default: ["star1"],
  blue: ["star2"],
  orange: ["star3"],
  yellow: ["star4"],
  green: ["star5"],
};

export const AUDIO_FILES: AudioFile[] = [
  { name: "musicTheme", filePath: music },
  { name: "bip", filePath: bip },
  { name: "wetClick", filePath: wetClick },
  { name: "wetClickHigh", filePath: wetClickHigh },
  { name: "drop", filePath: drop },
  { name: "tap", filePath: tap },
  { name: "fire", filePath: fire },
  { name: "scream", filePath: scream },
  ...STAR_SOUNDS,
  ...BROKEN_STAR_SOUNDS,
];

export const STAR_MIN_SIZE = 2;
export const STAR_MAX_SIZE = 20;

export type StarVariation = "default" | "broken" | "blue" | "green" | "yellow" | "orange";

export type StarDictionaryItem = {
  name: StarVariation;
  chance: number;
};

// set chances in percents
export const STARS_PROBABILITY: StarDictionaryItem[] = [
  { name: "broken", chance: 5 },
  { name: "blue", chance: 15 },
  { name: "orange", chance: 10 },
  { name: "yellow", chance: 10 },
  { name: "green", chance: 15 },
];
