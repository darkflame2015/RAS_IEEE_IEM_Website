"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GlowButton from "../components/GlowButton";

export default function EventsPage() {
    const sectionRef = useRef(null);
    const iconRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const pulseRingsRef = useRef([]);
    const particlesRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Icon entrance
            gsap.fromTo(
                iconRef.current,
                { opacity: 0, scale: 0.5, rotation: -15 },
                { opacity: 1, scale: 1, rotation: 0, duration: 1.2, delay: 0.3, ease: "elastic.out(1, 0.6)" }
            );

            // Title entrance
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: 40, filter: "blur(10px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, delay: 0.5, ease: "power3.out" }
            );

            // Subtitle entrance
            gsap.fromTo(
                subtitleRef.current,
                { opacity: 0, y: 30, filter: "blur(8px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, delay: 0.7, ease: "power3.out" }
            );

            // Pulse rings
            const rings = pulseRingsRef.current.filter(Boolean);
            rings.forEach((ring, i) => {
                gsap.fromTo(
                    ring,
                    { scale: 0.8, opacity: 0.6 },
                    {
                        scale: 1.8 + i * 0.3,
                        opacity: 0,
                        duration: 2.5 + i * 0.4,
                        repeat: -1,
                        delay: i * 0.6,
                        ease: "power1.out",
                    }
                );
            });

            // Floating icon idle animation
            gsap.to(iconRef.current, {
                y: -12,
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            // Particles float
            if (particlesRef.current) {
                const dots = particlesRef.current.querySelectorAll(".stay-tuned__particle");
                dots.forEach((dot) => {
                    gsap.set(dot, {
                        x: Math.random() * 300 - 150,
                        y: Math.random() * 300 - 150,
                        opacity: 0.2 + Math.random() * 0.4,
                        scale: 0.3 + Math.random() * 0.7,
                    });
                    gsap.to(dot, {
                        y: `+=${-40 - Math.random() * 60}`,
                        x: `+=${Math.random() * 40 - 20}`,
                        opacity: 0,
                        duration: 3 + Math.random() * 3,
                        repeat: -1,
                        delay: Math.random() * 2,
                        ease: "power1.out",
                    });
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <Navbar />
            <main>
                <section className="stay-tuned" ref={sectionRef}>
                    <div className="stay-tuned__bg-grid" />

                    {/* Floating particles */}
                    <div className="stay-tuned__particles" ref={particlesRef}>
                        {Array.from({ length: 20 }).map((_, i) => (
                            <span key={i} className="stay-tuned__particle" />
                        ))}
                    </div>

                    <div className="stay-tuned__content">
                        {/* Pulse rings behind icon */}
                        <div className="stay-tuned__pulse-container">
                            {[0, 1, 2].map((i) => (
                                <span
                                    key={i}
                                    className="stay-tuned__pulse-ring"
                                    ref={(el) => (pulseRingsRef.current[i] = el)}
                                />
                            ))}
                        </div>

                        {/* Calendar/Event icon */}
                        <div className="stay-tuned__icon" ref={iconRef}>
                            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="10" y="18" width="60" height="52" rx="8" stroke="#c9184a" strokeWidth="2.5" fill="rgba(201,24,74,0.08)" />
                                <rect x="10" y="18" width="60" height="16" rx="8" fill="#c9184a" opacity="0.2" />
                                <line x1="24" y1="10" x2="24" y2="24" stroke="#c9184a" strokeWidth="2.5" strokeLinecap="round" />
                                <line x1="56" y1="10" x2="56" y2="24" stroke="#c9184a" strokeWidth="2.5" strokeLinecap="round" />
                                <circle cx="30" cy="46" r="3" fill="#c9184a" opacity="0.6" />
                                <circle cx="40" cy="46" r="3" fill="#c9184a" />
                                <circle cx="50" cy="46" r="3" fill="#c9184a" opacity="0.6" />
                                <circle cx="30" cy="58" r="3" fill="#c9184a" opacity="0.3" />
                                <circle cx="40" cy="58" r="3" fill="#c9184a" opacity="0.5" />
                                <circle cx="50" cy="58" r="3" fill="#c9184a" opacity="0.3" />
                                <path d="M60 12 L62 8 L64 12 L68 14 L64 16 L62 20 L60 16 L56 14Z" fill="#7b2cbf" opacity="0.8" />
                            </svg>
                        </div>

                        <h1 className="stay-tuned__title" ref={titleRef}>
                            Exciting Events <span className="stay-tuned__highlight">Coming Soon</span>
                        </h1>

                        <p className="stay-tuned__subtitle" ref={subtitleRef}>
                            We&apos;re planning hackathons, workshops, technical talks, and more.
                            New events will be updated here — stay tuned for announcements!
                        </p>

                        <div className="stay-tuned__actions">
                            <GlowButton text="Get Notified" href="/contact" />
                        </div>

                        {/* Status indicator */}
                        <div className="stay-tuned__status">
                            <span className="stay-tuned__status-dot" />
                            <span className="stay-tuned__status-text">Page updating soon</span>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
