/**
 * ───────────────────────────────────────────
 *  EVENTS PAGE — LIVE VERSION
 *  
 *  To activate this page:
 *  1. Add your real events to config/events.js
 *  2. Rename current page.js → page.placeholder.js
 *  3. Rename this file → page.js
 *  4. Push to GitHub — Vercel auto-deploys
 * ───────────────────────────────────────────
 */

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GlowButton from "../components/GlowButton";
import eventsData from "../../config/events";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function EventsPage() {
    const sectionRef = useRef(null);
    const labelRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header reveal
            gsap.fromTo(
                labelRef.current,
                { opacity: 0, y: 20, filter: "blur(8px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, delay: 0.3, ease: "power3.out" }
            );
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: 30, filter: "blur(8px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, delay: 0.5, ease: "power3.out" }
            );
            gsap.fromTo(
                subtitleRef.current,
                { opacity: 0, y: 20, filter: "blur(6px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, delay: 0.7, ease: "power3.out" }
            );

            // Cards stagger with scroll trigger
            const cards = cardsRef.current.filter(Boolean);
            if (cards.length > 0) {
                gsap.fromTo(
                    cards,
                    { opacity: 0, y: 60, filter: "blur(10px)" },
                    {
                        opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, stagger: 0.12, ease: "power3.out",
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
                    const rotateX = ((y - centerY) / centerY) * -4;
                    const rotateY = ((x - centerX) / centerX) * 4;
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
        <>
            <Navbar />
            <main>
                <section className="events" ref={sectionRef} id="events">
                    <div className="events__header">
                        <span className="events__label" ref={labelRef}>What&apos;s Happening</span>
                        <h1 className="events__title" ref={titleRef}>Upcoming Events</h1>
                        <p className="events__subtitle" ref={subtitleRef}>
                            From intense hackathons to hands-on workshops — here&apos;s where the action is.
                            Every event is a chance to build, learn, and connect.
                        </p>
                    </div>

                    <div className="events__grid">
                        {eventsData.map((event, i) => (
                            <div
                                className="event-card"
                                key={i}
                                ref={(el) => (cardsRef.current[i] = el)}
                            >
                                {/* Event image or gradient */}
                                <div
                                    className="event-card__image"
                                    style={{
                                        background: event.image
                                            ? `url(${event.image}) center/cover no-repeat`
                                            : `linear-gradient(135deg, ${event.gradient[0]}, ${event.gradient[1]})`,
                                    }}
                                >
                                    <span className="event-card__category">{event.category}</span>
                                </div>
                                <div className="event-card__body">
                                    <span className="event-card__date">{event.date}</span>
                                    <h3 className="event-card__title">{event.title}</h3>
                                    <p className="event-card__desc">{event.desc}</p>
                                    <GlowButton
                                        text={event.ctaText || "Secure Your Spot"}
                                        href={event.ctaLink || "/contact"}
                                        className="event-card__cta"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
