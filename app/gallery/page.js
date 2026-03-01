"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const galleryData = [
    { title: "RoboHack 2024 — Teams Building", gradient: ["#590d22", "#a4133c"], size: "tall" },
    { title: "Workshop — Soldering Station", gradient: ["#800f2f", "#7b2cbf"], size: "normal" },
    { title: "Drone Assembly in Progress", gradient: ["#c9184a", "#590d22"], size: "normal" },
    { title: "Technical Talk — AI & Robotics", gradient: ["#a4133c", "#7b2cbf"], size: "wide" },
    { title: "Team Photo — IEEE RAS Chapter", gradient: ["#7b2cbf", "#c9184a"], size: "normal" },
    { title: "Project Lab — Robotic Arm Demo", gradient: ["#b23a48", "#590d22"], size: "tall" },
    { title: "Circuit Design Workshop", gradient: ["#590d22", "#b23a48"], size: "normal" },
    { title: "Award Ceremony — Hackathon Winners", gradient: ["#800f2f", "#c9184a"], size: "wide" },
    { title: "Mentorship Session", gradient: ["#a4133c", "#590d22"], size: "normal" },
    { title: "Open Project Expo — Autonomous Bot", gradient: ["#c9184a", "#7b2cbf"], size: "normal" },
    { title: "Industry Connect — Networking", gradient: ["#7b2cbf", "#b23a48"], size: "normal" },
    { title: "ROS2 Bootcamp — Day 1", gradient: ["#590d22", "#7b2cbf"], size: "normal" },
];

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
                                        background: `linear-gradient(135deg, ${item.gradient[0]}, ${item.gradient[1]})`,
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
