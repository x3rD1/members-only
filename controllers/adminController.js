const db = require("../db/index");

exports.deleteMessage = async (req, res) => {
  await db.messages.deleteMessage(req.params.id);
  res.redirect("/");
};
