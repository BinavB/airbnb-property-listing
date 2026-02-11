import React, { useState } from 'react';
import { Container, Row, Col, Badge } from 'react-bootstrap';
import { useAuth } from '../../hooks/useAuth';
import ServiceCard from './ServiceCard';

const ServicesPage = () => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filters, setFilters] = useState({
        location: 'Search destinations',
        when: 'Any time',
        type: 'All services'
    });
    const { user } = useAuth();

    // Static service data matching your exact requirements
    const chefServices = [
        {
            id: 1,
            title: 'Authentic Roman meal',
            location: 'Rome, Italy',
            price: 7539,
            rating: 4.97,
            isGuestFavorite: true,
            image: 'https://picsum.photos/400/300?random=roman-meal',
            type: 'Chef',
            minimumBooking: null
        },
        {
            id: 2,
            title: 'Hyperlocal, foraged fare by Clair',
            location: 'Portland, Oregon',
            price: 4439,
            rating: 5.0,
            isGuestFavorite: true,
            image: 'https://picsum.photos/400/300?random=foraged-fare',
            type: 'Chef',
            minimumBooking: 45204
        },
        {
            id: 3,
            title: 'Behind the flame and fusion flavors by Erick',
            location: 'Los Angeles, California',
            price: 6321,
            rating: 5.0,
            isGuestFavorite: true,
            image: 'https://picsum.photos/400/300?random=fusion-flavors',
            type: 'Chef',
            minimumBooking: 11061
        },
        {
            id: 4,
            title: 'Vibrant Cali-Mediterranean menus by Liza',
            location: 'San Francisco, California',
            price: 15401,
            rating: 5.0,
            isGuestFavorite: true,
            image: 'https://picsum.photos/400/300?random=cali-mediterranean',
            type: 'Chef',
            minimumBooking: 72472
        },
        {
            id: 5,
            title: 'Catalan cuisine by Cristina',
            location: 'Barcelona, Spain',
            price: 4308,
            rating: 4.8,
            isGuestFavorite: false,
            image: 'https://picsum.photos/400/300?random=catalan-cuisine',
            type: 'Chef',
            minimumBooking: null
        },
        {
            id: 6,
            title: 'International gourmet fusion by Brian',
            location: 'New York, New York',
            price: 8154,
            rating: 4.9,
            isGuestFavorite: true,
            image: 'https://picsum.photos/400/300?random=gourmet-fusion',
            type: 'Chef',
            minimumBooking: null
        },
        {
            id: 7,
            title: 'Stunning charcuterie boards by Ilonka',
            location: 'Paris, France',
            price: 8969,
            rating: 4.95,
            isGuestFavorite: true,
            image: 'https://picsum.photos/400/300?random=charcuterie',
            type: 'Chef',
            minimumBooking: null
        },
        {
            id: 8,
            title: 'Luxury Private Dining by Chef Jimmy Matiz',
            location: 'Dubai, UAE',
            price: 14948,
            rating: 5.0,
            isGuestFavorite: true,
            image: 'https://picsum.photos/400/300?random=luxury-dining',
            type: 'Chef',
            minimumBooking: 117767
        }
    ];

    const trainingServices = [
        {
            id: 9,
            title: 'Personal Training w/ Dayton',
            location: 'Miami, United States',
            price: 906,
            rating: 5.0,
            isGuestFavorite: true,
            image: 'https://picsum.photos/400/300?random=personal-training',
            type: 'Training',
            minimumBooking: null
        },
        {
            id: 10,
            title: 'Yoga and embodiment by Julia',
            location: 'Bali, Indonesia',
            price: 2265,
            rating: 5.0,
            isGuestFavorite: true,
            image: 'https://picsum.photos/400/300?random=yoga-embodiment',
            type: 'Training',
            minimumBooking: 18118
        },
        {
            id: 11,
            title: 'Restorative fitness by Taylor',
            location: 'Los Angeles, United States',
            price: 6161,
            rating: 5.0,
            isGuestFavorite: true,
            image: 'https://picsum.photos/400/300?random=restorative-fitness',
            type: 'Training',
            minimumBooking: null
        },
        {
            id: 12,
            title: 'High-energy workouts by Vicky',
            location: 'Redondo Beach, United States',
            price: 14495,
            rating: 5.0,
            isGuestFavorite: true,
            image: 'https://picsum.photos/400/300?random=high-energy',
            type: 'Training',
            minimumBooking: null
        },
        {
            id: 13,
            title: 'Total body training by Peter',
            location: 'Pasadena, United States',
            price: 4530,
            rating: 5.0,
            isGuestFavorite: true,
            image: 'https://picsum.photos/400/300?random=total-body',
            type: 'Training',
            minimumBooking: null
        },
        {
            id: 14,
            title: 'Sun-sweat by Nishant',
            location: 'San Diego, United States',
            price: 9059,
            rating: 4.85,
            isGuestFavorite: false,
            image: 'https://picsum.photos/400/300?random=sun-sweat',
            type: 'Training',
            minimumBooking: null
        },
        {
            id: 15,
            title: 'Ritual yoga by Ana Ponzo - Metropolitan Park',
            location: 'Zapopan, Mexico',
            price: 2107,
            rating: 4.9,
            isGuestFavorite: true,
            image: 'https://picsum.photos/400/300?random=ritual-yoga',
            type: 'Training',
            minimumBooking: 4214
        }
    ];

    const massageServices = [
        {
            id: 16,
            title: 'Relaxation and deep tissue massage by Javier',
            location: 'Mexico City, Mexico',
            price: 5004,
            rating: 5.0,
            isGuestFavorite: true,
            image: 'https://picsum.photos/400/300?random=deep-tissue',
            type: 'Massage',
            minimumBooking: null
        },
        {
            id: 17,
            title: 'Good Massage Mobile Services',
            location: 'Chicago, Illinois',
            price: 13589,
            rating: 5.0,
            isGuestFavorite: true,
            image: 'https://picsum.photos/400/300?random=mobile-massage',
            type: 'Massage',
            minimumBooking: null
        },
        {
            id: 18,
            title: 'Deep tissue massage by Olga - London',
            location: 'London, United Kingdom',
            price: 9263,
            rating: 5.0,
            isGuestFavorite: true,
            image: 'https://picsum.photos/400/300?random=london-massage',
            type: 'Massage',
            minimumBooking: null
        },
        {
            id: 19,
            title: 'The Massage Escape Guy: In-home Massage',
            location: 'Austin, Texas',
            price: 7248,
            rating: 5.0,
            isGuestFavorite: true,
            image: 'https://picsum.photos/400/300?random=in-home-massage',
            type: 'Massage',
            minimumBooking: null,
            isPopular: true
        },
        {
            id: 20,
            title: 'Aromatherapeutic massage by Jenna',
            location: 'Falmouth, United States',
            price: 16307,
            rating: 5.0,
            isGuestFavorite: true,
            image: 'https://picsum.photos/400/300?random=aromatherapy',
            type: 'Massage',
            minimumBooking: null
        },
        {
            id: 21,
            title: 'Hollywood recovery and relaxation by Deisy & team',
            location: 'Los Angeles, United States',
            price: 5436,
            rating: 4.75,
            isGuestFavorite: false,
            image: 'https://picsum.photos/400/300?random=hollywood-recovery',
            type: 'Massage',
            minimumBooking: null
        },
        {
            id: 22,
            title: 'Relaxing massage by Jorge',
            location: 'Madrid, Spain',
            price: 6893,
            rating: 5.0,
            isGuestFavorite: true,
            image: 'https://picsum.photos/400/300?random=relaxing-massage',
            type: 'Massage',
            minimumBooking: null
        }
    ];

    const handleLocationSelect = (location) => {
        setFilters(prev => ({ ...prev, location }));
        setShowSuggestions(false);
    };

    const formatPrice = (price) => {
        return `₹${price.toLocaleString('en-IN')}`;
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
                                <span className="flex-grow-1">{filters.when}</span>
                            </div>
                        </div>
                        <div className="col-md-3">
                            <label className="form-label fw-semibold">Type of service</label>
                            <div className="border rounded-3 p-3 d-flex align-items-center">
                                <i className="bi bi-list-ul me-2 text-muted"></i>
                                <span className="flex-grow-1">{filters.type}</span>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col-12">
                            <button 
                                className="btn btn-danger rounded-pill px-5 py-3"
                                onClick={() => setShowSuggestions(true)}
                            >
                                <i className="bi bi-search me-2"></i>
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container py-4">
                {/* Chefs Section */}
                <div className="mb-5">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1 className="mb-0 fw-bold">Chefs</h1>
                        <div className="text-muted">
                            7 of 8 items showing
                        </div>
                    </div>
                    
                    <Row className="g-3 g-lg-4">
                        {chefServices.slice(0, 7).map(service => (
                            <Col key={service.id} md={6} lg={4} xl={3}>
                                <ServiceCard service={service} user={user} />
                            </Col>
                        ))}
                    </Row>
                </div>

                {/* Training Section */}
                <div className="mb-5">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1 className="mb-0 fw-bold">Training</h1>
                        <div className="text-muted">
                            7 of 7 items showing
                        </div>
                    </div>
                    
                    <Row className="g-3 g-lg-4">
                        {trainingServices.map(service => (
                            <Col key={service.id} md={6} lg={4} xl={3}>
                                <ServiceCard service={service} user={user} />
                            </Col>
                        ))}
                    </Row>
                </div>

                {/* Massage Section */}
                <div className="mb-5">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h1 className="mb-0 fw-bold">Massage</h1>
                        <div className="text-muted">
                            7 of 8 items showing
                        </div>
                    </div>
                    
                    <Row className="g-3 g-lg-4">
                        {massageServices.slice(0, 7).map(service => (
                            <Col key={service.id} md={6} lg={4} xl={3}>
                                <ServiceCard service={service} user={user} />
                            </Col>
                        ))}
                    </Row>
                </div>
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
                                
                                {/* Service Locations */}
                                {[
                                    { name: 'Miami, United States', icon: '🏖️', desc: 'Popular beach destination' },
                                    { name: 'Los Angeles, United States', icon: '🌴', desc: 'Entertainment capital' },
                                    { name: 'New York, United States', icon: '🏙️', desc: 'City that never sleeps' },
                                    { name: 'London, United Kingdom', icon: '🏰', desc: 'Historic city' },
                                    { name: 'Paris, France', icon: '🗼', desc: 'City of lights' },
                                    { name: 'Barcelona, Spain', icon: '🏛️', desc: 'Cultural hotspot' },
                                    { name: 'Dubai, UAE', icon: '🏜️', desc: 'Luxury destination' },
                                    { name: 'Tokyo, Japan', icon: '🗾', desc: 'Modern metropolis' }
                                ].map((dest, index) => (
                                    <div
                                        key={index}
                                        className="d-flex align-items-center gap-4 p-4 rounded-4 cursor-pointer hover-lift-fast mb-3"
                                        style={{
                                            transition: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
                                            backgroundColor: 'transparent',
                                            borderRadius: '16px'
                                        }}
                                        onClick={() => handleLocationSelect(dest.name)}
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
                                            {dest.icon}
                                        </div>
                                        
                                        <div className="flex-grow-1">
                                            <div className="fw-semibold text-dark mb-1" style={{fontSize: '16px'}}>
                                                {dest.name}
                                            </div>
                                            <div className="text-muted" style={{fontSize: '14px'}}>
                                                {dest.desc}
                                            </div>
                                        </div>
                                        
                                        <i className="bi bi-chevron-right text-muted" style={{fontSize: '16px'}}></i>
                                    </div>
                                ))}
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

export default ServicesPage;
