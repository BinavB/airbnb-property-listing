import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import { useAuth } from '../../hooks/useAuth';
import ExperienceCard from './ExperienceCard';

const ExperiencesPage = () => {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showGuestPopup, setShowGuestPopup] = useState(false);
    const [filters, setFilters] = useState({
        location: 'Search destinations',
        when: 'Any time',
        type: 'All experiences',
        guests: 1
    });
    const { user } = useAuth();

    const sampleExperiences = [
        {
            id: 1,
            title: 'Family snow day with Olympian Perrine Laffont',
            location: 'Livigno, Italy',
            price: 2801,
            rating: 4.8,
            image: 'https://picsum.photos/400/300?random=101',
            category: 'Winter',
            guests: 2,
            host: 'Olympian Perrine',
            description: 'Experience a magical winter wonderland in the Italian Alps'
        },
        {
            id: 2,
            title: 'Try virtual skiing with Paralympian Marie Bochet',
            location: 'Milan, Italy',
            price: 2801,
            rating: 4.8,
            image: 'https://picsum.photos/400/300?random=102',
            category: 'Winter',
            guests: 2,
            host: 'Paralympian Marie Bochet',
            description: 'Adaptive skiing experience for all abilities'
        },
        {
            id: 3,
            title: 'Run a 5k with Olympian Federico Pellegrino',
            location: 'Milan, Italy',
            price: 2801,
            rating: 5.0,
            image: 'https://picsum.photos/400/300?random=103',
            category: 'Winter',
            guests: 2,
            host: 'Olympian Federico Pellegrino',
            description: 'Challenge yourself with an Olympic champion'
        },
        {
            id: 4,
            title: 'Carve marble with a third-generation sculptor',
            location: 'Athens, Greece',
            price: 5385,
            rating: 5.0,
            image: 'https://picsum.photos/400/300?random=104',
            category: 'Art & Culture',
            guests: 2,
            host: 'Third-generation sculptor',
            description: 'Learn the ancient art of marble sculpture'
        },
        {
            id: 5,
            title: 'Learn mixology and cocktail tasting in a speakeasy',
            location: 'Nice, France',
            price: 3770,
            rating: 4.76,
            image: 'https://picsum.photos/400/300?random=105',
            category: 'Food & Drink',
            guests: 2,
            host: 'Master Mixologist',
            description: 'Discover secret cocktail recipes in an exclusive speakeasy'
        },
        {
            id: 6,
            title: 'Savor organic matcha in a tea ceremony',
            location: 'Shibuya, Japan',
            price: 3780,
            rating: 4.96,
            image: 'https://picsum.photos/400/300?random=106',
            category: 'Food & Drink',
            guests: 2,
            host: 'Tea Master',
            description: 'Traditional Japanese tea ceremony experience'
        },
        {
            id: 7,
            title: 'Experience a sacred Buddhist ritual and yoga class',
            location: 'Haiya Sub-district, Thailand',
            price: 1421,
            rating: 5.0,
            image: 'https://picsum.photos/400/300?random=107',
            category: 'Wellness',
            guests: 2,
            host: 'Buddhist Monk',
            description: 'Find inner peace through ancient practices'
        },
        {
            id: 8,
            title: 'Discover Melbourne\'s acclaimed coffee culture',
            location: 'West Melbourne, Australia',
            price: 4358,
            rating: 5.0,
            image: 'https://picsum.photos/400/300?random=108',
            category: 'Food & Drink',
            guests: 2,
            host: 'Coffee Expert',
            description: 'Explore Melbourne\'s vibrant coffee scene'
        },
        {
            id: 9,
            title: 'Sipping Mexico: A Journey Through Mexican Spirits',
            location: 'Tulum, Mexico',
            price: 3845,
            rating: 5.0,
            image: 'https://picsum.photos/400/300?random=109',
            category: 'Food & Drink',
            guests: 2,
            host: 'Tequila Master',
            description: 'Taste premium Mexican spirits in paradise'
        },
        {
            id: 10,
            title: 'Prosecco Hills: discover a small producer',
            location: 'Conegliano, Italy',
            price: 3016,
            rating: 5.0,
            image: 'https://picsum.photos/400/300?random=110',
            category: 'Food & Drink',
            guests: 2,
            host: 'Wine Expert',
            description: 'Visit family-owned vineyard in the hills'
        },
        {
            id: 11,
            title: 'Discover aromatherapy with a local medicine woman',
            location: 'Portland, United States',
            price: 4711,
            rating: 5.0,
            image: 'https://picsum.photos/400/300?random=111',
            category: 'Wellness',
            guests: 2,
            host: 'Wellness Guide',
            description: 'Healing experience with natural remedies'
        },
        {
            id: 12,
            title: 'Learn mahjong and sip tea',
            location: 'Brooklyn, United States',
            price: 4983,
            rating: 5.0,
            image: 'https://picsum.photos/400/300?random=112',
            category: 'Culture',
            guests: 2,
            host: 'Mahjong Master',
            description: 'Traditional Chinese game with tea ceremony'
        },
        {
            id: 13,
            title: 'Sip Vibe & Design A Vintage T-shirt Workshop',
            location: 'Atlanta, United States',
            price: 4983,
            rating: 4.95,
            image: 'https://picsum.photos/400/300?random=113',
            category: 'Art & Culture',
            guests: 2,
            host: 'Design Expert',
            description: 'Create your own vintage-inspired t-shirt'
        },
        {
            id: 14,
            title: 'Insider\'s Food Tour: South Philly & Italian Market',
            location: 'Philadelphia, United States',
            price: 9311,
            rating: 5.0,
            image: 'https://picsum.photos/400/300?random=114',
            category: 'Food & Drink',
            guests: 2,
            host: 'Food Expert',
            description: 'Authentic food tour with local markets'
        },
        {
            id: 15,
            title: 'Meditate and learn mindfulness at Wat Jed Yot',
            location: 'Chang Phueak, Thailand',
            price: 2784,
            rating: 4.95,
            image: 'https://picsum.photos/400/300?random=115',
            category: 'Wellness',
            guests: 2,
            host: 'Meditation Master',
            description: 'Find peace and clarity in Buddhist temple'
        }
    ];

    useEffect(() => {
        setLoading(false);
        setExperiences(sampleExperiences);
    }, []);

    const handleGuestCountChange = (change) => {
        setFilters(prev => ({
            ...prev,
            guests: Math.max(1, prev.guests + change)
        }));
    };

    const handleLocationSelect = (location) => {
        setFilters(prev => ({ ...prev, location }));
        setShowSuggestions(false);
    };

    return (
        <>
            {/* Navigation */}
            <div className="experiences-header bg-white sticky-top">
                <Container>
                    <div className="d-flex justify-content-between align-items-center py-3">
                        <div className="d-flex align-items-center">
                            <h1 className="mb-0 fw-bold">Experiences</h1>
                            <Badge bg="danger" className="ms-2">NEW</Badge>
                        </div>
                        <div className="d-flex align-items-center gap-3">
                            <button className="btn btn-outline-dark rounded-pill">Online Experiences</button>
                            <button className="btn btn-outline-dark rounded-pill">In-Person</button>
                        </div>
                    </div>
                </Container>
            </div>

            {/* Hero Section */}
            <div className="experiences-hero">
                <Container>
                    <div className="text-center py-5">
                        <h2 className="display-4 fw-bold mb-4">Find things to do near you</h2>
                        <p className="lead text-muted">Discover unique experiences hosted by local experts</p>
                    </div>
                </Container>
            </div>

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

          

            {/* Experiences Grid */}
            <div className="experiences-content py-4">
                <Container>
                    <Row className="g-4">
                        {experiences.map((experience, index) => (
                            <Col key={experience.id} md={6} lg={4} xl={3}>
                                <Card className="experience-card h-100">
                                    <div className="position-relative overflow-hidden" style={{paddingBottom: '60%', borderRadius: '12px'}}>
                                        <img 
                                            src={experience.image} 
                                            className="w-100 h-100"
                                            style={{objectFit: 'cover', top: 0, left: 0}}
                                            alt={experience.title}
                                        />
                                        
                                        {/* Category Badge */}
                                        <div className="position-absolute top-3 start-3">
                                            <Badge bg="dark" className="text-capitalize">
                                                {experience.category}
                                            </Badge>
                                        </div>
                                        
                                        {/* Heart Icon */}
                                        <button className="btn btn-light rounded-circle position-absolute top-3 end-3">
                                            <i className="bi bi-heart"></i>
                                        </button>
                                    </div>
                                    
                                    <Card.Body className="p-4">
                                        <div className="d-flex justify-content-between align-items-start mb-2">
                                            <div>
                                                <h5 className="fw-bold mb-1">{experience.title}</h5>
                                                <p className="text-muted small mb-2">
                                                    <i className="bi bi-geo-alt me-1"></i>
                                                    {experience.location}
                                                </p>
                                                <p className="text-muted small">
                                                    with {experience.host}
                                                </p>
                                            </div>
                                            <div className="text-end">
                                                <h4 className="fw-bold text-danger">₹{experience.price.toLocaleString('en-IN')}</h4>
                                                <p className="text-muted small">/ guest</p>
                                            </div>
                                        </div>
                                        
                                        <p className="text-muted mb-3">{experience.description}</p>
                                        
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div className="d-flex align-items-center">
                                                <i className="bi bi-star-fill text-warning me-1"></i>
                                                <span className="fw-semibold">{experience.rating}</span>
                                                <span className="text-muted"> out of 5 average rating</span>
                                            </div>
                                            <button className="btn btn-outline-dark rounded-pill">
                                                Book Now
                                            </button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>

            {/* Local Experiences Section */}
            <div className="local-experiences bg-light py-5">
                <Container>
                    <h2 className="text-center mb-4">Popular with travellers from your area</h2>
                    <Row className="g-4">
                        <Col md={6} lg={4}>
                            <Card className="h-100 border-0">
                                <Card.Body className="text-center p-4">
                                    <div className="mb-3">
                                        <i className="bi bi-geo-alt fs-1 text-muted"></i>
                                    </div>
                                    <h5 className="fw-bold mb-3">St. Petersburg</h5>
                                    <p className="text-muted">Villa rentals</p>
                                    <button className="btn btn-danger rounded-pill">Explore</button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} lg={4}>
                            <Card className="h-100 border-0">
                                <Card.Body className="text-center p-4">
                                    <div className="mb-3">
                                        <i className="bi bi-geo-alt fs-1 text-muted"></i>
                                    </div>
                                    <h5 className="fw-bold mb-3">Philadelphia</h5>
                                    <p className="text-muted">Flat rentals</p>
                                    <button className="btn btn-danger rounded-pill">Explore</button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} lg={4}>
                            <Card className="h-100 border-0">
                                <Card.Body className="text-center p-4">
                                    <div className="mb-3">
                                        <i className="bi bi-geo-alt fs-1 text-muted"></i>
                                    </div>
                                    <h5 className="fw-bold mb-3">Orange Beach</h5>
                                    <p className="text-muted">Flat rentals</p>
                                    <button className="btn btn-danger rounded-pill">Explore</button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} lg={4}>
                            <Card className="h-100 border-0">
                                <Card.Body className="text-center p-4">
                                    <div className="mb-3">
                                        <i className="bi bi-geo-alt fs-1 text-muted"></i>
                                    </div>
                                    <h5 className="fw-bold mb-3">Washington</h5>
                                    <p className="text-muted">Holiday rentals</p>
                                    <button className="btn btn-danger rounded-pill">Explore</button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} lg={4}>
                            <Card className="h-100 border-0">
                                <Card.Body className="text-center p-4">
                                    <div className="mb-3">
                                        <i className="bi bi-geo-alt fs-1 text-muted"></i>
                                    </div>
                                    <h5 className="fw-bold mb-3">Kauai</h5>
                                    <p className="text-muted">Holiday rentals</p>
                                    <button className="btn btn-danger rounded-pill">Explore</button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} lg={4}>
                            <Card className="h-100 border-0">
                                <Card.Body className="text-center p-4">
                                    <div className="mb-3">
                                        <i className="bi bi-geo-alt fs-1 text-muted"></i>
                                    </div>
                                    <h5 className="fw-bold mb-3">Oahu</h5>
                                    <p className="text-muted">Apartment rentals</p>
                                    <button className="btn btn-danger rounded-pill">Explore</button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} lg={4}>
                            <Card className="h-100 border-0">
                                <Card.Body className="text-center p-4">
                                    <div className="mb-3">
                                        <i className="bi bi-geo-alt fs-1 text-muted"></i>
                                    </div>
                                    <h5 className="fw-bold mb-3">Wilmington</h5>
                                    <p className="text-muted">Holiday rentals</p>
                                    <button className="btn btn-danger rounded-pill">Explore</button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} lg={4}>
                            <Card className="h-100 border-0">
                                <Card.Body className="text-center p-4">
                                    <div className="mb-3">
                                        <i className="bi bi-geo-alt fs-1 text-muted"></i>
                                    </div>
                                    <h5 className="fw-bold mb-3">Key West</h5>
                                    <p className="text-muted">Holiday rentals</p>
                                    <button className="btn btn-danger rounded-pill">Explore</button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} lg={4}>
                            <Card className="h-100 border-0">
                                <Card.Body className="text-center p-4">
                                    <div className="mb-3">
                                        <i className="bi bi-geo-alt fs-1 text-muted"></i>
                                    </div>
                                    <h5 className="fw-bold mb-3">Pocono Mountains</h5>
                                    <p className="text-muted">Flat rentals</p>
                                    <button className="btn btn-danger rounded-pill">Explore</button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} lg={4}>
                            <Card className="h-100 border-0">
                                <Card.Body className="text-center p-4">
                                    <div className="mb-3">
                                        <i className="bi bi-geo-alt fs-1 text-muted"></i>
                                    </div>
                                    <h5 className="fw-bold mb-3">Tampa</h5>
                                    <p className="text-muted">Villa rentals</p>
                                    <button className="btn btn-danger rounded-pill">Explore</button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} lg={4}>
                            <Card className="h-100 border-0">
                                <Card.Body className="text-center p-4">
                                    <div className="mb-3">
                                        <i className="bi bi-geo-alt fs-1 text-muted"></i>
                                    </div>
                                    <h5 className="fw-bold mb-3">Santo Domingo</h5>
                                    <p className="text-muted">Apartment rentals</p>
                                    <button className="btn btn-danger rounded-pill">Explore</button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} lg={4}>
                            <Card className="h-100 border-0">
                                <Card.Body className="text-center p-4">
                                    <div className="mb-3">
                                        <i className="bi bi-geo-alt fs-1 text-muted"></i>
                                    </div>
                                    <h5 className="fw-bold mb-3">Maui</h5>
                                    <p className="text-muted">Apartment rentals</p>
                                    <button className="btn btn-danger rounded-pill">Explore</button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} lg={4}>
                            <Card className="h-100 border-0">
                                <Card.Body className="text-center p-4">
                                    <div className="mb-3">
                                        <i className="bi bi-geo-alt fs-1 text-muted"></i>
                                    </div>
                                    <h5 className="fw-bold mb-3">Amsterdam</h5>
                                    <p className="text-muted">Cottage rentals</p>
                                    <button className="btn btn-danger rounded-pill">Explore</button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} lg={4}>
                            <Card className="h-100 border-0">
                                <Card.Body className="text-center p-4">
                                    <div className="mb-3">
                                        <i className="bi bi-geo-alt fs-1 text-muted"></i>
                                    </div>
                                    <h5 className="fw-bold mb-3">Charlotte</h5>
                                    <p className="text-muted">Cabin rentals</p>
                                    <button className="btn btn-danger rounded-pill">Explore</button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} lg={4}>
                            <Card className="h-100 border-0">
                                <Card.Body className="text-center p-4">
                                    <div className="mb-3">
                                        <i className="bi bi-geo-alt fs-1 text-muted"></i>
                                    </div>
                                    <h5 className="fw-bold mb-3">London</h5>
                                    <p className="text-muted">Villa rentals</p>
                                    <button className="btn btn-danger rounded-pill">Explore</button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} lg={4}>
                            <Card className="h-100 border-0">
                                <Card.Body className="text-center p-4">
                                    <div className="mb-3">
                                        <i className="bi bi-geo-alt fs-1 text-muted"></i>
                                    </div>
                                    <h5 className="fw-bold mb-3">Cincinnati</h5>
                                    <p className="text-muted">Cabin rentals</p>
                                    <button className="btn btn-danger rounded-pill">Explore</button>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={6} lg={4}>
                            <Card className="h-100 border-0">
                                <Card.Body className="text-center p-4">
                                    <div className="mb-3">
                                        <i className="bi bi-geo-alt fs-1 text-muted"></i>
                                    </div>
                                    <h5 className="fw-bold mb-3">Memphis</h5>
                                    <p className="text-muted">Apartment rentals</p>
                                    <button className="btn btn-danger rounded-pill">Explore</button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* Show More */}
            <div className="text-center py-4">
                <button className="btn btn-outline-danger btn-lg px-5">Show more</button>
            </div>
        </>
    );
};

export default ExperiencesPage;
