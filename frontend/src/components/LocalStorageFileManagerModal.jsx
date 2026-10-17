import React, { useState, useEffect } from "react";
import { 
  X, 
  HardDrive, 
  Download, 
  Trash2, 
  Copy, 
  Check, 
  FileText, 
  ShieldCheck, 
  RefreshCw,
  FolderDown,
  Sparkles,
  ExternalLink
} from "lucide-react";
import { 
  getSavedLocalStorageFiles, 
  getLocalStorageFileContent, 
  downloadFile,
  clearSavedLocalStorageFiles 
} from "../utils/fileDownloader";

export default function LocalStorageFileManagerModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const [files, setFiles] = useState([]);
  const [copiedId, setCopiedId] = useState(null);
  const [downloadedId, setDownloadedId] = useState(null);
  const [selectedPreview, setSelectedPreview] = useState(null);

  const loadFiles = () => {
    const list = getSavedLocalStorageFiles();
    setFiles(list);
  };

  useEffect(() => {
    loadFiles();
  }, [isOpen]);

  const handleDownloadAgain = (file) => {
    const content = getLocalStorageFileContent(file.id);
    if (!content) return;

    const mime = file.filename.endsWith(".json") ? "application/json" : "text/plain";
    downloadFile(file.filename, content, mime);

    setDownloadedId(file.id);
    setTimeout(() => setDownloadedId(null), 2500);
  };

  const handleCopyContent = (file) => {
    const content = getLocalStorageFileContent(file.id);
    if (!content) return;

    navigator.clipboard.writeText(content);
    setCopiedId(file.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDeleteFile = (fileId) => {
    try {
      localStorage.removeItem(`eventroute_file_${fileId}`);
      const updated = files.filter(f => f.id !== fileId);
      localStorage.setItem("eventroute_downloaded_files_registry_v1", JSON.stringify(updated));
      setFiles(updated);
      if (selectedPreview?.id === fileId) setSelectedPreview(null);
    } catch (e) {
      console.warn("Failed to delete file from localStorage", e);
    }
  };

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to remove all cached local storage files?")) {
      clearSavedLocalStorageFiles();
      setFiles([]);
      setSelectedPreview(null);
    }
  };

  const handleViewPreview = (file) => {
    const content = getLocalStorageFileContent(file.id);
    setSelectedPreview({ ...file, content });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#10174D]/60 backdrop-blur-md">
      <div className="bg-white/95 backdrop-blur-xl border border-[#E2E7FA] rounded-3xl max-w-4xl w-full p-6 sm:p-7 text-[#10174D] shadow-2xl overflow-y-auto max-h-[92vh] space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#F0F3FD]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#DFE3FF] text-[#434EEB] flex items-center justify-center border border-[#C7D2FE]">
              <HardDrive className="w-5 h-5 text-[#5964FE]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-display font-bold text-lg sm:text-xl text-[#10174D]">
                  Local Storage File Registry
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#DFE3FF] text-[#434EEB]">
                  {files.length} Saved Offline
                </span>
              </div>
              <p className="text-xs text-[#525A8B]">
                Documents downloaded to disk and persisted inside browser localStorage for offline access.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {files.length > 0 && (
              <button
                onClick={handleClearAll}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-semibold border border-rose-200 transition cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-[#8E9BBF] hover:text-[#10174D] hover:bg-[#EEF2FE] transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        {files.length > 0 ? (
          <div className="space-y-4">
            
            {/* File List Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
              {files.map((f) => {
                const isDownloaded = downloadedId === f.id;
                const isCopied = copiedId === f.id;

                return (
                  <div 
                    key={f.id}
                    className="p-4 rounded-2xl bg-[#F8FAFF] border border-[#DCE3F9] hover:border-[#C7D2FE] transition flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white border border-[#DCE3F9] text-[#5964FE]">
                          {f.category.replace("_", " ")}
                        </span>
                        <span className="text-[10px] text-[#8E9BBF] font-mono">
                          {(f.sizeBytes / 1024).toFixed(1)} KB
                        </span>
                      </div>

                      <h4 className="font-display font-extrabold text-sm text-[#10174D] truncate" title={f.filename}>
                        {f.filename}
                      </h4>

                      <p className="text-[11px] text-[#525A8B] mt-0.5">
                        Saved: {new Date(f.savedAt).toLocaleDateString()} at {new Date(f.savedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>

                      {f.preview && (
                        <div className="mt-2 p-2 rounded-lg bg-white border border-[#E2E7FA] text-[10px] font-mono text-[#525A8B] truncate">
                          {f.preview}
                        </div>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#E2E7FA]/60 text-xs">
                      <button
                        type="button"
                        onClick={() => handleViewPreview(f)}
                        className="text-[#434EEB] hover:underline font-bold text-[11px] cursor-pointer"
                      >
                        Preview
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleCopyContent(f)}
                          className="p-1.5 rounded-lg bg-white hover:bg-[#EEF2FE] border border-[#DCE3F9] text-[#525A8B] transition cursor-pointer"
                          title="Copy file text"
                        >
                          {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDownloadAgain(f)}
                          className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-[#5964FE] to-[#7B73FE] text-white font-bold text-[11px] shadow-xs cursor-pointer active:scale-95"
                          title="Re-download to computer disk"
                        >
                          <Download className="w-3 h-3" />
                          <span>{isDownloaded ? "Downloaded!" : "Download"}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteFile(f.id)}
                          className="p-1.5 rounded-lg bg-white hover:bg-rose-50 border border-slate-200 text-rose-500 hover:text-rose-700 transition cursor-pointer"
                          title="Delete from localStorage"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Selected File Preview Modal Area */}
            {selectedPreview && (
              <div className="mt-4 p-4 rounded-2xl bg-white border border-[#C7D2FE] shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-xs text-[#10174D] flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-[#5964FE]" />
                    <span>Viewing: {selectedPreview.filename}</span>
                  </h5>
                  <button
                    onClick={() => setSelectedPreview(null)}
                    className="text-xs text-[#8E9BBF] hover:text-[#10174D]"
                  >
                    Close Preview
                  </button>
                </div>
                <pre className="p-3 rounded-xl bg-[#F8FAFF] border border-[#E2E7FA] text-[11px] font-mono text-[#10174D] max-h-56 overflow-y-auto whitespace-pre-wrap">
                  {selectedPreview.content}
                </pre>
              </div>
            )}

          </div>
        ) : (
          /* Empty State */
          <div className="p-10 rounded-2xl bg-[#F8FAFF] border border-[#DCE3F9] text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#DFE3FF] text-[#434EEB] flex items-center justify-center mx-auto">
              <FolderDown className="w-7 h-7 text-[#5964FE]" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-[#10174D]">No Local Storage Files Yet</h3>
              <p className="text-xs text-[#525A8B] max-w-sm mx-auto mt-1">
                When you click "Download File" on any OD Leave Letter, Team Roster, Shortlist, or Student Portfolio, the file will be saved directly to your local computer and mirrored here in browser storage.
              </p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-3 border-t border-[#F0F3FD] flex items-center justify-between text-xs text-[#525A8B]">
          <span className="flex items-center gap-1.5 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Files remain private on your device within browser localStorage</span>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#5964FE] text-white font-bold cursor-pointer hover:bg-[#434EEB] transition"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
