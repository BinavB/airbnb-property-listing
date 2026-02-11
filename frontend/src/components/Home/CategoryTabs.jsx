import React from 'react';
import { Nav } from 'react-bootstrap';

const CategoryTabs = () => {
    const categories = [
        { id: 'homes', name: 'Amazing homes', icon: 'bi-house-door', active: true },
        { id: 'experiences', name: 'Experiences', icon: 'bi-star', badge: 'NEW' },
        { id: 'adventures', name: 'Adventures', icon: 'bi-compass' },
    ];

    return (
        <div className="border-bottom mb-5">
            <Nav variant="underline" className="justify-content-center">
                {categories.map(category => (
                    <Nav.Item key={category.id}>
                        <Nav.Link 
                            href={`/${category.id}`}
                            active={category.active}
                            className="d-flex align-items-center gap-2 px-4 py-3"
                        >
                            <i className={`bi ${category.icon}`}></i>
                            <span>{category.name}</span>
                            {category.badge && (
                                <span className="badge bg-info ms-2">{category.badge}</span>
                            )}
                        </Nav.Link>
                    </Nav.Item>
                ))}
            </Nav>
        </div>
    );
};

export default CategoryTabs;
