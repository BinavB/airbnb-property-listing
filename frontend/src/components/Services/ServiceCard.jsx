import React from 'react';
import { Badge } from 'react-bootstrap';

const ServiceCard = ({ service, user }) => {
    const formatPrice = (price) => {
        return `₹${price.toLocaleString('en-IN')}`;
    };

    return (
        <div className="service-card position-relative">
            {/* Image */}
            <div className="position-relative" style={{paddingBottom: '100%', overflow: 'hidden', borderRadius: '12px'}}>
                <img 
                    src={service.image} 
                    className="position-absolute w-100 h-100"
                    style={{objectFit: 'cover'}}
                    alt={service.title}
                />
                
                {/* Favorite Button */}
                <button 
                    className="position-absolute top-0 end-0 m-2 btn btn-light rounded-circle p-2"
                    style={{width: '32px', height: '32px', border: 'none'}}
                >
                    <i className="bi bi-heart"></i>
                </button>
            </div>

            {/* Content */}
            <div className="mt-3">
                {/* Title */}
                <div className="fw-semibold text-dark mb-1" style={{fontSize: '15px', lineHeight: '1.3'}}>
                    {service.title}
                </div>

                {/* Location */}
                <div className="text-muted mb-2" style={{fontSize: '15px'}}>
                    {service.location}
                </div>

                {/* Price Section */}
                <div className="mb-2">
                    <div className="fw-semibold text-dark" style={{fontSize: '15px'}}>
                        From 
                        <br />
                        {formatPrice(service.price)}
                        <br />
                        / guest
                    </div>
                    <div className="text-muted" style={{fontSize: '14px'}}>
                        From {formatPrice(service.price)} per guest
                    </div>
                    
                    {/* Minimum Booking */}
                    {service.minimumBooking && (
                        <>
                            <div className="fw-semibold text-dark" style={{fontSize: '15px'}}>
                                Minimum {formatPrice(service.minimumBooking)} to book
                            </div>
                            <div className="text-muted" style={{fontSize: '14px'}}>
                                Minimum {formatPrice(service.minimumBooking)} to book
                            </div>
                        </>
                    )}
                </div>

                {/* Rating Section */}
                <div className="d-flex align-items-center gap-2">
                    <i className="bi bi-star-fill text-warning" style={{fontSize: '14px'}}></i>
                    <span className="fw-semibold text-dark" style={{fontSize: '15px'}}>
                        {service.rating}
                    </span>
                    {service.isGuestFavorite && (
                        <Badge bg="danger" className="ms-2" style={{fontSize: '11px', padding: '4px 8px'}}>
                            Guest Favorite
                        </Badge>
                    )}
                    {service.isPopular && (
                        <Badge bg="dark" className="ms-2" style={{fontSize: '11px', padding: '4px 8px'}}>
                            Popular
                        </Badge>
                    )}
                </div>

                {/* Rating Text */}
                <div className="text-muted mt-1" style={{fontSize: '14px'}}>
                    {service.rating} out of 5 average rating
                </div>
                <div className="fw-bold text-dark" style={{fontSize: '16px'}}>
                    {service.rating}
                </div>
            </div>
        </div>
    );
};

export default ServiceCard;
