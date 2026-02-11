import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Modal, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import PropertyCard from '../Home/PropertyCard';

const AgentHomePage = () => {
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
            // Update property price in userProperties
            const updatedProperties = userProperties.map(p => 
                p.id === selectedProperty.id ? { ...p, price: parseInt(newPrice) } : p
            );
            // This would normally update via API
            console.log('Updated price for property', selectedProperty.id, 'to', newPrice);
            setShowPriceModal(false);
            setSelectedProperty(null);
            setNewPrice('');
        }
    };

    return (
        <>
            {/* Agent Home Header */}
            <div className="bg-white border-bottom">
                <Container>
                    <div className="d-flex justify-content-between align-items-center py-3">
                        <div>
                            <h2 className="mb-0 fw-bold">My Properties</h2>
                            <p className="mb-0 text-muted">Manage your property listings, {user?.name}</p>
                        </div>
                        <Button variant="outline-danger" onClick={handleLogout}>
                            <i className="bi bi-box-arrow-right me-2"></i>
                            Logout
                        </Button>
                    </div>
                </Container>
            </div>

            {/* Properties Section */}
            <Container className="py-5">
                <div className="mb-4">
                    <h3 className="fw-bold mb-4">Your Properties</h3>
                    <p className="text-muted mb-4">
                        You have {userProperties.length} properties. Click "Update Price" to edit pricing.
                    </p>
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

export default AgentHomePage;
