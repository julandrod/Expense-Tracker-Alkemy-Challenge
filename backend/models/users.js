import { v4 as uuidv4 } from "uuid";
import pool from "../db/db.js";

export const insertUserDb = async ({ email, password, name }) => {
  const id = uuidv4();
  const user = await pool.query(
    "INSERT INTO users (id, email, password, name) VALUES($1, $2, $3, $4) RETURNING *",
    [id, email, password, name]
  );
  return user.rows[0];
};

export const getUserByEmailDb = async (userEmail) => {
  const user = await pool.query("SELECT * FROM users WHERE email = $1", [
    userEmail,
  ]);
  return user.rows[0];
};

export const deleteUserDb = async (userId) => {
  const deleteUser = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [userId]
  );

  return deleteUser;
};
