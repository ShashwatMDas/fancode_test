const mysql = require("../lib/mysql");

const createNews = async (params) => {
  const statement =
    "insert into news (title, description, matchId, tourId, sportId) VALUES (?, ?, ?, ?, ?)";
  const parameters = params;
  return (await mysql.query(statement, parameters)).insertId;
};

const getNewsByMatchId = async (id) => {
  const statement = "select * from news where matchId = ?";
  const parameters = [id];
  return await mysql.query(statement, parameters);
};

const getNewsBySportId = async (id) => {
  const statement = "select * from news where sportId = ?";
  const parameters = [id];
  return await mysql.query(statement, parameters);
};

const getNewsByTourId = async (id) => {
  const statement = "select * from news where tourId = ?";
  const parameters = [id];
  return await mysql.query(statement, parameters);
};

module.exports = {
  createNews: createNews,
  getNewsByMatchId: getNewsByMatchId,
  getNewsBySportId: getNewsBySportId,
  getNewsByTourId: getNewsByTourId,
};
