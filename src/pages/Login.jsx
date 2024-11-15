import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate, useLocation } from "react-router-dom";

/////////////////////////////////////////////////////////// REDUX

import { useSelector, useDispatch } from "react-redux";

///////////////////////////////////////////////////////////

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
`;

const LoginBox = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 40px 30px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:focus {
    border-color: #2575fc;
    outline: none;
    box-shadow: 0 0 5px rgba(37, 117, 252, 0.5);
  }
`;

const Button = styled.button`
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #2575fc, #6a11cb);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 14px;
  text-align: center;
`;

const LoginPage = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  ///////////////////////////////////////////////////////////

  const backendEndpoint = useSelector(
    (state) => state.backendEndpoint.endpoint
  );

  ///////////////////////////////////////////////////////////

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    setError("");
    const { data } = await axios.post(`${backendEndpoint}/api/auth/login`, {
      email: email,
      password: password,
    });
    login(data);
  };
  ///////////////////////////////////////////////////////////

  function login(data) {
    if (data.success === "true" && data.access) {
      cookies.set("access_token", data.access, {
        path: "/",
        expires: new Date(Date.now() + 2592000),
      });
      cookies.set("refresh_token", data.refresh, {
        path: "/",
        expires: new Date(Date.now() + 2592000),
      });
      navigate("/");
    } else if (data.success === "false") {
      alert(data.message);
    }
  }

  ///////////////////////////////////////////////////////////

  return (
    <Container>
      <LoginBox>
        <Title>Login</Title>
        <Form onSubmit={handleLogin}>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit">Login</Button>
        </Form>
      </LoginBox>
    </Container>
  );
};

export default LoginPage;
