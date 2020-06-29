const express = require("express");

const router = express.Router();

const UserController = require("../controllers/user");

router.get('/getSlides',UserController.getSlides);

router.get('/getFeeds',UserController.getFeeds);

router.post('/createQuery',UserController.createQuery);

module.exports = router;
