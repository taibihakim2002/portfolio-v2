"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, Camera, Menu } from "lucide-react";
import Link from "next/link";
import { useProfile } from "@/app/contexts/ProfileProvider";
import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
    const { profile, isLoading } = useProfile();
    const [scrolled, setScrolled] = useState(false);
    
    useEffect(() => {
        const handleScroll = () => { setScrolled(window.scrollY > 10); };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: "الرئيسية", href: "/" },
        { label: "المشاريع", href: "/projects" },
        { label: "من أنا", href: "/about" },
        { label: "الخدمات", href: "/services" },
        { label: "اتصل بي", href: "/contact" },
    ];

    return (
        <motion.header 
            className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-300", scrolled ? "bg-background/80 backdrop-blur-sm border-b border-border" : "bg-transparent")} 
            initial={{ y: -100 }} 
            animate={{ y: 0 }} 
            transition={{ duration: 0.5 }}
        >
            <div className="container mx-auto flex items-center justify-between h-20 px-4">
                {/* --- START: تم تعديل الشعار ليصبح رابطًا --- */}
                <Link href="/" className="flex items-center gap-2">
                    <Camera className="h-6 w-6 text-primary" />
                    {isLoading ? (
                        <Skeleton className="h-6 w-32" />
                    ) : (
                        // --- START: تم تغيير الخط هنا ---
                        <span className="font-display text-xl font-bold">{profile?.name || 'اسم المصور'}</span>
                        // --- END: تم تغيير الخط هنا ---
                    )}
                </Link>
                {/* --- END: تم تعديل الشعار ليصبح رابطًا --- */}

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="text-muted-foreground hover:text-primary transition-colors duration-300"
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                <div className="flex items-center gap-4">
                    <Link href="/book" className="hidden md:block">
                        <Button>احجز الآن<ArrowLeft className="mr-2 h-4 w-4" /></Button>
                    </Link>

                    {/* --- START: تمت إضافة القائمة الجانبية للهاتف --- */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <Menu className="h-5 w-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-full max-w-xs p-8">
                                <nav className="flex flex-col items-center gap-8 mt-12">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            href={link.href}
                                            className="text-xl text-muted-foreground hover:text-primary transition-colors duration-300"
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                    <Link href="/book" className="w-full mt-4">
                                        <Button size="lg" className="w-full">احجز الآن<ArrowLeft className="mr-2 h-4 w-4" /></Button>
                                    </Link>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                    {/* --- END: تمت إضافة القائمة الجانبية للهاتف --- */}
                </div>
            </div>
        </motion.header>
    );
}
