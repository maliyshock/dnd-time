import { getRandomNum } from "~/utils/getRandomNum.ts";
import { StateCreator } from "zustand";
import { delay } from "~/utils/delay.ts";
import { TimeSlice } from "~/store/slices/timeSlice.ts";
import useStore from "~/store/useStore.ts";

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
    id: globalThis.crypto.randomUUID(),
  };
}

const initialClouds: Cloud[] = Array.from({ length: sceneCloudsAmount }, createCloud);

export const cloudsSlice: StateCreator<CloudSlice & TimeSlice, [], [], CloudSlice> = (set, get) => ({
  clouds: initialClouds,
  removeCloud: (id: string) => set(store => ({ clouds: store.clouds.filter(cloud => cloud.id !== id) })),
  createCloud: () => set(store => ({ clouds: [...store.clouds, createCloud()] })),

  async scheduleRecreation(id: string) {
    const { removeCloud, createCloud } = get();

    removeCloud(id);
    await delay(getRandomNum({ min: 5000, max: 15000 }));

    const waitForPlay = () =>
      new Promise<void>(resolve => {
        if (get().play) {
          resolve();

          return;
        }

        const unsubscribe = useStore.subscribe((state, prevState) => {
          if (state.play !== prevState.play && state.play) {
            unsubscribe();
            resolve();
          }
        });
      });

    // it will wait for play being true again to create a new cloud
    await waitForPlay();
    createCloud();
  },
});
