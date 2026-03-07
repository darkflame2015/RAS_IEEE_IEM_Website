# 🚀 IEEE RAS Student Chapter — Deployment & Configuration Guide

## Table of Contents
1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Deploying to Vercel](#deploying-to-vercel)
4. [Environment Variables](#environment-variables)
5. [Content Management (Config Files)](#content-management)
6. [Adding Events & Gallery Images](#adding-events--gallery-images)
7. [Updating Team Members](#updating-team-members)
8. [Security Notes](#security-notes)
9. [Folder Structure](#folder-structure)
10. [Troubleshooting](#troubleshooting)

---

## Project Overview

| Technology | Version |
|-----------|---------|
| Next.js | 16.1.6 (App Router) |
| React | 19.2.3 |
| GSAP | 3.14.2 |
| Resend | 6.9.3 (primary email) |
| EmailJS | REST API (fallback email) |
| Deployment | Vercel |

---

## Prerequisites

- **Node.js** 18.x or later
- **npm** 9+ (comes with Node.js)
- A **GitHub** account (for Vercel deployment)
- A **Vercel** account (free at [vercel.com](https://vercel.com))
- A **Resend** API key (free at [resend.com](https://resend.com))
- *(Optional)* An **EmailJS** account for fallback email ([emailjs.com](https://www.emailjs.com))

---

## Deploying to Vercel

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit — IEEE RAS website"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2: Connect to Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **"Import Git Repository"**
3. Select your GitHub repo
4. Vercel will auto-detect it as a Next.js project

### Step 3: Add Environment Variables
Before clicking **Deploy**, go to **Environment Variables** and add:

| Variable | Value | Required |
|----------|-------|----------|
| `RESEND_API_KEY` | Your Resend API key (starts with `re_`) | ✅ Yes |
| `EMAILJS_PUBLIC_KEY` | Your EmailJS public key | ⚠️ For fallback |
| `EMAILJS_SERVICE_ID` | Your EmailJS service ID | ⚠️ For fallback |
| `EMAILJS_TEMPLATE_ID` | Your EmailJS template ID | ⚠️ For fallback |
| `CONTACT_RECIPIENT` | Email to receive form submissions | ✅ Yes |
| `NEXT_PUBLIC_SITE_URL` | Your production URL (e.g., `https://your-site.vercel.app`) | ✅ Yes |

> ⚠️ **IMPORTANT:** Set `NEXT_PUBLIC_SITE_URL` to your actual Vercel domain after the first deploy. This is used for API origin validation.

### Step 4: Deploy
Click **Deploy** and wait ~60 seconds. Vercel will:
- Install dependencies
- Build the Next.js app
- Deploy to a global CDN

### Step 5: Update Site URL
After deployment, copy your Vercel domain (e.g., `https://ieee-ras.vercel.app`) and:
1. Go to **Vercel Dashboard → Project → Settings → Environment Variables**
2. Update `NEXT_PUBLIC_SITE_URL` to your production URL
3. Also update `url` in `config/site.js`
4. Redeploy (or push a new commit)

---

## Environment Variables

### Where to Set Them

| Environment | Location |
|-------------|----------|
| **Local dev** | `.env.local` (git-ignored, never committed) |
| **Vercel prod** | Vercel Dashboard → Project → Settings → Environment Variables |
| **Template** | `.env.example` (safe to commit — no real values) |

### Getting Your API Keys

#### Resend (Primary Email)
1. Go to [resend.com](https://resend.com) → Sign up
2. Dashboard → **API Keys** → **Create API Key**
3. Copy the key (starts with `re_`)
4. *(Optional)* Add a custom domain for sending in **Domains** section

#### EmailJS (Fallback)
1. Go to [emailjs.com](https://www.emailjs.com) → Sign up
2. **Email Services** → Add a service (Gmail, Outlook, etc.) → Copy **Service ID**
3. **Email Templates** → Create a template with these variables:
   - `{{from_name}}`, `{{from_email}}`, `{{phone}}`, `{{message}}`, `{{to_email}}`
4. Copy the **Template ID**
5. **Account** → Copy your **Public Key**

---

## Content Management

All editable content lives in the `config/` folder. **You don't need to touch component files to update content.**

| File | What it controls |
|------|-----------------|
| `config/site.js` | Site name, colors, nav links, footer, socials, metadata |
| `config/members.js` | Team members (name, role, image) |
| `config/events.js` | Events data (currently placeholder — see below) |
| `config/gallery.js` | Gallery data (currently placeholder — see below) |
| `config/features.js` | Homepage "What We Do" feature cards |
| `config/stats.js` | Homepage stat counters (members, events, etc.) |
| `config/about.js` | About page bento cards |

### How to Update Content
1. Open the relevant config file
2. Edit the data (follow the existing format)
3. Save and push to GitHub
4. Vercel will auto-deploy the changes

---

## Adding Events & Gallery Images

The Events and Gallery pages are currently in **"Stay Tuned"** mode. To go live:

### Events Page
1. **Add event data** to `config/events.js`:
   ```js
   const eventsData = [
       {
           title: "RoboHack 2025",
           date: "March 15–16, 2025",
           category: "Hackathon",
           image: "/events/robohack.jpg",     // optional
           desc: "A 24-hour robotics hackathon...",
           gradient: ["#590d22", "#a4133c"],
           ctaText: "Register Now",
           ctaLink: "/contact",
       },
       // Add more events...
   ];
   ```

2. **Add event images** to `public/events/` folder

3. **Update `app/events/page.js`** to render from the config data instead of the "stay tuned" placeholder. You can reference the previous events page design by checking git history.

### Gallery Page
1. **Add gallery data** to `config/gallery.js`:
   ```js
   const galleryData = [
       {
           title: "RoboHack 2024 — Teams",
           image: "/gallery/robohack-teams.jpg",
           gradient: ["#590d22", "#a4133c"],
           size: "tall",   // "normal" | "tall" | "wide"
       },
       // Add more items...
   ];
   ```

2. **Add gallery images** to `public/gallery/` folder

3. **Update `app/gallery/page.js`** similarly to render from config data.

---

## Updating Team Members

1. **Add the member's photo** to `public/members/` (e.g., `img_11.jpg`)

2. **Edit `config/members.js`**:
   ```js
   {
       name: "New Member Name",
       role: "Their Role",
       image: "/members/img_11.jpg",   // or null for gradient avatar
   },
   ```

3. Push to GitHub — Vercel auto-deploys.

---

## Security Notes

### ✅ What's Protected
- **API keys** are stored in environment variables (server-side only via `process.env`)
- **`.env.local`** is git-ignored — never committed to the repository
- **Contact API** has:
  - Rate limiting (5 requests/minute per IP)
  - Origin validation (only allows requests from your domain)
  - Input sanitization (strips HTML/scripts, length limits)
  - Email & phone validation
  - No API key or provider info leaked in responses
  - No `console.log` of sensitive data
- **Security headers** are set on all routes:
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY` (API) / `SAMEORIGIN` (pages)
  - `X-XSS-Protection: 1; mode=block`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - API responses are not cached

### ⚠️ Important Rules
1. **NEVER** put API keys in client-side code (files with `"use client"`)
2. **NEVER** commit `.env.local` — it's in `.gitignore`
3. **NEVER** use `NEXT_PUBLIC_` prefix for secret keys (that makes them public)
4. Only `NEXT_PUBLIC_SITE_URL` uses the public prefix (it's just the domain, not a secret)
5. If you suspect a key is leaked, rotate it immediately in the provider's dashboard

### 🔐 Environment Variable Prefixes
| Prefix | Visibility | Use for |
|--------|-----------|---------|
| No prefix | Server-side only | API keys, secrets |
| `NEXT_PUBLIC_` | Exposed to browser | Non-secret config (site URL) |

---

## Folder Structure

```
📦 ras_website_new
├── 📁 app/                    # Next.js App Router pages & components
│   ├── 📁 api/contact/        # Contact form API (server-side, secured)
│   │   └── route.js
│   ├── 📁 about/page.js       # About page
│   ├── 📁 contact/page.js     # Contact form page
│   ├── 📁 events/page.js      # Events page (stay tuned)
│   ├── 📁 gallery/page.js     # Gallery page (stay tuned)
│   ├── 📁 components/         # Reusable UI components
│   │   ├── CTA.js
│   │   ├── CustomCursor.js
│   │   ├── Features.js
│   │   ├── Footer.js
│   │   ├── GlowButton.js
│   │   ├── Hero.js
│   │   ├── Members.js
│   │   ├── Navbar.js
│   │   ├── Preloader.js
│   │   ├── SmoothWrapper.js
│   │   └── Stats.js
│   ├── error.js               # Runtime error page
│   ├── global-error.js        # Critical error page
│   ├── globals.css             # All styles
│   ├── layout.js              # Root layout
│   ├── not-found.js           # 404 page
│   └── page.js                # Homepage
├── 📁 config/                 # ✏️ EDITABLE DATA FILES
│   ├── about.js               # About page cards
│   ├── events.js              # Events data
│   ├── features.js            # Feature cards
│   ├── gallery.js             # Gallery images
│   ├── members.js             # Team members
│   ├── site.js                # Site config, colors, nav, socials
│   └── stats.js               # Stat counters
├── 📁 lib/                    # Utility functions
│   └── animations.js          # GSAP animation helpers
├── 📁 public/                 # Static assets (served at /)
│   ├── 📁 members/            # Member photos
│   ├── 📁 events/             # Event images (add when ready)
│   ├── 📁 gallery/            # Gallery images (add when ready)
│   ├── ieee-logo.png
│   └── ieee-ras-logo.jpg
├── .env.example               # Template for environment variables
├── .env.local                 # 🔒 YOUR REAL KEYS (git-ignored)
├── .gitignore
├── eslint.config.mjs
├── jsconfig.json
├── next.config.mjs            # Next.js config + security headers
├── package.json
└── README.md
```

---

## Troubleshooting

### Build fails on Vercel
- Check if all environment variables are set in Vercel dashboard
- Run `npm run build` locally first to catch errors
- Check Vercel deployment logs for specific error messages

### Contact form not working
1. Verify `RESEND_API_KEY` is set correctly (should start with `re_`)
2. Check if `CONTACT_RECIPIENT` email is valid
3. For Resend free tier: you can only send to verified email addresses
4. If Resend fails, it auto-falls back to EmailJS — make sure EmailJS vars are also set

### Images not loading
- Put images in the `public/` folder (not inside `app/`)
- Reference them as `/members/filename.jpg` (starting with `/`)
- Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`

### "Unauthorized request origin" error
- Update `NEXT_PUBLIC_SITE_URL` to match your actual Vercel domain
- The API validates that requests come from your domain

### CSS changes not visible
- Hard refresh (`Ctrl + Shift + R`)
- Clear Vercel cache: Dashboard → Deployments → Redeploy

---

## Quick Reference Commands

```bash
# Install dependencies
npm install

# Run locally
npm run dev

# Build for production (test before deploying)
npm run build

# Start production build locally
npm start

# Lint code
npm run lint
```

---

## Updating After Deployment

For any content update:
1. Edit the relevant file in `config/`
2. `git add . && git commit -m "Update [what you changed]" && git push`
3. Vercel auto-deploys on push ✨

For design changes:
- CSS → `app/globals.css`
- Components → `app/components/`
- Pages → `app/[page-name]/page.js`
