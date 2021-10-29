const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const commentCtrl = require("../controllers/comment");

router.post("/:id/comment", commentCtrl.createComment);
router.delete("/:id/comment/:id", auth, commentCtrl.deleteComment);

module.exports = router;

