"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Preloader({ onComplete }) {
    const overlayRef = useRef(null);
    const textRef = useRef(null);
    const subRef = useRef(null);
    const [done, setDone] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    setDone(true);
                    if (onComplete) onComplete();
                },
            });

            // Text reveals with blur — no bar
            tl.fromTo(
                textRef.current,
                { opacity: 0, filter: "blur(24px)", y: 30, scale: 0.95 },
                { opacity: 1, filter: "blur(0px)", y: 0, scale: 1, duration: 1, ease: "power3.out" },
                0.3
            );

            // Subtitle fades in
            tl.fromTo(
                subRef.current,
                { opacity: 0, y: 12 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
                "-=0.4"
            );

            // Hold
            tl.to({}, { duration: 0.5 });

            // Everything blurs out and overlay clips away
            tl.to([textRef.current, subRef.current], {
                opacity: 0,
                filter: "blur(12px)",
                y: -20,
                duration: 0.5,
                ease: "power2.in",
            });

            tl.to(overlayRef.current, {
                clipPath: "inset(0 0 100% 0)",
                duration: 0.8,
                ease: "power3.inOut",
            }, "-=0.2");
        });

        return () => ctx.revert();
    }, [onComplete]);

    if (done) return null;

    return (
        <div className="preloader" ref={overlayRef}>
            <div className="preloader__content">
                <h1 className="preloader__text" ref={textRef}>
                    IEEE RAS
                </h1>
                <p className="preloader__sub" ref={subRef}>
                    Robotics &amp; Automation Society
                </p>
            </div>
        </div>
    );
}
