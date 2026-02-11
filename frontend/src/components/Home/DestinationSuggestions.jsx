import React, { useState, useEffect, useRef } from 'react';

const DestinationSuggestions = ({ show, onSelect, onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [showNearby, setShowNearby] = useState(false);
    const modalRef = useRef(null);

    const destinations = [
        { icon: '🧭', title: 'Nearby', subtitle: 'Find what\'s around you', type: 'nearby' },
        { icon: '🏖️', title: 'Puducherry, Puducherry', subtitle: 'Great for a weekend getaway', type: 'city' },
        { icon: '⛰️', title: 'Kodaikanal, Tamil Nadu', subtitle: 'For nature lovers', type: 'city' },
        { icon: '🌴', title: 'North Goa, Goa', subtitle: 'Popular beach destination', type: 'city' },
        { icon: '🏖️', title: 'Puducherry, Puducherry', subtitle: 'For sights like Sri Aurobindo Ashram', type: 'city' },
        { icon: '🏛️', title: 'Mysore, Karnataka', subtitle: 'Great for a weekend getaway', type: 'city' },
        { icon: '⛰️', title: 'Ooty, Puducherry', subtitle: 'For nature lovers', type: 'city' },
        { icon: '🌴', title: 'South Goa, Goa', subtitle: 'Popular beach destination', type: 'city' },
        { icon: '🏙️', title: 'Mumbai, Maharashtra', subtitle: 'For sights like Gateway of India', type: 'city' },
        { icon: '🏔️', title: 'Madikeri, Karnataka', subtitle: 'Great for a weekend getaway', type: 'city' },
        { icon: '⛰️', title: 'Kodaikkanal, Tamil Nadu', subtitle: 'For nature lovers', type: 'city' },
        { icon: '🌿', title: 'Wayanad, Kerala', subtitle: 'Great for a weekend getaway', type: 'city' },
        { icon: '🏖️', title: 'Mangalore, Karnataka', subtitle: 'Popular with travellers near you', type: 'city' },
        { icon: '🍽️', title: 'Chennai, Tamil Nadu', subtitle: 'For its top-notch dining', type: 'city' },
        { icon: '🕉️', title: 'Varanasi, Uttar Pradesh', subtitle: 'A hidden gem', type: 'city' },
        { icon: '🏔️', title: 'Nandi Hills, Karnataka', subtitle: 'Near you', type: 'city' },
        { icon: '🏛️', title: 'Hyderabad, Telangana', subtitle: 'For sights like Charminar', type: 'city' },
        { icon: '🍽️', title: 'Udupi, Karnataka', subtitle: 'Popular with travellers near you', type: 'city' },
        { icon: '🏖️', title: 'Candolim, Goa', subtitle: 'A hidden gem', type: 'city' },
        { icon: '🌃', title: 'Dubai, United Arab Emirates', subtitle: 'For its bustling nightlife', type: 'city' },
        { icon: '🏛️', title: 'New Delhi, Delhi', subtitle: 'For sights like India Gate', type: 'city' },
        { icon: '☕', title: 'Chikmagalur, Karnataka', subtitle: 'Popular with travellers near you', type: 'city' },
        { icon: '🏖️', title: 'Gokarna', subtitle: 'A hidden gem', type: 'city' }
    ];

    const filteredDestinations = destinations.filter(dest => 
        dest.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dest.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                if (onClose) onClose();
            }
        };

        if (show) {
            document.addEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [show, onClose]);

    const handleDestinationClick = (destination) => {
        if (destination.type === 'nearby') {
            setShowNearby(true);
        } else {
            const cityName = destination.title.split(',')[0];
            if (onSelect) onSelect(cityName);
            if (onClose) onClose();
        }
    };

    if (!show) return null;

    return (
        <div className="modal-backdrop fade-in" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '80px'
        }}>
            <div 
                ref={modalRef}
                className="modern-card slide-up"
                style={{
                    width: '90%',
                    maxWidth: '600px',
                    maxHeight: '80vh',
                    backgroundColor: 'white',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: 'var(--shadow-2xl)',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                {/* Header */}
                <div className="p-4 border-bottom">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="mb-0 fw-bold">Where to?</h4>
                        <button 
                            className="btn btn-sm rounded-circle"
                            onClick={() => onClose && onClose()}
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
                    
                    {/* Search Input */}
                    <div className="position-relative">
                        <i className="bi bi-search position-absolute" style={{
                            left: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            color: 'var(--gray-500)'
                        }}></i>
                        <input
                            type="text"
                            className="form-control ps-5"
                            placeholder="Search destinations"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                                fontSize: '16px',
                                padding: '12px 16px 12px 40px',
                                borderRadius: '12px',
                                border: '2px solid var(--gray-200)',
                                backgroundColor: 'var(--gray-50)'
                            }}
                            autoFocus
                        />
                    </div>
                </div>

                {/* Destinations List */}
                <div className="flex-grow-1 overflow-auto" style={{ maxHeight: '500px' }}>
                    <div className="p-2">
                        {filteredDestinations.map((destination, index) => (
                            <div
                                key={index}
                                className="d-flex align-items-center gap-3 p-3 rounded-3 cursor-pointer hover-lift"
                                style={{
                                    transition: 'all 0.2s ease',
                                    backgroundColor: 'transparent'
                                }}
                                onClick={() => handleDestinationClick(destination)}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = 'var(--gray-50)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = 'transparent';
                                }}
                            >
                                <div 
                                    className="d-flex align-items-center justify-content-center rounded-3"
                                    style={{
                                        width: '48px',
                                        height: '48px',
                                        fontSize: '24px',
                                        backgroundColor: 'var(--gray-100)'
                                    }}
                                >
                                    {destination.icon}
                                </div>
                                
                                <div className="flex-grow-1">
                                    <div className="fw-semibold text-dark mb-1">
                                        {destination.title}
                                    </div>
                                    <div className="text-muted small">
                                        {destination.subtitle}
                                    </div>
                                </div>
                                
                                <i className="bi bi-chevron-right text-muted"></i>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-top bg-gray-50">
                    <div className="d-flex gap-2">
                        <button 
                            className="btn btn-outline-dark flex-grow-1"
                            onClick={() => onClose && onClose()}
                        >
                            Cancel
                        </button>
                        <button 
                            className="btn btn-danger flex-grow-1"
                            onClick={() => {
                                if (searchTerm && onSelect) {
                                    onSelect(searchTerm);
                                }
                                if (onClose) onClose();
                            }}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DestinationSuggestions;
