const express = require("express");

const router = express.Router();

const userController = require("../controllers/user");

const adminController = require("../controllers/admin");

const extractImage = require("../middlewares/extract-file");

router.get("/getSlides", userController.getSlides);

router.get("/getSlide/:id", userController.getSlide);

router.post("/createSlide", extractImage, adminController.createSlide);

router.put("/updateSlide/:id", extractImage, adminController.updateSlide);

router.delete("/deleteSlide/:id", adminController.deleteSlide);

router.get("/getFeeds", userController.getFeeds);

router.get("/getFeed/:id", userController.getFeed);

router.post("/createFeed", extractImage, adminController.createFeed);

router.put("/updateFeed/:id", extractImage, adminController.updateFeed);

router.delete("/deleteFeed/:id", adminController.deleteFeed);

router.get("/getQueries", adminController.getQueries);

module.exports = router;
