// data/projectsData.js
// ملاحظة: هذه الاستيرادات ليست مستخدمة مباشرة داخل المصفوفة في مثالك،
// ولكن تم الابقاء عليها لأنها كانت موجودة في الكود الذي قدمته كنموذج.
import { FiCode, FiLayout, FiServer, FiTool } from "react-icons/fi";
import { SiNextdotjs, SiReact, SiTailwindcss, SiMongodb, SiNodedotjs, SiTypescript, SiFramer, SiDocker, SiPrisma, SiPostgresql } from "react-icons/si";

export const projectsData = [
  {
    id: 1,
    title: "شركة لمعة للتنظيف (Lama'a Cleaning)",
    category: "Web Application",
    tagline: "منصة رقمية متكاملة لخدمات التنظيف ونظام الحجز.",
    date: "Feb 2024",
    description: "موقع إلكتروني متكامل لشركة تنظيف يهدف إلى التعريف بخدمات الشركة ويتيح للعملاء إجراء حجوزات للخدمات عبر الإنترنت. يتميز الموقع بلوحة تحكم (مفترضة) لإدارة الحجوزات.",
    challenge: "بناء نظام حجز full-stack قوي يتعامل مع المواعيد المتاحة بشكل فوري، وضمان تجربة مستخدم سلسة وسريعة على الواجهة الأمامية.",
    solution: "تم استخدام Node.js و Express لبناء API قوي للتعامل مع بيانات الحجز وتخزينها في MongoDB، بينما تم استخدام Next.js لضمان سرعة وأداء عالي للواجهة الأمامية وتحسين محركات البحث (SEO)، مع إضافة حركات تفاعلية باستخدام Framer Motion.",
    features: [
      "نظام حجز إلكتروني متكامل",
      "عرض خدمات الشركة بالتفصيل",
      "تصميم متجاوب (Responsive Design)",
      "واجهة مستخدم سريعة (Next.js)",
      "رسوم متحركة سلسة (Framer Motion)"
    ],
    stack: ["Next.js", "Node.js", "Express.js", "MongoDB", "HTML", "CSS", "JavaScript", "Framer Motion"],
    links: {
      live: "https://lamaa-cleaning-demo.com",
      repo: "https://github.com/username/lamaa-cleaning-project",
    },
    images: [
      "/imgs/projects/1/1.jpg", // الصورة الأولى jpg
      "/imgs/projects/1/2.png", // الباقي png
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
    tagline: "منصة صحية للبحث عن الأطباء وحجز المواعيد.",
    date: "Jan 2024",
    description: "تطبيق ويب يقوم بعرض مجموعة من التخصصات الطبية وقائمة بالأطباء. يتيح للمستخدمين البحث عن طبيب معين بناءً على التخصص وإجراء عملية حجز موعد معه.",
    challenge: "تطوير نظام فلترة بحث فعال وسريع لعرض الأطباء المناسبين حسب التخصص، وإدارة حالة عملية الحجز متعددة الخطوات.",
    solution: "الاعتماد على قدرات Next.js في العرض من جانب الخادم (SSR) لعرض قوائم الأطباء بسرعة، واستخدام React state لإدارة التفاعلات الحية في البحث وعملية الحجز.",
    features: [
      "البحث عن الأطباء حسب التخصص",
      "عرض ملفات الأطباء والتخصصات",
      "نظام حجز مواعيد",
      "لوحة تحكم للمستخدم (Dashboard UI)",
      "أداء عالي وسرعة في التحميل"
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
    tagline: "قالب تصميم بسيط ونظيف يركز على أساسيات التصميم.",
    date: "Dec 2023",
    description: "مشروع تعليمي يهدف إلى تحويل تصميم ثابت (PSD/Figma) إلى كود HTML و CSS نظيف ومتجاوب. يركز على البنية الدلالية (Semantic HTML) وتنسيقات CSS الحديثة.",
    challenge: "الحفاظ على دقة التصميم الأصلية في جميع أحجام الشاشات دون الاعتماد على أطر عمل (Frameworks) جاهزة.",
    solution: "استخدام تقنيات CSS الحديثة مثل Flexbox و Media Queries لبناء هيكل مرن ومتجاوب تماماً مع التصميم المطلوب.",
    features: [
      "كود HTML5 دلالي ونظيف",
      "تصميم متجاوب بالكامل",
      "تنسيقات CSS مخصصة",
      "توافق مع مختلف المتصفحات"
    ],
    stack: ["HTML", "CSS"],
    links: {
      live: "https://lean-template-demo.com",
      repo: "https://github.com/username/lean-template",
    },
    images: [
      "/imgs/projects/10/1.jpg",
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
    tagline: "قالب شامل لتطبيق تقنيات التخطيط المتقدمة في CSS.",
    date: "Nov 2023",
    description: "مشروع تعليمي من مسار Elzero Web School، يمثل تحدياً متكاملاً لتحويل تصميم غني بالعناصر إلى صفحة ويب. يركز على التعامل مع التخطيطات المعقدة.",
    challenge: "إدارة وتنظيم ملفات CSS لمشروع كبير يحتوي على العديد من الأقسام المتنوعة والتأثيرات البصرية.",
    solution: "اتباع منهجية منظمة في كتابة CSS، وتقسيم التنسيقات بناءً على الأقسام، واستخدام CSS Grid و Flexbox بشكل مكثف لضبط المحاذات.",
    features: [
      "تخطيطات CSS معقدة (Grid/Flex)",
      "تصميم غني بالعناصر البصرية",
      "متجاوب مع جميع الشاشات",
      "استخدام أيقونات Font Awesome",
      "تأثيرات Hover إبداعية"
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
    tagline: "قالب إبداعي يركز على اللمسات الفنية والتأثيرات البصرية.",
    date: "Oct 2023",
    description: "مشروع تعليمي يهدف إلى تنفيذ تصميم فني وإبداعي. يركز هذا المشروع على استخدام CSS لإنشاء تأثيرات بصرية متقدمة وتصميمات غير تقليدية.",
    challenge: "تنفيذ العناصر الفنية المتقدمة في التصميم، مثل تداخل الصور، والأشكال المخصصة، وتأثيرات الانتقال المعقدة باستخدام CSS فقط.",
    solution: "الاعتماد المكثف على العناصر الزائفة (Pseudo-elements ::before, ::after) والتموضع المطلق (Absolute Positioning) لخلق الطبقات والتأثيرات المطلوبة.",
    features: [
      "تأثيرات CSS إبداعية ومتقدمة",
      "تصميم معرض أعمال (Portfolio Grid)",
      "طابع بصري داكن وأنيق",
      "متجاوب وسلس"
    ],
    stack: ["HTML", "CSS"],
    links: {
      live: "https://kasper-template-demo.com",
      repo: "https://github.com/username/kasper-template",
    },
    images: [
      "/imgs/projects/12/1.jpg",
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
    tagline: "مكون واجهة مستخدم تفاعلي لعرض الأسئلة الشائعة.",
    date: "Sep 2023",
    description: "حل لتحدي من منصة Frontend Mentor. الهدف هو بناء مكون أكورديون (Accordion) تفاعلي ومتجاوب لعرض وإخفاء الإجابات على الأسئلة الشائعة.",
    challenge: "جعل الأكورديون تفاعلياً وسلس الحركة، مع ضمان إمكانية الوصول (Accessibility) وسهولة الاستخدام على الأجهزة المحمولة.",
    solution: "استخدام JavaScript بسيط للتحكم في فئات CSS (Classes) عند النقر لفتح وإغلاق العناصر، مع استخدام CSS Transitions لإضافة حركة سلسة.",
    features: [
      "واجهة مستخدم تفاعلية (Accordion)",
      "حركات انتقال سلسة (Smooth Transitions)",
      "تصميم متجاوب (Mobile-First)",
      "كود HTML سهل الوصول (Accessible)"
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
    tagline: "صفحة هبوط احترافية مبنية على نظام شبكي (Grid System).",
    date: "Aug 2023",
    description: "مشروع تعليمي لمحاكاة بناء قوالب احترافية مشابهة لتلك المبنية بإطار عمل Bootstrap. يركز على بناء نظام شبكي قوي وتصميم أقسام احترافية.",
    challenge: "محاكاة نظام الأعمدة والشبكات الموجود في أطر العمل الشهيرة باستخدام CSS Grid و Flexbox الأصلي.",
    solution: "بناء نظام Utility Classes مخصص في CSS للتحكم في الأعمدة والمسافات، مما يسهل بناء تخطيطات متناسقة عبر كامل الموقع.",
    features: [
      "تصميم صفحة هبوط حديث",
      "نظام شبكي متجاوب (Responsive Grid)",
      "لوحة ألوان احترافية",
      "أقسام مصممة بعناية"
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
    tagline: "تطبيق دقيق لتصميم بطاقة معاينة مقال.",
    date: "Jul 2023",
    description: "حل لتحدي من Frontend Mentor يهدف إلى بناء بطاقة (Card) لمعاينة مقال مدونة. يركز على الدقة في تنفيذ التصميم والأبعاد.",
    challenge: "ضمان تطابق النتيجة النهائية مع التصميم المطلوب تماماً (Pixel-Perfect) على مختلف أحجام الشاشات.",
    solution: "استخدام Flexbox لهيكلة البطاقة، مع الاعتماد على وحدات قياس نسبية و Media Queries لضبط الحواف والخطوط بدقة.",
    features: [
      "تنفيذ دقيق للتصميم (Pixel-Perfect)",
      "مكون واجهة مستخدم متجاوب",
      "تأثيرات Hover بسيطة",
      "هيكلية CSS نظيفة"
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
    tagline: "نموذج تسجيل في نشرة بريدية مع تحقق من البيانات.",
    date: "Jun 2023",
    description: "حل لتحدي من Frontend Mentor لبناء نموذج تسجيل في نشرة بريدية. يتطلب التحدي التحقق من صحة البريد الإلكتروني المدخل وعرض رسالة نجاح أو خطأ.",
    challenge: "التعامل مع منطق التحقق من صحة النماذج (Form Validation) في الواجهة الأمامية وتغيير حالة الواجهة بناءً على النتيجة.",
    solution: "استخدام JavaScript للاستماع لحدث إرسال النموذج، والتحقق من صيغة البريد الإلكتروني باستخدام Regex، ثم التلاعب بالـ DOM لإظهار رسائل الخطأ أو شاشة النجاح.",
    features: [
      "التحقق من صحة النموذج (Client-side Validation)",
      "حالات ديناميكية للنجاح والخطأ",
      "تصميم متجاوب",
      "واجهة مستخدم تفاعلية"
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