"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const featuresData = [
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
        ),
        iconClass: "feature-card__icon--purple",
        title: "Hackathons",
        desc: "24-hour build sprints where teams prototype robotics solutions, compete for prizes, and push their engineering skills to the limit.",
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
            </svg>
        ),
        iconClass: "feature-card__icon--cyan",
        title: "Hands-On Workshops",
        desc: "From soldering circuits to programming ROS — practical sessions that turn theory into working prototypes you can take home.",
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            </svg>
        ),
        iconClass: "feature-card__icon--pink",
        title: "Technical Talks",
        desc: "Industry professionals and researchers share insights on AI, autonomous systems, and the cutting edge of automation technology.",
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
            </svg>
        ),
        iconClass: "feature-card__icon--purple",
        title: "Project Labs",
        desc: "Dedicated lab access for teams to build autonomous bots, drones, and robotic arms — with mentorship from senior members.",
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
        ),
        iconClass: "feature-card__icon--cyan",
        title: "Industry Connects",
        desc: "Networking events with engineers from leading robotics and tech companies — internships, mentorships, and career pathways.",
    },
    {
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="8.5" cy="7" r="4" /><polyline points="17 11 19 13 23 9" />
            </svg>
        ),
        iconClass: "feature-card__icon--pink",
        title: "Open Community",
        desc: "All branches, all years. Whether you are a freshman curious about robotics or a final-year building your thesis — you belong here.",
    },
];

export default function Features() {
    const sectionRef = useRef(null);
    const labelRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Label blur reveal
            gsap.fromTo(
                labelRef.current,
                { opacity: 0, y: 20, filter: "blur(8px)" },
                {
                    opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out",
                    scrollTrigger: { trigger: labelRef.current, start: "top 90%", toggleActions: "play none none none" },
                }
            );

            // Title blur reveal
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: 20, filter: "blur(8px)" },
                {
                    opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out",
                    scrollTrigger: { trigger: titleRef.current, start: "top 88%", toggleActions: "play none none none" },
                }
            );

            // Cards stagger with blur
            const cards = cardsRef.current.filter(Boolean);
            if (cards.length > 0) {
                gsap.fromTo(
                    cards,
                    { opacity: 0, y: 60, filter: "blur(10px)" },
                    {
                        opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.1, ease: "power3.out",
                        scrollTrigger: { trigger: cards[0].parentElement, start: "top 82%", toggleActions: "play none none none" },
                    }
                );
            }

            // Card tilt on hover
            cards.forEach((card) => {
                if (!card) return;
                const handleMove = (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = ((y - centerY) / centerY) * -6;
                    const rotateY = ((x - centerX) / centerX) * 6;
                    gsap.to(card, {
                        rotateX, rotateY,
                        transformPerspective: 800,
                        duration: 0.4,
                        ease: "power2.out",
                    });
                };
                const handleLeave = () => {
                    gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" });
                };
                card.addEventListener("mousemove", handleMove);
                card.addEventListener("mouseleave", handleLeave);
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="features" ref={sectionRef} id="features">
            <div className="features__header">
                <span className="features__label" ref={labelRef}>
                    What We Do
                </span>
                <h2 className="features__title" ref={titleRef}>
                    Events, Workshops & Beyond
                </h2>
            </div>
            <div className="features__grid">
                {featuresData.map((feature, i) => (
                    <div
                        className="feature-card"
                        key={i}
                        ref={(el) => (cardsRef.current[i] = el)}
                    >
                        <div className={`feature-card__icon ${feature.iconClass}`}>
                            {feature.icon}
                        </div>
                        <h3 className="feature-card__title">{feature.title}</h3>
                        <p className="feature-card__desc">{feature.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
