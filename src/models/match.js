const mysql = require("../lib/mysql");

const getAllMatches = async () => {
  const statement = "select * from matches;";
  const parameters = [];
  return await mysql.query(statement, parameters);
};

const getMatchById = async (id) => {
  const statement = `
    SELECT m.*, t.sportId 
    FROM matches m
    INNER JOIN tours t ON m.tourId = t.id
    WHERE m.id = ?;
  `;
  const parameters = [id];
  const matches = await mysql.query(statement, parameters);
  return matches.length > 0 ? matches[0] : null;
};

module.exports = {
  getAllMatches: getAllMatches,
  getMatchById: getMatchById,
};
