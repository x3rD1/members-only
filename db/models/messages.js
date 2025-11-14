exports.messagesModule = (db) => ({
  createMessage: async (userId, title, message) => {
    await db(
      "INSERT INTO messages (user_id, title, body) VALUES ($1, $2, $3)",
      [userId, title, message]
    );
  },

  getMessages: async () => {
    const { rows } = await db(
      "SELECT messages.*, users.username AS username FROM messages JOIN users ON messages.user_id = users.id ORDER BY messages.created_at DESC"
    );
    return rows;
  },

  deleteMessage: async (id) => {
    await db("DELETE FROM messages WHERE id = $1", [id]);
  },
});
