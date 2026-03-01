"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import GlowButton from "../components/GlowButton";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const eventsData = [
    {
        title: "RoboHack 2025",
        date: "March 15–16, 2025",
        category: "Hackathon",
        desc: "A 24-hour robotics hackathon where teams design, build, and program autonomous bots. Cash prizes, industry mentors, and bragging rights await.",
        gradient: ["#590d22", "#a4133c"],
    },
    {
        title: "Circuit Forge Workshop",
        date: "April 5, 2025",
        category: "Workshop",
        desc: "Hands-on PCB design and soldering workshop. Learn to build custom circuits from scratch with guidance from senior hardware engineers.",
        gradient: ["#800f2f", "#7b2cbf"],
    },
    {
        title: "AI × Robotics: The Next Decade",
        date: "April 20, 2025",
        category: "Technical Talk",
        desc: "Industry leaders from Boston Dynamics and NVIDIA discuss the convergence of AI and robotics. Live Q&A and networking session included.",
        gradient: ["#a4133c", "#590d22"],
    },
    {
        title: "Drone Racing Championship",
        date: "May 8, 2025",
        category: "Competition",
        desc: "Build your own FPV drone and race through obstacle courses. Categories for beginners and experienced pilots with trophies and gear prizes.",
        gradient: ["#c9184a", "#800f2f"],
    },
    {
        title: "ROS2 Bootcamp",
        date: "May 22–24, 2025",
        category: "Workshop",
        desc: "Three-day intensive bootcamp on Robot Operating System 2. From basic navigation to SLAM, emerge ready to build autonomous robots.",
        gradient: ["#7b2cbf", "#c9184a"],
    },
    {
        title: "Open Project Expo",
        date: "June 10, 2025",
        category: "Exhibition",
        desc: "Annual showcase of member projects — from robotic arms to autonomous vehicles. Judges from industry, live demos, and recruitment opportunities.",
        gradient: ["#b23a48", "#7b2cbf"],
    },
];

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
                                {/* Image placeholder */}
                                <div
                                    className="event-card__image"
                                    style={{
                                        background: `linear-gradient(135deg, ${event.gradient[0]}, ${event.gradient[1]})`,
                                    }}
                                >
                                    <span className="event-card__category">{event.category}</span>
                                </div>
                                <div className="event-card__body">
                                    <span className="event-card__date">{event.date}</span>
                                    <h3 className="event-card__title">{event.title}</h3>
                                    <p className="event-card__desc">{event.desc}</p>
                                    <GlowButton text="Secure Your Spot" href="/contact" className="event-card__cta" />
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
