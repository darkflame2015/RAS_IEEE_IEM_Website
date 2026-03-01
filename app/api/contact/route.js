import nodemailer from "nodemailer";

export async function POST(request) {
    try {
        const body = await request.json();
        const { name, email, phone, reason } = body;

        // Validate required fields
        if (!name || !email || !phone || !reason) {
            return Response.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        // Create transporter — uses SMTP directly (no third-party mail service)
        // Configure via environment variables
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST || "smtp.gmail.com",
            port: parseInt(process.env.SMTP_PORT || "587"),
            secure: false,
            auth: {
                user: process.env.SMTP_USER || "",
                pass: process.env.SMTP_PASS || "",
            },
        });

        // Email content
        const mailOptions = {
            from: process.env.SMTP_USER || "noreply@ieee-ras.com",
            to: "dsagnik36@gmail.com",
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
        };

        await transporter.sendMail(mailOptions);

        return Response.json(
            { message: "Email sent successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Email sending failed:", error);
        return Response.json(
            { error: "Failed to send email. Please check SMTP configuration." },
            { status: 500 }
        );
    }
}
