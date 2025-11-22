// data/projectsData.js
import { FiCode, FiLayout, FiServer, FiTool } from "react-icons/fi";
import { SiNextdotjs, SiReact, SiTailwindcss, SiMongodb, SiNodedotjs, SiTypescript, SiFramer, SiDocker, SiPrisma, SiPostgresql } from "react-icons/si";

export const projectsData = [
  {
    id: 1,
    title: "Lama'a Cleaning Company",
    category: "Web Application",
    tagline: "A comprehensive digital platform for cleaning services with a booking system.",
    date: "Feb 2024",
    description: "A full-stack website for a cleaning company aimed at showcasing services and allowing customers to book appointments online. It features a (simulated) dashboard for managing bookings.",
    challenge: "Building a robust full-stack booking system that handles real-time availability, while ensuring a smooth and fast user experience on the frontend.",
    solution: "Used Node.js and Express to build a powerful API for handling booking data with MongoDB. Utilized Next.js for high performance, SEO optimization, and integrated Framer Motion for interactive animations.",
    features: [
      "Full Online Booking System",
      "Detailed Service Showcase",
      "Responsive Design",
      "Fast UI (Next.js)",
      "Smooth Animations (Framer Motion)"
    ],
    stack: ["Next.js", "Node.js", "Express.js", "MongoDB", "HTML", "CSS", "JavaScript", "Framer Motion"],
    links: {
      live: "https://lamaa-cleaning-demo.com",
      repo: "https://github.com/username/lamaa-cleaning-project",
    },
    images: [
      "/imgs/projects/1/1.jpg", // First image is jpg
      "/imgs/projects/1/2.png", // The rest are png
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
    id: 5,
    title: "MediDoctor - Health App Dashboard",
    category: "Web Application",
    tagline: "A health platform for finding doctors and booking appointments.",
    date: "Jan 2024",
    description: "A web application displaying various medical specialties and a list of doctors. It allows users to search for a specific doctor based on specialization and book an appointment.",
    challenge: "Developing an efficient search filtering system to display relevant doctors by specialty and managing the multi-step booking process state.",
    solution: "Leveraged Next.js Server-Side Rendering (SSR) for fast initial loading of doctor lists, and used React state to manage real-time interactions during search and the booking flow.",
    features: [
      "Doctor Search by Specialty",
      "Doctor Profiles & Specialties Display",
      "Appointment Booking System",
      "User Dashboard UI",
      "High Performance & Fast Loading"
    ],
    stack: ["Next.js", "HTML", "CSS", "JavaScript"],
    links: {
      live: "https://medidoctor-demo.com",
      repo: "https://github.com/username/medidoctor-app",
    },
    images: [
      "/imgs/projects/5/1.jpg",
      "/imgs/projects/5/2.png",
      "/imgs/projects/5/3.png",
      "/imgs/projects/5/4.png",
      "/imgs/projects/5/5.png",
      "/imgs/projects/5/6.png",
      "/imgs/projects/5/7.png",
    ]
  },
  {
    id: 10,
    title: "Lean Template",
    category: "Educational Project / PSD to HTML",
    tagline: "A simple, clean design template focusing on design fundamentals.",
    date: "Dec 2023",
    description: "An educational project aiming to convert a static design (PSD/Figma) into clean, responsive HTML and CSS code. It focuses on semantic HTML structure and modern CSS layouts.",
    challenge: "Maintaining design fidelity across all screen sizes without relying on external CSS frameworks.",
    solution: "Used modern CSS techniques like Flexbox and Media Queries to build a flexible structure fully responsive to the required design.",
    features: [
      "Semantic HTML5 Code",
      "Fully Responsive Design",
      "Custom CSS Styling",
      "Cross-Browser Compatibility"
    ],
    stack: ["HTML", "CSS"],
    links: {
      live: "https://lean-template-demo.com",
      repo: "https://github.com/username/lean-template",
    },
    images: [
      "/imgs/projects/10/1.jpg", // First image is jpg
      "/imgs/projects/10/2.png",
      "/imgs/projects/10/3.png",
      "/imgs/projects/10/4.png",
      "/imgs/projects/10/5.png",
      "/imgs/projects/10/6.png",
    ]
  },
  {
    id: 11,
    title: "Elzero Template",
    category: "Educational Project / PSD to HTML",
    tagline: "A comprehensive template applying advanced CSS layout techniques.",
    date: "Nov 2023",
    description: "An educational project from Elzero Web School, representing a complete challenge to convert a rich design into a webpage. Focuses on handling complex layouts.",
    challenge: "Managing and organizing CSS files for a large project containing many diverse sections and visual effects.",
    solution: "Followed a structured methodology in writing CSS, dividing styles based on sections, and extensively using CSS Grid and Flexbox for alignment.",
    features: [
      "Complex CSS Layouts (Grid/Flex)",
      "Visually Rich Design",
      "Responsive on All Screens",
      "Font Awesome Icons Integration",
      "Creative Hover Effects"
    ],
    stack: ["HTML", "CSS"],
    links: {
      live: "https://elzero-template-demo.com",
      repo: "https://github.com/username/elzero-template",
    },
    images: [
      "/imgs/projects/11/1.jpg",
      "/imgs/projects/11/2.png",
      "/imgs/projects/11/3.png",
      "/imgs/projects/11/4.png",
      "/imgs/projects/11/5.png",
      "/imgs/projects/11/6.png",
      "/imgs/projects/11/7.png",
      "/imgs/projects/11/8.png",
      "/imgs/projects/11/9.png",
      "/imgs/projects/11/10.png",
      "/imgs/projects/11/11.png",
      "/imgs/projects/11/12.png",
      "/imgs/projects/11/13.png",
      "/imgs/projects/11/14.png",
    ]
  },
  {
    id: 12,
    title: "Kasper Template",
    category: "Educational Project / PSD to HTML",
    tagline: "A creative template focusing on artistic touches and visual effects.",
    date: "Oct 2023",
    description: "An educational project aimed at implementing an artistic design. This project focuses on using CSS to create advanced visual effects and unconventional layouts.",
    challenge: "Implementing advanced artistic elements like image overlapping, custom shapes, and complex transition effects using only CSS.",
    solution: "Heavily relied on Pseudo-elements (::before, ::after) and Absolute Positioning to create the required layers and effects.",
    features: [
      "Advanced Creative CSS Effects",
      "Portfolio Grid Design",
      "Dark Elegant Visual Theme",
      "Smooth & Responsive"
    ],
    stack: ["HTML", "CSS"],
    links: {
      live: "https://kasper-template-demo.com",
      repo: "https://github.com/username/kasper-template",
    },
    images: [
      "/imgs/projects/12/1.jpg", // First image is jpg
      "/imgs/projects/12/2.png",
      "/imgs/projects/12/3.png",
      "/imgs/projects/12/4.png",
      "/imgs/projects/12/5.png",
      "/imgs/projects/12/6.png",
      "/imgs/projects/12/7.png",
      "/imgs/projects/12/8.png",
      "/imgs/projects/12/9.png",
    ]
  },
  {
    id: 13,
    title: "Frontend Mentor - FAQ Accordion",
    category: "Frontend Challenge / UI Component",
    tagline: "An interactive UI component for displaying frequently asked questions.",
    date: "Sep 2023",
    description: "A solution to a Frontend Mentor challenge. The goal is to build an interactive, responsive accordion component to show and hide answers to FAQs.",
    challenge: "Making the accordion interactive with smooth animations while ensuring accessibility and usability on mobile devices.",
    solution: "Used simple JavaScript to toggle CSS classes on click to open/close elements, combined with CSS Transitions for smooth movement.",
    features: [
      "Interactive Accordion UI",
      "Smooth Transitions",
      "Mobile-First Responsive Design",
      "Accessible HTML Code"
    ],
    stack: ["HTML", "CSS", "JavaScript"],
    links: {
      live: "https://faq-accordion-demo.com",
      repo: "https://github.com/username/fm-faq-accordion",
    },
    images: [
      "/imgs/projects/13/1.jpg",
      "/imgs/projects/13/2.png",
    ]
  },
  {
    id: 14,
    title: "Bondi Template",
    category: "Educational Project / PSD to HTML",
    tagline: "A professional landing page built on a solid grid system.",
    date: "Aug 2023",
    description: "An educational project intended to simulate building professional templates similar to those built with Bootstrap. Focuses on building a strong grid system and professional section designs.",
    challenge: "Simulating the column and grid systems found in popular frameworks using native CSS Grid and Flexbox.",
    solution: "Built a custom system of CSS Utility Classes to control columns and spacing, facilitating the construction of consistent layouts across the site.",
    features: [
      "Modern Landing Page Design",
      "Responsive Grid System",
      "Professional Color Palette",
      "Carefully Designed Sections"
    ],
    stack: ["HTML", "CSS"],
    links: {
      live: "https://bondi-template-demo.com",
      repo: "https://github.com/username/bondi-template",
    },
    images: [
      "/imgs/projects/14/1.jpg",
      "/imgs/projects/14/2.png",
      "/imgs/projects/14/3.png",
      "/imgs/projects/14/4.png",
      "/imgs/projects/14/5.png",
      "/imgs/projects/14/6.png",
      "/imgs/projects/14/7.png",
    ]
  },
  {
    id: 15,
    title: "Frontend Mentor - Blog Preview Card",
    category: "Frontend Challenge / UI Component",
    tagline: "A precise implementation of a blog article preview card design.",
    date: "Jul 2023",
    description: "A solution to a Frontend Mentor challenge aimed at building a card component for previewing a blog post. Focuses on design accuracy and dimensions.",
    challenge: "Ensuring the final result matches the required design exactly (Pixel-Perfect) across various screen sizes.",
    solution: "Used Flexbox to structure the card, relying on relative measuring units and Media Queries to adjust borders and fonts precisely.",
    features: [
      "Pixel-Perfect Design Implementation",
      "Responsive UI Component",
      "Simple Hover Effects",
      "Clean CSS Structure"
    ],
    stack: ["HTML", "CSS"],
    links: {
      live: "https://blog-preview-card-demo.com",
      repo: "https://github.com/username/fm-blog-preview",
    },
    images: [
      "/imgs/projects/15/1.jpg",
      "/imgs/projects/15/2.png",
    ]
  },
  {
    id: 16,
    title: "Frontend Mentor - Newsletter Sign-up",
    category: "Frontend Challenge / UI Component",
    tagline: "A newsletter sign-up form with data validation.",
    date: "Jun 2023",
    description: "A solution to a Frontend Mentor challenge to build a newsletter sign-up form. The challenge requires validating the inputted email and displaying success or error messages.",
    challenge: "Handling client-side form validation logic and changing the UI state based on the result.",
    solution: "Used JavaScript to listen for the form submission event, validated the email format using Regex, and manipulated the DOM to show error messages or the success screen.",
    features: [
      "Client-side Form Validation",
      "Dynamic Success/Error States",
      "Responsive Design",
      "Interactive User Interface"
    ],
    stack: ["HTML", "CSS", "JavaScript"],
    links: {
      live: "https://newsletter-signup-demo.com",
      repo: "https://github.com/username/fm-newsletter-signup",
    },
    images: [
      "/imgs/projects/16/1.jpg",
      "/imgs/projects/16/2.png",
    ]
  }
];