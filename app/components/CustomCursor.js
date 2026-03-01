"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
    const cursorRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        if (!cursor) return;

        let mouseX = 0;
        let mouseY = 0;
        let posX = 0;
        let posY = 0;
        let raf;

        const speed = 0.15;

        const animate = () => {
            posX += (mouseX - posX) * speed;
            posY += (mouseY - posY) * speed;

            cursor.style.left = posX + "px";
            cursor.style.top = posY + "px";

            raf = requestAnimationFrame(animate);
        };

        const move = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        window.addEventListener("mousemove", move);
        raf = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("mousemove", move);
            cancelAnimationFrame(raf);
        };
    }, []);

    return <div ref={cursorRef} className="custom-cursor" />;
}
