const express = require("express");

const router = express.Router();

const UserController = require("../controllers/user");

const sendQueryMails = require("../middlewares/send-query-mails");

router.get('/getSlides',UserController.getSlides);

router.get('/getFeeds',UserController.getFeeds);

router.post('/createQuery', sendQueryMails, UserController.createQuery);

module.exports = router;
