/**
 * ───────────────────────────────────────────
 *  FEATURES DATA
 *  Edit this file to update the feature cards
 *  shown on the homepage "What We Do" section.
 *
 *  Icon classes available:
 *  - feature-card__icon--purple
 *  - feature-card__icon--cyan
 *  - feature-card__icon--pink
 * ───────────────────────────────────────────
 */

const featuresData = [
    {
        iconClass: "feature-card__icon--purple",
        title: "Hackathons",
        desc: "24-hour build sprints where teams prototype robotics solutions, compete for prizes, and push their engineering skills to the limit.",
        // SVG icon is defined in the component — update there if needed
    },
    {
        iconClass: "feature-card__icon--cyan",
        title: "Hands-On Workshops",
        desc: "From soldering circuits to programming ROS — practical sessions that turn theory into working prototypes you can take home.",
    },
    {
        iconClass: "feature-card__icon--pink",
        title: "Technical Talks",
        desc: "Industry professionals and researchers share insights on AI, autonomous systems, and the cutting edge of automation technology.",
    },
    {
        iconClass: "feature-card__icon--purple",
        title: "Competitions",
        desc: "From line-following bots to autonomous drones — we form teams, build machines, and represent the chapter at national-level competitions.",
    },
    {
        iconClass: "feature-card__icon--cyan",
        title: "Mentorship",
        desc: "Seniors mentor juniors on real projects. Whether it's your first robot or your tenth, there's always someone to learn from.",
    },
    {
        iconClass: "feature-card__icon--pink",
        title: "Open Projects",
        desc: "Year-round project teams work on real-world robotics challenges — robotic arms, SLAM bots, drones, and custom PCB designs.",
    },
];

export default featuresData;
