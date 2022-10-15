import React, { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import { formatAmount } from "../utils/formatAmount";
import { formatDate } from "../utils/formatDate";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  deleteSingleTransaction,
  getAllTransactions,
} from "../features/transactionsSlice";
import swal from "sweetalert";
import Loading from "./Loading";

const GridContainer = styled.div`
  .datagrid {
    height: 500px;
    padding: 20px;
  }
  .amount-container {
    display: flex;
    width: 95%;
    align-items: center;
    justify-content: end;
  }
  .type {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 30px;
    width: 100%;
    border: none;
    border-radius: 10px;
    padding: 5px 10px;
    color: white;
    margin-right: 20px;
  }
  .ingreso {
    background: green;
  }
  .egreso {
    background: red;
  }
  .button-transaction {
    border: none;
    height: 30px;
    width: 45%;
    border-radius: 10px;
    font-size: 0.7rem;
    padding: 5px 10px;
    cursor: pointer;
    margin-right: 20px;
    font-weight: bold;
  }
  .edit {
    color: green;
  }
  .delete {
    color: red;
  }
`;

const TransactionsList = ({token, transactions, quantity, transactionLoading}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTransactions({ token }));
  }, [dispatch, token]);

  const handleDelete = (id) => {
    swal({
      title: "¿Desea eliminar esta transacción?",
      text: "Una vez eliminada no se podra recuperar!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        dispatch(deleteSingleTransaction({ token, id }));
        swal({
          title: "Transaccion borrada exitosamente!",
          text: "Regresando a la aplicación",
          icon: "success",
          timer: 2000,
          buttons: false,
        });
        setTimeout(() => {
          window.location.reload();
        }, "3000");
      }
    });
  };

  const columns = [
    {
      field: "transactionId",
      headerName: "ID",
      width: 100,
      renderCell: (params) => {
        return <span>{params.row.transactionid.slice(0, 8)}...</span>;
      },
    },
    {
      field: "concepto",
      headerName: "Concepto",
      width: 150,
    },
    {
      field: "categoria",
      headerName: "Categoria",
      width: 150,
    },
    {
      field: "tipo",
      headerName: "Tipo",
      width: 110,
      renderCell: (params) => {
        return (
          <div className={`type ${params.row.tipo}`}>
            <span>{params.row.tipo}</span>
          </div>
        );
      },
    },
    {
      field: "monto",
      headerName: "Cantidad",
      width: 135,
      renderCell: (params) => {
        return (
          <div className="amount-container">
            <span>{formatAmount(params.row.monto)}</span>
          </div>
        );
      },
    },
    {
      field: "fecha",
      headerName: "Fecha",
      width: 120,
      renderCell: (params) => {
        return <span>{formatDate(params.row.fecha)}</span>;
      },
    },
    {
      field: "action",
      headerName: "Acciones",
      width: 160,
      renderCell: (params) => {
        return (
          <>
            <button className="button-transaction edit">
              <NavLink to={`/transactions/${params.row.transactionid}`}>
                <span>Ver/Editar</span>
              </NavLink>
            </button>
            <button
              className="button-transaction delete"
              onClick={() => handleDelete(params.row.transactionid)}
            >
              <span>Eliminar</span>
            </button>
          </>
        );
      },
    },
  ];

  if (transactionLoading) {
    return <Loading />;
  }

  return (
    <GridContainer>
      {quantity > 0 ? (
        <DataGrid
          className="datagrid"
          rows={transactions}
          columns={columns}
          disableSelectionOnClick
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(row) => row.transactionid}
        />
      ) : (
        <h1>No hay transacciones para mostrar</h1>
      )}
    </GridContainer>
  );
};

export default TransactionsList;
