import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import { TransactionForm } from "../components";
import { selectAuthState } from "../features/authSlice";
import {
  getSingleTransaction,
  selectTransactionsState,
  updateSingleTransaction,
} from "../features/transactionsSlice";
import { formatDate } from "../utils/formatDate";

const EditTransaction = () => {
  const { id } = useParams();
  const { token } = useSelector(selectAuthState);
  const {
    singleTransaction,
    transactionError,
    transactionErrorInfo,
    transactionMessage,
  } = useSelector(selectTransactionsState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSingleTransaction({ token, id }));
  }, [dispatch, id, token]);

  const [newValues, setNewValues] = useState({
    concepto: singleTransaction.concepto,
    monto: singleTransaction.monto,
    categoria: singleTransaction.categoria,
  });

  const handleChange = (e) => {
    if (e.target.name === "monto") {
      setNewValues({ ...newValues, monto: parseInt(e.target.value) });
    } else {
      setNewValues({ ...newValues, [e.target.name]: e.target.value });
    }
    console.log(singleTransaction.fecha);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const fecha = formatDate(singleTransaction.fecha);

    setNewValues({
      ...newValues,
      fecha,
      tipo: singleTransaction.tipo,
    });
    dispatch(
      updateSingleTransaction({ token, id, transactionInfo: newValues })
    );
  };

  useEffect(() => {
    if (transactionError) {
      swal({
        text: transactionErrorInfo,
        icon: "warning",
      });
    }
  }, [navigate, transactionErrorInfo, transactionError]);

  useEffect(() => {
    if (transactionMessage) {
      swal({
        text: transactionMessage,
        icon: "success",
        timer: 3000,
        buttons: false,
      });
      navigate(`/transactions/${singleTransaction.transactionid}`);
    }
  }, [navigate, transactionMessage, singleTransaction.transactionid]);

  return (
    <TransactionForm
      onSubmit={onSubmit}
      data={newValues}
      handleChange={handleChange}
    />
  );
};

export default EditTransaction;
