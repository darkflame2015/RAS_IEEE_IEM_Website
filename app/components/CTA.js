"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GlowButton from "./GlowButton";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function CTA() {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                containerRef.current,
                { opacity: 0, scale: 0.92, filter: "blur(10px)" },
                {
                    opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.2, ease: "power3.out",
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="cta" ref={sectionRef} id="contact">
            <div className="cta__container" ref={containerRef}>
                <h2 className="cta__title">Be Part of the Next Wave</h2>
                <p className="cta__desc">
                    Join our IEEE RAS Student Chapter and get hands-on access to robotics labs,
                    exclusive workshops, hackathon teams, and a community that builds the future
                    of automation together.
                </p>
                <GlowButton
                    text="Start Building with Us"
                    href="/contact"
                    id="cta-btn"
                />
            </div>
        </section>
    );
}
