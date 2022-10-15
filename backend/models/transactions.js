import { v4 as uuidv4 } from "uuid";
import pool from "../db/db.js";

export const createTransactionDb = async ({ transactionInfo }) => {
  const { concepto, monto, tipo, categoria, userId } = transactionInfo;
  const id = uuidv4();
  const fecha = await pool.query("SELECT NOW()");
  const transaction = await pool.query(
    `INSERT INTO transactions 
      (transactionId, concepto, monto, tipo, categoria, userId, fecha) 
      VALUES($1, $2, $3, $4, $5, $6, $7) 
      RETURNING *`,
    [id, concepto, monto, tipo, categoria, userId, fecha.rows[0].now]
  );
  return transaction.rows[0];
};

export const getAllTransactionsDb = async (userId) => {
  const transaction = await pool.query(
    "SELECT * FROM transactions WHERE userId = $1",
    [userId]
  );
  const expenses = await pool.query(
    "SELECT SUM (monto) FROM transactions WHERE userId = $1 AND tipo = 'egreso'",
    [userId]
  );
  const income = await pool.query(
    "SELECT SUM (monto) FROM transactions WHERE userId = $1 AND tipo = 'ingreso'",
    [userId]
  );
  const balance = income.rows[0].sum - expenses.rows[0].sum;

  return {
    transactions: transaction.rows,
    totalIncome: income.rows[0].sum,
    totalExpenses: expenses.rows[0].sum,
    balance,
  };
};

export const getSingleTransactionDB = async ({ transactionId, userId }) => {
  const result = await pool.query(
    "SELECT * FROM transactions WHERE userId = $1 AND transactionId = $2",
    [userId, transactionId]
  );
  return result.rows[0];
};

export const updateTransactionDb = async ({ transactionInfo }) => {
  const { concepto, monto, categoria, transactionId, userId } = transactionInfo;
  const result = await pool.query(
    `UPDATE transactions 
      SET concepto = $1, monto = $2, categoria = $3 
      WHERE userId = $4 AND transactionId = $5
      RETURNING *`,
    [concepto, monto, categoria,  userId, transactionId]
  );
  return result.rows[0];
};

export const deleteTransactionDb = async ({ transactionId, userId }) => {
  const transaction = await pool.query(
    "DELETE FROM transactions WHERE userId = $1 AND transactionId = $2 RETURNING *",
    [userId, transactionId]
  );

  return transaction.rowCount;
};

export const filterTransactionsDb = async ({ filters, userId }) => {
  let filterTransactions;

  if (filters.type) {
    filterTransactions = await pool.query(
      "SELECT * FROM transactions WHERE userId = $1 AND tipo = $2",
      [userId, filters.type]
    );
  }
  if (filters.category) {
    filterTransactions = await pool.query(
      "SELECT * FROM transactions WHERE userId = $1 AND categoria = $2",
      [userId, filters.category]
    );
  }

  return { transactions: filterTransactions.rows };
};
