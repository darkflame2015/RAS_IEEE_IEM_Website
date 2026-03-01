"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollToPlugin);
}

const NAV_ITEMS = [
    { label: "Home", href: "/", scroll: null },
    { label: "About", href: "/about", scroll: null },
    { label: "Events", href: "/events", scroll: null },
    { label: "Gallery", href: "/gallery", scroll: null },
    { label: "Contact", href: "/contact", scroll: null },
];

export default function Navbar() {
    const pathname = usePathname();
    const navRef = useRef(null);
    const linksRef = useRef(null);
    const glassRef = useRef(null);
    const linkRefs = useRef([]);
    const ctaBtnRef = useRef(null);
    const ctaGlowRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [mounted, setMounted] = useState(false);

    // Set correct active index based on pathname
    useEffect(() => {
        setMounted(true);
        const pathMap = { "/": 0, "/about": 1, "/events": 2, "/gallery": 3, "/contact": 4 };
        setActiveIndex(pathMap[pathname] ?? 0);
    }, [pathname]);

    const slideGlassTo = useCallback((el, animate = true) => {
        if (!el || !glassRef.current || !linksRef.current) return;
        const containerRect = linksRef.current.getBoundingClientRect();
        const linkRect = el.getBoundingClientRect();
        const x = linkRect.left - containerRect.left;
        const w = linkRect.width;

        if (animate) {
            gsap.to(glassRef.current, {
                x,
                width: w,
                duration: 0.5,
                ease: "power3.out",
            });
        } else {
            gsap.set(glassRef.current, { x, width: w });
        }
    }, []);

    // Entrance animation
    useEffect(() => {
        if (!mounted) return;
        const isHome = pathname === "/";

        if (navRef.current) {
            if (isHome) {
                // Animate entrance only on homepage
                gsap.fromTo(
                    navRef.current,
                    { opacity: 0, y: -20, filter: "blur(10px)" },
                    {
                        opacity: 1, y: 0, filter: "blur(0px)",
                        duration: 1, delay: 2.6, ease: "power3.out",
                        onComplete: () => {
                            const el = linkRefs.current[activeIndex];
                            if (el) slideGlassTo(el, false);
                        },
                    }
                );
            } else {
                // Static on all other pages — no animation
                gsap.set(navRef.current, { opacity: 1, y: 0, filter: "blur(0px)" });
                const el = linkRefs.current[activeIndex];
                if (el) slideGlassTo(el, false);
            }
        }

        // CTA glow animation
        if (ctaGlowRef.current) {
            gsap.to(ctaGlowRef.current, {
                opacity: 0.8,
                scale: 1.15,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: isHome ? 3.6 : 0.5,
            });
        }

        // CTA magnetic effect
        const btn = ctaBtnRef.current;
        if (btn) {
            const handleMove = (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.4, ease: "power2.out" });
            };
            const handleLeave = () => {
                gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
            };
            btn.addEventListener("mousemove", handleMove);
            btn.addEventListener("mouseleave", handleLeave);
        }
    }, [mounted, pathname, activeIndex, slideGlassTo]);

    // Reposition glass on resize
    useEffect(() => {
        const handleResize = () => {
            const el = linkRefs.current[activeIndex];
            if (el) slideGlassTo(el, false);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [activeIndex, slideGlassTo]);

    const handleClick = (e, item, index) => {
        setActiveIndex(index);
        const el = linkRefs.current[index];
        if (el) slideGlassTo(el, true);

        if (item.scroll) {
            const isHome = pathname === "/";
            if (isHome) {
                e.preventDefault();
                const target = document.querySelector(item.scroll);
                if (target) {
                    gsap.to(window, {
                        scrollTo: { y: target, offsetY: 80 },
                        duration: 1.2,
                        ease: "power3.inOut",
                    });
                }
            }
        }
    };

    return (
        <nav className="navbar" ref={navRef} id="navbar">
            <div className="navbar__logos">
                <Link href="/">
                    <Image
                        src="/ieee-logo.png"
                        alt="IEEE Logo"
                        width={120}
                        height={48}
                        className="navbar__logo-img"
                        priority
                    />
                </Link>
                <div className="navbar__logo-divider" />
                <Link href="/">
                    <Image
                        src="/ieee-ras-logo.jpg"
                        alt="IEEE RAS Logo"
                        width={120}
                        height={48}
                        className="navbar__logo-img"
                        priority
                    />
                </Link>
            </div>

            <div className="navbar__links-container" ref={linksRef}>
                <div className="navbar__glass" ref={glassRef} />

                <ul className="navbar__links">
                    {NAV_ITEMS.map((item, i) => (
                        <li key={item.label}>
                            {item.scroll ? (
                                <a
                                    href={item.href}
                                    className={`navbar__link${mounted && activeIndex === i ? " navbar__link--active" : ""}`}
                                    ref={(el) => (linkRefs.current[i] = el)}
                                    onClick={(e) => handleClick(e, item, i)}
                                >
                                    {item.label}
                                </a>
                            ) : (
                                <Link
                                    href={item.href}
                                    className={`navbar__link${mounted && activeIndex === i ? " navbar__link--active" : ""}`}
                                    ref={(el) => (linkRefs.current[i] = el)}
                                    onClick={(e) => handleClick(e, item, i)}
                                >
                                    {item.label}
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="glow-btn-wrapper navbar__cta-wrapper">
                <button
                    className="glow-btn navbar__cta"
                    id="navbar-cta"
                    ref={ctaBtnRef}
                    onClick={() => {
                        window.location.href = "/contact";
                    }}
                >
                    <span className="glow-btn__glow" ref={ctaGlowRef} />
                    <span className="glow-btn__text">Join the Revolution</span>
                    <span className="glow-btn__arrow">→</span>
                </button>
            </div>
        </nav>
    );
}
