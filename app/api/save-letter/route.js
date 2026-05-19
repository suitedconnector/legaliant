import { Resend } from 'resend';

export async function POST(request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { email, letter, disputeType } = await request.json();

    await resend.emails.send({
      from: 'letters@legaliant.com',
      to: email,
      subject: 'Your Demand Letter — Legaliant',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #1a2744; padding: 24px; border-radius: 8px 8px 0 0;">
            <h1 style="color: #c9a84c; margin: 0; font-size: 20px;">
              Your Demand Letter is Ready
            </h1>
          </div>
          <div style="background: #f9f9f9; padding: 24px; border-radius: 0 0 8px 8px;">
            <p style="color: #333; margin-top: 0;">
              Here's a copy of your demand letter for safekeeping.
              You can reply to this email with any questions.
            </p>
            <div style="background: white; border: 1px solid #ddd;
                        border-radius: 6px; padding: 24px; margin: 16px 0;">
              <pre style="white-space: pre-wrap; word-wrap: break-word;
                          font-family: 'Times New Roman', Times, serif;
                          font-size: 13px; line-height: 1.6; color: #111;
                          margin: 0;">${letter}</pre>
            </div>
            <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;" />
            <div style="background: #1a2744; border-radius: 8px;
                        padding: 20px; text-align: center;">
              <p style="color: #cbd5f0; margin: 0 0 12px 0; font-size: 14px;">
                Want us to print and mail this via USPS Certified Mail?
              </p>
              <a href="https://legaliant.com/demand-letter/chat"
                 style="background: #c9a84c; color: #1a2744; padding: 12px 24px;
                        border-radius: 6px; text-decoration: none;
                        font-weight: bold; font-size: 14px;">
                Mail My Letter — $19.88
              </a>
            </div>
            <p style="color: #999; font-size: 11px; margin: 20px 0 0 0;
                      text-align: center;">
              Legaliant is a brand of Vertex Ventures LLC.
              We are not a law firm and do not provide legal advice.
            </p>
          </div>
        </div>
      `,
    });

    await resend.emails.send({
      from: 'leads@legaliant.com',
      to: process.env.NOTIFICATION_EMAIL,
      subject: `New Lead — ${disputeType} — ${email}`,
      html: `
        <h2>New Demand Letter Lead</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Dispute Type:</strong> ${disputeType}</p>
        <p><strong>Status:</strong> Letter generated, not yet mailed</p>
        <hr/>
        <h3>Letter:</h3>
        <pre style="white-space:pre-wrap; font-size:12px;">${letter}</pre>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('[Save Letter Error]', error);
    return Response.json({ error: 'Failed to send email' }, { status: 500 });
  }
}
