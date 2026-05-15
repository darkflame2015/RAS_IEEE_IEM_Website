"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import siteConfig from "../../config/site";

const NAV_ITEMS = siteConfig.navItems;

export default function MobileMenu() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const overlayRef = useRef(null);
    const linksRef = useRef([]);
    const ctaRef = useRef(null);
    const fabRef = useRef(null);
    const tlRef = useRef(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Close menu on route change
    useEffect(() => {
        if (isOpen) {
            closeMenu();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    const openMenu = useCallback(() => {
        setIsOpen(true);
        document.body.style.overflow = "hidden";

        // Animate after state update
        requestAnimationFrame(() => {
            const overlay = overlayRef.current;
            const links = linksRef.current.filter(Boolean);
            const cta = ctaRef.current;

            if (!overlay) return;

            const tl = gsap.timeline();
            tlRef.current = tl;

            // Overlay backdrop
            tl.fromTo(overlay,
                { opacity: 0, visibility: "visible" },
                { opacity: 1, duration: 0.4, ease: "power2.out" }
            );

            // Stagger links
            if (links.length > 0) {
                tl.fromTo(links,
                    { opacity: 0, y: 30, filter: "blur(6px)" },
                    {
                        opacity: 1, y: 0, filter: "blur(0px)",
                        duration: 0.5, stagger: 0.07, ease: "power3.out"
                    },
                    "-=0.2"
                );
            }

            // CTA button
            if (cta) {
                tl.fromTo(cta,
                    { opacity: 0, y: 20, scale: 0.9 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "back.out(1.7)" },
                    "-=0.25"
                );
            }

            // Animate FAB to X
            if (fabRef.current) {
                gsap.to(fabRef.current, {
                    rotation: 90,
                    duration: 0.4,
                    ease: "power2.out"
                });
            }
        });
    }, []);

    const closeMenu = useCallback(() => {
        const overlay = overlayRef.current;
        if (!overlay) {
            setIsOpen(false);
            document.body.style.overflow = "";
            return;
        }

        // Kill running timeline
        if (tlRef.current) tlRef.current.kill();

        gsap.to(overlay, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
            onComplete: () => {
                setIsOpen(false);
                document.body.style.overflow = "";
            }
        });

        // Animate FAB back
        if (fabRef.current) {
            gsap.to(fabRef.current, {
                rotation: 0,
                duration: 0.4,
                ease: "power2.out"
            });
        }
    }, []);

    const toggleMenu = useCallback(() => {
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }, [isOpen, openMenu, closeMenu]);

    if (!mounted) return null;

    return (
        <>
            {/* ── Floating Action Button ── */}
            <button
                className="mobile-fab"
                onClick={toggleMenu}
                ref={fabRef}
                id="mobile-menu-fab"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
            >
                <div className={`mobile-fab__icon ${isOpen ? "mobile-fab__icon--open" : ""}`}>
                    <span className="mobile-fab__bar mobile-fab__bar--1" />
                    <span className="mobile-fab__bar mobile-fab__bar--2" />
                    <span className="mobile-fab__bar mobile-fab__bar--3" />
                </div>
                <span className="mobile-fab__glow" />
            </button>

            {/* ── Fullscreen Overlay ── */}
            {isOpen && (
                <div
                    className="mobile-menu"
                    ref={overlayRef}
                    style={{ opacity: 0, visibility: "hidden" }}
                >
                    <div className="mobile-menu__grain" />
                    <div className="mobile-menu__orb mobile-menu__orb--1" />
                    <div className="mobile-menu__orb mobile-menu__orb--2" />

                    <nav className="mobile-menu__nav">
                        <ul className="mobile-menu__links">
                            {NAV_ITEMS.map((item, i) => {
                                const isActive = pathname === item.href;
                                return (
                                    <li
                                        key={item.label}
                                        ref={(el) => (linksRef.current[i] = el)}
                                    >
                                        <Link
                                            href={item.href}
                                            className={`mobile-menu__link ${isActive ? "mobile-menu__link--active" : ""}`}
                                            onClick={closeMenu}
                                            id={`mobile-menu-link-${item.label.toLowerCase()}`}
                                        >
                                            <span className="mobile-menu__link-number">
                                                {String(i + 1).padStart(2, "0")}
                                            </span>
                                            <span className="mobile-menu__link-text">
                                                {item.label}
                                            </span>
                                            {isActive && (
                                                <span className="mobile-menu__link-dot" />
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="mobile-menu__cta" ref={ctaRef}>
                            <Link
                                href="/contact"
                                className="glow-btn mobile-menu__cta-btn"
                                onClick={closeMenu}
                                id="mobile-menu-cta"
                            >
                                <span className="glow-btn__glow" />
                                <span className="glow-btn__text">Join the Revolution</span>
                                <span className="glow-btn__arrow">→</span>
                            </Link>
                        </div>
                    </nav>
                </div>
            )}
        </>
    );
}
