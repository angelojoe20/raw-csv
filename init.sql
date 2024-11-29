CREATE TABLE people (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  hobbies VARCHAR(255) NOT NULL
);

INSERT INTO people (name, email, hobbies) VALUES 
('Alice', 'alice@example.com', 'Reading, Hiking'),
('Bob', 'bob@example.com', 'Cooking, Swimming'),
('Charlie', 'charlie@example.com', 'Gaming, Traveling');