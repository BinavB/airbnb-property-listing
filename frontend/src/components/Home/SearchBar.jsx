import React, { useState } from 'react';
import DestinationSuggestions from './DestinationSuggestions';

const SearchBar = ({ 
    placeholder = "Search destinations", 
    showGuestCount = false,
    showServiceType = false,
    compact = false,
    onSearch,
    filters,
    setFilters
}) => {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [localFilters, setLocalFilters] = useState(filters || {
        location: '',
        city: '',
        property_type: '',
        agent_id: '',
        service_type: '',
        guests: ''
    });

    const handleSearch = () => {
        if (onSearch) {
            onSearch(localFilters);
        }
        setShowSuggestions(false);
    };

    const handleCitySelect = (city) => {
        setLocalFilters({ ...localFilters, city, location: city });
        setShowSuggestions(false);
        if (onSearch) {
            onSearch({ ...localFilters, city, location: city });
        }
    };

    const handleLocationFocus = () => {
        setShowSuggestions(true);
    };

    // For mobile: show as compact bar that opens modal
    if (window.innerWidth < 768 || compact) {
        return (
            <>
                <div 
                    className="search-bar-compact shadow-sm cursor-pointer"
                    onClick={() => setShowSuggestions(true)}
                >
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="d-flex align-items-center gap-3">
                            <i className="bi bi-search"></i>
                            <div>
                                <div className="fw-semibold">Search destinations</div>
                                <div className="text-muted small">
                                    {localFilters.city || 'Anywhere'} · {localFilters.service_type || 'Any type'}
                                </div>
                            </div>
                        </div>
                        <i className="bi bi-funnel"></i>
                    </div>
                </div>
                
                {/* Search Modal - Mobile */}
                <DestinationSuggestions 
                    show={showSuggestions}
                    onSelect={handleCitySelect}
                    onClose={() => setShowSuggestions(false)}
                />
            </>
        );
    }

    // Desktop: horizontal search bar with multiple filters
    return (
        <>
            <div className="search-bar-desktop d-flex align-items-center">
                {/* Where */}
                <div className="search-section flex-grow-1">
                    <label className="form-label fw-semibold mb-1">Where</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder={placeholder}
                        value={localFilters.location}
                        onChange={(e) => setLocalFilters({ ...localFilters, location: e.target.value })}
                        onFocus={handleLocationFocus}
                        onClick={handleLocationFocus}
                        style={{ cursor: 'pointer' }}
                    />
                </div>

                {/* City Filter */}
                <div className="search-section border-end px-4 py-3">
                    <label className="form-label fw-semibold mb-1">City</label>
                    <select 
                        className="form-select"
                        value={localFilters.city}
                        onChange={(e) => setLocalFilters({ ...localFilters, city: e.target.value })}
                    >
                        <option value="">All cities</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Goa">Goa</option>
                        <option value="Pune">Pune</option>
                        <option value="Puducherry">Puducherry</option>
                        <option value="Kodaikanal">Kodaikanal</option>
                    </select>
                </div>

                {/* Guest Count (for Experiences) */}
                {showGuestCount && (
                    <div className="search-section border-end px-4 py-3">
                        <label className="form-label fw-semibold mb-1">Who</label>
                        <select 
                            className="form-select"
                            value={localFilters.guests || ''}
                            onChange={(e) => setLocalFilters({ ...localFilters, guests: e.target.value })}
                        >
                            <option value="">Add guests</option>
                            <option value="2">2 guests</option>
                            <option value="4">4 guests</option>
                            <option value="6">6 guests</option>
                            <option value="8">8 guests</option>
                            <option value="10">10 guests</option>
                            <option value="12">12 guests</option>
                        </select>
                    </div>
                )}

                {/* Service Type (for Services) */}
                {showServiceType && (
                    <div className="search-section border-end px-4 py-3">
                        <label className="form-label fw-semibold mb-1">Type of service</label>
                        <select 
                            className="form-select"
                            value={localFilters.service_type}
                            onChange={(e) => setLocalFilters({ ...localFilters, service_type: e.target.value })}
                        >
                            <option value="">Add service</option>
                            <option value="photography">Photography</option>
                            <option value="chefs">Chefs</option>
                            <option value="massage">Massage</option>
                            <option value="training">Training</option>
                            <option value="spa_treatments">Spa treatments</option>
                            <option value="catering">Catering</option>
                            <option value="prepared_meals">Prepared meals</option>
                        </select>
                    </div>
                )}

                {/* Search Button */}
                <div className="px-3">
                    <button 
                        className="btn btn-danger rounded-circle d-flex align-items-center justify-content-center"
                        style={{width: '48px', height: '48px'}}
                        onClick={handleSearch}
                    >
                        <i className="bi bi-search text-white"></i>
                    </button>
                </div>
            </div>

            {/* Destination Suggestions Popup - Desktop */}
            <DestinationSuggestions 
                show={showSuggestions}
                onSelect={handleCitySelect}
                onClose={() => setShowSuggestions(false)}
            />
        </>
    );
};

export default SearchBar;
