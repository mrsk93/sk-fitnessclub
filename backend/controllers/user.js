const Slide = require("../models/slide");

const Feed = require("../models/feed");

const Query = require("../models/query");

exports.getSlides = (req,res,next) => {
  let skipCount;
  let query = Slide.find();
  Slide.countDocuments().then(totalDocuments => {
    skipCount = totalDocuments - (totalDocuments - (totalDocuments - process.env.SLIDE_COUNT));
    if (skipCount >= 0 && !req.query.admin) {
      return query.skip(skipCount);
    }
    return query;
  })
  .then(slides => {
    res.status(200).json({
      slidesData: [...slides]
   });
  });

};

exports.getSlide = (req,res,next) => {
  Slide.findById(req.params.id)
  .then(slide => {
    if (slide) {
      res.status(200).json(slide);
    } else {
      res.status(404).json({ message: "Slide not found!" });
    }
  });

}

exports.getFeeds = (req,res,next) => {
  let skipCount;
  let query = Feed.find();

  Feed.countDocuments().then(totalFeeds => {
    skipCount = totalFeeds - (totalFeeds - (totalFeeds - process.env.FEED_COUNT));
    if (skipCount >= 0 && !req.query.admin) {
      return query.skip(skipCount);
    }
    return query;
  })
  .then(feeds => {
    res.status(200).json({
      feedsData: [...feeds]
    });
  });
};

exports.getFeed = (req,res,next) => {
  Feed.findById(req.params.id)
  .then(feed => {
    if (feed) {
      res.status(200).json(feed);
    } else {
      res.status(404).json({ message: "Feed not found!" });
    }
  });

}

exports.createQuery = (req,res,next) => {
  const query = new Query({
    name: req.body.name,
    mobileNo: req.body.mobileNo,
    emailId: req.body.emailId,
    description: req.body.description
  })
  query.save()
  .then(response =>{
    res.status(201).json({
      message:'Query Submitted Successfully!'
    });
  })
  .catch(error=> {
    res.status(403).json({
      message: error
    });
  });
};

