"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowLeft, FiGithub, FiExternalLink, FiCalendar, FiLayers, FiCheckCircle } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// --- بيانات المشروع الوهمية (استبدلها ببياناتك الحقيقية) ---
const PROJECT = {
  id: 1,
  title: "E-commerce Dashboard Pro",
  tagline: "A comprehensive solution for modern retail management.",
  description:
    "This project is a full-stack e-commerce dashboard designed to help retailers manage inventory, orders, and customers efficiently. Built with performance and scalability in mind, it features real-time analytics, a drag-and-drop product manager, and seamless payment gateway integration.",
  challenge:
    "The main challenge was handling real-time data synchronization between the client and server while maintaining high performance on low-end devices. Additionally, building a complex filtering system for thousands of products required optimized database queries.",
  solution:
    "I utilized Next.js for server-side rendering to ensure fast initial loads. For real-time updates, I implemented WebSockets via Socket.io. The database interactions were optimized using Prisma with carefully crafted indexes on PostgreSQL.",
  features: [
    "Real-time Sales Analytics & Charts",
    "Role-Based Access Control (RBAC)",
    "Dark/Light Mode Support",
    "Automated Invoice Generation",
    "Multi-language Support (i18n)",
  ],
  stack: ["Next.js 14", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "Recharts", "Zustand"],
  links: {
    live: "https://example.com",
    repo: "https://github.com/example",
  },
  date: "Oct 2023",
  images: [
    "https://placehold.co/1200x600/09090b/6366f1?text=Dashboard+Main",
    "https://placehold.co/1200x600/09090b/22d3ee?text=Analytics+View",
    "https://placehold.co/1200x600/09090b/a855f7?text=Product+Grid",
    "https://placehold.co/1200x600/09090b/ec4899?text=Mobile+View",
  ],
};

// --- مكونات مساعدة ---
function Background() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.1),transparent_70%)]" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
    </div>
  );
}

export default function ProjectDetailsPage() {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  
  // Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white relative overflow-x-hidden">
      <Background />
      
      {/* Progress Bar */}
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50" />

      {/* --- Navbar / Back Button --- */}
      <nav className="fixed top-0 left-0 w-full z-40 px-6 py-6 flex justify-between items-center">
        <a 
          href="/" 
          className="group flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 backdrop-blur-md border border-white/10 hover:border-primary/50 transition-all"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Portfolio</span>
        </a>
      </nav>

      <div className="container mx-auto px-4 md:px-6 pt-32 pb-20 relative z-10 max-w-6xl">
        
        {/* --- 1. Project Header --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
             <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
               Web Application
             </span>
             <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-muted-foreground text-xs font-medium flex items-center gap-2">
               <FiCalendar /> {PROJECT.date}
             </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-white mb-4">
            {PROJECT.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed">
            {PROJECT.tagline}
          </p>
        </motion.div>

        {/* --- 2. Gallery (Swiper) --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          {/* Main Slider */}
          <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-card/30 backdrop-blur-sm">
            <Swiper
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs, Autoplay]}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              className="w-full aspect-video"
            >
              {PROJECT.images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img src={img} alt={`Screenshot ${index + 1}`} className="w-full h-full object-cover" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Thumbnails */}
          <div className="mt-4">
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="thumbs-swiper h-20 md:h-24"
            >
              {PROJECT.images.map((img, index) => (
                <SwiperSlide key={index} className="rounded-xl overflow-hidden cursor-pointer opacity-60 hover:opacity-100 transition-opacity !w-auto aspect-video border border-transparent data-[swiper-slide-thumb-active='true']:border-primary data-[swiper-slide-thumb-active='true']:opacity-100">
                  <img src={img} alt={`Thumb ${index}`} className="w-full h-full object-cover" />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </motion.div>

        {/* --- 3. Content Grid (Details + Sidebar) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* Overview */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Project Overview</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {PROJECT.description}
              </p>
            </motion.section>

            {/* Problem & Solution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                  className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10"
                >
                   <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-red-500" /> The Challenge
                   </h3>
                   <p className="text-muted-foreground text-sm leading-relaxed">{PROJECT.challenge}</p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                  className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10"
                >
                   <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-emerald-500" /> The Solution
                   </h3>
                   <p className="text-muted-foreground text-sm leading-relaxed">{PROJECT.solution}</p>
                </motion.div>
            </div>

            {/* Key Features */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-white mb-8">Key Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PROJECT.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-white/5 hover:border-primary/30 transition-colors">
                    <FiCheckCircle className="text-primary mt-1 shrink-0" />
                    <span className="text-zinc-300">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.section>

          </div>

          {/* Sidebar (Right) - Sticky */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              
              {/* Links Card */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
                className="p-6 rounded-2xl bg-card/50 backdrop-blur-md border border-white/10"
              >
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">Project Links</h3>
                <div className="space-y-4">
                  <a 
                    href={PROJECT.links.live} 
                    target="_blank" 
                    className="flex items-center justify-between w-full px-5 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all group"
                  >
                    <span>Visit Live Site</span>
                    <FiExternalLink className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </a>
                  <a 
                    href={PROJECT.links.repo} 
                    target="_blank" 
                    className="flex items-center justify-between w-full px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-white font-medium hover:bg-white/10 transition-all group"
                  >
                    <span>Source Code</span>
                    <FiGithub className="text-lg" />
                  </a>
                </div>
              </motion.div>

              {/* Tech Stack */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}
              >
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                  <FiLayers /> Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {PROJECT.stack.map((tech, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-zinc-300 text-sm hover:border-primary/40 hover:text-primary transition-colors cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

            </div>
          </aside>

        </div>

        {/* --- 4. Footer / Next Project Navigation --- */}
        <div className="mt-32 border-t border-white/10 pt-12">
           <div className="flex justify-between items-center">
              <div>
                 <p className="text-sm text-muted-foreground">Next Project</p>
                 <h4 className="text-2xl font-bold text-white mt-1 hover:text-primary cursor-pointer transition-colors">SaaS Website Design &rarr;</h4>
              </div>
              <a href="/#projects" className="text-sm font-bold border-b border-primary text-primary pb-0.5 hover:opacity-80">View All Projects</a>
           </div>
        </div>

      </div>
    </main>
  );
}