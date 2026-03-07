# 🚀 IEEE RAS Student Chapter — Complete Deployment Guide# 🚀 IEEE RAS Student Chapter — Deployment & Configuration Guide



> **This guide walks you through everything** — from getting your API keys to going live on Vercel. Follow each step in order.## Table of Contents

1. [Project Overview](#project-overview)

---2. [Prerequisites](#prerequisites)

3. [Deploying to Vercel](#deploying-to-vercel)

## 📋 Table of Contents4. [Environment Variables](#environment-variables)

5. [Content Management (Config Files)](#content-management)

1. [Before You Begin — What You Need](#-step-0-before-you-begin)6. [Adding Events & Gallery Images](#adding-events--gallery-images)

2. [Get Your Resend API Key](#-step-1-get-your-resend-api-key-required)7. [Updating Team Members](#updating-team-members)

3. [Get Your EmailJS Keys](#-step-2-get-your-emailjs-keys-optional-but-recommended)8. [Security Notes](#security-notes)

4. [Deploy to Vercel](#-step-3-deploy-to-vercel)9. [Folder Structure](#folder-structure)

5. [Set Environment Variables in Vercel](#-step-4-set-environment-variables-in-vercel)10. [Troubleshooting](#troubleshooting)

6. [Update the Site URL After Deploy](#-step-5-update-site-url-after-first-deploy)

7. [Verify Everything Works](#-step-6-verify-everything-works)---

8. [Custom Domain (Optional)](#-step-7-custom-domain-optional)

9. [Updating Content After Deployment](#-updating-content-after-deployment)## Project Overview

10. [Security Checklist](#-security-checklist)

11. [Troubleshooting](#-troubleshooting)| Technology | Version |

|-----------|---------|

---| Next.js | 16.1.6 (App Router) |

| React | 19.2.3 |

## 🔧 Step 0: Before You Begin| GSAP | 3.14.2 |

| Resend | 6.9.3 (primary email) |

You need these accounts (all free):| EmailJS | REST API (fallback email) |

| Deployment | Vercel |

| Account | Sign Up Link | What It's For |

|---------|-------------|---------------|---

| **GitHub** | [github.com](https://github.com) | Hosts your code — already done ✅ |

| **Vercel** | [vercel.com](https://vercel.com) | Deploys & hosts your website |## Prerequisites

| **Resend** | [resend.com](https://resend.com) | Sends contact form emails (100/day free) |

| **EmailJS** *(optional)* | [emailjs.com](https://www.emailjs.com) | Backup email if Resend fails (200/month free) |- **Node.js** 18.x or later

- **npm** 9+ (comes with Node.js)

---- A **GitHub** account (for Vercel deployment)

- A **Vercel** account (free at [vercel.com](https://vercel.com))

## 📧 Step 1: Get Your Resend API Key [REQUIRED]- A **Resend** API key (free at [resend.com](https://resend.com))

- *(Optional)* An **EmailJS** account for fallback email ([emailjs.com](https://www.emailjs.com))

> Resend is the **primary** email provider. When someone fills out the contact form, Resend sends you the email.

---

### 1.1 — Create Account

1. Go to **[resend.com](https://resend.com)**## Deploying to Vercel

2. Click **"Get Started"** → Sign up with GitHub or email

### Step 1: Push to GitHub

### 1.2 — Create an API Key```bash

1. After login, click **"API Keys"** in the left sidebargit init

2. Click **"+ Create API Key"**git add .

3. Fill in:git commit -m "Initial commit — IEEE RAS website"

   - **Name:** `IEEE RAS Website`git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

   - **Permission:** `Sending access`git push -u origin main

   - **Domain:** Leave as default (`resend.dev`)```

4. Click **"Add"**

5. **⚠️ COPY THE KEY IMMEDIATELY** — it starts with `re_` and you can **only see it once!**### Step 2: Connect to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)

### 1.3 — Save It2. Click **"Import Git Repository"**

Write it down or paste it into a note. You'll enter it in Vercel later.3. Select your GitHub repo

4. Vercel will auto-detect it as a Next.js project

```

Your key looks like: re_AbCdEfGh_1234567890abcdef### Step 3: Add Environment Variables

```Before clicking **Deploy**, go to **Environment Variables** and add:



### ℹ️ Resend Free Tier Notes| Variable | Value | Required |

- **100 emails/day**, **3,000 emails/month** — more than enough|----------|-------|----------|

- On the free plan, emails are sent FROM `onboarding@resend.dev`| `RESEND_API_KEY` | Your Resend API key (starts with `re_`) | ✅ Yes |

- To use your own sender address (e.g., `noreply@your-domain.com`), add a custom domain in Resend → Domains| `EMAILJS_PUBLIC_KEY` | Your EmailJS public key | ⚠️ For fallback |

| `EMAILJS_SERVICE_ID` | Your EmailJS service ID | ⚠️ For fallback |

---| `EMAILJS_TEMPLATE_ID` | Your EmailJS template ID | ⚠️ For fallback |

| `CONTACT_RECIPIENT` | Email to receive form submissions | ✅ Yes |

## 📨 Step 2: Get Your EmailJS Keys [OPTIONAL but Recommended]| `NEXT_PUBLIC_SITE_URL` | Your production URL (e.g., `https://your-site.vercel.app`) | ✅ Yes |



> EmailJS is the **fallback**. If Resend is down, the contact form automatically retries through EmailJS. Skip this step if you don't want a fallback.> ⚠️ **IMPORTANT:** Set `NEXT_PUBLIC_SITE_URL` to your actual Vercel domain after the first deploy. This is used for API origin validation.



### 2.1 — Create Account### Step 4: Deploy

1. Go to **[emailjs.com](https://www.emailjs.com)**Click **Deploy** and wait ~60 seconds. Vercel will:

2. Click **"Sign Up Free"** → Create account- Install dependencies

- Build the Next.js app

### 2.2 — Connect an Email Service- Deploy to a global CDN

1. In the dashboard, click **"Email Services"** in the sidebar

2. Click **"Add New Service"**### Step 5: Update Site URL

3. Choose your email provider (Gmail, Outlook, Yahoo, etc.)After deployment, copy your Vercel domain (e.g., `https://ieee-ras.vercel.app`) and:

4. Click **"Connect Account"** → Authorize access1. Go to **Vercel Dashboard → Project → Settings → Environment Variables**

5. **📝 Copy the "Service ID"** shown (looks like `service_abc123`)2. Update `NEXT_PUBLIC_SITE_URL` to your production URL

3. Also update `url` in `config/site.js`

### 2.3 — Create an Email Template4. Redeploy (or push a new commit)

1. Click **"Email Templates"** in the sidebar

2. Click **"Create New Template"**---

3. Design your template. Use these **exact** placeholders in the body:

## Environment Variables

```

New Inquiry from {{from_name}}### Where to Set Them



Email: {{from_email}}| Environment | Location |

Phone: {{phone}}|-------------|----------|

| **Local dev** | `.env.local` (git-ignored, never committed) |

Message:| **Vercel prod** | Vercel Dashboard → Project → Settings → Environment Variables |

{{message}}| **Template** | `.env.example` (safe to commit — no real values) |



---### Getting Your API Keys

Sent to: {{to_email}}

```#### Resend (Primary Email)

1. Go to [resend.com](https://resend.com) → Sign up

4. Set the **"To Email"** field to: `{{to_email}}`2. Dashboard → **API Keys** → **Create API Key**

5. Set the **Subject** to: `IEEE RAS — New Inquiry from {{from_name}}`3. Copy the key (starts with `re_`)

6. Click **"Save"**4. *(Optional)* Add a custom domain for sending in **Domains** section

7. **📝 Copy the "Template ID"** shown (looks like `template_xyz789`)

#### EmailJS (Fallback)

### 2.4 — Get Your Public Key1. Go to [emailjs.com](https://www.emailjs.com) → Sign up

1. Click **"Account"** in the sidebar2. **Email Services** → Add a service (Gmail, Outlook, etc.) → Copy **Service ID**

2. Go to the **"General"** tab3. **Email Templates** → Create a template with these variables:

3. **📝 Copy the "Public Key"** (looks like `aBcDeFgHiJkLm`)   - `{{from_name}}`, `{{from_email}}`, `{{phone}}`, `{{message}}`, `{{to_email}}`

4. Copy the **Template ID**

### 2.5 — Summary of Keys You Now Have5. **Account** → Copy your **Public Key**



| Key | Looks Like | Where You Got It |---

|-----|-----------|-----------------|

| **Public Key** | `aBcDeFgHiJkLm` | Account → General |## Content Management

| **Service ID** | `service_abc123` | Email Services |

| **Template ID** | `template_xyz789` | Email Templates |All editable content lives in the `config/` folder. **You don't need to touch component files to update content.**



---| File | What it controls |

|------|-----------------|

## ▲ Step 3: Deploy to Vercel| `config/site.js` | Site name, colors, nav links, footer, socials, metadata |

| `config/members.js` | Team members (name, role, image) |

### 3.1 — Sign Up / Log In| `config/events.js` | Events data (currently placeholder — see below) |

1. Go to **[vercel.com](https://vercel.com)**| `config/gallery.js` | Gallery data (currently placeholder — see below) |

2. Click **"Sign Up"** → Choose **"Continue with GitHub"**| `config/features.js` | Homepage "What We Do" feature cards |

3. Authorize Vercel to access your GitHub| `config/stats.js` | Homepage stat counters (members, events, etc.) |

| `config/about.js` | About page bento cards |

### 3.2 — Import Your Repository

1. Go to **[vercel.com/new](https://vercel.com/new)**### How to Update Content

2. You'll see **"Import Git Repository"**1. Open the relevant config file

3. Find **`RAS_NEW_WEBSITE_UPDATED`** in the list2. Edit the data (follow the existing format)

4. If you don't see it, click **"Adjust GitHub App Permissions"** → grant access to the repo3. Save and push to GitHub

5. Click **"Import"**4. Vercel will auto-deploy the changes



### 3.3 — Configure Project (Before First Deploy)---

Vercel auto-detects it as **Next.js** — you don't need to change:

- **Framework Preset:** Next.js ✅ (auto-detected)## Adding Events & Gallery Images

- **Root Directory:** `./` ✅ (leave as default)

- **Build Command:** `next build` ✅ (auto-detected)The Events and Gallery pages are currently in **"Stay Tuned"** mode. To go live:

- **Output Directory:** `.next` ✅ (auto-detected)

### Events Page

### ⚠️ DON'T CLICK DEPLOY YET — First add environment variables (Step 4)!1. **Add event data** to `config/events.js`:

   ```js

---   const eventsData = [

       {

## 🔑 Step 4: Set Environment Variables in Vercel           title: "RoboHack 2025",

           date: "March 15–16, 2025",

> This is the most important step. Without these, the contact form won't work.           category: "Hackathon",

           image: "/events/robohack.jpg",     // optional

### 4.1 — On the Import Page (Before First Deploy)           desc: "A 24-hour robotics hackathon...",

           gradient: ["#590d22", "#a4133c"],

Scroll down to the **"Environment Variables"** section. Add each variable one by one:           ctaText: "Register Now",

           ctaLink: "/contact",

#### Variable 1: `RESEND_API_KEY` — **REQUIRED**       },

| Field | Value |       // Add more events...

|-------|-------|   ];

| **Name** | `RESEND_API_KEY` |   ```

| **Value** | `re_AbCdEfGh_your_actual_key` ← paste your real key from Step 1 |

| **Environment** | ✅ Production, ✅ Preview, ✅ Development |2. **Add event images** to `public/events/` folder



Click **"Add"**3. **Update `app/events/page.js`** to render from the config data instead of the "stay tuned" placeholder. You can reference the previous events page design by checking git history.



#### Variable 2: `CONTACT_RECIPIENT` — **REQUIRED**### Gallery Page

| Field | Value |1. **Add gallery data** to `config/gallery.js`:

|-------|-------|   ```js

| **Name** | `CONTACT_RECIPIENT` |   const galleryData = [

| **Value** | `dsagnik36@gmail.com` ← the email that receives contact form submissions |       {

| **Environment** | ✅ Production, ✅ Preview, ✅ Development |           title: "RoboHack 2024 — Teams",

           image: "/gallery/robohack-teams.jpg",

Click **"Add"**           gradient: ["#590d22", "#a4133c"],

           size: "tall",   // "normal" | "tall" | "wide"

#### Variable 3: `NEXT_PUBLIC_SITE_URL` — **REQUIRED**       },

| Field | Value |       // Add more items...

|-------|-------|   ];

| **Name** | `NEXT_PUBLIC_SITE_URL` |   ```

| **Value** | `https://ras-new-website-updated.vercel.app` ← you'll update this after deploy |

| **Environment** | ✅ Production, ✅ Preview, ✅ Development |2. **Add gallery images** to `public/gallery/` folder



> 💡 For now, put your **best guess** of the Vercel URL. You'll update it in Step 5.3. **Update `app/gallery/page.js`** similarly to render from config data.



Click **"Add"**---



#### Variable 4: `EMAILJS_PUBLIC_KEY` — *Optional (for fallback)*## Updating Team Members

| Field | Value |

|-------|-------|1. **Add the member's photo** to `public/members/` (e.g., `img_11.jpg`)

| **Name** | `EMAILJS_PUBLIC_KEY` |

| **Value** | Your EmailJS public key from Step 2.4 |2. **Edit `config/members.js`**:

| **Environment** | ✅ Production, ✅ Preview, ✅ Development |   ```js

   {

Click **"Add"**       name: "New Member Name",

       role: "Their Role",

#### Variable 5: `EMAILJS_SERVICE_ID` — *Optional (for fallback)*       image: "/members/img_11.jpg",   // or null for gradient avatar

| Field | Value |   },

|-------|-------|   ```

| **Name** | `EMAILJS_SERVICE_ID` |

| **Value** | Your EmailJS service ID from Step 2.2 (e.g., `service_abc123`) |3. Push to GitHub — Vercel auto-deploys.

| **Environment** | ✅ Production, ✅ Preview, ✅ Development |

---

Click **"Add"**

## Security Notes

#### Variable 6: `EMAILJS_TEMPLATE_ID` — *Optional (for fallback)*

| Field | Value |### ✅ What's Protected

|-------|-------|- **API keys** are stored in environment variables (server-side only via `process.env`)

| **Name** | `EMAILJS_TEMPLATE_ID` |- **`.env.local`** is git-ignored — never committed to the repository

| **Value** | Your EmailJS template ID from Step 2.3 (e.g., `template_xyz789`) |- **Contact API** has:

| **Environment** | ✅ Production, ✅ Preview, ✅ Development |  - Rate limiting (5 requests/minute per IP)

  - Origin validation (only allows requests from your domain)

Click **"Add"**  - Input sanitization (strips HTML/scripts, length limits)

  - Email & phone validation

### 4.2 — Final Check Before Deploy  - No API key or provider info leaked in responses

  - No `console.log` of sensitive data

Your environment variables section should have **6 variables** (or 3 if you skipped EmailJS):- **Security headers** are set on all routes:

  - `X-Content-Type-Options: nosniff`

```  - `X-Frame-Options: DENY` (API) / `SAMEORIGIN` (pages)

✅ RESEND_API_KEY          = re_xxxxxxxxxxxxxxxx  - `X-XSS-Protection: 1; mode=block`

✅ CONTACT_RECIPIENT       = dsagnik36@gmail.com  - `Referrer-Policy: strict-origin-when-cross-origin`

✅ NEXT_PUBLIC_SITE_URL    = https://your-project.vercel.app  - API responses are not cached

⚡ EMAILJS_PUBLIC_KEY      = aBcDeFgHiJkLm         (optional)

⚡ EMAILJS_SERVICE_ID      = service_abc123          (optional)### ⚠️ Important Rules

⚡ EMAILJS_TEMPLATE_ID     = template_xyz789         (optional)1. **NEVER** put API keys in client-side code (files with `"use client"`)

```2. **NEVER** commit `.env.local` — it's in `.gitignore`

3. **NEVER** use `NEXT_PUBLIC_` prefix for secret keys (that makes them public)

### 4.3 — Click "Deploy" 🚀4. Only `NEXT_PUBLIC_SITE_URL` uses the public prefix (it's just the domain, not a secret)

5. If you suspect a key is leaked, rotate it immediately in the provider's dashboard

Vercel will now:

1. Pull the code from GitHub### 🔐 Environment Variable Prefixes

2. Install dependencies (`npm install`)| Prefix | Visibility | Use for |

3. Build the Next.js app (`next build`)|--------|-----------|---------|

4. Deploy to a global CDN| No prefix | Server-side only | API keys, secrets |

| `NEXT_PUBLIC_` | Exposed to browser | Non-secret config (site URL) |

This takes about **60–90 seconds**. You'll see a live log.

---

---

## Folder Structure

## 🌐 Step 5: Update Site URL After First Deploy

```

After deployment completes, Vercel gives you a URL like:📦 ras_website_new

```├── 📁 app/                    # Next.js App Router pages & components

https://ras-new-website-updated.vercel.app│   ├── 📁 api/contact/        # Contact form API (server-side, secured)

```│   │   └── route.js

│   ├── 📁 about/page.js       # About page

### 5.1 — Update the Environment Variable│   ├── 📁 contact/page.js     # Contact form page

1. Go to **Vercel Dashboard** → Click your project│   ├── 📁 events/page.js      # Events page (stay tuned)

2. Click **"Settings"** tab (top menu)│   ├── 📁 gallery/page.js     # Gallery page (stay tuned)

3. Click **"Environment Variables"** (left sidebar)│   ├── 📁 components/         # Reusable UI components

4. Find **`NEXT_PUBLIC_SITE_URL`**│   │   ├── CTA.js

5. Click the **three dots (⋯)** → **"Edit"**│   │   ├── CustomCursor.js

6. Change the value to your **actual Vercel URL** (e.g., `https://ras-new-website-updated.vercel.app`)│   │   ├── Features.js

7. Click **"Save"**│   │   ├── Footer.js

│   │   ├── GlowButton.js

### 5.2 — Redeploy to Apply the Change│   │   ├── Hero.js

1. Go to **"Deployments"** tab│   │   ├── Members.js

2. Click the **three dots (⋯)** on the latest deployment│   │   ├── Navbar.js

3. Click **"Redeploy"** → Confirm│   │   ├── Preloader.js

│   │   ├── SmoothWrapper.js

> ℹ️ This is a one-time step. After this, every `git push` will auto-deploy with the correct URL.│   │   └── Stats.js

│   ├── error.js               # Runtime error page

---│   ├── global-error.js        # Critical error page

│   ├── globals.css             # All styles

## ✅ Step 6: Verify Everything Works│   ├── layout.js              # Root layout

│   ├── not-found.js           # 404 page

### 6.1 — Check the Website│   └── page.js                # Homepage

Open your Vercel URL in a browser and verify all pages load:├── 📁 config/                 # ✏️ EDITABLE DATA FILES

│   ├── about.js               # About page cards

| Page | URL | What to Check |│   ├── events.js              # Events data

|------|-----|---------------|│   ├── features.js            # Feature cards

| 🏠 Home | `/` | Preloader → Hero → Features → Members → CTA → Footer |│   ├── gallery.js             # Gallery images

| ℹ️ About | `/about` | Bento grid cards with animations |│   ├── members.js             # Team members

| 📅 Events | `/events` | "Stay Tuned" placeholder with animated SVG |│   ├── site.js                # Site config, colors, nav, socials

| 🖼️ Gallery | `/gallery` | "Stay Tuned" placeholder matching events style |│   └── stats.js               # Stat counters

| 📬 Contact | `/contact` | Form loads, all fields work |├── 📁 lib/                    # Utility functions

| ❌ 404 | `/any-random-page` | Custom animated error page |│   └── animations.js          # GSAP animation helpers

├── 📁 public/                 # Static assets (served at /)

### 6.2 — Test the Contact Form│   ├── 📁 members/            # Member photos

1. Go to the **Contact page**│   ├── 📁 events/             # Event images (add when ready)

2. Fill in test data:│   ├── 📁 gallery/            # Gallery images (add when ready)

   - **Name:** `Test User`│   ├── ieee-logo.png

   - **Email:** `your-real-email@gmail.com`│   └── ieee-ras-logo.jpg

   - **Phone:** `1234567890`├── .env.example               # Template for environment variables

   - **Message:** `Testing the contact form`├── .env.local                 # 🔒 YOUR REAL KEYS (git-ignored)

3. Click **Submit**├── .gitignore

4. Check your **`CONTACT_RECIPIENT` inbox** (dsagnik36@gmail.com) for the email├── eslint.config.mjs

5. Also check **spam/junk folder** — first emails from Resend may land there├── jsconfig.json

├── next.config.mjs            # Next.js config + security headers

---├── package.json

└── README.md

## 🌍 Step 7: Custom Domain (Optional)```



If you have a custom domain (e.g., `ras-ieee.org`):---



### 7.1 — Add Domain in Vercel## Troubleshooting

1. **Vercel Dashboard** → Your Project → **"Settings"** → **"Domains"**

2. Click **"Add"** → Type your domain → **"Add"**### Build fails on Vercel

- Check if all environment variables are set in Vercel dashboard

### 7.2 — Configure DNS Records- Run `npm run build` locally first to catch errors

Vercel will show you DNS records to add at your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.):- Check Vercel deployment logs for specific error messages



| Type | Name | Value |### Contact form not working

|------|------|-------|1. Verify `RESEND_API_KEY` is set correctly (should start with `re_`)

| **A** | `@` | `76.76.21.21` |2. Check if `CONTACT_RECIPIENT` email is valid

| **CNAME** | `www` | `cname.vercel-dns.com` |3. For Resend free tier: you can only send to verified email addresses

4. If Resend fails, it auto-falls back to EmailJS — make sure EmailJS vars are also set

3. Log in to your **domain registrar** → Go to **DNS Settings** → Add these records

4. Wait **5–30 minutes** for DNS propagation### Images not loading

5. Vercel auto-provisions a free **SSL certificate** (HTTPS) ✅- Put images in the `public/` folder (not inside `app/`)

- Reference them as `/members/filename.jpg` (starting with `/`)

### 7.3 — Update Site URL- Supported formats: `.jpg`, `.jpeg`, `.png`, `.webp`

After the domain is live, update `NEXT_PUBLIC_SITE_URL` in Vercel to:

```### "Unauthorized request origin" error

https://ras-ieee.org- Update `NEXT_PUBLIC_SITE_URL` to match your actual Vercel domain

```- The API validates that requests come from your domain

Then redeploy.

### CSS changes not visible

---- Hard refresh (`Ctrl + Shift + R`)

- Clear Vercel cache: Dashboard → Deployments → Redeploy

## ✏️ Updating Content After Deployment

---

All content is controlled through the `config/` folder. **No need to touch component code.**

## Quick Reference Commands

| What to Update | File to Edit | Then... |

|---------------|-------------|---------|```bash

| Site name, tagline, colors | `config/site.js` | Push to GitHub → auto-deploys |# Install dependencies

| Navigation links | `config/site.js` → `NAV_ITEMS` | Push to GitHub → auto-deploys |npm install

| Footer links & socials | `config/site.js` → `footer`, `socials` | Push to GitHub → auto-deploys |

| Team members | `config/members.js` | Add image to `public/members/` too |# Run locally

| Feature cards | `config/features.js` | Push to GitHub → auto-deploys |npm run dev

| Stat counters | `config/stats.js` | Push to GitHub → auto-deploys |

| About page cards | `config/about.js` | Push to GitHub → auto-deploys |# Build for production (test before deploying)

| Contact recipient email | Vercel → Env Variables → `CONTACT_RECIPIENT` | Redeploy from Vercel |npm run build



### Adding a New Team Member# Start production build locally

1. Add their photo to `public/members/` (e.g., `img_11.jpg`)npm start

2. Edit `config/members.js` — add an entry:

   ```js# Lint code

   { name: "New Member", role: "Their Role", image: "/members/img_11.jpg" },npm run lint

   ``````

3. Push to GitHub:

   ```bash---

   git add .

   git commit -m "Add new team member"## Updating After Deployment

   git push

   ```For any content update:

4. Vercel auto-deploys in ~60 seconds ✨1. Edit the relevant file in `config/`

2. `git add . && git commit -m "Update [what you changed]" && git push`

### Going Live with Events / Gallery Pages3. Vercel auto-deploys on push ✨

The events and gallery pages currently show "Stay Tuned". When you're ready:

For design changes:

1. Add event/gallery data to `config/events.js` or `config/gallery.js`- CSS → `app/globals.css`

2. Add images to `public/events/` or `public/gallery/`- Components → `app/components/`

3. Swap in the live version of the page:- Pages → `app/[page-name]/page.js`

   - Copy `app/events/page.live.js` → `app/events/page.js`
   - Copy `app/gallery/page.live.js` → `app/gallery/page.js`
4. Push to GitHub → auto-deploys

---

## 🔐 Security Checklist

### ✅ What's Already Protected
- [x] API keys stored as server-side environment variables (never exposed to browser)
- [x] `.env.local` is git-ignored (never pushed to GitHub)
- [x] Contact API has **rate limiting** (5 requests/min per IP)
- [x] Contact API has **origin validation** (rejects requests from other domains)
- [x] Contact API has **input sanitization** (strips HTML/scripts, 1000 char limit)
- [x] Security headers on all routes (X-Frame-Options, X-Content-Type, XSS-Protection)
- [x] Error messages don't expose API keys or internal details
- [x] No `console.log` of sensitive data in production

### ⚠️ Rules to Follow
1. **NEVER** put API keys in files that start with `"use client"` — they'll be sent to the browser
2. **NEVER** commit `.env.local` to git
3. **NEVER** prefix secret keys with `NEXT_PUBLIC_` — that exposes them to the browser
4. Only `NEXT_PUBLIC_SITE_URL` uses the `NEXT_PUBLIC_` prefix (it's just the domain, not a secret)
5. If you think a key was leaked → **rotate it immediately**:
   - **Resend:** [resend.com/api-keys](https://resend.com/api-keys) → Delete old → Create new
   - **EmailJS:** [dashboard.emailjs.com](https://dashboard.emailjs.com) → Account → Regenerate

### 🔑 How Variables Work in Next.js

| Prefix | Who Can See It | Use For |
|--------|---------------|---------|
| *(no prefix)* | **Server only** — never reaches the browser | API keys, secrets, passwords |
| `NEXT_PUBLIC_` | **Everyone** — bundled into client JavaScript | Non-secret config (site URL) |

---

## 🛠️ Troubleshooting

| Problem | Solution |
|---------|----------|
| **Build fails on Vercel** | Check all required env vars are set. Run `npm run build` locally to see detailed errors. Check Vercel → Deployments → failed → "View Build Logs" |
| **Contact form says "Failed to send"** | 1. Check `RESEND_API_KEY` starts with `re_` 2. Check `CONTACT_RECIPIENT` is valid 3. On Resend free tier: verify recipient email at resend.com 4. Set EmailJS variables as fallback |
| **"Unauthorized request origin"** | `NEXT_PUBLIC_SITE_URL` doesn't match your domain. Update in Vercel → Env Vars → Redeploy |
| **Images not loading** | Images must be in `public/` folder. Reference with leading `/`: `"/members/img_1.jpeg"` ✅ |
| **Changes not appearing** | Vercel auto-deploys on push. Hard refresh: `Ctrl + Shift + R`. Or: Vercel → Deployments → Redeploy |
| **Emails going to spam** | Normal for `onboarding@resend.dev`. Add to contacts, or add a custom domain in Resend → Domains |

---

## 💻 Local Development Commands

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:3000)
npm run dev

# Test production build locally
npm run build
npm start

# Check for code issues
npm run lint
```

---

## 📊 Quick Reference — All Environment Variables

| # | Variable | Required | Where to Get It | Example Value |
|---|----------|----------|----------------|---------------|
| 1 | `RESEND_API_KEY` | ✅ Yes | [resend.com/api-keys](https://resend.com/api-keys) | `re_AbCdEfGh_123456` |
| 2 | `CONTACT_RECIPIENT` | ✅ Yes | Your choice | `dsagnik36@gmail.com` |
| 3 | `NEXT_PUBLIC_SITE_URL` | ✅ Yes | Your Vercel URL after deploy | `https://your-site.vercel.app` |
| 4 | `EMAILJS_PUBLIC_KEY` | ⚡ Optional | EmailJS → Account → General | `aBcDeFgHiJkLm` |
| 5 | `EMAILJS_SERVICE_ID` | ⚡ Optional | EmailJS → Email Services | `service_abc123` |
| 6 | `EMAILJS_TEMPLATE_ID` | ⚡ Optional | EmailJS → Email Templates | `template_xyz789` |

---

**🎉 That's it! Your IEEE RAS website is live.** Every `git push` to the `main` branch will auto-deploy to Vercel.
