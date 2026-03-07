"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GlowButton from "../components/GlowButton";

export default function GalleryPage() {
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
                { opacity: 0, scale: 0.5, rotation: 10 },
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

            // Floating icon idle
            gsap.to(iconRef.current, {
                y: -10,
                duration: 2.8,
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

                        {/* Camera/Gallery icon */}
                        <div className="stay-tuned__icon" ref={iconRef}>
                            <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="8" y="24" width="64" height="44" rx="8" stroke="#c9184a" strokeWidth="2.5" fill="rgba(201,24,74,0.08)" />
                                <path d="M28 24 L32 16 L48 16 L52 24" stroke="#c9184a" strokeWidth="2.5" fill="rgba(201,24,74,0.1)" strokeLinejoin="round" />
                                <circle cx="40" cy="46" r="12" stroke="#c9184a" strokeWidth="2.5" fill="rgba(201,24,74,0.08)" />
                                <circle cx="40" cy="46" r="6" fill="#c9184a" opacity="0.3" />
                                <circle cx="58" cy="32" r="3" fill="#c9184a" opacity="0.5" />
                                {/* Sparkle */}
                                <path d="M64 18 L66 14 L68 18 L72 20 L68 22 L66 26 L64 22 L60 20Z" fill="#7b2cbf" opacity="0.8" />
                            </svg>
                        </div>

                        <h1 className="stay-tuned__title" ref={titleRef}>
                            Gallery <span className="stay-tuned__highlight">Coming Soon</span>
                        </h1>

                        <p className="stay-tuned__subtitle" ref={subtitleRef}>
                            Photos from our hackathons, workshops, and community events will
                            be showcased here. New images will be updated soon — stay tuned!
                        </p>

                        <div className="stay-tuned__actions">
                            <GlowButton text="Contact Us" href="/contact" />
                        </div>

                        {/* Status indicator */}
                        <div className="stay-tuned__status">
                            <span className="stay-tuned__status-dot" />
                            <span className="stay-tuned__status-text">Gallery updating soon</span>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
