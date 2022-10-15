import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuthState } from "./features/authSlice";
import styled from "styled-components";
import {
  EditTransaction,
  Error,
  FilterTransactions,
  Home,
  Landing,
  Login,
  NewTransaction,
  ProtectedRoute,
  Transaction,
} from "./pages";
import { Navbar, Sidebar, SmallSidebar } from "./components";

const AppContainer = styled.section`
  display: flex;
  justify-content: center;
`;

function App() {
  const { userInfo } = useSelector(selectAuthState);

  return (
    <BrowserRouter>
      <Navbar />
      <AppContainer>
        {userInfo && (
          <>
            <Sidebar />
            <SmallSidebar />
          </>
        )}
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactions/:id"
            element={
              <ProtectedRoute>
                <Transaction />
              </ProtectedRoute>
            }
          />
          <Route
            path="/newTransaction"
            element={
              <ProtectedRoute>
                <NewTransaction />
              </ProtectedRoute>
            }
          />
          <Route
            path="/editTransaction/:id"
            element={
              <ProtectedRoute>
                <EditTransaction />
              </ProtectedRoute>
            }
          />
          <Route
            path="/filterTransactions/:type"
            element={
              <ProtectedRoute>
                <FilterTransactions />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </AppContainer>
    </BrowserRouter>
  );
}

export default App;
