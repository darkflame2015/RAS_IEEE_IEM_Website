"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

export default function Footer() {
    const footerRef = useRef(null);
    const pathname = usePathname();

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                footerRef.current,
                { opacity: 0, y: 20 },
                {
                    opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
                    scrollTrigger: {
                        trigger: footerRef.current,
                        start: "top 95%",
                        toggleActions: "play none none none",
                    },
                }
            );
        }, footerRef);

        return () => ctx.revert();
    }, []);

    const handleScroll = (e, target) => {
        const isHome = pathname === "/";
        if (isHome) {
            e.preventDefault();
            const el = document.querySelector(target);
            if (el) {
                gsap.to(window, {
                    scrollTo: { y: el, offsetY: 80 },
                    duration: 1.2,
                    ease: "power3.inOut",
                });
            }
        }
        // If not home, the href="/#section" will navigate naturally
    };

    return (
        <footer className="footer" ref={footerRef} id="footer">
            <div className="footer__inner">
                <Link href="/" className="footer__brand">
                    IEEE RAS Student Chapter
                </Link>
                <div className="footer__links">
                    <Link href="/about" className="footer__link">
                        About
                    </Link>
                    <a href="/#features" className="footer__link" onClick={(e) => handleScroll(e, "#features")}>
                        Events
                    </a>
                    <a href="/#members" className="footer__link" onClick={(e) => handleScroll(e, "#members")}>
                        Team
                    </a>
                    <a href="/#contact" className="footer__link" onClick={(e) => handleScroll(e, "#contact")}>
                        Contact
                    </a>
                </div>
                <p className="footer__copy">
                    &copy; {new Date().getFullYear()} IEEE Robotics &amp; Automation Society — Student Chapter. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
