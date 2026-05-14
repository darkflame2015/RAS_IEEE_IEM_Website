"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactPage() {
    const sectionRef = useRef(null);
    const labelRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const formRef = useRef(null);
    const fieldsRef = useRef([]);
    const btnRef = useRef(null);
    const glowRef = useRef(null);
    const registerBtnRef = useRef(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        reason: "",
    });
    const [status, setStatus] = useState(null); // "success" | "error" | null
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Header reveal
            gsap.fromTo(labelRef.current,
                { opacity: 0, y: 20, filter: "blur(8px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, delay: 0.3, ease: "power3.out" }
            );
            gsap.fromTo(titleRef.current,
                { opacity: 0, y: 30, filter: "blur(8px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 1, delay: 0.5, ease: "power3.out" }
            );
            gsap.fromTo(subtitleRef.current,
                { opacity: 0, y: 20, filter: "blur(6px)" },
                { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, delay: 0.7, ease: "power3.out" }
            );

            // Form container
            gsap.fromTo(formRef.current,
                { opacity: 0, y: 40, scale: 0.96, filter: "blur(10px)" },
                { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1, delay: 0.9, ease: "power3.out" }
            );

            // Fields stagger
            const fields = fieldsRef.current.filter(Boolean);
            gsap.fromTo(fields,
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.6, stagger: 0.1, delay: 1.2, ease: "power3.out" }
            );

            // Button glow
            if (glowRef.current) {
                gsap.to(glowRef.current, {
                    opacity: 0.8,
                    scale: 1.15,
                    duration: 1.5,
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut",
                });
            }

            // Magnetic button effect
            const btn = btnRef.current;
            if (btn) {
                const handleMove = (e) => {
                    const rect = btn.getBoundingClientRect();
                    const x = e.clientX - rect.left - rect.width / 2;
                    const y = e.clientY - rect.top - rect.height / 2;
                    gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.1, ease: "power1.out" });
                };
                const handleLeave = () => {
                    gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
                };
                btn.addEventListener("mousemove", handleMove);
                btn.addEventListener("mouseleave", handleLeave);
            }

            /* ── Register IEEE RAS — clean GSAP animations ── */
            const regContainer = registerBtnRef.current;
            if (regContainer) {
                const regBtn = regContainer.querySelector(".register-ras__btn");
                const shimmer = regContainer.querySelector(".register-ras__shimmer");
                const regGlow = regContainer.querySelector(".register-ras__glow");

                // Entrance — bounce in
                gsap.fromTo(regContainer,
                    { opacity: 0, scale: 0.85, y: 20 },
                    { opacity: 1, scale: 1, y: 0, duration: 1, delay: 1.6, ease: "elastic.out(1, 0.5)" }
                );

                // Shimmer sweep — periodic
                if (shimmer) {
                    gsap.fromTo(shimmer,
                        { x: "-100%" },
                        {
                            x: "250%",
                            duration: 1.5,
                            repeat: -1,
                            repeatDelay: 4,
                            delay: 3,
                            ease: "power2.inOut",
                        }
                    );
                }

                // Glow pulse
                if (regGlow) {
                    gsap.to(regGlow, {
                        opacity: 0.7,
                        scale: 1.15,
                        duration: 2,
                        repeat: -1,
                        yoyo: true,
                        ease: "sine.inOut",
                    });
                }

                // Magnetic follow on hover
                if (regBtn) {
                    const handleRegMove = (e) => {
                        const rect = regBtn.getBoundingClientRect();
                        const x = e.clientX - rect.left - rect.width / 2;
                        const y = e.clientY - rect.top - rect.height / 2;
                        gsap.set(regBtn, { x: x * 0.25, y: y * 0.25 });
                    };
                    const handleRegLeave = () => {
                        gsap.to(regBtn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
                    };
                    regBtn.addEventListener("mousemove", handleRegMove);
                    regBtn.addEventListener("mouseleave", handleRegLeave);
                }
            }
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus(null);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (res.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", phone: "", reason: "" });

                // Success animation
                if (formRef.current) {
                    gsap.fromTo(formRef.current,
                        { scale: 1 },
                        { scale: 1.02, duration: 0.2, yoyo: true, repeat: 1, ease: "power2.out" }
                    );
                }
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <main>
                <section className="contact" ref={sectionRef} id="contact-page">
                    <div className="contact__header">
                        <span className="contact__label" ref={labelRef}>Get in Touch</span>
                        <h1 className="contact__title" ref={titleRef}>Let&apos;s Build Something Incredible</h1>
                        <p className="contact__subtitle" ref={subtitleRef}>
                            Ready to join the next wave of robotics innovators? Tell us about yourself
                            and why you want to be part of the IEEE RAS family.
                        </p>
                    </div>

                    <form className="contact__form" ref={formRef} onSubmit={handleSubmit} autoComplete="off">
                        <div className="contact__grain" />

                        <div className="contact__field" ref={(el) => (fieldsRef.current[0] = el)}>
                            <label className="contact__field-label" htmlFor="name">Full Name</label>
                            <input
                                className="contact__input"
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter your full name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="contact__field" ref={(el) => (fieldsRef.current[1] = el)}>
                            <label className="contact__field-label" htmlFor="email">Email Address</label>
                            <input
                                className="contact__input"
                                id="email"
                                name="email"
                                type="email"
                                placeholder="your.email@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="contact__field" ref={(el) => (fieldsRef.current[2] = el)}>
                            <label className="contact__field-label" htmlFor="phone">Phone Number</label>
                            <input
                                className="contact__input"
                                id="phone"
                                name="phone"
                                type="tel"
                                placeholder="+91 XXXXX XXXXX"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="contact__field" ref={(el) => (fieldsRef.current[3] = el)}>
                            <label className="contact__field-label" htmlFor="reason">Why do you want to join the society?</label>
                            <textarea
                                className="contact__textarea"
                                id="reason"
                                name="reason"
                                rows={5}
                                placeholder="Tell us about your passion for robotics, what excites you, and what you hope to build..."
                                value={formData.reason}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="contact__submit-wrapper">
                            <button
                                className="glow-btn contact__submit"
                                type="submit"
                                ref={btnRef}
                                disabled={loading}
                                id="contact-submit-btn"
                            >
                                <span className="glow-btn__glow" ref={glowRef} />
                                <span className="glow-btn__text">
                                    {loading ? "Transmitting..." : "Send Your Signal →"}
                                </span>
                            </button>
                            <div className="register-ras" ref={registerBtnRef}>
                                <a
                                    className="glow-btn register-ras__btn"
                                    href="https://www.ieee.org/membership-catalog/productdetail/showProductDetailPage.html?product=MEMRA024&searchResults=Y"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="glow-btn__glow register-ras__glow" />
                                    <span className="register-ras__shimmer" />
                                    <span className="glow-btn__text">
                                        Register for IEEE RAS →
                                    </span>
                                </a>
                            </div>
                        </div>

                        {status === "success" && (
                            <div className="contact__status contact__status--success">
                                ✓ Message transmitted successfully! We&apos;ll get back to you soon.
                            </div>
                        )}
                        {status === "error" && (
                            <div className="contact__status contact__status--error">
                                ✗ Transmission failed. Please try again or email us directly.
                            </div>
                        )}
                    </form>
                </section>
            </main>
            <Footer />
        </>
    );
}
