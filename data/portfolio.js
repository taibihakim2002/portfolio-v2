import { FaGithub, FaLinkedinIn } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io";
import { TiSocialFacebook } from "react-icons/ti";

// --- Social Links ---
export const socialLinks = [
  { href: "https://github.com/taibihakim2002", icon: <FaGithub size={20}/> },
  { href: "https://www.facebook.com/hakimtaibi2002/", icon: <TiSocialFacebook size={20}/> },
  { href: "https://www.instagram.com/taibihaakim", icon: <IoLogoInstagram size={20}/> },
  { href: "https://www.linkedin.com/in/taibi-hakim-54432b16b/", icon: <FaLinkedinIn size={20}/> }
];

// --- Projects ---
export const projects = [
  {
    img: "https://placehold.co/600x400/191919/eab308?text=Project+One",
    type: "Web Application",
    name: "E-commerce Platform",
    description: "A full-featured e-commerce platform with a modern UI.",
    tags: ["React", "Next.js", "TailwindCSS"],
    live: "#",
    source: "#",
  },
  // ... أضف بقية المشاريع هنا
];

// --- Skills ---
export const CATEGORIES = ["All", "Frontend", "Backend", "Tooling", "Design"];

export const SKILLS = [
  { name: "React", badge: "Daily", group: "Frontend", desc: "Interactive UIs & hooks", icon: "⚛️" },
  { name: "Next.js", badge: "Daily", group: "Frontend", desc: "SSR/ISR, routing, app dir", icon: "▲" },
  // ... أضف بقية المهارات
];

export const SKILLS_LIST = [
 { name: "HTML", icon: "/imgs/html.png" },
 { name: "CSS", icon: "/imgs/css.png" }, 
 // ... 
];

// --- Services ---
export const SERVICES_DATA = [
  {
    title: "Full-Stack Web Applications",
    description: "Designing and shipping complete MERN applications...",
  },
  // ...
];

// --- Contact Info ---
export const CONTACT_INFO = {
  NAME: "Taibi Abdelhakim",
  EMAIL: "taibihakim2002@gmail.com",
  PHONE: "+213 555 000 000",
  WHATSAPP: "+213555000000",
  LOCATION: "Algeria (Remote-friendly)",
  GITHUB: "https://github.com/your-username",
  LINKEDIN: "https://www.linkedin.com/in/your-username",
  TWITTER: "https://x.com/your-username",
};