const express = require("express");
const session = require("express-session");
const pgSession = require("connect-pg-simple")(session);
const passport = require("passport");
const flash = require("connect-flash");
require("dotenv").config();
const path = require("node:path");
const assestsPath = path.join(__dirname, "public");

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(assestsPath));

// Handle form submissions
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    store: new pgSession({
      conString: process.env.DATABASE_URL,
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

// Passport middleware
require("./config/passport"); //Run passport.js config before session
app.use(passport.session());
app.use(flash()); // This ables failureFlash messages inside LocalStrategy to be use in views
// Custom middleware for locals
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
// Routes
const indexRouter = require("./routes/indexRouter");
const adminRouter = require("./routes/adminRouter");
app.use("/", indexRouter);
app.use("/admin", adminRouter);

app.listen(3000, (error) => {
  if (error) throw error;

  console.log("App listening on port 3000");
});
