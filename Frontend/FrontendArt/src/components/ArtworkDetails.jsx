import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './ArtworkDetails.css';
import { CartContext } from '../CartContext';

const ArtworkDetails = () => {
    const { id } = useParams();
    const [artwork, setArtwork] = useState(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const { addToCart } = useContext(CartContext);

    useEffect(() => {
        // Fetch artwork details based on the id parameter
        fetch(`http://127.0.0.1:8000/api/artworks/${id}`)
            .then(response => response.json())
            .then(data => setArtwork(data))
            .catch(error => console.error('Error fetching artwork details:', error));
    }, [id]);

    const handleZoom = () => {
        setIsZoomed(!isZoomed); // Toggle zoom state
    };

    const handleBuy = () => {
        if (artwork) {
            addToCart(artwork); // Add the artwork to the cart
        }
    };

    if (!artwork) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className={`artwork-details-container ${isZoomed ? 'zoomed' : ''}`}>
            <div className="artwork-info">
                <img
                    src={artwork.picture}
                    alt={artwork.title}
                    className={`artwork-image ${isZoomed ? 'zoomed' : ''}`}
                    onClick={handleZoom}
                />
                <div className="info">
                    <h1 className="title">{artwork.title}</h1>
                    <p className="artist">By: {artwork.artist}</p>
                    <p className="price">Price: ${artwork.price}</p>
                    <p className="published">Published: {new Date(artwork.publishing_date).toLocaleDateString()}</p>
                    <p className="description">{artwork.description}</p>
                    <button className="buy-button" onClick={handleBuy}>Buy Now</button>
                    <button className="zoom-button" onClick={handleZoom}>
                        {isZoomed ? 'Zoom Out' : 'Zoom In'}
                    </button>
                </div>
            </div>
            <div className="extra-features">
                <h2>Why are we special?</h2>
                <ul>
                    <li>High-quality printing</li>
                    <li>Custom framing options</li>
                    <li>Free shipping worldwide</li>
                </ul>
            </div>
        </div>
    );
};

export default ArtworkDetails;
