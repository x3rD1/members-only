const bcrypt = require("bcryptjs");

exports.usersModule = (db) => ({
  signup: async (name, lastname, username, password) => {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    await db(
      "INSERT INTO users (name, lastname, username, password) VALUES ($1, $2, $3, $4)",
      [name, lastname, username, hashedPassword]
    );
  },

  getMembership: async (id) => {
    await db("UPDATE users SET membership = true WHERE id = $1", [id]);
  },

  getUser: async (id) => {
    const { rows } = await db("SELECT * FROM users WHERE id = $1", [id]);
    return rows[0];
  },
});
