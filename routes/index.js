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
    getCurrentUserController
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

module.exports = router;
