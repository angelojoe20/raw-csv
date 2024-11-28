const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");

const app = express();
app.use(bodyParser.json());

const pool = new Pool({
  user: "user",
  host: "db", // Name of the Docker service
  database: "mydb",
  password: "password",
  port: 5432,
});

app.get("/data", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM people");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching data");
  }
});

app.post("/submit", async (req, res) => {
  const { name, email, hobbies } = req.body;
  try {
    await pool.query("INSERT INTO people (name, email, hobbies) VALUES ($1, $2, $3)", [name, email, hobbies]);
    res.status(201).send("Data inserted successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error inserting data");
  }
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});