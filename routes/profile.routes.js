const router = require("express").Router();
const mongoose = require("mongoose");

const Profile = require("../models/Profile.model");
const fileUploader = require("../config/cloudinary.config");

router.get("/profile", (req, res, next) => {
  Profile.find()
    .then((foundProfile) => {
      res.status(200).json(foundProfile);
    })
    .catch((error) => {
      next(error);
    });
});

router.post("/upload", fileUploader.single("avatarURL"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }

  res.json({ fileUrl: req.file.path });
});

router.post("/profile", (req, res, next) => {
  Profile.create(req.body)
    .then((createdProfile) => {
      res.status(200).json(createdProfile);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
