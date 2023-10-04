const insertRecipe = "INSERT INTO recipes (name, cuisine, cooking_time, servings, ingredients, instructions) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;"

const selectAllRecipes = "SELECT * FROM recipes;"

const getRecipeById = "SELECT * FROM recipes WHERE id = $1;"

const updateRecipe =  "UPDATE recipes SET name = $1, cuisine = $2, cooking_time = $3, servings = $4, ingredients = $5, instructions= $6 WHERE id = $7 RETURNING *;"

module.exports = {
  getRecipeById,
  insertRecipe,
  selectAllRecipes,
  updateRecipe
}
