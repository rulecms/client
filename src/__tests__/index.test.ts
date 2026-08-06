import { describe, expect, test } from "vitest";
import {
  add,
  getConfigurationByKey,
  initialize,
  subtract,
} from "../index";

describe("package index exports", () => {
  test("re-exports public API", () => {
    expect(typeof add).toBe("function");
    expect(typeof subtract).toBe("function");
    expect(typeof getConfigurationByKey).toBe("function");
    expect(typeof initialize).toBe("function");
  });
});
