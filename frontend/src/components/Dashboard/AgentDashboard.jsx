import React, { useState } from 'react';
import { Container, Card, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import PropertyCard from '../Home/PropertyCard';

const AgentDashboard = () => {
    const [showPriceModal, setShowPriceModal] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [newPrice, setNewPrice] = useState('');
    const { user, userProperties, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handlePriceUpdate = (property) => {
        setSelectedProperty(property);
        setNewPrice(property.price.toString());
        setShowPriceModal(true);
    };

    const handlePriceSave = () => {
        if (selectedProperty && newPrice) {
            // This would normally update via API
            console.log('Updated price for property', selectedProperty.id, 'to', newPrice);
            setShowPriceModal(false);
            setSelectedProperty(null);
            setNewPrice('');
        }
    };

    return (
        <>
            {/* Agent Dashboard Header */}
            <div className="bg-white border-bottom">
                <Container>
                    <div className="d-flex justify-content-between align-items-center py-3">
                        <div>
                            <h2 className="mb-0 fw-bold">Agent Dashboard</h2>
                            <p className="mb-0 text-muted">Welcome back, {user?.name}</p>
                        </div>
                        <Button variant="outline-danger" onClick={handleLogout}>
                            <i className="bi bi-box-arrow-right me-2"></i>
                            Logout
                        </Button>
                    </div>
                </Container>
            </div>

            {/* Navigation Cards */}
            <Container className="py-5">
                <Row className="g-4 mb-5">
                    <Col md={4}>
                        <Card className="h-100 border-0 shadow-sm">
                            <Card.Body className="text-center p-4">
                                <div className="mb-3">
                                    <i className="bi bi-house-door fs-1 text-primary"></i>
                                </div>
                                <h5 className="fw-bold mb-3">My Properties</h5>
                                <p className="text-muted mb-4">Manage your property listings</p>
                                <Button 
                                    variant="danger" 
                                    className="rounded-pill px-4"
                                    onClick={() => navigate('/')}
                                >
                                    View Properties
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="h-100 border-0 shadow-sm">
                            <Card.Body className="text-center p-4">
                                <div className="mb-3">
                                    <i className="bi bi-star fs-1 text-warning"></i>
                                </div>
                                <h5 className="fw-bold mb-3">Experiences</h5>
                                <p className="text-muted mb-4">Browse available experiences</p>
                                <Button 
                                    variant="outline-danger" 
                                    className="rounded-pill px-4"
                                    onClick={() => navigate('/experiences')}
                                >
                                    View Experiences
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="h-100 border-0 shadow-sm">
                            <Card.Body className="text-center p-4">
                                <div className="mb-3">
                                    <i className="bi bi-briefcase fs-1 text-success"></i>
                                </div>
                                <h5 className="fw-bold mb-3">Services</h5>
                                <p className="text-muted mb-4">Explore service offerings</p>
                                <Button 
                                    variant="outline-danger" 
                                    className="rounded-pill px-4"
                                    onClick={() => navigate('/services')}
                                >
                                    View Services
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Properties Section */}
                <div className="mb-4">
                    <h3 className="fw-bold mb-4">Your Properties</h3>
                    <Row className="g-4">
                        {userProperties.map(property => (
                            <Col key={property.id} md={6} lg={4} xl={3}>
                                <PropertyCard 
                                    property={property} 
                                    user={user}
                                    onPriceUpdate={handlePriceUpdate}
                                />
                            </Col>
                        ))}
                    </Row>
                </div>
            </Container>

            {/* Price Edit Modal */}
            <Modal show={showPriceModal} onHide={() => setShowPriceModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Property Price</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedProperty && (
                        <div>
                            <p className="mb-3">
                                <strong>Property:</strong> {selectedProperty.title}
                            </p>
                            <Form.Group>
                                <Form.Label>New Price (₹)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={newPrice}
                                    onChange={(e) => setNewPrice(e.target.value)}
                                    placeholder="Enter new price"
                                    min="0"
                                />
                            </Form.Group>
                        </div>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowPriceModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handlePriceSave}>
                        Update Price
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default AgentDashboard;
