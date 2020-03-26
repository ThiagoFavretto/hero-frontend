import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";

import api from "../../services/api";
import { Container, FormContainer, Form } from "./styles";

import logo from "../../assets/logo.svg";
import heroesImg from "../../assets/heroes.png";

const Logon = () => {
  const history = useHistory();
  const [id, setId] = useState("");

  const handleLogin = async e => {
    e.preventDefault();

    try {
      const response = await api.post("/sessions", { id });

      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", response.data.name);
      history.push("/profile");
    } catch (err) {
      alert("Falha no login");
    }
  };

  return (
    <Container>
      <FormContainer>
        <img src={logo} alt="Be the hero" />

        <Form onSubmit={handleLogin}>
          <h1>Faça seus logon</h1>
          <input
            placeholder="Seu ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button type="submit" className="button">
            Entrar
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </Form>
      </FormContainer>

      <img src={heroesImg} alt="Heroes" />
    </Container>
  );
};

export default Logon;
