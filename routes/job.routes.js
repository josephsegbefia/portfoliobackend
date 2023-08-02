const router = require("express").Router();
const mongoose = require("mongoose");

const Job = require("../models/Job.model");

// Creat a new JOB
router.post("/jobs", (req, res, next) => {
  const {
    employerName,
    employerLogo,
    employerWebsite,
    employerCompanyType,
    jonPublisher,
    jobId,
    jobApplyLink,
    jonDescription,
    jobCity,
    jobCountry,
    jobOfferExpirationDateTime,
    dateApplied,
    status
  } = req.body;

  Job.create({
    employerName,
    employerLogo,
    employerWebsite,
    employerCompanyType,
    jonPublisher,
    jobId,
    jobApplyLink,
    jonDescription,
    jobCity,
    jobCountry,
    jobOfferExpirationDateTime,
    dateApplied,
    status
  })
    .then((response) => res.json(response))
    .catch((error) => res.json(error));
});

router.get("/jobs", (req, res, next) => {
  Job.find()
    .then((allJobs) => {
      res.json(allJobs);
    })
    .catch((error) => res.json(error));
});

router.get("/jobs/:jobId", (req, res, next) => {
  const { jobId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Job.findById(jobId)
    .then((job) => {
      res.status(200).json(job);
    })
    .catch((err) => res.json(err));
});

router.put("/jobs/:jobId", (req, res, next) => {
  const { jobId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Job.findByIdAndUpdate(jobId, req.body, { new: true })
    .then((updatedJob) => {
      res.json(updatedJob);
    })
    .catch((err) => res.json(err));
});

router.delete("/jobs/:jobId", (req, res, next) => {
  const { jobId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Job.findByIdAndRemove(jobId)
    .then(() =>
      res.json({ message: `Job with ${jobId} has been removed sucessfully` })
    )
    .catch((err) => res.json(err));
});
module.exports = router;
