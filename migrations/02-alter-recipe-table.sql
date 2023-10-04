ALTER TABLE Recipes
ADD COLUMN steps TEXT,
ADD COLUMN preperation_time INTEGER,
ADD COLUMN cooking_time INTEGER,
ADD COLUMN servings INTEGER,
ADD COLUMN ingredients TEXT[],
ADD COLUMN created_at TIMESTAMP DEFAULT current_timestamp(0),
ADD COLUMN updated_at TIMESTAMP DEFAULT current_timestamp(0);
