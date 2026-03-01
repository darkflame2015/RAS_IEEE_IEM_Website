"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";

export default function GlowButton({ text, href = "/contact", className = "", id = "" }) {
    const btnRef = useRef(null);
    const glowRef = useRef(null);

    useEffect(() => {
        const btn = btnRef.current;
        const glow = glowRef.current;
        if (!btn || !glow) return;

        const ctx = gsap.context(() => {
            // Pulsing glow animation
            gsap.to(glow, {
                opacity: 0.8,
                scale: 1.15,
                duration: 1.5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
            });

            // Magnetic follow-cursor effect
            const handleMove = (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                gsap.to(btn, {
                    x: x * 0.3,
                    y: y * 0.3,
                    duration: 0.4,
                    ease: "power2.out",
                });
            };

            const handleLeave = () => {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: "elastic.out(1, 0.4)",
                });
            };

            btn.addEventListener("mousemove", handleMove);
            btn.addEventListener("mouseleave", handleLeave);

            return () => {
                btn.removeEventListener("mousemove", handleMove);
                btn.removeEventListener("mouseleave", handleLeave);
            };
        }, btn);

        return () => ctx.revert();
    }, []);

    const router = useRouter();

    const handleClick = () => {
        if (href.startsWith("#")) {
            const el = document.querySelector(href);
            if (el) el.scrollIntoView({ behavior: "smooth" });
        } else {
            router.push(href);
        }
    };

    return (
        <div className={`glow-btn-wrapper ${className}`}>
            <button
                className="glow-btn"
                ref={btnRef}
                id={id}
                onClick={handleClick}
            >
                {/* Glow layer */}
                <span className="glow-btn__glow" ref={glowRef} />
                {/* Text */}
                <span className="glow-btn__text">{text}</span>
                {/* Arrow */}
                <span className="glow-btn__arrow">→</span>
            </button>
        </div>
    );
}
