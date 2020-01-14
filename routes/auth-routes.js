const express = require("express");
const router = express.Router();

const passport = require("passport");

// User model
const User = require("../models/user");
const Members = require("../models/members");
const Message = require("../models/message");

// Bcrypt to encrypt passwords
const bcrypt = require("bcryptjs");
const bcryptSalt = 10;

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const prenom = req.body.prenom;
  const email = req.body.email;
  const password = req.body.password;

  // 1. Check email and password are not empty
  if (email === "" || password === "") {
    res.render("auth/signup", { errorMessage: "Indicate email and password" });
    return;
  }

  User.findOne({ email })
    .then(user => {
      // 2. Check user does not already exist
      if (user) {
        res.render("auth/signup", { errorMessage: "The email already exists" });
        return;
      }

      // Encrypt the password
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      //
      // Save the user in DB
      //

      const newUser = new User({
        prenom,
        email,
        password: hashPass
      });

      newUser.save()
        .then(user => res.redirect("/"))
        .catch(err => next(err))
      ;
        
    })
    .catch(err => next(err))
  ;
});

router.get("/login", (req, res, next) => {
  res.render("auth/login", { "errorMessage": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
  
  successRedirect: "/birthdates",
  failureRedirect: "/login",
  failureFlash: true
}
));

router.get("/birthdates", (req, res, next) => {
  if (!req.user) {
    res.redirect('/login'); // not logged-in
    return;
  }


  // afficher les anniversaires des membres
  Members.find({_id: {$in: req.user.members}})
    .then(members => {
      res.render("birthdates", {
        members: members,
        user: req.user
      });
    })
    .catch(next)
  ;
});

router.get("/newbirthdates", (req, res, next) => {
  if (!req.user) {
    res.redirect('/login'); // not logged-in
    return;
  }

  // afficher les messages types d anniversaires
  Message.find()
    .then(message => {
      res.render("newbirthdates", {
        message: message,
        //user: req.user
      });
    })
    .catch(next)
  
  // ok, req.user is defined
  //res.render("newbirthdates", { user: req.user });


});


router.post("/newbirthdates", (req, res, next) => {
  const prenom = req.body.prenom;
  const dateOfBirth = req.body.dateOfBirth;
  const email = req.body.email;
  const message = req.body.message;
  //const idMessage = req.body.idMessage;
  const user = req.user;

  

      //
      // Save the user in DB
      //

      const newMember = new Members({
        prenom,
        dateOfBirth,
        email,
        message
        //idMessage
      });

      newMember.save()
        .then(member => {

          user.members.push(newMember.id);
          //members.message.push(newMessage.id);

          user.save().then(function () {
            res.redirect("/birthdates");
          }).catch(next)

          
        })
        .catch(err => next(err))
      ;

});


router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = router;