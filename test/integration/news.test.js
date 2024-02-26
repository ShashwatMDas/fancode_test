const request = require("supertest");
const { app } = require("../../index");

describe("News API Integration Tests", () => {
  let server;

  beforeAll((done) => {
    server = app.listen(done);
  });

  afterAll((done) => {
    server.close(done);
  });

  describe("POST /news/:entityType/:entityId", () => {
    it("should create news for a match", async () => {
      const response = await request(app).post("/news/match/1").send({
        title: "Test News Title",
        description: "Test News Description",
      });
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty("newsId");
    });
  });

  describe("GET /news/:entityType/:entityId", () => {
    it("should get news for a match", async () => {
      const response = await request(app).get("/news/match/1");
      expect(response.status).toBe(200);
    });
  });
});
