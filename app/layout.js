import { Poppins } from "next/font/google";
import "./globals.css";
// ✨ 1. استيراد المغلف الجديد
import ClientLayoutWrapper from "@/components/global/ClientLayoutWrapper";

const poppins = Poppins({
 subsets: ["latin"],
 weight: ["400", "500", "600", "700", "800"],
 variable: "--font-poppins",
});

export const metadata = {
 title: "Taibi Abdelhakim | Creative Frontend Developer",
 description: "A portfolio showcasing my work and skills in modern frontend development.",
};

export default function RootLayout({ children }) {
 return (
 <html lang="en" dir="ltr" className="dark">
<body className={`${poppins.variable} font-sans antialiased`}>
 {/* ✨ 2. استخدام المغلف هنا ليحيط بـ children */}
 <ClientLayoutWrapper>
 {children}
</ClientLayoutWrapper>
        {/* ✨ 3. تم نقل Toaster إلى المغلف */}
 </body>
 </html>
 );
}