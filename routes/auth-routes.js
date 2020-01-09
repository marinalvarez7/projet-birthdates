const express = require("express");
const router = express.Router();

const passport = require("passport");

// User model
const User = require("../models/user");

// Bcrypt to encrypt passwords
const bcrypt = require("bcryptjs");
const bcryptSalt = 10;

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const useremail = req.body.useremail;
  const password = req.body.password;

  // 1. Check useremail and password are not empty
  if (useremail === "" || password === "") {
    res.render("auth/signup", { errorMessage: "Indicate useremail and password" });
    return;
  }

  User.findOne({ useremail })
    .then(user => {
      // 2. Check user does not already exist
      if (user) {
        res.render("auth/signup", { errorMessage: "The useremail already exists" });
        return;
      }

      // Encrypt the password
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      //
      // Save the user in DB
      //

      const newUser = new User({
        useremail,
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
  
  successRedirect: "/private-page",
  failureRedirect: "/login",
  failureFlash: true
}
));

router.get("/private-page", (req, res) => {
  if (!req.user) {
    res.redirect('/login'); // not logged-in
    return;
  }
  
  // ok, req.user is defined
  res.render("private", { user: req.user });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/login");
});

module.exports = router;