const OpenAI = require('openai');

const hasKey = !!process.env.OPENAI_API_KEY;

let client = null;
if (hasKey) {
  client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

/**
 * Generate ideas from a prompt.
 * If OPENAI_API_KEY is set, uses OpenAI.
 * Otherwise returns a deterministic mock (so the API never errors).
 */
async function generateIdeas(promptText) {
  const safePrompt = (promptText || '').toString().trim();
  if (!safePrompt) {
    return [
      'Clarify the problem statement and target users.',
      'Break the project into milestones and define deliverables.',
      'Create a prototype flow and identify key risks.'
    ];
  }

  if (!hasKey) {
    // Simple mock: split keywords and emit structured suggestions
    const keywords = Array.from(new Set(safePrompt.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean)));
    const base = [
      `User stories around: ${keywords.slice(0, 3).join(', ')}`,
      `Feature bucket ideas focused on ${keywords.slice(3, 6).join(', ') || 'MVP features'}`,
      `Risk & mitigation plan referencing ${keywords.slice(6, 9).join(', ') || 'performance, security, UX'}`
    ];
    return base;
  }

  // Real call (uses the Responses API which is stable in openai ^4.x)
  const response = await client.responses.create({
    model: 'gpt-4o-mini',
    input: `Generate 6 concise product ideas / suggestions based on the prompt. Bullet points only.
Prompt: ${safePrompt}`
  });

  const text = response.output_text || '';
  const ideas = text
    .split('\n')
    .map(s => s.replace(/^\s*[-•\d.]+\s*/, '').trim())
    .filter(Boolean);
  return ideas.length ? ideas : [text.trim()].filter(Boolean);
}

module.exports = { generateIdeas };
