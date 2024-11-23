import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";
import products from "../data/products.json";

const Products = ({ addToCart }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [customOptions, setCustomOptions] = useState({});
  const [customPrice, setCustomPrice] = useState(0);

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setCustomPrice(product.price); // Precio base
    setCustomOptions({});
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setCustomOptions({});
    setCustomPrice(0);
  };

  const handleOptionChange = (optionType, value) => {
    setCustomOptions((prevOptions) => ({
      ...prevOptions,
      [optionType]: value
    }));
  };

  const handleAddOnChange = (priceChange) => {
    setCustomPrice((prevPrice) => prevPrice + priceChange);
  };

  const handleAddToCart = () => {
    const finalProduct = {
      ...selectedProduct,
      price: customPrice,
      options: customOptions
    };
    addToCart(finalProduct);
    handleCloseModal();
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center">Nuestros Productos</h2>
      <Row>
        {products.map((product) => (
          <Col key={product.id} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Button variant="primary" onClick={() => handleOpenModal(product)}>
                  Configurar
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal de Configuración */}
      {selectedProduct && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduct.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{selectedProduct.description}</p>
            <Form>
              {/* Configuración para Armazones */}
              {(selectedProduct.type === "armazon" || selectedProduct.type === "combinado") && (
                <>
                  <Form.Group>
                    <Form.Label>Estilo de Armazón</Form.Label>
                    <Form.Select
                      onChange={(e) => handleOptionChange("armazonStyle", e.target.value)}
                    >
                      <option value="">Seleccionar Estilo</option>
                      {selectedProduct.options.armazon.styles.map((style, index) => (
                        <option key={index} value={style}>
                          {style}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mt-3">
                    <Form.Label>Color</Form.Label>
                    <Form.Select
                      onChange={(e) => handleOptionChange("armazonColor", e.target.value)}
                    >
                      <option value="">Seleccionar Color</option>
                      {selectedProduct.options.armazon.colors.map((color, index) => (
                        <option key={index} value={color}>
                          {color}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mt-3">
                    <Form.Label>Material</Form.Label>
                    <Form.Select
                      onChange={(e) => handleOptionChange("armazonMaterial", e.target.value)}
                    >
                      <option value="">Seleccionar Material</option>
                      {selectedProduct.options.armazon.materials.map((material, index) => (
                        <option key={index} value={material}>
                          {material}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </>
              )}

              {/* Configuración para Cristales */}
              {(selectedProduct.type === "cristales" || selectedProduct.type === "combinado") && (
                <>
                  <Form.Group className="mt-3">
                    <Form.Label>Corrección Visual</Form.Label>
                    <Form.Select
                      onChange={(e) => handleOptionChange("cristalCorrection", e.target.value)}
                    >
                      <option value="">Seleccionar Corrección</option>
                      {selectedProduct.options.cristales.corrections.map((correction, index) => (
                        <option key={index} value={correction}>
                          {correction}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mt-3">
                    <Form.Label>Extras</Form.Label>
                    {selectedProduct.options.cristales.addOns.map((addOn, index) => (
                      <Form.Check
                        key={index}
                        type="checkbox"
                        label={`${addOn.name} (+$${addOn.price})`}
                        onChange={(e) =>
                          handleAddOnChange(e.target.checked ? addOn.price : -addOn.price)
                        }
                      />
                    ))}
                  </Form.Group>
                </>
              )}
            </Form>
            <h5 className="mt-3">Precio Total: ${customPrice}</h5>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
            <Button variant="success" onClick={handleAddToCart}>
              Agregar al Carrito
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default Products;
