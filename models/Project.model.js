const mongoose = require("mongoose");
const { Schema, model } = mongoose;
const { isURL } = require(validator);

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

const projectSchema = new Schema(
  {
    projectName: { type: String, required: true },
    description: { type: String, required: true },
    techs: { type: [String], required: true },
    imageUrl: urlSchema()
  },
  {
    timestamps: true
  }
);

module.exports = model("Project", projectSchema);
