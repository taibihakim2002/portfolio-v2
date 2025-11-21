"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useAnimation, AnimatePresence, useReducedMotion, useMotionValue, useMotionTemplate } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Icons Imports (Combined & Cleaned)
import { HiArrowDown } from "react-icons/hi";
import { FaLinkedinIn, FaGithub } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io";
import { TiSocialFacebook } from "react-icons/ti";
import { GoArrowRight, GoArrowUpRight } from "react-icons/go";
import { 
  FiPhone, FiMail, FiMapPin, FiGithub as FiGithubOutline, 
  FiLinkedin as FiLinkedinOutline, FiTwitter, FiCopy, FiCheck, 
  FiClock, FiArrowRight as FiArrowRightIcon, FiCpu, FiLayout, 
  FiServer, FiTool, FiCommand 
} from "react-icons/fi";
import { 
  SiNextdotjs, SiReact, SiTailwindcss, SiTypescript, SiNodedotjs, 
  SiMongodb, SiDocker, SiGit, SiFigma, SiPostgresql, SiGraphql, SiPrisma 
} from "react-icons/si";

// Components
import Header from "@/components/global/Header";
import Rights from "@/components/global/Rights";

// --- DATA CONSTANTS (Organized) ---

const SOCIAL_LINKS = [
  { href: "https://github.com/taibihakim2002", icon: <FaGithub size={20}/> },
  { href: "https://www.facebook.com/hakimtaibi2002/", icon: <TiSocialFacebook size={20}/> },
  { href: "https://www.instagram.com/taibihaakim", icon: <IoLogoInstagram size={20}/> },
  { href: "https://www.linkedin.com/in/taibi-hakim-54432b16b/", icon: <FaLinkedinIn size={20}/> }
];

const PROJECTS_DATA = [
  {
    img: "https://placehold.co/600x400/1e1e2e/6366f1?text=Project+One",
    type: "Web Application",
    name: "E-commerce Platform",
    description: "A full-featured e-commerce platform with a modern UI.",
    tags: ["React", "Next.js", "TailwindCSS"],
    live: "#",
    source: "#",
  },
  {
    img: "https://placehold.co/600x400/1e1e2e/22d3ee?text=Project+Two",
    type: "Landing Page",
    name: "SaaS Website",
    description: "A responsive landing page for a software service.",
    tags: ["HTML", "CSS", "JavaScript"],
    live: "#",
    source: "#",
  },
  {
    img: "https://placehold.co/600x400/1e1e2e/a855f7?text=Project+Three",
    type: "Portfolio",
    name: "Designer Portfolio",
    description: "A creative portfolio website for a graphic designer.",
    tags: ["React", "FramerMotion"],
    live: "#",
    source: "#",
  },
];

const SKILLS_DATA = [
  { name: "Next.js", icon: SiNextdotjs, category: "Frontend", desc: "App Router, SSR, SEO", color: "#ffffff" },
  { name: "React", icon: SiReact, category: "Frontend", desc: "Hooks, Context, Redux", color: "#61DAFB" },
  { name: "TypeScript", icon: SiTypescript, category: "Frontend", desc: "Type Safety, Interfaces", color: "#3178C6" },
  { name: "Tailwind", icon: SiTailwindcss, category: "Frontend", desc: "Responsive, Dark Mode", color: "#38B2AC" },
  { name: "Framer Motion", icon: FiLayout, category: "Frontend", desc: "Complex Animations", color: "#E94E77" },
  { name: "Node.js", icon: SiNodedotjs, category: "Backend", desc: "REST API, Event Loop", color: "#339933" },
  { name: "MongoDB", icon: SiMongodb, category: "Backend", desc: "Aggregation, Indexing", color: "#47A248" },
  { name: "PostgreSQL", icon: SiPostgresql, category: "Backend", desc: "Relational Design", color: "#336791" },
  { name: "Prisma", icon: SiPrisma, category: "Backend", desc: "ORM, Schema Migration", color: "#2D3748" },
  { name: "GraphQL", icon: SiGraphql, category: "Backend", desc: "Apollo, Efficient Queries", color: "#E10098" },
  { name: "Docker", icon: SiDocker, category: "Tools", desc: "Containerization", color: "#2496ED" },
  { name: "Git & GitHub", icon: SiGit, category: "Tools", desc: "CI/CD Actions, Flow", color: "#F05032" },
  { name: "Figma", icon: SiFigma, category: "Tools", desc: "UI/UX Prototyping", color: "#F24E1E" },
  { name: "VS Code", icon: FiCommand, category: "Tools", desc: "Extensions, Debugging", color: "#007ACC" },
];

const SKILLS_LIST_IMAGES = [
  { name: "HTML", icon: "/imgs/html.png" },
  { name: "CSS", icon: "/imgs/css.png" }, 
  { name: "JavaScript", icon: "/imgs/js.png" },
  { name: "Tailwind", icon: "/imgs/tailwind.png" }, 
  { name: "React", icon: "/imgs/react.webp" },
  { name: "Next.js", icon: "/imgs/nextjs.png" },
  { name: "Git", icon: "/imgs/git.png" },
  { name: "Bootstrap", icon: "/imgs/bootstrap.svg" },
];

const TABS = [
  { id: "All", label: "All Stack", icon: FiCpu },
  { id: "Frontend", label: "Frontend", icon: FiLayout },
  { id: "Backend", label: "Backend", icon: FiServer },
  { id: "Tools", label: "DevOps & Tools", icon: FiTool },
];

const SERVICE_ITEMS = [
  {
    title: "Full-Stack Web Applications",
    description: "Designing and shipping complete MERN applications — from data modeling and REST/GraphQL APIs to responsive React UIs and production deployments.",
  },
  {
    title: "SaaS & Dashboard Systems",
    description: "Building subscription-based platforms, admin dashboards, analytics, multi-tenant setups, billing, roles & permissions, and audit-ready activity logs.",
  },
  {
    title: "Performance & Optimization",
    description: "Improving Core Web Vitals, query performance, caching layers (Redis), CDN & image optimization, code splitting, and real-world load tuning.",
  },
  {
    title: "Authentication & Security",
    description: "Implementing robust auth (JWT/Session, OAuth), RBAC, input validation, rate limiting, encryption, and security best practices across the stack.",
  },
];

// --- HELPER COMPONENTS ---

function Fixed({ id }) {
  return (
    <>
      <div className="hidden md:flex flex-col gap-3 fixed top-1/2 -translate-y-1/2 left-4 md:left-6 z-50">
        {SOCIAL_LINKS.map((item, index) => (
          <motion.a 
            key={index}
            href={item.href} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 bg-background/20 backdrop-blur-sm border border-border text-foreground rounded-full cursor-pointer transition-all duration-300 hover:bg-primary hover:text-white hover:scale-110 hover:border-primary"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 + index * 0.1 }}
          >
            {item.icon}
          </motion.a>
        ))}
      </div>
      <span className="bottom-6 end-6 lg:bottom-10 lg:end-10 absolute text-[70px] md:text-[100px] font-black text-foreground/5 select-none">
        0{id}
      </span>
    </>
  );
}

function Background() {
  const reduce = useReducedMotion();

  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_0%,hsl(var(--primary)/0.15)_0%,rgba(0,0,0,0)_60%)]" />
      <div
        className={["pointer-events-none absolute inset-0 opacity-30",
          "[background-image:linear-gradient(hsl(var(--foreground)/0.05)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--foreground)/0.05)_1px,transparent_1px)]",
          "[background-size:32px_32px]",
          reduce ? "" : "animate-grid-move",
        ].join(" ")}
      />
      {/* Glow Beams */}
      <div className="pointer-events-none absolute inset-0 mix-blend-screen opacity-30 overflow-hidden" data-parallax>
        <div className={["absolute -inset-[30%] rotate-12",
          "bg-[conic-gradient(from_0deg,transparent_0deg,hsl(var(--foreground)/0.05)_50deg,transparent_120deg)]",
          reduce ? "" : "animate-slow-rotate",
        ].join(" ")} />
        <div className={["absolute -inset-[30%] -rotate-6",
          "bg-[conic-gradient(from_180deg,transparent_0deg,hsl(var(--accent)/0.08)_40deg,transparent_100deg)]",
          reduce ? "" : "animate-slow-rotate-rev",
        ].join(" ")} />
      </div>
      {/* Aurora */}
      <div className="pointer-events-none absolute -inset-20 blur-3xl opacity-20">
        <div className={["absolute left-1/4 top-1/4 w-2/3 h-2/3 rounded-full",
          "bg-[radial-gradient(circle_at_30%_30%,hsl(var(--primary)/0.2),transparent_60%)]",
          reduce ? "" : "animate-aurora",
        ].join(" ")} />
        <div className={["absolute right-1/5 bottom-1/5 w-1/2 h-1/2 rounded-full",
          "bg-[radial-gradient(circle_at_70%_70%,hsl(var(--accent)/0.15),transparent_60%)]",
          reduce ? "" : "animate-aurora-slow",
        ].join(" ")} />
      </div>
      
      <style jsx global>{`
        @keyframes grid-move { 0% { background-position: 0px 0px, 0px 0px; } 100% { background-position: 64px 64px, 64px 64px; } }
        .animate-grid-move { animation: grid-move 18s linear infinite; }
        @keyframes slow-rotate { to { transform: rotate(372deg); } }
        @keyframes slow-rotate-rev { to { transform: rotate(-372deg); } }
        .animate-slow-rotate { animation: slow-rotate 40s linear infinite; }
        .animate-slow-rotate-rev { animation: slow-rotate-rev 48s linear infinite; }
        @keyframes aurora { 0%,100% { transform: translate3d(0,0,0) } 50% { transform: translate3d(2%, -3%, 0) } }
        @keyframes aurora-slow { 0%,100% { transform: translate3d(0,0,0) } 50% { transform: translate3d(-3%, 2%, 0) } }
        .animate-aurora { animation: aurora 18s ease-in-out infinite; }
        .animate-aurora-slow { animation: aurora-slow 26s ease-in-out infinite; }
        @keyframes twinkle { 0%,100% { opacity: .15; transform: scale(1); } 50% { opacity: .7; transform: scale(1.7); } }
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

  // إعدادات حركة النصوص (ظهور الأحرف)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.3 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { ease: [0.25, 0.1, 0.25, 1], duration: 0.8 },
    },
  };

  return (
    <section
      ref={ref}
      className="w-full min-h-screen relative overflow-hidden bg-background flex items-start lg:items-center justify-center"
    >
      <Background />
      
      <div className="px-4 w-full max-w-6xl mx-auto relative z-10 pt-6 sm:pt-10 lg:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center mt-10 gap-10 lg:gap-0">
          
          {/* ================= Image Section ================= */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, scale: 0.8 },
              visible: { 
                opacity: 1, 
                scale: 1, 
                transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 } 
              },
            }}
            className="order-1 lg:order-2 flex justify-center items-center group h-[240px] sm:h-[300px] lg:h-[500px]"
          >
            <div className="relative w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] lg:w-[370px] lg:h-[370px]">
              {/* الصورة الشخصية */}
              <motion.div className="absolute inset-0 rounded-full z-10" whileHover={{ scale: 1.05 }}>
                <img
                  className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-white/10 bg-black"
                  src="/imgs/my.jpg"
                  alt="Taibi Abdelhakim"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/350x350/191919/6366f1?text=T+A";
                  }}
                />
                <div className="absolute inset-[-10px] border-2 border-primary/40 rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 animate-pulse"></div>
              </motion.div>

              {/* المدارات */}
              {[
                { size: "w-3 h-3", duration: 12, distance: "130px", color: "bg-accent" },
                { size: "w-4 h-4", duration: 18, distance: "160px", color: "bg-primary" },
                { size: "w-2 h-2", duration: 25, distance: "190px", color: "bg-white" },
              ].map((orb, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2"
                  style={{ originX: orb.distance, originY: "0px" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: orb.duration, repeat: Infinity, ease: "linear" }}
                >
                  <div className={`${orb.size} ${orb.color} rounded-full blur-[1px] shadow-[0_0_8px_currentColor]`} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ================= Text Section ================= */}
          <div className="order-2 lg:order-1 text-center lg:text-left rounded-2xl px-6 pt-4 pb-6 lg:p-0">
            
            {/* الاسم */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl font-bold tracking-[0.25em] mb-4 normal-case text-accent"
            >
              TAIBI ABDELHAKIM
            </motion.p>

            {/* العنوان الرئيسي */}
            <motion.h1
              initial="hidden"
              animate={controls}
              variants={containerVariants}
              className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter normal-case leading-[1.1] mb-6"
            >
              {words.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-block whitespace-nowrap mr-4">
                  {word.split("").map((letter, letterIndex) => {
                    const isHighlighted = word === "Developer";
                    return (
                      <motion.span
                        key={letterIndex}
                        variants={letterVariants}
                        className={
                          isHighlighted
                            // ✨ تم إزالة animate-gradient-x والإبقاء على التدرج فقط
                            ? "inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-400 to-accent"
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

            {/* الوصف */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-muted-foreground mt-4 normal-case leading-relaxed"
            >
              I build complete, scalable, and high-performance web applications using the <span className="text-white font-medium">MERN Stack</span> — from backend architecture to polished front-end experiences.
            </motion.p>

            {/* الأزرار */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mt-10"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative font-bold py-4 px-8 rounded-full text-lg text-white bg-primary overflow-hidden group shadow-[0_0_20px_-5px_hsl(var(--primary))]"
              >
                <span className="relative z-10">Explore My Work</span>
                {/* لمعان خفيف عند التمرير */}
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>
              </motion.a>

              <motion.a
                href="/v.pdf"
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative rounded-full text-lg font-bold px-8 py-4 bg-background border border-white/10 text-foreground hover:border-primary hover:bg-primary/5 transition-colors"
              >
                Download CV
              </motion.a>
            </motion.div>

            {/* أيقونات السوشال للموبايل */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2.2 }}
              className="flex md:hidden gap-6 mt-10 justify-center"
            >
              {SOCIAL_LINKS.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  target="_blank"
                  whileHover={{ scale: 1.2, color: "hsl(var(--primary))" }}
                  className="text-2xl text-muted-foreground transition-colors"
                >
                  {item.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <Fixed id={1} />
      <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}
function AboutMe() {
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  useEffect(() => { if (inView) controls.start("visible"); }, [controls, inView]);

  return (
    <section id="about" className="w-full relative bg-background py-24 z-10">
      <div className="text-foreground px-6 sm:px-14 md:px-20 max-w-6xl mx-auto">
        <motion.div
          className="relative text-center mb-16"
          initial={{ opacity: 0, y: 20 }} animate={controls} variants={{ visible: { opacity: 1, y: 0 }, hidden: { opacity: 0, y: 20 } }} transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter">
            A Bit <span className="bg-gradient-to-r from-accent via-primary to-secondary-foreground bg-clip-text text-transparent">About</span> Me
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto normal-case">My passion, my code, and my story.</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            ref={ref} className="order-1 lg:order-1 mx-auto"
            initial="hidden" animate={controls} variants={{ hidden: { opacity: 0, scale: 0.8, rotate: -10 }, visible: { opacity: 1, scale: 1, rotate: 3, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }}
          >
            <div className="group relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px]">
              <div className="absolute inset-0 bg-card/80 border-2 border-primary/20 rounded-2xl transform -rotate-6 transition-transform duration-500 group-hover:rotate-0"></div>
              <img
                className="relative w-full h-full object-cover rounded-2xl shadow-xl border-4 border-white/5 transform rotate-3 transition-transform duration-500 group-hover:rotate-0"
                src="/imgs/my2.jpg" alt="Taibi Abdelhakim"
                onError={(e) => { e.currentTarget.src = 'https://placehold.co/400x400/191919/6366f1?text=T+A'; }}
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            className="order-2 lg:order-2 text-center lg:text-left"
            initial="hidden" animate={controls} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}
          >
            <motion.h3 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
              Full Stack MERN Developer based in Algeria
            </motion.h3>
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
              <p>Hello! I'm Taibi Abdelhakim, a passionate Full Stack Developer specializing in the <strong className="text-primary">MERN</strong> stack. My journey in tech began with a deep curiosity which evolved into a passion for building robust web applications.</p>
              <p>I thrive on solving complex problems. Whether it's crafting a pixel-perfect frontend with <strong className="text-primary">React & Next.js</strong> or building a secure backend with <strong className="text-primary">Node.js & MongoDB</strong>, I am dedicated to exceptional digital experiences.</p>
            </motion.div>
            <motion.a
              href="#contact" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}
              className="inline-flex items-center gap-2 bg-transparent border-2 border-primary text-primary font-bold py-3 px-8 rounded-full text-lg transition-all hover:bg-primary hover:text-white mt-8"
            >
              Let's Connect <GoArrowRight size={20} />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SkillCard({ skill }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}
      onMouseMove={handleMouseMove}
      className="group relative rounded-xl border border-border bg-card/40 p-4 hover:border-primary/50 overflow-hidden"
    >
      {/* Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{ background: useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.06), transparent 80%)` }}
      />
      <div className="relative z-10 flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-background border border-border text-2xl transition-colors duration-300 group-hover:border-primary/50">
          <skill.icon style={{ color: skill.color }} className="opacity-80 group-hover:opacity-100 transition-opacity" />
        </div>
        <div className="flex flex-col">
          <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">{skill.name}</h3>
          <span className="text-xs font-medium text-accent mb-1">{skill.category}</span>
          <p className="text-xs text-muted-foreground group-hover:text-foreground/80 transition-colors line-clamp-2">{skill.desc}</p>
        </div>
      </div>
    </motion.div>
  );
}
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

// استيراد ملفات تنسيق Swiper الضرورية
import "swiper/css";
import "swiper/css/free-mode";



function Skills() {
  const [activeTab, setActiveTab] = useState("All");
  
  // تصفية المهارات بناءً على التبويب المختار
  const filteredSkills = SKILLS_DATA.filter((skill) => activeTab === "All" || skill.category === activeTab);

  return (
    <section id="skills" className="relative py-16 md:py-24 bg-background overflow-hidden">
      {/* --- خلفيات جمالية (Decorations) --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--foreground)/0.03)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.03)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute right-0 top-0 -mt-20 -mr-20 w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full bg-primary/10 blur-[80px] md:blur-[100px]"></div>
      <div className="absolute left-0 bottom-0 -mb-20 -ml-20 w-[200px] h-[200px] md:w-[300px] md:h-[300px] rounded-full bg-accent/5 blur-[80px] md:blur-[100px]"></div>

      <div className="container relative z-10 mx-auto px-4 md:px-6 max-w-6xl">
        
        {/* --- منطقة العنوان والفلتر --- */}
        <div className="mb-12 md:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          
          {/* النصوص */}
          <div className="text-center md:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium mb-4 mx-auto md:mx-0"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Tech Ecosystem
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold text-foreground tracking-tight"
            >
              My Arsenal
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: 0.2 }}
              className="text-muted-foreground mt-3 max-w-lg mx-auto md:mx-0 text-sm md:text-base leading-relaxed"
            >
              The tools and technologies I use to bring products to life.
            </motion.p>
          </div>

          {/* --- Swiper Tabs (الحل النهائي للمشكلة) --- */}
          {/* max-w-full تضمن عدم تجاوز عرض الشاشة */}
          <div className="w-full md:w-auto max-w-[100vw] overflow-hidden">
             <div className="p-1 bg-card/80 backdrop-blur-md border border-border rounded-xl md:min-w-max mx-auto md:mx-0">
                <Swiper
                  modules={[FreeMode]}
                  slidesPerView="auto" // يسمح للعناصر بأخذ عرضها الطبيعي
                  spaceBetween={8}     // المسافة بين الأزرار
                  freeMode={true}      // تفعيل التمرير الحر
                  className="w-full"
                >
                  {TABS.map((tab) => (
                    // style={{ width: 'auto' }} ضروري جداً لكي لا يتمدد العنصر ليملأ الشاشة
                    <SwiperSlide key={tab.id} style={{ width: 'auto' }}>
                      <button
                          onClick={() => setActiveTab(tab.id)}
                          className={`
                          relative flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap
                          ${activeTab === tab.id ? "text-white" : "text-muted-foreground hover:text-foreground"}
                          `}
                      >
                          {activeTab === tab.id && (
                          <motion.div 
                              layoutId="active-pill" 
                              className="absolute inset-0 bg-primary rounded-lg shadow-lg shadow-primary/20" 
                              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} 
                          />
                          )}
                          <span className="relative z-10 flex items-center gap-2">
                          <tab.icon size={16} /> {tab.label}
                          </span>
                      </button>
                    </SwiperSlide>
                  ))}
                </Swiper>
             </div>
          </div>
        </div>

        {/* --- شبكة البطاقات --- */}
        <motion.div 
            layout 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => ( 
                <SkillCard key={skill.name} skill={skill} /> 
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
function SkillsList() {
  return (
    <section className="py-8 bg-background border-y border-border/50">
      <div className="relative flex overflow-hidden group">
        <motion.div className="flex" animate={{ x: ['0%', '-100%'] }} transition={{ ease: 'linear', duration: 25, repeat: Infinity }}>
          {[...SKILLS_LIST_IMAGES, ...SKILLS_LIST_IMAGES].map((skill, index) => (
            <div key={index} className="flex-shrink-0 mx-12 flex items-center justify-center gap-4 w-48 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
              <img src={skill.icon} alt={skill.name} className="h-14 w-14 object-contain" onError={(e) => { e.currentTarget.style.display='none'; }} />
              <span className="text-2xl font-bold text-muted-foreground group-hover:text-foreground">{skill.name}</span>
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

  return (
    <section id="services" className="w-full py-24 relative z-10 bg-background flex flex-col items-center justify-center">
      <div className="relative text-center mb-16 px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8 }}
          className="text-5xl lg:text-7xl font-bold tracking-tighter"
        >
          What I <span className="text-primary">Offer</span>
        </motion.h2>
      </div>

      <motion.div
        ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"}
        variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        className="w-full max-w-3xl" onMouseLeave={() => setExpandedIndex(null)}
      >
        {SERVICE_ITEMS.map((item, index) => (
          <motion.div
            key={index}
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="relative border-t border-border group"
            onHoverStart={() => setExpandedIndex(index)}
          >
            <h3 className="text-3xl font-bold tracking-tight p-8 cursor-pointer flex justify-between items-center text-foreground group-hover:text-primary transition-colors">
              <span>{item.title}</span>
              <GoArrowUpRight className={`transition-transform duration-300 ${expandedIndex === index ? "rotate-45 text-primary" : "text-muted-foreground"}`} />
            </h3>
            <AnimatePresence>
              {expandedIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-8 pb-8 text-muted-foreground text-lg">{item.description}</p>
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

  useEffect(() => { if (inView) controls.start("visible"); }, [controls, inView]);

  const categories = useMemo(() => ["All", ...Array.from(new Set(PROJECTS_DATA.map(p => p.type)))], []);
  const filtered = useMemo(() => active === "All" ? PROJECTS_DATA : PROJECTS_DATA.filter(p => p.type === active), [active]);

  return (
    <section id="projects" className="relative z-10 bg-background py-20">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(60rem 60rem at 20% -10%, hsl(var(--secondary)/.14), transparent 60%), radial-gradient(50rem 50rem at 80% 10%, hsl(var(--accent)/.12), transparent 55%)" }} />
      <div className="relative text-foreground px-6 sm:px-12 md:px-20 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tighter">
            Featured <span className="bg-gradient-to-r from-accent via-primary to-secondary-foreground bg-clip-text text-transparent">Projects</span>
          </h2>
          <p className="mt-3 text-muted-foreground">A visual wall of selected work.</p>
        </div>

        <motion.div ref={ref} initial="hidden" animate={controls} variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c} onClick={() => setActive(c)}
              className={`relative rounded-full px-4 py-2 text-sm transition ${active === c ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <span className={`absolute inset-0 rounded-full -z-10 transition border ${active === c ? "border-transparent bg-primary" : "border-border bg-card/50"}`} />
              {c}
            </button>
          ))}
        </motion.div>

        <motion.div initial="hidden" animate={controls} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }} className="columns-1 sm:columns-2 lg:columns-3 gap-6">
          {filtered.map((ele, index) => (
            <motion.article
              key={index}
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="mb-6 break-inside-avoid rounded-2xl overflow-hidden border border-border bg-card/50 backdrop-blur-sm group hover:border-primary/50 transition-colors"
            >
              <div className="relative">
                <img
                  className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                  src={ele.img} alt={ele.name} loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-background/80 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute top-3 left-3 text-[11px] font-semibold bg-background/80 backdrop-blur-sm border border-border text-foreground px-2 py-1 rounded-full">{ele.type}</span>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold tracking-tight mb-1 group-hover:text-primary transition-colors">{ele.name}</h3>
                <p className="text-muted-foreground text-sm normal-case line-clamp-3">{ele.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {ele.tags.map((tag, i) => (
                    <span key={i} className="text-[11px] font-semibold bg-secondary/50 border border-border px-2 py-1 rounded-full text-secondary-foreground">{tag}</span>
                  ))}
                </div>
                <div className="flex gap-4 text-sm mt-5 opacity-80 group-hover:opacity-100 transition">
                  <a href={ele.live} target="_blank" rel="noopener noreferrer" className="flex gap-1 items-center font-semibold hover:text-primary transition">Live <GoArrowUpRight /></a>
                  <a href={ele.source} target="_blank" rel="noopener noreferrer" className="flex gap-1 items-center font-semibold hover:text-primary transition">Code <GoArrowUpRight /></a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Contact() {
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  useEffect(() => { if (inView) controls.start("visible"); }, [controls, inView]);

  const NAME = "Taibi Abdelhakim";
  const EMAIL = "taibihakim2002@gmail.com";
  const PHONE = "+213 555 000 000";
  const WHATSAPP = "+213555000000";
  const LOCATION = "Algeria (Remote-friendly)";
  const RESPONSE = "Typically replies within 24–48h";

  const [copied, setCopied] = useState(null);
  const copy = async (key , value) => {
    try { await navigator.clipboard?.writeText(value); setCopied(key); setTimeout(() => setCopied(null), 1400); } catch {}
  };

  return (
    <section id="contact" className="w-full py-24 relative bg-background overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ backgroundImage: "radial-gradient(60rem 40rem at 15% 0%, hsl(var(--accent)/.12), transparent 60%), radial-gradient(50rem 50rem at 85% 10%, hsl(var(--secondary)/.12), transparent 55%)" }} />
      <div className="relative z-10 text-foreground px-6 sm:px-12 max-w-7xl mx-auto">
        <motion.div ref={ref} initial="hidden" animate={controls} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }} className="text-center mb-14">
          <motion.h2 variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }} className="text-4xl md:text-6xl font-extrabold tracking-tight">Let’s build something great.</motion.h2>
          <motion.p variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }} className="max-w-2xl mx-auto mt-3 text-muted-foreground">Available for Full-Stack MERN projects, consulting, and performance work.</motion.p>
        </motion.div>

        <motion.div initial="hidden" animate={controls} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }} className="grid grid-cols-1 lg:grid-cols-12 gap-7">
          {/* Info Card */}
          <motion.div variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }} className="lg:col-span-6 relative rounded-2xl border border-border bg-card/40 backdrop-blur-md p-6">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground"><span className="size-2 rounded-full bg-accent" /><span>Contacts</span></div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground"><FiClock className="opacity-80" /><span>{RESPONSE}</span></div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="grid place-items-center size-10 rounded-lg bg-background border border-border"><FiMail /></span>
                  <div className="min-w-0"><div className="text-sm text-muted-foreground">Email</div><a href={`mailto:${EMAIL}`} className="font-semibold break-all hover:text-primary">{EMAIL}</a></div>
                </div>
                <button onClick={() => copy("email", EMAIL)} className="rounded-md border border-border bg-card p-2 hover:bg-secondary transition">{copied === "email" ? <FiCheck /> : <FiCopy />}</button>
              </div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="grid place-items-center size-10 rounded-lg bg-background border border-border"><FiPhone /></span>
                  <div className="min-w-0"><div className="text-sm text-muted-foreground">Phone / WhatsApp</div><div className="font-semibold">{PHONE}</div></div>
                </div>
                <button onClick={() => copy("phone", PHONE)} className="rounded-md border border-border bg-card p-2 hover:bg-secondary transition">{copied === "phone" ? <FiCheck /> : <FiCopy />}</button>
              </div>
              <div className="flex items-start gap-3">
                <span className="grid place-items-center size-10 rounded-lg bg-background border border-border"><FiMapPin /></span>
                <div><div className="text-sm text-muted-foreground">Location</div><div className="font-semibold">{LOCATION}</div></div>
              </div>
            </div>
          </motion.div>
          
          {/* CTA Card */}
          <motion.div variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }} className="lg:col-span-6 relative rounded-2xl border border-border bg-card/40 backdrop-blur-md p-6 overflow-hidden">
             <span aria-hidden className="pointer-events-none absolute -inset-20 blur-3xl opacity-60" style={{ background: "radial-gradient(40rem 22rem at 70% 20%, hsl(var(--primary)/0.15), transparent 60%)" }} />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-[12px] text-muted-foreground"><span className="size-1.5 rounded-full bg-accent" />Open to new projects</div>
              <h3 className="mt-4 text-3xl md:text-4xl font-extrabold tracking-tight">Work with me on your next<br />full-stack MERN project.</h3>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground px-5 py-3 font-semibold hover:bg-primary/90 transition"><FiMail /> Email me</a>
                <a href={`https://wa.me/${WHATSAPP}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/60 px-5 py-3 font-semibold hover:border-primary transition"><FiPhone /> WhatsApp</a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// --- Main Page Component ---
export default function HomePage() {
  return (
    <main className="selection:bg-primary selection:text-white">
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