// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend with your environment variable
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    // 1. Validation Check
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 2. Dispatch to Resend Engine
    const data = await resend.emails.send({
      from: "Degvora Portal <contact@degvora.com>", 
      to: ['contact@degvora.com'],
      replyTo: email,
      subject: `[Degvora Contact] ${subject}`,
      html:  `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2>New Message from ${name}</h2>
          <p><strong>Email:</strong> ${email}</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    console.log(data);


    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    console.error("Resend API Error Fault:", error);
    return NextResponse.json({ error: error.message || "Failed to send email" }, { status: 500 });
  }
}