const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");


router.post("/register", userCtrl.register);
router.post("/login", userCtrl.login);
router.get("/profile/:id", auth, userCtrl.getProfile);
router.put("/profile/:id", auth, multer, userCtrl.updateProfile);
router.delete("/profile/:id", auth, userCtrl.deleteProfile);
router.get("/list", auth, userCtrl.getProfileList);

module.exports = router;