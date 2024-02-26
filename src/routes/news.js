const News = require("../controllers/news");

module.exports = function (app) {
  app.route("/news/:entityType/:entityId").post(async (req, res, next) => {
    try {
      const body = req.body;
      const params = req.params;
      return res.status(201).json(await News.createNews(body, params));
    } catch (err) {
      return next(err);
    }
  });

  app.route("/news/:entityType/:entityId").get(async (req, res, next) => {
    try {
      const params = req.params;
      return res.json(await News.getNewsByEntity(params));
    } catch (err) {
      return next(err);
    }
  });
};
