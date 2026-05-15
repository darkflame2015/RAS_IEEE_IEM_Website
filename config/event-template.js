/**
 * ───────────────────────────────────────────────────────────
 *  EVENT TEMPLATE — Upcoming / Ongoing Events
 * ───────────────────────────────────────────────────────────
 *
 *  HOW TO USE:
 *  1. Copy the template object below
 *  2. Paste it into the `events` array in app/events/page.js
 *  3. Fill in your event details
 *  4. Set status to "Upcoming" or "Ongoing"
 *
 *  BEHAVIOR:
 *  - "Completed" events → clicking redirects to /gallery
 *  - "Upcoming" / "Ongoing" events → clicking opens an
 *    expanded popup with full details + registration button
 *
 *  REQUIRED FIELDS:
 *    title           — Event name
 *    date            — Display date string (e.g. "June 15, 2026")
 *    status          — "Upcoming" | "Ongoing" | "Completed"
 *    category        — Tag shown on the image (e.g. "Hackathon")
 *    description     — Full event description (shown in card & popup)
 *    image           — Path to event banner in /public/gallery/
 *
 *  OPTIONAL FIELDS (shown in popup only):
 *    registrationLink — URL to Google Form / registration page
 *    venue            — Event location
 *    time             — Event timing
 * ───────────────────────────────────────────────────────────
 */

const eventTemplate = {
    title: "RoboHack 2026 — 24hr Robotics Hackathon",
    date: "June 15, 2026",
    status: "Upcoming",
    category: "Hackathon",
    description:
        "A 24-hour intensive robotics hackathon where teams design, build, and program autonomous robots to solve real-world challenges. Open to all IEEE members and engineering students. Prizes worth ₹50,000, mentorship from industry experts, and hands-on access to cutting-edge hardware.",
    image: "/gallery/stpi-visit-drone-demo.jpeg",
    registrationLink: "https://forms.google.com/example-registration-link",
    venue: "IEM Kolkata — Robotics Lab, Block C",
    time: "10:00 AM — 10:00 AM (next day)",
};

export default eventTemplate;
