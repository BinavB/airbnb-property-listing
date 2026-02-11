import React, { useState } from 'react';
import { Card, Badge } from 'react-bootstrap';

const PropertyCard = ({ property, onPriceUpdate, user }) => {
    const [isFavorite, setIsFavorite] = useState(false);
    
    return (
        <div className="modern-card property-card mb-4">
            {/* Image Container */}
            <div className="position-relative overflow-hidden" style={{paddingBottom: '100%', borderRadius: '12px'}}>
                <img 
                    src={property.image || 'https://picsum.photos/400/300?random=' + property.id} 
                    className="position-absolute w-100 h-100"
                    style={{objectFit: 'cover', top: 0, left: 0}}
                    alt={property.title}
                />
                
                {/* Guest Favorite Badge - Top Left */}
                {property.isGuestFavorite && (
                    <div className="position-absolute top-0 start-0 m-3">
                        <span className="badge bg-white text-dark shadow-sm px-3 py-2">
                            Guest favourite
                        </span>
                    </div>
                )}
                
                {/* Guest Favorite Badge - Bottom Left */}
                {property.isGuestFavorite && (
                    <div className="position-absolute bottom-0 start-0 m-3">
                        <span className="badge bg-white text-dark shadow-sm px-3 py-2">
                            Guest favourite
                        </span>
                    </div>
                )}
                
                {/* Heart Icon */}
                <button 
                    className="btn position-absolute top-0 end-0 m-3"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsFavorite(!isFavorite);
                    }}
                    style={{background: 'none', border: 'none'}}
                >
                    <i className={`bi bi-heart${isFavorite ? '-fill' : ''} fs-5`}
                       style={{color: isFavorite ? '#FF385C' : 'rgba(0,0,0,0.5)', 
                              WebkitTextStroke: isFavorite ? 'none' : '2px white'}}></i>
                </button>
            </div>
            
            {/* Card Content */}
            <div className="mt-3">
                {/* Title */}
                <h6 className="mb-1 fw-semibold text-dark" style={{fontSize: '15px'}}>
                    {property.title}
                </h6>
                
                {/* Price */}
                <div className="mb-1">
                    <span className="fw-semibold text-dark" style={{fontSize: '16px'}}>
                        ₹{property.price.toLocaleString('en-IN')}
                    </span>
                    <span className="text-muted" style={{fontSize: '14px'}}> for 2 nights</span>
                    <div className="text-muted" style={{fontSize: '14px'}}>
                        ₹{property.price.toLocaleString('en-IN')} for 2 nights
                    </div>
                </div>
                
                {/* Rating */}
                <div className="mb-2">
                    <span className="text-muted" style={{fontSize: '14px'}}>
                        {property.rating} out of 5 average rating
                    </span>
                    <div className="fw-semibold" style={{fontSize: '14px'}}>
                        {property.rating}
                    </div>
                </div>
                
                {/* Additional Info */}
                <div className="d-flex justify-content-between align-items-center">
                    <div className="text-muted small">
                        {property.beds} beds · {property.bedrooms} bedroom · {property.bathrooms} bath
                    </div>
                    
                    {/* Only show Update Price button if user is logged in and owns this property */}
                    {user && property.ownerId === user.id && (
                        <button 
                            className="btn btn-outline-dark btn-sm rounded-pill"
                            onClick={(e) => {
                                e.stopPropagation();
                                onPriceUpdate(property);
                            }}
                        >
                            Update Price
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PropertyCard;
