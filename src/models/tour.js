const mysql = require("../lib/mysql");

const getAllTours = async () => {
  const statement = "select * from tours;";
  const parameters = [];
  return await mysql.query(statement, parameters);
};

const getTourById = async (id) => {
  const statement = "select * from tours where tours.id = ?;";
  const parameters = [id];
  const tours = await mysql.query(statement, parameters);
  return tours.length > 0 ? tours[0] : null;
};

const getMatchesByTourName = async (params) => {
  const statement =
    "select matches.*, tours.name, tours.sportId from matches left join tours on matches.tourId = tours.id and tours.name = ?";
  const parameters = [params.name];
  return await mysql.query(statement, parameters);
};

module.exports = {
  getAllTours: getAllTours,
  getMatchesByTourName: getMatchesByTourName,
  getTourById: getTourById,
};
