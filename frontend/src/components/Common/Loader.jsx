import React from 'react';

const Loader = ({ size = 'md', text = 'Loading...' }) => {
    const sizeClasses = {
        sm: 'spinner-border-sm',
        md: '',
        lg: 'spinner-border-lg'
    };

    return (
        <div className="d-flex justify-content-center align-items-center">
            <div className={`spinner-border ${sizeClasses[size]}`} role="status">
                <span className="visually-hidden">{text}</span>
            </div>
            {text && (
                <span className="ms-2 text-muted">{text}</span>
            )}
        </div>
    );
};

export default Loader;
