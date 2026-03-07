"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import statsData from "../../config/stats";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Stats() {
    const sectionRef = useRef(null);
    const itemRefs = useRef([]);
    const numberRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const items = itemRefs.current.filter(Boolean);
            const numbers = numberRefs.current.filter(Boolean);

            if (items.length > 0) {
                gsap.fromTo(
                    items,
                    { opacity: 0, y: 40, filter: "blur(8px)" },
                    {
                        opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, stagger: 0.12, ease: "power3.out",
                        scrollTrigger: {
                            trigger: items[0].parentElement,
                            start: "top 85%",
                            toggleActions: "play none none none",
                        },
                    }
                );
            }

            // Animate number counters
            numbers.forEach((numEl, i) => {
                if (!numEl) return;
                const target = statsData[i];
                gsap.fromTo(
                    { val: 0 },
                    { val: 0 },
                    {
                        val: target.number,
                        duration: 2,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: numEl,
                            start: "top 85%",
                            toggleActions: "play none none none",
                        },
                        onUpdate: function () {
                            numEl.textContent = Math.floor(this.targets()[0].val) + target.suffix;
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="stats" ref={sectionRef} id="stats">
            <div className="stats__grid">
                {statsData.map((stat, i) => (
                    <div
                        className="stat-item"
                        key={i}
                        ref={(el) => (itemRefs.current[i] = el)}
                    >
                        <div
                            className="stat-item__number"
                            ref={(el) => (numberRefs.current[i] = el)}
                        >
                            0{stat.suffix}
                        </div>
                        <div className="stat-item__label">{stat.label}</div>
                    </div>
                ))}
            </div>
        </section>
    );
}
