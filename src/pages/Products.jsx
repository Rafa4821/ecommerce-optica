import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Modal, Form } from "react-bootstrap";

const Products = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    od: { esfera: "", cilindro: "", eje: "" },
    oi: { esfera: "", cilindro: "", eje: "" },
    dp: "",
    add: "",
    treatments: [],
    lensType: "",
    crystalType: "",
    prescriptionImage: null,
  });

  useEffect(() => {
    const baseUrl = import.meta.env.BASE_URL; // Detecta automáticamente la base del proyecto
    fetch(`${baseUrl}products.json`) // Ajusta la ruta al entorno actual
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar los productos.");
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error cargando productos:", error));
  }, []);
  

  const handleOpenModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
    setFormData({
      od: { esfera: "", cilindro: "", eje: "" },
      oi: { esfera: "", cilindro: "", eje: "" },
      dp: "",
      add: "",
      treatments: [],
      lensType: "",
      crystalType: "",
      prescriptionImage: null,
    });
  };

  const handleInputChange = (e, field, subfield = null) => {
    if (subfield) {
      setFormData((prev) => ({
        ...prev,
        [field]: {
          ...prev[field],
          [subfield]: e.target.value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    }
  };

  const handleTreatmentChange = (e, treatment) => {
    setFormData((prev) => {
      const treatments = prev.treatments.includes(treatment)
        ? prev.treatments.filter((t) => t !== treatment)
        : [...prev.treatments, treatment];
      return { ...prev, treatments };
    });
  };

  const handleImageUpload = (e) => {
    setFormData((prev) => ({
      ...prev,
      prescriptionImage: e.target.files[0],
    }));
  };

  const handleAddToCart = () => {
    const finalProduct = {
      ...selectedProduct,
      customizations: { ...formData },
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

      {/* Modal */}
      {selectedProduct && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Configurar {selectedProduct.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <h5>Receta Oftalmológica</h5>
              {selectedProduct.options.recipeFields.requiresPrescriptionImage && (
                <Form.Group>
                  <Form.Label>Sube una foto de la receta</Form.Label>
                  <Form.Control type="file" onChange={handleImageUpload} />
                </Form.Group>
              )}

              {selectedProduct.options.recipeFields.fields.map((field, index) => (
                <Form.Group key={index} className="mt-3">
                  <Form.Label>{field}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={`Ingresa ${field}`}
                    onChange={(e) => handleInputChange(e, field.toLowerCase())}
                  />
                </Form.Group>
              ))}

              <h5 className="mt-3">Tratamientos</h5>
              {selectedProduct.options.cristales.addOns.map((addOn, index) => (
                <Form.Check
                  key={index}
                  type="checkbox"
                  label={`${addOn.name} (+$${addOn.price})`}
                  onChange={(e) => handleTreatmentChange(e, addOn.name)}
                />
              ))}

              <h5 className="mt-3">Tipo de Cristal</h5>
              <Form.Select onChange={(e) => handleInputChange(e, "crystalType")}>
                <option value="">Selecciona el tipo de cristal</option>
                {selectedProduct.options.cristales.types.map((type, index) => (
                  <option key={index} value={type}>
                    {type}
                  </option>
                ))}
              </Form.Select>

              <h5 className="mt-3">Diseño de Cristal</h5>
              <Form.Select onChange={(e) => handleInputChange(e, "lensType")}>
                <option value="">Selecciona el diseño</option>
                {selectedProduct.options.cristales.designs.map((design, index) => (
                  <option key={index} value={design}>
                    {design}
                  </option>
                ))}
              </Form.Select>
            </Form>
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
