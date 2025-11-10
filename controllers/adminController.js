const db = require("../db/queries");

exports.deleteMessage = async (req, res) => {
  await db.deleteMessage(req.params.id);
  res.redirect("/");
};
