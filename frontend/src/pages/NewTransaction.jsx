import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { TransactionForm } from "../components";
import { selectAuthState } from "../features/authSlice";
import {
  createTransaction,
  selectTransactionsState,
} from "../features/transactionsSlice";
import { formatDate } from "../utils/formatDate";

const NewTransaction = () => {
  const [values, setValues] = useState({
    concepto: "",
    monto: "",
    tipo: "",
    categoria: "",
  });
  const dispatch = useDispatch();
  const { token } = useSelector(selectAuthState);
  const {
    transactionError,
    transactionErrorInfo,
    transactionMessage,
    singleTransaction,
  } = useSelector(selectTransactionsState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "monto") {
      setValues({ ...values, monto: parseInt(e.target.value) });
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const fecha = formatDate(Date.now());

    setValues({ ...values, fecha });

    dispatch(createTransaction({ transactionInfo: values, token }));
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
      data={values}
      handleChange={handleChange}
      isNew
    />
  );
};

export default NewTransaction;
