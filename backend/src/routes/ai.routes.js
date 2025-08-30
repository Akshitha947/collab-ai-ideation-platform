const router = require('express').Router();
const { auth } = require('../middleware/auth.middleware');
const { ideaFromPrompt } = require('../controllers/ai.controller');

router.use(auth);
router.post('/ideas', ideaFromPrompt);

module.exports = router;
