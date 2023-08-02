const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const jobSchema = new Schema(
  {
    employerName: { type: String, required: true },
    employerLogo: { type: String },
    employerWebsite: urlSchema(),
    employerCompanyType: { type: String },
    jobPublisher: { type: String },
    jobId: { type: String },
    jobTitle: { type: String },
    jobApplyLink: { type: String },
    jobDescription: { type: String },
    jobCity: { type: String },
    jobCountry: { types: String },
    jobOfferExpirationDateTime: { type: Date },
    dateApplied: { type: Date, default: Date.now() },
    status: {
      type: String,
      index: true,
      default: "APPLIED",
      enum: ["APPLIED", "FIRST CONTACT", "INTERVIEWING", "REJECTED", "LANDED"]
    }
  },
  { timestamps: true }
);

module.exports = model("Job", jobSchema);
