// src/hooks/useSpeechDictation.js
import { useRef, useState, useEffect, useCallback } from "react";

export default function useSpeechDictation({
  lang = "en-US",
  continuous = false,
  onAutoCommit,
} = {}) {
  const recognitionRef = useRef(null);
  const committedRef = useRef(""); // persistent committed text
  const interimRef = useRef("");   // current interim
  const endResolveRef = useRef(null);
  const autoMergedRef = useRef("");
  const [autoTick, setAutoTick] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [, setTick] = useState(0);

  const supportsSpeech =
    typeof window !== "undefined" &&
    (window.SpeechRecognition || window.webkitSpeechRecognition);

  const refresh = () => setTick((x) => x + 1);

  const cleanupRecognition = () => {
    const rec = recognitionRef.current;
    if (rec) {
      try {
        rec.onstart = null;
        rec.onresult = null;
        rec.onerror = null;
        rec.onend = null;
      } catch {}
    }
    recognitionRef.current = null;
  };

  const start = useCallback(() => {
    if (!supportsSpeech) return { ok: false, reason: "unsupported" };
    try {
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recog = new SR();
      recognitionRef.current = recog;

      recog.lang = lang;
      recog.interimResults = true;
      recog.continuous = continuous;

      // don’t wipe committed text on start → allows dictation to add to existing input
      interimRef.current = "";
      refresh();

      recog.onstart = () => setIsRecording(true);

      recog.onresult = (e) => {
        let finalChunk = "";
        let interimChunk = "";
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const alt = e.results[i][0];
          const t = (alt && alt.transcript ? alt.transcript : "").trim();
          if (!t) continue;
          if (e.results[i].isFinal) {
            finalChunk += (finalChunk ? " " : "") + t;
          } else {
            interimChunk += (interimChunk ? " " : "") + t;
          }
        }
        if (finalChunk) {
          committedRef.current = [committedRef.current, finalChunk]
            .filter(Boolean)
            .join(" ");
        }
        interimRef.current = interimChunk;
        refresh();
      };

      recog.onerror = () => {
        try { recog.stop(); } catch {}
      };

      recog.onend = () => {
        setIsRecording(false);

        const merged = [committedRef.current, interimRef.current]
          .filter(Boolean)
          .join(" ")
          .trim();

        // always persist merged into committedRef
        committedRef.current = merged;
        interimRef.current = "";

        if (endResolveRef.current) {
          const resolve = endResolveRef.current;
          endResolveRef.current = null;
          resolve(merged);
        } else if (merged) {
          if (typeof onAutoCommit === "function") {
            onAutoCommit(merged);
          } else {
            autoMergedRef.current = merged;
            setAutoTick((t) => t + 1);
          }
        }

        refresh();
        cleanupRecognition();
      };

      recog.start();
      return { ok: true };
    } catch {
      setIsRecording(false);
      cleanupRecognition();
      return { ok: false, reason: "start-failed" };
    }
  }, [supportsSpeech, lang, continuous, onAutoCommit]);

  const stop = useCallback(() => {
    try {
      if (recognitionRef.current) recognitionRef.current.stop();
    } catch {}
  }, []);

  const stopAndFlush = useCallback(() => {
    return new Promise((resolve) => {
      endResolveRef.current = resolve;
      try {
        if (recognitionRef.current) recognitionRef.current.stop();
      } catch {
        const merged = [committedRef.current, interimRef.current]
          .filter(Boolean)
          .join(" ")
          .trim();
        committedRef.current = merged; // keep text
        interimRef.current = "";
        endResolveRef.current = null;
        resolve(merged);
        refresh();
      }
    });
  }, []);

  const flush = useCallback(() => {
    const text = (committedRef.current || "").trim();
    committedRef.current = "";
    interimRef.current = "";
    refresh();
    return text;
  }, []);

  const consumeAutoMerged = useCallback(() => {
    const m = autoMergedRef.current || "";
    autoMergedRef.current = "";
    setAutoTick((t) => t + 1);
    return m;
  }, []);

  useEffect(() => {
    return () => {
      try {
        if (recognitionRef.current && recognitionRef.current.abort) {
          recognitionRef.current.abort();
        }
      } catch {}
      cleanupRecognition();
    };
  }, []);

  return {
    isRecording,
    supportsSpeech,
    start,
    stop,
    stopAndFlush,
    flush,
    liveInterim: interimRef.current,
    liveCommitted: committedRef.current, // ← stays after mic stops
    autoMerged: autoMergedRef.current,
    consumeAutoMerged,
  };
}
