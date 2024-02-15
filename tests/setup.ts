import "fake-indexeddb/auto";
import { vi, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

const localStorageMock = vi.fn(() => {
  const store: Record<string, string> = {};
  return {
    getItem: (key: string) => (key in store ? store[key] : null),
    setItem: (key: string, value: string) => (store[key] = value),
  };
});

vi.stubGlobal("window.localStorage", localStorageMock);

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});
