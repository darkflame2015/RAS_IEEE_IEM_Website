"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { TextPlugin } from "gsap/TextPlugin";
import { Flip } from "gsap/Flip";
import { Observer } from "gsap/Observer";
import { Draggable } from "gsap/Draggable";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

// Register all available free plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(
        ScrollTrigger,
        ScrollSmoother,
        ScrollToPlugin,
        TextPlugin,
        Flip,
        Observer,
        Draggable,
        MotionPathPlugin
    );
}

/**
 * Fade-in from below animation
 */
export function fadeInUp(element, options = {}) {
    const { delay = 0, duration = 1, y = 50, ease = "power3.out" } = options;
    return gsap.fromTo(
        element,
        { opacity: 0, y },
        { opacity: 1, y: 0, duration, delay, ease }
    );
}

/**
 * Stagger cards animation with scroll trigger
 */
export function staggerCards(elements, options = {}) {
    const {
        y = 40,
        duration = 0.8,
        stagger = 0.15,
        ease = "power3.out",
        triggerStart = "top 85%",
    } = options;

    return gsap.fromTo(
        elements,
        { opacity: 0, y },
        {
            opacity: 1,
            y: 0,
            duration,
            stagger,
            ease,
            scrollTrigger: {
                trigger: elements[0]?.parentElement || elements[0],
                start: triggerStart,
                toggleActions: "play none none none",
            },
        }
    );
}

/**
 * Text reveal animation (line by line)
 */
export function textReveal(elements, options = {}) {
    const { delay = 0, duration = 1, stagger = 0.2, ease = "power4.out" } = options;
    return gsap.fromTo(
        elements,
        { opacity: 0, y: "100%" },
        { opacity: 1, y: "0%", duration, delay, stagger, ease }
    );
}

/**
 * Floating orbs animation
 */
export function floatingOrbs(elements) {
    elements.forEach((el, i) => {
        gsap.to(el, {
            y: `${20 + i * 8}`,
            x: `${12 + i * 5}`,
            duration: 7 + i * 1.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });
    });
}

/**
 * Navbar entrance animation
 */
export function navbarEntrance(element, options = {}) {
    const { delay = 0.3, duration = 0.8 } = options;
    return gsap.fromTo(
        element,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration, delay, ease: "power3.out" }
    );
}

/**
 * Scroll-triggered fade-in
 */
export function scrollFadeIn(element, options = {}) {
    const { y = 30, duration = 1, ease = "power3.out", triggerStart = "top 85%" } = options;
    return gsap.fromTo(
        element,
        { opacity: 0, y },
        {
            opacity: 1,
            y: 0,
            duration,
            ease,
            scrollTrigger: {
                trigger: element,
                start: triggerStart,
                toggleActions: "play none none none",
            },
        }
    );
}

/**
 * Scale up animation on scroll
 */
export function scaleUp(element, options = {}) {
    const { duration = 1, ease = "power3.out", triggerStart = "top 80%" } = options;
    return gsap.fromTo(
        element,
        { opacity: 0, scale: 0.9 },
        {
            opacity: 1,
            scale: 1,
            duration,
            ease,
            scrollTrigger: {
                trigger: element,
                start: triggerStart,
                toggleActions: "play none none none",
            },
        }
    );
}

/**
 * Horizontal scroll for member cards using ScrollTrigger
 */
export function horizontalScroll(trackElement, wrapperElement) {
    if (!trackElement || !wrapperElement) return;

    const totalWidth = trackElement.scrollWidth;
    const viewportWidth = wrapperElement.offsetWidth;
    const scrollDistance = totalWidth - viewportWidth;

    return gsap.to(trackElement, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
            trigger: wrapperElement,
            start: "top top",
            end: () => `+=${scrollDistance}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
        },
    });
}

/**
 * Initialize ScrollSmoother
 */
export function createSmoother(options = {}) {
    if (typeof window === "undefined") return null;
    return ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: options.smooth ?? 2,
        effects: options.effects ?? true,
        normalizeScroll: options.normalizeScroll ?? true,
        ...options,
    });
}
