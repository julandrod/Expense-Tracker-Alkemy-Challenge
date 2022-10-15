import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import swal from "sweetalert";
import { selectAuthState } from "../features/authSlice";
import {
  getSingleTransaction,
  selectTransactionsState,
} from "../features/transactionsSlice";
import { formatAmount } from "../utils/formatAmount";
import { formatDate } from "../utils/formatDate";

const TransactionContainer = styled.section`
  flex: 4;
  padding: 2rem;
  display: flex;
  flex-direction: column;

  h1 {
    font-size: 1.5rem;
  }

  .info {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    border-bottom: 2px solid var(--dark-green);
    padding: 1rem;
  }
  .info-item {
    display: flex;
    flex-direction: column;
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.877);
    box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.466);
    width: 380px;
    height: 60px;
    border-radius: 10px;
    padding: 1.5rem;
    margin: 1rem;
    span {
      margin-top: 1rem;
    }
  }
`;

const Transaction = () => {
  const { token } = useSelector(selectAuthState);
  const { singleTransaction, transactionError, transactionErrorInfo } =
    useSelector(selectTransactionsState);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getSingleTransaction({ token, id }));
  }, [dispatch, id, token]);

  useEffect(() => {
    if (transactionError) {
      swal({
        title: "Error",
        text: transactionErrorInfo,
        icon: "warning",
        buttons: {
          confirm: "OK",
        },
      }).then((backToMain) => {
        if (backToMain) {
          navigate("/");
        }
      });
    }
  }, [transactionError, transactionErrorInfo, navigate]);

  return (
    <TransactionContainer>
      <div className="title box-shadow">
        <h1>Detalles de la transacción</h1>
        <NavLink to={`/editTransaction/${id}`}>
          <button className="btn">Editar</button>
        </NavLink>
      </div>
      <div className="info box-shadow">
        <div className="info-item">
          <h2>ID Transacción</h2>
          <span>{singleTransaction?.transactionid}</span>
        </div>
        <div className="info-item">
          <h2>Concepto</h2>
          <span>{singleTransaction?.concepto}</span>
        </div>
        <div className="info-item">
          <h2>Fecha</h2>
          <span>{formatDate(singleTransaction?.fecha)}</span>
        </div>
        <div className="info-item">
          <h2>Cantidad</h2>
          <span>{formatAmount(singleTransaction?.monto)}</span>
        </div>
        <div className="info-item">
          <h2>Tipo</h2>
          <span>{singleTransaction?.tipo}</span>
        </div>
        <div className="info-item">
          <h2>Categoria</h2>
          <span>{singleTransaction?.categoria}</span>
        </div>
      </div>
    </TransactionContainer>
  );
};

export default Transaction;
