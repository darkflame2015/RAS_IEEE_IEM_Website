"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Hero() {
    const sectionRef = useRef(null);
    const badgeRef = useRef(null);
    const titleLine1Ref = useRef(null);
    const titleLine2Ref = useRef(null);
    const titleLine3Ref = useRef(null);
    const subtitleRef = useRef(null);
    const buttonsRef = useRef(null);
    const orb1Ref = useRef(null);
    const orb2Ref = useRef(null);
    const orb3Ref = useRef(null);

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

            // Underglow pulse on primary button
            const primaryBtn = buttonsRef.current?.querySelector(".hero__btn--primary");
            if (primaryBtn) {
                gsap.to(primaryBtn, {
                    boxShadow: "0 6px 30px rgba(201, 24, 74, 0.3), 0 20px 60px -10px rgba(201, 24, 74, 0.5)",
                    duration: 1.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                    delay: 4,
                });
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const scrollTo = (id) => {
        const el = document.querySelector(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <section className="hero" ref={sectionRef} id="hero">
            {/* Grain overlay */}
            <div className="hero__grain" />

            {/* Soft gradient orbs */}
            <div className="hero__orb hero__orb--1" ref={orb1Ref} />
            <div className="hero__orb hero__orb--2" ref={orb2Ref} />
            <div className="hero__orb hero__orb--3" ref={orb3Ref} />

            {/* Badge */}
            <div className="hero__badge" ref={badgeRef}>
                <span className="hero__badge-dot" />
                IEEE RAS Student Chapter
            </div>

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
                <button
                    className="hero__btn hero__btn--primary"
                    id="hero-cta-primary"
                    onClick={() => scrollTo("#features")}
                >
                    Explore Events
                </button>
                <button
                    className="hero__btn hero__btn--secondary"
                    id="hero-cta-secondary"
                    onClick={() => scrollTo("#members")}
                >
                    Meet the Team
                </button>
            </div>
        </section>
    );
}
