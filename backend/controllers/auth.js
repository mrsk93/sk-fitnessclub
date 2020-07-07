const Admin = require("../models/admin");

const jwt = require("jsonwebtoken");

exports.login = (req, res, next) => {
  let token;
  Admin.find({ emailId: req.body.emailId, password: req.body.password })
  .then(response => {
    if(response.length>0){
      token = jwt.sign({
        email: req.body.emailId
        },
        'SK-Secret-Key',
        { expiresIn: '1h' }
      );
      return res.status(200).json({
        message: "Token Created Successfully",
        token: token,
        expirationTime: 3600000
      });
    }
    res.status(401).json({
      message: "Invalid Credentials!!!",
      token: null,
      expirationTime: null
    });
  })
  .catch(error => {
    res.status(500).json({
      message: error
    })
  });
};
