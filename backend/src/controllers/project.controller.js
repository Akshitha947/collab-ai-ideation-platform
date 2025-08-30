const Project = require('../models/Project');

const createProject = async (req, res, next) => {
  try {
    const { name, description = '', members = [] } = req.body || {};
    const project = await Project.create({
      name,
      description,
      owner: req.user._id,
      members: Array.from(new Set([req.user._id, ...members]))
    });
    res.status(201).json({ project });
  } catch (err) {
    next(err);
  }
};

const listProjects = async (req, res, next) => {
  try {
    const projects = await Project
      .find({ $or: [{ owner: req.user._id }, { members: req.user._id }] })
      .populate('owner', 'name email')
      .populate('members', 'name email')
      .sort('-createdAt');

    res.json({ projects });
  } catch (err) {
    next(err);
  }
};

const getProject = async (req, res, next) => {
  try {
    const project = await Project
      .findById(req.params.id)
      .populate('owner', 'name email')
      .populate('members', 'name email');

    if (!project) return res.status(404).json({ message: 'Project not found' });

    // only owner or member can view
    const isMember = project.owner._id.equals(req.user._id) || project.members.some(m => m._id.equals(req.user._id));
    if (!isMember) return res.status(403).json({ message: 'Forbidden' });

    res.json({ project });
  } catch (err) {
    next(err);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    if (!project.owner.equals(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only owner/admin can update' });
    }

    const { name, description, members } = req.body || {};
    if (name !== undefined) project.name = name;
    if (description !== undefined) project.description = description;
    if (Array.isArray(members)) project.members = members;

    await project.save();
    const populated = await Project.findById(project._id)
      .populate('owner', 'name email')
      .populate('members', 'name email');

    res.json({ project: populated });
  } catch (err) {
    next(err);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    if (!project.owner.equals(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Only owner/admin can delete' });
    }
    await project.deleteOne();
    res.json({ message: 'Project deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { createProject, listProjects, getProject, updateProject, deleteProject };
