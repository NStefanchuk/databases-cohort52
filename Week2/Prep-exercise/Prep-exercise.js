import mysql from 'mysql2'

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'recipesdb',
})

connection.connect()

const createRecipes = `
  CREATE TABLE recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    cooking_time INT,
    needs_baking BOOLEAN,
    is_vegan BOOLEAN
  );
`

const createIngredients = `
  CREATE TABLE ingredients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100)
  );
`

const createSteps = `
  CREATE TABLE steps (
    id INT AUTO_INCREMENT PRIMARY KEY,
    instructions VARCHAR(255)
  );
`

const createCategories = `
  CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100)
  );
`

const createRecipeIngredients = `
  CREATE TABLE recipe_ingredients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_id INT,
    ingredient_id INT,
    quantity VARCHAR(50),
    FOREIGN KEY (recipe_id) REFERENCES recipes(id),
    FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
  );
`

const createRecipeSteps = `
  CREATE TABLE recipe_steps (
    id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_id INT,
    step_id INT,
    step_order INT,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id),
    FOREIGN KEY (step_id) REFERENCES steps(id)
  );
`

const createRecipeCategories = `
  CREATE TABLE recipe_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    recipe_id INT,
    category_id INT,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
  );
`

const queries = [
  createRecipes,
  createIngredients,
  createSteps,
  createCategories,
  createRecipeIngredients,
  createRecipeSteps,
  createRecipeCategories,
]

queries.forEach((q) => {
  connection.query(q, (err) => {
    if (err) console.log('error:', err.sqlMessage)
    else console.log('ok')
  })
})

connection.end()