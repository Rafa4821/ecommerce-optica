import React from "react";
import { Container, Button } from "react-bootstrap";

const Home = () => {
  return (
    <Container className="d-flex flex-column align-items-center justify-content-center text-center min-vh-100">
      <h1>Bienvenido a la Óptica</h1>
      <p className="mb-4">Encuentra los mejores lentes y productos para tu visión.</p>
      <Button variant="primary" href="/products">
        Ver Productos
      </Button>
    </Container>
  );
};

export default Home;
