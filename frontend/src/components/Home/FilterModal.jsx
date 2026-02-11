import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const FilterModal = ({ show, onHide, filters, setFilters, onSearch }) => {
    const [localFilters, setLocalFilters] = useState(filters || {
        location: '',
        city: '',
        property_type: '',
        agent_id: ''
    });

    const handleSearch = () => {
        setFilters(localFilters);
        onSearch(localFilters);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Search Filters</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-4">
                        <Form.Label>Location</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Search destinations"
                            value={localFilters.location}
                            onChange={(e) => setLocalFilters({...localFilters, location: e.target.value})}
                        />
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>City</Form.Label>
                        <Form.Select
                            value={localFilters.city}
                            onChange={(e) => setLocalFilters({...localFilters, city: e.target.value})}
                        >
                            <option value="">All cities</option>
                            <option value="Mumbai">Mumbai</option>
                            <option value="Delhi">Delhi</option>
                            <option value="Bangalore">Bangalore</option>
                            <option value="Goa">Goa</option>
                            <option value="Pune">Pune</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-4">
                        <Form.Label>Property Type</Form.Label>
                        <Form.Select
                            value={localFilters.property_type}
                            onChange={(e) => setLocalFilters({...localFilters, property_type: e.target.value})}
                        >
                            <option value="">Any type</option>
                            <option value="apartment">Apartment</option>
                            <option value="house">House</option>
                            <option value="villa">Villa</option>
                            <option value="studio">Studio</option>
                        </Form.Select>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleSearch}>
                    Search
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default FilterModal;
