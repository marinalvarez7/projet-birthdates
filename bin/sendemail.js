require('dotenv').config({
  path: require('path').resolve(__dirname, '../.env')
});

const mongoose = require('mongoose');

const Members = require("../models/members");
//const dbtitle = 'projet-birthdates';
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true}).catch(err => console.error(err));



  sendTest(members)

  mongoose.connection.close()


  //console.log('tt', members)
}).catch(err => console.log(err, "Erreur"))



function sendTest(members){
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_APIKEY);

  members.forEach(member => {
    const msg = {
      to: member.email,
      from: "contact@birthdates.com",
      subject: `Joyeux anniversaire ${member.prenom} !`,
      text: member.message,
      html:`<strong>${member.message}</strong>`,
      };


// const start = ’2020-${month}-${date}T00:00:00Z’;
// const end = ('2020-’${month}’-’${date}’T23:59:59Z');
// // const start = '2020-01-21T00:00:00Z'; 
// // const end = '2020-01-21T23:59:59Z';
// Members.find({
//   "dateOfBirth": {"$gte": new Date(start), "$lt": new Date(end)}
// })
// .then (function(members) {
//   console.log('tt', members)
// }).catch(err => console.log(err, "Erreur"))


//
// 