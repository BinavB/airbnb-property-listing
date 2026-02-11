import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../App';
import { useAuth } from '../contexts/AuthContext';
import { 
  Container, Row, Col, Card, Form, Button, Badge, Modal, 
  Spinner, Alert, InputGroup 
} from 'react-bootstrap';

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    city: '',
    property_type: '',
    agent_id: ''
  });
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [agentPrice, setAgentPrice] = useState('');
  const [priceLoading, setPriceLoading] = useState(false);
  const { token, agent } = useAuth();

  useEffect(() => {
    fetchProperties();
    if (token) {
      fetchAgents();
    }
  }, [filters, token]);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value);
      });

      const response = await fetch(`${API_BASE_URL}/properties?${queryParams}`);
      const data = await response.json();
      setProperties(data.data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAgents = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/agents`);
      const data = await response.json();
      setAgents(data || []);
    } catch (error) {
      console.error('Error fetching agents:', error);
    }
  };

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handlePriceUpdate = async () => {
    if (!selectedProperty || !agentPrice) return;

    setPriceLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/agent-properties`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          property_id: selectedProperty.id,
          agent_price: parseFloat(agentPrice)
        }),
      });

      if (response.ok) {
        setShowPriceModal(false);
        setSelectedProperty(null);
        setAgentPrice('');
        fetchProperties();
      }
    } catch (error) {
      console.error('Error updating price:', error);
    } finally {
      setPriceLoading(false);
    }
  };

  const openPriceModal = (property) => {
    setSelectedProperty(property);
    setAgentPrice(property.price_type === 'agent_price' ? property.price : '');
    setShowPriceModal(true);
  };

  const cities = [...new Set(properties.map(p => p.city))];
  const propertyTypes = [...new Set(properties.map(p => p.property_type))];

  return (
    <Container fluid className="py-4">
      <Row>
        {/* Filters Sidebar */}
        <Col md={3} className="mb-4">
          <div className="filter-sidebar">
            <h5 className="mb-4">Filters</h5>
            
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Select
                value={filters.city}
                onChange={(e) => handleFilterChange('city', e.target.value)}
              >
                <option value="">All Cities</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Property Type</Form.Label>
              <Form.Select
                value={filters.property_type}
                onChange={(e) => handleFilterChange('property_type', e.target.value)}
              >
                <option value="">All Types</option>
                {propertyTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </Form.Select>
            </Form.Group>

            {token && (
              <Form.Group className="mb-3">
                <Form.Label>Agent</Form.Label>
                <Form.Select
                  value={filters.agent_id}
                  onChange={(e) => handleFilterChange('agent_id', e.target.value)}
                >
                  <option value="">No Agent Filter</option>
                  {agents.map(agent => (
                    <option key={agent.id} value={agent.id}>{agent.name}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            )}

            <Button 
              variant="outline-secondary" 
              className="w-100"
              onClick={() => setFilters({ city: '', property_type: '', agent_id: '' })}
            >
              Clear Filters
            </Button>
          </div>
        </Col>

        {/* Property Grid */}
        <Col md={9}>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <Row>
              {properties.map(property => (
                <Col md={6} lg={4} className="mb-4" key={property.id}>
                  <Card className="property-card h-100">
                    <div className="position-relative">
                      {property.primary_image ? (
                        <Card.Img 
                          variant="top" 
                          src={property.primary_image.image_url} 
                          className="property-image"
                        />
                      ) : (
                        <div className="property-image bg-light d-flex align-items-center justify-content-center">
                          <span className="text-muted">No Image</span>
                        </div>
                      )}
                      <div className="price-badge">
                        ${property.price}/night
                      </div>
                      {property.agent && (
                        <Badge className="agent-badge position-absolute" style={{ top: '10px', left: '10px' }}>
                          {property.agent.name}
                        </Badge>
                      )}
                    </div>
                    
                    <Card.Body>
                      <Card.Title className="h6">{property.title}</Card.Title>
                      <Card.Text className="text-muted small mb-2">
                        📍 {property.city} • {property.property_type}
                      </Card.Text>
                      
                      <div className="d-flex justify-content-between align-items-center">
                        <Badge bg={property.price_type === 'agent_price' ? 'success' : 'primary'}>
                          {property.price_type === 'agent_price' ? 'Agent Price' : 'Base Price'}
                        </Badge>
                        
                        {token && (
                          <Button 
                            size="sm" 
                            variant="outline-primary"
                            onClick={() => openPriceModal(property)}
                          >
                            {property.price_type === 'agent_price' ? 'Update Price' : 'Set Price'}
                          </Button>
                        )}
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}

          {!loading && properties.length === 0 && (
            <Alert variant="info">
              No properties found matching your criteria.
            </Alert>
          )}
        </Col>
      </Row>

      {/* Price Modal */}
      <Modal show={showPriceModal} onHide={() => setShowPriceModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedProperty?.price_type === 'agent_price' ? 'Update' : 'Set'} Agent Price
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProperty && (
            <div>
              <p><strong>Property:</strong> {selectedProperty.title}</p>
              <p><strong>Base Price:</strong> ${selectedProperty.base_price}/night</p>
              
              <Form.Group className="mb-3">
                <Form.Label>Your Agent Price</Form.Label>
                <InputGroup>
                  <InputGroup.Text>$</InputGroup.Text>
                  <Form.Control
                    type="number"
                    step="0.01"
                    min="0"
                    value={agentPrice}
                    onChange={(e) => setAgentPrice(e.target.value)}
                    placeholder="Enter your price"
                  />
                  <InputGroup.Text>/night</InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPriceModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={handlePriceUpdate}
            disabled={priceLoading || !agentPrice}
          >
            {priceLoading ? (
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

export default PropertyList;
