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
    { label: "Events", href: "/#features", scroll: "#features" },
    { label: "Team", href: "/#members", scroll: "#members" },
    { label: "Contact", href: "/#contact", scroll: "#contact" },
];

export default function Navbar() {
    const pathname = usePathname();
    const navRef = useRef(null);
    const linksRef = useRef(null);
    const glassRef = useRef(null);
    const linkRefs = useRef([]);
    // Always start with 0 on both server and client to avoid hydration mismatch
    const [activeIndex, setActiveIndex] = useState(0);
    const [mounted, setMounted] = useState(false);

    // After mount, set the correct active index from pathname
    useEffect(() => {
        setMounted(true);
        if (pathname === "/about") {
            setActiveIndex(1);
        } else {
            setActiveIndex(0);
        }
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
        const delay = isHome ? 2.6 : 0.3;

        if (navRef.current) {
            gsap.fromTo(
                navRef.current,
                { opacity: 0, y: -20, filter: "blur(10px)" },
                {
                    opacity: 1, y: 0, filter: "blur(0px)",
                    duration: 1, delay, ease: "power3.out",
                    onComplete: () => {
                        const el = linkRefs.current[activeIndex];
                        if (el) slideGlassTo(el, false);
                    },
                }
            );
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

            <button
                className="navbar__cta"
                id="navbar-cta"
                onClick={(e) => {
                    e.preventDefault();
                    setActiveIndex(4);
                    const el = linkRefs.current[4];
                    if (el) slideGlassTo(el, true);

                    const isHome = pathname === "/";
                    if (isHome) {
                        const target = document.querySelector("#contact");
                        if (target) {
                            gsap.to(window, {
                                scrollTo: { y: target, offsetY: 80 },
                                duration: 1.2,
                                ease: "power3.inOut",
                            });
                        }
                    } else {
                        window.location.href = "/#contact";
                    }
                }}
            >
                Join Chapter
            </button>
        </nav>
    );
}
