/**
 * ───────────────────────────────────────────
 *  SITE CONFIGURATION
 *  Edit this file to update global site info,
 *  colors, contact details, and social links.
 * ───────────────────────────────────────────
 */

const siteConfig = {
    // ─── General Info ───
    name: "IEEE RAS Student Chapter",
    shortName: "IEEE RAS",
    tagline: "Robotics & Automation",
    description:
        "IEEE Robotics and Automation Society — Advancing innovation in robotics and automation through collaboration, research, and cutting-edge technology.",
    keywords: "IEEE, RAS, robotics, automation, society, research, engineering",
    url: "https://your-domain.vercel.app", // Update after deployment

    // ─── Contact & Email ───
    contactEmail: "dsagnik36@gmail.com", // Where contact form submissions go

    // ─── Social Links (add your actual URLs) ───
    socials: {
        instagram: "https://instagram.com/ieee_ras",
        linkedin: "https://linkedin.com/company/ieee-ras",
        twitter: "https://twitter.com/ieee_ras",
        github: "https://github.com/ieee-ras",
        youtube: "https://youtube.com/@ieee-ras",
    },

    // ─── Design Tokens / Colors ───
    // These map to CSS custom properties in globals.css
    // To change the site theme, update both here AND in globals.css :root
    colors: {
        primary: "#590d22",     // --color-1  (Deepest maroon)
        secondary: "#800f2f",   // --color-2
        accent: "#a4133c",      // --color-3
        highlight: "#c9184a",   // --color-4  (Bright crimson)
        purple: "#7b2cbf",      // --color-5  (Accent purple)
        rose: "#b23a48",        // --color-6  (Rose-red)
        white: "#ffffff",
        background: "#0a0a0a",  // Site background
        cardBg: "#111111",      // Card backgrounds
        textPrimary: "#fafafa", // Main text
        textMuted: "#aaaaaa",   // Subtitle / muted text
        border: "#1a1a1a",      // Card borders
    },

    // ─── Gradient Presets (used across cards, avatars, etc.) ───
    gradients: [
        ["#590d22", "#a4133c"],
        ["#800f2f", "#7b2cbf"],
        ["#a4133c", "#590d22"],
        ["#c9184a", "#800f2f"],
        ["#7b2cbf", "#c9184a"],
        ["#b23a48", "#7b2cbf"],
        ["#590d22", "#b23a48"],
        ["#800f2f", "#c9184a"],
        ["#a4133c", "#7b2cbf"],
        ["#c9184a", "#590d22"],
        ["#7b2cbf", "#a4133c"],
        ["#b23a48", "#800f2f"],
    ],

    // ─── Navigation ───
    navItems: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "Events", href: "/events" },
        { label: "Gallery", href: "/gallery" },
        { label: "Contact", href: "/contact" },
    ],

    // ─── Footer Links ───
    footerLinks: [
        { label: "About", href: "/about" },
        { label: "Events", href: "/events" },
        { label: "Gallery", href: "/gallery" },
        { label: "Contact", href: "/contact" },
    ],

    // ─── Copyright ───
    copyrightEntity: "IEEE Robotics & Automation Society — Student Chapter",
};

export default siteConfig;
