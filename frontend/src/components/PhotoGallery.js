import React from 'react';
import './PhotoGallery.css';

// We'll create an array of 6 images from the one URL passed in.
// In a real app, this data would ideally come from your database.
const PhotoGallery = ({ imageUrl }) => {
    const images = imageUrl ? Array(6).fill(imageUrl) : [];

    if (!imageUrl) {
        return null; // Don't render the gallery if there's no image
    }

    return (
        <div className="photo-gallery-section">
            <h3 className="section-heading">Photo Gallery</h3>
            <div className="photo-grid">
                {images.map((img, index) => (
                    <div key={index} className="photo-item">
                        <img src={img} alt={`Monastery view ${index + 1}`} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PhotoGallery;