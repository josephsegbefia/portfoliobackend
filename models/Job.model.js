const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { isURL } = require("validator");

function urlSchema(opts = {}) {
  const { required } = opts;
  return {
    type: String,
    required: !!required,
    validate: {
      validator: isURL,
      message: (props) => `$(props.value) is not a valid URL`
    }
  };
}
const jobSchema = new Schema(
  {
    employerName: { type: String, required: true },
    employerLogo: { type: String },
    employerWebsite: urlSchema(),
    employerCompanyType: { type: String },
    jobPublisher: { type: String },
    jobId: { type: String },
    jobTitle: { type: String },
    jobApplyLink: urlSchema(),
    jobDescription: { type: String },
    jobCity: { type: String },
    jobCountry: { types: String },
    jobOfferExpirationDateTime: { type: String },
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
