const passport = require("passport");
const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");
const { validateSignup } = require("../validators/userValidator");
const { isAuth } = require("../middlewares/auth");

indexRouter.get("/", indexController.getIndexPage);
indexRouter.get("/signup", indexController.getSignUpPage);
indexRouter.get("/login", indexController.getLoginPage);
indexRouter.get("/logout", isAuth, indexController.logout);
indexRouter.get("/membership", isAuth, indexController.getMembershipPage);
indexRouter.post("/signup", validateSignup, indexController.postSignUpPage);
indexRouter.post("/membership", indexController.postMembership);
indexRouter.post("/new", indexController.createMessage);
indexRouter.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.render("login", {
        message: info.message,
        oldInput: { username: req.body.username },
      });
    }
    // Logs user in and sets up the session
    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect("/");
    });
  })(req, res, next);
});

module.exports = indexRouter;
