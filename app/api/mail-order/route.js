import { Resend } from 'resend';

export async function POST(request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { tier, letter, recipientAddress, senderName, senderEmail } = await request.json();

    const tierLabel = tier === 'urgent' ? 'Same Day ($29.88)' : 'Standard 2-Day ($19.88)';

    await resend.emails.send({
      from: 'orders@legaliant.com',
      to: process.env.NOTIFICATION_EMAIL,
      subject: `New Mailing Order — ${tierLabel}`,
      html: `
        <h2>New Demand Letter Mailing Order</h2>
        <p><strong>Tier:</strong> ${tierLabel}</p>
        <p><strong>Sender:</strong> ${senderName} (${senderEmail})</p>
        <p><strong>Recipient Address:</strong> ${recipientAddress}</p>
        <hr/>
        <h3>Letter Content:</h3>
        <pre style="white-space:pre-wrap">${letter}</pre>
      `,
    });

    await resend.emails.send({
      from: 'orders@legaliant.com',
      to: senderEmail,
      subject: 'Your Demand Letter Order — Legaliant',
      html: `
        <h2>We received your order.</h2>
        <p>Your demand letter will be printed and mailed via USPS Certified Mail
           with Return Receipt (${tierLabel}).</p>
        <p>You'll receive a tracking number by email once it ships.</p>
        <br/>
        <p>— The Legaliant Team</p>
        <p style="font-size:12px;color:#999">
          Legaliant is a brand of Vertex Ventures LLC. This is not attorney service.
        </p>
      `,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error('[Mail Order Error]', err);
    return Response.json(
      { error: 'Failed to process order. Please try again.' },
      { status: 500 }
    );
  }
}
