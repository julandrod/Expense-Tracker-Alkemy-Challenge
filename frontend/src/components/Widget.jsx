import styled from "styled-components";
import { formatAmount } from "../utils/formatAmount";

const WidgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 0.5rem;
  margin: 1rem;
  -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.877);
  box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.466);
  width: 200px;
  height: 100px;
  border-radius: 10px;

  h3 {
    width: 100%;
    color: #2c3333;
    &.expenses {
      border-bottom: 10px solid red;
    }
    &.income {
      border-bottom: 10px solid green;
    }
    &.balance {
      border-bottom: 10px solid blue;
    }
  }

  .amount-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100% ;
    span {
      width: 100%;
      font-size: 1.5rem;
      text-align: left;
    }
    svg {
      font-size: 2rem;
    }
  }
`;

const Widget = ({ title, amount, type, icon }) => {
  amount = formatAmount(amount);

  return (
    <WidgetContainer>
      <h3 className={`${type}`}>{title}</h3>
      <div className="amount-container">
        <span>{amount}</span>
        {icon}
      </div>
    </WidgetContainer>
  );
};

export default Widget;
