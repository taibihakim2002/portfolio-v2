// components/global/ClientLayoutWrapper.js
"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Preloader from "@/components/global/Preloader";
import { Toaster } from "@/components/ui/sonner";
import { motion } from "framer-motion";

export default function ClientLayoutWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // <-- مدة التحميل (2.5 ثانية)

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Preloader key="preloader" />
        ) : (
          // سنعرض المحتوى (children) فقط بعد انتهاء التحميل
          // لاحظ أننا أضفنا `motion.div` لإعطاء تأثير "دخول" للصفحة
          <motion.div
            key="page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ✨ نقلنا Toaster إلى هنا لأنه Client Component */}
      <Toaster 
        richColors 
        closeButton 
        style={{ zIndex: 9999 }}
      />
    </>
  );
}