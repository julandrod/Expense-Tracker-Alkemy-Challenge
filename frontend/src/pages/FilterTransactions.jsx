import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { TransactionsList } from "../components";
import { selectAuthState } from "../features/authSlice";
import {
  getAllTransactions,
  selectTransactionsState,
} from "../features/transactionsSlice";

const FilterContainer = styled.section`
  flex: 4;
  padding: 2rem;
  h1{
    margin-bottom: 2rem;
  }
`;

const FilterTransactions = () => {
  const { type } = useParams();
  const dispatch = useDispatch();
  const { token } = useSelector(selectAuthState);
  const { transactions, quantity } = useSelector(selectTransactionsState);

  useEffect(() => {
    dispatch(getAllTransactions({ token, type }));
  }, [dispatch, token, type]);

  return (
    <FilterContainer className="transactions-container">
      <h1 className="title box-shadow">{`Listado de ${type}s`}</h1>

      <h2>Ultimas transacciones</h2>
      <TransactionsList
        transactions={transactions}
        quantity={quantity}
        token={token}
      />
    </FilterContainer>
  );
};

export default FilterTransactions;
