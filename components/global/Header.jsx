"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMenu } from "react-icons/io5";
import { GoArrowUpRight } from "react-icons/go";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const menuItems = ["Skills", "Services", "Projects", "Contact"];

  const menuVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const menuItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.5 } },
  };

  return (
    <>
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex justify-between items-center h-[80px] w-full fixed top-0 z-[100] px-6 md:px-20 text-white"
      >
        <div
          className={`absolute inset-0 transition-all duration-300 ${
            isScrolled ? "bg-background/50 backdrop-blur-lg" : "bg-transparent"
          }`}
        ></div>
        <div className="relative z-10">
          <h2 className="font-bold text-lg tracking-wider">TAIBI HAKIM</h2>
        </div>
        <nav className="relative z-10">
          <ul className="gap-12 hidden lg:flex uppercase text-sm font-semibold">
            {menuItems.map((item) => (
              <li key={item} className="relative group">
                <a href={`#${item.toLowerCase()}`}>{item}</a>
                <span className="absolute bottom-[-4px] left-0 w-0 h-0.5 bg-main transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}
          </ul>
        </nav>
        <div className="relative z-10 text-2xl lg:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                  <GoArrowUpRight />
                </motion.div>
              ) : (
                <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                  <IoMenu />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at 100% 0)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-background z-[99] flex items-center justify-center"
          >
            <motion.ul
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-8 text-center"
            >
              {menuItems.map((item) => (
                <motion.li key={item} variants={menuItemVariants}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-4xl font-bold text-gray-300 hover:text-main transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
