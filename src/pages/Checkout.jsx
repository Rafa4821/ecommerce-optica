import React from "react";
import { Container, Row, Col, Form, Button, ListGroup } from "react-bootstrap";

const Checkout = ({ cartItems }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Container className="mt-5">
      <h2>Checkout</h2>
      <Row>
        <Col md={6}>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Nombre Completo</Form.Label>
              <Form.Control type="text" placeholder="Ingresa tu nombre" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control type="email" placeholder="Ingresa tu correo" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Dirección</Form.Label>
              <Form.Control type="text" placeholder="Ingresa tu dirección" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control type="text" placeholder="Ingresa tu teléfono" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Confirmar Pedido
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          <h5>Resumen de tu Pedido</h5>
          {cartItems.length === 0 ? (
            <p>No tienes productos en tu carrito.</p>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item.id}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      {item.name} <br />
                      <small>Cantidad: {item.quantity}</small>
                    </div>
                    <div>${item.price * item.quantity}</div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
          <h6 className="mt-3">Total: ${total}</h6>
        </Col>
      </Row>
    </Container>
  );
};

export default Checkout;
