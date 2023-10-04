const { expect } = require("chai");
const request = require("supertest");
const db = require("../db/index");
const app = require("../src/app");

afterEach(async () => {
  await db.query("TRUNCATE recipes CASCADE");
});

describe("create recipe", () => {
  describe("POST", () => {
    it("posts a new recipe to the database", async () => {
      const res = await request(app).post("/recipes").send({
        name: "Black bean tacos",
        cuisine: "Texmex",
      });

      console.log(res.status);
      console.log(res.body);

      expect(res.status).to.equal(201);
    });
  });
});
