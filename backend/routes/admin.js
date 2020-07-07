const express = require("express");

const router = express.Router();

const userController = require("../controllers/user");

const adminController = require("../controllers/admin");

const checkAuth = require("../middlewares/check-auth");

const extractImage = require("../middlewares/extract-file");

router.get("/getSlides", checkAuth, userController.getSlides);

router.get("/getSlide/:id", checkAuth, userController.getSlide);

router.post("/createSlide", checkAuth, extractImage, adminController.createSlide);

router.put("/updateSlide/:id", checkAuth, extractImage, adminController.updateSlide);

router.delete("/deleteSlide/:id", checkAuth, adminController.deleteSlide);

router.get("/getFeeds", checkAuth, userController.getFeeds);

router.get("/getFeed/:id", checkAuth, userController.getFeed);

router.post("/createFeed", checkAuth, extractImage, adminController.createFeed);

router.put("/updateFeed/:id", checkAuth, extractImage, adminController.updateFeed);

router.delete("/deleteFeed/:id", checkAuth, adminController.deleteFeed);

router.get("/getQueries", checkAuth, adminController.getQueries);

module.exports = router;
