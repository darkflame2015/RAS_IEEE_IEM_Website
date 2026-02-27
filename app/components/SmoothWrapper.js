"use client";

import { useEffect, useRef } from "react";
import { createSmoother } from "@/lib/animations";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothWrapper({ children }) {
    const hasInitialized = useRef(false);

    useEffect(() => {
        if (hasInitialized.current) return;
        hasInitialized.current = true;

        const smoother = createSmoother({
            smooth: 2,
            effects: true,
            normalizeScroll: true,
        });

        return () => {
            if (smoother) smoother.kill();
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return (
        <div id="smooth-wrapper">
            <div id="smooth-content">{children}</div>
        </div>
    );
}
