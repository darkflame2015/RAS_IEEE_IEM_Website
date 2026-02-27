"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const membersData = [
    { name: "Dr. Ananya Sharma", role: "President" },
    { name: "Rahul Verma", role: "Vice President" },
    { name: "Priya Nair", role: "Secretary" },
    { name: "Arjun Patel", role: "Treasurer" },
    { name: "Sanya Gupta", role: "Technical Lead" },
    { name: "Karthik Rajan", role: "Research Head" },
    { name: "Meera Iyer", role: "Events Coordinator" },
    { name: "Vikram Singh", role: "Workshop Lead" },
    { name: "Divya Menon", role: "PR Manager" },
    { name: "Aditya Kumar", role: "Web Developer" },
    { name: "Neha Reddy", role: "Design Lead" },
    { name: "Rohan Das", role: "Outreach Head" },
];

const avatarColors = [
    ["#590d22", "#a4133c"], ["#800f2f", "#7b2cbf"], ["#a4133c", "#590d22"],
    ["#c9184a", "#800f2f"], ["#7b2cbf", "#c9184a"], ["#b23a48", "#7b2cbf"],
    ["#590d22", "#b23a48"], ["#800f2f", "#c9184a"], ["#a4133c", "#7b2cbf"],
    ["#c9184a", "#590d22"], ["#7b2cbf", "#a4133c"], ["#b23a48", "#800f2f"],
];

function getInitials(name) {
    return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

// Each SVG icon: position, scroll motion (toX, toY, rotation)
// Filled black professional icons
const ICONS = [
    {
        id: "gear", x: "4%", y: "8%",
        motion: { x: -60, y: 80, rotation: 180 },
        svg: (
            <svg viewBox="0 0 64 64" fill="black" xmlns="http://www.w3.org/2000/svg">
                <path d="M54.6 36.8l-4.2-1c-.4-1.3-.9-2.5-1.6-3.6l2.2-3.8a2 2 0 00-.3-2.4l-4.7-4.7a2 2 0 00-2.4-.3l-3.8 2.2c-1.1-.7-2.3-1.2-3.6-1.6l-1-4.2A2 2 0 0033.3 16h-6.6a2 2 0 00-2 1.5l-1 4.2c-1.3.4-2.5.9-3.6 1.6l-3.8-2.2a2 2 0 00-2.4.3l-4.7 4.7a2 2 0 00-.3 2.4l2.2 3.8c-.7 1.1-1.2 2.3-1.6 3.6l-4.2 1A2 2 0 008 38.7v6.6a2 2 0 001.5 2l4.2 1c.4 1.3.9 2.5 1.6 3.6l-2.2 3.8a2 2 0 00.3 2.4l4.7 4.7a2 2 0 002.4.3l3.8-2.2c1.1.7 2.3 1.2 3.6 1.6l1 4.2A2 2 0 0030.7 70h6.6a2 2 0 002-1.5l1-4.2c1.3-.4 2.5-.9 3.6-1.6l3.8 2.2a2 2 0 002.4-.3l4.7-4.7a2 2 0 00.3-2.4l-2.2-3.8c.7-1.1 1.2-2.3 1.6-3.6l4.2-1A2 2 0 0056 45.3v-6.6a2 2 0 00-1.4-1.9zM34 50a8 8 0 110-16 8 8 0 010 16z" transform="translate(-2 -10)" />
            </svg>
        ),
    },
    {
        id: "circuit", x: "88%", y: "10%",
        motion: { x: 50, y: 90, rotation: -120 },
        svg: (
            <svg viewBox="0 0 64 64" fill="black" xmlns="http://www.w3.org/2000/svg">
                <rect x="20" y="20" width="24" height="24" rx="4" />
                <rect x="28" y="2" width="4" height="10" rx="2" />
                <rect x="28" y="52" width="4" height="10" rx="2" />
                <rect x="2" y="28" width="10" height="4" rx="2" />
                <rect x="52" y="28" width="10" height="4" rx="2" />
                <rect x="18" y="2" width="4" height="10" rx="2" />
                <rect x="42" y="2" width="4" height="10" rx="2" />
                <rect x="18" y="52" width="4" height="10" rx="2" />
                <rect x="42" y="52" width="4" height="10" rx="2" />
                <rect x="2" y="18" width="10" height="4" rx="2" />
                <rect x="52" y="18" width="10" height="4" rx="2" />
                <rect x="2" y="42" width="10" height="4" rx="2" />
                <rect x="52" y="42" width="10" height="4" rx="2" />
            </svg>
        ),
    },
    {
        id: "bolt", x: "75%", y: "65%",
        motion: { x: 70, y: -60, rotation: 90 },
        svg: (
            <svg viewBox="0 0 64 64" fill="black" xmlns="http://www.w3.org/2000/svg">
                <path d="M38 2L10 36h22l-6 26L54 28H32L38 2z" />
            </svg>
        ),
    },
    {
        id: "hexchip", x: "48%", y: "2%",
        motion: { x: -30, y: 100, rotation: -90 },
        svg: (
            <svg viewBox="0 0 64 64" fill="black" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 4L8 18v28l24 14 24-14V18L32 4zm0 8l18 10.5V41.5L32 52 14 41.5V22.5L32 12z" />
                <circle cx="32" cy="32" r="6" />
            </svg>
        ),
    },
    {
        id: "atom", x: "62%", y: "78%",
        motion: { x: 40, y: -80, rotation: 150 },
        svg: (
            <svg viewBox="0 0 64 64" fill="black" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="5" />
                <ellipse cx="32" cy="32" rx="30" ry="11" stroke="black" strokeWidth="3" fill="none" />
                <ellipse cx="32" cy="32" rx="30" ry="11" stroke="black" strokeWidth="3" fill="none" transform="rotate(60 32 32)" />
                <ellipse cx="32" cy="32" rx="30" ry="11" stroke="black" strokeWidth="3" fill="none" transform="rotate(120 32 32)" />
            </svg>
        ),
    },
    {
        id: "drone", x: "18%", y: "70%",
        motion: { x: -80, y: -40, rotation: -200 },
        svg: (
            <svg viewBox="0 0 64 64" fill="black" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="5" />
                <ellipse cx="14" cy="14" rx="12" ry="5" transform="rotate(-45 14 14)" />
                <ellipse cx="50" cy="14" rx="12" ry="5" transform="rotate(45 50 14)" />
                <ellipse cx="14" cy="50" rx="12" ry="5" transform="rotate(45 14 50)" />
                <ellipse cx="50" cy="50" rx="12" ry="5" transform="rotate(-45 50 50)" />
                <line x1="20" y1="20" x2="32" y2="32" stroke="black" strokeWidth="3" />
                <line x1="44" y1="20" x2="32" y2="32" stroke="black" strokeWidth="3" />
                <line x1="20" y1="44" x2="32" y2="32" stroke="black" strokeWidth="3" />
                <line x1="44" y1="44" x2="32" y2="32" stroke="black" strokeWidth="3" />
            </svg>
        ),
    },
    {
        id: "wrench", x: "5%", y: "60%",
        motion: { x: -50, y: 60, rotation: 130 },
        svg: (
            <svg viewBox="0 0 64 64" fill="black" xmlns="http://www.w3.org/2000/svg">
                <path d="M55.4 8.6a2 2 0 00-2.8 0l-8.7 8.7-4.2-1.4-1.4-4.2 8.7-8.7a2 2 0 000-2.8 14 14 0 00-19.2 19.2l-22 22a6 6 0 008.5 8.5l22-22A14 14 0 0055.4 8.6z" />
            </svg>
        ),
    },
    {
        id: "radar", x: "85%", y: "48%",
        motion: { x: 60, y: 30, rotation: -160 },
        svg: (
            <svg viewBox="0 0 64 64" fill="black" xmlns="http://www.w3.org/2000/svg">
                <path d="M32 32L10 10a31 31 0 1044 44L32 32z" opacity="0.5" />
                <circle cx="32" cy="32" r="4" />
                <circle cx="32" cy="32" r="14" fill="none" stroke="black" strokeWidth="3" />
                <circle cx="32" cy="32" r="24" fill="none" stroke="black" strokeWidth="2" />
            </svg>
        ),
    },
    {
        id: "roboarm", x: "38%", y: "84%",
        motion: { x: -20, y: -90, rotation: 110 },
        svg: (
            <svg viewBox="0 0 64 64" fill="black" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="28" width="20" height="8" rx="4" />
                <rect x="22" y="22" width="20" height="20" rx="4" />
                <rect x="40" y="16" width="16" height="8" rx="4" transform="rotate(30 40 16)" />
                <circle cx="24" cy="32" r="4" fill="white" />
                <circle cx="40" cy="32" r="4" fill="white" />
            </svg>
        ),
    },
    {
        id: "signal", x: "52%", y: "45%",
        motion: { x: 30, y: 80, rotation: -70 },
        svg: (
            <svg viewBox="0 0 64 64" fill="black" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="52" r="5" />
                <path d="M20 40a17 17 0 0124 0" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" />
                <path d="M12 30a28 28 0 0140 0" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" />
                <path d="M4 20a40 40 0 0156 0" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        id: "cpu", x: "22%", y: "15%",
        motion: { x: -70, y: -50, rotation: -140 },
        svg: (
            <svg viewBox="0 0 64 64" fill="black" xmlns="http://www.w3.org/2000/svg">
                <rect x="16" y="16" width="32" height="32" rx="3" />
                <rect x="22" y="22" width="20" height="20" rx="2" fill="white" />
                <rect x="28" y="4" width="4" height="10" rx="1" />
                <rect x="36" y="4" width="4" height="10" rx="1" />
                <rect x="20" y="4" width="4" height="10" rx="1" />
                <rect x="28" y="50" width="4" height="10" rx="1" />
                <rect x="36" y="50" width="4" height="10" rx="1" />
                <rect x="20" y="50" width="4" height="10" rx="1" />
                <rect x="4" y="28" width="10" height="4" rx="1" />
                <rect x="4" y="36" width="10" height="4" rx="1" />
                <rect x="4" y="20" width="10" height="4" rx="1" />
                <rect x="50" y="28" width="10" height="4" rx="1" />
                <rect x="50" y="36" width="10" height="4" rx="1" />
                <rect x="50" y="20" width="10" height="4" rx="1" />
            </svg>
        ),
    },
    {
        id: "compass", x: "70%", y: "12%",
        motion: { x: 80, y: 60, rotation: 200 },
        svg: (
            <svg viewBox="0 0 64 64" fill="black" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="30" fill="none" stroke="black" strokeWidth="3" />
                <circle cx="32" cy="32" r="4" />
                <polygon points="32,8 36,30 32,28 28,30" />
                <polygon points="32,56 36,34 32,36 28,34" fill="black" opacity="0.3" />
            </svg>
        ),
    },
];

export default function Members() {
    const sectionRef = useRef(null);
    const wrapperRef = useRef(null);
    const trackRef = useRef(null);
    const labelRef = useRef(null);
    const titleRef = useRef(null);
    const iconRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header reveal
            if (labelRef.current) {
                gsap.fromTo(labelRef.current,
                    { opacity: 0, y: 20, filter: "blur(8px)" },
                    {
                        opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out",
                        scrollTrigger: { trigger: labelRef.current, start: "top 90%", toggleActions: "play none none none" }
                    }
                );
            }
            if (titleRef.current) {
                gsap.fromTo(titleRef.current,
                    { opacity: 0, y: 20, filter: "blur(8px)" },
                    {
                        opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out",
                        scrollTrigger: { trigger: titleRef.current, start: "top 88%", toggleActions: "play none none none" }
                    }
                );
            }

            // --- Scroll-driven SVG icons ---
            // Each icon fades in on entry, then moves/rotates in sync with the section scroll
            iconRefs.current.forEach((el, i) => {
                if (!el) return;
                const m = ICONS[i].motion;

                // Fade in when section enters viewport
                gsap.fromTo(el,
                    { opacity: 0, scale: 0.6 },
                    {
                        opacity: 1, scale: 1, duration: 0.6, ease: "power2.out",
                        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none" }
                    }
                );

                // Scroll-driven motion: translate + rotate based on scrub progress
                gsap.to(el, {
                    x: m.x,
                    y: m.y,
                    rotation: m.rotation,
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: 1,
                    },
                });
            });

            // Horizontal scroll with ScrollTrigger pin
            const track = trackRef.current;
            const wrapper = wrapperRef.current;

            if (track && wrapper) {
                const timer = setTimeout(() => {
                    const totalWidth = track.scrollWidth;
                    const viewportWidth = wrapper.offsetWidth;
                    const scrollDistance = totalWidth - viewportWidth + 60;

                    if (scrollDistance > 0) {
                        gsap.to(track, {
                            x: -scrollDistance,
                            ease: "none",
                            scrollTrigger: {
                                trigger: sectionRef.current,
                                start: "top 10%",
                                end: () => `+=${scrollDistance * 1.2}`,
                                pin: true,
                                scrub: 1.5,
                                anticipatePin: 1,
                                invalidateOnRefresh: true,
                            },
                        });
                    }
                }, 200);

                return () => clearTimeout(timer);
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="members" ref={sectionRef} id="members">
            {/* Scroll-driven SVG background */}
            <div className="members__floating-svgs" aria-hidden="true">
                {ICONS.map((icon, i) => (
                    <div
                        key={icon.id}
                        className="members__float-icon"
                        ref={(el) => (iconRefs.current[i] = el)}
                        style={{ left: icon.x, top: icon.y, width: 72, height: 72 }}
                    >
                        {icon.svg}
                    </div>
                ))}
            </div>

            <div className="members__header">
                <span className="members__label" ref={labelRef}>The People</span>
                <h2 className="members__title" ref={titleRef}>Who Runs the Chapter</h2>
            </div>

            <div className="members__track-wrapper" ref={wrapperRef}>
                <div className="members__track" ref={trackRef}>
                    {membersData.map((member, i) => (
                        <div className="member-card" key={i}>
                            <div className="member-card__image-wrapper">
                                <div
                                    className="member-card__image"
                                    style={{
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        background: `linear-gradient(135deg, ${avatarColors[i][0]}, ${avatarColors[i][1]})`,
                                        fontSize: "3.5rem", fontWeight: 700,
                                        fontFamily: "var(--font-primary)",
                                        color: "rgba(255,255,255,0.25)", letterSpacing: "0.05em",
                                    }}
                                >
                                    {getInitials(member.name)}
                                </div>
                            </div>
                            <div className="member-card__info">
                                <h3 className="member-card__name">{member.name}</h3>
                                <p className="member-card__role">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
