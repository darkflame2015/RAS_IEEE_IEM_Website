"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import siteConfig from "../../config/site";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Footer() {
    const footerRef = useRef(null);

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

    return (
        <footer className="footer" ref={footerRef} id="footer">
            <div className="footer__inner">
                <Link href="/" className="footer__brand">
                    {siteConfig.name}
                </Link>
                <div className="footer__links">
                    {siteConfig.footerLinks.map((link) => (
                        <Link key={link.href} href={link.href} className="footer__link">
                            {link.label}
                        </Link>
                    ))}
                </div>
                <p className="footer__copy">
                    &copy; {new Date().getFullYear()} {siteConfig.copyrightEntity}. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
