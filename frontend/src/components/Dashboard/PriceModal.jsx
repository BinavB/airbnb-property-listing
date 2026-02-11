import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const PriceModal = ({ show, onHide, property, onSave }) => {
    const [agentPrice, setAgentPrice] = useState(property.agent_price || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (property) {
            setAgentPrice(property.agent_price || '');
        }
    }, [property]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('token');
            await axios.post(
                `/api/agent/properties/${property.id}/price`,
                { agent_price: agentPrice },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            onSave();
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to update price');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setAgentPrice('');
        onHide();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {property?.agent_price ? 'Update' : 'Set'} Agent Price
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {property && (
                    <div>
                        <div className="mb-4">
                            <h6 className="fw-semibold mb-1">Property Details</h6>
                            <div className="text-muted">
                                <div><strong>Title:</strong> {property.title}</div>
                                <div><strong>City:</strong> {property.city}</div>
                                <div><strong>Type:</strong> {property.property_type}</div>
                            </div>
                        </div>

                        <div className="mb-4">
                            <h6 className="fw-semibold mb-1">Pricing Information</h6>
                            <div className="text-muted mb-3">
                                <div><strong>Base Price:</strong> ${property.base_price}/night</div>
                                {property.agent_price && (
                                    <div><strong>Current Agent Price:</strong> ${property.agent_price}/night</div>
                                )}
                            </div>
                        </div>
                        
                        <Form onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label className="fw-semibold">
                                    Your Agent Price (per night)
                                </Form.Label>
                                <Form.Control
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    max="999999.99"
                                    value={agentPrice}
                                    onChange={(e) => setAgentPrice(e.target.value)}
                                    placeholder="Enter your price"
                                    size="lg"
                                    required
                                />
                                <Form.Text className="text-muted">
                                    This is the price customers will see when filtered by you.
                                    Must be between $0.00 and $999,999.99
                                </Form.Text>
                            </Form.Group>
                            {error && (
                                <div className="alert alert-danger" role="alert">
                                    {error}
                                </div>
                            )}
                        </Form>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button 
                    variant="danger" 
                    type="submit"
                    disabled={loading || !agentPrice || parseFloat(agentPrice) < 0}
                >
                    {loading ? (
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                    ) : null}
                    Save Price
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default PriceModal;
