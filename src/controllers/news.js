const News = require("../models/news");
const Match = require("../models/match");
const Tour = require("../models/tour");

const ENTITY_TYPE_MATCH = "match";
const ENTITY_TYPE_TOUR = "tour";
const ENTITY_TYPE_SPORT = "sport";

const createNews = async (body, params) => {
  let matchId = null,
    tourId = null,
    sportId = null;

  const { entityType, entityId } = params;

  if (!body || !body.title || !body.description) {
    throw new Error("Missing title or description");
  }

  if (!entityId || !entityType) {
    throw new Error("Missing or invalid entity type or entity id");
  }

  if (entityType === ENTITY_TYPE_MATCH) {
    matchId = entityId;
    const match = await Match.getMatchById(entityId);
    if (!match) {
      throw new Error("Match id does not exist");
    }
    tourId = match.id;
    sportId = match.sportId;
  } else if (entityType === ENTITY_TYPE_TOUR) {
    tourId = entityId;
    const tour = await Tour.getTourById(entityId);
    sportId = tour.sportId;
  } else {
    throw new Error("Incorrect entity type");
  }
  const parameters = [body.title, body.description, matchId, tourId, sportId];
  console.log(`params: ${parameters}`);
  const newsId = await News.createNews(parameters);
  return {
    newsId,
  };
};

const getNewsByEntity = async (params) => {
  const { entityType, entityId } = params;
  let news = [];
  switch (entityType) {
    case ENTITY_TYPE_MATCH:
      news = await News.getNewsByMatchId(entityId);
      break;
    case ENTITY_TYPE_SPORT:
      news = await News.getNewsBySportId(entityId);
      break;
    case ENTITY_TYPE_TOUR:
      news = await News.getNewsByTourId(entityId);
      break;
    default:
      throw new Error("Unknown entity type: " + entityType);
  }
  return news;
};

module.exports = {
  createNews: createNews,
  getNewsByEntity: getNewsByEntity,
};
