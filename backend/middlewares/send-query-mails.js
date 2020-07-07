const sgMail = require('@sendgrid/mail');

module.exports = (req,res,next) => {

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msgToUser = {
    to: req.body.emailId,
    from: 'kumar.sumit9981@gmail.com',
    subject: 'Hello There ' + req.body.name + ' -SK Fitness Club' ,
    text: 'Thanks for checking out SK Fitness Club',
    html: '<strong>Thanks for checking out SK Fitness Club. We got your query and we will get back to you soon.</strong>',
  };
  sgMail.send(msgToUser)
  .catch(error => {
    error.response.body.errors.map((error)=>{
      console.log(error.message);
    })
  });

  const msgToAdmin = {
    to: 'sumitletsrock@gmail.com',
    from: 'kumar.sumit9981@gmail.com',
    subject: 'You Got a New Query at SK Fitness Club',
    text: 'Query from ' + req.body.name,
    html: '<strong>' + req.body.description + '</strong>',
  };
  sgMail.send(msgToAdmin)
  .catch(error => {
    error.response.body.errors.map((error)=>{
      console.log(error.message);
    })
  });

  next();

}
