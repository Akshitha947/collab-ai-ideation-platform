const router = require('express').Router();
const { auth } = require('../middleware/auth.middleware');
const { createProject, listProjects, getProject, updateProject, deleteProject } = require('../controllers/project.controller');
const { createProjectSchema, updateProjectSchema } = require('../utils/validators');

router.use(auth);

router.get('/', listProjects);
router.post('/', (req, res, next) => {
  try {
    req.body = createProjectSchema.parse(req.body);
    next();
  } catch (err) { next(err); }
}, createProject);

router.get('/:id', getProject);
router.patch('/:id', (req, res, next) => {
  try {
    req.body = updateProjectSchema.parse(req.body);
    next();
  } catch (err) { next(err); }
}, updateProject);

router.delete('/:id', deleteProject);

module.exports = router;
