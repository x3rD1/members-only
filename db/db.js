const pool = require("./pool");

exports.dbExec = (sql, params) => {
  return pool.query(sql, params);
};
