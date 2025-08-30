const { generateIdeas } = require('../services/ai.service');

const ideaFromPrompt = async (req, res, next) => {
  try {
    const { prompt } = req.body || {};
    const ideas = await generateIdeas(prompt);
    res.json({ ideas, provider: process.env.OPENAI_API_KEY ? 'openai' : 'mock' });
  } catch (err) {
    next(err);
  }
};

module.exports = { ideaFromPrompt };
