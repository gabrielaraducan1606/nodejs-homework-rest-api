const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { updateAvatarController } = require("../controllers/index");
const multer = require("multer");

const {
  getUsersController,
  createUserController,
  loginUserController,
  getContactsController,
  logoutUserController,
  addContactController,
  getCurrentUserController,
  verifyEmailController,
  resendVerificationEmailController,
} = require("../controllers/index");

router.get("/account", getUsersController);
router.post("/account/register", createUserController);
router.post("/account/login", loginUserController);
router.patch("/account/logout", auth, logoutUserController);
router.get("/account/current", auth, getCurrentUserController);

router.get("/contacts", auth, getContactsController);
router.post("/contacts", auth, addContactController);

const upload = multer({ dest: "tmp/" });
router.patch("/users/avatars", auth, upload.single("avatar"), updateAvatarController);

// Endpoint pentru verificarea e-mailului
router.get("/users/verify/:verificationToken", verifyEmailController);
// Endpoint pentru retrimiterea e-mailului de verificare
router.post("/users/verify", resendVerificationEmailController);

module.exports = router;
