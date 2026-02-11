import React, { useState } from 'react';
import { Card, Badge } from 'react-bootstrap';

const ExperienceCard = ({ experience }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const formatPrice = (price, pricingType) => {
        if (pricingType === 'per_group') {
            return `From ₹${price.toLocaleString('en-IN')} / group`;
        }
        return `From ₹${price.toLocaleString('en-IN')} / guest`;
    };

    return (
        <Card className="experience-card h-100">
            <div className="position-relative overflow-hidden" style={{paddingBottom: '60%', borderRadius: '12px'}}>
                <img 
                    src={experience.primary_image || 'https://picsum.photos/400/300?random=' + experience.id} 
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
                
                {/* Guest Favorite Badges */}
                {experience.isGuestFavorite && (
                    <>
                        <div className="position-absolute top-3 start-3">
                            <Badge bg="white text-dark shadow-sm px-3 py-2">
                                Guest favourite
                            </Badge>
                        </div>
                        <div className="position-absolute bottom-0 start-3">
                            <Badge bg="white text-dark shadow-sm px-3 py-2">
                                Guest favourite
                            </Badge>
                        </div>
                    </>
                )}
                
                {/* Heart Icon */}
                <button 
                    className="btn position-absolute top-3 end-3"
                    onClick={() => setIsFavorite(!isFavorite)}
                    style={{background: 'none', border: 'none'}}
                >
                    <i className={`bi bi-heart${isFavorite ? '-fill' : ''} fs-5`}
                       style={{ 
                           color: isFavorite ? '#FF385C' : 'rgba(0,0,0,0.5)', 
                           WebkitTextStroke: isFavorite ? 'none' : '2px white'
                       }}></i>
                </button>
            </div>
            
            <Card.Body className="p-4">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                        <h5 className="fw-bold mb-1">{experience.title}</h5>
                        <p className="text-muted small mb-2">
                            <i className="bi bi-geo-alt me-1"></i>
                            {experience.city}, {experience.country}
                        </p>
                        <p className="text-muted small">
                            with {experience.host}
                        </p>
                    </div>
                    <div className="text-end">
                        <h4 className="fw-bold text-danger">{formatPrice(experience.price_per_guest || experience.group_price, experience.pricing_type)}</h4>
                        <p className="text-muted small">{experience.duration_hours}h · {experience.max_guests} guests</p>
                        <div className="fw-semibold">
                            {experience.rating}
                        </div>
                        <div className="text-muted">
                            {experience.rating} out of 5 average rating
                        </div>
                    </div>
                </div>
                
                <p className="text-muted mb-3">{experience.description}</p>
                
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <i className="bi bi-star-fill text-warning me-1"></i>
                        <span className="fw-semibold">{experience.rating}</span>
                        <span className="text-muted"> out of 5 average rating</span>
                    </div>
                </div>
                
                <p className="text-muted mb-3">{experience.description}</p>
                
                {/* Enhanced Agent Info */}
                {experience.price_type === 'agent' && (
                    <div className="mt-3 p-2 bg-gradient rounded-3">
                        <div className="d-flex align-items-center gap-2">
                            <i className="bi bi-person-check text-white"></i>
                            <span className="text-white fw-semibold">
                                Agent Price Applied
                            </span>
                        </div>
                    </div>
                )}
            </Card.Body>
        </Card>
    );
};

export default ExperienceCard;
