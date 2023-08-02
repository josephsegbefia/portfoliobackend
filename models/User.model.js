const { Schema, model } = require("mongoose");
const { isEmail, isURL } = require("validator");

function emailSchema(opts = {}) {
  const { required } = opts;
  return {
    type: String,
    required: !!required,
    validate: {
      validator: isEmail,
      message: (props) => `${props.value} is not a valid email address`
    }
  };
}

function urlSchema(opts = {}) {
  const { required } = opts;
  return {
    type: String,
    required: !!required,
    validate: {
      validator: isURL,
      message: (props) => `${props.value} is not a valid URL`
    }
  };
}

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema({
  fullName: { type: String },
  email: emailSchema(),
  headLine: { type: String },
  phone: { type: String },
  about: { type: String, required: true },
  avatarUrl: urlSchema(),
  skills: { type: [String] },
  linkedInUrl: urlSchema(),
  gitHubUrl: urlSchema(),
  jobsApplied: [{ type: Schema.Types.ObjectId, ref: "Job" }],
  projects: [{ type: Schema.Types.ObjectId, ref: "Project" }]
});

const User = model("User", userSchema);

module.exports = User;
