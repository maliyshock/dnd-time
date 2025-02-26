import { getRandomNum } from "~/utils/getRandomNum.ts";
import { v4 as uuidv4 } from "uuid";
import { StateCreator } from "zustand";
import { delay } from "~/utils/delay.ts";

type CloudState = "default" | "rain" | "lightning";

export type Cloud = {
  cloudState: CloudState;
  cloudVariation: number;
  id: string;
};

export type CloudSlice = {
  clouds: Cloud[];
  removeCloud(id: string): void;
  createCloud(): void;
  scheduleRecreation(id: string): Promise<void>;
};

const cloudVariations = 7;
const sceneCloudsAmount = 5;

function createCloud(): Cloud {
  return {
    cloudState: "default",
    cloudVariation: getRandomNum({ max: cloudVariations }),
    id: uuidv4(),
  };
}

const initialClouds: Cloud[] = Array.from({ length: sceneCloudsAmount }, createCloud);

export const cloudsSlice: StateCreator<CloudSlice, [], [], CloudSlice> = (set, get) => ({
  clouds: initialClouds,
  removeCloud: (id: string) => set(store => ({ clouds: store.clouds.filter(cloud => cloud.id !== id) })),
  createCloud: () => set(store => ({ clouds: [...store.clouds, createCloud()] })),

  async scheduleRecreation(id: string) {
    get().removeCloud(id);
    await delay(getRandomNum({ min: 5000, max: 15000 }));
    get().createCloud();
  },
});
