const { date } = require("joi");
const post = require("../models/postsModel");
const { createPostSchema } = require("../middlewares/validator");

exports.getPosts = async (req, res) => {
  const { page } = req.query;
  const postPerPage = 10;
  try {
    let pageNum = 0;
    if (pageNum <= 1) {
      pageNum = 0;
    } else {
      pageNum = page - 1;
    }
    const result = await post
      .find()
      .sort({ createdAt: -1 })
      .skip(pageNum * postPerPage)
      .limit(postPerPage)
      .populate({
        path: "userId",
        select: "email",
      });
    res.status(200).json({ success: true, message: "posts", data: result });
  } catch (error) {
    console.log(error);
  }
};

exports.getSinglePost = async (req, res) => {
  const { _id } = req.query;

  try {
    const result = await post.findOne({ _id }).populate({
      path: "userId",
      select: "email",
    });
    if (!result) {
      return res
        .status(401)
        .json({ success: false, message: "Post unavailable" });
    }

    res
      .status(200)
      .json({ success: true, message: "Single post", data: result });
  } catch (error) {
    console.log(error);
  }
};

exports.createPost = async (req, res) => {
  const { title, description } = req.body;
  const { userId } = req.user;

  try {
    const { error, value } = createPostSchema.validate({
      title,
      description,
      userId,
    });
    if (error) {
      return res
        .status(401)
        .json({ success: false, message: error.details[0].message });
    }
    const result = await post.create({
      title,
      description,
      userId,
    });
    res
      .status(201)
      .json({ success: true, message: "post created", data: result });
  } catch (error) {
    console.log(error);
  }
};

exports.updatePost = async (req, res) => {
  const { title, description } = req.body;
  const { _id } = req.query;
  const { userId } = req.user;
  try {
    const { error, value } = createPostSchema.validate({
      title,
      description,
      userId,
    });
    if (error) {
      return res
        .status(401)
        .json({ success: false, message: error.details[0].message });
    }
    const existingPost = await post.findOne({ _id });
    if (!existingPost) {
      return res
        .status(401)
        .json({ success: false, message: "Post unavailable" });
    }
    if (existingPost.userId.toString() !== userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    existingPost.title = title;
    existingPost.description = description;
    const result = await existingPost.save();
    res
      .status(201)
      .json({ success: true, message: "post uddated", data: result });
  } catch (error) {
    console.log(error);
  }
};

exports.deletePost = async (req, res) => {
  const { _id } = req.query;
  const { userId } = req.user;
  try {
    const existingPost = await post.findOne({ _id });
    if (!existingPost) {
      return res
        .status(401)
        .json({ success: false, message: "Post unavailable" });
    }
    if (existingPost.userId.toString() !== userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    await post.deleteOne({ _id });
    res.status(201).json({ success: true, message: "post deleted" });
  } catch (error) {
    console.log(error);
  }
};
