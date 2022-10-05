import { StatusCodes } from "http-status-codes";
import { BadRequestError } from "../errors/index.js";
import {
  createTransactionDb,
  deleteTransactionDb,
  getAllTransactionsDb,
  getSingleTransactionDB,
  updateTransactionDb,
} from "../models/transactions.js";

export const createTransaction = async (req, res) => {
  const { concepto, monto, tipo, categoria } = req.body;

  if (!concepto || !monto || !tipo || !categoria) {
    throw new BadRequestError(
      "debes ingresar todos los datos necesarios (concepto, monto, tipo, categoria)"
    );
  }

  if (typeof monto !== "number") {
    throw new BadRequestError(
      "el monto debe ser un valor valido (tipo numero)"
    );
  }

  const transactionInfo = { ...req.body, userId: req.user.userId };
  const result = await createTransactionDb({ transactionInfo });
  res.status(StatusCodes.CREATED).json({ msg: "transaccion creada", result });
};

export const getAllTransactions = async (req, res) => {
  const transactions = await getAllTransactionsDb(req.user.userId);
  const quantity = transactions.length;
  res.status(StatusCodes.OK).json({ transactions, quantity });
};

export const getTransactionById = async (req, res) => {
  const transactionId = req.params.id;

  const result = await getSingleTransactionDB(transactionId);
  if (!result) {
    throw new BadRequestError(
      `No se encontro ninguna transaccion con el id ${transactionId}`
    );
  }

  res.status(StatusCodes.OK).json(result);
};

export const updateTransactionById = async (req, res) => {
  const transactionId = req.params.id;

  const foundTransaction = await getSingleTransactionDB(transactionId);
  if (!foundTransaction) {
    throw new BadRequestError(
      `No se encontro ninguna transaccion con el id ${transactionId}`
    );
  }

  const { concepto, monto, categoria } = req.body;

  if (!concepto || !monto || !categoria) {
    throw new BadRequestError(
      "debes ingresar todos los datos necesarios (concepto, monto, categoria)"
    );
  }

  if (typeof monto !== "number") {
    throw new BadRequestError(
      "el monto debe ser un valor valido (tipo numero)"
    );
  }

  const updatedTransaction = await updateTransactionDb({
    transactionInfo: { ...req.body, transactionId },
  });
  res.status(StatusCodes.CREATED).json(updatedTransaction);
};

export const deleteTransactionById = async (req, res) => {
  const transactionId = req.params.id;

  const result = await deleteTransactionDb(transactionId);

  if (!result) {
    throw new BadRequestError(
      `No se encontro ninguna transaccion con el id ${transactionId}`
    );
  }

  res.status(StatusCodes.OK).json("Transaccion borrada exitosamente!");
};
