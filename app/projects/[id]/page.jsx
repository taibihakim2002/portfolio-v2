"use client";

import React, { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowLeft, FiGithub, FiExternalLink, FiCalendar, FiLayers, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs, Autoplay } from "swiper/modules";
import Link from "next/link";
import { useParams } from "next/navigation"; // لجلب الـ ID من الرابط

// استيراد البيانات
import { projectsData } from "@/data/projectsData"; // تأكد من صحة المسار

// Styles Imports
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

// --- Background Component ---
function Background() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.1),transparent_70%)]" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
    </div>
  );
}

export default function ProjectDetailsPage() {
  const params = useParams(); // الحصول على الـ ID من الرابط
  const projectId = params.id ? parseInt(params.id) : null;

  // البحث عن المشروع المطابق
  const PROJECT = projectsData.find((p) => p.id === projectId);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // --- حالة عدم العثور على المشروع ---
  if (!PROJECT) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground relative">
        <Background />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="z-10 text-center p-8 border border-white/10 bg-card/30 backdrop-blur-md rounded-2xl"
        >
          <FiAlertCircle className="text-5xl text-red-500 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-white mb-2">Project Not Found</h1>
          <p className="text-muted-foreground mb-6">The project you are looking for does not exist or has been removed.</p>
          <Link href="/#projects" className="px-6 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary/90 transition">
            Back to Portfolio
          </Link>
        </motion.div>
      </main>
    );
  }

  // تحديد المشروع التالي للتنقل
  const nextProject = projectsData.find(p => p.id === PROJECT.id + 1) || projectsData[0];

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-white relative overflow-x-hidden">
      <Background />
      
      {/* Progress Bar */}
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50" />

      {/* --- Navbar --- */}
      <nav className="fixed top-0 left-0 w-full z-40 px-6 py-6 flex justify-between items-center pointer-events-none">
        <Link 
          href="/#projects" 
          className="pointer-events-auto group flex items-center gap-2 px-4 py-2 rounded-full bg-background/50 backdrop-blur-md border border-white/10 hover:border-primary/50 transition-all shadow-lg"
        >
          <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to Portfolio</span>
        </Link>
      </nav>

      <div className="container mx-auto px-4 md:px-6 pt-32 pb-20 relative z-10 max-w-6xl">
        
        {/* --- 1. Header --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
             <span className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
               {PROJECT.category}
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
          <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-card/30 backdrop-blur-sm relative">
            <Swiper
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs, Autoplay]}
              autoplay={{ delay: 5000, disableOnInteraction: true }}
              loop={true}
              className="w-full aspect-video bg-black/50"
            >
              {PROJECT.images.map((img, index) => (
                <SwiperSlide key={index} className="flex items-center justify-center bg-zinc-900">
                   <img 
                     src={img} 
                     alt={`${PROJECT.title} Screenshot ${index + 1}`} 
                     className="w-full h-full object-contain md:object-cover"
                     onError={(e) => {
                       // Fallback في حالة لم يتم العثور على الصورة
                       e.currentTarget.src = `https://placehold.co/1200x600/1e1e2e/6366f1?text=Image+Not+Found`;
                     }}
                   />
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
                <SwiperSlide key={index} className="rounded-xl overflow-hidden cursor-pointer opacity-60 hover:opacity-100 transition-opacity !w-auto aspect-video border-2 border-transparent data-[swiper-slide-thumb-active='true']:border-primary data-[swiper-slide-thumb-active='true']:opacity-100 bg-zinc-900">
                  <img 
                    src={img} 
                    alt={`Thumb ${index}`} 
                    className="w-full h-full object-cover" 
                    onError={(e) => { e.currentTarget.src = `https://placehold.co/400x200/1e1e2e/6366f1?text=Error`; }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </motion.div>

        {/* --- 3. Details Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20">
          
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-16">
            
            {/* Overview */}
            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold text-white mb-6">Project Overview</h2>
              <p className="text-lg text-muted-foreground leading-relaxed whitespace-pre-line">
                {PROJECT.description}
              </p>
            </motion.section>

            {/* Challenges & Solutions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                  className="p-6 rounded-2xl bg-red-500/5 border border-red-500/10"
                >
                   <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> The Challenge
                   </h3>
                   <p className="text-muted-foreground text-sm leading-relaxed">{PROJECT.challenge}</p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
                  className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10"
                >
                   <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                     <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> The Solution
                   </h3>
                   <p className="text-muted-foreground text-sm leading-relaxed">{PROJECT.solution}</p>
                </motion.div>
            </div>

            {/* Features */}
            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl font-bold text-white mb-8">Key Features</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PROJECT.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-card/50 border border-white/5 hover:border-primary/30 transition-colors group">
                    <FiCheckCircle className="text-primary mt-1 shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="text-zinc-300">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.section>
          </div>

          {/* Right Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-8">
              
              {/* Links */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
                className="p-6 rounded-2xl bg-card/50 backdrop-blur-md border border-white/10 shadow-xl"
              >
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-6">Project Links</h3>
                <div className="space-y-4">
                  {PROJECT.links.live && (
                    <a 
                      href={PROJECT.links.live} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between w-full px-5 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all group hover:scale-[1.02]"
                    >
                      <span>Visit Live Site</span>
                      <FiExternalLink className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </a>
                  )}
                  {PROJECT.links.repo && (
                    <a 
                      href={PROJECT.links.repo} target="_blank" rel="noopener noreferrer"
                      className="flex items-center justify-between w-full px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-white font-medium hover:bg-white/10 transition-all group hover:scale-[1.02]"
                    >
                      <span>Source Code</span>
                      <FiGithub className="text-lg" />
                    </a>
                  )}
                </div>
              </motion.div>

              {/* Tech Stack */}
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
                <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
                  <FiLayers /> Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {PROJECT.stack.map((tech, i) => (
                    <span 
                      key={i} 
                      className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-zinc-300 text-sm hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-all cursor-default"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </aside>
        </div>

        {/* --- 4. Next Project Navigation --- */}
        <div className="mt-32 border-t border-white/10 pt-12">
           <div className="flex justify-between items-center">
              <Link href={`/projects/${nextProject.id}`} className="group">
                 <p className="text-sm text-muted-foreground mb-1">Next Project</p>
                 <h4 className="text-2xl font-bold text-white group-hover:text-primary transition-colors flex items-center gap-2">
                   {nextProject.title} <span className="inline-block transition-transform group-hover:translate-x-2">&rarr;</span>
                 </h4>
              </Link>
              <Link href="/#projects" className="hidden sm:block text-sm font-bold border-b border-primary text-primary pb-0.5 hover:opacity-80">
                View All Projects
              </Link>
           </div>
        </div>

      </div>
    </main>
  );
}