import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Modal, Form, Button } from 'react-bootstrap';
import { useAuth } from '../../hooks/useAuth';
import SearchBar from './SearchBar';
import PropertyCard from './PropertyCard';

const HomePage = () => {
    const [filters, setFilters] = useState({
        location: 'Search destinations',
        checkIn: 'Add dates',
        checkOut: 'Add dates',
        guests: 1
    });
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showGuestPopup, setShowGuestPopup] = useState(false);
    const [showPriceModal, setShowPriceModal] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [newPrice, setNewPrice] = useState('');
    const { user, userProperties } = useAuth();

    // All properties for non-logged in users
    const allProperties = [
        { id: 1, title: 'Luxury Villa in South Goa', location: 'South Goa', price: 15000, rating: 4.9, isGuestFavorite: true, image: 'https://picsum.photos/400/300?random=1', beds: 3, bedrooms: 2, bathrooms: 2, type: 'villa', ownerId: 1 },
        { id: 2, title: 'Beach House in Canacona', location: 'Canacona', price: 12000, rating: 4.8, isGuestFavorite: true, image: 'https://picsum.photos/400/300?random=2', beds: 2, bedrooms: 1, bathrooms: 1, type: 'beach_house', ownerId: 1 },
        { id: 3, title: 'Modern Apartment in Majorda', location: 'Majorda', price: 8000, rating: 4.7, isGuestFavorite: false, image: 'https://picsum.photos/400/300?random=3', beds: 2, bedrooms: 1, bathrooms: 1, type: 'apartment', ownerId: 1 },
        { id: 4, title: 'Cozy Cottage in Arpora', location: 'Arpora', price: 6000, rating: 4.6, isGuestFavorite: false, image: 'https://picsum.photos/400/300?random=4', beds: 1, bedrooms: 1, bathrooms: 1, type: 'cottage', ownerId: 2 },
        { id: 5, title: 'Penthouse in Canacona', location: 'Canacona', price: 18000, rating: 5.0, isGuestFavorite: true, image: 'https://picsum.photos/400/300?random=5', beds: 4, bedrooms: 3, bathrooms: 2, type: 'penthouse', ownerId: 2 },
        { id: 6, title: 'Studio in Salcete', location: 'Salcete', price: 4000, rating: 4.5, isGuestFavorite: false, image: 'https://picsum.photos/400/300?random=6', beds: 1, bedrooms: 1, bathrooms: 1, type: 'studio', ownerId: 2 },
        { id: 7, title: 'Beach Villa in Palolem', location: 'Palolem', price: 20000, rating: 4.95, isGuestFavorite: true, image: 'https://picsum.photos/400/300?random=7', beds: 5, bedrooms: 4, bathrooms: 3, type: 'villa', ownerId: 1 },
        { id: 8, title: 'Mountain Retreat in Sanguem', location: 'Sanguem', price: 10000, rating: 4.85, isGuestFavorite: false, image: 'https://picsum.photos/400/300?random=8', beds: 3, bedrooms: 2, bathrooms: 2, type: 'cottage', ownerId: 2 }
    ];

    // Determine which properties to show
    const displayProperties = user ? userProperties : allProperties;

    useEffect(() => {
        setLoading(false);
        setTotalPages(1);
    }, [userProperties]);

    const handleGuestCountChange = (change) => {
        setFilters(prev => ({
            ...prev,
            guests: Math.max(1, prev.guests + change)
        }));
    };

    const handleSearch = (searchFilters) => {
        setFilters(searchFilters);
        setPage(1);
    };

    const handleLocationSelect = (location) => {
        setFilters(prev => ({ ...prev, location }));
        setShowSuggestions(false);
    };

    const handlePriceUpdate = (property) => {
        setSelectedProperty(property);
        setNewPrice(property.price.toString());
        setShowPriceModal(true);
    };

    const handlePriceSave = () => {
        if (selectedProperty && newPrice) {
            // Update the property price in the userProperties
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
        {/* Search Bar Section */}
        <div className="container py-4">
            <div className="search-bar-wrapper bg-white rounded-4 shadow-lg p-4">
                <div className="row g-3 align-items-end">
                    <div className="col-md-3">
                        <label className="form-label fw-semibold">Where</label>
                        <div 
                            className="border rounded-3 p-3 d-flex align-items-center cursor-pointer"
                            onClick={() => setShowSuggestions(true)}
                        >
                            <i className="bi bi-search me-2 text-muted"></i>
                            <span className="flex-grow-1">{filters.location}</span>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label fw-semibold">When</label>
                        <div className="border rounded-3 p-3 d-flex align-items-center">
                            <i className="bi bi-calendar me-2 text-muted"></i>
                            <span className="flex-grow-1">{filters.checkIn}</span>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <label className="form-label fw-semibold">Who</label>
                        <div 
                            className="border rounded-3 p-3 d-flex align-items-center cursor-pointer"
                            onClick={() => setShowGuestPopup(true)}
                        >
                            <i className="bi bi-person me-2 text-muted"></i>
                            <span className="flex-grow-1">{filters.guests} {filters.guests === 1 ? 'guest' : 'guests'}</span>
                            <i className="bi bi-chevron-down ms-2"></i>
                        </div>
                    </div>
                                            <div className="col mt-3">
                        <div className="col-12 d-flex justify-content-center">
                            <button 
                                className="btn btn-danger rounded-pill px-1 py-3 w-100 w-md-auto"
                                onClick={() => setShowSuggestions(true)}
                            >
                                <i className="bi bi-search me-2"></i>
                                Search
                            </button>
                          </div>
                       </div>

                </div>
               
            </div>
        </div>

            {/* Guest Counter Popup */}
            {showGuestPopup && (
                <div 
                    className="modal-backdrop fade-in"
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: 9999,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onClick={() => setShowGuestPopup(false)}
                >
                    <div 
                        className="bg-white rounded-4 p-4"
                        style={{
                            width: '90%',
                            maxWidth: '400px',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.15)'
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h5 className="mb-0 fw-bold">Select Guests</h5>
                            <button 
                                className="btn btn-sm rounded-circle"
                                onClick={() => setShowGuestPopup(false)}
                                style={{
                                    width: '32px',
                                    height: '32px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'var(--gray-100)',
                                    border: 'none'
                                }}
                            >
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </div>
                        
                        <div className="d-flex justify-content-between align-items-center">
                            <button 
                                className="btn btn-outline-secondary rounded-circle"
                                onClick={() => handleGuestCountChange(-1)}
                                disabled={filters.guests <= 1}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <i className="bi bi-dash-lg"></i>
                            </button>
                            
                            <div className="px-4">
                                <span className="fw-bold fs-4">{filters.guests}</span>
                                <span className="text-muted"> {filters.guests === 1 ? 'guest' : 'guests'}</span>
                            </div>
                            
                            <button 
                                className="btn btn-outline-secondary rounded-circle"
                                onClick={() => handleGuestCountChange(1)}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                <i className="bi bi-plus-lg"></i>
                            </button>
                        </div>
                    </div>
                </div>
            )}

        {/* Main Content */}
        <div className="container py-4">
            {/* Section Title */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1 className="mb-0 fw-bold">
                    Popular homes in South Goa
                </h1>
                <div className="text-muted">
                    {userProperties.length} of {userProperties.length} items showing
                </div>
            </div>

            {/* Properties Grid */}
            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-danger" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <Row className="g-3 g-lg-4">
                    {displayProperties.map(property => (
                        <Col key={property.id} md={6} lg={4} xl={3}>
                            <PropertyCard 
                                property={property} 
                                user={user}
                                onPriceUpdate={handlePriceUpdate}
                            />
                        </Col>
                    ))}
                </Row>
            )}

            {/* Next Section */}
            <div className="container py-4">
                <h2 className="mb-4">Homes guests love</h2>
                <Row className="g-3 g-lg-4">
                    {displayProperties.slice(0, 7).map(property => (
                        <Col key={`next-${property.id}`} md={6} lg={4} xl={3}>
                            <PropertyCard 
                                property={property} 
                                user={user}
                                onPriceUpdate={handlePriceUpdate}
                            />
                        </Col>
                    ))}
                </Row>
            </div>

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
        </div>

        {/* Destination Suggestions Modal */}
        {showSuggestions && (
            <div 
                className="modal-backdrop fade-in"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    zIndex: 9999,
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    paddingTop: '120px',
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)'
                }}
                onClick={() => setShowSuggestions(false)}
            >
                <div 
                    className="modern-card slide-up-fast"
                    style={{
                        width: '90%',
                        maxWidth: '640px',
                        maxHeight: '70vh',
                        backgroundColor: 'white',
                        borderRadius: '24px',
                        overflow: 'hidden',
                        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.04)',
                        display: 'flex',
                        flexDirection: 'column',
                        animation: 'slideUp 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        transform: 'translateY(0)'
                    }}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="p-4 border-bottom bg-white">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h4 className="mb-0 fw-bold" style={{fontSize: '20px'}}>Search</h4>
                            <button 
                                className="btn btn-sm rounded-circle hover-scale"
                                onClick={() => setShowSuggestions(false)}
                                style={{
                                    width: '36px',
                                    height: '36px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    backgroundColor: 'var(--gray-100)',
                                    border: 'none',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <i className="bi bi-x-lg"></i>
                            </button>
                        </div>
                        
                        {/* Search Input */}
                        <div className="position-relative">
                            <i className="bi bi-search position-absolute" style={{
                                left: '16px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                color: 'var(--gray-500)',
                                fontSize: '18px'
                            }}></i>
                            <input
                                type="text"
                                className="form-control ps-5"
                                placeholder="Search destinations"
                                autoFocus
                                style={{
                                    fontSize: '16px',
                                    padding: '14px 18px 14px 46px',
                                    borderRadius: '16px',
                                    border: '2px solid var(--gray-200)',
                                    backgroundColor: 'var(--gray-50)'
                                }}
                            />
                        </div>
                    </div>

                    {/* Destinations List */}
                    <div className="flex-grow-1 overflow-auto" style={{ maxHeight: '400px' }}>
                        <div className="p-3">
                            <div className="mb-4">
                                <h6 className="text-muted mb-4" style={{fontSize: '13px', fontWeight: 600, letterSpacing: '0.5px'}}>
                                    SUGGESTED DESTINATIONS
                                </h6>
                            </div>
                            
                            {/* Nearby */}
                            <div
                                className="d-flex align-items-center gap-4 p-4 rounded-4 cursor-pointer hover-lift-fast mb-3"
                                style={{
                                    transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
                                    backgroundColor: 'transparent',
                                    borderRadius: '16px'
                                }}
                                onClick={() => handleLocationSelect('Nearby')}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--gray-50)';
                                    e.currentTarget.style.transform = 'translateX(4px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.transform = 'translateX(0)';
                                }}
                            >
                                <div 
                                    className="d-flex align-items-center justify-content-center rounded-4"
                                    style={{
                                        width: '56px',
                                        height: '56px',
                                        fontSize: '28px',
                                        backgroundColor: 'var(--gray-100)',
                                        flexShrink: 0
                                    }}
                                >
                                    🧭
                                </div>
                                
                                <div className="flex-grow-1">
                                    <div className="fw-semibold text-dark mb-1" style={{fontSize: '16px'}}>
                                        Nearby
                                    </div>
                                    <div className="text-muted" style={{fontSize: '14px'}}>
                                        Find what's around you
                                    </div>
                                </div>
                                
                                <i className="bi bi-chevron-right text-muted" style={{fontSize: '16px'}}></i>
                            </div>

                            {/* North Goa */}
                            <div
                                className="d-flex align-items-center gap-4 p-4 rounded-4 cursor-pointer hover-lift-fast mb-3"
                                style={{
                                    transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
                                    backgroundColor: 'transparent',
                                    borderRadius: '16px'
                                }}
                                onClick={() => handleLocationSelect('North Goa, Goa')}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--gray-50)';
                                    e.currentTarget.style.transform = 'translateX(4px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.transform = 'translateX(0)';
                                }}
                            >
                                <div 
                                    className="d-flex align-items-center justify-content-center rounded-4"
                                    style={{
                                        width: '56px',
                                        height: '56px',
                                        fontSize: '28px',
                                        backgroundColor: 'var(--gray-100)',
                                        flexShrink: 0
                                    }}
                                >
                                    🏖️
                                </div>
                                
                                <div className="flex-grow-1">
                                    <div className="fw-semibold text-dark mb-1" style={{fontSize: '16px'}}>
                                        North Goa, Goa
                                    </div>
                                    <div className="text-muted" style={{fontSize: '14px'}}>
                                        Popular beach destination
                                    </div>
                                </div>
                                
                                <i className="bi bi-chevron-right text-muted" style={{fontSize: '16px'}}></i>
                            </div>

                            {/* Puducherry */}
                            <div
                                className="d-flex align-items-center gap-4 p-4 rounded-4 cursor-pointer hover-lift-fast mb-3"
                                style={{
                                    transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
                                    backgroundColor: 'transparent',
                                    borderRadius: '16px'
                                }}
                                onClick={() => handleLocationSelect('Puducherry, Puducherry')}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--gray-50)';
                                    e.currentTarget.style.transform = 'translateX(4px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.transform = 'translateX(0)';
                                }}
                            >
                                <div 
                                    className="d-flex align-items-center justify-content-center rounded-4"
                                    style={{
                                        width: '56px',
                                        height: '56px',
                                        fontSize: '28px',
                                        backgroundColor: 'var(--gray-100)',
                                        flexShrink: 0
                                    }}
                                >
                                    🏖️
                                </div>
                                
                                <div className="flex-grow-1">
                                    <div className="fw-semibold text-dark mb-1" style={{fontSize: '16px'}}>
                                        Puducherry, Puducherry
                                    </div>
                                    <div className="text-muted" style={{fontSize: '14px'}}>
                                        For sights like Sri Aurobindo Ashram
                                    </div>
                                </div>
                                
                                <i className="bi bi-chevron-right text-muted" style={{fontSize: '16px'}}></i>
                            </div>

                            {/* Mysore */}
                            <div
                                className="d-flex align-items-center gap-4 p-4 rounded-4 cursor-pointer hover-lift-fast mb-3"
                                style={{
                                    transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
                                    backgroundColor: 'transparent',
                                    borderRadius: '16px'
                                }}
                                onClick={() => handleLocationSelect('Mysore, Karnataka')}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--gray-50)';
                                    e.currentTarget.style.transform = 'translateX(4px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.transform = 'translateX(0)';
                                }}
                            >
                                <div 
                                    className="d-flex align-items-center justify-content-center rounded-4"
                                    style={{
                                        width: '56px',
                                        height: '56px',
                                        fontSize: '28px',
                                        backgroundColor: 'var(--gray-100)',
                                        flexShrink: 0
                                    }}
                                >
                                    🏛️
                                </div>
                                
                                <div className="flex-grow-1">
                                    <div className="fw-semibold text-dark mb-1" style={{fontSize: '16px'}}>
                                        Mysore, Karnataka
                                    </div>
                                    <div className="text-muted" style={{fontSize: '14px'}}>
                                        Great for a weekend getaway
                                    </div>
                                </div>
                                
                                <i className="bi bi-chevron-right text-muted" style={{fontSize: '16px'}}></i>
                            </div>

                            {/* Ooty */}
                            <div
                                className="d-flex align-items-center gap-4 p-4 rounded-4 cursor-pointer hover-lift-fast mb-3"
                                style={{
                                    transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
                                    backgroundColor: 'transparent',
                                    borderRadius: '16px'
                                }}
                                onClick={() => handleLocationSelect('Ooty, Puducherry')}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--gray-50)';
                                    e.currentTarget.style.transform = 'translateX(4px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.transform = 'translateX(0)';
                                }}
                            >
                                <div 
                                    className="d-flex align-items-center justify-content-center rounded-4"
                                    style={{
                                        width: '56px',
                                        height: '56px',
                                        fontSize: '28px',
                                        backgroundColor: 'var(--gray-100)',
                                        flexShrink: 0
                                    }}
                                >
                                    ⛰️
                                </div>
                                
                                <div className="flex-grow-1">
                                    <div className="fw-semibold text-dark mb-1" style={{fontSize: '16px'}}>
                                        Ooty, Puducherry
                                    </div>
                                    <div className="text-muted" style={{fontSize: '14px'}}>
                                        For nature lovers
                                    </div>
                                </div>
                                
                                <i className="bi bi-chevron-right text-muted" style={{fontSize: '16px'}}></i>
                            </div>

                            {/* South Goa */}
                            <div
                                className="d-flex align-items-center gap-4 p-4 rounded-4 cursor-pointer hover-lift-fast mb-3"
                                style={{
                                    transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
                                    backgroundColor: 'transparent',
                                    borderRadius: '16px'
                                }}
                                onClick={() => handleLocationSelect('South Goa, Goa')}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--gray-50)';
                                    e.currentTarget.style.transform = 'translateX(4px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.transform = 'translateX(0)';
                                }}
                            >
                                <div 
                                    className="d-flex align-items-center justify-content-center rounded-4"
                                    style={{
                                        width: '56px',
                                        height: '56px',
                                        fontSize: '28px',
                                        backgroundColor: 'var(--gray-100)',
                                        flexShrink: 0
                                    }}
                                >
                                    🌴
                                </div>
                                
                                <div className="flex-grow-1">
                                    <div className="fw-semibold text-dark mb-1" style={{fontSize: '16px'}}>
                                        South Goa, Goa
                                    </div>
                                    <div className="text-muted" style={{fontSize: '14px'}}>
                                        Popular beach destination
                                    </div>
                                </div>
                                
                                <i className="bi bi-chevron-right text-muted" style={{fontSize: '16px'}}></i>
                            </div>

                            {/* Mumbai */}
                            <div
                                className="d-flex align-items-center gap-4 p-4 rounded-4 cursor-pointer hover-lift-fast mb-3"
                                style={{
                                    transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
                                    backgroundColor: 'transparent',
                                    borderRadius: '16px'
                                }}
                                onClick={() => handleLocationSelect('Mumbai, Maharashtra')}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--gray-50)';
                                    e.currentTarget.style.transform = 'translateX(4px)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                    e.currentTarget.style.transform = 'translateX(0)';
                                }}
                            >
                                <div 
                                    className="d-flex align-items-center justify-content-center rounded-4"
                                    style={{
                                        width: '56px',
                                        height: '56px',
                                        fontSize: '28px',
                                        backgroundColor: 'var(--gray-100)',
                                        flexShrink: 0
                                    }}
                                >
                                    🏙️
                                </div>
                                
                                <div className="flex-grow-1">
                                    <div className="fw-semibold text-dark mb-1" style={{fontSize: '16px'}}>
                                        Mumbai, Maharashtra
                                    </div>
                                    <div className="text-muted" style={{fontSize: '14px'}}>
                                        For sights like Gateway of India
                                    </div>
                                </div>
                                
                                <i className="bi bi-chevron-right text-muted" style={{fontSize: '16px'}}></i>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-top bg-gray-50">
                        <div className="d-flex gap-3">
                            <button 
                                className="btn btn-outline-dark flex-grow-1"
                                onClick={() => setShowSuggestions(false)}
                                style={{
                                    padding: '12px 24px',
                                    borderRadius: '12px',
                                    fontSize: '15px',
                                    fontWeight: '500'
                                }}
                            >
                                Cancel
                            </button>
                            <button 
                                className="btn btn-danger flex-grow-1"
                                onClick={() => setShowSuggestions(false)}
                                style={{
                                    padding: '12px 24px',
                                    borderRadius: '12px',
                                    fontSize: '15px',
                                    fontWeight: '500'
                                }}
                            >
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )}
    </>
    );
};

export default HomePage;