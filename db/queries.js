const pool = require("./pool");
const bcrypt = require("bcryptjs");

exports.signup = async (name, lastname, username, password) => {
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      "INSERT INTO users (name, lastname, username, password) VALUES ($1, $2, $3, $4)",
      [name, lastname, username, hashedPassword]
    );
  } catch (err) {
    console.error(err);
    throw err;
  }
};

exports.getMembership = async (id) => {
  await pool.query("UPDATE users SET membership = true WHERE id = $1", [id]);
};

exports.getUser = async (id) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
};

/* ========================Messages============================= */

exports.createMessage = async (userId, title, message) => {
  try {
    await pool.query(
      "INSERT INTO messages (user_id, title, body) VALUES ($1, $2, $3)",
      [userId, title, message]
    );
  } catch (err) {
    console.log(err);
  }
};

exports.getMessages = async () => {
  const { rows } = await pool.query(
    "SELECT messages.*, users.username AS username FROM messages JOIN users ON messages.user_id = users.id ORDER BY messages.created_at DESC"
  );

  return rows;
};

exports.deleteMessage = async (id) => {
  try {
    await pool.query("DELETE FROM messages WHERE id = $1", [id]);
  } catch (err) {
    console.log(err);
  }
};
