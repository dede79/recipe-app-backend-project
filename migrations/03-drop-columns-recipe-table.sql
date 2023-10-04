ALTER TABLE Recipes
DROP COLUMN steps,
DROP COLUMN preperation_time,
ADD COLUMN instructions TEXT;
