// app/components/Header.tsx
'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { isSignedIn } = useUser();
    const pathname = usePathname();
    const router = useRouter();

    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    //If the user is signed in, redirect them to the dashboard
    useEffect(() => {
        if (isSignedIn) router.push("/dashboard");
    }, [isSignedIn, router]);

    return (
        <header
            className={`w-full fixed top-0 z-50 bg-white transition-shadow ${isScrolled ? "shadow-md" : ""}`}
        >
            <div className="container mx-auto px-6 md:px-12 flex items-center justify-between h-16">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold text-blue-600">
                    StudyApp
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
                        Home
                    </Link>
                    <a href="/features" className="text-gray-700 hover:text-blue-600 transition">
                        Features
                    </a>
                    <Link href="/pricing" className="text-gray-700 hover:text-blue-600 transition">
                        Pricing
                    </Link>
                    <Link href="/about" className="text-gray-700 hover:text-blue-600 transition">
                        About
                    </Link>

                    {/* Login / User Avatar */}
                    {isSignedIn ? (
                        <UserButton />
                    ) : (
                        <SignInButton mode="modal">
                            <Button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
                                Login
                            </Button>
                        </SignInButton>
                    )}
                </nav>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-gray-700">
                        {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className={`md:hidden bg-white border-t border-gray-200 overflow-hidden transition-all duration-300 ${isMobileMenuOpen ? "max-h-96 py-4" : "max-h-0"}`}
            >
                <nav className="flex flex-col gap-4 px-6">
                    <Link href="/" className="text-gray-700 hover:text-blue-600 transition">
                        Home
                    </Link>
                    <a href="/features" className="text-gray-700 hover:text-blue-600 transition">
                        Features
                    </a>
                    <Link href="/pricing" className="text-gray-700 hover:text-blue-600 transition">
                        Pricing
                    </Link>
                    <Link href="/about" className="text-gray-700 hover:text-blue-600 transition">
                        About
                    </Link>

                    {/* Mobile Login / Avatar */}
                    {isSignedIn ? (
                        <UserButton />
                    ) : (
                        <SignInButton mode="modal">
                            <Button className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
                                Login
                            </Button>
                        </SignInButton>
                    )}
                </nav>
            </div>
        </header>
    );
}
