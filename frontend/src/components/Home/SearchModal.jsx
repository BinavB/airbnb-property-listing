import { useState, useEffect } from 'react';
import DestinationSuggestions from './DestinationSuggestions';

const SearchModal = ({ show, onHide, filters, setFilters, onSearch, agents = [] }) => {
    const [activeTab, setActiveTab] = useState('where');
    const [localFilters, setLocalFilters] = useState(filters);

    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

    const handleSearch = () => {
        setFilters(localFilters);
        onSearch(localFilters);
        onHide();
    };

    const handleClearAll = () => {
        const cleared = { city: '', property_type: '', agent_id: '', location: '' };
        setLocalFilters(cleared);
    };

    if (!show) return null;

    return (
        <div className="modal fade show d-block" 
             style={{backgroundColor: 'rgba(0,0,0,0.5)'}}
             onClick={onHide}>
            <div className="modal-dialog modal-fullscreen" onClick={(e) => e.stopPropagation()}>
                <div className="modal-content">
                    {/* Header */}
                    <div className="modal-header border-0 pb-0">
                        <button 
                            type="button" 
                            className="btn-close" 
                            onClick={onHide}
                            aria-label="Close"
                        ></button>
                    </div>

                    {/* Body */}
                    <div className="modal-body px-4">
                        {/* Tabs */}
                        <div className="nav nav-pills mb-4 justify-content-center" role="tablist">
                            <button 
                                className={`nav-link rounded-pill ${activeTab === 'where' ? 'active' : ''}`}
                                onClick={() => setActiveTab('where')}
                                type="button"
                            >
                                Where
                            </button>
                            <button 
                                className={`nav-link rounded-pill ms-2 ${activeTab === 'filters' ? 'active' : ''}`}
                                onClick={() => setActiveTab('filters')}
                                type="button"
                            >
                                Filters
                            </button>
                        </div>

                        {/* Where Tab */}
                        {activeTab === 'where' && (
                            <div>
                                <h3 className="mb-4 fw-bold">Where?</h3>
                                
                                <div className="mb-4">
                                    <input
                                        type="text"
                                        className="form-control form-control-lg rounded-pill shadow-sm"
                                        placeholder="Search destinations"
                                        value={localFilters.location || ''}
                                        onChange={(e) => setLocalFilters({
                                            ...localFilters, 
                                            location: e.target.value
                                        })}
                                    />
                                </div>

                                <DestinationSuggestions 
                                    onSelect={(city) => setLocalFilters({...localFilters, city})}
                                />
                            </div>
                        )}

                        {/* Filters Tab */}
                        {activeTab === 'filters' && (
                            <div>
                                <h3 className="mb-4 fw-bold">Filters</h3>
                                
                                {/* City Filter */}
                                <div className="mb-4">
                                    <label className="form-label fw-semibold">City</label>
                                    <select 
                                        className="form-select form-select-lg"
                                        value={localFilters.city || ''}
                                        onChange={(e) => setLocalFilters({
                                            ...localFilters, 
                                            city: e.target.value
                                        })}
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

                                {/* Property Type Filter */}
                                <div className="mb-4">
                                    <label className="form-label fw-semibold mb-3">Property Type</label>
                                    <div className="d-grid gap-2">
                                        {[
                                            { value: 'apartment', label: 'Apartment', icon: '🏢' },
                                            { value: 'house', label: 'House', icon: '🏠' },
                                            { value: 'villa', label: 'Villa', icon: '🏡' },
                                            { value: 'studio', label: 'Studio', icon: '🛋️' }
                                        ].map(type => (
                                            <button
                                                key={type.value}
                                                type="button"
                                                className={`btn btn-outline-dark text-start py-3 ${
                                                    localFilters.property_type === type.value ? 'active' : ''
                                                }`}
                                                onClick={() => setLocalFilters({
                                                    ...localFilters, 
                                                    property_type: localFilters.property_type === type.value 
                                                        ? '' 
                                                        : type.value
                                                })}
                                            >
                                                <span className="me-2" style={{fontSize: '20px'}}>
                                                    {type.icon}
                                                </span>
                                                {type.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Agent Filter */}
                                <div className="mb-4">
                                    <label className="form-label fw-semibold mb-3">Filter by Agent</label>
                                    <select 
                                        className="form-select form-select-lg"
                                        value={localFilters.agent_id || ''}
                                        onChange={(e) => setLocalFilters({
                                            ...localFilters, 
                                            agent_id: e.target.value
                                        })}
                                    >
                                        <option value="">All agents</option>
                                        {agents.map(agent => (
                                            <option key={agent.id} value={agent.id}>
                                                {agent.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="modal-footer border-top sticky-bottom bg-white p-4">
                        <div className="d-flex justify-content-between align-items-center w-100">
                            <button 
                                className="btn btn-link text-dark text-decoration-underline"
                                onClick={handleClearAll}
                                type="button"
                            >
                                Clear all
                            </button>
                            <button 
                                className="btn btn-danger rounded-pill px-5 py-3"
                                onClick={handleSearch}
                                type="button"
                            >
                                <i className="bi bi-search me-2"></i>
                                Search
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchModal;
