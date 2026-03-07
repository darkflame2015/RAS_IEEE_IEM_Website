"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";

export default function Hero() {
    const sectionRef = useRef(null);
    const badgeRef = useRef(null);
    const badgeTextRef = useRef(null);
    const badgeGlowRef = useRef(null);
    const badgeShimmerRef = useRef(null);
    const badgeArrowRef = useRef(null);
    const badgeHintRef = useRef(null);
    const badgeParticlesRef = useRef(null);
    const titleLine1Ref = useRef(null);
    const titleLine2Ref = useRef(null);
    const titleLine3Ref = useRef(null);
    const subtitleRef = useRef(null);
    const buttonsRef = useRef(null);
    const orb1Ref = useRef(null);
    const orb2Ref = useRef(null);
    const orb3Ref = useRef(null);
    const primaryBtnRef = useRef(null);
    const primaryGlowRef = useRef(null);
    const router = useRouter();
    const badgeHoverTl = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 2.8 });

            // Floating orbs
            [orb1Ref, orb2Ref, orb3Ref].forEach((ref, i) => {
                if (ref.current) {
                    gsap.to(ref.current, {
                        y: `${20 + i * 10}`,
                        x: `${15 + i * 8}`,
                        duration: 8 + i * 2,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                    });
                }
            });

            // Badge with blur reveal
            tl.fromTo(
                badgeRef.current,
                { opacity: 0, y: 20, filter: "blur(10px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }
            );

            // Title lines — staggered blur reveal
            tl.fromTo(
                [titleLine1Ref.current, titleLine2Ref.current, titleLine3Ref.current],
                { opacity: 0, y: "110%", filter: "blur(8px)" },
                {
                    opacity: 1,
                    y: "0%",
                    filter: "blur(0px)",
                    duration: 1.2,
                    stagger: 0.15,
                    ease: "power4.out",
                },
                "-=0.3"
            );

            // Subtitle
            tl.fromTo(
                subtitleRef.current,
                { opacity: 0, y: 20, filter: "blur(6px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, ease: "power3.out" },
                "-=0.6"
            );

            // Buttons
            tl.fromTo(
                buttonsRef.current,
                { opacity: 0, y: 20, filter: "blur(6px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" },
                "-=0.5"
            );

            // Pulsing glow on primary button
            if (primaryGlowRef.current) {
                gsap.to(primaryGlowRef.current, {
                    opacity: 0.8,
                    scale: 1.15,
                    duration: 1.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: 4,
                });
            }

            // Magnetic effect on primary button
            const btn = primaryBtnRef.current;
            if (btn) {
                const handleMove = (e) => {
                    const rect = btn.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.4, ease: "power2.out" });
                };
                const handleLeave = () => {
                    gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
                };
                btn.addEventListener("mousemove", handleMove);
                btn.addEventListener("mouseleave", handleLeave);
            }

            // ====== IEEE RAS Badge — Attention-grabbing GSAP hover animation ======
            const badge = badgeRef.current;
            const badgeGlow = badgeGlowRef.current;
            const badgeShimmer = badgeShimmerRef.current;
            const badgeArrow = badgeArrowRef.current;
            const badgeHint = badgeHintRef.current;
            const badgeParticles = badgeParticlesRef.current;
            const badgeText = badgeTextRef.current;

            if (badge) {
                // Subtle idle pulse to draw attention (starts after intro animation)
                gsap.to(badge, {
                    boxShadow: "0 0 20px rgba(201,24,74,0.25), 0 0 40px rgba(123,44,191,0.12)",
                    duration: 2,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: 4.5,
                });

                // Idle shimmer loop across badge
                if (badgeShimmer) {
                    gsap.to(badgeShimmer, {
                        x: "300%",
                        duration: 3,
                        repeat: -1,
                        ease: "power1.inOut",
                        delay: 5,
                        repeatDelay: 4,
                    });
                }

                // Build the hover timeline (paused)
                const hoverTl = gsap.timeline({ paused: true });

                hoverTl
                    // 1. Scale up with elastic ease + fill with accent gradient
                    .to(badge, {
                        scale: 1.08,
                        duration: 0.4,
                        ease: "back.out(2.5)",
                        borderColor: "#c9184a",
                        background: "linear-gradient(135deg, #800f2f 0%, #c9184a 50%, #7b2cbf 100%)",
                    }, 0)
                    // 2. Intensify the glow behind badge
                    .to(badgeGlow, {
                        opacity: 1,
                        scale: 1.6,
                        duration: 0.5,
                        ease: "power2.out",
                    }, 0)
                    // 3. Fast shimmer sweep
                    .fromTo(badgeShimmer, {
                        x: "-100%",
                    }, {
                        x: "300%",
                        duration: 0.6,
                        ease: "power2.inOut",
                    }, 0)
                    // 4. Arrow slides in from left (white)
                    .to(badgeArrow, {
                        x: 0,
                        opacity: 1,
                        color: "#ffffff",
                        duration: 0.35,
                        ease: "back.out(3)",
                    }, 0.1)
                    // 5. Arrow continuous nudge
                    .to(badgeArrow, {
                        x: 5,
                        duration: 0.4,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                    }, 0.45)
                    // 6. Hint text fades in below
                    .to(badgeHint, {
                        opacity: 1,
                        y: 0,
                        duration: 0.35,
                        ease: "power3.out",
                    }, 0.15)
                    // 7. Badge text color shift to white on hover
                    .to(badgeText, {
                        color: "#ffffff",
                        letterSpacing: "0.06em",
                        duration: 0.3,
                        ease: "power2.out",
                    }, 0)
                    // 8. Dot pulse (white)
                    .to(badge.querySelector(".hero__badge-dot"), {
                        scale: 1.8,
                        background: "#ffffff",
                        boxShadow: "0 0 12px rgba(255,255,255,0.8)",
                        duration: 0.4,
                        ease: "power2.out",
                    }, 0);

                badgeHoverTl.current = hoverTl;

                // Spawn particles on hover
                const spawnParticles = () => {
                    if (!badgeParticles) return;
                    for (let i = 0; i < 8; i++) {
                        const particle = document.createElement("span");
                        particle.className = "hero__badge-particle";
                        badgeParticles.appendChild(particle);
                        const angle = (i / 8) * Math.PI * 2;
                        const distance = 30 + Math.random() * 25;
                        gsap.fromTo(particle, {
                            x: 0, y: 0, scale: 1, opacity: 1,
                        }, {
                            x: Math.cos(angle) * distance,
                            y: Math.sin(angle) * distance,
                            scale: 0,
                            opacity: 0,
                            duration: 0.6 + Math.random() * 0.3,
                            ease: "power2.out",
                            onComplete: () => particle.remove(),
                        });
                    }
                };

                // Magnetic follow on badge
                const badgeMove = (e) => {
                    const rect = badge.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    gsap.to(badge, { x: x * 0.15, y: y * 0.15, duration: 0.3, ease: "power2.out" });
                };

                const badgeEnter = () => {
                    badgeHoverTl.current?.play();
                    spawnParticles();
                };

                const badgeLeave = () => {
                    badgeHoverTl.current?.reverse();
                    gsap.to(badge, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
                };

                badge.addEventListener("mouseenter", badgeEnter);
                badge.addEventListener("mousemove", badgeMove);
                badge.addEventListener("mouseleave", badgeLeave);
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="hero" ref={sectionRef} id="hero">
            {/* Grain overlay */}
            <div className="hero__grain" />

            {/* Soft gradient orbs */}
            <div className="hero__orb hero__orb--1" ref={orb1Ref} />
            <div className="hero__orb hero__orb--2" ref={orb2Ref} />
            <div className="hero__orb hero__orb--3" ref={orb3Ref} />

            {/* Badge — Clickable CTA to Contact Page */}
            <button
                className="hero__badge hero__badge--cta"
                ref={badgeRef}
                onClick={() => router.push("/contact")}
                aria-label="IEEE RAS Student Chapter — Get in touch"
            >
                <span className="hero__badge-glow" ref={badgeGlowRef} />
                <span className="hero__badge-shimmer" ref={badgeShimmerRef} />
                <span className="hero__badge-dot" />
                <span className="hero__badge-text" ref={badgeTextRef}>IEEE RAS Student Chapter</span>
                <span className="hero__badge-arrow" ref={badgeArrowRef}>→</span>
                <span className="hero__badge-particles" ref={badgeParticlesRef} />
                <span className="hero__badge-hint" ref={badgeHintRef}>Join Us Today</span>
            </button>

            <h1 className="hero__title">
                <span className="hero__title-line">
                    <span className="hero__title-text" ref={titleLine1Ref}>
                        Build.
                    </span>
                </span>
                <span className="hero__title-line">
                    <span className="hero__title-text hero__title-gradient" ref={titleLine2Ref}>
                        Innovate.
                    </span>
                </span>
                <span className="hero__title-line">
                    <span className="hero__title-text" ref={titleLine3Ref}>
                        Automate.
                    </span>
                </span>
            </h1>

            <p className="hero__subtitle" ref={subtitleRef}>
                Where students get hands-on with robotics, compete in hackathons,
                build real projects, and shape the future of automation — one event at a time.
            </p>

            <div className="hero__buttons" ref={buttonsRef}>
                <div className="glow-btn-wrapper">
                    <button
                        className="glow-btn hero__btn--primary"
                        id="hero-cta-primary"
                        ref={primaryBtnRef}
                        onClick={() => router.push("/contact")}
                    >
                        <span className="glow-btn__glow" ref={primaryGlowRef} />
                        <span className="glow-btn__text">Ignite Your Future</span>
                        <span className="glow-btn__arrow">→</span>
                    </button>
                </div>
                <button
                    className="hero__btn hero__btn--secondary"
                    id="hero-cta-secondary"
                    onClick={() => {
                        const el = document.querySelector("#members");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                >
                    Discover the Squad
                </button>
            </div>
        </section>
    );
}
