"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

gsap.registerPlugin(ScrollTrigger);

/* ── Photo data ── */
const photos = [
    /* ── STPI Visit — Cabinet Minister IT & Electronics ── */
    { src: "/gallery/stpi-visit-team-drones.jpeg", caption: "STPI Visit — Team with Drones", span: "wide" },
    { src: "/gallery/stpi-visit-minister-walkthrough.jpeg", caption: "Minister Walkthrough", span: "tall" },
    { src: "/gallery/stpi-visit-minister-interaction.jpeg", caption: "Minister Interaction" },
    { src: "/gallery/stpi-visit-vr-demo.jpeg", caption: "VR Demonstration" },
    { src: "/gallery/stpi-visit-drone-demo.jpeg", caption: "Drone Demo to Dignitaries", span: "wide" },
    { src: "/gallery/stpi-visit-student-presentation.jpeg", caption: "Student Presentation" },
    { src: "/gallery/stpi-visit-handshake.jpeg", caption: "Felicitation Ceremony", span: "tall" },
    /* ── Kolkata Tools Machine Show ── */
    { src: "/gallery/IMG20260510143006.jpg", caption: "Workshop Kickoff", span: "tall" },
    { src: "/gallery/20260510_144459.jpg", caption: "Team Collaboration" },
    { src: "/gallery/20260510_144620.jpg", caption: "Hands-on Session" },
    { src: "/gallery/IMG20260510143316.jpg", caption: "Group Activity", span: "wide" },
    { src: "/gallery/1000237075.jpg", caption: "Event Highlights", span: "tall" },
    { src: "/gallery/20260510_151238.jpg", caption: "Technical Demonstration" },
    { src: "/gallery/20260510_23737PMByGPSMapCamera.jpg", caption: "Venue Overview" },
    { src: "/gallery/20260510_23810PMByGPSMapCamera.jpg", caption: "Participant Engagement" },
    { src: "/gallery/IMG_20260510_144930_897.jpg", caption: "Teamwork in Action", span: "wide" },
    { src: "/gallery/20260510_23818PMByGPSMapCamera.jpg", caption: "Interactive Session" },
    { src: "/gallery/20260510_23924PMByGPSMapCamera.jpg", caption: "Networking Moments" },
    { src: "/gallery/20260510_25937PMByGPSMapCamera.jpg", caption: "Knowledge Sharing" },
    { src: "/gallery/20260510_32636PMByGPSMapCamera.jpg", caption: "Behind the Scenes" },
    { src: "/gallery/20260510_35332PMByGPSMapCamera.jpg", caption: "Creative Discussions" },
    { src: "/gallery/IMG20260510160849.jpg", caption: "Closing Ceremony", span: "tall" },
    { src: "/gallery/20260510_35344PMByGPSMapCamera.jpg", caption: "Community Spirit" },
];

export default function GalleryPage() {
    const headerRef = useRef(null);
    const gridRef = useRef(null);
    const itemsRef = useRef([]);
    const [lightbox, setLightbox] = useState({ open: false, index: 0 });
    const lightboxRef = useRef(null);
    const lightboxImgRef = useRef(null);

    /* ── Open lightbox ── */
    const openLightbox = useCallback((index) => {
        setLightbox({ open: true, index });
        document.body.style.overflow = "hidden";
    }, []);

    /* ── Close lightbox ── */
    const closeLightbox = useCallback(() => {
        if (lightboxRef.current) {
            gsap.to(lightboxRef.current, {
                opacity: 0,
                duration: 0.3,
                ease: "power2.in",
                onComplete: () => {
                    setLightbox({ open: false, index: 0 });
                    document.body.style.overflow = "";
                },
            });
        } else {
            setLightbox({ open: false, index: 0 });
            document.body.style.overflow = "";
        }
    }, []);

    /* ── Navigate lightbox ── */
    const navigate = useCallback(
        (dir) => {
            const next = (lightbox.index + dir + photos.length) % photos.length;
            if (lightboxImgRef.current) {
                gsap.to(lightboxImgRef.current, {
                    opacity: 0,
                    x: dir > 0 ? -40 : 40,
                    duration: 0.2,
                    ease: "power2.in",
                    onComplete: () => {
                        setLightbox((prev) => ({ ...prev, index: next }));
                        gsap.fromTo(
                            lightboxImgRef.current,
                            { opacity: 0, x: dir > 0 ? 40 : -40 },
                            { opacity: 1, x: 0, duration: 0.35, ease: "power2.out" }
                        );
                    },
                });
            } else {
                setLightbox((prev) => ({ ...prev, index: next }));
            }
        },
        [lightbox.index]
    );

    /* ── Keyboard nav ── */
    useEffect(() => {
        if (!lightbox.open) return;
        const handler = (e) => {
            if (e.key === "Escape") closeLightbox();
            if (e.key === "ArrowLeft") navigate(-1);
            if (e.key === "ArrowRight") navigate(1);
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [lightbox.open, closeLightbox, navigate]);

    /* ── Lightbox enter animation ── */
    useEffect(() => {
        if (lightbox.open && lightboxRef.current) {
            gsap.fromTo(
                lightboxRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.35, ease: "power2.out" }
            );
        }
    }, [lightbox.open]);

    /* ── GSAP scroll animations ── */
    useEffect(() => {
        const ctx = gsap.context(() => {
            /* Header */
            const header = headerRef.current;
            if (header) {
                gsap.fromTo(
                    header.querySelector(".gallery__label"),
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power3.out" }
                );
                gsap.fromTo(
                    header.querySelector(".gallery__title"),
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.9, delay: 0.35, ease: "power3.out" }
                );
                gsap.fromTo(
                    header.querySelector(".gallery__subtitle"),
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: "power3.out" }
                );
                gsap.fromTo(
                    header.querySelector(".gallery__counter"),
                    { opacity: 0, scale: 0.9 },
                    { opacity: 1, scale: 1, duration: 0.7, delay: 0.65, ease: "back.out(1.7)" }
                );
            }

            /* Gallery items stagger */
            const items = itemsRef.current.filter(Boolean);
            items.forEach((item, i) => {
                gsap.fromTo(
                    item,
                    { opacity: 0, y: 50, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.7,
                        delay: 0.1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: item,
                            start: "top 90%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <>
            <Navbar />
            <main>
                <section className="gallery">
                    {/* ── Header ── */}
                    <div className="gallery__header" ref={headerRef}>
                        <span className="gallery__label">IEEE RAS IEM</span>
                        <h1 className="gallery__title">
                            Event <span className="gallery__title-gradient">Gallery</span>
                        </h1>
                        <p className="gallery__subtitle">
                            Relive the energy, innovation, and camaraderie from our events —
                            captured in moments that define our community.
                        </p>
                        <div className="gallery__counter">
                            <span className="gallery__counter-number">{photos.length}</span>
                            <span className="gallery__counter-label">Photos</span>
                        </div>
                    </div>

                    {/* ── Masonry Grid ── */}
                    <div className="gallery__grid" ref={gridRef}>
                        {photos.map((photo, i) => (
                            <div
                                key={i}
                                className={`gallery-item ${photo.span === "tall"
                                        ? "gallery-item--tall"
                                        : photo.span === "wide"
                                            ? "gallery-item--wide"
                                            : ""
                                    }`}
                                ref={(el) => (itemsRef.current[i] = el)}
                                onClick={() => openLightbox(i)}
                                role="button"
                                tabIndex={0}
                                aria-label={`View photo: ${photo.caption}`}
                                onKeyDown={(e) => e.key === "Enter" && openLightbox(i)}
                            >
                                <div
                                    className="gallery-item__image"
                                    style={{
                                        backgroundImage: `url(${photo.src})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                    }}
                                >
                                    <div className="gallery-item__overlay" />
                                    <span className="gallery-item__label">{photo.caption}</span>
                                </div>

                                {/* Hover zoom icon */}
                                <div className="gallery-item__zoom">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <circle cx="11" cy="11" r="8" />
                                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                        <line x1="11" y1="8" x2="11" y2="14" />
                                        <line x1="8" y1="11" x2="14" y2="11" />
                                    </svg>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />

            {/* ── Lightbox Modal ── */}
            {lightbox.open && (
                <div
                    className="lightbox"
                    ref={lightboxRef}
                    onClick={closeLightbox}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Photo lightbox"
                >
                    {/* Backdrop grain */}
                    <div className="lightbox__grain" />

                    {/* Close */}
                    <button
                        className="lightbox__close"
                        onClick={closeLightbox}
                        aria-label="Close lightbox"
                    >
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>

                    {/* Navigation */}
                    <button
                        className="lightbox__nav lightbox__nav--prev"
                        onClick={(e) => { e.stopPropagation(); navigate(-1); }}
                        aria-label="Previous photo"
                    >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </button>

                    <button
                        className="lightbox__nav lightbox__nav--next"
                        onClick={(e) => { e.stopPropagation(); navigate(1); }}
                        aria-label="Next photo"
                    >
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </button>

                    {/* Image */}
                    <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
                        <img
                            ref={lightboxImgRef}
                            className="lightbox__image"
                            src={photos[lightbox.index].src}
                            alt={photos[lightbox.index].caption}
                        />
                        <div className="lightbox__info">
                            <p className="lightbox__caption">{photos[lightbox.index].caption}</p>
                            <span className="lightbox__index">
                                {lightbox.index + 1} / {photos.length}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
