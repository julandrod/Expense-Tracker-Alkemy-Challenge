import React, { useEffect, useState } from "react";
import FormInput from "../components/FormInput";
import { useDispatch, useSelector } from "react-redux";
import { selectAuthState, setupUser } from "../features/authSlice";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const Login = () => {
  const [userValues, setUserValues] = useState({
    name: "",
    email: "",
    password: "",
    isLogin: true,
  });

  const dispatch = useDispatch();
  const { userInfo, userLoading, errorInfo } = useSelector(selectAuthState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserValues({ ...userValues, [e.target.name]: e.target.value });
  };

  const toggleLogin = () => {
    setUserValues({ ...userValues, isLogin: !userValues.isLogin });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (userValues.isLogin) {
      dispatch(setupUser({ dataUser: userValues, endpoint: "login" }));
    } else {
      dispatch(setupUser({ dataUser: userValues, endpoint: "register" }));
    }
  };

  useEffect(() => {
    if (errorInfo) {
      swal({
        text: errorInfo,
        icon: "warning",
        timer: 3000,
        buttons: false,
      });
    }
  }, [errorInfo]);

  if (userInfo) {
    const textAlert =
      (userValues.isLogin ? "!Ingreso exitoso!" : "!Usuario creado!") +
      "Regresando a la aplicación";
    swal({
      text: textAlert,
      icon: "success",
      timer: 3000,
      buttons: false,
    });
  }

  useEffect(() => {
    if (userInfo) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [navigate, userInfo]);

  return (
    <LoginWrapper>
      <form className="form" onSubmit={onSubmit}>
        <h3>{userValues.isLogin ? "Ingresar" : "Registrarse"}</h3>
        {!userValues.isLogin && (
          <>
            <FormInput
              type="text"
              value={userValues.name}
              name="name"
              labelText="Nombre"
              placeholder="Nombre"
              handleChange={handleChange}
            />
          </>
        )}
        <FormInput
          type="email"
          value={userValues.email}
          name="email"
          placeholder="email"
          handleChange={handleChange}
        />
        <FormInput
          type="password"
          value={userValues.password}
          name="password"
          placeholder="Password"
          handleChange={handleChange}
        />
        <button type="submit" className="btn" disabled={userLoading}>
          {userValues.isLogin ? "Ingresar" : "Crear cuenta"}
        </button>
        <p>
          {userValues.isLogin
            ? "¿No estas registrado? "
            : "Ya tienes una cuenta "}
          <button type="button" className="login-btn" onClick={toggleLogin}>
            {userValues.isLogin ? " Crear cuenta" : " Ingresar"}
          </button>
        </p>
      </form>
    </LoginWrapper>
  );
};

const LoginWrapper = styled.section`
  min-height: calc(100vh - var(--navbar-height));
  width: 100vw;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  .form {
    border-top: 5px solid orange;
    justify-content: center;
    display: flex;
    flex-direction: column;
    width: 30%;
  }
  h3 {
    text-align: center;
    margin: 1rem 0;
  }
  p {
    margin: 0;
    margin-top: 1rem;
    text-align: center;
  }
  .btn {
    margin-top: 1rem;
  }
  .login-btn {
    font-size: 1rem;
    background: transparent;
    border: transparent;
    color: red;
    cursor: pointer;
  }
`;

export default Login;
