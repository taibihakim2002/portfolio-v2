import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

// Setup Poppins font for the entire project
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
    // Apply LTR direction, English language, and dark mode
    <html lang="en" dir="ltr" className="dark">
      {/* Apply the primary font */}
      <body className={`${poppins.variable} font-sans antialiased`}>
        {children}
        <Toaster 
          richColors 
          closeButton 
          style={{ zIndex: 9999 }}
        />
      </body>
    </html>
  );
}
