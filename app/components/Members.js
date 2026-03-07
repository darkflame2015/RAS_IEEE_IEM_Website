"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import membersData from "../../config/members";
import siteConfig from "../../config/site";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const avatarColors = siteConfig.gradients;

function getInitials(name) {
    return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
}

// Each SVG icon: position, scroll motion (toX, toY, rotation)
// Filled black professional icons
const ICONS = [
    {
        id: "robot", x: "4%", y: "8%",
        motion: { x: -60, y: 80, rotation: 180 },
        svg: (
            <svg viewBox="0 0 64 64" fill="black" xmlns="http://www.w3.org/2000/svg">
                <rect x="14" y="22" width="36" height="30" rx="6" />
                <circle cx="24" cy="36" r="4" fill="white" />
                <circle cx="40" cy="36" r="4" fill="white" />
                <rect x="26" y="44" width="12" height="4" rx="2" fill="white" />
                <rect x="28" y="10" width="8" height="14" rx="4" />
                <circle cx="32" cy="8" r="4" />
                <rect x="6" y="30" width="8" height="6" rx="3" />
                <rect x="50" y="30" width="8" height="6" rx="3" />
                <rect x="20" y="52" width="6" height="8" rx="3" />
                <rect x="38" y="52" width="6" height="8" rx="3" />
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
                                        position: "relative",
                                    }}
                                >
                                    {member.image ? (
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "contain",
                                                position: "absolute",
                                                inset: 0,
                                            }}
                                        />
                                    ) : (
                                        getInitials(member.name)
                                    )}
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
