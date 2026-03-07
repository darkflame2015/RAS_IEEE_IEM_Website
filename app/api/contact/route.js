import { Resend } from "resend";
import { headers } from "next/headers";

const resend = new Resend(process.env.RESEND_API_KEY);

// ─── Simple in-memory rate limiter (per serverless invocation lifetime) ───
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5; // max 5 per minute per IP

function isRateLimited(ip) {
    const now = Date.now();
    const entry = rateLimitMap.get(ip);

    if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW) {
        rateLimitMap.set(ip, { windowStart: now, count: 1 });
        return false;
    }

    entry.count += 1;
    if (entry.count > MAX_REQUESTS) return true;
    return false;
}

// ─── Input sanitization ───
function sanitize(str) {
    if (typeof str !== "string") return "";
    return str
        .trim()
        .slice(0, 1000) // max length
        .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "") // strip script tags
        .replace(/<[^>]+>/g, "") // strip all HTML tags
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

function isValidPhone(phone) {
    return /^[\d\s\-+().]{6,20}$/.test(phone);
}

// EmailJS fallback — sends via EmailJS REST API if Resend fails
async function sendViaEmailJS({ name, email, phone, reason }) {
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            service_id: process.env.EMAILJS_SERVICE_ID,
            template_id: process.env.EMAILJS_TEMPLATE_ID,
            user_id: process.env.EMAILJS_PUBLIC_KEY,
            template_params: {
                from_name: name,
                from_email: email,
                phone: phone,
                message: reason,
                to_email: process.env.CONTACT_RECIPIENT || "dsagnik36@gmail.com",
            },
        }),
    });

    if (!response.ok) {
        throw new Error("EmailJS delivery failed");
    }

    return { success: true };
}

export async function POST(request) {
    try {
        // ── Rate limiting by IP ──
        const headersList = await headers();
        const forwarded = headersList.get("x-forwarded-for");
        const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";

        if (isRateLimited(ip)) {
            return Response.json(
                { error: "Too many requests. Please try again later." },
                { status: 429 }
            );
        }

        // ── Origin validation (only allow same-origin requests) ──
        const origin = headersList.get("origin");
        const host = headersList.get("host");
        const allowedOrigins = [
            `https://${host}`,
            `http://${host}`,
            // Add your production domain here after deployment
            process.env.NEXT_PUBLIC_SITE_URL,
        ].filter(Boolean);

        if (origin && !allowedOrigins.includes(origin)) {
            return Response.json(
                { error: "Unauthorized request origin." },
                { status: 403 }
            );
        }

        const body = await request.json();
        const name = sanitize(body.name);
        const email = sanitize(body.email);
        const phone = sanitize(body.phone);
        const reason = sanitize(body.reason);

        // Validate required fields
        if (!name || !email || !phone || !reason) {
            return Response.json(
                { error: "All fields are required." },
                { status: 400 }
            );
        }

        if (!isValidEmail(email)) {
            return Response.json(
                { error: "Please provide a valid email address." },
                { status: 400 }
            );
        }

        if (!isValidPhone(phone)) {
            return Response.json(
                { error: "Please provide a valid phone number." },
                { status: 400 }
            );
        }

        const recipientEmail = process.env.CONTACT_RECIPIENT || "dsagnik36@gmail.com";

        // ── Primary: Try Resend ──
        try {
            const { data, error } = await resend.emails.send({
                from: "onboarding@resend.dev",
                to: recipientEmail,
                subject: `IEEE RAS — New Inquiry from ${name}`,
                html: `
                    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 30px; background: #faf7f4; border: 3px solid #1a1a1a; border-radius: 16px;">
                        <h1 style="color: #800f2f; font-size: 24px; margin-bottom: 24px; border-bottom: 2px solid #590d22; padding-bottom: 12px;">New Membership Inquiry — IEEE RAS</h1>
                        
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 12px 0; color: #5a5a5a; font-weight: 600; width: 140px; vertical-align: top;">Name</td>
                                <td style="padding: 12px 0; color: #1a1a1a;">${name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 12px 0; color: #5a5a5a; font-weight: 600; vertical-align: top;">Email</td>
                                <td style="padding: 12px 0; color: #1a1a1a;"><a href="mailto:${email}" style="color: #800f2f;">${email}</a></td>
                            </tr>
                            <tr>
                                <td style="padding: 12px 0; color: #5a5a5a; font-weight: 600; vertical-align: top;">Phone</td>
                                <td style="padding: 12px 0; color: #1a1a1a;">${phone}</td>
                            </tr>
                            <tr>
                                <td style="padding: 12px 0; color: #5a5a5a; font-weight: 600; vertical-align: top;">Why Join?</td>
                                <td style="padding: 12px 0; color: #1a1a1a; line-height: 1.6;">${reason.replace(/\n/g, "<br>")}</td>
                            </tr>
                        </table>
                        
                        <p style="margin-top: 32px; padding-top: 16px; border-top: 1px solid rgba(89, 13, 34, 0.1); color: #999; font-size: 12px;">
                            Sent from the IEEE RAS Student Chapter website contact form.
                        </p>
                    </div>
                `,
                text: `New IEEE RAS Inquiry\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nWhy Join: ${reason}`,
            });

            if (!error) {
                return Response.json(
                    { message: "Your message has been sent successfully!" },
                    { status: 200 }
                );
            }

            // Resend returned an error — fall through to EmailJS silently
        } catch {
            // Resend threw — fall through to EmailJS silently
        }

        // ── Fallback: Try EmailJS ──
        try {
            await sendViaEmailJS({ name, email, phone, reason });
            return Response.json(
                { message: "Your message has been sent successfully!" },
                { status: 200 }
            );
        } catch {
            // EmailJS also failed — handled below
        }

        // Both failed
        return Response.json(
            { error: "Failed to send your message. Please try again later." },
            { status: 500 }
        );
    } catch {
        return Response.json(
            { error: "Something went wrong. Please try again later." },
            { status: 500 }
        );
    }
}
