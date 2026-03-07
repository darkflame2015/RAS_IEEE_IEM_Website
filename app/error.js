"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Error({ error, reset }) {
    const sectionRef = useRef(null);
    const iconRef = useRef(null);
    const codeRef = useRef(null);
    const titleRef = useRef(null);
    const descRef = useRef(null);
    const btnsRef = useRef(null);
    const retryBtnRef = useRef(null);
    const retryGlowRef = useRef(null);
    const [isOffline, setIsOffline] = useState(false);

    useEffect(() => {
        // Detect offline status
        setIsOffline(!navigator.onLine);

        const goOnline = () => setIsOffline(false);
        const goOffline = () => setIsOffline(true);
        window.addEventListener("online", goOnline);
        window.addEventListener("offline", goOffline);

        return () => {
            window.removeEventListener("online", goOnline);
            window.removeEventListener("offline", goOffline);
        };
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.2 });

            // Icon entrance
            tl.fromTo(iconRef.current,
                { opacity: 0, scale: 0.3, rotation: -45 },
                { opacity: 1, scale: 1, rotation: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" }
            );

            // Idle shake on the icon
            gsap.to(iconRef.current, {
                rotation: 3,
                duration: 0.15,
                repeat: 5,
                yoyo: true,
                delay: 1.2,
                ease: "power2.inOut",
                onComplete: () => {
                    gsap.set(iconRef.current, { rotation: 0 });
                },
            });

            // Code
            tl.fromTo(codeRef.current,
                { opacity: 0, y: 30, filter: "blur(10px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power3.out" },
                "-=0.3"
            );

            // Title
            tl.fromTo(titleRef.current,
                { opacity: 0, y: 25, filter: "blur(8px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, ease: "power3.out" },
                "-=0.3"
            );

            // Description
            tl.fromTo(descRef.current,
                { opacity: 0, y: 20, filter: "blur(6px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power3.out" },
                "-=0.2"
            );

            // Buttons
            tl.fromTo(btnsRef.current,
                { opacity: 0, y: 20, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: "back.out(2)" },
                "-=0.15"
            );

            // Floating idle on icon
            gsap.to(iconRef.current, {
                y: -8,
                duration: 2.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 1.5,
            });

            // Retry button glow
            if (retryGlowRef.current) {
                gsap.to(retryGlowRef.current, {
                    opacity: 0.8, scale: 1.15,
                    duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut",
                });
            }

            // Magnetic retry button
            const btn = retryBtnRef.current;
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
        }, sectionRef);

        return () => ctx.revert();
    }, [isOffline]);

    const errorTitle = isOffline ? "You're Offline" : "Something Went Wrong";
    const errorCode = isOffline ? "OFFLINE" : "ERROR";
    const errorDesc = isOffline
        ? "It looks like you've lost your internet connection. Check your network and try again."
        : "An unexpected error occurred. Our robot is on it — try refreshing or come back in a moment.";

    return (
        <>
            <Navbar />
            <section className="error-page" ref={sectionRef}>
                <div className="error-page__grain" />

                {/* Icon — changes based on error type */}
                <div className="error-page__illustration" ref={iconRef}>
                    {isOffline ? (
                        /* Offline — broken signal icon */
                        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="error-page__robot">
                            <circle cx="100" cy="130" r="14" fill="#1a1a1a" />
                            <path d="M68 105a45 45 0 0164 0" fill="none" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" />
                            <path d="M48 82a75 75 0 01104 0" fill="none" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" />
                            <path d="M28 60a105 105 0 01144 0" fill="none" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round" />
                            {/* Slash through */}
                            <line x1="40" y1="155" x2="160" y2="45" stroke="#c9184a" strokeWidth="6" strokeLinecap="round" />
                            {/* Sparks */}
                            <circle cx="155" cy="50" r="4" fill="#c9184a" opacity="0.6" />
                            <circle cx="45" cy="150" r="3" fill="#7b2cbf" opacity="0.5" />
                        </svg>
                    ) : (
                        /* Runtime error — warning triangle with exclamation */
                        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="error-page__robot">
                            <path d="M100 30L20 170h160L100 30z" fill="#1a1a1a" />
                            <path d="M100 50L35 160h130L100 50z" fill="#faf7f4" />
                            <rect x="95" y="80" width="10" height="42" rx="5" fill="#c9184a" />
                            <circle cx="100" cy="138" r="7" fill="#c9184a" />
                            {/* Sparks */}
                            <circle cx="28" cy="168" r="4" fill="#c9184a" opacity="0.4" />
                            <circle cx="172" cy="168" r="3" fill="#7b2cbf" opacity="0.4" />
                            <line x1="16" y1="172" x2="8" y2="178" stroke="#c9184a" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
                            <line x1="180" y1="165" x2="190" y2="160" stroke="#7b2cbf" strokeWidth="2.5" strokeLinecap="round" opacity="0.4" />
                        </svg>
                    )}
                </div>

                <span className="error-page__code" ref={codeRef}>{errorCode}</span>
                <h1 className="error-page__title" ref={titleRef}>{errorTitle}</h1>
                <p className="error-page__desc" ref={descRef}>{errorDesc}</p>

                <div className="error-page__actions" ref={btnsRef}>
                    <div className="glow-btn-wrapper">
                        <button
                            className="glow-btn error-page__btn"
                            ref={retryBtnRef}
                            onClick={() => reset()}
                        >
                            <span className="glow-btn__glow" ref={retryGlowRef} />
                            <span className="glow-btn__text">{isOffline ? "Try Again" : "Retry"}</span>
                            <span className="glow-btn__arrow">↻</span>
                        </button>
                    </div>
                    <button
                        className="hero__btn hero__btn--secondary error-page__btn-secondary"
                        onClick={() => (window.location.href = "/")}
                    >
                        Back to Home
                    </button>
                </div>

                {/* Status indicator */}
                <div className={`error-page__status ${isOffline ? "error-page__status--offline" : "error-page__status--online"}`}>
                    <span className="error-page__status-dot" />
                    {isOffline ? "No connection" : "Connection active"}
                </div>
            </section>
            <Footer />
        </>
    );
}
