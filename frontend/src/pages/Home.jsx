import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Widget from "../components/Widget";
import { selectAuthState } from "../features/authSlice";
import {
  getAllTransactions,
  selectTransactionsState,
} from "../features/transactionsSlice";
import { MdMoneyOff, MdAccountBalance } from "react-icons/md";
import { GiMoneyStack } from "react-icons/gi";
import TransactionsList from "../components/TransactionsList";

const HomeContainer = styled.main`
  flex: 4;
  padding-top: 2rem;
  display: flex;
  flex-direction: column;
  .widget-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
      justify-content: space-around;
    }
  }
  /* .transactions-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 2rem;
  } */
`;

const Home = () => {
  const { token } = useSelector(selectAuthState);
  const { transactions, quantity, totalExpenses, totalIncome, balance } =
    useSelector(selectTransactionsState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTransactions({ token }));
  }, [dispatch, token]);

  return (
    <HomeContainer>
      <div className="widget-container">
        <Widget
          title="Total gastos"
          amount={totalExpenses}
          type="expenses"
          icon={<MdMoneyOff />}
        />
        <Widget
          title="Total ingresos"
          amount={totalIncome}
          type="income"
          icon={<GiMoneyStack />}
        />
        <Widget
          title="Balance"
          amount={balance}
          type="balance"
          icon={<MdAccountBalance />}
        />
      </div>
      <div className="transactions-container">
        <h2>Ultimas transacciones</h2>
        <TransactionsList transactions={transactions} quantity={quantity} token={token} />
      </div>
    </HomeContainer>
  );
};

export default Home;
