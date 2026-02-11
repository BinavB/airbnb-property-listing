import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const { user, logout } = useAuth();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <style>
                {`
                    @keyframes slideIn {
                        from {
                            transform: scaleX(0);
                        }
                        to {
                            transform: scaleX(1);
                        }
                    }
                    
                    @media (max-width: 768px) {
                        .navbar-brand span {
                            display: inline !important;
                        }
                        .nav-link {
                            font-size: 14px !important;
                            padding: 0.5rem 0.75rem !important;
                        }
                        .btn-outline-dark {
                            padding: 0.375rem 0.75rem !important;
                            font-size: 14px !important;
                        }
                    }
                    
                    @media (max-width: 576px) {
                        .navbar-brand {
                            font-size: 1.2rem !important;
                        }
                        .nav-link {
                            font-size: 12px !important;
                            padding: 0.25rem 0.5rem !important;
                        }
                        .btn-outline-dark {
                            padding: 0.25rem 0.5rem !important;
                            font-size: 12px !important;
                        }
                    }
                `}
            </style>
            <nav className={`navbar navbar-expand-lg bg-white sticky-top ${isScrolled ? 'shadow-sm' : ''}`} style={{transition: 'all 0.3s ease'}}>
                <div className="container-custom px-4 px-lg-5 d-flex flex-wrap align-items-center justify-content-between">
                    {/* Logo */}
                    <a className="navbar-brand d-flex align-items-center me-auto" href="/" style={{transition: 'all 0.2s ease'}}>
                        <svg width="30" height="32" viewBox="0 0 30 32" fill="#FF385C" style={{transition: 'all 0.2s ease'}}>
                            {/* <path d="M29.24 22.68c-.16-.39-.31-.8-.31-1.24 0-1.36.92-2.45 2.45-2.45 1.38 0 2.5 1.12 2.5 2.5 0 .69-.28 1.32-.73 1.79-.18.2-.46.28-.73.28-1.11 0-.63-.39-1.17-.73-1.64-.73-.88 0-1.63-.29-2.42-.87-3.22-1.27-1.43-2.09-2.81-2.09-1.88 0-3.47.96-4.43 2.24-.96.96-2.02 1.49-2.02 1.01 0 1.93.41 2.89 1.23 2.89z"/> */}
                        </svg>
                        <span className="ms-2 d-none d-md-inline">airbnb</span>
                    </a>

                    {/* Center Navigation - Desktop */}
                    <div className="d-none d-lg-flex flex-grow-1 align-items-center">
                        <ul className="nav justify-content-center">
                            <li className="nav-item">
                                <a 
                                    className="nav-link text-muted" 
                                    href="/" 
                                    style={{
                                        position: 'relative', 
                                        transition: 'all 0.2s ease',
                                        color: (location.pathname === '/' || location.pathname === '/homes') ? '#000' : 'inherit'
                                    }}
                                >
                                    Homes 
                                    {(location.pathname === '/' || location.pathname === '/homes') && (
                                        <div 
                                            style={{
                                                position: 'absolute',
                                                bottom: '-2px',
                                                left: '0',
                                                right: '0',
                                                height: '2px',
                                                backgroundColor: '#000',
                                                animation: 'slideIn 0.3s ease'
                                            }}
                                        />
                                    )}
                                </a>
                            </li>
                            <li className="nav-item">
                                <a 
                                    className="nav-link text-muted" 
                                    href="/experiences" 
                                    style={{
                                        position: 'relative', 
                                        transition: 'all 0.2s ease',
                                        color: location.pathname === '/experiences' ? '#000' : 'inherit'
                                    }}
                                >
                                    Experiences <span className="badge bg-info ms-1" style={{fontSize: '10px', padding: '2px 6px', borderRadius: '10px'}}>NEW</span>
                                    {location.pathname === '/experiences' && (
                                        <div 
                                            style={{
                                                position: 'absolute',
                                                bottom: '-2px',
                                                left: '0',
                                                right: '0',
                                                height: '2px',
                                                backgroundColor: '#000',
                                                animation: 'slideIn 0.3s ease'
                                            }}
                                        />
                                    )}
                                </a>
                            </li>
                            <li className="nav-item">
                                <a 
                                    className="nav-link text-muted" 
                                    href="/services" 
                                    style={{
                                        position: 'relative', 
                                        transition: 'all 0.2s ease',
                                        color: location.pathname === '/services' ? '#000' : 'inherit'
                                    }}
                                >
                                    Services<span className="badge bg-info ms-1" style={{fontSize: '10px', padding: '2px 6px', borderRadius: '10px'}}>NEW</span>
                                    {location.pathname === '/services' && (
                                        <div 
                                            style={{
                                                position: 'absolute',
                                                bottom: '-2px',
                                                left: '0',
                                                right: '0',
                                                height: '2px',
                                                backgroundColor: '#000',
                                                animation: 'slideIn 0.3s ease'
                                            }}
                                        />
                                    )}
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Right Side */}
                    <div className="ms-auto flex-grow-0">
                        <div className="d-flex align-items-center gap-3">
                            {user ? (
                                <>
                                    <a href="/dashboard" className="btn btn-link text-dark d-none d-md-block" style={{transition: 'all 0.2s ease', fontWeight: '500'}}>
                                        Dashboard
                                    </a>
                                    <button onClick={logout} className="btn btn-outline-dark rounded-pill" style={{transition: 'all 0.2s ease'}}>
                                        <span className="d-none d-md-inline">Logout</span>
                                        <span className="d-md-none">Out</span>
                                    </button>
                                </>
                            ) : (
                                <a href="/login" className="btn btn-outline-dark rounded-pill" style={{transition: 'all 0.2s ease'}}>
                                    <span className="d-none d-md-inline">Agent Login</span>
                                    <span className="d-md-none">Login</span>
                                </a>
                            )}
                            
                            {/* Globe Icon */}
                            <button className="btn btn-link text-dark d-none d-md-block hover-scale" style={{transition: 'all 0.2s ease'}}>
                                <i className="bi bi-globe"></i>
                            </button>
                            
                            {/* Menu Icon */}
                            <button className="btn border rounded-pill d-flex align-items-center px-3 py-2 hover-scale" style={{transition: 'all 0.2s ease'}}>
                                <i className="bi bi-list fs-5"></i>
                                <i className="bi bi-person-circle fs-5 ms-2"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;
