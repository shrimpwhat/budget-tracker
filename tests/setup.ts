import "fake-indexeddb/auto";
import { vi, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import db from "../src/store/db"

const localStorageMock = vi.fn().mockImplementation(() => {
  const store: Record<string, string> = {};
  return {
    getItem: (key: string) => (key in store ? store[key] : null),
    setItem: (key: string, value: string) => (store[key] = value),
  };
});

vi.stubGlobal("window.localStorage", localStorageMock);

afterEach(async () => {
  cleanup();
  const tx = (await db).transaction('transactions', 'readwrite')
  const keys = await tx.store.getAllKeys()
  keys.forEach(key => tx.store.delete(key))
  await tx.done
});
