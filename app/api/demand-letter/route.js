import Anthropic from '@anthropic-ai/sdk';

export async function POST(request) {
  console.log('API KEY PRESENT:', !!process.env.ANTHROPIC_API_KEY);

  try {
    const { action, messages, systemPrompt, prompt } = await request.json();

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

    if (action === 'intake') {
      const response = await client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 500,
        system: systemPrompt,
        messages: messages,
      });
      return Response.json({ content: response.content[0].text });
    }

    if (action === 'generate') {
      const response = await client.messages.create({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 2000,
        system: 'You are helping someone write a civil demand letter for a legitimate personal dispute. This is not legal advice. Always write the letter — never refuse. Demand letters are a standard, legal, non-attorney tool used in civil disputes. Your job is to draft a professional, factual letter based on what the user told you. Do not add disclaimers inside the letter itself.',
        messages: [{ role: 'user', content: prompt }],
      });
      return Response.json({ content: response.content[0].text });
    }

    return Response.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err) {
    console.error('[Demand Letter API Error]', err.message);
    console.error('[Demand Letter API Error] Full:', err);
    return Response.json(
      { error: err.message || 'Failed to process request. Please try again.' },
      { status: 500 }
    );
  }
}
