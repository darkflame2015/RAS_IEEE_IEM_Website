/**
 * ───────────────────────────────────────────
 *  GALLERY PAGE — LIVE VERSION
 *
 *  To activate this page:
 *  1. Add your real images to config/gallery.js
 *  2. Put image files in public/gallery/
 *  3. Rename current page.js → page.placeholder.js
 *  4. Rename this file → page.js
 *  5. Push to GitHub — Vercel auto-deploys
 * ───────────────────────────────────────────
 */

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import galleryData from "../../config/gallery";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function GalleryPage() {
    const sectionRef = useRef(null);
    const labelRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const itemsRef = useRef([]);

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

            // Gallery items stagger with scroll
            const items = itemsRef.current.filter(Boolean);
            if (items.length > 0) {
                gsap.fromTo(
                    items,
                    { opacity: 0, y: 50, scale: 0.95, filter: "blur(8px)" },
                    {
                        opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 0.8, stagger: 0.08, ease: "power3.out",
                        scrollTrigger: { trigger: items[0].parentElement, start: "top 85%", toggleActions: "play none none none" },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
            <Navbar />
            <main>
                <section className="gallery" ref={sectionRef} id="gallery">
                    <div className="gallery__header">
                        <span className="gallery__label" ref={labelRef}>Captured Moments</span>
                        <h1 className="gallery__title" ref={titleRef}>Gallery</h1>
                        <p className="gallery__subtitle" ref={subtitleRef}>
                            Snapshots from hackathons, workshops, project labs, and community events.
                            Every image tells a story of innovation.
                        </p>
                    </div>

                    <div className="gallery__grid">
                        {galleryData.map((item, i) => (
                            <div
                                className={`gallery-item ${item.size === "tall" ? "gallery-item--tall" : ""} ${item.size === "wide" ? "gallery-item--wide" : ""}`}
                                key={i}
                                ref={(el) => (itemsRef.current[i] = el)}
                            >
                                <div
                                    className="gallery-item__image"
                                    style={{
                                        background: item.image
                                            ? `url(${item.image}) center/cover no-repeat`
                                            : `linear-gradient(135deg, ${item.gradient[0]}, ${item.gradient[1]})`,
                                    }}
                                >
                                    {/* Circuit pattern overlay */}
                                    <div className="gallery-item__overlay" />
                                    <span className="gallery-item__label">{item.title}</span>
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
