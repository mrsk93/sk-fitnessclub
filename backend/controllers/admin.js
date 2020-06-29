const Slide = require("../models/slide");

const Feed = require("../models/feed");

const Query = require("../models/query");

exports.createSlide = (req,res,next) => {
  const url = req.protocol + "://" + req.get("host") + "/images/" + req.file.filename;
  const slide = new Slide({
    title: req.body.title,
    path: url,
    description: req.body.description
  });

  slide.save()
  .then(response => {
    res.status(201).json({
      message: 'Slide Created Successfully'
    });
  })
  .catch(error => {
    if(error._message === "Slide validation failed"){
      res.status(400).json({
        message: "Slide Title Already Exists!!!"
      });
    };
  });
}

exports.updateSlide = (req,res,next) => {
  let url = req.body.path;
  if(req.file){
    url = req.protocol + '://' + req.get("host") + '/images/' + req.file.filename;
  }
  const slide = new Slide({
    _id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    path: url,
  });
  Slide.updateOne({_id: req.params.id}, slide)
  .then(response => {
    res.status(200).json({
      message: 'Slide was successfully updated'
    });
  })
  .catch(error => {
    res.status(500).json({
      message: "Couldn't udpate Slide!"
    });
  });


};

exports.deleteSlide = (req,res,next) => {
  Slide.deleteOne({_id: req.params.id})
  .then(response => {
    res.status(201).json({
      message: 'Slide Deleted Successfully'
    })
  })
}

exports.createFeed = (req,res,next) => {
  const url = req.protocol + "://" + req.get("host") + "/images/" + req.file.filename;
  const feed = new Feed({
    title: req.body.title,
    path: url,
    description: req.body.description
  });

  feed.save()
  .then(response => {
    res.status(201).json({
      message: 'Feed Created Successfully'
    });
  })
  .catch(error => {
    if(error._message === "Feed validation failed"){
      res.status(400).json({
        message: "Feed Title Already Exists!!!"
      });
    };
  });
}

exports.updateFeed = (req,res,next) => {
  let url = req.body.path;
  if(req.file){
    url = req.protocol + '://' + req.get("host") + '/images/' + req.file.filename;
  }
  const feed = new Feed({
    _id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    path: url,
  });
  Feed.updateOne({_id: req.params.id}, feed)
  .then(response => {
    res.status(200).json({
      message: 'Feed was successfully updated'
    });
  })
  .catch(error => {
    res.status(500).json({
      message: "Couldn't udpate Feed!"
    });
  });

};

exports.deleteFeed = (req,res,next) => {
  Feed.deleteOne({_id: req.params.id})
  .then(response => {
    res.status(201).json({
      message: 'Feed Deleted Successfully'
    })
  })
}

exports.getQueries = (req, res, next) => {
  Query.find()
  .then(response=> {
    res.status(200).json({
      queryData: [...response]
    })
  })
}
