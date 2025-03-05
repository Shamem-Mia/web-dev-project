const express = require("express");
const postsControllers = require("../controllers/postsControllers.js");
const { identifier } = require("../middlewares/identification.js");

const router = express.Router();

router.get("/all-posts", postsControllers.getPosts);
router.get("/single-post", postsControllers.getSinglePost);
router.post("/create-post", identifier, postsControllers.createPost);
router.put("/update-post", identifier, postsControllers.updatePost);

router.delete("/delete-post", identifier, postsControllers.deletePost);

module.exports = router;
