import React, { useState } from "react";
import { Button, ListGroup, ListGroupItem } from "react-bootstrap";

const Cart = ({ cartItems, onRemoveItem }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-3 bg-light border rounded">
      <h5>Carrito</h5>
      {cartItems.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <ListGroup>
          {cartItems.map((item) => (
            <ListGroupItem key={item.id} className="d-flex justify-content-between align-items-center">
              <div>
                <strong>{item.name}</strong> <br />
                <small>Cantidad: {item.quantity}</small>
              </div>
              <div>
                <Button variant="danger" size="sm" onClick={() => onRemoveItem(item.id)}>
                  Eliminar
                </Button>
              </div>
            </ListGroupItem>
          ))}
        </ListGroup>
      )}
      {cartItems.length > 0 && (
        <div className="mt-3">
          <h6>Total: ${total}</h6>
          <Button variant="success" href="/checkout">
            Ir al Checkout
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
