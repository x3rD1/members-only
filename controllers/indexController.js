const { validationResult } = require("express-validator");
require("dotenv").config();
const db = require("../db/queries");

exports.getIndexPage = async (req, res) => {
  const messages = await db.getMessages();

  res.locals.messages = messages;
  res.render("index");
};

exports.getSignUpPage = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }

  res.locals.errors = [];
  res.locals.oldInput = {};
  res.render("signup");
};

exports.postSignUpPage = async (req, res) => {
  // Check if there's any error
  const errors = validationResult(req);
  // Map to only first error per field
  const errorMap = {};
  errors.array().forEach((err) => {
    if (!errorMap[err.path]) {
      errorMap[err.path] = err.msg;
    }
  });
  // Define locals
  res.locals.errors = errorMap || {};
  res.locals.oldInput = req.body || {};

  if (!errors.isEmpty()) {
    return res.status(400).render("signup");
  }

  // Insert data into the Database
  const { name, lastname, username, password } = req.body;
  await db.signup(name, lastname, username, password);

  res.redirect("/login");
};

exports.getLoginPage = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect("/");
  }

  res.locals.oldInput = req.body || {};
  res.locals.message = req.flash("error");
  res.render("login");
};

exports.getMembershipPage = (req, res) => {
  res.render("membership");
};

exports.postMembership = async (req, res) => {
  if (req.body.code !== process.env.MEMBERSHIP_CODE) {
    return res.redirect("/membership");
  }
  // Change user membership status to true
  await db.getMembership(req.user.id);
  // Get user by id
  const user = await db.getUser(req.user.id);

  // Refresh user session
  req.login(user, (err) => {
    if (err) throw err;
    res.redirect("/");
  });
};

exports.createMessage = async (req, res) => {
  const { title, message } = req.body;

  await db.createMessage(req.user.id, title, message);

  res.redirect("/");
};

exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) return err;

    res.redirect("/");
  });
};
