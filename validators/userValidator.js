const { body } = require("express-validator");

exports.validateSignup = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isAlpha()
    .withMessage("Name must only contain letters")
    .isLength({ min: 3, max: 18 })
    .withMessage("Name must be between 3 and 18 characters"),
  body("lastname")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isAlpha()
    .withMessage("Last name must only contain letters")
    .isLength({ min: 3, max: 18 })
    .withMessage("Last name must be between 3 and 18 characters"),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3, max: 18 })
    .withMessage("Username must be between 3 and 18 characters")
    .escape(),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long")
    .matches(/\d/)
    .withMessage("Password must contain a number"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("Please confirm your password")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password do not match");
      }
      return true;
    }),
];
