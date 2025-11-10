const { Router } = require("express");
const adminRouter = Router();
const adminController = require("../controllers/adminController");

adminRouter.post("/delete/:id", adminController.deleteMessage);
module.exports = adminRouter;
