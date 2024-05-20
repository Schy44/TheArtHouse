import React from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';

function Homepage() {
    return (
        <div>
            <div className="homepage">
                <div className="header">
                    <div className="header-links">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                </div>
                <div className="content">
                    <h1>The Art House</h1>
                    <p>A place where you can buy or sell art.</p>
                    <div className="options">
                        <Link to="/ArtworkDisplay">
                            <button>Buy</button>
                        </Link>
                        {/* Redirect to ArtworkForm when clicking Sell button */}
                        <Link to="/ArtworkForm">
                            <button style={{ marginLeft: '8px' }}>Sell</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Homepage;
