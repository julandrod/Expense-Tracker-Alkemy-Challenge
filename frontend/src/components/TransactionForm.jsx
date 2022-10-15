import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import FormInput from "./FormInput";

const TransactionFormContainer = styled.section`
  flex: 4;
  padding: 2rem;
  .form-container {
    border-bottom: 2px solid var(--dark-green);
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 70%;
    margin: 2rem auto;
  }
  .newT-form {
    width: 70%;
  }
  .type-transaction {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.875rem;
    margin: 0.5rem;
  }
  .radio-button {
    display: flex;
    margin: 0.2rem;
  }
  .action-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }
  .cancel {
    background: red;
    margin-left: 3rem;
  }
`;

const TransactionForm = ({ onSubmit, data, handleChange, isNew }) => {
  return (
    <TransactionFormContainer>
      <h1 className="title box-shadow">
        {isNew ? "Crear nueva transacción" : "Actualizar transacción"}
      </h1>
      <div className="form-container box-shadow">
        <form className="newT-form" onSubmit={onSubmit}>
          <FormInput
            type="text"
            name="concepto"
            placeholder="concepto"
            value={data.concepto}
            handleChange={handleChange}
            labelText="Concepto"
          />
          <FormInput
            type="number"
            name="monto"
            placeholder="monto"
            value={data.monto}
            handleChange={handleChange}
            labelText="Monto"
          />
          <FormInput
            type="text"
            name="categoria"
            placeholder="categoria"
            value={data.categoria}
            handleChange={handleChange}
            labelText="Categoria"
          />
          {isNew && (
            <div className="type-transaction">
              <span>Tipo de transacción</span>
              <div className="radio-button">
                <input
                  type="radio"
                  id="egreso"
                  name="tipo"
                  value="egreso"
                  onClick={handleChange}
                />
                <label htmlFor="egreso">Egreso</label>
              </div>
              <div className="radio-button">
                <input
                  type="radio"
                  id="ingreso"
                  name="tipo"
                  value="ingreso"
                  onClick={handleChange}
                />
                <label htmlFor="ingreso">Ingreso</label>
              </div>
            </div>
          )}
          <div className="action-buttons">
            <button className="btn" type="submit">
              Crear
            </button>
            <NavLink to="/">
              <button className="btn cancel">Cancelar</button>
            </NavLink>
          </div>
        </form>
      </div>
    </TransactionFormContainer>
  );
};

export default TransactionForm;
