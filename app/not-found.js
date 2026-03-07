"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function NotFound() {
    const sectionRef = useRef(null);
    const codeRef = useRef(null);
    const titleRef = useRef(null);
    const descRef = useRef(null);
    const btnRef = useRef(null);
    const glowRef = useRef(null);
    const robotRef = useRef(null);
    const scanlineRef = useRef(null);
    const floatParticlesRef = useRef([]);
    const router = useRouter();

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.3 });

            // Robot SVG bounces in
            tl.fromTo(robotRef.current,
                { opacity: 0, scale: 0.5, y: 60, rotation: -10 },
                { opacity: 1, scale: 1, y: 0, rotation: 0, duration: 1, ease: "elastic.out(1, 0.5)" }
            );

            // Scanline sweep on robot
            if (scanlineRef.current) {
                gsap.to(scanlineRef.current, {
                    y: 120,
                    duration: 2,
                    repeat: -1,
                    ease: "power1.inOut",
                    yoyo: true,
                    delay: 1.5,
                });
            }

            // 404 code
            tl.fromTo(codeRef.current,
                { opacity: 0, y: 40, filter: "blur(12px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" },
                "-=0.5"
            );

            // Title
            tl.fromTo(titleRef.current,
                { opacity: 0, y: 30, filter: "blur(8px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" },
                "-=0.4"
            );

            // Description
            tl.fromTo(descRef.current,
                { opacity: 0, y: 20, filter: "blur(6px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power3.out" },
                "-=0.3"
            );

            // Button
            tl.fromTo(btnRef.current,
                { opacity: 0, y: 20, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(2)" },
                "-=0.2"
            );

            // Floating idle on robot
            gsap.to(robotRef.current, {
                y: -12,
                duration: 3,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 1.5,
            });

            // Button glow pulse
            if (glowRef.current) {
                gsap.to(glowRef.current, {
                    opacity: 0.8, scale: 1.15,
                    duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut",
                });
            }

            // Magnetic button
            const btn = btnRef.current;
            if (btn) {
                const move = (e) => {
                    const rect = btn.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.4, ease: "power2.out" });
                };
                const leave = () => {
                    gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
                };
                btn.addEventListener("mousemove", move);
                btn.addEventListener("mouseleave", leave);
            }

            // Floating particles
            floatParticlesRef.current.forEach((el, i) => {
                if (!el) return;
                gsap.fromTo(el,
                    { opacity: 0, scale: 0 },
                    { opacity: 0.15 + Math.random() * 0.15, scale: 1, duration: 0.6, delay: 1 + i * 0.15, ease: "back.out(2)" }
                );
                gsap.to(el, {
                    y: `${-20 - Math.random() * 40}`,
                    x: `${(Math.random() - 0.5) * 60}`,
                    rotation: Math.random() * 360,
                    duration: 4 + Math.random() * 4,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: Math.random() * 2,
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <Navbar />
            <section className="error-page" ref={sectionRef}>
                <div className="error-page__grain" />

                {/* Floating particles */}
                {[...Array(8)].map((_, i) => (
                    <div
                        key={i}
                        className={`error-page__particle error-page__particle--${i % 3}`}
                        ref={(el) => (floatParticlesRef.current[i] = el)}
                        style={{
                            left: `${10 + Math.random() * 80}%`,
                            top: `${15 + Math.random() * 70}%`,
                        }}
                    />
                ))}

                {/* Broken Robot SVG */}
                <div className="error-page__illustration" ref={robotRef}>
                    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="error-page__robot">
                        {/* Body */}
                        <rect x="55" y="80" width="90" height="70" rx="16" fill="#1a1a1a" />
                        {/* Head */}
                        <rect x="65" y="35" width="70" height="50" rx="14" fill="#1a1a1a" />
                        {/* Antenna */}
                        <line x1="100" y1="35" x2="100" y2="18" stroke="#1a1a1a" strokeWidth="4" strokeLinecap="round" />
                        <circle cx="100" cy="14" r="6" fill="#c9184a" />
                        {/* Eyes — X marks (broken) */}
                        <line x1="82" y1="52" x2="92" y2="62" stroke="#c9184a" strokeWidth="3" strokeLinecap="round" />
                        <line x1="92" y1="52" x2="82" y2="62" stroke="#c9184a" strokeWidth="3" strokeLinecap="round" />
                        <line x1="108" y1="52" x2="118" y2="62" stroke="#c9184a" strokeWidth="3" strokeLinecap="round" />
                        <line x1="118" y1="52" x2="108" y2="62" stroke="#c9184a" strokeWidth="3" strokeLinecap="round" />
                        {/* Mouth — zigzag */}
                        <polyline points="80,72 88,68 96,74 104,68 112,74 120,68" stroke="#c9184a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                        {/* Arms */}
                        <rect x="30" y="90" width="25" height="10" rx="5" fill="#1a1a1a" />
                        <rect x="145" y="90" width="25" height="10" rx="5" fill="#1a1a1a" />
                        {/* Legs */}
                        <rect x="72" y="150" width="14" height="24" rx="7" fill="#1a1a1a" />
                        <rect x="114" y="150" width="14" height="24" rx="7" fill="#1a1a1a" />
                        {/* Bolt on chest */}
                        <circle cx="100" cy="115" r="8" fill="none" stroke="#c9184a" strokeWidth="2.5" />
                        <line x1="100" y1="109" x2="100" y2="121" stroke="#c9184a" strokeWidth="2.5" strokeLinecap="round" />
                        <line x1="94" y1="115" x2="106" y2="115" stroke="#c9184a" strokeWidth="2.5" strokeLinecap="round" />
                        {/* Scanline */}
                        <rect ref={scanlineRef} x="55" y="80" width="90" height="3" rx="1.5" fill="rgba(201,24,74,0.25)" />
                        {/* Spark effects */}
                        <circle cx="48" cy="88" r="3" fill="#c9184a" opacity="0.6" />
                        <circle cx="155" cy="95" r="2" fill="#7b2cbf" opacity="0.5" />
                        <line x1="42" y1="85" x2="35" y2="78" stroke="#c9184a" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                        <line x1="160" y1="92" x2="168" y2="87" stroke="#7b2cbf" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
                    </svg>
                </div>

                <span className="error-page__code" ref={codeRef}>404</span>
                <h1 className="error-page__title" ref={titleRef}>Page Not Found</h1>
                <p className="error-page__desc" ref={descRef}>
                    Looks like our robot wandered off! The page you&apos;re looking for doesn&apos;t exist or has been moved.
                </p>

                <div className="glow-btn-wrapper">
                    <button
                        className="glow-btn error-page__btn"
                        ref={btnRef}
                        onClick={() => router.push("/")}
                    >
                        <span className="glow-btn__glow" ref={glowRef} />
                        <span className="glow-btn__text">Back to Home</span>
                        <span className="glow-btn__arrow">→</span>
                    </button>
                </div>
            </section>
            <Footer />
        </>
    );
}
