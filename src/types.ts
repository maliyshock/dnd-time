import { Time } from "~/utils/time/getNow.ts";

export type RGBColor = { r: number; g: number; b: number };
export type HSLColor = { h: number; s: number; l: number };
export type AudioFile = { filePath: string; name: string };

export type World = {
  id: string;
  name: string;
  initialTime: Time;
  order: number;
};

export type WorldStorage = Record<string, World>;

/** Oscillation profile parameters */
export type OscillationProfile = {
  xMin: number; // Minimum range of scale
  xMax: number; // Maximum range of scale
  sharpnessAlpha: number; // Sharpness of acceleration (>=1). 1 is closer to linear , more is sharper.
  epsilonMinSpeed: number; // Minimum speed increase at the top (0.01..0.1)
  baseSpeedPerSecond: number; // Base speed (scale)
};

export type Type = "star" | "dot" | "halo" | "wrapper";
