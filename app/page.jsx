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



// --- Section Components ---


function Hero() {
  const controls = useAnimation();
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const canvasRef = useRef(null);

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // --- (كود الـ Particle Constellation Effect لم يتغير) ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particlesArray = [];
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });

    class Particle {
        constructor(x, y, directionX, directionY, size, color) {
            this.x = x;
            this.y = y;
            this.directionX = directionX;
            this.directionY = directionY;
            this.size = size;
            this.color = color;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
        }
        update() {
            if (this.x > canvas.width || this.x < 0) {
                this.directionX = -this.directionX;
            }
            if (this.y > canvas.height || this.y < 0) {
                this.directionY = -this.directionY;
            }
            this.x += this.directionX;
            this.y += this.directionY;
            this.draw();
        }
    }

    function init() {
        particlesArray = [];
        let numberOfParticles = (canvas.height * canvas.width) / 9000;
        for (let i = 0; i < numberOfParticles; i++) {
            let size = (Math.random() * 2) + 1;
            let x = (Math.random() * ((innerWidth - size * 2) - (size * 2)) + size * 2);
            let y = (Math.random() * ((innerHeight - size * 2) - (size * 2)) + size * 2);
            let directionX = (Math.random() * .4) - .2;
            let directionY = (Math.random() * .4) - .2;
            let color = 'rgba(234, 179, 8, 0.2)';
            particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
        }
    }

    function connect() {
        let opacityValue = 1;
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
                    + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                    opacityValue = 1 - (distance / 20000);
                    ctx.strokeStyle = `rgba(255, 255, 255, ${opacityValue * 0.5})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        animationFrameId = requestAnimationFrame(animate);
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
        }
        connect();
    }

    init();
    animate();

    return () => {
        window.cancelAnimationFrame(animationFrameId);
        window.removeEventListener('resize', () => {});
    }
  }, []);
  // --- (نهاية كود الـ Particle) ---


  const text = "Creative Designer & Developer";
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
      transition: {
        ease: [0.22, 1, 0.36, 1],
        duration: 0.8,
      },
    },
  };

  const imageContainerVariants = {
      hidden: { opacity: 0, scale: 0.8 },
      visible: {
          opacity: 1,
          scale: 1,
          transition: {
              duration: 1.2,
              ease: [0.16, 1, 0.3, 1],
              delay: 1.0 
          }
      }
  };

  return (
    <section 
      ref={ref} 
      className="w-full min-h-screen relative overflow-hidden bg-background flex items-start lg:items-center justify-center"
    >
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0"></canvas>
      
      <div className="px-4 w-full max-w-6xl mx-auto relative z-10 pt-6 sm:pt-10 lg:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            <motion.div
                variants={imageContainerVariants}
                initial="hidden"
                animate={controls}
                className="order-1 lg:order-2 flex justify-center items-center group h-[240px] sm:h-[300px] lg:h-[500px]"
            >
                <div className="relative w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] lg:w-[370px] lg:h-[370px]">
                    {/* Central Image */}
                    <motion.div 
                        className="absolute inset-0 rounded-full"
                        whileHover={{ scale: 1.05 }}
                    >
                        <img
                            className="w-full h-full object-cover rounded-full shadow-2xl border-4 border-white/10"
                            src="/imgs/my.jpg"
                            alt="Taibi Abdelhakim"
                            onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/350x350/191919/eab308?text=T+A'; }}
                        />
                        <div className="absolute inset-[-10px] border-2 border-main rounded-full opacity-0 transition-opacity duration-500 group-hover:opacity-100 animate-pulse"></div>
                    </motion.div>

                    {/* Orbs */}
                    {[
                        { size: 'w-6 h-6', duration: 10, distance: '130px' },
                        { size: 'w-3 h-3', duration: 15, distance: '150px' },
                        { size: 'w-5 h-5', duration: 20, distance: '170px' },
                    ].map((orb, i) => (
                        <motion.div
                            key={i}
                            className="absolute top-1/2 left-1/2"
                            style={{ originX: orb.distance, originY: '0px' }}
                            animate={{ rotate: 360 }}
                            transition={{
                                duration: orb.duration,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            <div className={`${orb.size} bg-main/50 rounded-full blur-sm transition-all duration-500 group-hover:bg-main`}></div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            <div className="order-2 lg:order-1 text-center lg:text-left rounded-2xl px-6 pt-4 pb-6 lg:p-0 ">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl text-main font-semibold tracking-[0.2em] mb-4 normal-case"
                >
                    Taibi Abdelhakim
                </motion.p>

                <motion.h1
                    variants={containerVariants}
                    initial="hidden"
                    animate={controls}
                    className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter normal-case leading-tight"
                    aria-label={text}
                >
                    {words.map((word, wordIndex) => (
                        <span key={wordIndex} className="inline-block whitespace-nowrap mr-4">
                            {word.split('').map((letter, letterIndex) => {
                                const isHighlighted = word === "Designer" || word === "Developer";
                                return (
                                    <motion.span
                                        key={letterIndex}
                                        variants={letterVariants}
                                        className={`inline-block ${isHighlighted ? 'text-main' : ''}`}
                                    >
                                        {letter}
                                    </motion.span>
                                );
                            })}
                        </span>
                    ))}
                </motion.h1>
                
                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2.2 }}
                    className="max-w-xl mx-auto lg:mx-0 text-base sm:text-lg text-gray-400 mt-8 normal-case"
                >
                    I design and build beautiful, high-performance digital experiences from concept to code.
                </motion.p>
                
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 2.4 }}
                    className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mt-10"
                >
                    <motion.a 
                        href="#projects" 
                        className="bg-main text-black font-bold py-3 px-8 rounded-full text-lg normal-case"
                        whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px hsl(var(--primary))" }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        Explore My Work
                    </motion.a>
                    <motion.a 
                        href="/cv.pdf" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-transparent border-2 border-gray-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-all hover:scale-105 hover:border-main"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        Download CV
                    </motion.a>
                </motion.div>

                {/* Mobile Social Links */}
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
                            className="p-3 bg-white/10 backdrop-blur-sm text-white rounded-full cursor-pointer transition-all duration-300 hover:bg-main hover:text-black hover:scale-110"
                        >
                            {item.icon}
                        </motion.a>
                    ))}
                </motion.div>
            </div>
            
        </div>
      </div>
      
      
      <motion.a
        href="#skills"
className="hidden lg:block lg:absolute lg:bottom-10 lg:left-1/2 lg:-translate-x-1/2 lg:z-20"

        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 2.8, duration: 0.8 } }}
        // ✨ [تعديل] أبقينا على التكبير هنا، ولكن أزلنا تغيير اللون
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div
            className="w-12 h-12 rounded-full border-2 border-main flex items-center justify-center text-main"
            animate={{ y: [0, 10, 0] }} // الحركة
            transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
            }}
            // ✨ [إضافة] تم نقل تأثير اللون إلى هنا ليطبق على الدائرة فقط
            whileHover={{ backgroundColor: "hsl(var(--primary))", color: "#000" }}
        >
            <HiArrowDown size={24} />
        </motion.div>
      </motion.a>
      
      
      <Fixed id={1} />
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
                    <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tighter">A Bit About Me</h2>
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
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.25 });
  const [active, setActive] = useState("All");

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  const filtered = active === "All" ? SKILLS : SKILLS.filter(s => s.group === active);

  return (
    <section id="skills" className="relative z-10 bg-[#0e0e0f] py-20">
      {/* خلفية حديثة (شبكة + ضوء) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(60rem 60rem at 20% -10%, rgba(99,102,241,.18), transparent 60%), radial-gradient(50rem 50rem at 80% 10%, rgba(16,185,129,.16), transparent 55%)",
        }}
      />
      <div className="absolute inset-0 opacity-[0.06] bg-[url('data:image/svg+xml;utf8,\
        <svg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 viewBox=%270 0 16 16%27>\
        <path fill=%27%23ffffff%27 fill-opacity=%270.7%27 d=%27M0 15.5H16v1H0zM15.5 0v16h1V0z%27 /></svg>')]"/>
      
      <div className="relative text-white px-6 sm:px-14 md:px-20 max-w-7xl mx-auto">
        {/* العنوان */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tighter">Tools I Craft With</h2>
          <p className="text-gray-400 mt-3">Modern stack. Minimal fluff. Real usage.</p>
        </motion.div>

        {/* فلاتر الفئات */}
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 12 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
          }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
        >
          {CATEGORIES.map((c) => {
            const activeChip = active === c;
            return (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={`relative rounded-full px-4 py-2 text-sm transition
                  ${activeChip ? "text-black" : "text-gray-300 hover:text-white"}`}
              >
                {/* خلفية متدرجة للفِيشة النشطة */}
                <span
                  className={`absolute inset-0 rounded-full -z-10 transition
                    ${activeChip ? "bg-gradient-to-r from-cyan-300 via-yellow-300 to-fuchsia-300" : "bg-white/5 border border-white/10"}`}
                />
                {c}
              </button>
            );
          })}
        </motion.div>

        {/* شبكة البطاقات المتوهجة */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((skill, i) => (
            <GlowCard key={skill.name} skill={skill} i={i} />
          ))}
        </motion.div>

        {/* شريط أوامر ديكوري حديث */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-14 mx-auto max-w-3xl"
        >
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-4">
            <div className="text-xs text-gray-400 mb-2">Quick Command</div>
            <div className="flex items-center gap-2 text-sm">
              <kbd className="px-2 py-1 rounded-md border border-white/15 bg-black/40">npx</kbd>
              <span className="opacity-80">create-next-app</span>
              <span className="opacity-40">--ts --tailwind --eslint --app</span>
            </div>
          </div>
        </motion.div>
      </div>
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

    const serviceItems = [
        { title: "Web & API Development", description: "Crafting responsive and high-performance applications from scratch." },
        { title: "UI/UX Design", description: "Designing intuitive and beautiful user interfaces that users love." },
        { title: "Performance Tuning", description: "Optimizing your site for speed and a seamless user experience." },
        { title: "Full Stack Consulting", description: "Providing expert advice to improve your existing web projects." },
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
                            <GoArrowUpRight className={`transition-transform duration-300 ${expandedIndex === index ? 'rotate-45 text-main' : 'text-gray-600'}`} />
                        </h3>
                        <AnimatePresence>
                            {expandedIndex === index && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                    className="overflow-hidden"
                                >
                                    <p className="px-8 pb-8 text-gray-400">
                                        {item.description}
                                    </p>
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
    <section id="projects" className="relative z-10 bg-[#0e0e0f] py-20">
      {/* خلفية ناعمة */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(60rem 60rem at 20% -10%, rgba(99,102,241,.14), transparent 60%), radial-gradient(50rem 50rem at 80% 10%, rgba(16,185,129,.12), transparent 55%)",
        }}
      />
      <div className="absolute inset-0 opacity-[0.06] bg-[url('data:image/svg+xml;utf8,\
        <svg xmlns=%27http://www.w3.org/2000/svg%27 width=%2716%27 height=%2716%27 viewBox=%270 0 16 16%27>\
        <path fill=%27%23ffffff%27 fill-opacity=%270.7%27 d=%27M0 15.5H16v1H0zM15.5 0v16h1V0z%27 /></svg>')]" />

      <div className="relative text-white px-6 sm:px-12 md:px-20 max-w-7xl mx-auto">
        {/* العنوان */}
        <div className="text-center mb-10">
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tighter">Featured Projects</h2>
          <p className="text-gray-400 mt-3">A visual wall of selected work.</p>
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
                className={`relative rounded-full px-4 py-2 text-sm transition
                  ${isActive ? "text-black" : "text-gray-300 hover:text-white"}`}
              >
                <span
                  className={`absolute inset-0 rounded-full -z-10 transition
                    ${isActive ? "bg-gradient-to-r from-cyan-300 via-yellow-300 to-fuchsia-300" : "bg-white/5 border border-white/10"}`}
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
              className="mb-6 break-inside-avoid rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm group"
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
                      "https://placehold.co/1000x700/191919/eab308?text=Project";
                  }}
                />
                {/* Overlay خفيف */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 opacity-70" />
                {/* شارة النوع */}
                {ele?.type && (
                  <span className="absolute top-3 left-3 text-[11px] font-semibold bg-black/50 backdrop-blur-sm border border-white/15 text-white px-2 py-1 rounded-full">
                    {ele.type}
                  </span>
                )}
              </div>

              <div className="p-5">
                <h3 className="text-xl font-semibold tracking-tight mb-1">
                  {ele?.name || "Project"}
                </h3>

                {ele?.description && (
                  <p className="text-gray-400 text-sm normal-case line-clamp-3">
                    {ele.description}
                  </p>
                )}

                {!!(ele?.tags?.length) && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {ele.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="text-[11px] font-semibold bg-white/10 px-2 py-1 rounded-full"
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
                      className="flex gap-1 items-center font-semibold hover:text-main transition"
                    >
                      Live <GoArrowUpRight />
                    </a>
                  )}
                  {ele?.source && (
                    <a
                      href={ele.source}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-1 items-center font-semibold hover:text-main transition"
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
          <div className="mt-10 text-center text-gray-400">
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

    useEffect(() => { if (inView) { controls.start("visible"); } }, [controls, inView]);

    return (
        <section id="contact" className="w-full py-20 relative bg-background">
            <div className="text-white px-14 md:px-20 flex flex-col  relative z-40">
                <motion.div
                    ref={ref}
                    initial="hidden"
                    animate={controls}
                    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 }} }}
                    className="flex-1 flex flex-col items-center justify-center text-center"
                >
                    {/* ✨ Simplified contact section to be more direct and impactful */}
                    <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 }} }} className="text-5xl lg:text-7xl font-bold tracking-tighter">
                        Let's build something great.
                    </motion.h2>
                    <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.1 }} }} className="max-w-xl mt-4 text-lg text-gray-400">
                        Have a project in mind or just want to say hello? My inbox is always open.
                    </motion.p>
                    <motion.a 
                        href="mailto:taibihakim2002@gmail.com"
                        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 }} }}
                        className="mt-8 inline-block bg-main text-black font-bold py-3 px-8 rounded-full text-lg transition-transform hover:scale-105"
                    >
                        taibihakim2002@gmail.com
                    </motion.a>
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