import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../App';
import { useAuth } from '../contexts/AuthContext';
import { 
  Container, Card, Row, Col, Badge, Button, Modal, Form,
  Spinner, Alert, Table 
} from 'react-bootstrap';

const AgentDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [agentProperties, setAgentProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [agentPrice, setAgentPrice] = useState('');
  const [modalLoading, setModalLoading] = useState(false);
  const { agent } = useAuth();

  useEffect(() => {
    fetchProperties();
    fetchAgentProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/properties`);
      const data = await response.json();
      setProperties(data.data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAgentProperties = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/agent-properties`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('agent_token')}`,
        },
      });
      const data = await response.json();
      setAgentProperties(data.data || []);
    } catch (error) {
      console.error('Error fetching agent properties:', error);
    }
  };

  const handlePriceAction = (property) => {
    const existingPrice = agentProperties.find(ap => ap.property_id === property.id);
    setSelectedProperty(property);
    setAgentPrice(existingPrice ? existingPrice.agent_price : '');
    setShowModal(true);
  };

  const handleSavePrice = async () => {
    if (!selectedProperty || !agentPrice) return;

    setModalLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/agent-properties`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('agent_token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          property_id: selectedProperty.id,
          agent_price: parseFloat(agentPrice)
        }),
      });

      if (response.ok) {
        setShowModal(false);
        setSelectedProperty(null);
        setAgentPrice('');
        fetchAgentProperties();
      }
    } catch (error) {
      console.error('Error saving price:', error);
    } finally {
      setModalLoading(false);
    }
  };

  const hasAgentPrice = (propertyId) => {
    return agentProperties.some(ap => ap.property_id === propertyId);
  };

  const getAgentPrice = (propertyId) => {
    const agentProp = agentProperties.find(ap => ap.property_id === propertyId);
    return agentProp ? agentProp.agent_price : null;
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Agent Dashboard</h2>
        <div>
          <Badge bg="success" className="me-2">Welcome, {agent?.name}</Badge>
          <Badge bg="info">{agentProperties.length} Properties Priced</Badge>
        </div>
      </div>

      <Card className="mb-4">
        <Card.Header>
          <h5 className="mb-0">All Properties</h5>
        </Card.Header>
        <Card.Body>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Property</th>
                <th>City</th>
                <th>Type</th>
                <th>Base Price</th>
                <th>Your Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {properties.map(property => {
                const hasPrice = hasAgentPrice(property.id);
                const agentPriceValue = getAgentPrice(property.id);
                
                return (
                  <tr key={property.id}>
                    <td>
                      <div>
                        <strong>{property.title}</strong>
                        {property.primary_image && (
                          <div className="small text-muted">
                            <img 
                              src={property.primary_image.image_url} 
                              alt={property.title}
                              style={{ width: '40px', height: '30px', objectFit: 'cover' }}
                              className="me-2"
                            />
                            Has Image
                          </div>
                        )}
                      </div>
                    </td>
                    <td>{property.city}</td>
                    <td>{property.property_type}</td>
                    <td>${property.base_price}/night</td>
                    <td>
                      {hasPrice ? (
                        <Badge bg="success">${agentPriceValue}/night</Badge>
                      ) : (
                        <Badge bg="secondary">Not Set</Badge>
                      )}
                    </td>
                    <td>
                      {hasPrice ? (
                        <Badge bg="success">Priced</Badge>
                      ) : (
                        <Badge bg="warning">No Price</Badge>
                      )}
                    </td>
                    <td>
                      <Button
                        size="sm"
                        variant={hasPrice ? "outline-primary" : "primary"}
                        onClick={() => handlePriceAction(property)}
                      >
                        {hasPrice ? 'Update Price' : 'Add Price'}
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          {properties.length === 0 && (
            <Alert variant="info">
              No properties available.
            </Alert>
          )}
        </Card.Body>
      </Card>

      {/* Price Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {hasAgentPrice(selectedProperty?.id) ? 'Update' : 'Add'} Agent Price
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProperty && (
            <div>
              <p><strong>Property:</strong> {selectedProperty.title}</p>
              <p><strong>Base Price:</strong> ${selectedProperty.base_price}/night</p>
              
              <Form.Group className="mb-3">
                <Form.Label>Your Agent Price (per night)</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  min="0"
                  value={agentPrice}
                  onChange={(e) => setAgentPrice(e.target.value)}
                  placeholder="Enter your price"
                />
                <Form.Text className="text-muted">
                  This is the price customers will see when filtered by you.
                </Form.Text>
              </Form.Group>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handleSavePrice}
            disabled={modalLoading || !agentPrice}
          >
            {modalLoading ? (
              <Spinner as="span" animation="border" size="sm" />
            ) : (
              'Save Price'
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AgentDashboard;
