"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMenu, IoClose } from "react-icons/io5";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("");

  const menuItems = useMemo(
    () => [
      { label: "Skills", href: "#skills" },
      { label: "Services", href: "#services" },
      { label: "Projects", href: "#projects" },
      { label: "Contact", href: "#contact" },
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scrollspy (JS فقط)
  useEffect(() => {
    const sectionIds = menuItems.map((m) => m.href.replace("#", ""));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el) => el);

    const onScroll = () => {
      const y = window.scrollY + 120;
      let current = "";
      sections.forEach((sec) => {
        if (y >= sec.offsetTop && y < sec.offsetTop + sec.offsetHeight) current = sec.id;
      });
      setActiveId(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [menuItems]);

  const menuVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const menuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.5 } },
  };

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="fixed top-0 inset-x-0 z-[100]"
        aria-label="Main navigation"
      >
        {/* خلفية زجاجية بعرض كامل الشاشة */}
        <div
          className={[
            "pointer-events-none absolute inset-x-0 top-0 h-[74px] -z-10 transition-all duration-300",
            isScrolled
              ? "bg-background/55 backdrop-blur-md border-b border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
              : "bg-transparent",
          ].join(" ")}
        />
        {/* طبقة تدرّج رقيقة على الأطراف (اختياري) */}

        {/* محتوى محدود العرض */}
        <div className="mx-auto max-w-7xl px-6 md:px-8 h-[74px] flex items-center justify-between relative">
          {/* Logo */}
          <a href="#" className="relative z-10 inline-flex items-center gap-2 group">
            <span className="grid place-items-center size-8 rounded-lg bg-main/20 text-main border border-main/30 transition group-hover:bg-main/30">
              <span className="text-[12px] font-black">TH</span>
            </span>
            <span className="font-extrabold tracking-wide">TAIBI HAKIM</span>
          </a>

          {/* Desktop Nav */}
          <nav className="relative z-10 hidden lg:flex items-center gap-10">
            <ul className="flex items-center gap-8 uppercase text-[13px] font-semibold">
              {menuItems.map((item) => {
                const isActive = activeId === item.href.replace("#", "");
                return (
                  <li key={item.href} className="relative">
                    <a
                      href={item.href}
                      className={[
                        "transition-colors",
                        isActive ? "text-white" : "text-white/75 hover:text-white",
                      ].join(" ")}
                    >
                      {item.label}
                    </a>
                    {/* underline بعرض النص فقط */}
                    <span
                      className={[
                        "absolute left-0 -bottom-1 h-0.5 bg-main transition-all duration-300",
                        isActive ? "w-full" : "w-0 group-hover:w-full",
                      ].join(" ")}
                    />
                  </li>
                );
              })}
            </ul>
            <a
              href="#contact"
              className="rounded-xl border border-white/15 bg-white/[0.04] px-4 py-2 text-sm font-semibold hover:border-main hover:shadow-[0_0_0_3px_rgba(234,179,8,0.15)] transition"
            >
              Let’s Talk
            </a>
          </nav>

          {/* Mobile toggle */}
          <div className="relative z-10 text-2xl lg:hidden">
            <button
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsMenuOpen((s) => !s)}
              className="rounded-lg border border-white/10 bg-white/5 p-2 backdrop-blur hover:bg-white/10 transition"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <IoClose />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <IoMenu />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[99] flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-[radial-gradient(50%_50%_at_80%_0%,rgba(234,179,8,0.12),transparent_60%),radial-gradient(60%_60%_at_20%_100%,rgba(99,102,241,0.12),transparent_60%)] bg-background" />
            <motion.ul
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              className="relative flex flex-col gap-8 text-center"
            >
              {menuItems.map((item) => {
                const isActive = activeId === item.href.replace("#", "");
                return (
                  <motion.li key={item.href} variants={menuItemVariants}>
                    <a
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={[
                        "text-4xl font-extrabold tracking-tight transition-colors",
                        isActive ? "text-main" : "text-gray-300 hover:text-white",
                      ].join(" ")}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                );
              })}
              <motion.li variants={menuItemVariants} className="pt-4">
                <a
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-lg font-semibold hover:border-main transition"
                >
                  Let’s Talk
                </a>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
