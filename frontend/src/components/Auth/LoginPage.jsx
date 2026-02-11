import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        email: '',
        password: ''
    });
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const result = await login(formData.email, formData.password);
            if (result.success) {
                // Redirect to agent home page after successful login
                navigate('/agent-home');
            } else {
                setError(result.error || 'Login failed');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-vh-100 d-flex align-items-center" style={{ 
            background: 'linear-gradient(135deg, var(--gray-50) 0%, var(--white) 100%)',
            padding: '20px 0'
        }}>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="modern-card p-4 p-md-5">
                            {/* Logo Section */}
                            <div className="text-center mb-5">
                                <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-light p-3 mb-3">
                                    <svg width="40" height="40" viewBox="0 0 30 32" fill="#FF385C">
                                        <path d="M29.24 22.68c-.16-.39-.31-.8-.31-1.24 0-1.36.92-2.45 2.45-2.45 1.38 0 2.5 1.12 2.5 2.5 0 .69-.28 1.32-.73 1.79-.18.2-.46.28-.73.28-1.11 0-.63-.39-1.17-.73-1.64-.73-.88 0-1.63-.29-2.42-.87-3.22-1.27-1.43-2.09-2.81-2.09-1.88 0-3.47.96-4.43 2.24-.96.96-2.02 1.49-2.02 1.01 0 1.93.41 2.89 1.23 2.89z"/>
                                    </svg>
                                </div>
                                <h1 className="fw-bold mb-2" style={{ fontSize: '32px', color: 'var(--gray-900)' }}>
                                    Welcome back
                                </h1>
                                <p className="text-muted mb-0" style={{ fontSize: '18px' }}>
                                    Sign in to your agent account
                                </p>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="alert alert-danger mb-4 fade-in" role="alert">
                                    <i className="bi bi-exclamation-triangle me-2"></i>
                                    {error}
                                </div>
                            )}

                            {/* Login Form */}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="email" className="form-label fw-semibold mb-2">
                                        Email address
                                    </label>
                                    <div className="position-relative">
                                        <i className="bi bi-envelope position-absolute" style={{
                                            left: '16px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: 'var(--gray-500)',
                                            fontSize: '18px'
                                        }}></i>
                                        <input
                                            type="email"
                                            className="form-control form-control-lg ps-5"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                            required
                                            style={{
                                                fontSize: '16px',
                                                padding: '16px 16px 16px 50px',
                                                borderRadius: '12px',
                                                border: '2px solid var(--gray-200)',
                                                backgroundColor: 'var(--gray-50)'
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="password" className="form-label fw-semibold mb-2">
                                        Password
                                    </label>
                                    <div className="position-relative">
                                        <i className="bi bi-lock position-absolute" style={{
                                            left: '16px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: 'var(--gray-500)',
                                            fontSize: '18px'
                                        }}></i>
                                        <input
                                            type="password"
                                            className="form-control form-control-lg ps-5"
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Enter your password"
                                            required
                                            style={{
                                                fontSize: '16px',
                                                padding: '16px 16px 16px 50px',
                                                borderRadius: '12px',
                                                border: '2px solid var(--gray-200)',
                                                backgroundColor: 'var(--gray-50)'
                                            }}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-danger btn-lg w-100 rounded-pill py-3 mb-4"
                                    disabled={loading}
                                    style={{
                                        fontSize: '16px',
                                        fontWeight: '600',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    {loading ? (
                                        <>
                                            <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                            Signing in...
                                        </>
                                    ) : (
                                        <>
                                            Continue
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Demo Credentials */}
                            <div className="text-center mt-4 pt-4 border-top">
                                <p className="text-muted mb-3" style={{ fontSize: '14px' }}>
                                    Demo Agent Accounts:
                                </p>
                                <div className="row g-3">
                                    <div className="col-12 col-sm-6">
                                        <div className="bg-gray-50 rounded-3 p-3 mb-3">
                                            <div className="small">
                                                <div className="fw-semibold text-dark mb-1">Agent 1</div>
                                                <div><strong>Email:</strong> john@agent.com</div>
                                                <div><strong>Password:</strong> password123</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-6">
                                        <div className="bg-gray-50 rounded-3 p-3 mb-3">
                                            <div className="small">
                                                <div className="fw-semibold text-dark mb-1">Agent 2</div>
                                                <div><strong>Email:</strong> sarah@agent.com</div>
                                                <div><strong>Password:</strong> password123</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
