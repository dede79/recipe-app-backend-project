const { expect } = require("chai");
const request = require("supertest");
const db = require("../db/index");
const app = require("../src/app");

afterEach(async () => {
  await db.query("TRUNCATE recipes CASCADE");
});

describe("read recipe", () => {
  it("reads all recipes from the database", async () => {
    const sampleRecipes = [
      { name: "Recipe 1", cuisine: "Cuisine 1" },
      { name: "Recipe 2", cuisine: "Cuisine 2" },
    ];

    await db.query(
      "INSERT INTO recipes (name, cuisine) VALUES ($1, $2), ($3, $4)",
      [
        sampleRecipes[0].name,
        sampleRecipes[0].cuisine,
        sampleRecipes[1].name,
        sampleRecipes[1].cuisine,
      ]
    );

    const res = await request(app).get("/recipes");

    expect(res.status).to.equal(200);

    expect(res.body).to.be.an("array");
    expect(res.body).to.have.lengthOf(sampleRecipes.length);

    expect(res.body[0]).to.include(sampleRecipes[0]);
    expect(res.body[1]).to.include(sampleRecipes[1]);
  });
});
