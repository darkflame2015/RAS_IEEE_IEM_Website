"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
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
    {
        title: "STPI Visit of Cabinet Minister IT & Electronics & Inauguration with Doordarshan",
        date: "February 24, 2026",
        status: "Completed",
        category: "Official Visit",
        description:
            "A landmark event at STPI where our IEEE RAS chapter showcased drone technology and VR demonstrations to the Cabinet Minister of IT & Electronics. The visit included an inauguration ceremony covered by Doordarshan, highlighting our chapter's contributions to robotics innovation and student-driven tech development.",
        image: "/gallery/stpi-visit-team-drones.jpeg",
    },
    // To add a new upcoming/ongoing event, copy the template from:
    // config/event-template.js
];

export default function EventsPage() {
    const router = useRouter();
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const cardsRef = useRef([]);
    const [popup, setPopup] = useState({ open: false, event: null });
    const popupRef = useRef(null);
    const popupContentRef = useRef(null);

    /* ── Open popup for upcoming/ongoing events ── */
    const openPopup = useCallback((event) => {
        setPopup({ open: true, event });
        document.body.style.overflow = "hidden";

        requestAnimationFrame(() => {
            if (popupRef.current) {
                gsap.fromTo(popupRef.current,
                    { opacity: 0 },
                    { opacity: 1, duration: 0.35, ease: "power2.out" }
                );
            }
            if (popupContentRef.current) {
                gsap.fromTo(popupContentRef.current,
                    { opacity: 0, y: 40, scale: 0.95 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.5, delay: 0.1, ease: "power3.out" }
                );
            }
        });
    }, []);

    /* ── Close popup ── */
    const closePopup = useCallback(() => {
        if (popupRef.current) {
            gsap.to(popupRef.current, {
                opacity: 0,
                duration: 0.25,
                ease: "power2.in",
                onComplete: () => {
                    setPopup({ open: false, event: null });
                    document.body.style.overflow = "";
                }
            });
        } else {
            setPopup({ open: false, event: null });
            document.body.style.overflow = "";
        }
    }, []);

    /* ── Handle card click ── */
    const handleCardClick = useCallback((event) => {
        const status = event.status.toLowerCase();
        if (status === "completed") {
            router.push("/gallery");
        } else {
            // Upcoming or Ongoing — show expanded popup
            openPopup(event);
        }
    }, [router, openPopup]);

    /* ── ESC to close popup ── */
    useEffect(() => {
        if (!popup.open) return;
        const handler = (e) => {
            if (e.key === "Escape") closePopup();
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [popup.open, closePopup]);

    /* ── GSAP animations ── */
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
                        {events.map((event, i) => {
                            const isCompleted = event.status.toLowerCase() === "completed";
                            return (
                                <div
                                    key={i}
                                    className={`event-card ${isCompleted ? "event-card--clickable" : "event-card--expandable"}`}
                                    ref={(el) => (cardsRef.current[i] = el)}
                                    onClick={() => handleCardClick(event)}
                                    role="button"
                                    tabIndex={0}
                                    onKeyDown={(e) => e.key === "Enter" && handleCardClick(event)}
                                    aria-label={
                                        isCompleted
                                            ? `View ${event.title} gallery`
                                            : `View ${event.title} details`
                                    }
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

                                        {/* Action hint */}
                                        <div className="event-card__action-hint">
                                            {isCompleted ? (
                                                <span className="event-card__hint event-card__hint--gallery">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                                                        <circle cx="8.5" cy="8.5" r="1.5" />
                                                        <polyline points="21 15 16 10 5 21" />
                                                    </svg>
                                                    View Gallery →
                                                </span>
                                            ) : (
                                                <span className="event-card__hint event-card__hint--register">
                                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                        <circle cx="12" cy="12" r="10" />
                                                        <line x1="12" y1="8" x2="12" y2="16" />
                                                        <line x1="8" y1="12" x2="16" y2="12" />
                                                    </svg>
                                                    View Details & Register
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </main>
            <Footer />

            {/* ── Expanded Event Popup (Upcoming / Ongoing only) ── */}
            {popup.open && popup.event && (
                <div
                    className="event-popup"
                    ref={popupRef}
                    onClick={closePopup}
                    role="dialog"
                    aria-modal="true"
                    aria-label={`Event details: ${popup.event.title}`}
                >
                    <div className="event-popup__grain" />

                    {/* Close button */}
                    <button
                        className="event-popup__close"
                        onClick={closePopup}
                        aria-label="Close popup"
                    >
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>

                    {/* Content card */}
                    <div
                        className="event-popup__card"
                        ref={popupContentRef}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Banner */}
                        <div
                            className="event-popup__banner"
                            style={{
                                backgroundImage: `url(${popup.event.image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                            <div className="event-popup__banner-overlay" />
                            <span className="event-card__category">
                                {popup.event.category}
                            </span>
                        </div>

                        {/* Details */}
                        <div className="event-popup__details">
                            <div className="event-card__meta">
                                <span className="event-card__date">
                                    {popup.event.date}
                                </span>
                                <span
                                    className={`event-card__status event-card__status--${popup.event.status.toLowerCase()}`}
                                >
                                    <span className="event-card__status-dot" />
                                    {popup.event.status}
                                </span>
                            </div>

                            <h2 className="event-popup__title">{popup.event.title}</h2>
                            <p className="event-popup__desc">{popup.event.description}</p>

                            {/* Extra info */}
                            {(popup.event.venue || popup.event.time) && (
                                <div className="event-popup__info-grid">
                                    {popup.event.venue && (
                                        <div className="event-popup__info-item">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                                <circle cx="12" cy="10" r="3" />
                                            </svg>
                                            <div>
                                                <span className="event-popup__info-label">Venue</span>
                                                <span className="event-popup__info-value">{popup.event.venue}</span>
                                            </div>
                                        </div>
                                    )}
                                    {popup.event.time && (
                                        <div className="event-popup__info-item">
                                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="10" />
                                                <polyline points="12 6 12 12 16 14" />
                                            </svg>
                                            <div>
                                                <span className="event-popup__info-label">Time</span>
                                                <span className="event-popup__info-value">{popup.event.time}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* Registration CTA */}
                            {popup.event.registrationLink && (
                                <div className="event-popup__cta">
                                    <a
                                        href={popup.event.registrationLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="glow-btn event-popup__register-btn"
                                        id="event-register-btn"
                                    >
                                        <span className="glow-btn__glow" />
                                        <span className="glow-btn__text">Register Now</span>
                                        <span className="glow-btn__arrow">→</span>
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
