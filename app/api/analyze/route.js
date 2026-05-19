import Anthropic from '@anthropic-ai/sdk';
import { Resend } from 'resend';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function buildPrompt(formData) {
  const {
    annualSalary, yearsEmployed, terminationDate, currentlyEmployed, newSalary,
    claimTypes = [], discriminationSubTypes = [],
    documentedEvidence, hrComplaintsFiled, witnesses, signedSeverance, daysSinceTermination,
    name, situationDescription,
  } = formData;

  const salary = parseFloat(String(annualSalary).replace(/,/g, '')) || 0;
  const years = parseFloat(yearsEmployed) || 0;
  const days = parseFloat(daysSinceTermination) || 0;

  const claimsList = claimTypes.join(', ') || 'Not specified';
  const discSubs = discriminationSubTypes.length > 0 ? discriminationSubTypes.join(', ') : 'N/A';
  const reemployedStr = currentlyEmployed === 'yes'
    ? `Yes — new salary $${newSalary || 'unknown'}/year`
    : 'No — currently unemployed';

  return `You are an expert California employment attorney providing a detailed wrongful termination case analysis. Analyze this case and respond ONLY with a valid JSON object — no markdown, no explanatory text, just raw JSON.

CASE DETAILS:
- Claimant: ${name}
- Annual Salary at Termination: $${salary.toLocaleString()}
- Years Employed: ${years}
- Termination Date: ${terminationDate}
- Days Since Termination: ${days}
- Currently Reemployed: ${reemployedStr}
- Claim Types: ${claimsList}
- Discrimination Sub-types (if applicable): ${discSubs}
- Has Documented Evidence: ${documentedEvidence}
- Filed HR Complaints: ${hrComplaintsFiled}
- Has Witnesses: ${witnesses}
- Signed Severance Agreement: ${signedSeverance}
- Situation Description: ${situationDescription || 'Not provided'}

JURISDICTION: California (FEHA, Labor Code, CFRA, etc. apply — no damages cap on discrimination claims)

Respond with this exact JSON structure:
{
  "summary": "2-3 sentence executive summary of this specific case and its viability",
  "caseStrength": "Weak|Moderate|Strong|Very Strong",
  "caseStrengthScore": <integer 1-10>,
  "caseStrengthRationale": "1-2 sentences explaining the score",
  "settlementRange": {
    "low": <integer dollars>,
    "mid": <integer dollars>,
    "high": <integer dollars>
  },
  "damageCategories": [
    {
      "category": "Back Pay",
      "description": "Lost wages from termination to settlement",
      "estimatedRange": "$X – $Y",
      "notes": "Brief calculation basis"
    },
    {
      "category": "Front Pay",
      "description": "Future lost earnings",
      "estimatedRange": "$X – $Y",
      "notes": "Brief basis"
    },
    {
      "category": "Emotional Distress",
      "description": "Non-economic damages for psychological harm",
      "estimatedRange": "$X – $Y",
      "notes": "Brief basis"
    },
    {
      "category": "Punitive Damages",
      "description": "Punishment for willful/malicious conduct",
      "estimatedRange": "$X – $Y or N/A",
      "notes": "Brief basis or why not applicable"
    },
    {
      "category": "Attorney Fees",
      "description": "Fee-shifting under FEHA if prevailing party",
      "estimatedRange": "$X – $Y or N/A",
      "notes": "Brief basis"
    }
  ],
  "keyFactors": [
    {
      "factor": "Factor name",
      "impact": "positive|negative|neutral",
      "description": "How this affects case value or viability"
    }
  ],
  "nextSteps": [
    "Specific, actionable next step 1",
    "Specific, actionable next step 2",
    "Specific, actionable next step 3",
    "Specific, actionable next step 4"
  ],
  "urgencyNote": "Any statute of limitations or time-sensitive action required",
  "strongestClaims": ["Claim 1", "Claim 2"],
  "disclaimer": "This analysis is for informational purposes only and does not constitute legal advice. Results are estimates only. Consult a licensed California employment attorney."
}`;
}

function generateEmailTemplate(analysis, formData) {
  const firstName = (formData.name || '').split(' ')[0] || 'there';
  const settlementRange = analysis.settlementRange || {};

  return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Case Analysis</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a2744; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #1a2744, #243358); padding: 30px; border-radius: 12px 12px 0 0; text-align: center; }
        .header h1 { color: white; margin: 0; font-size: 28px; }
        .header p { color: #c9a84c; margin: 10px 0 0 0; }
        .content { background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; }
        .settlement-range { background: #1a2744; padding: 25px; border-radius: 8px; margin: 20px 0; text-align: center; }
        .range-item { display: inline-block; margin: 0 15px; }
        .range-label { color: #c9a84c; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
        .range-value { color: white; font-size: 24px; font-weight: bold; display: block; margin-top: 5px; }
        .section { margin: 25px 0; }
        .section h3 { color: #1a2744; border-bottom: 2px solid #c9a84c; padding-bottom: 8px; }
        .next-steps { background: #f8fafc; padding: 20px; border-radius: 8px; }
        .next-step { display: flex; align-items: flex-start; margin: 10px 0; }
        .step-number { background: #1a2744; color: #c9a84c; width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 12px; flex-shrink: 0; }
        .cta { background: linear-gradient(135deg, #c9a84c, #d4b96a); color: #1a2744; padding: 15px 25px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin: 20px 0; }
        .footer { text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Your Case Analysis</h1>
            <p>California Wrongful Termination Calculator</p>
        </div>
        <div class="content">
            <p>Hi ${firstName},</p>
            <p>Thank you for using the Legaliant calculator. Here's your personalized case analysis:</p>
            <div class="section">
                <h3>Case Summary</h3>
                <p>${analysis.summary}</p>
            </div>
            <div class="settlement-range">
                <div class="range-item">
                    <span class="range-label">Conservative</span>
                    <span class="range-value">$${(settlementRange.low || 0).toLocaleString()}</span>
                </div>
                <div class="range-item">
                    <span class="range-label">Likely Range</span>
                    <span class="range-value">$${(settlementRange.mid || 0).toLocaleString()}</span>
                </div>
                <div class="range-item">
                    <span class="range-label">Maximum</span>
                    <span class="range-value">$${(settlementRange.high || 0).toLocaleString()}</span>
                </div>
            </div>
            <div class="section">
                <h3>Recommended Next Steps</h3>
                <div class="next-steps">
                    ${(analysis.nextSteps || []).map((step, i) => `
                        <div class="next-step">
                            <div class="step-number">${i + 1}</div>
                            <div>${step}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div style="text-align: center;">
                <a href="tel:+18005551234" class="cta">Speak With an Attorney</a>
                <p style="color: #6b7280; font-size: 14px;">Free consultation · No obligation</p>
            </div>
            <div class="footer">
                <p><strong>© 2026 Vertex Ventures LLC. All rights reserved.</strong></p>
                <p>This analysis is for informational purposes only and does not constitute legal advice.</p>
            </div>
        </div>
    </div>
</body>
</html>`;
}

export async function POST(request) {
  try {
    const formData = await request.json();

    // Route lead to webhook if configured
    const leadPayload = {
      timestamp: new Date().toISOString(),
      source: 'legaliant-calculator',
      lead: {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        annualSalary: formData.annualSalary,
        yearsEmployed: formData.yearsEmployed,
        terminationDate: formData.terminationDate,
        claimTypes: formData.claimTypes,
        caseDescription: formData.situationDescription,
        tcpaConsent: formData.tcpaConsent,
      },
    };

    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(leadPayload),
        });
      } catch (webhookErr) {
        console.error('[Webhook] Failed to send lead:', webhookErr.message);
      }
    }

    const message = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 2048,
      system: 'You are an expert California employment attorney. Respond ONLY with valid JSON — no markdown code fences, no explanation text. Just the raw JSON object.',
      messages: [{ role: 'user', content: buildPrompt(formData) }],
    });

    const rawText = message.content[0].text.trim();
    const cleaned = rawText
      .replace(/^```(?:json)?\s*/i, '')
      .replace(/\s*```$/, '')
      .trim();

    let analysis;
    try {
      analysis = JSON.parse(cleaned);
    } catch {
      analysis = { rawText: cleaned, parseError: true };
    }

    if (resend && formData.email) {
      try {
        await resend.emails.send({
          from: `${process.env.FROM_NAME || 'Legaliant'} <${process.env.FROM_EMAIL}>`,
          to: [formData.email],
          subject: 'Your California Wrongful Termination Case Analysis',
          html: generateEmailTemplate(analysis, formData),
        });
      } catch (emailErr) {
        console.error('[Email] Failed to send results:', emailErr.message);
      }
    }

    return Response.json({ analysis });
  } catch (err) {
    console.error('[API Error]', err);
    return Response.json(
      { error: 'Failed to generate analysis. Please try again.' },
      { status: 500 }
    );
  }
}
