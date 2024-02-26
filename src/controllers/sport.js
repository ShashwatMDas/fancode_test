const Sport = require("../models/sport");

const getAllSportsToursAndMatches = async () => {
  const matches = await Sport.getAllSportsToursAndMatches();
  const res = {};
  matches.forEach((match) => {
    console.log(`Match: ${match}`);
    const { sportName, tourName, matchName, matchStartTime, matchFormat } =
      match;
    if (!res[sportName]) {
      res[sportName] = {};
    }
    if (!res[sportName][tourName]) {
      res[sportName][tourName] = [];
    }
    res[sportName][tourName].push({
      name: matchName,
      startTime: matchStartTime,
      format: matchFormat,
    });
  });
  console.log(res);
  return res;
};

module.exports = {
  getAllSportsToursAndMatches: getAllSportsToursAndMatches,
};
