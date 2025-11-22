"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useAnimation, AnimatePresence, useReducedMotion, useMotionValue, useMotionTemplate } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

// Icons Imports
import { FaLinkedinIn, FaGithub } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io";
import { TiSocialFacebook } from "react-icons/ti";
import { GoArrowRight, GoArrowUpRight } from "react-icons/go";
import { 
  FiPhone, FiMail, FiMapPin, FiCopy, FiCheck, 
  FiClock, FiCpu, FiLayout, FiServer, FiTool,
  FiCode,
  FiLock
} from "react-icons/fi";
import { 
  SiNextdotjs, SiReact, SiTailwindcss, SiTypescript, SiNodedotjs, 
  SiMongodb, SiDocker, SiGit, SiFigma, SiPostgresql, SiGraphql, SiPrisma 
} from "react-icons/si";

// Styles Imports
import "swiper/css";
import "swiper/css/free-mode";

// Components (افتراض وجودها)
import Header from "@/components/global/Header";
import Rights from "@/components/global/Rights";
import Link from "next/link";

// --- DATA CONSTANTS ---
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
  // { name: "VS Code", icon: FiCommand, category: "Tools", desc: "Extensions, Debugging", color: "#007ACC" }, // FiCommand not imported in your snippet
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

// const SERVICE_ITEMS = [
//   {
//     title: "Full-Stack Web Applications",
//     description: "Designing and shipping complete MERN applications — from data modeling and REST/GraphQL APIs to responsive React UIs and production deployments.",
//   },
//   {
//     title: "SaaS & Dashboard Systems",
//     description: "Building subscription-based platforms, admin dashboards, analytics, multi-tenant setups, billing, roles & permissions, and audit-ready activity logs.",
//   },
//   {
//     title: "Performance & Optimization",
//     description: "Improving Core Web Vitals, query performance, caching layers (Redis), CDN & image optimization, code splitting, and real-world load tuning.",
//   },
//   {
//     title: "Authentication & Security",
//     description: "Implementing robust auth (JWT/Session, OAuth), RBAC, input validation, rate limiting, encryption, and security best practices across the stack.",
//   },
// ];

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

// ✨ الخلفية الجديدة الموحدة (من التصميم الجديد)
// استبدل دالة GlobalBackground الحالية بهذه:
function GlobalBackground() {
  return (
    // إضافة force-gpu لمنع إعادة المعالجة عند السكرول
    <div className="fixed inset-0 z-0 pointer-events-none force-gpu">
      {/* Noise - استخدام صورة خفيفة جداً */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
      
      {/* الغلوز (Glows) - نضيف لها translate3d لتثبيتها في الذاكرة */}
      <div className="absolute top-[-20%] left-[-10%] w-[700px] h-[700px] bg-primary/10 rounded-full blur-[120px] force-gpu" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px] force-gpu" />
    </div>
  );
}


function Hero() {
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  return (
    <section
      ref={ref}
      className="w-full min-h-screen relative overflow-hidden bg-transparent flex items-start lg:items-center justify-center pt-20 lg:pt-0"
    >
      
      <div className="px-4 w-full max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-8">
          
          {/* ================= Image Section (Right/Bottom) - تم التحسين هنا ================= */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, scale: 0.8, rotate: -5 },
              visible: { 
                opacity: 1, 
                scale: 1, 
                rotate: 0,
                transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.5 } 
              },
            }}
            className="order-1 lg:order-2 flex justify-center items-center relative"
          >
            {/* 1. توهج خلفي قوي ومحسن للصورة (مزيج ألوان) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] lg:w-[500px] lg:h-[500px] bg-gradient-to-tr from-primary/20 to-accent/20 blur-[100px] rounded-full -z-20 animate-pulse"></div>

            <div className="relative w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] flex justify-center items-center">
              
              {/* 2. حلقة خلفية إضافية لإعطاء عمق (Outer Ring Layer) */}
              <div className="absolute inset-[-15px] rounded-full bg-gradient-to-tr from-primary/30 via-transparent to-accent/30 blur-md border border-white/5 -z-10 animate-spin-slow opacity-70"></div>
              
              {/* 3. حاوية الصورة الرئيسية مع إطار متدرج (Main Image Container with Gradient Border) */}
              <motion.div 
                className="relative z-10 rounded-full p-[3px] bg-gradient-to-tr from-primary via-white/20 to-accent shadow-2xl shadow-primary/20"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                {/* الصورة داخل الحاوية */}
                <div className="rounded-full overflow-hidden bg-zinc-950 w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] lg:w-[400px] lg:h-[400px] relative">
                  <img
                    className="w-full h-full object-cover rounded-full"
                    src="/imgs/my.jpg"
                    alt="Taibi Abdelhakim"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/400x400/191919/6366f1?text=T+A";
                    }}
                  />
                  {/* طبقة لمعان خفيفة فوق الصورة */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent opacity-30 mix-blend-overlay"></div>
                </div>
              </motion.div>

              {/* 4. المدارات المحسنة (مع إضافة blur خفيف لتبدو مشعة) */}
              {[
                { size: "w-3 h-3", duration: 15, distance: "140px", color: "bg-accent shadow-[0_0_15px_hsl(var(--accent))]" },
                { size: "w-4 h-4", duration: 20, distance: "180px", color: "bg-primary shadow-[0_0_20px_hsl(var(--primary))]" },
                { size: "w-2 h-2", duration: 25, distance: "220px", color: "bg-white shadow-[0_0_10px_white]" },
              ].map((orb, i) => (
                <motion.div
                  key={i}
                  className="absolute top-1/2 left-1/2 z-0" // z-0 لتكون خلف الصورة الرئيسية
                  style={{ originX: orb.distance, originY: "0px" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: orb.duration, repeat: Infinity, ease: "linear" }}
                >
                  <div className={`${orb.size} ${orb.color} rounded-full blur-[1px]`} />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ================= Text Section (Left) ================= */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            
            {/* شارة الحالة */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6 mx-auto lg:mx-0"
            >
               <span className="relative flex h-2 w-2">
                 <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                 <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
               </span>
               <span className="text-xs font-bold text-primary tracking-widest uppercase">Full Stack Developer</span>
            </motion.div>

            {/* الاسم */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
               <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-black tracking-tighter leading-[1.1] mb-6 text-white">
                 TAIBI{' '}
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-400 to-zinc-600">
                   ABDELHAKIM.
                 </span>
               </h1>
            </motion.div>

            {/* الوصف */}
            <motion.p
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.4 }}
  className="max-w-lg mx-auto lg:mx-0 text-lg text-zinc-400 leading-relaxed mb-8"
>
  Building scalable, high-performance web applications with the <span className="text-white font-semibold border-b border-primary/50">MERN Stack</span>.
</motion.p>

            {/* الأزرار */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative font-bold py-4 px-8 rounded-full text-lg text-white bg-primary overflow-hidden shadow-[0_0_40px_-10px_hsl(var(--primary)/0.5)]"
              >
                <span className="relative z-10 flex justify-center items-center gap-2">
                  Explore Work <GoArrowRight className="group-hover:translate-x-1 transition-transform"/>
                </span>
                <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>
              </motion.a>

              <motion.a
                href="/v.pdf"
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative rounded-full text-lg font-bold px-8 py-4 bg-white/5 border border-white/10 text-white hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-sm"
              >
                Download CV
              </motion.a>
            </motion.div>

            {/* السوشال للموبايل */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex md:hidden gap-6 mt-12 justify-center"
            >
              {SOCIAL_LINKS.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.href}
                  target="_blank"
                  className="text-zinc-500 hover:text-white transition-colors text-2xl"
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
        @keyframes shimmer { 100% { transform: translateX(100%); } }
        /* إضافة حركة دوران بطيئة للحلقة الخارجية */
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
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
    <section id="about" className="w-full relative bg-transparent py-24 z-10">
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

function Skills() {
  const [activeTab, setActiveTab] = useState("All");
  const filteredSkills = SKILLS_DATA.filter((skill) => activeTab === "All" || skill.category === activeTab);

  return (
    <section id="skills" className="relative py-24">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6">
        
        {/* Header + Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-2">Tech Arsenal</h2>
            <p className="text-zinc-400">The tools I use to bring ideas to life.</p>
          </div>
          
          {/* Swiper Tabs (Mobile Optimized) */}
          <div className="w-full md:w-auto max-w-[100vw] overflow-hidden">
             <div className="p-1 bg-white/5 border border-white/10 rounded-xl md:min-w-max">
                <Swiper modules={[FreeMode]} slidesPerView="auto" spaceBetween={8} freeMode={true} className="w-full">
                  {TABS.map((tab) => (
                    <SwiperSlide key={tab.id} style={{ width: 'auto' }}>
                      <button
                          onClick={() => setActiveTab(tab.id)}
                          className={`relative flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab.id ? "text-white" : "text-zinc-500 hover:text-white"}`}
                      >
                          {activeTab === tab.id && (
                            <motion.div layoutId="active-pill" className="absolute inset-0 bg-primary rounded-lg" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                          )}
                          <span className="relative z-10 flex items-center gap-2"><tab.icon size={16} /> {tab.label}</span>
                      </button>
                    </SwiperSlide>
                  ))}
                </Swiper>
             </div>
          </div>
        </div>

        {/* Modern Grid Cards */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                layout
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative p-4 rounded-2xl bg-card/30 border border-white/5 hover:border-primary/30 transition-all hover:-translate-y-1"
              >
                {/* Hover Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                
                <div className="relative z-10 flex items-center gap-4">
                  {/* Icon Box */}
                  <div className="p-3 rounded-xl bg-zinc-900/80 border border-white/10 text-2xl group-hover:scale-110 transition-transform text-white shadow-lg">
                    <skill.icon style={{ color: skill.color }} />
                  </div>
                  {/* Text */}
                  <div>
                    <h4 className="font-bold text-white text-base">{skill.name}</h4>
                    <p className="text-xs text-zinc-500">{skill.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

function SkillsList() {
  return (
    <section className="py-8 bg-transparent border-y border-border/50">
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
// تحديث بيانات الخدمات لتشمل الأيقونات المناسبة
const SERVICE_ITEMS = [
  {
    title: "Full-Stack Web Apps",
    description: "Building end-to-end solutions from database architecture to pixel-perfect frontends using the MERN ecosystem.",
    icon: FiCode,
  },
  {
    title: "SaaS & Dashboards",
    description: "Developing scalable subscription platforms with admin panels, analytics, and role-based access control (RBAC).",
    icon: FiLayout,
  },
  {
    title: "Performance Tuning",
    description: "Optimizing Core Web Vitals, server response times, and implementing caching strategies (Redis) for lightning-fast load times.",
    icon: FiCpu,
  },
  {
    title: "Auth & Security",
    description: "Securing applications with robust authentication (JWT, OAuth), data encryption, and protection against common vulnerabilities.",
    icon: FiLock,
  },
];

function Services() {
  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* --- Background Decoration (Optional subtle glow) --- */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* --- Header --- */}
        <div className="mb-16 md:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6"
          >
            What I <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Offer.</span>
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, width: 0 }} 
            whileInView={{ opacity: 1, width: 100 }} 
            viewport={{ once: true }}
            className="h-1 bg-gradient-to-r from-primary to-transparent rounded-full mb-6"
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-lg max-w-2xl leading-relaxed"
          >
            I don't just write code; I deliver complete, engineering-grade solutions designed to scale and perform.
          </motion.p>
        </div>

        {/* --- Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {SERVICE_ITEMS.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative p-8 rounded-[2rem] border border-white/5 bg-card/20 backdrop-blur-sm hover:bg-card/40 hover:border-primary/30 transition-all duration-500"
            >
              {/* Hover Glow Effect inside card */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[2rem]" />

              <div className="relative z-10 flex flex-col sm:flex-row gap-6 items-start">
                {/* Icon Box */}
                <div className="shrink-0 p-4 rounded-2xl bg-zinc-900/80 border border-white/10 shadow-lg group-hover:scale-110 group-hover:border-primary/50 transition-all duration-300">
                  <item.icon className="text-3xl text-white group-hover:text-primary transition-colors" />
                </div>

                {/* Text Content */}
                <div>
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
import { FiGithub, FiExternalLink, FiGithubOutline  } from "react-icons/fi"; 

function Works() {
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const [active, setActive] = useState("All");

  useEffect(() => { if (inView) controls.start("visible"); }, [controls, inView]);

  // استخراج التصنيفات الفريدة
  const categories = useMemo(() => ["All", ...Array.from(new Set(PROJECTS_DATA.map(p => p.type)))], []);
  
  // تصفية المشاريع
  const filtered = useMemo(() => active === "All" ? PROJECTS_DATA : PROJECTS_DATA.filter(p => p.type === active), [active]);

  return (
    <section id="projects" className="relative z-10 bg-transparent py-24">
      <div className="w-full max-w-6xl mx-auto px-4 md:px-6 relative z-10">
        
        {/* --- Header --- */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-4xl lg:text-6xl font-black tracking-tighter text-white mb-4"
          >
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Projects</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-zinc-400 max-w-2xl mx-auto"
          >
            A visual wall of selected work. Click to see details.
          </motion.p>
        </div>

        {/* --- Filter Buttons --- */}
        <motion.div 
          ref={ref} 
          initial="hidden" animate={controls} 
          variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} 
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((c) => (
            <button
              key={c} 
              onClick={() => setActive(c)}
              className={`relative px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${active === c ? "bg-white text-black shadow-lg shadow-white/10" : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-white/5"}`}
            >
              {c}
            </button>
          ))}
        </motion.div>

        {/* --- Projects Grid --- */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.article
                layout
                key={project.id || index} // يفضل استخدام id فريد
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }} 
                exit={{ opacity: 0, scale: 0.9 }} 
                transition={{ duration: 0.3 }}
                className="group relative bg-card/40 border border-white/10 rounded-[2rem] overflow-hidden hover:border-primary/40 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
              >
                {/* --- Image Container (Link to Details) --- */}
                <Link href={`/projects/${project.id}`} className="block relative h-60 overflow-hidden cursor-pointer">
                  {/* صورة المشروع */}
                  <img 
                    src={project.img} 
                    alt={project.name} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                    loading="lazy"
                    onError={(e) => e.currentTarget.src = 'https://placehold.co/600x400/1e1e2e/6366f1?text=Project'}
                  />
                  
                  {/* Overlay Dark Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                  {/* Category Badge (Top Left) */}
                  <div className="absolute top-4 left-4 z-20">
                     <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] text-white font-bold uppercase tracking-wider shadow-lg">
                       {project.type}
                     </span>
                  </div>

                  {/* ✨ View Details Button (Centered, appears on hover) */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-30">
                    <span className="px-6 py-3 rounded-full bg-primary/90 text-white font-bold text-sm flex items-center gap-2 backdrop-blur-sm shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      View Details <GoArrowRight className="text-lg" />
                    </span>
                  </div>
                </Link>

                {/* --- Content --- */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <Link href={`/projects/${project.id}`} className="group-hover:text-primary transition-colors">
                      <h3 className="text-2xl font-bold text-white leading-tight">{project.name}</h3>
                    </Link>
                    
                    {/* Quick External Links */}
                    <div className="flex gap-2">
                       {project.live && (
                         <a href={project.live} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 text-zinc-400 hover:bg-white hover:text-black transition-colors" title="Live Demo">
                           <GoArrowUpRight size={18} />
                         </a>
                       )}
                       {project.source && (
                         <a href={project.source} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-white/5 text-zinc-400 hover:bg-white hover:text-black transition-colors" title="Source Code">
                           <FiGithub size={18} />
                         </a>
                       )}
                    </div>
                  </div>
                  
                  <p className="text-zinc-400 text-sm mb-6 line-clamp-3 flex-grow leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                    {project.tags && project.tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-lg bg-white/5 text-[11px] font-medium text-zinc-300 border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
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
    <section id="contact" className="w-full py-24 relative bg-transparent overflow-hidden">
      {/* ✨ تم إزالة التدرج الخلفي القديم من هنا */}
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
    <main className="selection:bg-primary selection:text-white relative min-h-screen bg-background">
      {/* ✨ الخلفية الجديدة الموحدة خلف كل شيء */}
      <GlobalBackground />
      
      <div className="relative z-10">
        <Header />
        <Hero />
        <AboutMe />
        <Skills />
        <SkillsList />
        <Services />
        <Works />
        <Contact />
        <Rights />
      </div>
    </main>
  );
}