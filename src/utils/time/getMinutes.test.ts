import { describe, expect, test } from "vitest";
import { getMinutes } from "~/utils/time/getMinutes.ts";
import { MINUTES_IN_DAY } from "~/constants.ts";

describe("getMinutes — side-by-side table comparison (without secondsToMinutes)", () => {
  test.each`
    secondsInput     | getMinutes(seconds) | getMinutes(seconds,MINUTES_IN_DAY) | expectedMinuteOfDay
    ${0}             | ${0}                | ${0}                               | ${0}
    ${59}            | ${0}                | ${0}                               | ${0}
    ${60}            | ${1}                | ${1}                               | ${1}
    ${61}            | ${1}                | ${1}                               | ${1}
    ${3599}          | ${59}               | ${59}                              | ${59}
    ${3600}          | ${60}               | ${60}                              | ${60}
    ${86399}         | ${1439}             | ${1439}                            | ${1439}
    ${86400}         | ${MINUTES_IN_DAY}   | ${0}                               | ${0}
    ${90061}         | ${1501}             | ${61}                              | ${61}
    ${-1}            | ${-1}               | ${-1}                              | ${-1}
    ${-60}           | ${-1}               | ${-1}                              | ${-1}
    ${-61}           | ${-2}               | ${-2}                              | ${-2}
    ${1_000_000_000} | ${16_666_666}       | ${16_666_666 % MINUTES_IN_DAY}     | ${16_666_666 % MINUTES_IN_DAY}
  `(
    // Keep a readable title; bracket notation is needed for non-identifier keys
    "$secondsInput sec → gm(no per)=$[getMinutes(seconds)] | gm(per)=$[getMinutes(seconds,MINUTES_IN_DAY)] | expected=$expectedMinuteOfDay",
    row => {
      // Extract row values; use bracket notation for non-identifier keys
      const {
        secondsInput,
        ["getMinutes(seconds)"]: expectedGetMinutesNoPer,
        ["getMinutes(seconds,MINUTES_IN_DAY)"]: expectedGetMinutesPer,
        expectedMinuteOfDay,
      } = row;

      // 1) Compute actual values
      const minutesNoPer = getMinutes(secondsInput);
      const minuteOfDay = getMinutes(secondsInput, MINUTES_IN_DAY);

      // 2) Compare against expected columns
      expect(minutesNoPer).toBe(expectedGetMinutesNoPer);
      expect(minuteOfDay).toBe(expectedGetMinutesPer);

      // 3) Invariants for clarity
      // minute-of-day must match the explicit expected column
      expect(minuteOfDay).toBe(expectedMinuteOfDay);
    },
  );
});

describe("Desired behavior after switching to positive modulo (documentation)", () => {
  // NOTE:
  // Current implementation uses JS % with negative dividends, producing negative remainders.
  // After switching to positive modulo in getMinutes(seconds, per),
  // rows for negative inputs should expect values in 0..per-1.
  test.skip("example: -1 sec should become 1439 with positive modulo", () => {
    expect(getMinutes(-1, MINUTES_IN_DAY)).toBe(1439);
  });
});
