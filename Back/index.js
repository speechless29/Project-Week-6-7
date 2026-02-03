const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

app.post("/students", async (req, res) => {
  const { name, age } = req.body;

  const result = await pool.query(
    "INSERT INTO students(name, age) VALUES($1, $2) RETURNING *",
    [name, age],
  );

  res.json(result.rows[0]);
});

app.put("/students/:id", async (req, res) => {
  const { id } = req.params;
  const { name, age } = req.body;

  await pool.query("UPDATE students SET name=$1, age=$2 WHERE id=$3", [
    name,
    age,
    id,
  ]);

  res.json({ message: "Updated" });
});

app.delete("/students/:id", async (req, res) => {
  const { id } = req.params;

  await pool.query("DELETE FROM students WHERE id=$1", [id]);

  res.json({ message: "Deleted" });
});

app.get("/students", async (req, res) => {
  const result = await pool.query("SELECT * FROM students");
  res.json(result.rows);
});
