const joi = require("joi");
// const passwordRegex = "/.{8,}/";

exports.signupSchema = joi.object({
  email: joi
    .string()
    .min(6)
    .max(60)
    .required()
    .email({
      tlds: { allow: ["com", "net"] },
    }),

  password: joi
    .string()
    .required()
    .pattern(/.{4,20}/),
});

exports.signinSchema = joi.object({
  email: joi
    .string()
    .min(6)
    .max(60)
    .required()
    .email({
      tlds: { allow: ["com", "net"] },
    }),

  password: joi
    .string()
    .required()
    .pattern(/.{4,20}/),
});

exports.acceptCodeSchema = joi.object({
  email: joi
    .string()
    .min(6)
    .max(60)
    .required()
    .email({
      tlds: { allow: ["com", "net"] },
    }),

  providedCode: joi.number(),
});

exports.changePasswordSchema = joi.object({
  newPassword: joi
    .string()
    .required()
    .pattern(/.{4,20}/),
  oldPassword: joi
    .string()
    .required()
    .pattern(/.{4,20}/),
});

exports.acceptFPCodeSchema = joi.object({
  email: joi
    .string()
    .min(6)
    .max(60)
    .required()
    .email({
      tlds: { allow: ["com", "net"] },
    }),
  newPassword: joi
    .string()
    .required()
    .pattern(/.{4,20}/),
  providedCode: joi.string().required(),
});

exports.createPostSchema = joi.object({
  title: joi.string().min(6).max(60).required(),
  description: joi.string().min(6).max(600).required(),
  userId: joi.string().required(),
});
