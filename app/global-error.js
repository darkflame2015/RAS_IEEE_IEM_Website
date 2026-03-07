"use client";

/**
 * global-error.js catches errors in the ROOT layout itself.
 * Since the root layout is broken, we can't rely on globals.css or any component —
 * everything must be self-contained with inline styles.
 */
export default function GlobalError({ error, reset }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>Something Went Wrong — IEEE RAS</title>
                <link
                    href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap"
                    rel="stylesheet"
                />
            </head>
            <body
                style={{
                    margin: 0,
                    padding: 0,
                    minHeight: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#faf7f4",
                    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
                    color: "#1a1a1a",
                    textAlign: "center",
                    overflow: "hidden",
                }}
            >
                <div style={{ maxWidth: 480, padding: "40px 24px" }}>
                    {/* Warning SVG */}
                    <svg
                        viewBox="0 0 120 120"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ width: 100, height: 100, marginBottom: 24 }}
                    >
                        <circle cx="60" cy="60" r="56" fill="#1a1a1a" />
                        <rect x="55" y="30" width="10" height="36" rx="5" fill="#c9184a" />
                        <circle cx="60" cy="82" r="7" fill="#c9184a" />
                    </svg>

                    <p
                        style={{
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "0.2em",
                            color: "#c9184a",
                            marginBottom: 8,
                        }}
                    >
                        CRITICAL ERROR
                    </p>

                    <h1
                        style={{
                            fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
                            fontWeight: 800,
                            margin: "0 0 16px",
                            lineHeight: 1.2,
                        }}
                    >
                        Something Broke
                    </h1>

                    <p
                        style={{
                            fontSize: "1rem",
                            color: "#5a5a5a",
                            lineHeight: 1.7,
                            marginBottom: 32,
                        }}
                    >
                        A critical error occurred. Please try refreshing the page. If the problem
                        persists, contact us at{" "}
                        <a href="mailto:dsagnik36@gmail.com" style={{ color: "#800f2f", fontWeight: 600 }}>
                            dsagnik36@gmail.com
                        </a>
                    </p>

                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <button
                            onClick={() => reset()}
                            style={{
                                padding: "14px 32px",
                                border: "3px solid #1a1a1a",
                                borderRadius: 100,
                                background: "linear-gradient(135deg, #800f2f 0%, #c9184a 50%, #7b2cbf 100%)",
                                color: "#fff",
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                fontSize: "0.9rem",
                                fontWeight: 700,
                                cursor: "pointer",
                                letterSpacing: "0.02em",
                                transition: "transform 0.25s ease, box-shadow 0.25s ease",
                            }}
                            onMouseOver={(e) => {
                                e.target.style.transform = "translateY(-3px)";
                                e.target.style.boxShadow = "0 12px 32px rgba(201,24,74,0.3)";
                            }}
                            onMouseOut={(e) => {
                                e.target.style.transform = "translateY(0)";
                                e.target.style.boxShadow = "none";
                            }}
                        >
                            Try Again ↻
                        </button>

                        <button
                            onClick={() => (window.location.href = "/")}
                            style={{
                                padding: "14px 32px",
                                border: "3px solid #1a1a1a",
                                borderRadius: 100,
                                background: "transparent",
                                color: "#1a1a1a",
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                fontSize: "0.9rem",
                                fontWeight: 700,
                                cursor: "pointer",
                                letterSpacing: "0.02em",
                                transition: "background 0.25s ease, transform 0.25s ease",
                            }}
                            onMouseOver={(e) => {
                                e.target.style.background = "rgba(89,13,34,0.06)";
                                e.target.style.transform = "translateY(-3px)";
                            }}
                            onMouseOut={(e) => {
                                e.target.style.background = "transparent";
                                e.target.style.transform = "translateY(0)";
                            }}
                        >
                            Go Home →
                        </button>
                    </div>
                </div>
            </body>
        </html>
    );
}
