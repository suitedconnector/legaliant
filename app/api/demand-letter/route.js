import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

export async function POST(request) {
  try {
    const { action, messages, systemPrompt, prompt } = await request.json();

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
        messages: [{ role: 'user', content: prompt }],
      });
      return Response.json({ content: response.content[0].text });
    }

    return Response.json({ error: 'Invalid action' }, { status: 400 });
  } catch (err) {
    console.error('[Demand Letter API Error]', err);
    return Response.json(
      { error: 'Failed to process request. Please try again.' },
      { status: 500 }
    );
  }
}
