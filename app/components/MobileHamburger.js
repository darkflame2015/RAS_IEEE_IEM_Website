"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import siteConfig from "../../config/site";

const NAV_ITEMS = siteConfig.navItems;

export default function MobileHamburger() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef(null);

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close menu on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      document.addEventListener("keydown", handleKey);
      return () => document.removeEventListener("keydown", handleKey);
    }
  }, [open]);

  // Close if clicking outside the menu & button
  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <>
      {/* ── Floating Action Button ── */}
      <button
        ref={menuRef}
        className="mobile-hamburger-fab"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={open}
      >
        <span className={`mobile-hamburger-icon ${open ? "mobile-hamburger-icon--open" : ""}`}>
          <span />
          <span />
          <span />
        </span>
      </button>

      {/* ── Backdrop ── */}
      <div
        className={`mobile-hamburger-backdrop ${open ? "mobile-hamburger-backdrop--visible" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* ── Menu Panel ── */}
      <nav
        className={`mobile-hamburger-menu ${open ? "mobile-hamburger-menu--open" : ""}`}
        aria-label="Mobile navigation"
      >
        <ul className="mobile-hamburger-list">
          {NAV_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`mobile-hamburger-link ${pathname === item.href ? "mobile-hamburger-link--active" : ""}`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Scoped Styles ── */}
      <style jsx global>{`
        /* ===== Mobile Hamburger — visible only on small screens ===== */

        /* Hide everything on desktop */
        .mobile-hamburger-fab,
        .mobile-hamburger-backdrop,
        .mobile-hamburger-menu {
          display: none;
        }

        @media (max-width: 768px) {
          /* ── FAB Button ── */
          .mobile-hamburger-fab {
            display: flex;
            align-items: center;
            justify-content: center;
            position: fixed;
            bottom: 24px;
            left: 24px;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            border: 2px solid rgba(255, 255, 255, 0.15);
            background: var(--accent-gradient);
            box-shadow:
              0 4px 20px rgba(201, 24, 74, 0.45),
              0 0 40px rgba(201, 24, 74, 0.15);
            z-index: 10000;
            cursor: pointer !important;
            -webkit-tap-highlight-color: transparent;
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
                        box-shadow 0.3s ease;
          }

          .mobile-hamburger-fab:active {
            transform: scale(0.92);
          }

          /* ── Hamburger ↔ X Icon ── */
          .mobile-hamburger-icon {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 5px;
            width: 22px;
            height: 18px;
            position: relative;
          }

          .mobile-hamburger-icon span {
            display: block;
            width: 100%;
            height: 2px;
            background: #fff;
            border-radius: 2px;
            transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                        opacity 0.25s ease;
            transform-origin: center;
          }

          .mobile-hamburger-icon--open span:nth-child(1) {
            transform: translateY(7px) rotate(45deg);
          }
          .mobile-hamburger-icon--open span:nth-child(2) {
            opacity: 0;
          }
          .mobile-hamburger-icon--open span:nth-child(3) {
            transform: translateY(-7px) rotate(-45deg);
          }

          /* ── Backdrop ── */
          .mobile-hamburger-backdrop {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(4px);
            -webkit-backdrop-filter: blur(4px);
            z-index: 9998;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.35s ease;
          }

          .mobile-hamburger-backdrop--visible {
            opacity: 1;
            pointer-events: auto;
          }

          /* ── Menu Panel ── */
          .mobile-hamburger-menu {
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: fixed;
            bottom: 90px;
            left: 24px;
            min-width: 200px;
            padding: 12px 0;
            border-radius: var(--border-radius);
            background: rgba(20, 5, 10, 0.92);
            border: 1px solid rgba(201, 24, 74, 0.25);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            box-shadow:
              0 12px 40px rgba(0, 0, 0, 0.5),
              0 0 30px rgba(201, 24, 74, 0.12);
            z-index: 9999;
            opacity: 0;
            transform: translateY(16px) scale(0.95);
            pointer-events: none;
            transition: opacity 0.3s ease,
                        transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
          }

          .mobile-hamburger-menu--open {
            opacity: 1;
            transform: translateY(0) scale(1);
            pointer-events: auto;
          }

          /* ── Links ── */
          .mobile-hamburger-list {
            list-style: none;
            margin: 0;
            padding: 0;
          }

          .mobile-hamburger-link {
            display: block;
            padding: 14px 28px;
            color: rgba(255, 255, 255, 0.8);
            font-family: var(--font-primary);
            font-size: 1rem;
            font-weight: 600;
            letter-spacing: 0.02em;
            text-decoration: none;
            transition: background 0.2s ease, color 0.2s ease;
            cursor: pointer !important;
          }

          .mobile-hamburger-link:hover,
          .mobile-hamburger-link:focus-visible {
            background: rgba(201, 24, 74, 0.15);
            color: #fff;
          }

          .mobile-hamburger-link--active {
            color: #fff;
            background: rgba(201, 24, 74, 0.2);
            border-left: 3px solid var(--color-4, #c9184a);
          }
        }
      `}</style>
    </>
  );
}
