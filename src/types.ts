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
