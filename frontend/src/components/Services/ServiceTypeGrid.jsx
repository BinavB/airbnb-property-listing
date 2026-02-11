import React from 'react';

const ServiceTypeGrid = ({ types, city }) => {
    return (
        <div className="row g-3">
            {types.map(type => (
                <div key={type.id} className="col-6 col-md-4 col-lg-3">
                    <a 
                        href={`/services?city=${city}&service_type=${type.slug}`}
                        className="text-decoration-none"
                    >
                        <div className="service-type-card border rounded-3 p-3 bg-white h-100 hover-shadow transition">
                            <div className="text-center">
                                <img 
                                    src={type.icon_url} 
                                    alt={type.name}
                                    className="mb-3"
                                    style={{width: '64px', height: '64px'}}
                                />
                                <h6 className="fw-semibold mb-1">{type.name}</h6>
                                <p className="text-muted small mb-0">
                                    {type.count > 0 
                                        ? `${type.count} available` 
                                        : 'Coming soon'}
                                    }
                                </p>
                            </div>
                        </div>
                    </a>
                </div>
            ))}
        </div>
    );
};

export default ServiceTypeGrid;
