import express from "express";
import dotenv from "dotenv";
import pool from "./db/db.js";

// API configuration
const app = express();
dotenv.config();
const port = process.env.PORT || 8080;

// Middlewares
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Expenses - Alkemy Challenge API");
});

app.listen(port, () => console.log(`Server is listening on port ${port}`));
