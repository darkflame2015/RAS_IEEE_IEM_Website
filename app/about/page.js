"use client";

import { useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const bentoItems = [
    {
        number: "01",
        title: "Learn & Explore",
        desc: "Beginner-friendly workshops introduce you to robotics fundamentals — sensors, actuators, microcontrollers, and the tools that power modern automation.",
        span: "bento--wide",
    },
    {
        number: "02",
        title: "Build & Prototype",
        desc: "Get hands-on in our project labs. Teams work on real builds — autonomous bots, robotic arms, drones — with dedicated mentorship from seniors.",
        span: "bento--tall",
    },
    {
        number: "03",
        title: "Compete & Showcase",
        desc: "Represent the chapter at national hackathons, IEEE competitions, and inter-college robotics events. Build your portfolio while having fun.",
        span: "",
    },
    {
        number: "04",
        title: "Connect & Grow",
        desc: "Network with industry engineers, attend technical talks, land internships, and grow into the next generation of robotics professionals.",
        span: "",
    },
    {
        number: "05",
        title: "Our Mission",
        desc: "To make robotics and automation accessible to every student on campus — regardless of branch, year, or prior experience. We learn by building.",
        span: "bento--wide",
    },
];

export default function AboutPage() {
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const cardRefs = useRef([]);

    useEffect(() => {
        if (titleRef.current) {
            gsap.fromTo(
                titleRef.current,
                { opacity: 0, y: 40, filter: "blur(10px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, delay: 0.4, ease: "power3.out" }
            );
        }
        if (subtitleRef.current) {
            gsap.fromTo(
                subtitleRef.current,
                { opacity: 0, y: 30, filter: "blur(8px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.9, delay: 0.6, ease: "power3.out" }
            );
        }

        const cards = cardRefs.current.filter(Boolean);
        if (cards.length > 0) {
            gsap.fromTo(
                cards,
                { opacity: 0, y: 50, filter: "blur(8px)", scale: 0.96 },
                {
                    opacity: 1, y: 0, filter: "blur(0px)", scale: 1,
                    duration: 0.9, stagger: 0.12, ease: "power3.out",
                    scrollTrigger: {
                        trigger: cards[0].parentElement,
                        start: "top 90%",
                        toggleActions: "play none none none",
                    },
                }
            );
        }
    }, []);

    return (
        <>
            <Navbar />
            <section className="about">
                <h1 className="about__title" ref={titleRef}>
                    About <span className="hero__title-gradient">IEEE RAS</span>
                </h1>
                <p className="about__subtitle" ref={subtitleRef}>
                    We are the IEEE Robotics & Automation Society student chapter at our college —
                    a community of builders, thinkers, and makers who believe the best way to learn
                    robotics is by doing it. We organize events, hackathons, workshops, and open labs
                    that give every student a chance to work with real hardware and real challenges.
                </p>
                <div className="bento-grid">
                    {bentoItems.map((item, i) => (
                        <div
                            className={`bento-card ${item.span}`}
                            key={i}
                            ref={(el) => (cardRefs.current[i] = el)}
                        >
                            <div className="bento-card__grain" />
                            <div className="bento-card__content">
                                <div className="bento-card__number">{item.number}</div>
                                <h3 className="bento-card__title">{item.title}</h3>
                                <p className="bento-card__desc">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <Footer />
        </>
    );
}
