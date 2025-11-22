// data/projectsData.js
import { FiCode, FiLayout, FiServer, FiTool } from "react-icons/fi";
import { SiNextdotjs, SiReact, SiTailwindcss, SiMongodb, SiNodedotjs, SiTypescript, SiFramer, SiDocker, SiPrisma, SiPostgresql } from "react-icons/si";

export const projectsData = [
  {
    id: 1,
    title: "MERN E-commerce Platform",
    category: "Web Application",
    tagline: "A complete shopping experience with real-time inventory management.",
    date: "Oct 2023",
    description: "A full-featured e-commerce platform designed to provide a seamless shopping experience. It includes a customer-facing storefront and a comprehensive admin dashboard for managing products, orders, and customers.",
    challenge: "Handling complex state management for the shopping cart and ensuring secure payment processing (Stripe) while maintaining high performance with thousands of products.",
    solution: "Implemented Redux Toolkit for global state management and optimized MongoDB aggregation pipelines for fast product filtering. Integrated Stripe Webhooks for secure transaction handling.",
    features: [
      "User Authentication (JWT)",
      "Product Search & Filtering",
      "Admin Dashboard",
      "Stripe Payment Integration",
      "Order Tracking System"
    ],
    stack: ["React", "Node.js", "Express", "MongoDB", "Redux", "Tailwind"],
    links: {
      live: "https://ecommerce-demo.com",
      repo: "https://github.com/taibihakim2002/ecommerce-project",
    },
    // مسارات الصور بناءً على هيكليتك
    images: [
      "/imgs/projects/1/1.jpg", // الصورة الرئيسية
      "/imgs/projects/1/2.png",
      "/imgs/projects/1/3.png",
      "/imgs/projects/1/4.png",
      "/imgs/projects/1/5.png",
      "/imgs/projects/1/6.png",
      "/imgs/projects/1/7.png",
      "/imgs/projects/1/8.png",
      "/imgs/projects/1/9.png",
      "/imgs/projects/1/10.png",
      "/imgs/projects/1/11.png",
    ]
  },
  {
    id: 2,
    title: "SaaS Landing Page",
    category: "Landing Page",
    tagline: "High-converting landing page for a modern software startup.",
    date: "Nov 2023",
    description: "A responsive, visually striking landing page built to convert visitors into leads. Focuses on clean typography, fast loading speeds, and engaging micro-interactions.",
    challenge: "Achieving a perfect 100/100 Google Lighthouse score for performance and SEO while using heavy visual assets and animations.",
    solution: "Used Next.js Image optimization, lazy loading for components, and semantic HTML structure. Animations were optimized using Framer Motion's 'layout' prop to prevent layout shifts.",
    features: [
      "Pixel-perfect Responsive Design",
      "Dark/Light Mode Toggle",
      "SEO Optimized Structure",
      "Fast Loading (Core Web Vitals)",
      "Interactive Pricing Table"
    ],
    stack: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
    links: {
      live: "https://saas-landing.com",
      repo: "https://github.com/taibihakim2002/saas-landing",
    },
    images: [
      "/imgs/projects/2/1.jpg",
      "/imgs/projects/2/2.jpg",
      "/imgs/projects/2/3.jpg",
      "/imgs/projects/2/4.jpg",
    ]
  },
  {
    id: 3,
    title: "Designer Portfolio",
    category: "Portfolio",
    tagline: "A creative showcase with smooth transitions and grid layouts.",
    date: "Dec 2023",
    description: "A minimalist portfolio designed for a graphic designer to showcase their work. The focus is on the imagery and smooth navigation between project galleries.",
    challenge: "Creating a Masonry grid layout that works perfectly on all screen sizes without breaking the image aspect ratios.",
    solution: "Implemented a custom CSS Grid solution combined with React logic to distribute items dynamically based on screen width.",
    features: [
      "Masonry Image Grid",
      "Smooth Page Transitions",
      "Contact Form with EmailJS",
      "Image Lightbox",
      "CMS Integration (Sanity)"
    ],
    stack: ["React", "Framer Motion", "Sanity CMS", "CSS Modules"],
    links: {
      live: "https://designer-portfolio.com",
      repo: "https://github.com/taibihakim2002/portfolio-v1",
    },
    images: [
      "/imgs/projects/3/1.jpg",
      "/imgs/projects/3/2.jpg",
      "/imgs/projects/3/3.jpg",
      "/imgs/projects/3/4.jpg",
    ]
  },
  {
    id: 4,
    title: "Task Management Dashboard",
    category: "Web Application",
    tagline: "Collaborative tool for teams to track productivity.",
    date: "Jan 2024",
    description: "A Kanban-style task management board similar to Trello. Allows teams to create boards, lists, and cards with drag-and-drop functionality.",
    challenge: "Implementing smooth Drag-and-Drop functionality across different lists and persisting the new order in the database immediately.",
    solution: "Utilized 'dnd-kit' for the drag-and-drop interface and optimistic UI updates to make the interface feel instant before the server confirms the change.",
    features: [
      "Drag & Drop Interface",
      "Real-time Updates (Socket.io)",
      "Team Member Assignment",
      "Progress Analytics",
      "Data Export (CSV)"
    ],
    stack: ["Next.js", "Prisma", "PostgreSQL", "Zustand", "dnd-kit"],
    links: {
      live: "https://task-manager.com",
      repo: "https://github.com/taibihakim2002/task-app",
    },
    images: [
      "/imgs/projects/4/1.jpg",
      "/imgs/projects/4/2.jpg",
      "/imgs/projects/4/3.jpg",
      "/imgs/projects/4/4.jpg",
    ]
  }
];