import { Router } from "express";
import {
  createTransaction,
  deleteTransactionById,
  getAllTransactions,
  getTransactionById,
  updateTransactionById,
} from "../controllers/transaction.controllers.js";
import { authenticateUser } from "../middlewares/auth.middleware.js";

const router = Router();

// Create a single transactions
router.post("/", authenticateUser, createTransaction);
// Get all transactions of the current user
router.get("/", authenticateUser, getAllTransactions);
// Get single transaction by id
router.get("/:id", authenticateUser, getTransactionById);
// Update single transaction
router.put("/:id", authenticateUser, updateTransactionById);
// Delete single transaction
router.delete("/:id", authenticateUser, deleteTransactionById);

export default router;
