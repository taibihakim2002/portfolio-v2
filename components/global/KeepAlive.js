"use client";

import { useEffect } from "react";

export default function KeepAlive() {
  useEffect(() => {
    const PING_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/ping`; // غيّره برابط الباكند

    const ping = () => {
      fetch(PING_URL)
        .then((res) => console.log(`[PING] ✅ ${new Date().toLocaleTimeString()} - Status: ${res.status}`))
        .catch((err) => console.error("[PING ERROR]", err.message));
    };

    // أرسل أول Ping فورًا
    ping();

    // أرسل ping كل 10 دقائق
    const interval = setInterval(ping, 10 * 60 * 1000);

    return () => clearInterval(interval); // تنظيف عند إزالة الكومبوننت
  }, []);

  return null; // لا يعرض شيء على الواجهة
}
