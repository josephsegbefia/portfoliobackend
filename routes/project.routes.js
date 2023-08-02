const router = require("express").Router();
const mongoose = require("mongoose");

const Project = require("../models/Project.model");

// POST Create a new project
router.post("/projects", (req, res, next) => {
  const { projectName, description, techs } = req.body;

  Project.create({ projectName, description, techs })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

router.get("/projects", (req, res, next) => {
  Project.find()
    .then((allProjects) => {
      res.json(allProjects);
    })
    .catch((error) => res.json(err));
});

router.get("/projects/:projectId", (req, res, next) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Project.findById(projectId)
    .then((project) => {
      res.status(200).json(project);
    })
    .catch((err) => res.json(err));
});

router.put("/projects/:projectId", (req, res, next) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Project.findByIdAndUpdate(projectId, req.body, { new: true })
    .then((updatedProject) => res.json(updatedProject))
    .catch((err) => res.json(err));
});

router.delete("/projects/:projectId", (req, res, next) => {
  const { projectId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(projectId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Project.findByIdAndRemove(projectId)
    .then(() =>
      res.json({ message: `Project with ${projectId} is removed successfully` })
    )
    .catch((err) => res.json(err));
});
module.exports = router;
