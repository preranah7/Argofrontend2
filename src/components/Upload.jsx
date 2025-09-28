// src/components/UploadContent.jsx 
import React, { useState, useRef, useEffect, useMemo } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import {
  HiOutlineCollection,
  HiOutlineCloudUpload,
  HiOutlineDocumentText,
  HiOutlineChartSquareBar,
  HiOutlineTerminal,
  HiCheckCircle,
  HiExclamationCircle,
  HiOutlineInformationCircle,
} from "react-icons/hi";

export default function UploadContent() {
  const [activeTab, setActiveTab] = useState("jobs");
  const [dragActive, setDragActive] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [jobs, setJobs] = useState([]);
  const [logs, setLogs] = useState([]);
  const [cfSummary, setCfSummary] = useState(null);
  const [qcSummary, setQcSummary] = useState(null);
  const [ragStatus, setRagStatus] = useState("idle");

  const inputRef = useRef(null);

  const ACCEPT_EXT = [".nc", ".csv"];
  const MAX_FILES = 20;
  const MAX_SIZE_MB = 250;

  useEffect(() => {
    setJobs([
      { id: "job-1", name: "argo_profiles_2024_q1.nc", type: "netcdf", status: "Completed", time: "09:35" },
      { id: "job-2", name: "profiles_subset.csv", type: "csv", status: "Queued", time: "09:41" },
    ]);
    setLogs((prev) => [
      ...prev,
      "[09:35] System: Pipeline initialized",
      "[09:36] QC: Flagged 12 profiles for salinity spike",
      "[09:41] Upload: profiles_subset.csv queued",
    ]);
  }, []);

  const counts = useMemo(
    () => ({ jobs: jobs.length, metrics: 4, logs: logs.length }),
    [jobs, logs]
  );

  const openFileDialog = () => inputRef.current?.click();

  const handleDragOver = (e) => { e.preventDefault(); e.stopPropagation(); if (!dragActive) setDragActive(true); };
  const handleDragLeave = (e) => { e.preventDefault(); e.stopPropagation(); if (e.currentTarget.contains(e.relatedTarget)) return; setDragActive(false); };
  const handleDrop = async (e) => { e.preventDefault(); e.stopPropagation(); setDragActive(false); const files = Array.from(e.dataTransfer.files || []); if (files.length) await processFiles(files); };
  const handleFilePick = async (e) => { const files = Array.from(e.target.files || []); if (files.length) await processFiles(files); };

  const validateFiles = (files) => {
    if (files.length > MAX_FILES) { toast.error(`Select up to ${MAX_FILES} files`); return []; }
    const valid = [];
    for (const f of files) {
      const ext = `.${f.name.split(".").pop().toLowerCase()}`;
      const sizeOk = f.size <= MAX_SIZE_MB * 1024 * 1024;
      const typeOk = [".nc", ".csv"].includes(ext);
      if (!typeOk) { toast.error(`Unsupported type: ${ext}`); continue; }
      if (!sizeOk) { toast.error(`File too large: ${f.name} > ${MAX_SIZE_MB}MB`); continue; }
      valid.push(f);
    }
    return valid;
  };

  const processFiles = async (files) => {
    const valid = validateFiles(files);
    if (!valid.length) return;
    setSelectedFiles(valid);
    if (valid.length === 1) toast.success(`Selected: ${valid[0].name}`, { icon: "📎" });
    else {
      const preview = valid.slice(0, 3).map((f) => f.name).join(", ");
      const extra = valid.length > 3 ? ` +${valid.length - 3} more` : "";
      toast.success(`Selected ${valid.length} files: ${preview}${extra}`, { icon: "📎" });
    }
    await uploadFiles(valid);
  };

  const uploadFiles = async (files) => {
    if (!files.length) return;
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));
    const ext = files[0].name.split(".").pop().toLowerCase();
    const typeoffile = ext === "nc" ? "netcdf" : ext;
    formData.append("typeoffile", typeoffile);

    setUploading(true);
    try {
      const { data } = await axios.post("http://localhost:8000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Upload successful");
      const now = new Date();
      const time = now.toTimeString().slice(0, 5);
      const newJobs = files.map((f, idx) => ({
        id: `${now.getTime()}-${idx}`,
        name: f.name,
        type: f.name.split(".").pop().toLowerCase() === "nc" ? "netcdf" : f.name.split(".").pop().toLowerCase(),
        status: "Uploaded",
        time,
      }));
      setJobs((prev) => [...newJobs, ...prev]);
      setLogs((prev) => [...prev, `[${time}] Upload: ${files.length} file(s) accepted by server`]);

      simulateAnalysis(files);
      setActiveTab("jobs");
    } catch (err) {
      console.error("Upload failed", err);
      toast.error("Upload failed");
      const time = new Date().toTimeString().slice(0, 5);
      setLogs((prev) => [...prev, `[${time}] Error: Upload failed`]);
      setRagStatus("error");
      setActiveTab("logs");
    } finally {
      setUploading(false);
    }
  };

  const simulateAnalysis = () => {
    const now = new Date().toTimeString().slice(0, 5);
    setTimeout(() => {
      setCfSummary({
        status: "pass",
        global: [
          { key: "title", value: "Argo float profiles (demo)" },
          { key: "Conventions", value: "CF-1.8" },
          { key: "institution", value: "Demo Institute" },
        ],
        variables: [
          { name: "TEMP", standard_name: "sea_water_temperature", units: "degree_Celsius", coords: "TIME DEPTH LATITUDE LONGITUDE" },
          { name: "PSAL", standard_name: "sea_water_practical_salinity", units: "1e-3", coords: "TIME DEPTH LATITUDE LONGITUDE" },
        ],
      });
      setLogs((prev) => [...prev, `[${now}] CF check: Conforms to CF-1.8 (demo)`]);
    }, 600);
    setTimeout(() => {
      setQcSummary({
        TEMP: { 1: 120, 2: 8, 3: 2, 4: 0, 9: 1 },
        PSAL: { 1: 118, 2: 10, 3: 3, 4: 0, 9: 0 },
      });
      setLogs((prev) => [...prev, `[${now}] QC summary ready: TEMP/PSAL flags computed (demo)`]);
    }, 1100);
    setTimeout(() => {
      setRagStatus("embedding");
      setLogs((prev) => [...prev, `[${now}] RAG: Embedding metadata for retrieval (demo)`]);
    }, 1400);
    setTimeout(() => {
      setRagStatus("indexed");
      setLogs((prev) => [...prev, `[${now}] RAG: Indexed successfully (demo)`]);
    }, 2400);
  };

  const clearSelection = () => setSelectedFiles([]);

  return (
    // RESPONSIVE: Enhanced container with proper scaling
    <main className="mx-auto w-full max-w-full sm:max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl 
                     px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 pb-16 sm:pb-20 md:pb-24 
                     min-h-screen bg-black text-white overflow-hidden">
      
      {/* RESPONSIVE: Header */}
      <header className="mb-4 sm:mb-6 md:mb-8">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-lg bg-neutral-900 
                         border border-white/10 grid place-items-center">
            <HiOutlineCollection className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-cyan-400" />
          </div>
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight">
              Data Pipeline
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-gray-400">
              NetCDF processing, QC, and indexing
            </p>
          </div>
        </div>
      </header>

      {/* RESPONSIVE: Upload section */}
      <section
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        className={`border border-white/10 bg-neutral-950 ${dragActive ? "ring-2 ring-cyan-400/40" : ""} 
                   rounded-lg p-4 sm:p-6 md:p-8 lg:p-10 mb-4 sm:mb-6 transition-all duration-300`}
      >
        <div className="flex flex-col items-center text-center gap-2 sm:gap-3 md:gap-4">
          <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 lg:h-18 lg:w-18 
                         rounded-lg bg-neutral-900 border border-white/10 grid place-items-center">
            <HiOutlineCloudUpload className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-9 lg:h-9 text-cyan-400" />
          </div>
          
          <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold">
            Drag and drop files here
          </h2>
          
          <p className="text-xs sm:text-sm md:text-base text-gray-400">
            or click to browse .nc or .csv files
          </p>

          <div className="mt-1 text-[10px] sm:text-[11px] md:text-xs lg:text-sm text-gray-500">
            Accepts .nc, .csv • Up to 20 files • ≤ 250MB each
          </div>

          <div className="mt-2 sm:mt-3 flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
            <button
              onClick={openFileDialog}
              className="px-3 sm:px-4 md:px-5 lg:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl 
                        bg-cyan-600 hover:bg-cyan-500 transition-colors text-xs sm:text-sm md:text-base
                        font-medium min-w-[120px]"
              aria-label="Browse files"
            >
              Browse files
            </button>
            
            {selectedFiles.length > 0 && (
              <button
                onClick={clearSelection}
                className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-neutral-800 
                          hover:bg-neutral-700 border border-white/10 text-xs sm:text-sm text-gray-200
                          transition-colors"
              >
                Clear selection
              </button>
            )}
          </div>

          <input
            ref={inputRef}
            type="file"
            accept=".nc,.csv"
            multiple
            className="hidden"
            onChange={handleFilePick}
          />

          {selectedFiles.length > 0 && (
            <div className="mt-3 sm:mt-4 w-full max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl">
              <div className="text-left text-xs sm:text-sm text-gray-300 mb-2">Selected</div>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {selectedFiles.slice(0, 8).map((f) => (
                  <span
                    key={f.name}
                    className="text-[10px] sm:text-[11px] md:text-xs px-1.5 sm:px-2 py-1 rounded-md 
                              bg-neutral-800 text-gray-200 border border-white/10 max-w-[150px] sm:max-w-[200px] 
                              truncate inline-block"
                    title={`${f.name} • ${(f.size / (1024 * 1024)).toFixed(1)}MB`}
                  >
                    {f.name}
                  </span>
                ))}
                {selectedFiles.length > 8 && (
                  <span className="text-[10px] sm:text-[11px] md:text-xs px-1.5 sm:px-2 py-1 rounded-md 
                                  bg-neutral-800 text-gray-400 border border-white/10">
                    +{selectedFiles.length - 8} more
                  </span>
                )}
              </div>
            </div>
          )}

          <div className="mt-3 sm:mt-4 h-4 sm:h-5 flex items-center" aria-live="polite">
            {uploading ? (
              <span className="text-xs sm:text-sm text-gray-400 flex items-center gap-2">
                <svg className="h-3 w-3 sm:h-4 sm:w-4 animate-spin text-cyan-400" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v3a5 5 0 00-5 5H4z"></path>
                </svg>
                Uploading…
              </span>
            ) : selectedFiles.length > 0 ? (
              <span className="text-[10px] sm:text-xs text-gray-400 flex items-center gap-1">
                <HiCheckCircle className="text-emerald-400 w-3 h-3 sm:w-4 sm:h-4" />
                Ready to upload {selectedFiles.length} file(s)
              </span>
            ) : null}
          </div>
        </div>
      </section>

      {/* RESPONSIVE: Analysis cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 lg:gap-6 
                         mb-4 sm:mb-6">
        <FlatCard title="CF/Argo Conformance" status={cfSummary?.status || "pending"}>
          {cfSummary ? (
            <div className="grid grid-cols-1 gap-2 sm:gap-3">
              <div>
                <div className="text-[10px] sm:text-xs text-gray-400 mb-1">Global attributes</div>
                <ul className="text-[10px] sm:text-xs text-gray-200 space-y-0.5 sm:space-y-1">
                  {cfSummary.global.map((g) => (
                    <li key={g.key} className="break-words">
                      <span className="text-gray-400">{g.key}:</span> {g.value}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="text-[10px] sm:text-xs text-gray-400 mb-1">Key variables</div>
                <ul className="text-[10px] sm:text-xs text-gray-200 space-y-0.5 sm:space-y-1">
                  {cfSummary.variables.map((v) => (
                    <li key={v.name} className="break-words">
                      <span className="text-gray-400">{v.name}</span> • {v.standard_name} • {v.units} • {v.coords}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="text-[10px] sm:text-xs text-gray-400">Awaiting files or analysis…</div>
          )}
        </FlatCard>

        <FlatCard title="QC Flags (TEMP/PSAL)" status={qcSummary ? "pass" : "pending"}>
          {qcSummary ? (
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <QcTable title="TEMP" flags={qcSummary.TEMP} />
              <QcTable title="PSAL" flags={qcSummary.PSAL} />
            </div>
          ) : (
            <div className="text-[10px] sm:text-xs text-gray-400">Awaiting files or analysis…</div>
          )}
        </FlatCard>

        <FlatCard title="RAG Indexing" status={ragStatus === "indexed" ? "pass" : ragStatus === "embedding" ? "warn" : ragStatus === "error" ? "fail" : "pending"}>
          <div className="text-[10px] sm:text-xs text-gray-300">
            {ragStatus === "indexed" && "Metadata embedded and indexed for retrieval."}
            {ragStatus === "embedding" && "Embedding metadata…"}
            {ragStatus === "error" && "Indexing failed. See System Logs."}
            {ragStatus === "idle" && "Awaiting upload."}
          </div>
        </FlatCard>
      </section>

      {/* RESPONSIVE: Tabs section */}
      <section className="border border-white/10 rounded-lg overflow-hidden">
        <div className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-6 pt-2 sm:pt-3 
                        border-b border-white/10 bg-neutral-950 overflow-x-auto">
          <TabButton
            icon={<HiOutlineDocumentText className="w-3 h-3 sm:w-4 sm:h-4" />}
            active={activeTab === "jobs"}
            label="Processing Jobs"
            count={counts.jobs}
            onClick={() => setActiveTab("jobs")}
          />
          <TabButton
            icon={<HiOutlineChartSquareBar className="w-3 h-3 sm:w-4 sm:h-4" />}
            active={activeTab === "metrics"}
            label="Quality Metrics"
            count={counts.metrics}
            onClick={() => setActiveTab("metrics")}
          />
          <TabButton
            icon={<HiOutlineTerminal className="w-3 h-3 sm:w-4 sm:h-4" />}
            active={activeTab === "logs"}
            label="System Logs"
            count={counts.logs}
            onClick={() => setActiveTab("logs")}
          />
        </div>

        <div className="p-3 sm:p-4 md:p-6 bg-neutral-950">
          {activeTab === "jobs" && <JobsPanel jobs={jobs} />}
          {activeTab === "metrics" && <MetricsPanel cfSummary={cfSummary} qcSummary={qcSummary} />}
          {activeTab === "logs" && <LogsPanel logs={logs} />}
        </div>
      </section>

      {/* Bottom spacer */}
      <div className="h-6 sm:h-8" />
    </main>
  );
}

/* RESPONSIVE: Flat helpers */
function FlatCard({ title, status, children }) {
  return (
    <div className="border border-white/10 rounded-lg p-3 sm:p-4 md:p-5 bg-neutral-950 min-h-[120px]">
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <HiOutlineInformationCircle className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 flex-shrink-0" />
          <h3 className="text-xs sm:text-sm md:text-base font-semibold text-white leading-tight">
            {title}
          </h3>
        </div>
        <StatusPill status={status} map={{ pass: "emerald", warn: "yellow", fail: "rose", pending: "gray" }} />
      </div>
      {children}
    </div>
  );
}

function StatusPill({ status = "pending", map = {} }) {
  const color = map[status] || "gray";
  const label = status === "pass" ? "Pass" : status === "warn" ? "Check" : status === "fail" ? "Fail" : "Pending";
  return (
    <span
      className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md text-[9px] sm:text-[10px] font-medium flex-shrink-0 ${
        color === "emerald"
          ? "bg-emerald-500/15 text-emerald-300"
          : color === "yellow"
          ? "bg-yellow-500/15 text-yellow-300"
          : color === "rose"
          ? "bg-rose-500/15 text-rose-300"
          : "bg-white/10 text-gray-300"
      }`}
    >
      {label}
    </span>
  );
}

function TabButton({ icon, label, active, onClick, count }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md 
                 text-[10px] sm:text-xs md:text-sm transition-colors whitespace-nowrap flex-shrink-0
        ${active 
          ? "bg-neutral-800 text-white border border-white/10" 
          : "text-gray-300 bg-neutral-700 hover:text-white hover:bg-neutral-900"}`}
      aria-pressed={active}
    >
      <span className="[&>svg]:block text-cyan-400 flex-shrink-0">{icon}</span>
      <span className="hidden sm:inline">{label}</span>
      <span className="sm:hidden">{label.split(' ')[0]}</span>
      <span className={`ml-0.5 sm:ml-1 inline-flex items-center justify-center min-w-[1rem] sm:min-w-[1.25rem] 
                      h-4 sm:h-5 px-1 rounded-md text-[9px] sm:text-[10px] flex-shrink-0
        ${active ? "bg-white/10 text-white" : "bg-white/5 text-gray-300"}`}>
        {count}
      </span>
    </button>
  );
}

function JobsPanel({ jobs }) {
  if (!jobs?.length)
    return (
      <div className="flex items-center gap-2 text-gray-400 text-xs sm:text-sm">
        <HiExclamationCircle className="text-gray-500 flex-shrink-0" />
        No jobs yet. Upload files to start processing.
      </div>
    );
  return (
    <div className="overflow-x-auto thin-scroll">
      <table className="w-full text-xs sm:text-sm min-w-[500px]">
        <thead>
          <tr className="text-left text-gray-400">
            <th className="py-1.5 sm:py-2 pr-2 sm:pr-4 font-medium">File</th>
            <th className="py-1.5 sm:py-2 pr-2 sm:pr-4 font-medium">Type</th>
            <th className="py-1.5 sm:py-2 pr-2 sm:pr-4 font-medium">Status</th>
            <th className="py-1.5 sm:py-2 pr-2 sm:pr-4 font-medium">Time</th>
          </tr>
        </thead>
        <tbody className="align-top">
          {jobs.map((j) => (
            <tr key={j.id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
              <td className="py-1.5 sm:py-2 pr-2 sm:pr-4 text-white max-w-[200px] sm:max-w-[26rem] 
                            truncate" title={j.name}>
                {j.name}
              </td>
              <td className="py-1.5 sm:py-2 pr-2 sm:pr-4 text-gray-300 uppercase">{j.type}</td>
              <td className="py-1.5 sm:py-2 pr-2 sm:pr-4">
                <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md text-[10px] sm:text-xs ${
                  j.status === "Completed" ? "bg-emerald-500/15 text-emerald-300"
                  : j.status === "Uploaded" ? "bg-cyan-500/15 text-cyan-300"
                  : "bg-yellow-500/15 text-yellow-300"
                }`}>
                  {j.status}
                </span>
              </td>
              <td className="py-1.5 sm:py-2 pr-2 sm:pr-4 text-gray-300">{j.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MetricsPanel({ cfSummary, qcSummary }) {
  const cards = [
    { label: "Files processed", value: 24 },
    { label: "QC passed", value: qcSummary ? "≈90%" : "—" },
    { label: "Variables detected", value: cfSummary ? cfSummary.variables.length : 0 },
    { label: "CF status", value: cfSummary ? (cfSummary.status === "pass" ? "Pass" : "Check") : "—" },
  ];
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
      {cards.map((c) => (
        <div key={c.label} className="rounded-md border border-white/10 p-2 sm:p-3 md:p-4 bg-neutral-950">
          <div className="text-[10px] sm:text-[11px] md:text-xs text-gray-400 leading-tight">{c.label}</div>
          <div className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-white mt-0.5 sm:mt-1">
            {c.value}
          </div>
        </div>
      ))}
    </div>
  );
}

function QcTable({ title, flags }) {
  const order = [1, 2, 3, 4, 9];
  return (
    <div>
      <div className="text-[10px] sm:text-xs text-gray-300 mb-1 sm:mb-2">{title}</div>
      <div className="grid grid-cols-5 gap-0.5 sm:gap-1">
        {order.map((k) => (
          <div key={k} className="rounded-md border border-white/10 p-1 sm:p-2 text-center 
                                 text-[9px] sm:text-[10px] md:text-[11px] text-gray-300 bg-neutral-950" 
               title={`QC ${k}`}>
            <div className="text-gray-400 leading-tight">QC {k}</div>
            <div className="text-white font-semibold leading-tight">{flags?.[k] ?? 0}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function LogsPanel({ logs }) {
  return (
    <div className="h-40 sm:h-48 md:h-56 lg:h-64 rounded-md border border-white/10 p-2 sm:p-3 
                   overflow-auto thin-scroll text-[10px] sm:text-xs text-gray-300 bg-neutral-950">
      {logs?.length ? (
        logs.map((line, i) => (
          <div key={`${line}-${i}`} className="whitespace-pre-wrap break-words leading-relaxed mb-0.5">
            {line}
          </div>
        ))
      ) : (
        <div>No logs yet.</div>
      )}
    </div>
  );
}
