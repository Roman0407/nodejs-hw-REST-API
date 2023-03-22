const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const emailPattern =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = new Schema({
  password: {
    type: String,
    required: [true, "Set password for user"],
    minlength: 6,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: emailPattern,
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: "",
  },
  avatarURL: {
    type: String,
    required: true,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
});

const authSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailPattern).required(),
  subscription: Joi.string(),
});

const updateSubscrition = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

const verifySchema = Joi.object({
  email: Joi.string()
    .required()
    .messages({ "any.required": `"email" is a required field` }),
});

userSchema.post("save", handleMongooseError);

const schemas = {
  authSchema,
  updateSubscrition,
  verifySchema,
};

const User = model("user", userSchema);

module.exports = {
  User,
  schemas,
};