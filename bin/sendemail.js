const express = require("express");
const mongoose = require('mongoose');
var datedujour = new Date();//la date total du jour
const month = (datedujour.getMonth()+1);//date du mois mais ajouter +1
const date = datedujour.getDate();//date du jour

const Members = require("../models/members");
//const dbtitle = 'projet-birthdates';
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true}).catch(err => console.error(err));


const startOfDay = new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString()
const endOfDay = new Date(new Date().setUTCHours(23, 59, 59, 999)).toISOString()
Members.find({
  "dateOfBirth": {"$gte": new Date(startOfDay), "$lt": new Date(endOfDay)}
})
.then (function(members) {
  //
  // 
  //

  sendTest(members)


  //console.log('tt', members)
}).catch(err => console.log(err, "Erreur"))



function sendTest(members){
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey("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");
  members.forEach(member => {
    const msg = {
      to: member.email,
      from: "contact@birthdates.com",
      subject: `Joyeux anniversaire ${member.prenom} !`,
      text: member.message,
      html:`<strong>${member.message}</strong>`,
      };
    sgMail.send(msg)
  });
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



