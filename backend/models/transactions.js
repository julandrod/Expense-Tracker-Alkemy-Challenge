import { v4 as uuidv4 } from "uuid";
import pool from "../db/db.js";

export const createTransactionDb = async ({ transactionInfo }) => {
  const { concepto, monto, tipo, categoria, userId } = transactionInfo;
  const id = uuidv4();
  const fecha = await pool.query("SELECT NOW()");
  const transaction = await pool.query(
    "INSERT INTO transactions (transactionId, concepto, monto, tipo, categoria, userId, fecha) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    [id, concepto, monto, tipo, categoria, userId, fecha.rows[0].now]
  );
  return transaction.rows[0];
};

export const getAllTransactionsDb = async (userId) => {
  const transaction = await pool.query(
    "SELECT * FROM transactions WHERE userId = $1",
    [userId]
  );
  return transaction.rows;
};

export const getSingleTransactionDB = async (transactionId) => {
  const result = await pool.query(
    "SELECT * FROM transactions WHERE transactionId = $1",
    [transactionId]
  );
  return result.rows[0];
};

export const updateTransactionDb = async ({ transactionInfo }) => {
  const { concepto, monto, categoria, transactionId } = transactionInfo;
  const fecha = await pool.query("SELECT NOW()");
  const result = await pool.query(
    "UPDATE transactions SET concepto = $1, monto = $2, categoria = $3, fecha = $4 WHERE transactionId = $5 RETURNING *",
    [concepto, monto, categoria, fecha.rows[0].now, transactionId]
  );
  return result.rows[0];
};

export const deleteTransactionDb = async (transactionId) => {
  const transaction = await pool.query(
    "DELETE FROM transactions WHERE transactionId = $1 RETURNING *",
    [transactionId]
  );

  return transaction.rowCount;
};
