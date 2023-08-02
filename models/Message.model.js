const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const { isEmail } = require("validator");

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

const messageSchema = new Schema(
  {
    name: { type: String, required: true },
    email: emailSchema(),
    message: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = model("Message", messageSchema);
