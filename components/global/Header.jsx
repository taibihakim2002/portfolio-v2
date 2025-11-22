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
      { label: "About", href: "#about" },
      { label: "Skills", href: "#skills" },
      { label: "Services", href: "#services" },
      { label: "Projects", href: "#projects" },
      { label: "Contact", href: "#contact" },
    ],
    []
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scrollspy
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
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 inset-x-0 z-[100]"
      >
        {/* خلفية زجاجية محسنة */}
        <div
          className={[
            "absolute inset-0 transition-all duration-500",
            isScrolled
              ? "bg-background/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/5"
              : "bg-transparent",
          ].join(" ")}
        />

        {/* ✨ المحتوى محكوم بـ max-w-6xl ليتطابق مع باقي الموقع */}
        <div className="relative mx-auto max-w-6xl px-4 md:px-6 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <a href="#" className="relative z-10 inline-flex items-center gap-2 group">
            <div className="grid place-items-center size-9 rounded-xl bg-primary/10 text-primary border border-primary/20 transition-colors group-hover:bg-primary group-hover:text-white">
              <span className="text-sm font-black">TH</span>
            </div>
            <span className="font-bold tracking-tight text-white">TAIBI HAKIM</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-6 text-sm font-medium text-zinc-400">
              {menuItems.map((item) => {
                const isActive = activeId === item.href.replace("#", "");
                return (
                  <li key={item.href} className="relative">
                    <a
                      href={item.href}
                      className={[
                        "transition-colors hover:text-white",
                        isActive ? "text-white" : "",
                      ].join(" ")}
                    >
                      {item.label}
                    </a>
                    {/* Active Indicator */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute left-0 -bottom-1 w-full h-0.5 bg-primary rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
            
            {/* CTA Button */}
            <a
              href="#contact"
              className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white text-sm font-bold hover:bg-white/10 hover:border-primary/50 transition-all"
            >
              Let’s Talk
            </a>
          </nav>

          {/* Mobile Menu Toggle */}
          <div className="relative z-10 lg:hidden">
            <button
              onClick={() => setIsMenuOpen((s) => !s)}
              className="p-2 text-2xl text-white focus:outline-none"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <IoClose />
                  </motion.span>
                ) : (
                  <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                    <IoMenu />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[99] flex flex-col items-center justify-center bg-background/95 backdrop-blur-2xl lg:hidden"
          >
            {/* Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

            <motion.ul
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              className="relative flex flex-col gap-6 text-center"
            >
              {menuItems.map((item) => {
                const isActive = activeId === item.href.replace("#", "");
                return (
                  <motion.li key={item.href} variants={menuItemVariants}>
                    <a
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={[
                        "text-4xl font-black tracking-tighter transition-colors",
                        isActive ? "text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent" : "text-zinc-400 hover:text-white",
                      ].join(" ")}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                );
              })}
              <motion.li variants={menuItemVariants} className="pt-8">
                <a
                  href="#contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex px-8 py-4 rounded-full bg-primary text-white font-bold text-lg shadow-lg shadow-primary/25"
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