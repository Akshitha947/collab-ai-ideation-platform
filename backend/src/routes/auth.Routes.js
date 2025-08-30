const router = require('express').Router();
const { register, login, refresh, me } = require('../controllers/auth.Controller.js');
const { auth } = require('../middleware/auth.middleware');

router.post('/register', register);
router.post('/login', login);
router.post('/refresh', refresh);
router.get('/me', auth, me);

module.exports = router;
