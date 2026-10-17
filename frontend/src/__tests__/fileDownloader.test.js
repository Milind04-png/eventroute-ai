import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock localStorage for Node test runner
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = String(value);
    }),
    removeItem: vi.fn((key) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    })
  };
})();

if (typeof globalThis.localStorage === "undefined" || !globalThis.localStorage.getItem) {
  globalThis.localStorage = localStorageMock;
}

import { 
  saveFileToLocalStorage, 
  getSavedLocalStorageFiles, 
  getLocalStorageFileContent, 
  clearSavedLocalStorageFiles,
  downloadFileAndSaveLocalStorage 
} from "../utils/fileDownloader";

describe("File Downloader & LocalStorage Persistence Engine", () => {

  beforeEach(() => {
    globalThis.localStorage.clear();
  });

  it("should persist file in localStorage and create registry record", () => {
    const filename = "DTC_OD_Letter_2024CS1001.txt";
    const content = "Official On-Duty Letter for Delhi Technical Campus Hackathon";
    const category = "od_letter";

    const record = saveFileToLocalStorage(filename, content, category);
    expect(record).toBeDefined();
    expect(record.filename).toBe(filename);
    expect(record.category).toBe(category);
    expect(record.sizeBytes).toBeGreaterThan(0);

    // Verify registry
    const files = getSavedLocalStorageFiles();
    expect(files.length).toBe(1);
    expect(files[0].filename).toBe(filename);

    // Verify stored content
    const savedContent = getLocalStorageFileContent(record.id);
    expect(savedContent).toBe(content);
  });

  it("should support JSON object payloads and serialize correctly", () => {
    const filename = "dtc_team_roster.json";
    const payload = {
      team: "NeuralRoute DTC",
      members: ["Milind", "Arman Chauhan", "Anshika Tyagi", "Dimple"]
    };

    const record = saveFileToLocalStorage(filename, payload, "team_roster");
    expect(record).toBeDefined();

    const savedContent = getLocalStorageFileContent(record.id);
    const parsed = JSON.parse(savedContent);
    expect(parsed.team).toBe("NeuralRoute DTC");
    expect(parsed.members.length).toBe(4);
    expect(parsed.members).toContain("Arman Chauhan");
  });

  it("should clear all cached local storage files upon clear request", () => {
    saveFileToLocalStorage("file1.txt", "data 1", "general");
    saveFileToLocalStorage("file2.txt", "data 2", "general");
    expect(getSavedLocalStorageFiles().length).toBe(2);

    clearSavedLocalStorageFiles();
    expect(getSavedLocalStorageFiles().length).toBe(0);
  });

  it("should safely execute download and persistence without throwing", () => {
    // Mock document
    if (typeof globalThis.document === "undefined") {
      globalThis.document = {
        createElement: vi.fn(() => ({
          href: "",
          download: "",
          click: vi.fn()
        })),
        body: {
          appendChild: vi.fn(),
          removeChild: vi.fn()
        }
      };
    }

    if (typeof globalThis.URL === "undefined" || !globalThis.URL.createObjectURL) {
      globalThis.URL = {
        createObjectURL: vi.fn(() => "blob:mock-url"),
        revokeObjectURL: vi.fn()
      };
    }

    const { downloaded, record } = downloadFileAndSaveLocalStorage("shortlist.json", { test: true }, "application/json", "shortlist");
    expect(downloaded).toBe(true);
    expect(record).toBeDefined();
    expect(record.filename).toBe("shortlist.json");
  });

});
