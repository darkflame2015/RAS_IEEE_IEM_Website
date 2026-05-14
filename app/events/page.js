"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

const events = [
    {
        title: "Kolkata Tools Machine Show",
        date: "May 10, 2026",
        status: "Completed",
        category: "Industrial Visit",
        description:
            "An exclusive visit to the Kolkata Tools Machine Show — where our members explored cutting-edge industrial machinery, CNC equipment, laser engravers, and precision tools. A hands-on experience bridging robotics theory with real-world manufacturing.",
        image: "/gallery/IMG20260510143006.jpg",
    },
];

export default function EventsPage() {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            /* Header animations */
            const header = headerRef.current;
            if (header) {
                gsap.fromTo(
                    header.querySelector(".events__label"),
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power3.out" }
                );
                gsap.fromTo(
                    header.querySelector(".events__title"),
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.9, delay: 0.35, ease: "power3.out" }
                );
                gsap.fromTo(
                    header.querySelector(".events__subtitle"),
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: "power3.out" }
                );
            }

            /* Card animations */
            const cards = cardsRef.current.filter(Boolean);
            cards.forEach((card) => {
                gsap.fromTo(
                    card,
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 88%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <Navbar />
            <main>
                <section className="events" ref={sectionRef}>
                    {/* ── Header ── */}
                    <div className="events__header" ref={headerRef}>
                        <span className="events__label">IEEE RAS IEM</span>
                        <h1 className="events__title">Our Events</h1>
                        <p className="events__subtitle">
                            From industrial visits to hackathons — explore the events that
                            shape our community and fuel innovation.
                        </p>
                    </div>

                    {/* ── Events Grid ── */}
                    <div className="events__grid">
                        {events.map((event, i) => (
                            <div
                                key={i}
                                className="event-card"
                                ref={(el) => (cardsRef.current[i] = el)}
                            >
                                {/* Image */}
                                <div
                                    className="event-card__image"
                                    style={{
                                        backgroundImage: `url(${event.image})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                >
                                    <span className="event-card__category">
                                        {event.category}
                                    </span>
                                </div>

                                {/* Body */}
                                <div className="event-card__body">
                                    <div className="event-card__meta">
                                        <span className="event-card__date">
                                            {event.date}
                                        </span>
                                        <span
                                            className={`event-card__status event-card__status--${event.status.toLowerCase()}`}
                                        >
                                            <span className="event-card__status-dot" />
                                            {event.status}
                                        </span>
                                    </div>
                                    <h3 className="event-card__title">{event.title}</h3>
                                    <p className="event-card__desc">{event.description}</p>
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
