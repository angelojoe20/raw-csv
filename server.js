const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const path = require("path");

const app = express();
app.use(bodyParser.json());

// PostgreSQL connection setup
const pool = new Pool({
  user: "postgres",
  host: "db",
  database: "mydb",
  password: "password",
  port: 5432,
});

// Serve static files (e.g., CSS, JS, images) from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Serve the index.html file for the root URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Endpoint to fetch data
app.get("/data", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM people");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching data");
  }
});

// Endpoint to submit data
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

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
