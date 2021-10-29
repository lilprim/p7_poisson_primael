const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const likeCtrl = require("../controllers/like");


router.post("/:id/like", auth, likeCtrl.addLike);
//router.get("/:id/like", auth, likeCtrl.listLikes);
router.delete("/:id/like", likeCtrl.deleteLike);

module.exports = router;