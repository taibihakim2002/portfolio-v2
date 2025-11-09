"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useAnimation, AnimatePresence, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { HiOutlineMail, HiArrowDown } from "react-icons/hi";
import { MdOutlinePhone } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci";
import { FaLinkedinIn, FaGithub } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io";
import { TiSocialFacebook } from "react-icons/ti";
import { IoMenu } from "react-icons/io5";
import { GoArrowRight, GoArrowUpRight, GoChevronLeft, GoChevronRight, GoX } from "react-icons/go";
import Header from "@/components/global/Header";
import Rights from "@/components/global/Rights";
import {
  FiPhone, FiMail, FiMapPin, FiGithub, FiLinkedin, FiTwitter,
  FiCopy, FiCheck, FiClock, FiDownload,
  FiArrowRight
} from "react-icons/fi";
// --- Dummy Project Data ---
const projects = [
  {
    img: "https://placehold.co/600x400/191919/eab308?text=Project+One",
    type: "Web Application",
    name: "E-commerce Platform",
    description: "A full-featured e-commerce platform with a modern UI.",
    tags: ["React", "Next.js", "TailwindCSS"],
    live: "#",
    source: "#",
  },
  {
    img: "https://placehold.co/600x400/191919/eab308?text=Project+Two",
    type: "Landing Page",
    name: "SaaS Website",
    description: "A responsive landing page for a software service.",
    tags: ["HTML", "CSS", "JavaScript"],
    live: "#",
    source: "#",
  },
  {
    img: "https://placehold.co/600x400/191919/eab308?text=Project+Three",
    type: "Portfolio",
    name: "Designer Portfolio",
    description: "A creative portfolio website for a graphic designer.",
    tags: ["React", "FramerMotion"],
    live: "#",
    source: "#",
  },
];

// ✨ --- 1. تم نقل بيانات الأيقونات هنا لتسهيل إعادة استخدامها ---
const socialLinks = [
    { href: "https://github.com/taibihakim2002", icon: <FaGithub size={20}/> },
    { href: "https://www.facebook.com/hakimtaibi2002/", icon: <TiSocialFacebook size={20}/> },
    { href: "https://www.instagram.com/taibihaakim", icon: <IoLogoInstagram size={20}/> },
    { href: "https://www.linkedin.com/in/taibi-hakim-54432b16b/", icon: <FaLinkedinIn size={20}/> }
];


// --- Placeholder UI Components ---
const Sheet = ({ children }) => <div>{children}</div>;
const SheetTrigger = ({ children }) => <div>{children}</div>;
const SheetContent = ({ children, className }) => <div className={className}>{children}</div>;
// ✨ Enhanced Progress Bar with animated fill effect
const Progress = ({ value }) => {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
    return (
        <div ref={ref} className="w-full bg-gray-700/50 rounded-full h-2.5 overflow-hidden">
            <motion.div
                className="bg-main h-2.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: inView ? `${value}%` : 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
            />
        </div>
    );
};


// --- Helper Components ---

function Fixed({ id }) {
  return (
    <>
      {/* ✨ --- 2. تم إضافة 'hidden md:flex' لإخفاء الأيقونات على الهاتف --- */}
      <div className="hidden md:flex flex-col gap-3 fixed top-1/2 -translate-y-1/2 left-4 md:left-6 z-50">
        {/* ✨ Added hover effect to social icons */}
        {socialLinks.map((item, index) => (
            <motion.a 
                key={index}
                href={item.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white/10 backdrop-blur-sm text-white rounded-full cursor-pointer transition-all duration-300 hover:bg-main hover:text-black hover:scale-110"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
            >
                {item.icon}
            </motion.a>
        ))}
      </div>
      {/* ✨ Enhanced the section number display */}
      <span className="bottom-6 end-6 lg:bottom-10 lg:end-10 absolute text-[70px] md:text-[100px] font-black text-white/5 select-none">
        0{id}
      </span>
    </>
  );
}



 function Background() {
  const reduce = useReducedMotion();

  return (
    <>
      {/* التدرّج الأساسي */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_0%,rgba(120,119,198,0.25)_0%,rgba(0,0,0,0)_60%)]" />

      {/* الشبكة المتحركة */}
      <div
        className={[
          "pointer-events-none absolute inset-0 opacity-35",
          "[background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)]",
          "[background-size:32px_32px]",
          reduce ? "" : "animate-grid-move",
        ].join(" ")}
      />

      {/* Glow Beams (شرائط ضوء لطيفة) */}
      <div
        className="pointer-events-none absolute inset-0 mix-blend-screen opacity-30 [mask-image:radial-gradient(60%_60%_at_50%_50%,black,transparent)] overflow-hidden"
        data-parallax
      >
        <div className={["absolute -inset-[30%] rotate-12",
          "bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,255,255,0.08)_50deg,transparent_120deg)]",
          reduce ? "" : "animate-slow-rotate",
        ].join(" ")} />
        <div className={["absolute -inset-[30%] -rotate-6",
          "bg-[conic-gradient(from_180deg,transparent_0deg,rgba(234,179,8,0.08)_40deg,transparent_100deg)]",
          reduce ? "" : "animate-slow-rotate-rev",
        ].join(" ")} />
      </div>

      {/* Aurora (غمامات لونية خفيفة) */}
      <div className="pointer-events-none absolute -inset-20 blur-3xl opacity-25" data-parallax>
        <div className={["absolute left-1/4 top-1/4 w-2/3 h-2/3 rounded-full",
          "bg-[radial-gradient(circle_at_30%_30%,rgba(234,179,8,0.16),transparent_60%)]",
          reduce ? "" : "animate-aurora",
        ].join(" ")} />
        <div className={["absolute right-1/5 bottom-1/5 w-1/2 h-1/2 rounded-full",
          "bg-[radial-gradient(circle_at_70%_70%,rgba(255,255,255,0.08),transparent_60%)]",
          reduce ? "" : "animate-aurora-slow",
        ].join(" ")} />
      </div>

      {/* Twinkles (تلألؤ نجوم خفيف) */}
      <div className="pointer-events-none absolute inset-0">
        {[...Array(36)].map((_, i) => (
          <span
            key={i}
            className="absolute block rounded-full bg-white/60"
            style={{
              width: Math.random() * 2 + 1 + "px",
              height: Math.random() * 2 + 1 + "px",
              top: Math.random() * 100 + "%", left: Math.random() * 100 + "%",
              animation: reduce ? "none" : `twinkle ${6 + Math.random() * 6}s ease-in-out ${Math.random() * 6}s infinite`,
              filter: "blur(0.3px)",
              opacity: 0.2,
            }}
          />
        ))}
      </div>

      {/* keyframes */}
      <style jsx global>{`
        @keyframes grid-move {
          0%   { background-position: 0px 0px, 0px 0px; }
          100% { background-position: 64px 64px, 64px 64px; }
        }
        .animate-grid-move { animation: grid-move 18s linear infinite; }

        @keyframes slow-rotate { to { transform: rotate(372deg); } }
        @keyframes slow-rotate-rev { to { transform: rotate(-372deg); } }
        .animate-slow-rotate     { animation: slow-rotate 40s linear infinite; }
        .animate-slow-rotate-rev { animation: slow-rotate-rev 48s linear infinite; }

        @keyframes aurora { 0%,100% { transform: translate3d(0,0,0) } 50% { transform: translate3d(2%, -3%, 0) } }
        @keyframes aurora-slow { 0%,100% { transform: translate3d(0,0,0) } 50% { transform: translate3d(-3%, 2%, 0) } }
        .animate-aurora { animation: aurora 18s ease-in-out infinite; }
        .animate-aurora-slow { animation: aurora-slow 26s ease-in-out infinite; }

        @keyframes twinkle {
          0%,100% { opacity: .15; transform: scale(1); }
          50%      { opacity: .7;  transform: scale(1.7); }
        }
      `}</style>
    </>
  );
}

function Hero() {
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  const text = "Full Stack Developer";
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.04, delayChildren: 0.5 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { ease: [0.22, 1, 0.36, 1], duration: 0.8 },
    },
  };

  const imageContainerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 1.0 },
    },
  };

  return (
    <section
      ref={ref}
      className="w-full min-h-screen relative overflow-hidden bg-background flex items-start lg:items-center justify-center"
    >
      {/* الخلفية الجديدة */}
      <Background />

      <div className="px-4 w-full max-w-6xl mx-auto relative z-10 pt-6 sm:pt-10 lg:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center mt-10">
          {/* الصورة فقط (بدون أي تدرّجات) */}
          <motion.div
            variants={imageContainerVariants}
            initial="hidden"
            animate={controls}
            className="order-1 lg:order-2 flex justify-center items-center group h-[240px] sm:h-[300px] lg:h-[500px]"
          >
            <div className="relative w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] lg:w-[370px] lg:h-[370px]">
              <motion.div className="absolute inset-0 rounded-full" whileHover={{ scale: 1.05 }}>
                <img
                  className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-white/10"
                  src="/imgs/my.jpg"
                  alt="Taibi Abdelhakim"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://placehold.co/350x350/191919/eab308?text=T+A";
                  }}
                />
                <div className="absolute inset-[-10px] border-2 border-main rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 animate-pulse"></div>
              </motion.div>

              {[ // نفس الأوربس مع تحسين خفيف في الـ blur
                { size: "w-6 h-6", duration: 10, distance: "130px" },
                { size: "w-3 h-3", duration: 15, distance: "150px" },
                { size: "w-5 h-5", duration: 20, distance: "170px" },
              ].map((orb, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2"
                  style={{ originX: orb.distance, originY: "0px" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: orb.duration, repeat: Infinity, ease: "linear" }}
                >
                  <div className={`${orb.size} bg-main/50 rounded-full blur-sm transition-all duration-500 group-hover:bg-main`} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* النصوص والأزرار */}
          <div className="order-2 lg:order-1 text-center lg:text-left rounded-2xl px-6 pt-4 pb-6 lg:p-0 ">
            {/* الاسم (تدرّج) */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl font-semibold tracking-[0.2em] mb-4 normal-case bg-gradient-to-r from-[hsl(var(--accent))] via-[hsl(var(--primary))] to-[hsl(var(--secondary))] bg-clip-text text-transparent "
            >
              TAIBI ABDELHAKIM
            </motion.p>

            {/* العنوان: تدرّج على كلمة Developer فقط */}
            <motion.h1
              variants={containerVariants}
              initial="hidden"
              animate={controls}
              className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter normal-case leading-tight"
              aria-label={text}
            >
              {words.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block whitespace-nowrap mr-4">
                  {word.split("").map((letter, letterIndex) => {
                    const isHighlighted = word === "Developer"; // فقط Developer
                    return (
                      <motion.span
                        key={letterIndex}
                        variants={letterVariants}
                        className={
                          isHighlighted
                            ? "inline-block bg-gradient-to-r from-[hsl(var(--accent))] via-[hsl(var(--primary))] to-[hsl(var(--secondary))] bg-clip-text text-transparent "
                            : "inline-block text-foreground"
                        }
                      >
                        {letter}
                      </motion.span>
                    );
                  })}
                </span>
              ))}
            </motion.h1>

            {/* وصف */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.2 }}
              className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-muted-foreground mt-8 normal-case"
            >
              I build complete, scalable, and high-performance web applications using the MERN Stack — from backend architecture to polished front-end experiences.
            </motion.p>

            {/* الأزرار */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.4 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mt-10"
            >
              {/* Explore My Work — خلفية تدرّج */}
              <motion.a
                href="#projects"
                className="relative font-bold py-3 px-8 rounded-full text-lg normal-case text-[hsl(var(--primary-foreground))]"
                style={{
                  background:
                    "linear-gradient(90deg, hsl(var(--accent)), hsl(var(--primary)), hsl(var(--secondary)))",
                  backgroundSize: "200% 100%",
                }}
                whileHover={{ scale: 1.05, boxShadow: "0 0 28px hsl(var(--primary)/0.35)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="animate-gradient-x">Explore My Work</span>
              </motion.a>

              {/* Download CV — حدّ تدرّجي */}
              <motion.a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="relative rounded-full text-lg font-bold px-8 py-3 transition-all"
                style={{
                  background:
                    "linear-gradient(hsl(var(--background)), hsl(var(--background))) padding-box, linear-gradient(90deg, hsl(var(--accent)), hsl(var(--primary)), hsl(var(--secondary))) border-box",
                  border: "2px solid transparent",
                  color: "hsl(var(--foreground))",
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Download CV
              </motion.a>
            </motion.div>

            {/* أيقونات السوشال — تدرّج عند الـ hover فقط */}
            <motion.div
              className="flex md:hidden gap-4 mt-8 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.6 }}
            >
              {socialLinks.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full cursor-pointer transition-all duration-300 border border-border bg-card/10 text-foreground hover:text-black"
                  // التدرّج على hover فقط:
                  style={{}}
                  whileHover={{
                    scale: 1.1,
                    background:
                      "linear-gradient(90deg, hsl(var(--accent)), hsl(var(--primary)), hsl(var(--secondary)))",
                  }}
                >
                  {item.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* زر السحب للأسفل — حدّ تدرّجي */}
      <motion.a
        href="#skills"
        className="hidden lg:block lg:absolute lg:bottom-10 lg:left-1/2 lg:-translate-x-1/2 lg:z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 2.8, duration: 0.8 } }}
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{
            background:
              "linear-gradient(hsl(var(--background)), hsl(var(--background))) padding-box, linear-gradient(90deg, hsl(var(--accent)), hsl(var(--primary)), hsl(var(--secondary))) border-box",
            border: "2px solid transparent",
            color: "hsl(var(--accent))",
          }}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ backgroundColor: "hsl(var(--primary))", color: "#000" }}
        >
          <HiArrowDown size={24} />
        </motion.div>
      </motion.a>

      <Fixed id={1} />

      {/* مفاتيح الحركة: تحريك التدرّج */}
      <style jsx global>{`
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 8s linear infinite;
        }
      `}</style>
    </section>
  );
}







function AboutMe() {
    const controls = useAnimation();
    const { ref, inView } = useInView({ 
        triggerOnce: true, 
        threshold: 0.2 
    });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    // --- حركات الظهور ---
    const imageVariants = {
        hidden: { opacity: 0, scale: 0.8, rotate: -10 },
        visible: { 
            opacity: 1, 
            scale: 1, 
            rotate: 3, // ✨ يبدأ مائلاً قليلاً
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
        }
    };

    const textContainerVariants = {
        hidden: {},
        visible: { 
            transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
        }
    };

    const textChildVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" } 
        }
    };

    return (
        <section id="about" className="w-full relative bg-background py-24 z-10">
            {/* ✨ استخدام نفس المسافات الجانبية المتجاوبة */}
            <div className="text-white px-6 sm:px-14 md:px-20 max-w-6xl mx-auto">
                
                {/* --- العنوان الرئيسي للقسم --- */}
                <motion.div 
  className="relative text-center mb-16"
  initial={{ opacity: 0, y: 20 }}
  animate={controls}
  variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 20 } }}
  transition={{ duration: 0.6 }}
>
  <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter">
    A Bit{" "}
    <span className="bg-gradient-to-r from-[hsl(var(--accent))] via-[hsl(var(--primary))] to-[hsl(var(--secondary))] bg-clip-text text-transparent ">
      About
    </span>{" "}
    Me
  </h2>

  <p className="text-gray-400 mt-4 max-w-xl mx-auto normal-case">
    My passion, my code, and my story.
  </p>
</motion.div>

                {/* --- شبكة المحتوى (صورة + نص) --- */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* --- 1. عمود الصورة (تظهر أولاً على الهاتف) --- */}
                    <motion.div 
                        ref={ref}
                        className="order-1 lg:order-1 mx-auto"
                        variants={imageVariants}
                        initial="hidden"
                        animate={controls}
                    >
                        {/* ✨ [تصميم عصري] حاوية لتأثير الـ Hover */}
                        <div className="group relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px]">
                            {/* الإطار الخلفي المزخرف */}
                            <div className="absolute inset-0 bg-[#222]/50 border-2 border-main/30 rounded-2xl 
                                        transform -rotate-6 transition-transform duration-500 ease-in-out
                                        group-hover:rotate-0">
                            </div>
                            {/* الصورة نفسها */}
                            <img
                                className="relative w-full h-full object-cover rounded-2xl shadow-xl border-4 border-white/10
                                           transform rotate-3 transition-transform duration-500 ease-in-out
                                           group-hover:rotate-0"
                                src="/imgs/my2.jpg" // ✨ استخدم الصورة التي تفضلها هنا
                                alt="Taibi Abdelhakim"
                                onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/400x400/191919/eab308?text=T+A'; }}
                            />
                        </div>
                    </motion.div>

                    {/* --- 2. عمود النص (يظهر ثانياً على الهاتف) --- */}
                    <motion.div 
                        className="order-2 lg:order-2 text-center lg:text-left"
                        variants={textContainerVariants}
                        initial="hidden"
                        animate={controls}
                    >
                        <motion.h3 
                            variants={textChildVariants}
                            className="text-2xl sm:text-3xl font-bold tracking-tight mb-4"
                        >
                            Full Stack MERN Developer based in Algeria
                        </motion.h3>

                        <motion.p 
                            variants={textChildVariants}
                            className="text-base sm:text-lg text-gray-400 normal-case leading-relaxed"
                        >
                            Hello! I'm Taibi Abdelhakim, a passionate Full Stack Developer specializing in the **MERN** stack. My journey in tech began with a deep curiosity for how things work, which quickly evolved into a passion for building robust and scalable web applications from scratch.
                        </motion.p>
                        
                        <motion.p 
                            variants={textChildVariants}
                            className="mt-4 text-base sm:text-lg text-gray-400 normal-case leading-relaxed"
                        >
                            I thrive on solving complex problems and turning ideas into reality. Whether it's crafting a pixel-perfect frontend with **React & Next.js** or building a secure and efficient backend with **Node.js & MongoDB**, I am dedicated to writing clean code and creating exceptional digital experiences.
                        </motion.p>
                        
                        <motion.a 
                            href="#contact" 
                            variants={textChildVariants}
                            className="inline-flex items-center gap-2 bg-transparent border-2 border-main text-main font-bold py-3 px-8 rounded-full text-lg 
                                       transition-all hover:scale-105 hover:bg-main hover:text-black mt-8"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            Let's Connect <GoArrowRight size={20} />
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

const CATEGORIES = ["All", "Frontend", "Backend", "Tooling", "Design"];


const SKILLS = [
  { name: "React", badge: "Daily", group: "Frontend", desc: "Interactive UIs & hooks", icon: "⚛️" },
  { name: "Next.js", badge: "Daily", group: "Frontend", desc: "SSR/ISR, routing, app dir", icon: "▲" },
  { name: "TypeScript", badge: "Weekly", group: "Frontend", desc: "Safer, scalable code", icon: "🧩" },
  { name: "Tailwind CSS", badge: "Daily", group: "Design", desc: "Design systems fast", icon: "🎨" },
  { name: "Node.js", badge: "Weekly", group: "Backend", desc: "APIs & services", icon: "🟢" },
  { name: "Express", badge: "Weekly", group: "Backend", desc: "REST APIs", icon: "🚏" },
  { name: "MongoDB", badge: "Weekly", group: "Backend", desc: "Documents & Mongoose", icon: "🍃" },
  { name: "Git", badge: "Daily", group: "Tooling", desc: "Flow & collaboration", icon: "🔧" },
  { name: "Zustand", badge: "Monthly", group: "Frontend", desc: "Light state mgmt", icon: "🐻" },
  { name: "Framer Motion", badge: "Weekly", group: "Frontend", desc: "Fluid animations", icon: "🎞️" },
];


function GlowCard({ skill, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, delay: i * 0.03, ease: "easeOut" }}
      className="group relative rounded-2xl p-[1px] overflow-hidden"
    >
      {/* إطار متوهّج ديناميكي */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                      bg-[conic-gradient(at_30%_-10%,#22d3ee_0deg,#eab308_120deg,#a78bfa_240deg,#22d3ee_360deg)] blur-xl" />
      {/* محتوى البطاقة */}
      <div className="relative rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-5 h-full
                      transition-transform duration-300 group-hover:-translate-y-1">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="text-xl leading-none">{skill.icon}</div>
            <h3 className="text-base sm:text-lg font-semibold tracking-tight">{skill.name}</h3>
          </div>
          <span
            className={`text-[10px] px-2 py-1 rounded-full border ${
              skill.badge === "Daily"
                ? "border-emerald-300/40 text-emerald-300/90"
                : skill.badge === "Weekly"
                ? "border-sky-300/40 text-sky-300/90"
                : "border-yellow-300/40 text-yellow-300/90"
            }`}
          >
            {skill.badge}
          </span>
        </div>
        <p className="mt-3 text-sm text-gray-300/90">{skill.desc}</p>

        {/* خط سفلي متوهّج عند hover */}
        <div className="mt-4 h-px w-full bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-30 group-hover:opacity-60 transition-opacity" />

        {/* أزرار سريعة صغيرة - شكل فقط */}
        <div className="mt-4 flex items-center gap-2">
          <button className="text-xs px-2.5 py-1.5 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 transition">
            Docs
          </button>
          <button className="text-xs px-2.5 py-1.5 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 transition">
            Demo
          </button>
          <button className="text-xs px-2.5 py-1.5 rounded-md border border-white/10 bg-white/5 hover:bg-white/10 transition">
            Repo
          </button>
        </div>
      </div>
    </motion.div>
  );
}


function Skills() {
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [active, setActive] = useState("All");
  const reduce = useReducedMotion();

  useEffect(() => { if (inView) controls.start("visible"); }, [controls, inView]);

  const filtered = useMemo(
    () => (active === "All" ? SKILLS : SKILLS.filter(s => s.group === active)),
    [active]
  );

  return (
    <section id="skills" className="relative overflow-hidden bg-[hsl(var(--background))] py-24">
      {/* ========= خلفية عصرية (شبكة + هالات + وميض) ========= */}
      <div
        aria-hidden
        className={[
          "pointer-events-none absolute inset-0 opacity-[0.35]",
          "[background-image:linear-gradient(hsl(var(--foreground)/0.06)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/0.06)_1px,transparent_1px)]",
          "[background-size:32px_32px]",
          reduce ? "" : "animate-grid-move",
        ].join(" ")}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-screen opacity-25 [mask-image:radial-gradient(60%_60%_at_50%_50%,black,transparent)]"
      >
        <div
          className={[
            "absolute -inset-[30%] rotate-12",
            "bg-[conic-gradient(from_0deg,transparent_0deg,hsl(var(--foreground)/0.08)_50deg,transparent_120deg)]",
            reduce ? "" : "animate-slow-rotate",
          ].join(" ")}
        />
        <div
          className={[
            "absolute -inset-[30%] -rotate-6",
            "bg-[conic-gradient(from_180deg,transparent_0deg,hsl(var(--primary)/0.08)_40deg,transparent_100deg)]",
            reduce ? "" : "animate-slow-rotate-rev",
          ].join(" ")}
        />
      </div>

      <div aria-hidden className="pointer-events-none absolute -inset-24 blur-3xl opacity-25">
        <div
          className={[
            "absolute left-1/5 top-1/5 w-2/3 h-2/3 rounded-full",
            "bg-[radial-gradient(circle_at_30%_30%,hsl(var(--accent)/0.16),transparent_60%)]",
            reduce ? "" : "animate-aurora",
          ].join(" ")}
        />
        <div
          className={[
            "absolute right-1/6 bottom-1/6 w-1/2 h-1/2 rounded-full",
            "bg-[radial-gradient(circle_at_70%_70%,hsl(var(--foreground)/0.08),transparent_60%)]",
            reduce ? "" : "animate-aurora-slow",
          ].join(" ")}
        />
      </div>
      {/* ========= /الخلفية ========= */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12">
        {/* هيدر مشع */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 text-[12px] tracking-widest uppercase text-[hsl(var(--foreground)/0.6)]">
            <span className="size-1.5 rounded-full bg-[hsl(var(--accent)/0.8)]" />
            My Stack
          </span>
          <h2 className="mt-3 text-4xl md:text-6xl font-extrabold tracking-tight">
            Skills,{" "}
            <span className="bg-gradient-to-r from-[hsl(var(--accent))] via-[hsl(var(--primary))] to-[hsl(var(--secondary))] bg-clip-text text-transparent">
              Tools
            </span>{" "}
            & Workflow
          </h2>
          <p className="text-[hsl(var(--muted-foreground))] mt-3 max-w-2xl mx-auto">
            Carefully picked technologies for speed, accessibility, and a delightful developer experience.
          </p>
        </motion.div>

        {/* تخطيط حديث: شريط فلاتر جانبي sticky + شبكة بطاقات */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* فلاتر جانبية */}
          <aside className="lg:col-span-3">
            <div className="lg:sticky lg:top-24 rounded-2xl border border-[hsl(var(--border)/0.6)] bg-[hsl(var(--card)/0.06)] backdrop-blur-md p-4">
              <div className="text-xs text-[hsl(var(--muted-foreground))] mb-2">Filter by</div>
              <div className="flex lg:flex-col flex-wrap gap-2">
                {CATEGORIES.map((c) => {
                  const activeChip = active === c;
                  return (
                    <button
                      key={c}
                      onClick={() => setActive(c)}
                      className={[
                        "relative w-fit lg:w-full rounded-xl px-4 py-2 text-sm transition focus:outline-none text-left",
                        activeChip
                          ? "text-[hsl(var(--primary-foreground))]"
                          : "text-[hsl(var(--foreground)/0.85)] hover:text-[hsl(var(--foreground))]",
                      ].join(" ")}
                    >
                      <span
                        className={[
                          "absolute inset-0 -z-10 rounded-xl border border-[hsl(var(--border)/0.6)] bg-[hsl(var(--card)/0.08)]",
                          activeChip &&
                            "bg-gradient-to-r from-[hsl(var(--accent))] via-[hsl(var(--primary))] to-[hsl(var(--secondary))] a",
                        ].join(" ")}
                      />
                      {c}
                    </button>
                  );
                })}
              </div>

              {/* أساطير خفيفة */}
              <div className="mt-6 grid grid-cols-2 gap-2 text-[11px] text-[hsl(var(--muted-foreground))]">
                <div className="flex items-center gap-2">
                  <span className="inline-block size-2 rounded-full bg-[hsl(var(--accent)/0.8)]" />
                  <span>Core</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block size-2 rounded-full bg-[hsl(var(--primary)/0.8)]" />
                  <span>UI/UX</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block size-2 rounded-full bg-[hsl(var(--secondary)/0.8)]" />
                  <span>Tools</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="inline-block size-2 rounded-full bg-[hsl(var(--destructive)/0.8)]" />
                  <span>Perf</span>
                </div>
              </div>
            </div>
          </aside>

          {/* البطاقات */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}
            className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {filtered.map((skill, i) => {
              const lvl = Math.max(0, Math.min(skill.level ?? 80, 100));
              return (
                <motion.div
                  key={skill.name + i}
                  variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 200, damping: 22 }}
                  className="relative group rounded-2xl border border-[hsl(var(--border)/0.6)] bg-[hsl(var(--card)/0.06)] backdrop-blur-md p-5 overflow-hidden"
                >
                  {/* وهج محيطي عند التحويم */}
                  <span
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300"
                    style={{
                      background:
                        "radial-gradient(600px 220px at 50% 100%, hsl(var(--accent)/0.14), transparent 42%)",
                    }}
                  />

                  {/* رأس البطاقة */}
                  <div className="flex items-start gap-3">
                    <div className="size-12 grid place-items-center rounded-xl bg-[hsl(var(--card)/0.1)] border border-[hsl(var(--border)/0.5)] shadow-[inset_0_0_0_1px_hsl(var(--foreground)/0.05)]">
                      <div className="scale-110 opacity-90">{skill.icon}</div>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg font-semibold tracking-tight">{skill.name}</h3>
                        {skill.group && (
                          <span className="text-[11px] px-2 py-0.5 rounded-full border border-[hsl(var(--border)/0.6)] text-[hsl(var(--foreground)/0.7)]">
                            {skill.group}
                          </span>
                        )}
                      </div>
                      {skill.desc && (
                        <p className="text-[13px] text-[hsl(var(--muted-foreground))] mt-1 line-clamp-2">
                          {skill.desc}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* حلقة التقدّم + أرقام */}
                  <div className="mt-5 flex items-center gap-4">
                    <div
                      className="relative size-16 rounded-full grid place-items-center"
                      style={{
                        background: `conic-gradient(hsl(var(--ring)) ${lvl * 3.6}deg, hsl(var(--foreground)/0.08) ${
                          lvl * 3.6
                        }deg)`,
                      }}
                    >
                      <div className="absolute inset-[4px] rounded-full bg-[hsl(var(--background)/0.6)] backdrop-blur-sm border border-[hsl(var(--border)/0.6)]" />
                      <div className="relative text-sm font-semibold">{lvl}%</div>
                    </div>

                    {/* شريط تقدّم خطي مع شِيمر */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between text-[12px] text-[hsl(var(--muted-foreground))] mb-1">
                        <span>Proficiency</span>
                        <span>{lvl}%</span>
                      </div>
                      <div className="relative h-2 rounded-full bg-[hsl(var(--muted)/0.6)] overflow-hidden">
                        <div
                          className="absolute inset-y-0 left-0 bg-gradient-to-r from-[hsl(var(--accent))] via-[hsl(var(--primary))] to-[hsl(var(--secondary))]"
                          style={{ width: `${lvl}%`, backgroundSize: "200% 100%", animation: "gradient-x 8s linear infinite" }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* وسوم */}
                  {!!skill.tags?.length && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {skill.tags.slice(0, 6).map((t, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] px-2 py-1 rounded-md bg-[hsl(var(--muted)/0.2)] border border-[hsl(var(--border)/0.6)] text-[hsl(var(--muted-foreground))]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* خط شيمر زخرفي */}
                  <span className="pointer-events-none absolute inset-x-0 -bottom-1 h-px bg-gradient-to-r from-transparent via-[hsl(var(--foreground)/0.2)] to-transparent -translate-x-full shimmer-line" />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {/* مفاتيح الحركة داخل نفس المكوّن */}
      <style jsx global>{`
        @keyframes grid-move {
          0% { background-position: 0px 0px, 0px 0px; }
          100% { background-position: 64px 64px, 64px 64px; }
        }
        .animate-grid-move { animation: grid-move 18s linear infinite; }

        @keyframes slow-rotate { to { transform: rotate(372deg); } }
        @keyframes slow-rotate-rev { to { transform: rotate(-372deg); } }
        .animate-slow-rotate { animation: slow-rotate 40s linear infinite; }
        .animate-slow-rotate-rev { animation: slow-rotate-rev 48s linear infinite; }

        @keyframes aurora { 0%,100% { transform: translate3d(0,0,0) } 50% { transform: translate3d(2%, -3%, 0) } }
        @keyframes aurora-slow { 0%,100% { transform: translate3d(0,0,0) } 50% { transform: translate3d(-3%, 2%, 0) } }
        .animate-aurora { animation: aurora 18s ease-in-out infinite; }
        .animate-aurora-slow { animation: aurora-slow 26s ease-in-out infinite; }

        @keyframes gradient-x { 0% { background-position: 0% 50%; } 100% { background-position: 200% 50%; } }
        .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 6s linear infinite; }

        @keyframes shimmer { 100% { transform: translateX(100%); } }
        .shimmer-line { transform: translateX(-100%); animation: shimmer 3.6s ease-in-out infinite; }
      `}</style>
    </section>
  );
}


function SkillsList() {
 // ✨ Updated to an array of objects with names and icon paths
 const skills = [
 { name: "HTML", icon: "/imgs/html.png" },
 { name: "CSS", icon: "/imgs/css.png" }, { name: "JavaScript", icon: "/imgs/js.png" },
 { name: "Tailwind CSS", icon: "/imgs/tailwind.png" }, { name: "React", icon: "/imgs/react.webp" },
{ name: "Next.js", icon: "/imgs/nextjs.png" },
{ name: "Git", icon: "/imgs/git.png" },
    { name: "Bootstrap", icon: "/imgs/bootstrap.svg" },
 ];

return (
 <section className="py-8 bg-background">
 <div className="relative flex overflow-hidden group">
 <motion.div 
 className="flex"
 animate={{ x: ['0%', '-100%'] }}
 transition={{ ease: 'linear', duration: 25, repeat: Infinity }}
 >
 {/* We map the array twice for a seamless loop */}
 {[...skills, ...skills].map((skill, index) => (
 <div key={index} className="flex-shrink-0 mx-12 flex items-center justify-center gap-4 w-48">
 {/* ✨ Added image tag for the icon */}
 <img 
                            src={skill.icon} 
                            alt={skill.name} 
                            className="h-14 w-14 object-contain"
                            onError={(e) => { e.target.style.display='none'; }}
                        />
 <span className="text-3xl font-bold text-gray-500">{skill.name}</span>
 </div>
 ))}
 </motion.div>
 </div>
 </section>
);
}


function Services() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [expandedIndex, setExpandedIndex] = useState(null);

  // ✅ الخدمات المختارة + أوصاف احترافية موجزة
  const serviceItems = [
    {
      title: "Full-Stack Web Applications",
      description:
        "Designing and shipping complete MERN applications — from data modeling and REST/GraphQL APIs to responsive React UIs and production deployments.",
    },
    {
      title: "SaaS & Dashboard Systems",
      description:
        "Building subscription-based platforms, admin dashboards, analytics, multi-tenant setups, billing, roles & permissions, and audit-ready activity logs.",
    },
    {
      title: "Performance & Optimization",
      description:
        "Improving Core Web Vitals, query performance, caching layers (Redis), CDN & image optimization, code splitting, and real-world load tuning.",
    },
    {
      title: "Authentication & Security",
      description:
        "Implementing robust auth (JWT/Session, OAuth), RBAC, input validation, rate limiting, encryption, and security best practices across the stack.",
    },
  ];

  return (
    <section id="services" className="w-full py-24 relative z-10 bg-background flex flex-col items-center justify-center">
      <div className="relative text-center mb-16 px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-5xl lg:text-7xl font-bold tracking-tighter"
        >
          What I Offer
        </motion.h2>
      </div>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="w-full max-w-3xl"
        onMouseLeave={() => setExpandedIndex(null)}
      >
        {serviceItems.map((item, index) => (
          <motion.div
            key={index}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="relative border-t border-white/10"
            onHoverStart={() => setExpandedIndex(index)}
          >
            <h3 className="text-3xl font-bold tracking-tight p-8 cursor-pointer flex justify-between items-center">
              <span>{item.title}</span>
              <GoArrowUpRight
                className={`transition-transform duration-300 ${
                  expandedIndex === index ? "rotate-45 text-main" : "text-gray-600"
                }`}
              />
            </h3>
            <AnimatePresence>
              {expandedIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-8 pb-8 text-gray-400">{item.description}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}








function Works() {
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  const [active, setActive] = useState("All");

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  // استخراج الفئات من المشاريع
  const categories = useMemo(() => {
    const set = new Set();
    (projects || []).forEach((p) => p && p.type && set.add(p.type));
    return ["All", ...Array.from(set)];
  }, [projects]);

  // تصفية المشاريع حسب الفئة
  const filtered = useMemo(() => {
    if (active === "All") return projects || [];
    return (projects || []).filter((p) => p && p.type === active);
  }, [active, projects]);

  return (
    <section id="projects" className="relative z-10 bg-[hsl(var(--background))] py-20">
      {/* خلفية ناعمة */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(60rem 60rem at 20% -10%, hsl(var(--secondary)/.14), transparent 60%), radial-gradient(50rem 50rem at 80% 10%, hsl(var(--accent)/.12), transparent 55%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.06] bg-[url('data:image/svg+xml;utf8,\
        <svg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 viewBox=%270 0 16 16%27>\
        <path fill=%27%23ffffff%27 fill-opacity=%270.7%27 d=%27M0 15.5H16v1H0zM15.5 0v16h1V0z%27 /></svg>')]"
        aria-hidden
        style={{ filter: "saturate(0)" }}
      />

      <div className="relative text-[hsl(var(--foreground))] px-6 sm:px-12 md:px-20 max-w-7xl mx-auto">
        {/* العنوان */}
        <div className="text-center mb-10">
<h2 className="text-4xl lg:text-6xl font-bold tracking-tighter">
  Featured{" "}
  <span className="bg-gradient-to-r from-[hsl(var(--accent))] via-[hsl(var(--primary))] to-[hsl(var(--secondary))] bg-clip-text text-transparent">
    Projects
  </span>
</h2>          <p className="mt-3 text-[hsl(var(--muted-foreground))]">A visual wall of selected work.</p>
        </div>

        {/* فلاتر */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
        >
          {categories.map((c) => {
            const isActive = active === c;
            return (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={[
                  "relative rounded-full px-4 py-2 text-sm transition",
                  isActive
                    ? "text-[hsl(var(--primary-foreground))]"
                    : "text-[hsl(var(--foreground)/0.8)] hover:text-[hsl(var(--foreground))]",
                ].join(" ")}
              >
                <span
                  className={[
                    "absolute inset-0 rounded-full -z-10 transition border",
                    isActive
                      ? "border-transparent bg-gradient-to-r from-[hsl(var(--accent))] via-[hsl(var(--primary))] to-[hsl(var(--secondary))]"
                      : "border-[hsl(var(--border)/0.6)] bg-[hsl(var(--card)/0.08)]",
                  ].join(" ")}
                />
                {c}
              </button>
            );
          })}
        </motion.div>

        {/* شبكة Masonry (CSS columns) */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
          className="columns-1 sm:columns-2 lg:columns-3 gap-6"
        >
          {(filtered.length ? filtered : []).map((ele, index) => (
            <motion.article
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="mb-6 break-inside-avoid rounded-2xl overflow-hidden border border-[hsl(var(--border)/0.6)] bg-[hsl(var(--card)/0.08)] backdrop-blur-sm group"
            >
              <div className="relative">
                <img
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  src={ele?.img}
                  alt={ele?.name}
                  loading="lazy"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      "https://placehold.co/1000x700/0d1117/f0f6fc?text=Project"; // متناسق مع الخلفية/النص
                  }}
                />
                {/* Overlay خفيف */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[hsl(var(--background)/0.6)] opacity-70" />
                {/* شارة النوع */}
                {ele?.type && (
                  <span className="absolute top-3 left-3 text-[11px] font-semibold bg-[hsl(var(--background)/0.5)] backdrop-blur-sm border border-[hsl(var(--border)/0.6)] text-[hsl(var(--foreground))] px-2 py-1 rounded-full">
                    {ele.type}
                  </span>
                )}
              </div>

              <div className="p-5">
                <h3 className="text-xl font-semibold tracking-tight mb-1">
                  {ele?.name || "Project"}
                </h3>

                {ele?.description && (
                  <p className="text-[hsl(var(--muted-foreground))] text-sm normal-case line-clamp-3">
                    {ele.description}
                  </p>
                )}

                {!!(ele?.tags?.length) && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {ele.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-semibold bg-[hsl(var(--card)/0.12)] border border-[hsl(var(--border)/0.6)] px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* روابط خارجية (اختياري) */}
                <div className="flex gap-4 text-sm mt-5 opacity-80 group-hover:opacity-100 transition">
                  {ele?.live && (
                    <a
                      href={ele.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-1 items-center font-semibold hover:text-[hsl(var(--accent))] transition"
                    >
                      Live <GoArrowUpRight />
                    </a>
                  )}
                  {ele?.source && (
                    <a
                      href={ele.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-1 items-center font-semibold hover:text-[hsl(var(--accent))] transition"
                    >
                      Code <GoArrowUpRight />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {!filtered.length && (
          <div className="mt-10 text-center text-[hsl(var(--muted-foreground))]">
            No projects to display right now.
          </div>
        )}
      </div>
    </section>
  );
}



function Contact() {
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  useEffect(() => { if (inView) controls.start("visible"); }, [controls, inView]);

  // === عدّل بياناتك هنا ===
  const NAME = "Taibi Abdelhakim";
  const EMAIL = "taibihakim2002@gmail.com";
  const PHONE = "+213 555 000 000";
  const WHATSAPP = "+213555000000";
  const LOCATION = "Algeria (Remote-friendly)";
  const GITHUB = "https://github.com/your-username";
  const LINKEDIN = "https://www.linkedin.com/in/your-username";
  const TWITTER = "https://x.com/your-username";
  const RESPONSE = "Typically replies within 24–48h";

  const [copied, setCopied] = useState(null);
  const copy = async (key , value) => {
    try {
      await navigator.clipboard?.writeText(value);
      setCopied(key);
      setTimeout(() => setCopied(null), 1400);
    } catch {}
  };

  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } };
  const item = { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } };

  const vcardHref = useMemo(() => {
    const vc = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `FN:${NAME}`,
      `TEL;TYPE=CELL:${PHONE}`,
      `EMAIL;TYPE=INTERNET:${EMAIL}`,
      `ADR;TYPE=HOME:;;;${LOCATION};;;`,
      "END:VCARD",
    ].join("\n");
    return `data:text/vcard;charset=utf-8,${encodeURIComponent(vc)}`;
  }, [NAME, PHONE, EMAIL, LOCATION]);

  return (
    <section id="contact" className="w-full py-24 relative bg-[hsl(var(--background))] overflow-hidden">
      {/* خلفية Mesh + Grid + Noise */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(60rem 40rem at 15% 0%, hsl(var(--accent)/.12), transparent 60%), radial-gradient(50rem 50rem at 85% 10%, hsl(var(--secondary)/.12), transparent 55%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[.25] [background-image:linear-gradient(hsl(var(--foreground)/.06)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/.06)_1px,transparent_1px)] [background-size:32px_32px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-25 [background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2272%22 height=%2272%22 viewBox=%220 0 72 72%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%222%22 stitchTiles=%22stitch%22/></filter><rect width=%2272%22 height=%2272%22 filter=%22url(%23n)%22 opacity=%220.12%22/></svg>')]"
      />

      <div className="relative z-10 text-[hsl(var(--foreground))] px-6 sm:px-12 max-w-7xl mx-auto">
        {/* عنوان */}
        <motion.div ref={ref} initial="hidden" animate={controls} variants={container} className="text-center mb-14">
          <motion.h2 variants={item} className="text-4xl md:text-6xl font-extrabold tracking-tight">
            Let’s build something great.
          </motion.h2>
          <motion.p variants={item} className="max-w-2xl mx-auto mt-3 text-[hsl(var(--muted-foreground))]">
            Available for Full-Stack MERN projects, consulting, and performance work.
          </motion.p>
        </motion.div>

        {/* تخطيط Split Glass */}
        <motion.div initial="hidden" animate={controls} variants={container} className="grid grid-cols-1 lg:grid-cols-12 gap-7">
          {/* يسار: بطاقة معلومات زجاجية */}
          <motion.div
            variants={item}
            className="lg:col-span-6 relative rounded-2xl border border-[hsl(var(--border)/0.6)] bg-[hsl(var(--card)/0.06)] backdrop-blur-md p-6"
          >
            {/* رأس صغير */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-[hsl(var(--muted-foreground))]">
                <span className="size-2 rounded-full bg-[hsl(var(--accent)/0.8)]" />
                <span>Contacts</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
                <FiClock className="opacity-80" />
                <span>{RESPONSE}</span>
              </div>
            </div>

            {/* عناصر المعلومات */}
            <div className="space-y-4">
              {/* Email */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="grid place-items-center size-10 rounded-lg bg-[hsl(var(--card)/0.1)] border border-[hsl(var(--border)/0.6)]">
                    <FiMail />
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm text-[hsl(var(--muted-foreground))]">Email</div>
                    <a href={`mailto:${EMAIL}`} className="font-semibold break-all hover:underline">
                      {EMAIL}
                    </a>
                  </div>
                </div>
                <button
                  onClick={() => copy("email", EMAIL)}
                  className="rounded-md border border-[hsl(var(--border)/0.6)] bg-[hsl(var(--card)/0.08)] p-2 hover:bg-[hsl(var(--card)/0.14)] transition"
                  aria-label="Copy email"
                >
                  {copied === "email" ? <FiCheck /> : <FiCopy />}
                </button>
              </div>

              {/* Phone / WhatsApp */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="grid place-items-center size-10 rounded-lg bg-[hsl(var(--card)/0.1)] border border-[hsl(var(--border)/0.6)]">
                    <FiPhone />
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm text-[hsl(var(--muted-foreground))]">Phone / WhatsApp</div>
                    <div className="font-semibold">{PHONE}</div>
                    <div className="mt-1 text-sm">
                      <a
                        href={`tel:${PHONE.replace(/\s+/g, "")}`}
                        className="text-[hsl(var(--accent))] hover:underline mr-3"
                      >
                        Call
                      </a>
                      <a
                        href={`https://wa.me/${WHATSAPP}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[hsl(var(--accent))] hover:underline"
                      >
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => copy("phone", PHONE)}
                  className="rounded-md border border-[hsl(var(--border)/0.6)] bg-[hsl(var(--card)/0.08)] p-2 hover:bg-[hsl(var(--card)/0.14)] transition"
                  aria-label="Copy phone"
                >
                  {copied === "phone" ? <FiCheck /> : <FiCopy />}
                </button>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <span className="grid place-items-center size-10 rounded-lg bg-[hsl(var(--card)/0.1)] border border-[hsl(var(--border)/0.6)]">
                  <FiMapPin />
                </span>
                <div>
                  <div className="text-sm text-[hsl(var(--muted-foreground))]">Location</div>
                  <div className="font-semibold">{LOCATION}</div>
                </div>
              </div>

              {/* Socials */}
              <div className="pt-2">
                <div className="text-sm text-[hsl(var(--muted-foreground))] mb-2">Socials</div>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={GITHUB}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-[hsl(var(--border)/0.6)] bg-[hsl(var(--card)/0.08)] px-3 py-2 hover:border-[hsl(var(--accent))] transition"
                  >
                    <FiGithub /> GitHub
                  </a>
                  <a
                    href={LINKEDIN}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-[hsl(var(--border)/0.6)] bg-[hsl(var(--card)/0.08)] px-3 py-2 hover:border-[hsl(var(--accent))] transition"
                  >
                    <FiLinkedin /> LinkedIn
                  </a>
                  <a
                    href={TWITTER}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-[hsl(var(--border)/0.6)] bg-[hsl(var(--card)/0.08)] px-3 py-2 hover:border-[hsl(var(--accent))] transition"
                  >
                    <FiTwitter /> X
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* يمين: CTA كبير */}
          <motion.div
            variants={item}
            className="lg:col-span-6 relative rounded-2xl border border-[hsl(var(--border)/0.6)] bg-[hsl(var(--card)/0.06)] backdrop-blur-md p-6 overflow-hidden"
          >
            {/* هالة خفيفة */}
            <span
              aria-hidden
              className="pointer-events-none absolute -inset-20 blur-3xl opacity-60"
              style={{ background: "radial-gradient(40rem 22rem at 70% 20%, hsl(var(--accent)/0.15), transparent 60%)" }}
            />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-[hsl(var(--border)/0.6)] bg-[hsl(var(--card)/0.12)] px-3 py-1 text-[12px] text-[hsl(var(--muted-foreground))]">
                <span className="size-1.5 rounded-full bg-[hsl(var(--accent)/0.8)]" />
                Open to new projects
              </div>

              <h3 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">
                Work with me on your next<br />full-stack MERN project.
              </h3>
              <p className="mt-3 text-[hsl(var(--muted-foreground))] max-w-xl">
                From backend architecture and APIs to polished front-end UI — I deliver fast, scalable, and secure solutions.
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${EMAIL}`}
                  className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border)/0.6)] bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] px-5 py-3 font-semibold hover:shadow-[0_0_0_6px_hsl(var(--primary)/0.15)] transition"
                >
                  <FiMail /> Email me
                </a>
                <a
                  href={`https://wa.me/${WHATSAPP}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border)/0.6)] bg-[hsl(var(--card)/0.12)] px-5 py-3 font-semibold hover:border-[hsl(var(--accent))] transition"
                >
                  <FiPhone /> WhatsApp
                </a>
                <a
                  href={vcardHref}
                  download={`${NAME.replace(/\s+/g, "_")}.vcf`}
                  className="inline-flex items-center gap-2 rounded-xl border border-[hsl(var(--border)/0.6)] bg-[hsl(var(--card)/0.12)] px-5 py-3 font-semibold hover:border-[hsl(var(--accent))] transition"
                >
                  Save Contact <FiArrowRight />
                </a>
              </div>

              {/* شارات تقنية صغيرة */}
              <div className="mt-5 flex flex-wrap gap-2 text-[12px] text-[hsl(var(--muted-foreground))]">
                <span className="rounded-md border border-[hsl(var(--border)/0.6)] bg-[hsl(var(--card)/0.08)] px-2 py-1">MERN Stack</span>
                <span className="rounded-md border border-[hsl(var(--border)/0.6)] bg-[hsl(var(--card)/0.08)] px-2 py-1">Full-Stack</span>
                <span className="rounded-md border border-[hsl(var(--border)/0.6)] bg-[hsl(var(--card)/0.08)] px-2 py-1">APIs</span>
                <span className="rounded-md border border-[hsl(var(--border)/0.6)] bg-[hsl(var(--card)/0.08)] px-2 py-1">Performance</span>
                <span className="rounded-md border border-[hsl(var(--border)/0.6)] bg-[hsl(var(--card)/0.08)] px-2 py-1">Security</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* CTA سفلي اختياري */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-14 text-center"
        >
          <a
            href={`mailto:${EMAIL}`}
            className="inline-flex items-center justify-center rounded-2xl border border-[hsl(var(--border)/0.6)] bg-[hsl(var(--card)/0.08)] px-6 py-4 text-lg font-semibold hover:border-[hsl(var(--accent))] transition"
          >
            Start a project — let’s talk
          </a>
        </motion.div>
      </div>
    </section>
  );
}





// --- Main Page Component ---
export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <AboutMe />
      <Skills />
      <SkillsList />
      <Services />
      <Works />
      <Contact />
      <Rights />
    </main>
  );
}