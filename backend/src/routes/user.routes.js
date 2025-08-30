const router = require('express').Router();
const { listUsers, getUser, updateRole } = require('../controllers/user.controller');
const { auth } = require('../middleware/auth.middleware');
const { allowRoles } = require('../middleware/rbac.middleware');

router.use(auth);

// Admin-only user list & role updates
router.get('/', allowRoles('admin'), listUsers);
router.get('/:id', allowRoles('admin'), getUser);
router.patch('/:id/role', allowRoles('admin'), updateRole);

module.exports = router;
