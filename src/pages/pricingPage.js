import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { washTypes, additionalServices } from "../functions/washData";

function PricingPage() {
  return (
    <Container className="py-5">
      <h1 className="text-center text-warning mb-5 fw-bold text-shadow">
        Pricing
      </h1>

      {/* Wash Types */}
      <Row className="g-4">
        {washTypes.map((wash, idx) => (
          <Col key={idx} xs={12} sm={6} md={4}>
            <Card
              className="h-100 border-0 rounded-4 shadow-lg bg-light"
              style={{ transition: "transform 0.3s ease" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-6px)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title className="fw-bold fs-4">{wash.name}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted fs-5">
                    ZAR {wash.price.toFixed(2)}
                  </Card.Subtitle>
                  <Card.Text className="text-secondary">{wash.details}</Card.Text>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Additional Services */}
      <h2 className="text-center text-primary mt-5 mb-4 fw-semibold text-shadow">
        Additional Services
      </h2>

      <Row className="g-4">
        {additionalServices.map((service, idx) => (
          <Col key={idx} xs={12} sm={6} md={4}>
            <Card
              className="h-100 border-0 rounded-4 shadow-lg bg-light"
              style={{ transition: "transform 0.3s ease" }}
              onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-6px)")}
              onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}
            >
              <Card.Body className="d-flex flex-column justify-content-center align-items-center text-center">
                <Card.Title className="fw-bold fs-5">{service.name}</Card.Title>
                <Card.Subtitle className="text-muted fs-6">
                  ZAR {service.price.toFixed(2)}
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default PricingPage;
