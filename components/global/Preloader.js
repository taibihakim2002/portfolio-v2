// components/global/Preloader.js
"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

// خطوط/نصوص
const LINES = [
  "Loading Portfolio...",
  "Connecting to MongoDB...",
  "Compiling React components...",
  "Building Next.js routes...",
];

const STAGGER = 0.35;         // تأخير بين كل سطر
const BAR_DURATION = 0.9;     // مدة تعبئة الشريط
const TERMINAL_WIDTH = "max-w-lg"; // سهّل التحكم بحجم التيرمنال

export default function Preloader({ onSkip }) {
  const reduce = useReducedMotion();
  const [progress, setProgress] = useState(0);

  // المدة الإجمالية للسطور
  const linesDuration = useMemo(
    () => (reduce ? 0 : LINES.length * STAGGER),
    [reduce]
  );

  // تحديث نسبة التقدم لتُطابق حركة الشريط
  useEffect(() => {
    let raf;
    const start = performance.now();
    const total = (linesDuration + BAR_DURATION) * 1000;

    const loop = t => {
      const elapsed = t - start;
      const p = Math.min(1, elapsed / total);
      setProgress(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [linesDuration]);

  // حركات
  const containerVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduce
        ? { duration: 0.2 }
        : { staggerChildren: STAGGER, duration: 0.4 },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 6, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: reduce
        ? { duration: 0.15 }
        : { type: "spring", stiffness: 120, damping: 14 },
    },
  };

  // خلفية زخرفية (شبكة/غراديانت/ضوضاء)
  const Background = () => (
    <>
      {/* تدرّج */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_0%,rgba(120,119,198,0.25)_0%,rgba(0,0,0,0)_60%)]" />
      {/* شبكة */}
      <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:32px_32px] opacity-30" />
      {/* ضوضاء */}
      <div className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-25 [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2272%22 height=%2272%22 viewBox=%220 0 72 72%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%2272%22 height=%2272%22 filter=%22url(%23n)%22 opacity=%220.15%22/></svg>')]" />
    </>
  );

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
      key="preloader"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
      aria-label="Loading application"
      role="status"
    >
      <Background />

      {/* نافذة ترمينال زجاجية */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`relative w-[92%] ${TERMINAL_WIDTH} rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.35)] p-4 sm:p-6`}
      >
        {/* شريط علوي مع نقاط */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-full bg-red-500/70" />
            <span className="size-3 rounded-full bg-yellow-500/70" />
            <span className="size-3 rounded-full bg-green-500/70" />
            <span className="ml-3 text-xs text-white/60">Terminal</span>
          </div>

          {/* زر تخطي */}
          <button
            onClick={onSkip}
            className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-main/50 transition"
          >
            Skip
          </button>
        </div>

        {/* الأسطر */}
        <div
          dir="auto"
          className="font-mono text-[13px] sm:text-sm text-white/80"
          aria-live="polite"
        >
          {LINES.map((txt, i) => (
            <motion.div key={i} variants={lineVariants} className="mb-2">
              <span className="text-main mr-2">&gt;</span>
              <span className="align-middle">
                {txt}
                {/* مؤشر كتابة يظهر فقط على السطر الأخير أثناء التحميل */}
                {i === LINES.length - 1 && progress < 100 && (
                  <span className="ml-1 inline-block animate-pulse">▍</span>
                )}
              </span>
            </motion.div>
          ))}

          {/* شريط تحميل + نسبة */}
          <motion.div variants={lineVariants} className="mt-3">
            <div className="flex items-center justify-between text-xs text-white/60 mb-1">
              <span>Loading assets…</span>
              <span aria-label={`Progress ${progress}%`}>{progress}%</span>
            </div>

            <div className="w-full h-3 overflow-hidden rounded-full border border-white/10 bg-white/5">
              <motion.div
                className="h-full bg-main"
                initial={{ width: "0%" }}
                animate={{ width: reduce ? "100%" : "100%" }}
                transition={{
                  duration: BAR_DURATION,
                  delay: linesDuration,
                  ease: "linear",
                }}
                style={{
                  // شيمر خفيف داخل الشريط
                  backgroundImage:
                    "linear-gradient(90deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.0) 30%, rgba(255,255,255,0.15) 60%)",
                  backgroundSize: "200% 100%",
                  animation: reduce ? "none" : "shimmer 1.2s linear infinite",
                }}
              />
            </div>
          </motion.div>

          {/* رسالة ترحيب */}
          <motion.div
            className="mt-5 text-white"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: linesDuration + BAR_DURATION + (reduce ? 0 : 0.05) }}
          >
            <span className="text-main mr-2">&gt;</span>
            <span className="font-semibold">Welcome.</span>
          </motion.div>
        </div>

        {/* تزيين حواف */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/10" />
        <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-tr from-main/20 via-transparent to-white/10 opacity-60" />
      </motion.div>

      {/* keyframes للشيمر */}
      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </motion.div>
  );
}
