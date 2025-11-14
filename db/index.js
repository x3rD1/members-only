const { dbExec } = require("./db");
const { usersModule } = require("./models/users");
const { messagesModule } = require("./models/messages");

exports.db = {
  users: usersModule(dbExec),
  messages: messagesModule(dbExec),
};
