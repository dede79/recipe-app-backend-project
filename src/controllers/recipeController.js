const db = require("../../db/index");
const queries = require("../queries");

const createRecipe = async (req, res) => {
  const { name, cuisine, cooking_time, servings, ingredients, instructions } =
    req.body;

  try {
    const {
      rows: [recipe],
    } = await db.query(queries.insertRecipe, [
      name,
      cuisine,
      cooking_time,
      servings,
      ingredients,
      instructions,
    ]);
    res.status(201).json(recipe);
  } catch (err) {
    console.error("Error creating recipe:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getRecipe = async (_, res) => {
  try {
    const { rows } = await db.query("SELECT * FROM recipes");
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error fetching recipes:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "SELECT * FROM recipes WHERE id = $1";
    const result = await db.query(query, [id]);

    if (!result.rows.length) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    const recipe = result.rows[0];

    res.status(200).json({ recipe });
  } catch (error) {
    console.error("Error retrieving recipe by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const query = "DELETE FROM recipes WHERE id = $1";
    const result = await db.query(query, [id]);

    if (!result.rowCount) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.status(204).json();
  } catch (error) {
    console.error("Error deleting recipe by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const patchRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, cuisine, cooking_time, servings, ingredients, instructions } =
      req.body;

    // Build the SET clause dynamically based on the provided fields
    const setClause = [];
    const values = [];
    if (name) {
      setClause.push(`name = $${setClause.length + 1}`);
      values.push(name);
    }
    if (cuisine) {
      setClause.push(`cuisine = $${setClause.length + 1}`);
      values.push(cuisine);
    }
    if (cooking_time) {
      setClause.push(`cooking_time = $${setClause.length + 1}`);
      values.push(cooking_time);
    }
    if (servings) {
      setClause.push(`servings = $${setClause.length + 1}`);
      values.push(servings);
    }
    if (ingredients) {
      setClause.push(`ingredients = $${setClause.length + 1}`);
      values.push(ingredients);
    }
    if (instructions) {
      setClause.push(`instructions = $${setClause.length + 1}`);
      values.push(instructions);
    }

    if (setClause.length === 0) {
      return res
        .status(400)
        .json({ error: "At least one field must be provided" });
    }

    const {
      rows: [recipe],
    } = await db.query(
      `UPDATE recipes SET ${setClause.join(", ")} WHERE id = $${
        values.length + 1
      } RETURNING *`,
      [...values, id]
    );

    if (!recipe) {
      return res.status(404).json({ error: "Recipe not found" });
    }

    res.status(200).json(recipe);
  } catch (error) {
    console.error("Error updating recipe by ID:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createRecipe,
  getRecipe,
  getRecipeById,
  deleteRecipeById,
  patchRecipeById,
};
