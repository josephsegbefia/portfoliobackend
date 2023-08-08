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

const profileSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  headLine: { type: String, required: true },
  email: urlSchema(),
  phone: { type: String, required: true },
  avatarURL: urlSchema(),
  skills: [String],
  linkedInURL: urlSchema(),
  gitHubURL: urlSchema()
});

module.exports = model("Profile", profileSchema);
