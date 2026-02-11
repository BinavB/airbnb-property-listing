import React from 'react';

const CategoryCarousel = ({ categories }) => {
    return (
        <div className="category-carousel">
            <div className="d-flex gap-3 overflow-x-auto pb-3">
                {categories.map(category => (
                    <button 
                        key={category.id}
                        className="btn btn-outline-dark rounded-pill px-4 py-2 d-flex flex-column align-items-center"
                        style={{minWidth: '120px'}}
                    >
                        <div className="mb-2" style={{fontSize: '24px'}}>
                            {category.icon}
                        </div>
                        <span className="text-center">{category.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default CategoryCarousel;
