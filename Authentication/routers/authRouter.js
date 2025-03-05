const express = require("express");
const authController = require("../controllers/authControllers.js");
const { identifier } = require("../middlewares/identification.js");

const router = express.Router();

router.post("/signup", authController.signup);
router.post("/signin", authController.signin);
router.post("/signout", identifier, authController.signout);
router.patch(
  "/send-verification-code",
  identifier,
  authController.sendVerificationCode
);
router.patch(
  "/verify-verification-code",
  identifier,
  authController.verifyVerificationCode
);

router.patch("/change-password", identifier, authController.changePassword);
router.patch(
  "/send-forget-password-code",
  authController.sendForgetPasswordCode
);
router.patch(
  "/verify-forget-password-code",
  authController.verifyForgetPasswordCode
);

module.exports = router;
