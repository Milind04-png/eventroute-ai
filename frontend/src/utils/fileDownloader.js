/**
 * File Downloader & LocalStorage Persistence Utility for EventRoute AI
 * Handles browser file downloads to local disk and mirrored persistence in browser localStorage.
 */

const DOWNLOAD_REGISTRY_KEY = "eventroute_downloaded_files_registry_v1";

/**
 * Downloads content as a file to the user's local disk
 * @param {string} filename - e.g. "DTC_OD_Letter_2026.txt"
 * @param {string|object} content - String content or Object (will be formatted as JSON)
 * @param {string} mimeType - e.g. "text/plain", "application/json", "application/msword"
 */
export function downloadFile(filename, content, mimeType = "text/plain") {
  try {
    const textData = typeof content === "object" ? JSON.stringify(content, null, 2) : content;
    const blob = new Blob([textData], { type: `${mimeType};charset=utf-8` });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 150);

    return true;
  } catch (err) {
    console.error("Failed to download file:", err);
    return false;
  }
}

/**
 * Saves a file snapshot into localStorage and records it in the downloaded files registry
 * @param {string} filename
 * @param {string|object} content
 * @param {string} category - "od_letter" | "team_roster" | "shortlist" | "portfolio"
 */
export function saveFileToLocalStorage(filename, content, category = "general") {
  try {
    const stringified = typeof content === "object" ? JSON.stringify(content, null, 2) : content;
    const fileId = `file_${Date.now()}_${filename.replace(/[^a-zA-Z0-9]/g, "_")}`;

    // 1. Store the individual file body
    localStorage.setItem(`eventroute_file_${fileId}`, stringified);

    // 2. Append to registry index
    const existingRaw = localStorage.getItem(DOWNLOAD_REGISTRY_KEY);
    const registry = existingRaw ? JSON.parse(existingRaw) : [];

    const record = {
      id: fileId,
      filename,
      category,
      sizeBytes: new Blob([stringified]).size,
      savedAt: new Date().toISOString(),
      preview: stringified.slice(0, 180)
    };

    const updatedRegistry = [record, ...registry.filter(r => r.filename !== filename)].slice(0, 50);
    localStorage.setItem(DOWNLOAD_REGISTRY_KEY, JSON.stringify(updatedRegistry));

    return record;
  } catch (err) {
    console.warn("Failed to save file to localStorage:", err);
    return null;
  }
}

/**
 * Downloads a file to the user's machine AND saves an offline copy in localStorage
 * @param {string} filename
 * @param {string|object} content
 * @param {string} mimeType
 * @param {string} category
 */
export function downloadFileAndSaveLocalStorage(filename, content, mimeType = "text/plain", category = "general") {
  const downloaded = downloadFile(filename, content, mimeType);
  const record = saveFileToLocalStorage(filename, content, category);
  return { downloaded, record };
}

/**
 * Retrieves all files saved in localStorage
 */
export function getSavedLocalStorageFiles() {
  try {
    const raw = localStorage.getItem(DOWNLOAD_REGISTRY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/**
 * Retrieves specific file content from localStorage by ID
 */
export function getLocalStorageFileContent(fileId) {
  try {
    return localStorage.getItem(`eventroute_file_${fileId}`);
  } catch {
    return null;
  }
}

/**
 * Clears saved file registry from localStorage
 */
export function clearSavedLocalStorageFiles() {
  try {
    const files = getSavedLocalStorageFiles();
    files.forEach(f => localStorage.removeItem(`eventroute_file_${f.id}`));
    localStorage.removeItem(DOWNLOAD_REGISTRY_KEY);
    return true;
  } catch {
    return false;
  }
}
